import React, { createContext, useContext, useState } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../theme/ThemeProvider'
import { BKShadowWrapper, shadowOffset } from '../../theme/shadows'
import { borderWidth } from '../../theme/spacing'
import { fontWeight } from '../../theme/typography'
import type { ViewStyle, TextStyle } from 'react-native'

// ─── Context ─────────────────────────────────────────────────────────────────

interface AvatarContextValue {
  hasError: boolean
  setHasError: (v: boolean) => void
  isLoaded: boolean
  setIsLoaded: (v: boolean) => void
}

const AvatarContext = createContext<AvatarContextValue>({
  hasError: false,
  setHasError: () => {},
  isLoaded: false,
  setIsLoaded: () => {},
})

// ─── Avatar Root ─────────────────────────────────────────────────────────────

export type AvatarSize = 'sm' | 'default' | 'lg' | 'xl'

const SIZE_MAP: Record<AvatarSize, number> = {
  sm: 32, default: 40, lg: 56, xl: 72,
}

export interface AvatarProps {
  size?: AvatarSize
  shadow?: boolean
  style?: ViewStyle
  children: React.ReactNode
}

export function Avatar({ size = 'default', shadow = true, style, children }: AvatarProps) {
  const { colors } = useTheme()
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const dim = SIZE_MAP[size]

  const inner = (
    <View
      style={[
        styles.avatar,
        { width: dim, height: dim, borderColor: colors.foreground },
        style,
      ]}
    >
      <AvatarContext.Provider value={{ hasError, setHasError, isLoaded, setIsLoaded }}>
        {children}
      </AvatarContext.Provider>
    </View>
  )

  if (!shadow) return inner

  return (
    <BKShadowWrapper shadowColor={colors.shadowColor} offset={shadowOffset}>
      {inner}
    </BKShadowWrapper>
  )
}

// ─── AvatarImage ──────────────────────────────────────────────────────────────

export interface AvatarImageProps {
  uri: string
  alt?: string
  style?: ViewStyle
}

export function AvatarImage({ uri, alt, style }: AvatarImageProps) {
  const { hasError, setHasError, setIsLoaded } = useContext(AvatarContext)

  if (hasError) return null

  return (
    <Image
      source={{ uri }}
      style={[StyleSheet.absoluteFill, style]}
      resizeMode="cover"
      accessibilityLabel={alt}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
    />
  )
}

// ─── AvatarFallback ───────────────────────────────────────────────────────────

export interface AvatarFallbackProps {
  children: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
}

export function AvatarFallback({ children, style, textStyle }: AvatarFallbackProps) {
  const { hasError, isLoaded } = useContext(AvatarContext)
  const { colors } = useTheme()

  if (isLoaded && !hasError) return null

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        styles.fallback,
        { backgroundColor: colors.primary },
        style,
      ]}
    >
      <Text
        style={[
          styles.fallbackText,
          { color: colors.primaryForeground },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </View>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  avatar: {
    borderWidth: borderWidth.default,
    borderRadius: 0,
    overflow: 'hidden',
    position: 'relative',
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontWeight: fontWeight.bold,
    textTransform: 'uppercase',
  },
})
