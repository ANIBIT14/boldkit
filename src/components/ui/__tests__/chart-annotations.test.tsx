import { describe, it, expect } from 'vitest'
import { isValidElement } from 'react'
import { ReferenceLine, ReferenceDot } from 'recharts'
import {
  referenceLineElement,
  calloutElement,
  renderChartAnnotations,
} from '../chart/annotations'
import type { ChartAnnotation } from '../chart/types'

function typeName(el: unknown): string | undefined {
  if (!isValidElement(el)) return undefined
  const t = el.type as { displayName?: string }
  return t.displayName
}

describe('referenceLineElement', () => {
  it('maps axis:y to a Recharts ReferenceLine with y=value', () => {
    const el = referenceLineElement({ axis: 'y', value: 50 })
    expect(el.type).toBe(ReferenceLine)
    expect(el.props.y).toBe(50)
    expect(el.props.x).toBeUndefined()
  })

  it('maps axis:x to a ReferenceLine with x=value', () => {
    const el = referenceLineElement({ axis: 'x', value: 'Q3' })
    expect(el.props.x).toBe('Q3')
    expect(el.props.y).toBeUndefined()
  })

  it('dash:true sets a strokeDasharray', () => {
    const el = referenceLineElement({ axis: 'y', value: 10, dash: true })
    expect(el.props.strokeDasharray).toBeTruthy()
  })

  it('applies a custom color as stroke', () => {
    const el = referenceLineElement({ axis: 'y', value: 10, color: '#ff0000' })
    expect(el.props.stroke).toBe('#ff0000')
  })
})

describe('calloutElement', () => {
  it('renders a Recharts ReferenceDot anchored at x/y', () => {
    const el = calloutElement({ x: 'Q3', y: 100, text: 'peak' })
    expect(el.type).toBe(ReferenceDot)
    expect(el.props.x).toBe('Q3')
    expect(el.props.y).toBe(100)
  })
})

describe('renderChartAnnotations', () => {
  it('maps a mixed list to real Recharts elements (flattened)', () => {
    const annotations: ChartAnnotation[] = [
      { kind: 'referenceLine', axis: 'x', value: 'Q3' },
      { kind: 'callout', x: 'Q3', y: 100, text: 'peak' },
      { kind: 'arrow', from: { x: 'Q1', y: 0 }, to: { x: 'Q3', y: 100 }, label: 'growth' },
    ]
    const els = renderChartAnnotations(annotations)
    const names = els.map(typeName)
    expect(names).toContain('ReferenceLine')
    expect(names).toContain('ReferenceDot')
    // arrow contributes a segment line + endpoint dot
    expect(names.filter((n) => n === 'ReferenceLine').length).toBeGreaterThanOrEqual(2)
  })
})
