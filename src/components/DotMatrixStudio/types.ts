export type Tool = 'pencil' | 'eraser' | 'text' | 'shapes' | 'select'
export type ShapeType = 'line' | 'rect' | 'circle'
export type LoopMode = 'infinite' | 'once' | '3x'

export type DotGrid = boolean[][]

export interface Frame {
  id: string
  grid: DotGrid
  duration: number // milliseconds
}

export interface SelectionBox {
  startRow: number
  startCol: number
  endRow: number
  endCol: number
}

export interface GridPreset {
  name: string
  cols: number
  rows: number
}

export const GRID_PRESETS: GridPreset[] = [
  { name: 'Tiny', cols: 8, rows: 8 },
  { name: 'Small', cols: 16, rows: 8 },
  { name: 'Medium', cols: 24, rows: 12 },
  { name: 'Large', cols: 32, rows: 16 },
  { name: 'XL', cols: 48, rows: 24 },
]

export interface StudioState {
  frames: Frame[]
  activeFrameId: string
  rows: number
  cols: number
  dotColor: string
  bgTransparent: boolean
  activeTool: Tool
  activeShape: ShapeType
  isPlaying: boolean
  playFrameIndex: number
  fps: number
  loopMode: LoopMode
  selection: SelectionBox | null
  undoStack: Frame[][]
  redoStack: Frame[][]
}

// Export config passed to useExport
export interface ExportConfig {
  format: 'webm' | 'png' | 'svg' | 'json'
  scale: 1 | 2 | 4 | 8
  bgTransparent: boolean
  loopMode: LoopMode
  svgAnimated: boolean
  svgEmbedFont: boolean
  pngSpritesheet: boolean
}
