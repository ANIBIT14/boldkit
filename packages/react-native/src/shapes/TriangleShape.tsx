import React from 'react'
import { Path } from 'react-native-svg'
import { ShapeBase } from './ShapeBase'
import type { ShapeProps } from './types'

export function TriangleShape(props: ShapeProps) {
  return (
    <ShapeBase {...props} defaultColor="accent">
      {(fill, stroke, sw) => (
        <Path d="M50 5 L95 90 L5 90 Z" fill={fill} stroke={stroke} strokeWidth={sw} />
      )}
    </ShapeBase>
  )
}
