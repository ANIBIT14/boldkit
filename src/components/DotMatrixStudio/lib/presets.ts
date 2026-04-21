import { createEmptyGrid, createFrame } from '../hooks/useStudioState'
import type { Frame, DotGrid } from '../types'

function emptyGrid(rows: number, cols: number): DotGrid {
  return createEmptyGrid(rows, cols)
}

function cloneGrid(grid: DotGrid): DotGrid {
  return grid.map(row => [...row])
}

export function applyBlink(sourceGrid: DotGrid, rows: number, cols: number): Frame[] {
  return [
    { ...createFrame(rows, cols), grid: cloneGrid(sourceGrid) },
    { ...createFrame(rows, cols), grid: emptyGrid(rows, cols) },
  ]
}

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

export function applyScanLine(rows: number, cols: number, bandHeight = 2): Frame[] {
  return Array.from({ length: rows }, (_, r) => {
    const grid = emptyGrid(rows, cols)
    for (let band = 0; band < bandHeight; band++) {
      const row = r + band
      if (row < rows) {
        for (let col = 0; col < cols; col++) grid[row][col] = true
      }
    }
    return { ...createFrame(rows, cols), grid }
  })
}

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

export function applyRipple(rows: number, cols: number, numFrames = 10): Frame[] {
  const cx = (cols - 1) / 2
  const cy = (rows - 1) / 2
  const maxDist = Math.sqrt(cx * cx + cy * cy)

  return Array.from({ length: numFrames }, (_, i) => {
    const threshold = (i / numFrames) * maxDist
    const grid = emptyGrid(rows, cols)
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const dist = Math.sqrt((col - cx) ** 2 + (row - cy) ** 2)
        grid[row][col] = dist <= threshold
      }
    }
    return { ...createFrame(rows, cols), grid }
  })
}

export function applyGlitch(sourceGrid: DotGrid, rows: number, cols: number, numFrames = 6, intensity = 0.05): Frame[] {
  return Array.from({ length: numFrames }, (_, i) => {
    const grid = cloneGrid(sourceGrid)
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const seed = (row * cols + col + i * 997) % 1000
        if (seed / 1000 < intensity) grid[row][col] = !grid[row][col]
      }
    }
    return { ...createFrame(rows, cols), grid }
  })
}
