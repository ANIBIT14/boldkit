import { createFrame } from '../hooks/useStudioState'
import type { Frame } from '../types'

export function tweenFrames(frameA: Frame, frameB: Frame, n: number, rows: number, cols: number): Frame[] {
  const total = rows * cols

  const revealOrder: number[][] = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ((r * cols + c) * 2654435761) % total / total)
  )

  return Array.from({ length: n }, (_, i) => {
    const progress = (i + 1) / (n + 1)
    const grid = frameA.grid.map((row, r) =>
      row.map((dotA, c) => {
        const dotB = frameB.grid[r]?.[c] ?? false
        if (dotA === dotB) return dotA
        return revealOrder[r][c] <= progress ? dotB : dotA
      })
    )
    return { ...createFrame(rows, cols), grid, duration: Math.round((frameA.duration + frameB.duration) / 2) }
  })
}
