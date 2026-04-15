import { useState } from 'react'
import {
  AsciiSpiral, AsciiRose, AsciiWave,
  AsciiVortex, AsciiPulse, AsciiMatrix, AsciiGrid,
  type AsciiCharset, type AsciiSize,
} from '@/components/ui/ascii-shapes'
import { Layout } from '@/components/layout'
import { Badge } from '@/components/ui/badge'
import { SEO, pageSEO } from '@/components/SEO'

const SHAPES = [
  { name: 'AsciiSpiral',  Component: AsciiSpiral,  desc: 'Archimedean spiral arms rotating continuously' },
  { name: 'AsciiRose',    Component: AsciiRose,    desc: 'Rose curve r=cos(5θ) blooming and phase-shifting' },
  { name: 'AsciiWave',    Component: AsciiWave,    desc: 'Multi-frequency sine interference scrolling left→right' },
  { name: 'AsciiVortex',  Component: AsciiVortex,  desc: 'Rotating density field collapsing toward center' },
  { name: 'AsciiPulse',   Component: AsciiPulse,   desc: 'Concentric rings expanding outward and fading' },
  { name: 'AsciiMatrix',  Component: AsciiMatrix,  desc: 'Characters raining downward per column' },
  { name: 'AsciiGrid',    Component: AsciiGrid,    desc: 'Grid intersections pulsing with traveling waves' },
]

const CHARSETS: AsciiCharset[] = ['blocks', 'braille', 'classic', 'line', 'dots']
const SIZES: AsciiSize[] = ['sm', 'md', 'lg']

export function AsciiShapes() {
  const [charset, setCharset] = useState<AsciiCharset>('classic')
  const [size, setSize] = useState<AsciiSize>('md')

  return (
    <>
      <SEO {...pageSEO.asciiShapes} />
      <Layout>
        {/* Hero — full-width vortex */}
        <section className="w-full border-b-3 border-foreground overflow-hidden">
          <AsciiVortex size="hero" charset="blocks" speed="normal" className="w-full border-0 shadow-none" />
          <div className="p-6 md:p-8 border-t-3 border-foreground bg-accent/10">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="accent">7 Animations</Badge>
              <Badge variant="secondary">5 Character Sets</Badge>
              <Badge variant="info">React &amp; Vue 3</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">ASCII Shapes</h1>
            <p className="text-base md:text-lg font-mono mt-2 text-muted-foreground">
              Animated ASCII art components · 4 sizes · SSR-safe
            </p>
          </div>
        </section>

        {/* Controls */}
        <section className="p-4 md:p-8 border-b-3 border-foreground flex flex-wrap gap-6 bg-background">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2">Charset</p>
            <div className="flex flex-wrap gap-2">
              {CHARSETS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCharset(c)}
                  className={`px-3 py-1 font-mono text-sm border-3 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all ${
                    charset === c ? 'bg-foreground text-background' : 'bg-background text-foreground'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2">Size</p>
            <div className="flex gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1 font-mono text-sm border-3 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all ${
                    size === s ? 'bg-foreground text-background' : 'bg-background text-foreground'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Shape grid */}
        <section className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {SHAPES.map(({ name, Component, desc }) => (
            <div key={name} className="border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
              <div className="border-b-3 border-foreground p-3 flex items-center">
                <span className="font-mono text-sm font-bold">{name}</span>
              </div>
              <div className="p-4 flex justify-center overflow-auto">
                <Component size={size} charset={charset} speed="normal" />
              </div>
              <div className="border-t-3 border-foreground p-3">
                <p className="text-xs text-muted-foreground font-mono">{desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Size comparison */}
        <section className="p-4 md:p-8 border-t-3 border-foreground">
          <h2 className="text-2xl font-black uppercase mb-6">Size Comparison — AsciiSpiral</h2>
          <div className="flex flex-wrap gap-6 items-end">
            {(['sm', 'md', 'lg'] as AsciiSize[]).map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <AsciiSpiral size={s} charset={charset} />
                <span className="font-mono text-xs font-bold uppercase">{s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Charset comparison */}
        <section className="p-4 md:p-8 border-t-3 border-foreground">
          <h2 className="text-2xl font-black uppercase mb-6">Charset Comparison — AsciiRose</h2>
          <div className="flex flex-wrap gap-6 items-start">
            {CHARSETS.map((c) => (
              <div key={c} className="flex flex-col items-center gap-2">
                <AsciiRose size="sm" charset={c} />
                <span className="font-mono text-xs font-bold uppercase">{c}</span>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  )
}
