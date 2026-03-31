import React, { useCallback } from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated'
import { useTheme } from '../../theme/ThemeProvider'
import { BKShadowWrapper, shadowOffset } from '../../theme/shadows'
import { borderWidth, spacing } from '../../theme/spacing'
import { fontWeight, fontSize } from '../../theme/typography'
import { playToggleSound } from '../../lib/audio'
import type { ViewStyle, TextStyle } from 'react-native'

export interface SwitchProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
  style?: ViewStyle
  labelStyle?: TextStyle
}

const TRACK_WIDTH = 52
const TRACK_HEIGHT = 28
const THUMB_SIZE = TRACK_HEIGHT - borderWidth.default * 2 - 4 // inset thumb
const THUMB_TRAVEL = TRACK_WIDTH - THUMB_SIZE - borderWidth.default * 2 - 4

export function Switch({
  checked = false,
  onCheckedChange,
  label,
  disabled = false,
  style,
  labelStyle,
}: SwitchProps) {
  const { colors } = useTheme()

  const progress = useSharedValue(checked ? 1 : 0)
  const pressTranslate = useSharedValue(0)
  const shadowOpacity = useSharedValue(1)

  React.useEffect(() => {
    progress.value = withSpring(checked ? 1 : 0, { damping: 15, stiffness: 200 })
  }, [checked, progress])

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(progress.value * THUMB_TRAVEL) }],
  }))

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.muted, colors.primary],
    ),
  }))

  const wrapperAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(pressTranslate.value * shadowOffset) },
      { translateY: withSpring(pressTranslate.value * shadowOffset) },
    ],
  }))

  const shadowStyle = useAnimatedStyle(() => ({ opacity: shadowOpacity.value }))

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
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
    >
      <BKShadowWrapper
        shadowColor={colors.shadowColor}
        offset={shadowOffset}
        style={shadowStyle as ViewStyle}
      >
        <Animated.View
          style={[
            styles.track,
            { borderColor: colors.foreground },
            trackStyle,
            wrapperAnimStyle,
          ]}
        >
          {/* Square thumb — neubrutalism has NO rounded corners */}
          <Animated.View
            style={[
              styles.thumb,
              { backgroundColor: colors.foreground },
              thumbStyle,
            ]}
          />
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
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderWidth: borderWidth.default,
    borderRadius: 0, // sharp corners
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 0, // square thumb
  },
  label: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
  },
})
