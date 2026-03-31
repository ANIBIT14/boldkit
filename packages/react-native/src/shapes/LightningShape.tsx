import React from 'react'
import { Path } from 'react-native-svg'
import { ShapeBase } from './ShapeBase'
import type { ShapeProps } from './types'

export function LightningShape({ size = 100, ...props }: ShapeProps) {
  // Matches web: width = size * 0.6, height = size, viewBox="0 0 60 100"
  return (
    <ShapeBase
      {...props}
      size={size}
      defaultColor="warning"
      viewBox="0 0 60 100"
      svgWidth={size * 0.6}
      svgHeight={size}
    >
      {(fill, stroke, sw) => (
        <Path d="M35 0 L5 55 L25 55 L15 100 L55 40 L35 40 L50 0 Z" fill={fill} stroke={stroke} strokeWidth={sw} />
      )}
    </ShapeBase>
  )
}
