import React from 'react'
import { Path } from 'react-native-svg'
import { ShapeBase } from './ShapeBase'
import type { ShapeProps } from './types'

export function HexagonShape(props: ShapeProps) {
  return (
    <ShapeBase {...props} defaultColor="secondary">
      {(fill, stroke, sw) => (
        <Path d="M25 10 L75 10 L95 50 L75 90 L25 90 L5 50 Z" fill={fill} stroke={stroke} strokeWidth={sw} />
      )}
    </ShapeBase>
  )
}
