import type {
  ChartAnnotation,
  ChartReferenceLineSpec,
  ChartCalloutSpec,
  ChartArrowSpec,
} from './chart-types'

/**
 * Unified chart annotations mapped to echarts. Reference lines become a
 * `markLine` on a series; callouts and arrows become `graphic` elements
 * (pixel-anchored). Same author-facing spec shape as the React/Recharts side.
 *
 * Reference lines require a Cartesian chart (Area/Bar/Line). Callouts and
 * arrows are pixel-anchored `graphic` overlays.
 */

const FOREGROUND = '#0a0a0a'

export interface MarkLineDatum {
  xAxis?: number | string
  yAxis?: number | string
  label?: Record<string, unknown>
  lineStyle: { color: string; width: number; type: 'solid' | 'dashed' }
}

export interface MarkLineConfig {
  symbol: 'none'
  data: MarkLineDatum[]
}

export function referenceLineToMarkLine(spec: ChartReferenceLineSpec): MarkLineConfig {
  const axisKey = spec.axis === 'x' ? 'xAxis' : 'yAxis'
  return {
    symbol: 'none',
    data: [
      {
        [axisKey]: spec.value,
        label: spec.label
          ? { formatter: spec.label, fontWeight: 'bold', fontSize: 11 }
          : { show: false },
        lineStyle: {
          color: spec.color ?? FOREGROUND,
          width: 3,
          type: spec.dash ? 'dashed' : 'solid',
        },
      } as MarkLineDatum,
    ],
  }
}

export interface GraphicElement {
  type: 'group'
  children: Array<Record<string, unknown>>
}

export function calloutToGraphic(spec: ChartCalloutSpec): GraphicElement {
  const cx = Number(spec.x)
  const cy = spec.y
  const width = spec.text.length * 7 + 16
  const height = 22
  const p = spec.placement ?? 'top'
  const dx = p === 'left' ? -width - 14 : p === 'right' ? 14 : -width / 2
  const dy = p === 'bottom' ? 14 : -height - 14
  return {
    type: 'group',
    children: [
      {
        type: 'line',
        shape: { x1: cx, y1: cy, x2: cx + dx + width / 2, y2: cy + dy + height },
        style: { stroke: FOREGROUND, lineWidth: 2 },
      },
      {
        type: 'rect',
        shape: { x: cx + dx, y: cy + dy, width, height },
        style: { fill: '#ffffff', stroke: FOREGROUND, lineWidth: 2 },
      },
      {
        type: 'text',
        style: {
          x: cx + dx + width / 2,
          y: cy + dy + height / 2,
          text: spec.text.toUpperCase(),
          textAlign: 'center',
          textVerticalAlign: 'middle',
          fontSize: 11,
          fontWeight: 'bold',
          fill: FOREGROUND,
        },
      },
    ],
  }
}

export function arrowToGraphic(spec: ChartArrowSpec): GraphicElement {
  const fx = Number(spec.from.x)
  const fy = spec.from.y
  const tx = Number(spec.to.x)
  const ty = spec.to.y
  const angle = Math.atan2(ty - fy, tx - fx)
  const head = 9
  const children: Array<Record<string, unknown>> = [
    {
      type: 'polyline',
      shape: { points: [[fx, fy], [tx, ty]] },
      style: { stroke: FOREGROUND, lineWidth: 3, fill: 'none' },
    },
    {
      type: 'polygon',
      shape: {
        points: [
          [tx, ty],
          [tx - head * Math.cos(angle - Math.PI / 6), ty - head * Math.sin(angle - Math.PI / 6)],
          [tx - head * Math.cos(angle + Math.PI / 6), ty - head * Math.sin(angle + Math.PI / 6)],
        ],
      },
      style: { fill: FOREGROUND },
    },
  ]
  if (spec.label) {
    children.push({
      type: 'text',
      style: {
        x: (fx + tx) / 2,
        y: (fy + ty) / 2 - 8,
        text: spec.label.toUpperCase(),
        textAlign: 'center',
        fontSize: 11,
        fontWeight: 'bold',
        fill: FOREGROUND,
      },
    })
  }
  return { type: 'group', children }
}

export interface EChartsAnnotationOption {
  series: Array<{ type: 'line'; markLine: MarkLineConfig }>
  graphic: GraphicElement[]
}

/**
 * Split a mixed annotation list into an echarts-mergeable fragment: one
 * `markLine` series carrying all reference lines, plus `graphic` overlays for
 * callouts and arrows. Merge into a chart's `option`.
 */
export function annotationsToEChartsOption(
  annotations: ChartAnnotation[]
): EChartsAnnotationOption {
  const markData: MarkLineDatum[] = []
  const graphic: GraphicElement[] = []
  for (const a of annotations) {
    if (a.kind === 'referenceLine') markData.push(...referenceLineToMarkLine(a).data)
    else if (a.kind === 'callout') graphic.push(calloutToGraphic(a))
    else graphic.push(arrowToGraphic(a))
  }
  return {
    series: [{ type: 'line', markLine: { symbol: 'none', data: markData } }],
    graphic,
  }
}
