import React, { useCallback } from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Polyline } from 'react-native-svg'
import { useTheme } from '../../theme/ThemeProvider'
import { BKShadowWrapper, shadowOffset } from '../../theme/shadows'
import { borderWidth, spacing } from '../../theme/spacing'
import { fontWeight, fontSize } from '../../theme/typography'
import { playToggleSound } from '../../lib/audio'
import type { ViewStyle, TextStyle } from 'react-native'

export interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
  style?: ViewStyle
  labelStyle?: TextStyle
}

const BOX_SIZE = 22

export function Checkbox({
  checked = false,
  onCheckedChange,
  label,
  disabled = false,
  style,
  labelStyle,
}: CheckboxProps) {
  const { colors } = useTheme()

  const pressTranslate = useSharedValue(0)
  const shadowOpacity = useSharedValue(1)
  const checkOpacity = useSharedValue(checked ? 1 : 0)

  React.useEffect(() => {
    checkOpacity.value = withTiming(checked ? 1 : 0, { duration: 120 })
  }, [checked, checkOpacity])

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(pressTranslate.value * shadowOffset) },
      { translateY: withSpring(pressTranslate.value * shadowOffset) },
    ],
  }))

  const shadowStyle = useAnimatedStyle(() => ({ opacity: shadowOpacity.value }))
  const checkStyle = useAnimatedStyle(() => ({ opacity: checkOpacity.value }))

  const handlePress = useCallback(() => {
    void playToggleSound(!checked)
    onCheckedChange?.(!checked)
  }, [checked, onCheckedChange])

  return (
    <Pressable
      style={[styles.row, style]}
      onPress={handlePress}
      onPressIn={() => {
        pressTranslate.value = 1
        shadowOpacity.value = withSpring(0)
      }}
      onPressOut={() => {
        pressTranslate.value = 0
        shadowOpacity.value = withSpring(1)
      }}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
    >
      <BKShadowWrapper
        shadowColor={colors.shadowColor}
        offset={shadowOffset}
        style={shadowStyle as ViewStyle}
      >
        <Animated.View
          style={[
            styles.box,
            {
              borderColor: colors.foreground,
              backgroundColor: checked ? colors.primary : colors.background,
            },
            animStyle,
          ]}
        >
          <Animated.View style={checkStyle}>
            <Svg width={14} height={14} viewBox="0 0 14 14">
              <Polyline
                points="2,7 6,11 12,3"
                stroke={colors.primaryForeground}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </Animated.View>
        </Animated.View>
      </BKShadowWrapper>

      {label ? (
        <Text
          style={[
            styles.label,
            { color: disabled ? colors.mutedForeground : colors.foreground },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      ) : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderWidth: borderWidth.default,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
  },
})
