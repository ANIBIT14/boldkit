import React from 'react'
import { View } from 'react-native'
import { useTheme } from '../../theme/ThemeProvider'
import { SpinnerDefault } from './SpinnerDefault'
import { SpinnerDots } from './SpinnerDots'
import { SpinnerBars } from './SpinnerBars'
import { SpinnerBlocks } from './SpinnerBlocks'
import { SpinnerBrutal } from './SpinnerBrutal'
import type { ViewStyle } from 'react-native'

export type SpinnerVariant = 'default' | 'dots' | 'bars' | 'blocks' | 'brutal'
export type SpinnerSize = 'sm' | 'default' | 'lg'

const SIZE_MAP: Record<SpinnerSize, number> = {
  sm: 24, default: 36, lg: 48,
}

export interface SpinnerProps {
  variant?: SpinnerVariant
  size?: SpinnerSize
  color?: string
  style?: ViewStyle
}

export function Spinner({
  variant = 'default',
  size = 'default',
  color,
  style,
}: SpinnerProps) {
  const { colors } = useTheme()
  const resolvedColor = color ?? colors.primary
  const resolvedSize = SIZE_MAP[size]

  const inner = (() => {
    switch (variant) {
      case 'dots':
        return <SpinnerDots size={resolvedSize} color={resolvedColor} />
      case 'bars':
        return <SpinnerBars size={resolvedSize} color={resolvedColor} />
      case 'blocks':
        return <SpinnerBlocks size={resolvedSize} color={resolvedColor} shadowColor={colors.foreground} />
      case 'brutal':
        return <SpinnerBrutal size={resolvedSize} color={resolvedColor} shadowColor={colors.foreground} />
      default:
        return <SpinnerDefault size={resolvedSize} color={resolvedColor} trackColor={colors.muted} />
    }
  })()

  return (
    <View
      style={[{ alignItems: 'center', justifyContent: 'center' }, style]}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
    >
      {inner}
    </View>
  )
}
