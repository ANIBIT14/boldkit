import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { Canvas } from '../Canvas'
import { createFrame } from '../hooks/useStudioState'
import type { StudioState } from '../types'

function makeState(overrides?: Partial<StudioState>): StudioState {
  const frame = createFrame(4, 4)
  return {
    frames: [frame],
    activeFrameId: frame.id,
    rows: 4,
    cols: 4,
    dotColor: '#E8FF00',
    bgTransparent: false,
    activeTool: 'pencil',
    activeShape: 'rect',
    isPlaying: false,
    playFrameIndex: 0,
    fps: 12,
    loopMode: 'infinite',
    selection: null,
    undoStack: [],
    redoStack: [],
    ...overrides,
  }
}

describe('Canvas', () => {
  it('renders an SVG element', () => {
    const state = makeState()
    const { container } = render(
      <Canvas
        state={state}
        dispatch={vi.fn()}
        activeGrid={state.frames[0].grid}
      />
    )
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('renders rows × cols circles', () => {
    const state = makeState()
    const { container } = render(
      <Canvas state={state} dispatch={vi.fn()} activeGrid={state.frames[0].grid} />
    )
    const circles = container.querySelectorAll('circle')
    expect(circles.length).toBe(16)
  })

  it('filled dots use dotColor fill', () => {
    const frame = createFrame(2, 2)
    frame.grid[0][0] = true
    const state = makeState({ frames: [frame], activeFrameId: frame.id, rows: 2, cols: 2 })
    const { container } = render(
      <Canvas state={state} dispatch={vi.fn()} activeGrid={frame.grid} />
    )
    const circles = Array.from(container.querySelectorAll('circle'))
    const filledDot = circles.find(c => c.getAttribute('fill') === '#E8FF00')
    expect(filledDot).toBeTruthy()
  })

  it('dispatches SET_TOOL on keyboard shortcut P', () => {
    const dispatch = vi.fn()
    const state = makeState()
    render(<Canvas state={state} dispatch={dispatch} activeGrid={state.frames[0].grid} />)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'p' }))
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_TOOL', tool: 'pencil' })
  })

  it('dispatches UNDO on Cmd+Z', () => {
    const dispatch = vi.fn()
    const state = makeState()
    render(<Canvas state={state} dispatch={dispatch} activeGrid={state.frames[0].grid} />)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', metaKey: true }))
    expect(dispatch).toHaveBeenCalledWith({ type: 'UNDO' })
  })
})
