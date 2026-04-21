import { describe, it, expect } from 'vitest'
import { applyBlink, applyTypewriter, applyScanLine, applyMarquee, applyRipple, applyGlitch } from '../lib/presets'

const ROWS = 4
const COLS = 4

function filledGrid(rows: number, cols: number) {
  return Array.from({ length: rows }, () => Array<boolean>(cols).fill(true))
}

describe('applyBlink', () => {
  it('returns 2 frames: original then empty', () => {
    const source = filledGrid(ROWS, COLS)
    const frames = applyBlink(source, ROWS, COLS)
    expect(frames).toHaveLength(2)
    expect(frames[0].grid[0][0]).toBe(true)
    expect(frames[1].grid[0][0]).toBe(false)
  })
})

describe('applyTypewriter', () => {
  it('returns cols frames', () => {
    const frames = applyTypewriter(filledGrid(ROWS, COLS), ROWS, COLS)
    expect(frames).toHaveLength(COLS)
  })

  it('last frame equals source', () => {
    const source = filledGrid(ROWS, COLS)
    const frames = applyTypewriter(source, ROWS, COLS)
    expect(frames[COLS - 1].grid).toEqual(source)
  })

  it('first frame only reveals column 0', () => {
    const source = filledGrid(ROWS, COLS)
    const frames = applyTypewriter(source, ROWS, COLS)
    expect(frames[0].grid[0][0]).toBe(true)
    expect(frames[0].grid[0][1]).toBe(false)
  })
})

describe('applyScanLine', () => {
  it('returns rows frames', () => {
    expect(applyScanLine(filledGrid(ROWS, COLS), ROWS, COLS).length).toBe(ROWS)
  })
  it('frame 0 has dots only in first band', () => {
    const frames = applyScanLine(filledGrid(ROWS, COLS), ROWS, COLS, 1)
    expect(frames[0].grid[0][0]).toBe(true)
    expect(frames[0].grid[1][0]).toBe(false)
  })
})

describe('applyMarquee', () => {
  it('returns cols frames', () => {
    expect(applyMarquee(filledGrid(ROWS, COLS), ROWS, COLS)).toHaveLength(COLS)
  })
})

describe('applyRipple', () => {
  it('returns numFrames frames', () => {
    expect(applyRipple(filledGrid(ROWS, COLS), ROWS, COLS, 5)).toHaveLength(5)
  })
  it('last frame has center dot lit', () => {
    const frames = applyRipple(filledGrid(ROWS, COLS), ROWS, COLS, 10)
    const last = frames[frames.length - 1]
    expect(last.grid[Math.floor(ROWS / 2)][Math.floor(COLS / 2)]).toBe(true)
  })
})

describe('applyGlitch', () => {
  it('returns numFrames frames', () => {
    expect(applyGlitch(filledGrid(ROWS, COLS), ROWS, COLS, 4)).toHaveLength(4)
  })
  it('produces deterministic output for same inputs', () => {
    const source = filledGrid(ROWS, COLS)
    const a = applyGlitch(source, ROWS, COLS, 3)
    const b = applyGlitch(source, ROWS, COLS, 3)
    expect(a[0].grid).toEqual(b[0].grid)
  })
})
