/**
 * BoldKit Canvas Effect Core — framework-agnostic canvas lifecycle.
 *
 * Every CanvasEffect used to hand-roll the same four concerns: size the
 * backing store, start a rAF loop, observe resize, cancel on teardown. None
 * of them paused when scrolled out of view, none paused in a background tab,
 * none capped the pixel count on a 4K display, and none respected
 * `prefers-reduced-motion` — so 19 effects × 2 frameworks each burned a full
 * core rendering pixels nobody could see.
 *
 * This owns all of it once. An effect supplies a per-frame draw function and
 * reads `canvas.width` / `canvas.height`; everything else is handled here.
 *
 * Layering mirrors motion-core: this file is framework-agnostic, and the
 * React hook (`use-canvas-effect`) and Vue composable (`useCanvasEffect`) are
 * thin wrappers over it. Adding a framework means wrapping `mountCanvasEffect`.
 *
 * SSR-safe: `mountCanvasEffect` is only ever called from a mount effect.
 */

import { prefersReducedMotion, onReducedMotionChange } from './motion-core';

/**
 * Backing-store pixel ceiling. Unlike a GPU shader, these effects run a
 * per-pixel loop in JS, so area is the dominant cost.
 *
 * 1920×1080×2 leaves a retina laptop (≈2.6M px) untouched and clamps a
 * full-bleed 4K canvas (≈8.3M px) by half. Raise it for small canvases where
 * you want maximum crispness; lower it if an effect is heavy per pixel.
 */
export const DEFAULT_MAX_PIXEL_COUNT = 1920 * 1080 * 2;

export interface CanvasEffectOptions {
  /** Backing-store pixel ceiling. @default 4147200 (1920×1080×2) */
  maxPixelCount?: number;
  /**
   * Floor for the render scale, independent of the display's DPR. Raise to 2
   * to supersample on 1× screens for smoother edges — at 4× the pixel cost.
   * @default 1
   */
  minPixelRatio?: number;
  /**
   * When the user has asked for reduced motion, render a single static frame
   * instead of animating. Set `false` only for effects whose first frame is
   * blank and which convey no meaning without motion.
   * @default true
   */
  respectReducedMotion?: boolean;
  /**
   * Pause the loop while the canvas is outside the viewport.
   * @default true
   */
  pauseOffscreen?: boolean;
  /**
   * Which coordinate space the frame function draws in.
   *
   * - `'device'` (default) — draw in backing-store pixels, reading
   *   `canvas.width` / `canvas.height`.
   * - `'css'` — a scale transform is applied after every resize so the frame
   *   function can draw in CSS pixels (`canvas.offsetWidth` / `offsetHeight`)
   *   and still fill the canvas.
   *
   * This has to live here rather than in the effect: assigning `canvas.width`
   * resets the 2D context transform, so it must be re-applied on every resize.
   *
   * @default 'device'
   */
  coordinates?: 'device' | 'css';
}

/**
 * Per-frame callback.
 *
 * @param dt     Milliseconds since the previous frame, clamped to 100ms so a
 *               backgrounded tab can't produce one enormous step. `0` on the
 *               first frame and on any redraw forced by a resize.
 * @param frames The same delta expressed in 60fps frames (`dt / 16.667`).
 *               Multiply a per-frame step by this to advance at a rate that
 *               is independent of display refresh — without it an effect runs
 *               at double speed on a 120Hz display.
 */
export type CanvasEffectFrame = (dt: number, frames: number) => void;

/** One frame at 60fps, in milliseconds. */
const FRAME_MS_60 = 1000 / 60;

/**
 * Setup callback. Runs once, after the canvas has been sized for the first
 * time. Allocate buffers and seed state here, then return the per-frame
 * function. Return nothing to render a single frame and stop.
 *
 * @param signal Aborted on dispose. Pass it to any listener you register
 *               (`el.addEventListener('pointermove', fn, { signal })`) and it
 *               is removed for you — the setup callback has no other place to
 *               put teardown, since its return value is the frame function.
 */
export type CanvasEffectSetup = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  signal: AbortSignal
) => CanvasEffectFrame | void;

