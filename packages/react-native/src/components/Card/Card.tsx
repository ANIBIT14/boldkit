import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { useTheme } from '../../theme/ThemeProvider'
import { BKShadowWrapper, shadowOffset } from '../../theme/shadows'
import { borderWidth, spacing } from '../../theme/spacing'
import { fontWeight, fontSize, letterSpacing } from '../../theme/typography'
import type { ViewStyle, TextStyle } from 'react-native'

// ─── Card Root ────────────────────────────────────────────────────────────────

export interface CardProps {
  children: React.ReactNode
  interactive?: boolean
  onPress?: () => void
  style?: ViewStyle
}

export function Card({ children, interactive = false, onPress, style }: CardProps) {
  const { colors } = useTheme()
  const pressTranslate = useSharedValue(0)
  const shadowOpacity = useSharedValue(1)

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(pressTranslate.value * shadowOffset) },
      { translateY: withSpring(pressTranslate.value * shadowOffset) },
    ],
  }))

  const shadowStyle = useAnimatedStyle(() => ({
    opacity: shadowOpacity.value,
  }))

  const cardContent = (
    <BKShadowWrapper
      shadowColor={colors.shadowColor}
      offset={shadowOffset}
      style={shadowStyle as ViewStyle}
    >
      <Animated.View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.foreground },
          animStyle,
          style,
        ]}
      >
        {children}
      </Animated.View>
    </BKShadowWrapper>
  )

  if (!interactive) return cardContent

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        pressTranslate.value = 1
        shadowOpacity.value = withSpring(0)
      }}
      onPressOut={() => {
        pressTranslate.value = 0
        shadowOpacity.value = withSpring(1)
      }}
    >
      {cardContent}
    </Pressable>
  )
}

// ─── CardHeader ───────────────────────────────────────────────────────────────

export interface CardHeaderProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function CardHeader({ children, style }: CardHeaderProps) {
  const { colors } = useTheme()
  return (
    <View
      style={[styles.header, { borderBottomColor: colors.foreground }, style]}
    >
      {children}
    </View>
  )
}

// ─── CardTitle ────────────────────────────────────────────────────────────────

export interface CardTitleProps {
  children: React.ReactNode
  style?: TextStyle
}

export function CardTitle({ children, style }: CardTitleProps) {
  const { colors } = useTheme()
  return (
    <Text style={[styles.title, { color: colors.foreground }, style]}>
      {children}
    </Text>
  )
}

// ─── CardDescription ─────────────────────────────────────────────────────────

export interface CardDescriptionProps {
  children: React.ReactNode
  style?: TextStyle
}

export function CardDescription({ children, style }: CardDescriptionProps) {
  const { colors } = useTheme()
  return (
    <Text style={[styles.description, { color: colors.mutedForeground }, style]}>
      {children}
    </Text>
  )
}

// ─── CardContent ─────────────────────────────────────────────────────────────

export interface CardContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function CardContent({ children, style }: CardContentProps) {
  return <View style={[styles.content, style]}>{children}</View>
}

// ─── CardFooter ───────────────────────────────────────────────────────────────

export interface CardFooterProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function CardFooter({ children, style }: CardFooterProps) {
  const { colors } = useTheme()
  return (
    <View style={[styles.footer, { borderTopColor: colors.foreground }, style]}>
      {children}
    </View>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    borderWidth: borderWidth.default,
    borderRadius: 0,
    overflow: 'hidden',
  },
  header: {
    padding: spacing[4],
    borderBottomWidth: borderWidth.default,
  },
  title: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.wide,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: fontSize.sm,
    marginTop: spacing[1],
  },
  content: {
    padding: spacing[4],
  },
  footer: {
    padding: spacing[4],
    borderTopWidth: borderWidth.default,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
