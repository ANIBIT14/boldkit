import { describe, it, expect } from 'vitest'
import { tweenFrames } from '../lib/tween'
import { createFrame } from '../hooks/useStudioState'

const ROWS = 4
const COLS = 4

describe('tweenFrames', () => {
  it('returns N intermediate frames', () => {
    const a = createFrame(ROWS, COLS)
    const b = createFrame(ROWS, COLS)
    expect(tweenFrames(a, b, 3, ROWS, COLS)).toHaveLength(3)
  })

  it('intermediate frames progress toward frameB state', () => {
    const a = createFrame(ROWS, COLS)
    const b = { ...createFrame(ROWS, COLS), grid: Array.from({ length: ROWS }, () => Array<boolean>(COLS).fill(true)) }
    const frames = tweenFrames(a, b, 5, ROWS, COLS)
    const dotCounts = frames.map(f => f.grid.flat().filter(Boolean).length)
    for (let i = 1; i < dotCounts.length; i++) {
      expect(dotCounts[i]).toBeGreaterThanOrEqual(dotCounts[i - 1])
    }
  })

  it('dots that are same in A and B stay unchanged', () => {
    const grid = Array.from({ length: ROWS }, () => Array<boolean>(COLS).fill(true))
    const a = { ...createFrame(ROWS, COLS), grid }
    const b = { ...createFrame(ROWS, COLS), grid: grid.map(r => [...r]) }
    const frames = tweenFrames(a, b, 3, ROWS, COLS)
    frames.forEach(f => {
      expect(f.grid.flat().every(Boolean)).toBe(true)
    })
  })

  it('produces deterministic output', () => {
    const a = createFrame(ROWS, COLS)
    const b = { ...createFrame(ROWS, COLS), grid: Array.from({ length: ROWS }, () => Array<boolean>(COLS).fill(true)) }
    const x = tweenFrames(a, b, 3, ROWS, COLS)
    const y = tweenFrames(a, b, 3, ROWS, COLS)
    expect(x[0].grid).toEqual(y[0].grid)
  })
})