export interface CanvasEffectHandle {
  /** Tear down: cancels the frame loop and disconnects every observer. */
  dispose(): void;
}

/** Longest dt we'll ever hand a frame callback, in ms (≈6 frames at 60fps). */
const MAX_FRAME_DELTA = 100;

const noop: CanvasEffectHandle = { dispose() {} };

/**
 * Mount an animated 2D canvas effect with a managed lifecycle.
 *
 * @example
 * const handle = mountCanvasEffect(canvas, (ctx) => {
 *   let t = 0
 *   return (dt) => {
 *     t += dt * 0.001
 *     ctx.clearRect(0, 0, canvas.width, canvas.height)
 *     // ...draw using canvas.width / canvas.height
 *   }
 * })
 * // later
 * handle.dispose()
 */
export function mountCanvasEffect(
  canvas: HTMLCanvasElement | null | undefined,
  setup: CanvasEffectSetup,
  options: CanvasEffectOptions = {}
): CanvasEffectHandle {
  if (!canvas) return noop;

  const ctx = canvas.getContext('2d');
  if (!ctx) return noop;

  const {
    maxPixelCount = DEFAULT_MAX_PIXEL_COUNT,
    minPixelRatio = 1,
    respectReducedMotion = true,
    pauseOffscreen = true,
    coordinates = 'device',
  } = options;

  let disposed = false;
  let raf: number | null = null;
  let lastTime = 0;

  /** Aborted on dispose; handed to `setup` for listener cleanup. */
  const abortController = new AbortController();

  /** Set by `setup`. Null until setup has run, or if setup opted out. */
  let frame: CanvasEffectFrame | null = null;
  let hasSetUp = false;

  let isVisible = !pauseOffscreen;
  let isTabVisible = !document.hidden;
  let isReduced = respectReducedMotion && prefersReducedMotion();

  // ────────────────────────────────────────────────────────────────
  // Sizing
  // ────────────────────────────────────────────────────────────────

  /** CSS-pixel size of the canvas, from the ResizeObserver. */
  let cssWidth = 0;
  let cssHeight = 0;
  /** True physical pixels, when the browser reports devicePixelContentBoxSize. */
  let devicePixelWidth = 0;
  let devicePixelHeight = 0;
  let devicePixelsSupported = false;

  /**
   * Resize the backing store to the element's physical pixel size, clamped so
   * total area never exceeds `maxPixelCount`.
   *
   * Prefers `devicePixelContentBoxSize` — the browser's own count of physical
   * pixels, which already accounts for zoom and fractional DPR. Falls back to
   * borderBox × devicePixelRatio.
   *
   * @returns true if the backing store actually changed size.
   */
  const applySize = (): boolean => {
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    let targetWidth: number;
    let targetHeight: number;

    if (devicePixelsSupported) {
      // Physical pixels already; only scale up if minPixelRatio demands it.
      const supersample = Math.max(1, minPixelRatio / dpr);
      targetWidth = devicePixelWidth * supersample;
      targetHeight = devicePixelHeight * supersample;
    } else {
      const scale = Math.max(dpr, minPixelRatio);
      targetWidth = cssWidth * scale;
      targetHeight = cssHeight * scale;
    }

    // A zero-size parent (display:none ancestor, collapsed flex child) would
    // make the clamp below divide by zero. Bail and keep the last good size.
    if (targetWidth <= 0 || targetHeight <= 0) return false;

    // Clamp by area, preserving aspect ratio.
    const headroom = Math.sqrt(maxPixelCount / (targetWidth * targetHeight));
    const clamp = Math.min(1, headroom);

    // Round to whole pixels — but floor once clamping is in play, since
    // rounding each axis up independently can push the area back over the
    // ceiling the clamp was there to enforce.
    const round = clamp < 1 ? Math.floor : Math.round;
    const width = Math.max(1, round(targetWidth * clamp));
    const height = Math.max(1, round(targetHeight * clamp));

    if (canvas.width === width && canvas.height === height) return false;

    canvas.width = width;
    canvas.height = height;

    // Assigning width/height resets the 2D transform, so a CSS-pixel effect
    // needs its scale re-applied here every time — not once at setup.
    if (coordinates === 'css') {
      const sx = canvas.offsetWidth ? width / canvas.offsetWidth : 1;
      const sy = canvas.offsetHeight ? height / canvas.offsetHeight : 1;
      ctx.setTransform(sx, 0, 0, sy, 0, 0);
    }

    return true;
  };

  // ────────────────────────────────────────────────────────────────
  // Frame loop
  // ────────────────────────────────────────────────────────────────

  /** Draw exactly one frame with dt = 0. Used for static and post-resize renders. */
  const renderStaticFrame = () => {
    if (disposed || !frame) return;
    lastTime = performance.now();
    frame(0, 0);
  };

  const tick = (now: number) => {
    if (disposed || !frame) {
      raf = null;
      return;
    }
    const dt = Math.min(MAX_FRAME_DELTA, now - lastTime);
    lastTime = now;
    frame(dt, dt / FRAME_MS_60);
    raf = requestAnimationFrame(tick);
  };

  /** True when nothing is blocking animation. */
  const shouldAnimate = () => !disposed && !isReduced && isVisible && isTabVisible;

  /**
   * Start or stop the loop to match current visibility. Stopping cancels the
   * rAF entirely rather than looping with a no-op, so a paused effect costs
   * literally nothing.
   */
  const syncLoop = () => {
    if (shouldAnimate()) {
      if (raf === null) {
        lastTime = performance.now();
        raf = requestAnimationFrame(tick);
      }
    } else if (raf !== null) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  };

  /** Run `setup` once the canvas has a real size, then begin. */
  const ensureSetUp = () => {
    if (hasSetUp || disposed) return;
    if (canvas.width <= 1 && canvas.height <= 1) return;
    hasSetUp = true;
    frame = setup(ctx, canvas, abortController.signal) ?? null;
    // Paint immediately so a paused or reduced-motion effect still shows
    // something rather than an empty canvas.
    renderStaticFrame();
    syncLoop();
  };

  // ────────────────────────────────────────────────────────────────
  // Observers
  // ────────────────────────────────────────────────────────────────

  const resizeObserver = new ResizeObserver(([entry]) => {
    if (!entry) return;

    const physical = entry.devicePixelContentBoxSize?.[0];
    if (physical) {
      devicePixelsSupported = true;
      devicePixelWidth = physical.inlineSize;
      devicePixelHeight = physical.blockSize;
    }
    const border = entry.borderBoxSize?.[0];
    if (border) {
      cssWidth = border.inlineSize;
      cssHeight = border.blockSize;
    } else {
      cssWidth = canvas.offsetWidth;
      cssHeight = canvas.offsetHeight;
    }

    const changed = applySize();
    if (!hasSetUp) {
      ensureSetUp();
    } else if (changed && !shouldAnimate()) {
      // Resizing clears the backing store. A running loop repaints on its own
      // next frame; a paused one would otherwise be left blank.
      renderStaticFrame();
    }
  });
  resizeObserver.observe(canvas);

  // Seed from layout in case the ResizeObserver's first callback is late.
  cssWidth = canvas.offsetWidth;
  cssHeight = canvas.offsetHeight;
  applySize();
  ensureSetUp();

  let intersectionObserver: IntersectionObserver | null = null;
  if (pauseOffscreen && typeof IntersectionObserver !== 'undefined') {
    intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? true;
      syncLoop();
    });
    intersectionObserver.observe(canvas);
  } else {
    isVisible = true;
  }

  const handleTabVisibility = () => {
    isTabVisible = !document.hidden;
    syncLoop();
  };
  document.addEventListener('visibilitychange', handleTabVisibility);

  // React to the user toggling reduced motion mid-session, so the a11y
  // guarantee holds without a reload.
  const stopReducedMotionWatch = respectReducedMotion
    ? onReducedMotionChange((reduced) => {
        isReduced = reduced;
        if (reduced) renderStaticFrame();
        syncLoop();
      })
    : undefined;

  return {
    dispose() {
      if (disposed) return;
      disposed = true;
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
      frame = null;
      abortController.abort();
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      document.removeEventListener('visibilitychange', handleTabVisibility);
      stopReducedMotionWatch?.();
    },
  };
}
