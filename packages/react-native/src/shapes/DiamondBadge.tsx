import React from 'react'
import { Path } from 'react-native-svg'
import { ShapeBase } from './ShapeBase'
import type { ShapeProps } from './types'

export function DiamondBadge(props: ShapeProps) {
  return (
    <ShapeBase {...props} defaultColor="primary">
      {(fill, stroke, sw) => (
        <Path d="M50 5 L95 50 L50 95 L5 50 Z" fill={fill} stroke={stroke} strokeWidth={sw} />
      )}
    </ShapeBase>
  )
}
