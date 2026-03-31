import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated'

interface SpinnerBlocksProps {
  size: number
  color: string
  shadowColor: string
}

export function SpinnerBlocks({ size, color, shadowColor }: SpinnerBlocksProps) {
  const blockSize = size * 0.38
  const gap = size * 0.08
  const offset = blockSize + gap

  const rotation = useSharedValue(0)

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1200, easing: Easing.linear }),
      -1,
      false,
    )
  }, [rotation])

  const groupStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  const positions = [
    { top: 0,      left: 0 },
    { top: 0,      left: offset },
    { top: offset, left: 0 },
    { top: offset, left: offset },
  ]

  const colors = [color, shadowColor, shadowColor, color]

  return (
    <Animated.View style={[{ width: size, height: size }, groupStyle]}>
      {positions.map((pos, i) => (
        <View
          key={i}
          style={[
            styles.block,
            {
              width: blockSize,
              height: blockSize,
              backgroundColor: colors[i],
              top: pos.top,
              left: pos.left,
            },
          ]}
        />
      ))}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  block: {
    position: 'absolute',
    borderRadius: 0,
  },
})
