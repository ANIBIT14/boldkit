import React from 'react'
import { Path } from 'react-native-svg'
import { ShapeBase } from './ShapeBase'
import type { ShapeProps } from './types'

export function BurstShape(props: ShapeProps) {
  return (
    <ShapeBase {...props} defaultColor="primary">
      {(fill, stroke, sw) => (
        <Path d="M50 0 L58 35 L95 20 L68 45 L100 50 L68 55 L95 80 L58 65 L50 100 L42 65 L5 80 L32 55 L0 50 L32 45 L5 20 L42 35 Z" fill={fill} stroke={stroke} strokeWidth={sw} />
      )}
    </ShapeBase>
  )
}
