import React from 'react'
import { Path } from 'react-native-svg'
import { ShapeBase } from './ShapeBase'
import type { ShapeProps } from './types'

export function BlobShape(props: ShapeProps) {
  return (
    <ShapeBase {...props} defaultColor="secondary">
      {(fill, stroke, sw) => (
        <Path d="M50 5 Q80 10 90 35 Q95 60 80 80 Q60 95 40 90 Q15 85 10 60 Q5 35 25 15 Q40 5 50 5 Z" fill={fill} stroke={stroke} strokeWidth={sw} />
      )}
    </ShapeBase>
  )
}
