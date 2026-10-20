import { ref, watch, onMounted, provide, inject, nextTick, type InjectionKey, type Ref } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

/**
 * Where a circular reveal starts: an element (its centre — works for keyboard
 * activation too) or a point in viewport coordinates. A MouseEvent fits the
 * point shape, but keyboard-triggered clicks report 0,0.
 */
export type RevealOrigin = Element | { x: number; y: number }

export interface SetThemeOptions {
  /** Wipe the new theme in as a circle growing from here. Omit for an instant swap. */
  origin?: RevealOrigin
}

export interface ThemeProviderState {
  theme: Ref<Theme>
  setTheme: (theme: Theme, options?: SetThemeOptions) => void
  resolvedTheme: Ref<'light' | 'dark'>
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => { ready: Promise<void> }
}

/**
 * Run `update` behind a circular-reveal View Transition: the page as it looks
 * after `update` wipes in over the old one, from `origin`. Falls back to
 * running `update` directly when View Transitions are unsupported, the user
 * prefers reduced motion, or there is no DOM (SSR). Return `nextTick()` from
 * `update` when it changes reactive state, so the DOM is patched before the
 * new snapshot is taken.
 */
export function circularReveal(update: () => void | Promise<void>, origin?: RevealOrigin): void {
  if (typeof document === 'undefined' || !origin) return void update()
  const doc = document as ViewTransitionDocument
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (typeof doc.startViewTransition !== 'function' || reduced) return void update()

  let x: number
  let y: number
  if ('getBoundingClientRect' in origin) {
    const r = origin.getBoundingClientRect()
    x = r.left + r.width / 2
    y = r.top + r.height / 2
  } else {
    ;({ x, y } = origin)
  }

  let transition: { ready: Promise<void> }
  try {
    transition = doc.startViewTransition(update)
  } catch {
    return void update()
  }

  transition.ready
    .then(() => {
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
      const timing = { duration: 600, easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)' }
      const root = document.documentElement
      // Hold the old view still and opaque (replacing the default cross-fade)
      // so only the circle moves. Done here rather than in CSS so the
      // composable needs no stylesheet.
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

// Shared by the provider and the provider-less fallback.
function createSetTheme(theme: Ref<Theme>, storageKey: string) {
  return (newTheme: Theme, options?: SetThemeOptions) => {
    const commit = () => {
      try {
        localStorage.setItem(storageKey, newTheme)
      } catch {
        // Storage blocked (private mode, sandboxed iframe): theme still applies.
      }
      theme.value = newTheme
    }
    if (!options?.origin) return commit()
    // The theme watcher flips the <html> class before the DOM patch nextTick awaits.
    circularReveal(() => {
      commit()
      return nextTick()
    }, options.origin)
  }
}

function readStored(storageKey: string): Theme | null {
  try {
    return localStorage.getItem(storageKey) as Theme | null
  } catch {
    return null
  }
}

export const ThemeProviderKey: InjectionKey<ThemeProviderState> = Symbol('ThemeProvider')

export interface UseThemeProviderOptions {
  defaultTheme?: Theme
  storageKey?: string
}

export function useThemeProvider(options: UseThemeProviderOptions = {}) {
  const { defaultTheme = 'system', storageKey = 'boldkit-theme' } = options

  const theme = ref<Theme>(defaultTheme)
  const resolvedTheme = ref<'light' | 'dark'>('light')

  // Initialize from localStorage
  onMounted(() => {
    const stored = readStored(storageKey)
    if (stored) {
      theme.value = stored
    }
  })

  // Watch theme changes and update DOM
  watch(
    theme,
    (newTheme) => {
      // `immediate: true` fires this during setup, which runs on the server under
      // SSR (Nuxt) — bail before touching window/document there.
      if (typeof window === 'undefined') return
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')

      if (newTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        root.classList.add(systemTheme)
        resolvedTheme.value = systemTheme
      } else {
        root.classList.add(newTheme)
        resolvedTheme.value = newTheme
      }
    },
    { immediate: true }
  )

  const setTheme = createSetTheme(theme, storageKey)

  const state: ThemeProviderState = {
    theme,
    setTheme,
    resolvedTheme,
  }

  provide(ThemeProviderKey, state)

  return state
}

export function useTheme(): ThemeProviderState {
  const context = inject(ThemeProviderKey)

  if (!context) {
    // Fallback: create a standalone theme state if not provided
    const theme = ref<Theme>('system')
    const resolvedTheme = ref<'light' | 'dark'>('light')
    const storageKey = 'boldkit-theme'

    onMounted(() => {
      const stored = readStored(storageKey)
      if (stored) {
        theme.value = stored
      }
      updateTheme(theme.value)
    })

    const updateTheme = (newTheme: Theme) => {
      if (typeof window === 'undefined') return
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')

      if (newTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        root.classList.add(systemTheme)
        resolvedTheme.value = systemTheme
      } else {
        root.classList.add(newTheme)
        resolvedTheme.value = newTheme
      }
    }

    watch(theme, updateTheme)

    const setTheme = createSetTheme(theme, storageKey)

    return {
      theme,
      setTheme,
      resolvedTheme,
    }
  }

  return context
}
