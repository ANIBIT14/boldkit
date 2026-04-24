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

/** Reveals your art column by column (ltr = left-to-right, rtl = right-to-left) */
export function applyTypewriter(
  sourceGrid: DotGrid, rows: number, cols: number,
  direction: 'ltr' | 'rtl' = 'ltr'
): Frame[] {
  return Array.from({ length: cols }, (_, c) => {
    const grid = emptyGrid(rows, cols)
    for (let col = 0; col < cols; col++) {
      const revealed = direction === 'ltr' ? col <= c : col >= cols - 1 - c
      if (revealed) {
        for (let row = 0; row < rows; row++) {
          grid[row][col] = sourceGrid[row][col]
        }
      }
    }
    return { ...createFrame(rows, cols), grid }
  })
}

/** Sweeps row by row revealing your art (ttb = top-to-bottom, btt = bottom-to-top) */
export function applyScanLine(
  sourceGrid: DotGrid, rows: number, cols: number,
  bandHeight = 2,
  direction: 'ttb' | 'btt' = 'ttb'
): Frame[] {
  return Array.from({ length: rows }, (_, r) => {
    const grid = emptyGrid(rows, cols)
    for (let row = 0; row < rows; row++) {
      const revealed = direction === 'ttb'
        ? row <= r + bandHeight - 1
        : row >= rows - 1 - r - bandHeight + 1
      if (revealed) {
        for (let col = 0; col < cols; col++) {
          grid[row][col] = sourceGrid[row][col]
        }
      }
    }
    return { ...createFrame(rows, cols), grid }
  })
}

/** Scrolls your art wrapping around (left = art moves left, right = art moves right) */
export function applyMarquee(
  sourceGrid: DotGrid, rows: number, cols: number,
  direction: 'left' | 'right' = 'left'
): Frame[] {
  return Array.from({ length: cols }, (_, shift) => {
    const grid = emptyGrid(rows, cols)
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const srcCol = direction === 'left'
          ? (col + shift) % cols
          : ((col - shift) + cols * 2) % cols
        grid[row][col] = sourceGrid[row][srcCol]
      }
    }
    return { ...createFrame(rows, cols), grid }
  })
}

/** Reveals your art from center outward or contracts inward */
export function applyRipple(
  sourceGrid: DotGrid, rows: number, cols: number,
  numFrames = 10,
  direction: 'expand' | 'contract' = 'expand'
): Frame[] {
  const cx = (cols - 1) / 2
  const cy = (rows - 1) / 2
  const maxDist = Math.sqrt(cx * cx + cy * cy)

  return Array.from({ length: numFrames }, (_, i) => {
    const fi = direction === 'expand' ? i : numFrames - 1 - i
    const threshold = ((fi + 1) / numFrames) * maxDist
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

/** Marquee ping-pong: scrolls left then reverses direction (bounce effect) */
export function applyBounce(sourceGrid: DotGrid, rows: number, cols: number): Frame[] {
  const halfLen = Math.ceil(cols / 2)
  const forward: Frame[] = Array.from({ length: halfLen }, (_, shift) => {
    const grid = emptyGrid(rows, cols)
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        grid[row][col] = sourceGrid[row][(col + shift) % cols]
      }
    }
    return { ...createFrame(rows, cols), grid }
  })
  // Reverse excluding shared endpoints to avoid stutter at the turnaround
  const backward = [...forward].reverse().slice(1, forward.length - 1)
  return [...forward, ...backward]
}

/**
 * Art slides in from one edge as a coherent block.
 * direction = the edge the art enters FROM (right = enters from right, moves left to settle).
 */
export function applySlide(
  sourceGrid: DotGrid, rows: number, cols: number,
  direction: 'left' | 'right' | 'up' | 'down' = 'right'
): Frame[] {
  if (direction === 'left' || direction === 'right') {
    return Array.from({ length: cols }, (_, step) => {
      const grid = emptyGrid(rows, cols)
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // 'right': enters from right, slides left — srcCol grows inward as step increases
          // 'left':  enters from left, slides right — srcCol grows inward as step increases
          const srcCol = direction === 'right'
            ? col + step - (cols - 1)
            : col - step + (cols - 1)
          if (srcCol >= 0 && srcCol < cols) {
            grid[row][col] = sourceGrid[row][srcCol]
          }
        }
      }
      return { ...createFrame(rows, cols), grid }
    })
  } else {
    return Array.from({ length: rows }, (_, step) => {
      const grid = emptyGrid(rows, cols)
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // 'down': enters from bottom, slides up
          // 'up':   enters from top, slides down
          const srcRow = direction === 'down'
            ? row + step - (rows - 1)
            : row - step + (rows - 1)
          if (srcRow >= 0 && srcRow < rows) {
            grid[row][col] = sourceGrid[srcRow][col]
          }
        }
      }
      return { ...createFrame(rows, cols), grid }
    })
  }
}

/**
 * Dots dissolve in or out using a dithered reveal order.
 * Dots appear at scattered positions (checkerboard interleave) for a dissolve look.
 */
export function applyFade(
  sourceGrid: DotGrid, rows: number, cols: number,
  direction: 'in' | 'out' = 'in',
  numFrames = 8
): Frame[] {
  // Collect all filled positions
  const filled: [number, number][] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (sourceGrid[r][c]) filled.push([r, c])
    }
  }

  if (filled.length === 0) {
    return [{ ...createFrame(rows, cols), grid: cloneGrid(sourceGrid) }]
  }

  // Dithered order: interleave by Bayer-like 2×2 levels (even-even first, then odd-odd last).
  // This makes dots appear scattered rather than reading-order, giving a true dissolve look.
  filled.sort((a, b) => {
    const aLevel = (a[0] % 2) * 2 + (a[1] % 2)
    const bLevel = (b[0] % 2) * 2 + (b[1] % 2)
    if (aLevel !== bLevel) return aLevel - bLevel
    return (a[0] * cols + a[1]) - (b[0] * cols + b[1])
  })

  return Array.from({ length: numFrames }, (_, i) => {
    const progress = direction === 'in'
      ? (i + 1) / numFrames
      : (numFrames - i) / numFrames
    const showCount = Math.round(filled.length * progress)

    const grid = emptyGrid(rows, cols)
    for (let k = 0; k < showCount; k++) {
      grid[filled[k][0]][filled[k][1]] = true
    }
    return { ...createFrame(rows, cols), grid }
  })
}
