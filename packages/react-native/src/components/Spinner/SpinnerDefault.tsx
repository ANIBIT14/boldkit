import React, { useEffect } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface SpinnerDefaultProps {
  size: number
  color: string
  trackColor: string
}

const STROKE = 4

export function SpinnerDefault({ size, color, trackColor }: SpinnerDefaultProps) {
  const radius = (size - STROKE * 2) / 2
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * 0.25 // show ~75% arc

  const rotation = useSharedValue(0)

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 900, easing: Easing.linear }),
      -1,
      false,
    )
  }, [rotation])

  const animatedProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Track */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={trackColor}
        strokeWidth={STROKE}
        fill="none"
      />
      {/* Spinning arc */}
      <AnimatedCircle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={STROKE}
        fill="none"
        strokeDasharray={`${circumference - dashOffset} ${dashOffset}`}
        strokeLinecap="square"
        animatedProps={animatedProps}
        origin={`${size / 2}, ${size / 2}`}
      />
    </Svg>
  )
}
