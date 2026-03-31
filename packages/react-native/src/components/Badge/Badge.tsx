import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../theme/ThemeProvider'
import { borderWidth, spacing } from '../../theme/spacing'
import { fontWeight, letterSpacing, fontSize } from '../../theme/typography'
import type { ViewStyle, TextStyle } from 'react-native'

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'accent'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'info'
  | 'outline'

export interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
}

export function Badge({
  variant = 'default',
  children,
  style,
  textStyle,
}: BadgeProps) {
  const { colors } = useTheme()
  const variantColors = getBadgeColors(variant, colors)

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: variantColors.bg,
          borderColor: colors.foreground,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: variantColors.fg },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </View>
  )
}

function getBadgeColors(
  variant: BadgeVariant,
  colors: ReturnType<typeof useTheme>['colors'],
): { bg: string; fg: string } {
  switch (variant) {
    case 'default':     return { bg: colors.primary,     fg: colors.primaryForeground }
    case 'secondary':   return { bg: colors.secondary,   fg: colors.secondaryForeground }
    case 'accent':      return { bg: colors.accent,      fg: colors.accentForeground }
    case 'destructive': return { bg: colors.destructive, fg: colors.destructiveForeground }
    case 'success':     return { bg: colors.success,     fg: colors.successForeground }
    case 'warning':     return { bg: colors.warning,     fg: colors.warningForeground }
    case 'info':        return { bg: colors.info,        fg: colors.infoForeground }
    case 'outline':     return { bg: 'transparent',      fg: colors.foreground }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: borderWidth.default,
    borderRadius: 0,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[0.5],
  },
  text: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.wide,
    textTransform: 'uppercase',
  },
})
