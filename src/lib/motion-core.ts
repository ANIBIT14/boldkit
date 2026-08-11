/**
 * BoldKit Motion Core — framework-agnostic primitives.
 *
 * Consumed by every L3 adapter (React, Vue, future Svelte/Solid/Qwik).
 * Adding a new framework = wrap these functions. No CSS or token changes needed.
 *
 * All functions are SSR-safe: they no-op on the server.
 */

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

// ──────────────────────────────────────────────────────────────────
// Reduced motion detection (cached; updates on media-query change)
// ──────────────────────────────────────────────────────────────────

let _reducedMotion = false;
let _reducedMotionMql: MediaQueryList | null = null;

if (isBrowser) {
  _reducedMotionMql = window.matchMedia('(prefers-reduced-motion: reduce)');
  _reducedMotion = _reducedMotionMql.matches;
  _reducedMotionMql.addEventListener('change', (e) => {
    _reducedMotion = e.matches;
  });
}

export function prefersReducedMotion(): boolean {
  return _reducedMotion;
}

// ──────────────────────────────────────────────────────────────────
// observeReveal — IntersectionObserver-driven scroll reveal
// ──────────────────────────────────────────────────────────────────

export type RevealOptions = {
  /** Margin around the root. Negative bottom fires reveal slightly before viewport entry. */
  rootMargin?: string;
  /** Intersection ratio threshold. 0 = any pixel visible. */
  threshold?: number;
  /** If true, unobserves after first reveal. Default true. */
  once?: boolean;
  /** Delay before applying the reveal-in class, in ms. */
  delay?: number;
};

const DEFAULT_REVEAL_OPTS: Required<RevealOptions> = {
  rootMargin: '0px 0px -10% 0px',
  threshold: 0,
  once: true,
  delay: 0,
};

/**
 * Observes `el` and toggles `.bk-reveal-in` when it enters the viewport.
 * The element must have the `.bk-reveal` class (and optionally a direction
 * modifier like `.bk-reveal-up`) already applied for the CSS animation to fire.
 *
 * Returns a cleanup function — call on unmount.
 */
export function observeReveal(el: Element, opts?: RevealOptions): () => void {
  if (!isBrowser) return () => {};

  // Reduced motion: show immediately, no animation. The L1 CSS guard
  // disables the animation declaration; we just remove the hidden state.
  if (_reducedMotion) {
    el.classList.remove('bk-reveal');
    el.classList.add('bk-reveal-in');
    return () => {};
  }

  const merged = { ...DEFAULT_REVEAL_OPTS, ...opts };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target;
        if (merged.delay > 0) {
          window.setTimeout(() => target.classList.add('bk-reveal-in'), merged.delay);
        } else {
          target.classList.add('bk-reveal-in');
        }
        if (merged.once) obs.unobserve(target);
      }
    },
    { rootMargin: merged.rootMargin, threshold: merged.threshold }
  );

  observer.observe(el);
  return () => observer.disconnect();
}

// ──────────────────────────────────────────────────────────────────
// staggerChildren — apply incrementing animation-delay to children
// ──────────────────────────────────────────────────────────────────

export type StaggerOptions = {
  /** Delay between siblings, in ms. Default 75. */
  delay?: number;
  /** Initial delay before the first child, in ms. */
  initialDelay?: number;
  /** CSS selector to filter children. Default '*' (all). */
  selector?: string;
};

/**
 * Sets `animation-delay` on each matched child of `root` so they animate
 * in sequence. Pairs with any of the bk-* entrance animations.
 *
 * Returns a cleanup function that clears the delays.
 */
export function staggerChildren(root: Element, opts?: StaggerOptions): () => void {
  if (!isBrowser) return () => {};
  if (_reducedMotion) return () => {};

  const { delay = 75, initialDelay = 0, selector = '*' } = opts ?? {};
  const children = Array.from(root.querySelectorAll(selector)).filter(
    (c) => c.parentElement === root
  ) as HTMLElement[];

  for (let i = 0; i < children.length; i++) {
    children[i].style.animationDelay = `${initialDelay + i * delay}ms`;
  }

  return () => {
    for (const child of children) child.style.animationDelay = '';
  };
}

// ──────────────────────────────────────────────────────────────────
// triggerAnimation — imperative one-shot animation
// ──────────────────────────────────────────────────────────────────

/**
 * Adds `className` to `el`, awaits the animation to complete, then removes it.
 * Used by `useShake()` and similar imperative APIs.
 *
 * Resolves immediately under reduced motion.
 */
export function triggerAnimation(el: Element, className: string): Promise<void> {
  if (!isBrowser || _reducedMotion) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const onEnd = () => {
      el.removeEventListener('animationend', onEnd);
      el.classList.remove(className);
      resolve();
    };
    el.addEventListener('animationend', onEnd, { once: true });
    // Force reflow so the class addition triggers a fresh animation
    // even if the same class was applied moments ago.
    el.classList.remove(className);
    void (el as HTMLElement).offsetWidth;
    el.classList.add(className);
  });
}

// ──────────────────────────────────────────────────────────────────
// startViewTransition — View Transitions API wrapper
// ──────────────────────────────────────────────────────────────────

type ViewTransitionLike = {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
};

/** Named page-transition recipes defined in the motion stylesheet. */
export type PageTransition = 'hard-wipe' | 'color-block' | 'stamp';

/**
 * Wraps `document.startViewTransition` with a no-op fallback for browsers
 * that don't support it (Firefox as of writing). Returns null when unsupported,
 * so callers can detect and skip awaiting.
 *
 * Pass `recipe` to apply one of the named page transitions for this navigation
 * only — it sets `<html data-bk-transition>` and restores the previous value
 * once the transition finishes. Setting that attribute by hand makes it sticky,
 * which then bleeds the recipe into every later transition (the theme toggle's
 * circular reveal included).
 */
export function startViewTransition(
  callback: () => void | Promise<void>,
  recipe?: PageTransition,
): ViewTransitionLike | null {
  if (!isBrowser || _reducedMotion) {
    void callback();
    return null;
  }
  const doc = document as Document & {
    startViewTransition?: (cb: () => void | Promise<void>) => ViewTransitionLike;
  };
  if (typeof doc.startViewTransition !== 'function') {
    void callback();
    return null;
  }

  const root = document.documentElement;
  const previous = recipe ? root.getAttribute('data-bk-transition') : null;
  if (recipe) root.setAttribute('data-bk-transition', recipe);

  const transition = doc.startViewTransition(callback);

  if (recipe) {
    const restore = () => {
      if (previous === null) root.removeAttribute('data-bk-transition');
      else root.setAttribute('data-bk-transition', previous);
    };
    transition.finished.then(restore, restore);
  }

  return transition;
}
