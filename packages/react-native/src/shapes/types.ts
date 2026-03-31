import type { ViewStyle } from 'react-native'

export type ShapeAnimation = 'none' | 'spin' | 'pulse' | 'float' | 'wiggle' | 'bounce' | 'glitch'
export type ShapeSpeed = 'slow' | 'normal' | 'fast'

export interface ShapeProps {
  size?: number
  strokeWidth?: number
  filled?: boolean
  color?: string       // Fill color. Defaults to a theme color per shape.
  strokeColor?: string // Stroke color. Defaults to theme foreground.
  animation?: ShapeAnimation
  speed?: ShapeSpeed
  style?: ViewStyle
}
