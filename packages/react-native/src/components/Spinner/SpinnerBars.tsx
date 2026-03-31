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

interface SpinnerBarsProps {
  size: number
  color: string
}

const BAR_COUNT = 4

export function SpinnerBars({ size, color }: SpinnerBarsProps) {
  const barWidth = size / 6
  const minHeight = size * 0.3
  const maxHeight = size

  const heights = Array.from({ length: BAR_COUNT }, () => useSharedValue(minHeight))

  useEffect(() => {
    heights.forEach((sv, i) => {
      sv.value = withDelay(
        i * 120,
        withRepeat(
          withSequence(
            withTiming(maxHeight, { duration: 300 }),
            withTiming(minHeight, { duration: 300 }),
          ),
          -1,
          true,
        ),
      )
    })
  }, [])

  const animStyles = heights.map(sv =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAnimatedStyle(() => ({ height: sv.value }))
  )

  return (
    <View style={[styles.row, { height: size, gap: barWidth / 2 }]}>
      {heights.map((_, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            { width: barWidth, backgroundColor: color },
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
  bar: {
    borderRadius: 0,
  },
})
