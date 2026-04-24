import { describe, it, expect } from 'vitest'
import { applyBlink, applyTypewriter, applyScanLine, applyMarquee, applyRipple, applyWave, applyRain } from '../lib/presets'

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

describe('applyWave', () => {
  it('returns numFrames frames', () => {
    expect(applyWave(filledGrid(ROWS, COLS), ROWS, COLS, 8)).toHaveLength(8)
  })

  it('every frame has correct grid dimensions', () => {
    const frames = applyWave(filledGrid(ROWS, COLS), ROWS, COLS, 4)
    for (const frame of frames) {
      expect(frame.grid).toHaveLength(ROWS)
      expect(frame.grid[0]).toHaveLength(COLS)
    }
  })

  it('source dots are preserved — filled source produces lit dots across all frames', () => {
    const source = filledGrid(ROWS, COLS)
    const frames = applyWave(source, ROWS, COLS, 8)
    // With a fully filled source every frame must have at least one lit dot per column
    for (const frame of frames) {
      for (let c = 0; c < COLS; c++) {
        const colHasDot = frame.grid.some(row => row[c])
        expect(colHasDot).toBe(true)
      }
    }
  })

  it('empty source produces all-empty frames', () => {
    const empty = Array.from({ length: ROWS }, () => Array<boolean>(COLS).fill(false))
    const frames = applyWave(empty, ROWS, COLS, 4)
    for (const frame of frames) {
      expect(frame.grid.every(row => row.every(v => !v))).toBe(true)
    }
  })
})

describe('applyRain', () => {
  it('returns numFrames frames', () => {
    expect(applyRain(filledGrid(ROWS, COLS), ROWS, COLS, 10)).toHaveLength(10)
  })

  it('every frame has correct grid dimensions', () => {
    const frames = applyRain(filledGrid(ROWS, COLS), ROWS, COLS, 5)
    for (const frame of frames) {
      expect(frame.grid).toHaveLength(ROWS)
      expect(frame.grid[0]).toHaveLength(COLS)
    }
  })

  it('dots only appear within grid bounds', () => {
    const frames = applyRain(filledGrid(ROWS, COLS), ROWS, COLS, 20)
    for (const frame of frames) {
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          expect(typeof frame.grid[r][c]).toBe('boolean')
        }
      }
    }
  })

  it('produces different frames as drops advance', () => {
    const frames = applyRain(filledGrid(ROWS, COLS), ROWS, COLS, 10)
    // Not all frames should be identical — drops move
    const first = JSON.stringify(frames[0].grid)
    const hasVariation = frames.some(f => JSON.stringify(f.grid) !== first)
    expect(hasVariation).toBe(true)
  })
})
