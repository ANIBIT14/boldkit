import React, { useCallback } from 'react'
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated'
import { useTheme } from '../../theme/ThemeProvider'
import { BKShadowWrapper, shadowOffset } from '../../theme/shadows'
import { playClickSound } from '../../lib/audio'
import { buttonContainerVariants, buttonTextVariants } from './Button.variants'
import type { ButtonVariant, ButtonSize, ButtonAnimation } from './Button.variants'
import type { ViewStyle, TextStyle } from 'react-native'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  animation?: ButtonAnimation
  disabled?: boolean
  loading?: boolean
  soundOnPress?: boolean
  onPress?: () => void
  children?: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
  accessibilityLabel?: string
}

export function Button({
  variant = 'default',
  size = 'default',
  animation = 'none',
  disabled = false,
  loading = false,
  soundOnPress = false,
  onPress,
  children,
  style,
  textStyle,
  accessibilityLabel,
}: ButtonProps) {
  const { colors } = useTheme()

  // Press-down animation: translate(4, 4) to "sink into" the shadow
  const pressTranslate = useSharedValue(0)
  const shadowOpacity = useSharedValue(1)

  // Continuous animations
  const pulseScale = useSharedValue(1)
  const bounceTranslateY = useSharedValue(0)
  const shakeTranslateX = useSharedValue(0)
  const wiggleRotate = useSharedValue(0)

  React.useEffect(() => {
    if (animation === 'pulse') {
      pulseScale.value = withRepeat(
        withSequence(withTiming(1.06, { duration: 700 }), withTiming(1, { duration: 700 })),
        -1,
        true,
      )
    } else if (animation === 'bounce') {
      bounceTranslateY.value = withRepeat(
        withSequence(withTiming(-8, { duration: 400 }), withTiming(0, { duration: 400 })),
        -1,
        true,
      )
    } else if (animation === 'shake') {
      shakeTranslateX.value = withRepeat(
        withSequence(
          withTiming(-4, { duration: 80 }),
          withTiming(4, { duration: 80 }),
          withTiming(0, { duration: 80 }),
        ),
        -1,
        false,
      )
    } else if (animation === 'wiggle') {
      wiggleRotate.value = withRepeat(
        withSequence(withTiming(-6, { duration: 150 }), withTiming(6, { duration: 150 })),
        -1,
        true,
      )
    }
  }, [animation, pulseScale, bounceTranslateY, shakeTranslateX, wiggleRotate])

  const animatedPressStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(pressTranslate.value * shadowOffset) },
      { translateY: withSpring(pressTranslate.value * shadowOffset) },
      { scale: pulseScale.value },
      { translateY: bounceTranslateY.value },
      { translateX: shakeTranslateX.value },
      { rotate: `${wiggleRotate.value}deg` },
    ],
  }))

  const animatedShadowStyle = useAnimatedStyle(() => ({
    opacity: shadowOpacity.value,
  }))

  const handlePressIn = useCallback(() => {
    pressTranslate.value = 1
    shadowOpacity.value = withTiming(0, { duration: 50 })
  }, [pressTranslate, shadowOpacity])

  const handlePressOut = useCallback(() => {
    pressTranslate.value = 0
    shadowOpacity.value = withTiming(1, { duration: 100 })
  }, [pressTranslate, shadowOpacity])

  const handlePress = useCallback(() => {
    if (soundOnPress) {
      void playClickSound()
    }
    onPress?.()
  }, [soundOnPress, onPress])

  // Resolve background and text colors per variant
  const variantColors = getVariantColors(variant, colors)

  const containerStyle = buttonContainerVariants({ size }, {
    backgroundColor: variantColors.bg,
    borderColor: colors.foreground,
    opacity: disabled ? 0.5 : 1,
    ...style,
  })

  const labelStyle = buttonTextVariants({ size }, {
    color: variantColors.fg,
    ...textStyle,
  })

  return (
    <BKShadowWrapper
      shadowColor={colors.shadowColor}
      offset={shadowOffset}
      style={animatedShadowStyle as ViewStyle}
    >
      <AnimatedPressable
        style={[containerStyle, animatedPressStyle]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: disabled || loading }}
      >
        {loading ? (
          <ActivityIndicator size="small" color={variantColors.fg} />
        ) : (
          typeof children === 'string' ? (
            <Text style={labelStyle}>{children}</Text>
          ) : (
            children
          )
        )}
      </AnimatedPressable>
    </BKShadowWrapper>
  )
}

function getVariantColors(
  variant: ButtonVariant,
  colors: ReturnType<typeof useTheme>['colors'],
): { bg: string; fg: string } {
  switch (variant) {
    case 'default':     return { bg: colors.primary,     fg: colors.primaryForeground }
    case 'secondary':   return { bg: colors.secondary,   fg: colors.secondaryForeground }
    case 'accent':      return { bg: colors.accent,      fg: colors.accentForeground }
    case 'destructive': return { bg: colors.destructive, fg: colors.destructiveForeground }
    case 'outline':     return { bg: 'transparent',      fg: colors.foreground }
    case 'ghost':       return { bg: 'transparent',      fg: colors.foreground }
  }
}

// Suppress unused StyleSheet warning
void StyleSheet
