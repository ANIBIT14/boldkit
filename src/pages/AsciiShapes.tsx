import { useState } from 'react'
import {
  AsciiSpiral, AsciiRose, AsciiWave,
  AsciiVortex, AsciiPulse, AsciiMatrix, AsciiGrid, AsciiTorus,
  type AsciiCharset, type AsciiSize,
} from '@/components/ui/ascii-shapes'
import { Layout } from '@/components/layout'
import { Badge } from '@/components/ui/badge'
import { SEO, pageSEO } from '@/components/SEO'

const DISPLAY: React.CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" }
const MONO: React.CSSProperties    = { fontFamily: "'DM Mono', monospace" }

const SHAPES = [
  { name: 'AsciiSpiral',  Component: AsciiSpiral,  desc: 'Archimedean spiral arms rotating continuously' },
  { name: 'AsciiRose',    Component: AsciiRose,    desc: 'Rose curve r=cos(5θ) blooming and phase-shifting' },
  { name: 'AsciiWave',    Component: AsciiWave,    desc: 'Multi-frequency sine interference scrolling left→right' },
  { name: 'AsciiVortex',  Component: AsciiVortex,  desc: 'Rotating density field collapsing toward center' },
  { name: 'AsciiPulse',   Component: AsciiPulse,   desc: 'Concentric rings expanding outward and fading' },
  { name: 'AsciiMatrix',  Component: AsciiMatrix,  desc: 'Characters raining downward per column' },
  { name: 'AsciiGrid',    Component: AsciiGrid,    desc: 'Grid intersections pulsing with traveling waves' },
  { name: 'AsciiTorus',   Component: AsciiTorus,   desc: '3D rotating torus via perspective projection + z-buffering' },
]

const CHARSETS: AsciiCharset[] = ['blocks', 'braille', 'classic', 'line', 'dots']
const SIZES: AsciiSize[] = ['sm', 'md', 'lg']

const THEME_COLORS = [
  { color: 'hsl(var(--primary))',   label: 'Primary'   },
  { color: 'hsl(var(--secondary))', label: 'Secondary' },
  { color: 'hsl(var(--accent))',    label: 'Accent'    },
  { color: 'hsl(var(--warning))',   label: 'Warning'   },
  { color: 'hsl(var(--info))',      label: 'Info'      },
  { color: 'hsl(var(--success))',   label: 'Success'   },
]

