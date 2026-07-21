import { describe, it, expect } from 'vitest'
import {
  referenceLineToMarkLine,
  calloutToGraphic,
  arrowToGraphic,
  annotationsToEChartsOption,
} from '../chartAnnotations'
import type { ChartAnnotation } from '../chart-types'

describe('referenceLineToMarkLine', () => {
  it('maps axis:y to a yAxis markLine datum', () => {
    const ml = referenceLineToMarkLine({ axis: 'y', value: 50 })
    expect(ml.data[0]).toMatchObject({ yAxis: 50 })
  })

  it('maps axis:x to an xAxis markLine datum', () => {
    const ml = referenceLineToMarkLine({ axis: 'x', value: 'Q3' })
    expect(ml.data[0]).toMatchObject({ xAxis: 'Q3' })
  })

  it('dash:true sets a dashed line type', () => {
    const ml = referenceLineToMarkLine({ axis: 'y', value: 10, dash: true })
    expect(ml.data[0].lineStyle.type).toBe('dashed')
  })

  it('applies a custom color', () => {
    const ml = referenceLineToMarkLine({ axis: 'y', value: 10, color: '#ff0000' })
    expect(ml.data[0].lineStyle.color).toBe('#ff0000')
  })
})

describe('calloutToGraphic', () => {
  it('produces a group graphic carrying the text', () => {
    const g = calloutToGraphic({ x: 100, y: 40, text: 'peak' })
    expect(g.type).toBe('group')
    // rendered uppercase for the neubrutalism style
    expect(JSON.stringify(g)).toContain('PEAK')
  })
})

describe('arrowToGraphic', () => {
  it('produces a polyline graphic between the two points', () => {
    const g = arrowToGraphic({ from: { x: 0, y: 0 }, to: { x: 100, y: 100 } })
    expect(g.type).toBe('group')
    expect(JSON.stringify(g)).toContain('polyline')
  })
})

describe('annotationsToEChartsOption', () => {
  it('splits annotations into markLine series + graphic elements', () => {
    const annotations: ChartAnnotation[] = [
      { kind: 'referenceLine', axis: 'y', value: 50 },
      { kind: 'callout', x: 100, y: 40, text: 'peak' },
      { kind: 'arrow', from: { x: 0, y: 0 }, to: { x: 100, y: 100 } },
    ]
    const opt = annotationsToEChartsOption(annotations)
    // one markLine series holding the reference line
    expect(opt.series[0].markLine.data).toHaveLength(1)
    // two graphic elements (callout + arrow)
    expect(opt.graphic).toHaveLength(2)
  })
})
