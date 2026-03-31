import React, { createContext, useContext, useState, useMemo } from 'react'
import { useColorScheme as useRNColorScheme } from 'react-native'
import { lightColors, darkColors } from './colors'
import type { ColorTokens } from './colors'

interface ThemeContextValue {
  colors: ColorTokens
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: lightColors,
  isDark: false,
  toggleTheme: () => {},
})

interface BoldKitProviderProps {
  children: React.ReactNode
  /** Force a specific color scheme. Defaults to system preference. */
  colorScheme?: 'light' | 'dark'
}

export function BoldKitProvider({ children, colorScheme }: BoldKitProviderProps) {
  const systemScheme = useRNColorScheme()
  const [overrideScheme, setOverrideScheme] = useState<'light' | 'dark' | null>(
    colorScheme ?? null,
  )

  const activeScheme = overrideScheme ?? systemScheme ?? 'light'
  const isDark = activeScheme === 'dark'
  const colors = isDark ? darkColors : lightColors

  const toggleTheme = () => {
    setOverrideScheme(prev => {
      const current = prev ?? systemScheme ?? 'light'
      return current === 'light' ? 'dark' : 'light'
    })
  }

  const value = useMemo<ThemeContextValue>(
    () => ({ colors, isDark, toggleTheme }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDark],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext)
}
