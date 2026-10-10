import { describe, expect, it } from 'vitest'
import { splitChartVariant } from '../components/ui/chart-variants'
import { toCssSize } from '../components/ui/chart-utils'

describe('splitChartVariant', () => {
  const radar = ['default', 'filled', 'outlined'] as const
  const donut = ['default', 'separated'] as const

  it('treats React geometry values as geometry', () => {
    expect(splitChartVariant('outlined', undefined, radar)).toEqual({ geometry: 'outlined', container: 'default' })
    expect(splitChartVariant('separated', 'flat', donut)).toEqual({ geometry: 'separated', container: 'flat' })
  })

  it('still honours a pre-v3.6 container value passed as `variant`', () => {
    expect(splitChartVariant('elevated', undefined, donut)).toEqual({ geometry: 'default', container: 'elevated' })
    expect(splitChartVariant('filled', undefined, donut)).toEqual({ geometry: 'default', container: 'filled' })
  })

  it('lets an explicit containerVariant win over the legacy one', () => {
    expect(splitChartVariant('elevated', 'minimal', donut)).toEqual({ geometry: 'default', container: 'minimal' })
  })

  it('treats Radar `filled` as both geometry and the legacy filled container', () => {
    expect(splitChartVariant('filled', undefined, radar)).toEqual({ geometry: 'filled', container: 'filled' })
    expect(splitChartVariant('filled', 'flat', radar)).toEqual({ geometry: 'filled', container: 'flat' })
  })
})

describe('toCssSize', () => {
  it('reads numbers as px, like React', () => {
    expect(toCssSize(300)).toBe('300px')
    expect(toCssSize('50vh')).toBe('50vh')
  })
})
