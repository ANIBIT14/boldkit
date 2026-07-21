// Shared type definitions for BoldKit Vue chart components.
// Exported from a plain .ts file to ensure reliable TypeScript resolution.

// Chart annotation vocabulary — identical shape to the React side so the same
// annotation objects author in both frameworks (mapped to echarts here).
export interface ChartReferenceLineSpec {
  axis: 'x' | 'y'
  value: number | string
  label?: string
  color?: string
  dash?: boolean
}

export interface ChartCalloutSpec {
  x: number | string
  y: number
  text: string
  placement?: 'top' | 'right' | 'bottom' | 'left'
}

export interface ChartArrowSpec {
  from: { x: number | string; y: number }
  to: { x: number | string; y: number }
  label?: string
}

export type ChartAnnotation =
  | ({ kind: 'referenceLine' } & ChartReferenceLineSpec)
  | ({ kind: 'callout' } & ChartCalloutSpec)
  | ({ kind: 'arrow' } & ChartArrowSpec)

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
