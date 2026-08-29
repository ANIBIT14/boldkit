/**
 * useCanvasEffect — React adapter over canvas-effect-core.
 *
 * Owns the whole canvas lifecycle so an effect only has to describe how to
 * paint one frame: sizing (DPR-aware, pixel-count capped), pausing when
 * off-screen or backgrounded, and `prefers-reduced-motion`.
 */
import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react';
import {
  mountCanvasEffect,
  type CanvasEffectOptions,
  type CanvasEffectSetup,
} from '@/lib/canvas-effect-core';

export type {
  CanvasEffectOptions,
  CanvasEffectSetup,
  CanvasEffectFrame,
} from '@/lib/canvas-effect-core';

/**
 * @param ref     Ref to the `<canvas>` element.
 * @param setup   Runs once after the canvas is sized. Allocate state here and
 *                return a `(dt) => void` frame function. `dt` is ms since the
 *                previous frame.
 * @param options Sizing and pause behaviour. Pass a stable object (or omit) —
 *                it is read once per mount.
 *
 * `setup` is captured in a ref, so an inline arrow closing over the latest
 * props works without re-mounting the effect on every render. Read live prop
 * values through refs inside the frame function, matching how these effects
 * already track `speed` and `palette`.
 *
 * @example
 * useCanvasEffect(canvasRef, (ctx, el) => {
 *   let t = 0
 *   return (dt) => {
 *     t += dt * 0.001 * speedRef.current
 *     ctx.clearRect(0, 0, el.width, el.height)
 *   }
 * })
 */
export function useCanvasEffect(
  ref: RefObject<HTMLCanvasElement | null>,
  setup: CanvasEffectSetup,
  options?: CanvasEffectOptions
) {
  // Latest-ref pattern. Written in a layout effect rather than during render,
  // which React forbids — and which runs before the mount effect below, so the
  // first setup call already sees the current closure.
  const setupRef = useRef(setup);
  useLayoutEffect(() => {
    setupRef.current = setup;
  });

  // Serialised so a fresh object literal with identical values doesn't remount.
  const optionsKey = JSON.stringify(options ?? {});

  useEffect(() => {
    const handle = mountCanvasEffect(
      ref.current,
      (ctx, canvas, signal) => setupRef.current(ctx, canvas, signal),
      options
    );
    return () => handle.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, optionsKey]);
}
