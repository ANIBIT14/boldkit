/**
 * BoldKit Motion composables (Vue adapter).
 * Mirror the React useShake / useViewTransition hooks.
 */
import { triggerAnimation, startViewTransition, prefersReducedMotion } from '@/lib/motion-core'

/**
 * Returns a function that shakes a given element (e.g. an invalid input).
 *
 *   const shake = useShake()
 *   shake(inputRef.value)
 */
export function useShake() {
  return async (el: Element | null) => {
    if (!el) return
    await triggerAnimation(el, 'bk-shake-x')
  }
}

/**
 * Returns a function that runs `callback` inside a view transition where
 * supported. Falls back to invoking the callback directly. Always safe to call.
 */
export function useViewTransition() {
  return (callback: () => void | Promise<void>) => startViewTransition(callback)
}

export { prefersReducedMotion }
