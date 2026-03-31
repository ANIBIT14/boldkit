import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated'

interface SpinnerDotsProps {
  size: number
  color: string
}

const DOT_COUNT = 3

export function SpinnerDots({ size, color }: SpinnerDotsProps) {
  const dotSize = size / 4
  const scales = Array.from({ length: DOT_COUNT }, () => useSharedValue(0.5))

  useEffect(() => {
    scales.forEach((sv, i) => {
      sv.value = withDelay(
        i * 200,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 300 }),
            withTiming(0.5, { duration: 300 }),
          ),
          -1,
          true,
        ),
      )
    })
  }, [])

  const animStyles = scales.map(sv =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAnimatedStyle(() => ({ transform: [{ scale: sv.value }] }))
  )

  return (
    <View style={[styles.row, { gap: dotSize / 2 }]}>
      {scales.map((_, i) => (
        <Animated.View
          key={i}
          style={[
            styles.dot,
            { width: dotSize, height: dotSize, backgroundColor: color },
            animStyles[i],
          ]}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    borderRadius: 0, // square dots
  },
})