export function AsciiShapes() {
  const [charset, setCharset] = useState<AsciiCharset>('classic')
  const [size, setSize]       = useState<AsciiSize>('md')
  const [color, setColor]     = useState<string>('')
  const [multicolor, setMulticolor] = useState<boolean>(false)

  const activeColor = multicolor ? undefined : (color || undefined)

  return (
    <>
      <SEO {...pageSEO.asciiShapes} />
      <Layout>

        {/* ── HERO — dark, 3D torus centrepiece ─────────────────────── */}
        <section className="relative w-full border-b-3 border-foreground overflow-hidden bg-foreground">
          <div className="absolute inset-0 [background-image:repeating-linear-gradient(0deg,transparent,transparent_39px,hsl(var(--background)/0.04)_39px,hsl(var(--background)/0.04)_40px),repeating-linear-gradient(90deg,transparent,transparent_39px,hsl(var(--background)/0.04)_39px,hsl(var(--background)/0.04)_40px)]" />
          <div className="relative z-10 flex flex-col items-center gap-6 py-16 md:py-20 px-4">
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="accent">8 Shapes</Badge>
              <Badge variant="secondary">5 Character Sets</Badge>
              <Badge variant="info">React &amp; Vue 3</Badge>
            </div>

            {/* Title */}
            <h1
              className="text-center font-black uppercase leading-none text-background"
              style={{ ...DISPLAY, fontSize: 'clamp(48px, 8vw, 100px)' }}
            >
              ASCII<br /><span className="text-primary">Shapes</span>
            </h1>

            {/* 3D Torus — the centrepiece */}
            <AsciiTorus
              size="lg"
              charset="blocks"
              multicolor
              speed="normal"
              className="border-white/20 !bg-transparent shadow-none"
            />

            {/* Subtitle */}
            <p className="text-sm text-white/50 text-center" style={MONO}>
              8 animations · 5 character sets · 4 sizes · React &amp; Vue 3
            </p>
          </div>
        </section>

        {/* ── CONTROLS ──────────────────────────────────────────────── */}
        <section className="p-4 md:p-8 border-b-3 border-foreground flex flex-wrap gap-6 bg-background">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={MONO}>Charset</p>
            <div className="flex flex-wrap gap-2">
              {CHARSETS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCharset(c)}
                  aria-pressed={charset === c}
                  className={`px-3 py-1 text-sm border-3 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all ${
                    charset === c ? 'bg-foreground text-background' : 'bg-background text-foreground'
                  }`}
                  style={MONO}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={MONO}>Size</p>
            <div className="flex gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`px-3 py-1 text-sm border-3 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all ${
                    size === s ? 'bg-foreground text-background' : 'bg-background text-foreground'
                  }`}
                  style={MONO}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={MONO}>Color</p>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={color || '#000000'}
                onChange={(e) => { setMulticolor(false); setColor(e.target.value) }}
                className="border-2 border-foreground h-8 w-12 cursor-pointer p-0.5"
              />
              <button
                onClick={() => setColor('')}
                className="px-3 py-1 text-sm border-3 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all bg-background text-foreground"
                style={MONO}
              >
                Reset
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={MONO}>Multicolor</p>
            <button
              onClick={() => { setMulticolor((v) => !v); if (!multicolor) setColor('') }}
              aria-pressed={multicolor}
              className={`px-3 py-1 text-sm border-3 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all ${
                multicolor ? 'bg-foreground text-background' : 'bg-background text-foreground'
              }`}
              style={MONO}
            >
              {multicolor ? 'ON' : 'OFF'}
            </button>
          </div>
        </section>

        {/* ── COLOR SHOWCASE ────────────────────────────────────────── */}
        <section className="p-4 md:p-8 border-b-3 border-foreground bg-muted/20">
          <h2 className="text-2xl font-black uppercase mb-1">Color Modes</h2>
          <p className="text-xs text-muted-foreground mb-8" style={MONO}>Solid theme colors and multicolor row-cycling palette</p>

          {/* Solid colors */}
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-wider mb-4" style={MONO}>Solid Color — AsciiSpiral</p>
            <div className="flex flex-wrap gap-5 items-end">
              {THEME_COLORS.map(({ color: c, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <AsciiSpiral size="sm" charset="classic" animated={false} color={c} />
                  <span className="text-[10px] font-bold uppercase text-muted-foreground" style={MONO}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Multicolor */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-4" style={MONO}>Multicolor — theme palette cycling per row</p>
            <div className="flex flex-wrap gap-6 items-end">
              {([
                { C: AsciiSpiral,  label: 'Spiral',  cs: 'classic' as AsciiCharset },
                { C: AsciiRose,    label: 'Rose',    cs: 'braille' as AsciiCharset },
                { C: AsciiVortex,  label: 'Vortex',  cs: 'blocks'  as AsciiCharset },
                { C: AsciiMatrix,  label: 'Matrix',  cs: 'classic' as AsciiCharset },
                { C: AsciiTorus,   label: 'Torus',   cs: 'blocks'  as AsciiCharset },
              ]).map(({ C, label, cs }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <C size="sm" charset={cs} animated={false} multicolor />
                  <span className="text-[10px] font-bold uppercase text-muted-foreground" style={MONO}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SHAPE GRID ────────────────────────────────────────────── */}
        <section className="p-4 md:p-8 border-b-3 border-foreground">
          <h2 className="text-2xl font-black uppercase mb-1">All Shapes</h2>
          <p className="text-xs text-muted-foreground mb-6" style={MONO}>Use controls above to change charset, size, color, and multicolor</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {SHAPES.map(({ name, Component, desc }) => (
              <div key={name} className="border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
                <div className="border-b-3 border-foreground p-3 bg-muted/30">
                  <span className="text-sm font-bold" style={MONO}>{name}</span>
                </div>
                <div className="p-4 flex justify-center">
                  <Component
                    size={size}
                    charset={charset}
                    speed="normal"
                    color={activeColor}
                    multicolor={multicolor}
                  />
                </div>
                <div className="border-t-3 border-foreground p-3">
                  <p className="text-xs text-muted-foreground" style={MONO}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SIZE COMPARISON ───────────────────────────────────────── */}
        <section className="p-4 md:p-8 border-b-3 border-foreground">
          <h2 className="text-2xl font-black uppercase mb-1">Size Comparison</h2>
          <p className="text-xs text-muted-foreground mb-6" style={MONO}>AsciiTorus at sm / md / lg</p>
          <div className="flex flex-wrap gap-8 items-end">
            {(['sm', 'md', 'lg'] as AsciiSize[]).map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <AsciiTorus size={s} charset="blocks" animated={false} color={activeColor} multicolor={multicolor} />
                <span className="text-xs font-bold uppercase" style={MONO}>{s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CHARSET COMPARISON ────────────────────────────────────── */}
        <section className="p-4 md:p-8 border-b-3 border-foreground">
          <h2 className="text-2xl font-black uppercase mb-1">Charset Comparison</h2>
          <p className="text-xs text-muted-foreground mb-6" style={MONO}>AsciiRose across all 5 character sets</p>
          <div className="flex flex-wrap gap-6 items-start">
            {CHARSETS.map((c) => (
              <div key={c} className="flex flex-col items-center gap-2">
                <AsciiRose size="sm" charset={c} animated={false} color={activeColor} multicolor={multicolor} />
                <span className="text-xs font-bold uppercase" style={MONO}>{c}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CODE USAGE ────────────────────────────────────────────── */}
        <section className="p-4 md:p-8">
          <h2 className="text-2xl font-black uppercase mb-1">Usage</h2>
          <p className="text-xs text-muted-foreground mb-8" style={MONO}>Install via shadcn CLI, then import and use in React or Vue 3 / Nuxt</p>

          {/* Install */}
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={MONO}>Install</p>
            <pre className="border-3 border-foreground bg-foreground text-background p-4 overflow-x-auto shadow-[4px_4px_0px_hsl(var(--shadow-color))] text-xs" style={MONO}>{`# React
npx shadcn@latest add "https://boldkit.dev/r/ascii-shapes.json"

# Vue 3 / Nuxt
npx shadcn-vue@latest add "https://boldkit.dev/r/vue/ascii-shapes.json"`}</pre>
          </div>

          {/* React */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-2.5 w-2.5 bg-primary border border-foreground" />
              <p className="text-xs font-bold uppercase tracking-wider" style={MONO}>React</p>
            </div>
            <pre className="border-3 border-foreground bg-foreground text-background p-4 overflow-x-auto shadow-[4px_4px_0px_hsl(var(--shadow-color))] text-xs leading-relaxed" style={MONO}>{`import {
  AsciiSpiral, AsciiRose, AsciiWave, AsciiVortex,
  AsciiPulse, AsciiMatrix, AsciiGrid, AsciiTorus,
} from '@/components/ui/ascii-shapes'

// Basic
<AsciiSpiral />

// With options
<AsciiSpiral
  size="md"          // 'sm' | 'md' | 'lg' | 'hero'
  charset="classic"  // 'blocks' | 'braille' | 'classic' | 'line' | 'dots'
  speed="normal"     // 'slow' | 'normal' | 'fast'
  color="#e74c3c"    // any CSS color string
  animated={true}    // false = static snapshot, SSR-safe
/>

// Multicolor — cycles primary/secondary/accent/warning/info/success per row
<AsciiTorus size="lg" charset="blocks" multicolor />`}</pre>
          </div>

          {/* Vue */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-2.5 w-2.5 bg-secondary border border-foreground" />
              <p className="text-xs font-bold uppercase tracking-wider" style={MONO}>Vue 3 / Nuxt</p>
            </div>
            <pre className="border-3 border-foreground bg-foreground text-background p-4 overflow-x-auto shadow-[4px_4px_0px_hsl(var(--shadow-color))] text-xs leading-relaxed" style={MONO}>{`<script setup lang="ts">
import {
  AsciiSpiral, AsciiTorus,
} from '@/components/ui/ascii-shapes'
</script>

<template>
  <!-- Basic -->
  <AsciiSpiral />

  <!-- With options -->
  <AsciiSpiral
    size="md"
    charset="classic"
    speed="normal"
    color="#e74c3c"
    :animated="true"
  />

  <!-- Multicolor — Nuxt SSR-safe (animated=false skips all browser APIs) -->
  <AsciiTorus size="lg" charset="blocks" :multicolor="true" />

  <!-- In Nuxt, wrap animated variants in <ClientOnly> -->
  <ClientOnly>
    <AsciiTorus size="lg" charset="blocks" multicolor />
  </ClientOnly>
</template>`}</pre>
          </div>

          {/* Props table */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={MONO}>Props — all components</p>
            <div className="border-3 border-foreground overflow-x-auto shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
              <table className="w-full text-xs" style={MONO}>
                <thead>
                  <tr className="border-b-3 border-foreground bg-foreground text-background">
                    <th className="p-3 text-left font-bold">Prop</th>
                    <th className="p-3 text-left font-bold">Type</th>
                    <th className="p-3 text-left font-bold">Default</th>
                    <th className="p-3 text-left font-bold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { prop: 'size',       type: "'sm'|'md'|'lg'|'hero'",                      def: "'md'",     desc: 'Grid dimensions (sm=24×12 … hero=120×60)' },
                    { prop: 'charset',    type: "'blocks'|'braille'|'classic'|'line'|'dots'", def: 'varies',   desc: 'Character set for rendering' },
                    { prop: 'speed',      type: "'slow'|'normal'|'fast'",                      def: "'normal'", desc: 'Animation speed multiplier (0.4× / 1× / 2.2×)' },
                    { prop: 'color',      type: 'string',                                      def: 'inherit',  desc: 'CSS color. Ignored when multicolor=true' },
                    { prop: 'multicolor', type: 'boolean',                                     def: 'false',    desc: 'Cycle theme palette colors (primary→secondary→accent…) per row' },
                    { prop: 'animated',   type: 'boolean',                                     def: 'true',     desc: 'false = static first frame, no RAF — fully SSR-safe' },
                  ].map(({ prop, type, def, desc }, i) => (
                    <tr key={prop} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                      <td className="p-3 font-bold text-primary">{prop}</td>
                      <td className="p-3 text-muted-foreground">{type}</td>
                      <td className="p-3">{def}</td>
                      <td className="p-3 text-muted-foreground">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </Layout>
    </>
  )
}
