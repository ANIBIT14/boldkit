import { ref, watch, onMounted, provide, inject, type InjectionKey, type Ref } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

export interface ThemeProviderState {
  theme: Ref<Theme>
  setTheme: (theme: Theme) => void
  resolvedTheme: Ref<'light' | 'dark'>
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
    const stored = localStorage.getItem(storageKey) as Theme | null
    if (stored) {
      theme.value = stored
    }
  })

  // Watch theme changes and update DOM
  watch(
    theme,
    (newTheme) => {
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

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme)
    theme.value = newTheme
  }

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
      const stored = localStorage.getItem(storageKey) as Theme | null
      if (stored) {
        theme.value = stored
      }
      updateTheme(theme.value)
    })

    const updateTheme = (newTheme: Theme) => {
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

    const setTheme = (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      theme.value = newTheme
    }

    return {
      theme,
      setTheme,
      resolvedTheme,
    }
  }

  return context
}
