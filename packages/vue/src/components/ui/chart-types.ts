// Shared type definitions for BoldKit Vue chart components.
// Exported from a plain .ts file to ensure reliable TypeScript resolution.

export interface FunnelChartData {
  name: string
  value: number
  fill?: string
}

export interface TreemapChartData {
  name: string
  value: number
  fill?: string
  children?: TreemapChartData[]
}

export interface HeatmapCellData {
  row: string
  col: string
  value: number
}

export interface SankeyNode {
  id: string
  label: string
  color?: string
}

export interface SankeyLink {
  source: string
  target: string
  value: number
}
