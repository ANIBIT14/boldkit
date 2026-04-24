import { useReducer, useCallback, useEffect } from 'react'
import type { StudioState, Frame, Tool, ShapeType, LoopMode, SelectionBox, DotGrid } from '../types'

// ── helpers ────────────────────────────────────────────────────────────────

export function createEmptyGrid(rows: number, cols: number): DotGrid {
  return Array.from({ length: rows }, () => Array<boolean>(cols).fill(false))
}

export function createFrame(rows: number, cols: number): Frame {
  return { id: crypto.randomUUID(), grid: createEmptyGrid(rows, cols), duration: 100 }
}

function cloneFrames(frames: Frame[]): Frame[] {
  return frames.map(f => ({ ...f, grid: f.grid.map(row => [...row]) }))
}

function pushUndo(state: StudioState): Pick<StudioState, 'undoStack' | 'redoStack'> {
  const snapshot = cloneFrames(state.frames)
  const undoStack = [...state.undoStack, snapshot].slice(-50)
  return { undoStack, redoStack: [] }
}

const INITIAL_ROWS = 16
const INITIAL_COLS = 32

function getDefaultState(): StudioState {
  const firstFrame = createFrame(INITIAL_ROWS, INITIAL_COLS)
  return {
    frames: [firstFrame],
    activeFrameId: firstFrame.id,
    rows: INITIAL_ROWS,
    cols: INITIAL_COLS,
    dotColor: '#5b4fcf',
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
  }
}

const STORAGE_KEY = 'studio-state-v2'

function getInitialState(): StudioState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const p = JSON.parse(saved)
      if (p.frames?.length && p.rows && p.cols) {
        return {
          ...getDefaultState(),
          frames: p.frames,
          activeFrameId: p.frames.find((f: Frame) => f.id === p.activeFrameId)
            ? p.activeFrameId
            : p.frames[0].id,
          rows: p.rows,
          cols: p.cols,
          dotColor: p.dotColor ?? '#5b4fcf',
          bgTransparent: p.bgTransparent ?? false,
          fps: p.fps ?? 12,
          loopMode: p.loopMode ?? 'infinite',
        }
      }
    }
  } catch { /* storage unavailable */ }
  return getDefaultState()
}

// ── actions ────────────────────────────────────────────────────────────────

export type StudioAction =
  | { type: 'SET_DOT'; row: number; col: number; value: boolean }
  | { type: 'SET_DOTS'; dots: { row: number; col: number; value: boolean }[] }
  | { type: 'SET_ALL_FRAMES'; frames: Frame[] }
  | { type: 'APPLY_GRID'; grid: DotGrid }
  | { type: 'SET_TOOL'; tool: Tool }
  | { type: 'SET_ACTIVE_SHAPE'; shape: ShapeType }
  | { type: 'ADD_FRAME'; duplicate?: boolean }
  | { type: 'DELETE_FRAME'; frameId: string }
  | { type: 'SET_ACTIVE_FRAME'; frameId: string }
  | { type: 'SET_FRAME_DURATION'; frameId: string; duration: number }
  | { type: 'REORDER_FRAMES'; fromIndex: number; toIndex: number }
  | { type: 'CHANGE_GRID_SIZE'; rows: number; cols: number }
  | { type: 'SET_DOT_COLOR'; color: string }
  | { type: 'SET_BG_TRANSPARENT'; transparent: boolean }
  | { type: 'SET_PLAYING'; playing: boolean }
  | { type: 'SET_PLAY_FRAME'; index: number }
  | { type: 'SET_FPS'; fps: number }
  | { type: 'SET_LOOP_MODE'; mode: LoopMode }
  | { type: 'SET_SELECTION'; selection: SelectionBox | null }
  | { type: 'FILL_SELECTION' }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'INVERT_SELECTION' }
  | { type: 'ADD_FRAMES'; frames: Frame[]; afterId?: string }
  | { type: 'IMPORT'; frames: Frame[]; rows: number; cols: number; dotColor: string; bgTransparent: boolean }
  | { type: 'RESET' }
  | { type: 'UNDO' }
  | { type: 'REDO' }

// ── reducer ────────────────────────────────────────────────────────────────

function selectionCells(sel: SelectionBox): [number, number][] {
  const minR = Math.min(sel.startRow, sel.endRow)
  const maxR = Math.max(sel.startRow, sel.endRow)
  const minC = Math.min(sel.startCol, sel.endCol)
  const maxC = Math.max(sel.startCol, sel.endCol)
  const pts: [number, number][] = []
  for (let r = minR; r <= maxR; r++)
    for (let c = minC; c <= maxC; c++)
      pts.push([r, c])
  return pts
}

