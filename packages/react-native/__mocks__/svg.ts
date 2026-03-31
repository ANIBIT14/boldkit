// Mock for react-native-svg
import React from 'react'
import { View } from 'react-native'

const Svg = ({ children, ...props }: React.PropsWithChildren<object>) =>
  React.createElement(View, props, children)

const createSvgElement = (name: string) =>
  ({ children, ...props }: React.PropsWithChildren<object>) =>
    React.createElement(name, props, children)

export default Svg
export const Circle = createSvgElement('Circle')
export const Ellipse = createSvgElement('Ellipse')
export const G = createSvgElement('G')
export const Path = createSvgElement('Path')
export const Polygon = createSvgElement('Polygon')
export const Polyline = createSvgElement('Polyline')
export const Rect = createSvgElement('Rect')
export const Line = createSvgElement('Line')
export const Defs = createSvgElement('Defs')
export const ClipPath = createSvgElement('ClipPath')
export const LinearGradient = createSvgElement('LinearGradient')
export const RadialGradient = createSvgElement('RadialGradient')
export const Stop = createSvgElement('Stop')
export const Text = createSvgElement('Text')
export const TSpan = createSvgElement('TSpan')
export const Use = createSvgElement('Use')
export const Symbol = createSvgElement('Symbol')
export const Mask = createSvgElement('Mask')
export const Pattern = createSvgElement('Pattern')
export const Image = createSvgElement('Image')
export const ForeignObject = createSvgElement('ForeignObject')
