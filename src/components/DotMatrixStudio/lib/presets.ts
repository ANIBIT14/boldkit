import { createEmptyGrid, createFrame } from '../hooks/useStudioState'
import type { Frame, DotGrid } from '../types'

function emptyGrid(rows: number, cols: number): DotGrid {
  return createEmptyGrid(rows, cols)
}

function cloneGrid(grid: DotGrid): DotGrid {
  return grid.map(row => [...row])
}

/** 2 frames: your art ↔ blank */
export function applyBlink(sourceGrid: DotGrid, rows: number, cols: number): Frame[] {
  return [
    { ...createFrame(rows, cols), grid: cloneGrid(sourceGrid) },
    { ...createFrame(rows, cols), grid: emptyGrid(rows, cols) },
  ]
}

/** Reveals your art column by column, left to right */
export function applyTypewriter(sourceGrid: DotGrid, rows: number, cols: number): Frame[] {
  return Array.from({ length: cols }, (_, c) => {
    const grid = emptyGrid(rows, cols)
    for (let col = 0; col <= c; col++) {
      for (let row = 0; row < rows; row++) {
        grid[row][col] = sourceGrid[row][col]
      }
    }
    return { ...createFrame(rows, cols), grid }
  })
}

/** Sweeps top-to-bottom revealing your art one row band at a time */
export function applyScanLine(sourceGrid: DotGrid, rows: number, cols: number, bandHeight = 2): Frame[] {
  return Array.from({ length: rows }, (_, r) => {
    const grid = emptyGrid(rows, cols)
    for (let row = 0; row <= r + bandHeight - 1 && row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        grid[row][col] = sourceGrid[row][col]
      }
    }
    return { ...createFrame(rows, cols), grid }
  })
}

/** Scrolls your art across cols frames, wrapping around */
export function applyMarquee(sourceGrid: DotGrid, rows: number, cols: number): Frame[] {
  return Array.from({ length: cols }, (_, shift) => {
    const grid = emptyGrid(rows, cols)
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const srcCol = (col + shift) % cols
        grid[row][col] = sourceGrid[row][srcCol]
      }
    }
    return { ...createFrame(rows, cols), grid }
  })
}

/** Reveals your art from center outward in concentric rings */
export function applyRipple(sourceGrid: DotGrid, rows: number, cols: number, numFrames = 10): Frame[] {
  const cx = (cols - 1) / 2
  const cy = (rows - 1) / 2
  const maxDist = Math.sqrt(cx * cx + cy * cy)

  return Array.from({ length: numFrames }, (_, i) => {
    const threshold = ((i + 1) / numFrames) * maxDist
    const grid = emptyGrid(rows, cols)
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const dist = Math.sqrt((col - cx) ** 2 + (row - cy) ** 2)
        if (dist <= threshold) grid[row][col] = sourceGrid[row][col]
      }
    }
    return { ...createFrame(rows, cols), grid }
  })
}

