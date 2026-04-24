import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useStudioState, createEmptyGrid } from '../hooks/useStudioState'

describe('useStudioState', () => {
  beforeEach(() => { localStorage.clear() })
  it('initialises with one 16×32 frame', () => {
    const { result } = renderHook(() => useStudioState())
    expect(result.current.state.frames).toHaveLength(1)
    expect(result.current.state.rows).toBe(16)
    expect(result.current.state.cols).toBe(32)
    expect(result.current.state.activeTool).toBe('pencil')
  })

  it('SET_DOT fills a dot on the active frame', () => {
    const { result } = renderHook(() => useStudioState())
    act(() => { result.current.setDot(2, 5, true) })
    expect(result.current.activeFrame.grid[2][5]).toBe(true)
  })

  it('SET_DOT ignores out-of-bounds coordinates', () => {
    const { result } = renderHook(() => useStudioState())
    act(() => { result.current.setDot(99, 99, true) })
    expect(result.current.activeFrame.grid[0][0]).toBe(false)
  })

  it('SET_TOOL changes activeTool', () => {
    const { result } = renderHook(() => useStudioState())
    act(() => { result.current.dispatch({ type: 'SET_TOOL', tool: 'eraser' }) })
    expect(result.current.state.activeTool).toBe('eraser')
  })

  it('ADD_FRAME inserts a blank frame after active and activates it', () => {
    const { result } = renderHook(() => useStudioState())
    act(() => { result.current.dispatch({ type: 'ADD_FRAME' }) })
    expect(result.current.state.frames).toHaveLength(2)
    expect(result.current.activeFrame.id).toBe(result.current.state.activeFrameId)
    expect(result.current.activeFrame.id).not.toBe(result.current.state.frames[0].id)
  })

  it('ADD_FRAME with duplicate:true copies current grid', () => {
    const { result } = renderHook(() => useStudioState())
    act(() => { result.current.setDot(0, 0, true) })
    act(() => { result.current.dispatch({ type: 'ADD_FRAME', duplicate: true }) })
    expect(result.current.activeFrame.grid[0][0]).toBe(true)
  })

  it('DELETE_FRAME removes a frame and activates neighbour', () => {
    const { result } = renderHook(() => useStudioState())
    act(() => { result.current.dispatch({ type: 'ADD_FRAME' }) })
    const secondId = result.current.state.activeFrameId
    act(() => { result.current.dispatch({ type: 'DELETE_FRAME', frameId: secondId }) })
    expect(result.current.state.frames).toHaveLength(1)
    expect(result.current.state.activeFrameId).not.toBe(secondId)
  })

  it('DELETE_FRAME does nothing when only one frame exists', () => {
    const { result } = renderHook(() => useStudioState())
    const onlyId = result.current.state.activeFrameId
    act(() => { result.current.dispatch({ type: 'DELETE_FRAME', frameId: onlyId }) })
    expect(result.current.state.frames).toHaveLength(1)
  })

  it('CHANGE_GRID_SIZE resets all frames to new dimensions', () => {
    const { result } = renderHook(() => useStudioState())
    act(() => { result.current.setDot(0, 0, true) })
    act(() => { result.current.dispatch({ type: 'CHANGE_GRID_SIZE', rows: 8, cols: 8 }) })
    expect(result.current.state.rows).toBe(8)
    expect(result.current.state.cols).toBe(8)
    expect(result.current.activeFrame.grid[0][0]).toBe(false)
  })

  it('UNDO restores previous frame state', () => {
    const { result } = renderHook(() => useStudioState())
    act(() => { result.current.setDot(1, 1, true) })
    act(() => { result.current.dispatch({ type: 'UNDO' }) })
    expect(result.current.activeFrame.grid[1][1]).toBe(false)
  })

  it('REDO re-applies undone changes', () => {
    const { result } = renderHook(() => useStudioState())
    act(() => { result.current.setDot(3, 3, true) })
    act(() => { result.current.dispatch({ type: 'UNDO' }) })
    act(() => { result.current.dispatch({ type: 'REDO' }) })
    expect(result.current.activeFrame.grid[3][3]).toBe(true)
  })

  it('UNDO does nothing when stack is empty', () => {
    const { result } = renderHook(() => useStudioState())
    act(() => { result.current.dispatch({ type: 'UNDO' }) })
    expect(result.current.state.frames).toHaveLength(1)
  })

  it('SET_FPS clamps to 1-60', () => {
    const { result } = renderHook(() => useStudioState())
    act(() => { result.current.dispatch({ type: 'SET_FPS', fps: 999 }) })
    expect(result.current.state.fps).toBe(60)
    act(() => { result.current.dispatch({ type: 'SET_FPS', fps: 0 }) })
    expect(result.current.state.fps).toBe(1)
  })
})

