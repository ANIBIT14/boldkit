/**
 * Shapes (Vue) — parity with the React suite.
 *
 * Nothing tested the 55 SFCs, while the prop block is duplicated across all of
 * them. `color` applied only to `fill`, so `<Shape :filled="false" color="red" />`
 * rendered a black outline and the prop was a silent no-op.
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import * as Shapes from '@/components/ui/shapes'
import TriangleShape from '@/components/ui/shapes/TriangleShape.vue'

const ALL = Object.entries(Shapes).filter(([name]) => /^[A-Z]/.test(name)) as [
  string,
  Component,
][]

describe('shape catalogue', () => {
  it('ships 65 shapes', () => {
    expect(ALL).toHaveLength(65)
  })

  it.each(ALL)('%s is decorative and scalable', (_name, Component) => {
    const w = mount(Component)
    // Decorative by default — a screen reader must not announce it.
    expect(w.attributes('aria-hidden')).toBe('true')
    // Without a viewBox the shape doesn't scale with `size`.
    expect(w.attributes('viewbox') ?? w.attributes('viewBox')).toBeTruthy()
  })
})

describe('shape colour contract', () => {
  const pathOf = (w: ReturnType<typeof mount>) => w.find('path')

  it('applies color to the fill when filled', () => {
    const w = mount(TriangleShape, { props: { filled: true, color: 'rgb(255, 0, 0)' } })
    expect(pathOf(w).attributes('fill')).toBe('rgb(255, 0, 0)')
  })

  it('applies color to the outline when not filled', () => {
    const w = mount(TriangleShape, { props: { filled: false, color: 'rgb(255, 0, 0)' } })
    expect(pathOf(w).attributes('fill')).toBe('none')
    // This used to stay `hsl(var(--foreground))` — `color` was a no-op.
    expect(pathOf(w).attributes('stroke')).toBe('rgb(255, 0, 0)')
  })

  it('lets strokeColor override both', () => {
    const w = mount(TriangleShape, {
      props: { filled: true, color: 'rgb(255, 0, 0)', strokeColor: 'rgb(0, 0, 255)' },
    })
    expect(pathOf(w).attributes('fill')).toBe('rgb(255, 0, 0)')
    expect(pathOf(w).attributes('stroke')).toBe('rgb(0, 0, 255)')
  })

  it('defaults the outline to the foreground token', () => {
    const w = mount(TriangleShape)
    expect(pathOf(w).attributes('stroke')).toBe('hsl(var(--foreground))')
  })
})

describe('shape animation classes', () => {
  const ANIMATIONS = [
    'spin', 'pulse', 'float', 'wiggle', 'bounce', 'glitch',
    'spin-step', 'pulse-hard', 'marquee-stamp',
  ] as const
  const SPEEDS = ['slow', 'normal', 'fast'] as const

  it('emits no class for animation="none"', () => {
    const w = mount(TriangleShape, { props: { animation: 'none' } })
    expect(w.attributes('class')).not.toMatch(/shape-animate-/)
  })

  it.each(ANIMATIONS.flatMap((a) => SPEEDS.map((s) => [a, s] as const)))(
    '%s at %s speed emits the same class React does',
    (animation, speed) => {
      const w = mount(TriangleShape, { props: { animation, speed } })
      const expected = `shape-animate-${animation}${speed === 'normal' ? '' : `-${speed}`}`
      expect(w.attributes('class')).toContain(expected)
    }
  )
})
