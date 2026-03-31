import React from 'react'
import { Path } from 'react-native-svg'
import { ShapeBase } from './ShapeBase'
import type { ShapeProps } from './types'

export function SpeechBubble(props: ShapeProps) {
  return (
    <ShapeBase {...props} defaultColor="card">
      {(fill, stroke, sw) => (
        <Path d="M10 10 L90 10 L90 65 L40 65 L20 90 L25 65 L10 65 Z" fill={fill} stroke={stroke} strokeWidth={sw} />
      )}
    </ShapeBase>
  )
}
