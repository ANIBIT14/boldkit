import { useCallback } from 'react'
import type { DotGrid } from '../types'

/**
 * Given a text string, renders it using the NDot47 font onto an offscreen canvas,
 * samples pixel data at each dot-cell centre, and returns a DotGrid.
 */
export function sampleTextToGrid(text: string, rows: number, cols: number): DotGrid {
  const canvas = document.createElement('canvas')
  canvas.width = cols
  canvas.height = rows
  const ctx = canvas.getContext('2d')
  if (!ctx) return Array.from({ length: rows }, () => Array<boolean>(cols).fill(false))

  ctx.clearRect(0, 0, cols, rows)
  ctx.fillStyle = '#ffffff'

  // Fit font size so text spans ~90% of canvas width
  const targetWidth = cols * 0.9
  let fontSize = rows * 0.8
  ctx.font = `${fontSize}px NDot47`
  const measured = ctx.measureText(text).width
  if (measured > 0) fontSize = (targetWidth / measured) * fontSize
  fontSize = Math.min(fontSize, rows)

  ctx.font = `${fontSize}px NDot47`
  const metrics = ctx.measureText(text)
  const textWidth = metrics.width
  const x = (cols - textWidth) / 2
  const y = rows * 0.75 // baseline at ~75% height
  ctx.fillText(text, x, y)

  const imageData = ctx.getImageData(0, 0, cols, rows)
  const { data } = imageData

  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => {
      const pixelIndex = (row * cols + col) * 4
      const alpha = data[pixelIndex + 3]
      return alpha > 128
    })
  )
}

export function useTextTool(rows: number, cols: number) {
  const textToGrid = useCallback(
    (text: string) => sampleTextToGrid(text, rows, cols),
    [rows, cols]
  )
  return { textToGrid }
}
