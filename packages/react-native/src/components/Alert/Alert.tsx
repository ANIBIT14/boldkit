import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../theme/ThemeProvider'
import { BKShadowWrapper, shadowOffset } from '../../theme/shadows'
import { borderWidth, spacing } from '../../theme/spacing'
import { fontWeight, fontSize, letterSpacing } from '../../theme/typography'
import type { ViewStyle, TextStyle } from 'react-native'

export type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info'

// ─── Context ─────────────────────────────────────────────────────────────────

interface AlertContextValue {
  variant: AlertVariant
  hasIcon: boolean
}

const AlertContext = React.createContext<AlertContextValue>({
  variant: 'default',
  hasIcon: false,
})

// ─── Alert Root ───────────────────────────────────────────────────────────────

export interface AlertProps {
  variant?: AlertVariant
  icon?: React.ReactNode
  shadow?: boolean
  style?: ViewStyle
  children: React.ReactNode
}

export function Alert({
  variant = 'default',
  icon,
  shadow = true,
  style,
  children,
}: AlertProps) {
  const { colors } = useTheme()
  const variantStyles = getAlertVariantStyles(variant, colors)

  const inner = (
    <View
      style={[
        styles.alert,
        { borderColor: variantStyles.border, backgroundColor: variantStyles.bg },
        style,
      ]}
    >
      {icon ? <View style={styles.iconSlot}>{icon}</View> : null}
      <View style={[styles.content, icon ? styles.contentWithIcon : null]}>
        <AlertContext.Provider value={{ variant, hasIcon: !!icon }}>
          {children}
        </AlertContext.Provider>
      </View>
    </View>
  )

  if (!shadow) return inner

  return (
    <BKShadowWrapper shadowColor={colors.shadowColor} offset={shadowOffset}>
      {inner}
    </BKShadowWrapper>
  )
}

// ─── AlertTitle ───────────────────────────────────────────────────────────────

export interface AlertTitleProps {
  children: React.ReactNode
  style?: TextStyle
}

export function AlertTitle({ children, style }: AlertTitleProps) {
  const { colors } = useTheme()
  const { variant } = React.useContext(AlertContext)
  const variantStyles = getAlertVariantStyles(variant, colors)

  return (
    <Text style={[styles.title, { color: variantStyles.fg }, style]}>
      {children}
    </Text>
  )
}

// ─── AlertDescription ────────────────────────────────────────────────────────

export interface AlertDescriptionProps {
  children: React.ReactNode
  style?: TextStyle
}

export function AlertDescription({ children, style }: AlertDescriptionProps) {
  const { colors } = useTheme()
  const { variant } = React.useContext(AlertContext)
  const variantStyles = getAlertVariantStyles(variant, colors)

  return (
    <Text style={[styles.description, { color: variantStyles.fg }, style]}>
      {children}
    </Text>
  )
}

// ─── Variant Colors ───────────────────────────────────────────────────────────

function getAlertVariantStyles(
  variant: AlertVariant,
  colors: ReturnType<typeof useTheme>['colors'],
): { bg: string; fg: string; border: string } {
  switch (variant) {
    case 'default':
      return { bg: colors.card, fg: colors.foreground, border: colors.foreground }
    case 'destructive':
      return { bg: colors.destructive + '1a', fg: colors.destructive, border: colors.destructive }
    case 'success':
      return { bg: colors.success + '1a', fg: colors.success, border: colors.success }
    case 'warning':
      return { bg: colors.warning + '1a', fg: colors.warningForeground, border: colors.warning }
    case 'info':
      return { bg: colors.info + '1a', fg: colors.info, border: colors.info }
  }
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  alert: {
    borderWidth: borderWidth.default,
    borderRadius: 0,
    padding: spacing[4],
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconSlot: {
    marginRight: spacing[3],
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  contentWithIcon: {
    // Icon already adds margin via iconSlot
  },
  title: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.wide,
    textTransform: 'uppercase',
    marginBottom: spacing[1],
  },
  description: {
    fontSize: fontSize.sm,
  },
})
