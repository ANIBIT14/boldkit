import React, { useEffect } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import { View, StyleSheet } from 'react-native'
import { SkiaAvailable } from '../../lib/skia'

interface SpinnerBrutalProps {
  size: number
  color: string
  shadowColor: string
}

/**
 * The "brutal" spinner variant.
 *
 * When Skia is available: renders a rotating square with a precisely offset
 * hard shadow using Skia's Canvas — pixel-perfect neubrutalism.
 *
 * When Skia is NOT installed: gracefully falls back to a simple rotating square
 * using React Native's View + Reanimated (no crash, no warning spam).
 */
export function SpinnerBrutal({ size, color, shadowColor }: SpinnerBrutalProps) {
  const rotation = useSharedValue(0)

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 800, easing: Easing.linear }),
      -1,
      false,
    )
  }, [rotation])

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  if (SkiaAvailable) {
    return <SpinnerBrutalSkia size={size} color={color} shadowColor={shadowColor} rotateStyle={rotateStyle} />
  }

  // Fallback: plain View-based rotating square with manual shadow layer
  const squareSize = size * 0.55
  const offset = 5

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Shadow layer */}
      <View
        style={[
          styles.square,
          {
            width: squareSize,
            height: squareSize,
            backgroundColor: shadowColor,
            position: 'absolute',
            top: size / 2 - squareSize / 2 + offset,
            left: size / 2 - squareSize / 2 + offset,
          },
        ]}
      />
      {/* Rotating foreground square */}
      <Animated.View
        style={[
          styles.square,
          { width: squareSize, height: squareSize, backgroundColor: color },
          rotateStyle,
        ]}
      />
    </View>
  )
}

// Skia implementation (only imported if Skia is available, avoiding require errors)
function SpinnerBrutalSkia({
  size,
  color,
  shadowColor,
  rotateStyle,
}: SpinnerBrutalProps & { rotateStyle: ReturnType<typeof useAnimatedStyle> }) {
  // Dynamic require to prevent module resolution errors when Skia isn't installed
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Canvas, Rect, Paint } = require('@shopify/react-native-skia')
  const squareSize = size * 0.55
  const origin = size / 2
  const x = origin - squareSize / 2
  const offset = 5

  return (
    <Animated.View style={[{ width: size, height: size }, rotateStyle]}>
      <Canvas style={{ width: size, height: size }}>
        {/* Hard offset shadow */}
        <Rect x={x + offset} y={x + offset} width={squareSize} height={squareSize}>
          <Paint color={shadowColor} />
        </Rect>
        {/* Main square */}
        <Rect x={x} y={x} width={squareSize} height={squareSize}>
          <Paint color={color} />
        </Rect>
      </Canvas>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  square: {
    borderRadius: 0,
  },
})
