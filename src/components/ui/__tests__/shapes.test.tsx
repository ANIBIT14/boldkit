/**
 * Shapes — the shared contract across 55 React components and 55 Vue SFCs.
 *
 * Nothing tested these at all, while the prop block is duplicated 110 times.
 * The `color` prop in particular applied only to `fill`, so
 * `<Shape filled={false} color="red" />` rendered a black outline and the prop
 * was a silent no-op with no way to recolour an outlined shape.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { render } from '@/test/test-utils'
import * as Shapes from '../shapes'

const root = join(__dirname, '../../../..')

const ALL = Object.entries(Shapes).filter(
  ([, value]) => typeof value === 'object' && value !== null && '$$typeof' in (value as object)
) as [string, React.ComponentType<Record<string, unknown>>][]

describe('shape catalogue', () => {
  it('ships 65 shapes', () => {
    expect(ALL).toHaveLength(65)
  })

  it('matches the Vue catalogue one-for-one', () => {
    const vueDir = join(root, 'packages/vue/src/components/ui/shapes')
    const vueNames = readdirSync(vueDir)
      .filter((f) => f.endsWith('.vue'))
      .map((f) => f.replace('.vue', ''))
      .sort()
    expect(vueNames).toEqual(ALL.map(([name]) => name).sort())
  })

  it.each(ALL)('%s is decorative and scalable', (_name, Component) => {
    const { container } = render(<Component />)
    const svg = container.querySelector('svg')!
    // Decorative by default — a screen reader must not announce it.
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    // Without a viewBox the shape doesn't scale with `size`.
    expect(svg).toHaveAttribute('viewBox')
  })
})

describe('shape colour contract', () => {
  it('applies color to the fill when filled', () => {
    const { container } = render(<Shapes.TriangleShape filled color="rgb(255, 0, 0)" />)
    expect(container.querySelector('path')).toHaveAttribute('fill', 'rgb(255, 0, 0)')
  })

  it('applies color to the outline when not filled', () => {
    const { container } = render(<Shapes.TriangleShape filled={false} color="rgb(255, 0, 0)" />)
    const path = container.querySelector('path')!
    expect(path).toHaveAttribute('fill', 'none')
    // This used to stay `hsl(var(--foreground))` — `color` was a no-op.
    expect(path).toHaveAttribute('stroke', 'rgb(255, 0, 0)')
  })

  it('lets strokeColor override both', () => {
    const { container } = render(
      <Shapes.TriangleShape filled color="rgb(255, 0, 0)" strokeColor="rgb(0, 0, 255)" />
    )
    const path = container.querySelector('path')!
    expect(path).toHaveAttribute('fill', 'rgb(255, 0, 0)')
    expect(path).toHaveAttribute('stroke', 'rgb(0, 0, 255)')
  })

  it('defaults the outline to the foreground token', () => {
    const { container } = render(<Shapes.TriangleShape />)
    expect(container.querySelector('path')).toHaveAttribute('stroke', 'hsl(var(--foreground))')
  })
})

describe('shape animation classes', () => {
  const ANIMATIONS = [
    'spin', 'pulse', 'float', 'wiggle', 'bounce', 'glitch',
    'spin-step', 'pulse-hard', 'marquee-stamp',
  ] as const
  const SPEEDS = ['slow', 'normal', 'fast'] as const

  const globals = readFileSync(join(root, 'src/styles/globals.css'), 'utf-8')

  it('emits no class for animation="none"', () => {
    const { container } = render(<Shapes.TriangleShape animation="none" />)
    expect(container.querySelector('svg')!.getAttribute('class')!).not.toMatch(/shape-animate-/)
  })

  it.each(
    ANIMATIONS.flatMap((animation) => SPEEDS.map((speed) => [animation, speed] as const))
  )('%s at %s speed maps to a rule that exists', (animation, speed) => {
    const { container } = render(
      <Shapes.TriangleShape animation={animation} speed={speed} />
    )
    const expected = `shape-animate-${animation}${speed === 'normal' ? '' : `-${speed}`}`
    expect(container.querySelector('svg')!.getAttribute('class')!).toContain(expected)
    // A class the stylesheet doesn't define is an inert animation.
    expect(globals).toContain(`.${expected}`)
  })
})
