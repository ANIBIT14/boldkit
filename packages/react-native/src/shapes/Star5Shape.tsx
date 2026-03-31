import React from 'react'
import { Path } from 'react-native-svg'
import { ShapeBase } from './ShapeBase'
import type { ShapeProps } from './types'

export function Star5Shape(props: ShapeProps) {
  return (
    <ShapeBase {...props} defaultColor="accent">
      {(fill, stroke, sw) => (
        <Path d="M50 5 L61 38 L95 38 L68 59 L79 93 L50 72 L21 93 L32 59 L5 38 L39 38 Z" fill={fill} stroke={stroke} strokeWidth={sw} />
      )}
    </ShapeBase>
  )
}
