/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { flushSync } from 'react-dom'

type Theme = 'light' | 'dark' | 'system'

/**
 * Where a circular reveal starts: an element (its centre — works for keyboard
 * activation too, so prefer `e.currentTarget`) or a point in viewport
 * coordinates, e.g. `{ x: e.clientX, y: e.clientY }`.
 */
export type RevealOrigin = Element | { x: number; y: number }

export interface SetThemeOptions {
  /** Wipe the new theme in as a circle growing from here. Omit for an instant swap. */
  origin?: RevealOrigin
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme, options?: SetThemeOptions) => void
  resolvedTheme: 'light' | 'dark'
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> }
}

/**
 * Run `update` behind a circular-reveal View Transition: the page as it looks
 * after `update` wipes in over the old one, from `origin`. Falls back to
 * running `update` directly when View Transitions are unsupported, the user
 * prefers reduced motion, or there is no DOM (SSR). `update` must change the
 * DOM synchronously; React state set inside it is flushed with flushSync.
 */
export function circularReveal(update: () => void, origin?: RevealOrigin): void {
  const run = () => flushSync(update)
  if (typeof document === 'undefined' || !origin) return run()
  const doc = document as ViewTransitionDocument
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (typeof doc.startViewTransition !== 'function' || reduced) return run()

  const { x, y } =
    'getBoundingClientRect' in origin
      ? (() => {
          const r = origin.getBoundingClientRect()
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
        })()
      : origin

  let transition: { ready: Promise<void> }
  try {
    transition = doc.startViewTransition(run)
  } catch {
    return run()
  }

  transition.ready
    .then(() => {
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
      const timing = { duration: 600, easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)' }
      const root = document.documentElement
      // Hold the old view still and opaque (replacing the default cross-fade)
      // so only the circle moves. Done here rather than in CSS so the hook
      // needs no stylesheet.
      const solid = { opacity: [1, 1], mixBlendMode: ['normal', 'normal'] }
      root.animate(solid, { ...timing, pseudoElement: '::view-transition-old(root)' })
      root.animate(
        { ...solid, clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { ...timing, pseudoElement: '::view-transition-new(root)' }
      )
    })
    .catch(() => {
      // Skipped (e.g. a second toggle mid-reveal): the update already applied.
    })
}

function resolve(theme: Theme): 'light' | 'dark' {
  if (theme !== 'system') return theme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(
  undefined
)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'boldkit-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme
    try {
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme
    } catch {
      return defaultTheme
    }
  })

  const resolvedTheme = React.useMemo<'light' | 'dark'>(
    () => (typeof window === 'undefined' ? 'light' : resolve(theme)),
    [theme]
  )

  React.useEffect(() => {
    const root = window.document.documentElement
    // Idempotent: during a circular-reveal theme toggle the class is flipped
    // imperatively inside the View Transition callback (see circularReveal).
    // Re-running remove('light','dark') + add() here would momentarily leave the
    // element with no theme class — a one-frame flash that races the transition
    // and reads as "switch first, then animate". Skip when already correct —
    // but only when the *other* class is absent, so a root that somehow carries
    // both still gets healed instead of being stuck forever.
    const stale = resolvedTheme === 'dark' ? 'light' : 'dark'
    if (root.classList.contains(resolvedTheme) && !root.classList.contains(stale)) return
    root.classList.remove('light', 'dark')
    root.classList.add(resolvedTheme)
  }, [resolvedTheme])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (newTheme: Theme, options?: SetThemeOptions) => {
        const commit = () => {
          try {
            localStorage.setItem(storageKey, newTheme)
          } catch {
            // Storage blocked (private mode, sandboxed iframe): theme still applies.
          }
          setTheme(newTheme)
        }
        if (!options?.origin) return commit()
        circularReveal(() => {
          // Flip the class here, not in the effect, so the "new" snapshot is
          // guaranteed to show the new theme.
          const root = document.documentElement
          root.classList.remove('light', 'dark')
          root.classList.add(resolve(newTheme))
          commit()
        }, options.origin)
      },
      resolvedTheme,
    }),
    [theme, resolvedTheme, storageKey]
  )

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
