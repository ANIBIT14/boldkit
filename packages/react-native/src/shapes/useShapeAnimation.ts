import { useEffect } from 'react'
import {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated'
import type { ShapeAnimation, ShapeSpeed } from './types'

const DURATION: Record<ShapeSpeed, number> = {
  slow: 2000,
  normal: 1200,
  fast: 600,
}

/**
 * Returns an Animated style object implementing the given shape animation.
 * Replaces the CSS class system (shape-animate-spin, shape-animate-pulse, etc.)
 * from the web implementation.
 */
export function useShapeAnimation(
  animation: ShapeAnimation = 'none',
  speed: ShapeSpeed = 'normal',
) {
  const sv = useSharedValue(0)
  const duration = DURATION[speed]

  useEffect(() => {
    if (animation === 'none') {
      sv.value = 0
      return
    }

    switch (animation) {
      case 'spin':
        sv.value = withRepeat(
          withTiming(1, { duration, easing: Easing.linear }),
          -1,
          false,
        )
        break
      case 'pulse':
        sv.value = withRepeat(
          withSequence(withTiming(1, { duration }), withTiming(0, { duration })),
          -1,
          true,
        )
        break
      case 'float':
        sv.value = withRepeat(
          withSequence(withTiming(1, { duration }), withTiming(0, { duration })),
          -1,
          true,
        )
        break
      case 'wiggle':
        sv.value = withRepeat(
          withSequence(
            withTiming(1, { duration: duration / 4 }),
            withTiming(-1, { duration: duration / 4 }),
          ),
          -1,
          true,
        )
        break
      case 'bounce':
        sv.value = withRepeat(
          withSequence(withTiming(1, { duration }), withTiming(0, { duration: duration * 0.5 })),
          -1,
          true,
        )
        break
      case 'glitch':
        sv.value = withRepeat(
          withSequence(
            withTiming(1, { duration: duration * 0.2 }),
            withTiming(-1, { duration: duration * 0.2 }),
            withTiming(0.5, { duration: duration * 0.2 }),
            withTiming(-0.5, { duration: duration * 0.2 }),
            withTiming(0, { duration: duration * 0.2 }),
          ),
          -1,
          false,
        )
        break
    }
  }, [animation, speed, sv, duration])

  return useAnimatedStyle(() => {
    switch (animation) {
      case 'spin':
        return { transform: [{ rotate: `${sv.value * 360}deg` }] }
      case 'pulse':
        return { transform: [{ scale: 0.88 + sv.value * 0.24 }] }
      case 'float':
        return { transform: [{ translateY: (sv.value - 0.5) * -12 }] }
      case 'wiggle':
        return { transform: [{ rotate: `${sv.value * 10}deg` }] }
      case 'bounce':
        return { transform: [{ translateY: -Math.abs(sv.value) * 14 }] }
      case 'glitch':
        return { transform: [{ translateX: sv.value * 4 }, { translateY: sv.value * -2 }] }
      default:
        return {}
    }
  })
}
