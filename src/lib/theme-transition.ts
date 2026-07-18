import { startViewTransition } from './motion-core'

/**
 * Toggle the theme with a circular-reveal View Transition — the new theme wipes
 * in as a circle expanding from `origin` (the toggle button). Falls back to an
 * instant swap when the View Transitions API is unavailable or the user prefers
 * reduced motion (both handled by `startViewTransition`).
 *
 * The DOM class is flipped imperatively inside the transition callback so the
 * "new" snapshot captures the new theme; `commit` then syncs React state
 * (persistence + the sun/moon icon) — re-applying the same class is a no-op.
 */
export function toggleThemeWithReveal(
  next: 'light' | 'dark',
  origin: { x: number; y: number },
  commit: () => void,
): void {
  const root = document.documentElement

  const transition = startViewTransition(() => {
    root.classList.remove('light', 'dark')
    root.classList.add(next)
  })

  // Keep React in sync regardless of View Transition support.
  commit()

  // null → reduced motion or unsupported: the swap already happened instantly.
  if (!transition) return

  const { x, y } = origin
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )

  transition.ready
    .then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 900,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
    .catch(() => {
      /* transition skipped/interrupted — new theme is already applied */
    })
}
