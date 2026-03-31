import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import { useTheme } from '../../theme/ThemeProvider'
import { BKShadowWrapper, shadowOffset } from '../../theme/shadows'
import { borderWidth, spacing } from '../../theme/spacing'
import { fontWeight, fontSize } from '../../theme/typography'
import type { ViewStyle } from 'react-native'

export type ProgressVariant = 'default' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive'

export interface ProgressProps {
  value?: number          // 0–100
  variant?: ProgressVariant
  showLabel?: boolean
  height?: number
  style?: ViewStyle
}

export function Progress({
  value = 0,
  variant = 'default',
  showLabel = false,
  height = 20,
  style,
}: ProgressProps) {
  const { colors } = useTheme()
  const clampedValue = Math.min(100, Math.max(0, value))

  const widthPercent = useSharedValue(clampedValue)

  React.useEffect(() => {
    widthPercent.value = withTiming(clampedValue, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    })
  }, [clampedValue, widthPercent])

  const fillStyle = useAnimatedStyle(() => ({
    width: `${widthPercent.value}%`,
  }))

  const fillColor = getVariantColor(variant, colors)

  return (
    <View style={style}>
      {showLabel ? (
        <View style={styles.labelRow}>
          <Text style={[styles.label, { color: colors.foreground }]}>
            {clampedValue}%
          </Text>
        </View>
      ) : null}
      <BKShadowWrapper shadowColor={colors.shadowColor} offset={shadowOffset}>
        <View
          style={[
            styles.track,
            {
              height,
              borderColor: colors.foreground,
              backgroundColor: colors.muted,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.fill,
              { backgroundColor: fillColor, borderRightWidth: clampedValue > 0 && clampedValue < 100 ? borderWidth.default : 0, borderRightColor: colors.foreground },
              fillStyle,
            ]}
          />
        </View>
      </BKShadowWrapper>
    </View>
  )
}

function getVariantColor(
  variant: ProgressVariant,
  colors: ReturnType<typeof useTheme>['colors'],
): string {
  switch (variant) {
    case 'default':     return colors.primary
    case 'secondary':   return colors.secondary
    case 'accent':      return colors.accent
    case 'success':     return colors.success
    case 'warning':     return colors.warning
    case 'destructive': return colors.destructive
  }
}

const styles = StyleSheet.create({
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: spacing[1],
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
  },
  track: {
    width: '100%',
    borderWidth: borderWidth.default,
    borderRadius: 0,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
})