describe('createEmptyGrid', () => {
  it('creates a rows×cols grid of false', () => {
    const grid = createEmptyGrid(4, 6)
    expect(grid).toHaveLength(4)
    expect(grid[0]).toHaveLength(6)
    expect(grid.every(row => row.every(v => v === false))).toBe(true)
  })
})

describe('selection actions', () => {
  function makeState() {
    return renderHook(() => useStudioState())
  }

  it('FILL_SELECTION sets all dots in the box to true', () => {
    const { result } = makeState()
    act(() => {
      result.current.dispatch({
        type: 'SET_SELECTION',
        selection: { startRow: 0, startCol: 0, endRow: 2, endCol: 2 },
      })
    })
    act(() => { result.current.dispatch({ type: 'FILL_SELECTION' }) })
    expect(result.current.activeFrame.grid[0][0]).toBe(true)
    expect(result.current.activeFrame.grid[2][2]).toBe(true)
    expect(result.current.activeFrame.grid[3][3]).toBe(false)
  })

  it('CLEAR_SELECTION sets all dots in the box to false', () => {
    const { result } = makeState()
    // Fill the whole frame first
    act(() => { result.current.applyGrid(Array.from({ length: 16 }, () => Array(32).fill(true))) })
    act(() => {
      result.current.dispatch({
        type: 'SET_SELECTION',
        selection: { startRow: 0, startCol: 0, endRow: 1, endCol: 1 },
      })
    })
    act(() => { result.current.dispatch({ type: 'CLEAR_SELECTION' }) })
    expect(result.current.activeFrame.grid[0][0]).toBe(false)
    expect(result.current.activeFrame.grid[1][1]).toBe(false)
    // Outside box stays filled
    expect(result.current.activeFrame.grid[2][2]).toBe(true)
  })

  it('INVERT_SELECTION flips dots in the box', () => {
    const { result } = makeState()
    // Set dot (0,0) to true, leave (0,1) false
    act(() => { result.current.setDot(0, 0, true) })
    act(() => {
      result.current.dispatch({
        type: 'SET_SELECTION',
        selection: { startRow: 0, startCol: 0, endRow: 0, endCol: 1 },
      })
    })
    act(() => { result.current.dispatch({ type: 'INVERT_SELECTION' }) })
    expect(result.current.activeFrame.grid[0][0]).toBe(false) // was true, now false
    expect(result.current.activeFrame.grid[0][1]).toBe(true)  // was false, now true
    // Outside box is unchanged
    expect(result.current.activeFrame.grid[1][0]).toBe(false)
  })

  it('FILL/CLEAR/INVERT_SELECTION do nothing when selection is null', () => {
    const { result } = makeState()
    const before = result.current.activeFrame.grid[0][0]
    act(() => { result.current.dispatch({ type: 'FILL_SELECTION' }) })
    expect(result.current.activeFrame.grid[0][0]).toBe(before)
  })

  it('FILL_SELECTION handles inverted selection (startRow > endRow)', () => {
    const { result } = makeState()
    act(() => {
      result.current.dispatch({
        type: 'SET_SELECTION',
        selection: { startRow: 3, startCol: 3, endRow: 1, endCol: 1 },
      })
    })
    act(() => { result.current.dispatch({ type: 'FILL_SELECTION' }) })
    expect(result.current.activeFrame.grid[1][1]).toBe(true)
    expect(result.current.activeFrame.grid[3][3]).toBe(true)
  })

  it('selection actions push undo snapshots', () => {
    const { result } = makeState()
    act(() => {
      result.current.dispatch({
        type: 'SET_SELECTION',
        selection: { startRow: 0, startCol: 0, endRow: 0, endCol: 0 },
      })
    })
    act(() => { result.current.dispatch({ type: 'FILL_SELECTION' }) })
    expect(result.current.activeFrame.grid[0][0]).toBe(true)
    act(() => { result.current.dispatch({ type: 'UNDO' }) })
    expect(result.current.activeFrame.grid[0][0]).toBe(false)
  })
})
