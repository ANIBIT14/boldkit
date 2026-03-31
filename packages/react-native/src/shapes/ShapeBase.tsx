/**
 * Internal helper for building shape components.
 * Not exported from the public index — consumers use individual shape components.
 */
import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import Svg from 'react-native-svg'
import { useTheme } from '../theme/ThemeProvider'
import { useShapeAnimation } from './useShapeAnimation'
import type { ShapeProps } from './types'

interface ShapeBaseProps extends ShapeProps {
  defaultColor: keyof ReturnType<typeof useTheme>['colors']
  viewBox?: string
  svgWidth?: number  // when width differs from size (e.g. LightningShape)
  svgHeight?: number
  children: (fill: string, stroke: string, strokeWidth: number) => React.ReactNode
}

export function ShapeBase({
  size = 100,
  strokeWidth = 3,
  filled = true,
  color,
  strokeColor,
  animation = 'none',
  speed = 'normal',
  defaultColor,
  viewBox,
  svgWidth,
  svgHeight,
  style,
  children,
}: ShapeBaseProps) {
  const { colors } = useTheme()
  const animStyle = useShapeAnimation(animation, speed)

  const fill = filled ? (color ?? colors[defaultColor] ?? colors.primary) : 'none'
  const stroke = strokeColor ?? colors.foreground
  const w = svgWidth ?? size
  const h = svgHeight ?? size

  return (
    <Animated.View style={[{ width: w, height: h }, animStyle, style]}>
      <Svg
        width={w}
        height={h}
        viewBox={viewBox ?? `0 0 100 100`}
      >
        {children(fill as string, stroke, strokeWidth)}
      </Svg>
    </Animated.View>
  )
}
