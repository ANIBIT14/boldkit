import React from 'react'
import { Path } from 'react-native-svg'
import { ShapeBase } from './ShapeBase'
import type { ShapeProps } from './types'

export function SealShape(props: ShapeProps) {
  return (
    <ShapeBase {...props} defaultColor="success">
      {(fill, stroke, sw) => (
        <Path
          d="M50 5 Q60 5 65 12 Q72 8 78 15 Q85 12 88 22 Q95 22 95 32 Q100 40 95 50 Q100 60 95 68 Q95 78 88 78 Q85 88 78 85 Q72 92 65 88 Q60 95 50 95 Q40 95 35 88 Q28 92 22 85 Q15 88 12 78 Q5 78 5 68 Q0 60 5 50 Q0 40 5 32 Q5 22 12 22 Q15 12 22 15 Q28 8 35 12 Q40 5 50 5 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
        />
      )}
    </ShapeBase>
  )
}
