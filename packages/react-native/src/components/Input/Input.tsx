import React, { useCallback, useState } from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import { useTheme } from '../../theme/ThemeProvider'
import { BKShadowWrapper, shadowOffset } from '../../theme/shadows'
import { borderWidth, spacing } from '../../theme/spacing'
import { fontWeight, fontSize, letterSpacing } from '../../theme/typography'
import type { TextInputProps, ViewStyle, TextStyle } from 'react-native'

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string
  error?: string
  hint?: string
  containerStyle?: ViewStyle
  inputStyle?: TextStyle
}

export function Input({
  label,
  error,
  hint,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const { colors } = useTheme()
  const [isFocused, setIsFocused] = useState(false)

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

  const handleFocus = useCallback(
    (e: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => {
      setIsFocused(true)
      pressTranslate.value = 1
      shadowOpacity.value = withSpring(0)
      onFocus?.(e)
    },
    [onFocus, pressTranslate, shadowOpacity],
  )

  const handleBlur = useCallback(
    (e: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => {
      setIsFocused(false)
      pressTranslate.value = 0
      shadowOpacity.value = withSpring(1)
      onBlur?.(e)
    },
    [onBlur, pressTranslate, shadowOpacity],
  )

  const borderColor = error
    ? colors.destructive
    : isFocused
      ? colors.foreground
      : colors.foreground

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? (
        <Text style={[styles.label, { color: colors.foreground }]}>{label}</Text>
      ) : null}
      <BKShadowWrapper
        shadowColor={colors.shadowColor}
        offset={shadowOffset}
        style={shadowStyle as ViewStyle}
      >
        <Animated.View
          style={[
            styles.inputContainer,
            { borderColor, backgroundColor: colors.background },
            animStyle,
          ]}
        >
          <TextInput
            style={[styles.input, { color: colors.foreground }, inputStyle]}
            placeholderTextColor={colors.mutedForeground}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
        </Animated.View>
      </BKShadowWrapper>
      {error ? (
        <Text style={[styles.error, { color: colors.destructive }]}>{error}</Text>
      ) : hint ? (
        <Text style={[styles.hint, { color: colors.mutedForeground }]}>{hint}</Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing[1],
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.wide,
    textTransform: 'uppercase',
    marginBottom: spacing[1],
  },
  inputContainer: {
    borderWidth: borderWidth.default,
    borderRadius: 0,
    height: 44,
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: spacing[3],
    fontSize: fontSize.base,
    height: '100%',
  },
  error: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    marginTop: spacing[1],
  },
  hint: {
    fontSize: fontSize.xs,
    marginTop: spacing[1],
  },
})
