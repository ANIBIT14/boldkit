import React from 'react'
import { Path, Circle } from 'react-native-svg'
import { ShapeBase } from './ShapeBase'
import { useTheme } from '../theme/ThemeProvider'
import type { ShapeProps } from './types'

export function GearShape(props: ShapeProps) {
  const { colors } = useTheme()
  return (
    <ShapeBase {...props} defaultColor="mutedForeground">
      {(fill, stroke, sw) => (
        <>
          <Path
            d="M42 8 L58 8 L60 18 L68 14 L76 22 L72 30 L82 34 L82 48 L72 50 L76 58 L68 66 L60 62 L58 72 L42 72 L40 62 L32 66 L24 58 L28 50 L18 48 L18 34 L28 30 L24 22 L32 14 L40 18 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth={sw}
          />
          <Circle
            cx="50"
            cy="40"
            r="12"
            fill={colors.background}
            stroke={stroke}
            strokeWidth={sw}
          />
        </>
      )}
    </ShapeBase>
  )
}