function reducer(state: StudioState, action: StudioAction): StudioState {
  switch (action.type) {

    case 'SET_DOT': {
      const undo = pushUndo(state)
      const frames = cloneFrames(state.frames)
      const frame = frames.find(f => f.id === state.activeFrameId)
      if (!frame) return state
      if (action.row < 0 || action.row >= state.rows) return state
      if (action.col < 0 || action.col >= state.cols) return state
      frame.grid[action.row][action.col] = action.value
      return { ...state, ...undo, frames }
    }

    case 'SET_DOTS': {
      const undo = pushUndo(state)
      const frames = cloneFrames(state.frames)
      const frame = frames.find(f => f.id === state.activeFrameId)
      if (!frame) return state
      for (const { row, col, value } of action.dots) {
        if (row >= 0 && row < state.rows && col >= 0 && col < state.cols) {
          frame.grid[row][col] = value
        }
      }
      return { ...state, ...undo, frames }
    }

    case 'APPLY_GRID': {
      const undo = pushUndo(state)
      const frames = cloneFrames(state.frames)
      const frame = frames.find(f => f.id === state.activeFrameId)
      if (!frame) return state
      frame.grid = action.grid.map(row => [...row])
      return { ...state, ...undo, frames }
    }

    case 'SET_TOOL':
      return { ...state, activeTool: action.tool, selection: null }

    case 'SET_ACTIVE_SHAPE':
      return { ...state, activeShape: action.shape }

    case 'ADD_FRAME': {
      const undo = pushUndo(state)
      const src = action.duplicate
        ? state.frames.find(f => f.id === state.activeFrameId)
        : undefined
      const newFrame = src
        ? { ...createFrame(state.rows, state.cols), grid: src.grid.map(r => [...r]) }
        : createFrame(state.rows, state.cols)
      const activeIdx = state.frames.findIndex(f => f.id === state.activeFrameId)
      const frames = [...state.frames]
      frames.splice(activeIdx + 1, 0, newFrame)
      return { ...state, ...undo, frames, activeFrameId: newFrame.id }
    }

    case 'DELETE_FRAME': {
      if (state.frames.length === 1) return state
      const undo = pushUndo(state)
      const idx = state.frames.findIndex(f => f.id === action.frameId)
      const frames = state.frames.filter(f => f.id !== action.frameId)
      const newActiveId = state.activeFrameId === action.frameId
        ? (frames[Math.min(idx, frames.length - 1)]?.id ?? frames[0].id)
        : state.activeFrameId
      return { ...state, ...undo, frames, activeFrameId: newActiveId }
    }

    case 'SET_ACTIVE_FRAME':
      return { ...state, activeFrameId: action.frameId }

    case 'SET_FRAME_DURATION': {
      const frames = state.frames.map(f =>
        f.id === action.frameId ? { ...f, duration: Math.max(16, action.duration) } : f
      )
      return { ...state, frames }
    }

    case 'REORDER_FRAMES': {
      const undo = pushUndo(state)
      const frames = [...state.frames]
      const [moved] = frames.splice(action.fromIndex, 1)
      frames.splice(action.toIndex, 0, moved)
      return { ...state, ...undo, frames }
    }

    case 'CHANGE_GRID_SIZE': {
      const undo = pushUndo(state)
      const frames = state.frames.map(f => ({
        ...createFrame(action.rows, action.cols),
        id: f.id,
        duration: f.duration,
      }))
      return { ...state, ...undo, frames, rows: action.rows, cols: action.cols }
    }

    case 'SET_DOT_COLOR':
      return { ...state, dotColor: action.color }

    case 'SET_BG_TRANSPARENT':
      return { ...state, bgTransparent: action.transparent }

    case 'SET_PLAYING':
      return { ...state, isPlaying: action.playing, playFrameIndex: action.playing ? 0 : state.playFrameIndex }

    case 'SET_PLAY_FRAME':
      return { ...state, playFrameIndex: action.index }

    case 'SET_FPS':
      return { ...state, fps: Math.min(60, Math.max(1, action.fps)) }

    case 'SET_LOOP_MODE':
      return { ...state, loopMode: action.mode }

    case 'SET_SELECTION':
      return { ...state, selection: action.selection }

    case 'FILL_SELECTION': {
      if (!state.selection) return state
      const undo = pushUndo(state)
      const frames = cloneFrames(state.frames)
      const frame = frames.find(f => f.id === state.activeFrameId)
      if (!frame) return state
      for (const [r, c] of selectionCells(state.selection)) {
        if (r >= 0 && r < state.rows && c >= 0 && c < state.cols)
          frame.grid[r][c] = true
      }
      return { ...state, ...undo, frames }
    }

    case 'CLEAR_SELECTION': {
      if (!state.selection) return state
      const undo = pushUndo(state)
      const frames = cloneFrames(state.frames)
      const frame = frames.find(f => f.id === state.activeFrameId)
      if (!frame) return state
      for (const [r, c] of selectionCells(state.selection)) {
        if (r >= 0 && r < state.rows && c >= 0 && c < state.cols)
          frame.grid[r][c] = false
      }
      return { ...state, ...undo, frames }
    }

    case 'INVERT_SELECTION': {
      if (!state.selection) return state
      const undo = pushUndo(state)
      const frames = cloneFrames(state.frames)
      const frame = frames.find(f => f.id === state.activeFrameId)
      if (!frame) return state
      for (const [r, c] of selectionCells(state.selection)) {
        if (r >= 0 && r < state.rows && c >= 0 && c < state.cols)
          frame.grid[r][c] = !frame.grid[r][c]
      }
      return { ...state, ...undo, frames }
    }

    case 'SET_ALL_FRAMES': {
      if (!action.frames.length) return state
      const undo = pushUndo(state)
      // After applying a preset, activate the frame with the most filled dots.
      // Reveal presets (Typewriter, ScanLine, Ripple) have their full art in the last frame;
      // Frame 0 is nearly empty and would look like the user's art was erased.
      const richest = action.frames.reduce((best, f) => {
        const count = f.grid.flat().filter(Boolean).length
        return count > best.grid.flat().filter(Boolean).length ? f : best
      }, action.frames[0])
      return { ...state, ...undo, frames: action.frames, activeFrameId: richest.id, isPlaying: false, playFrameIndex: 0 }
    }

    case 'ADD_FRAMES': {
      const undo = pushUndo(state)
      if (action.afterId) {
        const idx = state.frames.findIndex(f => f.id === action.afterId)
        const frames = [...state.frames]
        frames.splice(idx + 1, 0, ...action.frames)
        return { ...state, ...undo, frames }
      }
      return { ...state, ...undo, frames: [...state.frames, ...action.frames] }
    }

    case 'IMPORT': {
      return {
        ...getDefaultState(),
        frames: action.frames,
        activeFrameId: action.frames[0]?.id ?? '',
        rows: action.rows,
        cols: action.cols,
        dotColor: action.dotColor,
        bgTransparent: action.bgTransparent,
      }
    }

    case 'RESET':
      try { localStorage.removeItem(STORAGE_KEY) } catch { /* ok */ }
      return getDefaultState()

    case 'UNDO': {
      if (state.undoStack.length === 0) return state
      const undoStack = [...state.undoStack]
      const snapshot = undoStack.pop()!
      const redoStack = [...state.redoStack, cloneFrames(state.frames)]
      const activeFrameId = snapshot.find(f => f.id === state.activeFrameId)
        ? state.activeFrameId
        : snapshot[0].id
      return { ...state, frames: snapshot, undoStack, redoStack, activeFrameId }
    }

    case 'REDO': {
      if (state.redoStack.length === 0) return state
      const redoStack = [...state.redoStack]
      const snapshot = redoStack.pop()!
      const undoStack = [...state.undoStack, cloneFrames(state.frames)]
      const activeFrameId = snapshot.find(f => f.id === state.activeFrameId)
        ? state.activeFrameId
        : snapshot[0].id
      return { ...state, frames: snapshot, undoStack, redoStack, activeFrameId }
    }

    default:
      return state
  }
}

// ── hook ───────────────────────────────────────────────────────────────────

export function useStudioState() {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState)

  const activeFrame = state.frames.find(f => f.id === state.activeFrameId) ?? state.frames[0]

  // Persist to localStorage whenever meaningful state changes (not during playback)
  useEffect(() => {
    if (state.isPlaying) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        frames: state.frames,
        activeFrameId: state.activeFrameId,
        rows: state.rows,
        cols: state.cols,
        dotColor: state.dotColor,
        bgTransparent: state.bgTransparent,
        fps: state.fps,
        loopMode: state.loopMode,
      }))
    } catch { /* quota exceeded */ }
  }, [state.frames, state.activeFrameId, state.rows, state.cols, state.dotColor, state.bgTransparent, state.fps, state.loopMode, state.isPlaying])

  const setDot = useCallback((row: number, col: number, value: boolean) =>
    dispatch({ type: 'SET_DOT', row, col, value }), [])

  const applyGrid = useCallback((grid: DotGrid) =>
    dispatch({ type: 'APPLY_GRID', grid }), [])

  return { state, dispatch, activeFrame, setDot, applyGrid }
}
