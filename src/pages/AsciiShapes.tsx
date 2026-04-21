import { useState, useEffect } from 'react'
import {
  AsciiSpiral, AsciiRose, AsciiWave,
  AsciiVortex, AsciiPulse, AsciiMatrix, AsciiGrid,
  AsciiTorus, AsciiSphere, AsciiCube, AsciiHelix, AsciiDonut,
  AsciiTrefoilKnot, AsciiGeodesicDome, AsciiSaturn, AsciiHyperboloid, AsciiDNA,
  type AsciiCharset, type AsciiSize,
} from '@/components/ui/ascii-shapes'
import { Layout } from '@/components/layout'
import { Badge } from '@/components/ui/badge'
import { SEO, pageSEO } from '@/components/SEO'

const DISPLAY: React.CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" }
const MONO: React.CSSProperties    = { fontFamily: "'DM Mono', monospace" }

const SHAPES = [
  { name: 'AsciiSpiral',       Component: AsciiSpiral,       desc: 'Archimedean spiral arms rotating continuously' },
  { name: 'AsciiRose',         Component: AsciiRose,         desc: 'Rose curve r=cos(5θ) blooming and phase-shifting' },
  { name: 'AsciiWave',         Component: AsciiWave,         desc: 'Multi-frequency sine interference scrolling left→right' },
  { name: 'AsciiVortex',       Component: AsciiVortex,       desc: 'Rotating density field collapsing toward center' },
  { name: 'AsciiPulse',        Component: AsciiPulse,        desc: 'Concentric rings expanding outward and fading' },
  { name: 'AsciiMatrix',       Component: AsciiMatrix,       desc: 'Characters raining downward per column' },
  { name: 'AsciiGrid',         Component: AsciiGrid,         desc: 'Grid intersections pulsing with traveling waves' },
  { name: 'AsciiTorus',        Component: AsciiTorus,        desc: '3D rotating torus via perspective projection + z-buffering' },
  { name: 'AsciiSphere',       Component: AsciiSphere,       desc: 'Rotating globe with lat/lon grid texture and Lambertian shading' },
  { name: 'AsciiCube',         Component: AsciiCube,         desc: 'Solid shaded cube rotating on two axes with face-based z-buffering' },
  { name: 'AsciiHelix',        Component: AsciiHelix,        desc: 'Single-strand helix with two parametric strands and connecting rungs' },
  { name: 'AsciiDonut',        Component: AsciiDonut,        desc: 'Classic donut.c doughnut — faithful a1k0n algorithm, hole always visible' },
  { name: 'AsciiTrefoilKnot',  Component: AsciiTrefoilKnot,  desc: 'Trefoil knot rendered as a tube with Frenet frames, z-buffer, and Lambertian shading' },
  { name: 'AsciiGeodesicDome', Component: AsciiGeodesicDome, desc: 'Frequency-3 icosahedron wireframe projected onto a sphere, depth-sorted' },
  { name: 'AsciiSaturn',       Component: AsciiSaturn,       desc: 'Planet with tilted Cassini-division ring system, z-buffered depth ordering' },
  { name: 'AsciiHyperboloid',  Component: AsciiHyperboloid,  desc: 'Two families of straight-line rulings on x²+z²−y²=1 — a ruled surface tower' },
  { name: 'AsciiDNA',          Component: AsciiDNA,          desc: 'B-form DNA double helix: 150° strand offset, 4 turns, fat tube backbone + rungs' },
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

/** Pick an ASCII size that fits the viewport — re-evaluated on resize */
function useHeroSize(): AsciiSize {
  const [heroSize, setHeroSize] = useState<AsciiSize>('md')
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w >= 1280)      setHeroSize('hero')
      else if (w >= 768)  setHeroSize('lg')
      else if (w >= 480)  setHeroSize('md')
      else                setHeroSize('sm')
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return heroSize
}

export function AsciiShapes() {
  const [charset, setCharset] = useState<AsciiCharset>('classic')
  const [size, setSize]       = useState<AsciiSize>('md')
  const [color, setColor]     = useState<string>('')
  const [multicolor, setMulticolor] = useState<boolean>(false)
  const heroSize = useHeroSize()

  const activeColor = multicolor ? undefined : (color || undefined)

  return (
    <>
      <SEO {...pageSEO.asciiShapes} />
      <Layout>

        {/* ── HERO — always-dark, responsive torus ──────────────────── */}
        <section
          className="relative w-full border-b-3 border-foreground overflow-hidden"
          style={{ background: '#0d0d0d' }}
        >
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 [background-image:repeating-linear-gradient(0deg,transparent,transparent_39px,rgba(255,255,255,0.03)_39px,rgba(255,255,255,0.03)_40px),repeating-linear-gradient(90deg,transparent,transparent_39px,rgba(255,255,255,0.03)_39px,rgba(255,255,255,0.03)_40px)]" />
          <div className="relative z-10 flex flex-col items-center gap-5 py-10 md:py-16 lg:py-20 px-4">
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="accent">17 Shapes</Badge>
              <Badge variant="secondary">5 Character Sets</Badge>
              <Badge variant="info">React &amp; Vue 3</Badge>
            </div>

            {/* Title */}
            <h1
              className="text-center font-black uppercase leading-none text-white"
              style={{ ...DISPLAY, fontSize: 'clamp(40px, 8vw, 100px)' }}
            >
              ASCII<br /><span className="text-primary">Shapes</span>
            </h1>

            {/* Torus — size adapts to viewport */}
            <div className="w-full flex justify-center overflow-hidden">
              <AsciiTorus
                size={heroSize}
                charset="blocks"
                multicolor
                speed="normal"
                className="border-white/20 !bg-transparent shadow-none shrink-0"
              />
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-white/50 text-center" style={MONO}>
              17 animations · 5 character sets · 4 sizes · React &amp; Vue 3
            </p>
          </div>
        </section>

        {/* ── CONTROLS ──────────────────────────────────────────────── */}
        <section className="p-4 md:p-8 border-b-3 border-foreground bg-background">
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {/* Charset */}
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={MONO}>Charset</p>
              <div className="flex flex-wrap gap-2">
                {CHARSETS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCharset(c)}
                    aria-pressed={charset === c}
                    className={`px-2.5 py-1 text-xs sm:text-sm border-3 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all ${
                      charset === c ? 'bg-foreground text-background' : 'bg-background text-foreground'
                    }`}
                    style={MONO}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={MONO}>Size</p>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={`px-2.5 py-1 text-xs sm:text-sm border-3 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all ${
                      size === s ? 'bg-foreground text-background' : 'bg-background text-foreground'
                    }`}
                    style={MONO}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={MONO}>Color</p>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color || '#000000'}
                  onChange={(e) => { setMulticolor(false); setColor(e.target.value) }}
                  className="border-2 border-foreground h-8 w-10 cursor-pointer p-0.5"
                />
                <button
                  onClick={() => setColor('')}
                  className="px-2.5 py-1 text-xs sm:text-sm border-3 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all bg-background text-foreground"
                  style={MONO}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Multicolor */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={MONO}>Multicolor</p>
              <button
                onClick={() => { setMulticolor((v) => !v); if (!multicolor) setColor('') }}
                aria-pressed={multicolor}
                className={`px-2.5 py-1 text-xs sm:text-sm border-3 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all ${
                  multicolor ? 'bg-foreground text-background' : 'bg-background text-foreground'
                }`}
                style={MONO}
              >
                {multicolor ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </section>

        {/* ── SHAPE GRID ────────────────────────────────────────────── */}
        <section className="p-4 md:p-8 border-b-3 border-foreground">
          <h2 className="text-xl sm:text-2xl font-black uppercase mb-1">All Shapes</h2>
          <p className="text-xs text-muted-foreground mb-6" style={MONO}>Use controls above to change charset, size, color, and multicolor</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {SHAPES.map(({ name, Component, desc }) => (
              <div key={name} className="border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] min-w-0">
                <div className="border-b-3 border-foreground p-2.5 bg-muted/30">
                  <span className="text-xs sm:text-sm font-bold" style={MONO}>{name}</span>
                </div>
                {/* overflow-x-auto so large sizes scroll inside the card rather than breaking layout */}
                <div className="p-3 sm:p-4 flex justify-center overflow-x-auto">
                  <Component
                    size={size}
                    charset={charset}
                    speed="normal"
                    color={activeColor}
                    multicolor={multicolor}
                  />
                </div>
                <div className="border-t-3 border-foreground p-2.5">
                  <p className="text-xs text-muted-foreground" style={MONO}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── COLOR SHOWCASE ────────────────────────────────────────── */}
        <section className="p-4 md:p-8 border-b-3 border-foreground bg-muted/20">
          <h2 className="text-xl sm:text-2xl font-black uppercase mb-1">Color Modes</h2>
          <p className="text-xs text-muted-foreground mb-6 sm:mb-8" style={MONO}>Solid theme colors and multicolor row-cycling palette</p>

          {/* Solid colors */}
          <div className="mb-8 sm:mb-10">
            <p className="text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4" style={MONO}>Solid Color — AsciiSpiral</p>
            <div className="flex flex-wrap gap-3 sm:gap-5 items-end">
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
            <p className="text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4" style={MONO}>Multicolor — theme palette cycling per row</p>
            <div className="flex flex-wrap gap-3 sm:gap-6 items-end">
              {([
                { C: AsciiSpiral,  label: 'Spiral',  cs: 'classic' as AsciiCharset },
                { C: AsciiRose,    label: 'Rose',    cs: 'braille' as AsciiCharset },
                { C: AsciiVortex,  label: 'Vortex',  cs: 'blocks'  as AsciiCharset },
                { C: AsciiTorus,   label: 'Torus',   cs: 'blocks'  as AsciiCharset },
                { C: AsciiSphere,  label: 'Sphere',  cs: 'classic' as AsciiCharset },
                { C: AsciiCube,    label: 'Cube',    cs: 'blocks'  as AsciiCharset },
                { C: AsciiHelix,        label: 'Helix',        cs: 'braille' as AsciiCharset },
                { C: AsciiDonut,        label: 'Donut',        cs: 'classic' as AsciiCharset },
                { C: AsciiTrefoilKnot,  label: 'Trefoil',      cs: 'blocks'  as AsciiCharset },
                { C: AsciiGeodesicDome, label: 'Geodesic',     cs: 'classic' as AsciiCharset },
                { C: AsciiSaturn,       label: 'Saturn',       cs: 'blocks'  as AsciiCharset },
                { C: AsciiHyperboloid,  label: 'Hyperboloid',  cs: 'classic' as AsciiCharset },
                { C: AsciiDNA,          label: 'DNA',          cs: 'braille' as AsciiCharset },
              ]).map(({ C, label, cs }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <C size="sm" charset={cs} animated={false} multicolor />
                  <span className="text-[10px] font-bold uppercase text-muted-foreground" style={MONO}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SIZE COMPARISON ───────────────────────────────────────── */}
        <section className="p-4 md:p-8 border-b-3 border-foreground">
          <h2 className="text-xl sm:text-2xl font-black uppercase mb-1">Size Comparison</h2>
          <p className="text-xs text-muted-foreground mb-6" style={MONO}>AsciiTorus at sm / md / lg — scroll horizontally if needed</p>
          {/* Horizontally scrollable so lg size never breaks layout on mobile */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-6 sm:gap-8 items-end w-max">
              {(['sm', 'md', 'lg'] as AsciiSize[]).map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <AsciiTorus size={s} charset="blocks" animated={false} color={activeColor} multicolor={multicolor} />
                  <span className="text-xs font-bold uppercase" style={MONO}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CHARSET COMPARISON ────────────────────────────────────── */}
        <section className="p-4 md:p-8 border-b-3 border-foreground">
          <h2 className="text-xl sm:text-2xl font-black uppercase mb-1">Charset Comparison</h2>
          <p className="text-xs text-muted-foreground mb-6" style={MONO}>AsciiRose across all 5 character sets</p>
          <div className="flex flex-wrap gap-4 sm:gap-6 items-start">
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
          <h2 className="text-xl sm:text-2xl font-black uppercase mb-1">Usage</h2>
          <p className="text-xs text-muted-foreground mb-6 sm:mb-8" style={MONO}>Install via shadcn CLI, then import and use in React or Vue 3 / Nuxt</p>

          {/* Install */}
          <div className="mb-6 sm:mb-8">
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={MONO}>Install</p>
            <pre className="border-3 border-foreground bg-foreground text-background p-3 sm:p-4 overflow-x-auto shadow-[4px_4px_0px_hsl(var(--shadow-color))] text-xs" style={MONO}>{`# React
npx shadcn@latest add "https://boldkit.dev/r/ascii-shapes.json"

# Vue 3 / Nuxt
npx shadcn-vue@latest add "https://boldkit.dev/r/vue/ascii-shapes.json"`}</pre>
          </div>

          {/* React */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-2.5 w-2.5 bg-primary border border-foreground shrink-0" />
              <p className="text-xs font-bold uppercase tracking-wider" style={MONO}>React</p>
            </div>
            <pre className="border-3 border-foreground bg-foreground text-background p-3 sm:p-4 overflow-x-auto shadow-[4px_4px_0px_hsl(var(--shadow-color))] text-xs leading-relaxed" style={MONO}>{`import {
  AsciiSpiral, AsciiRose, AsciiWave, AsciiVortex,
  AsciiPulse, AsciiMatrix, AsciiGrid,
  AsciiTorus, AsciiSphere, AsciiCube, AsciiHelix, AsciiDonut,
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
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-2.5 w-2.5 bg-secondary border border-foreground shrink-0" />
              <p className="text-xs font-bold uppercase tracking-wider" style={MONO}>Vue 3 / Nuxt</p>
            </div>
            <pre className="border-3 border-foreground bg-foreground text-background p-3 sm:p-4 overflow-x-auto shadow-[4px_4px_0px_hsl(var(--shadow-color))] text-xs leading-relaxed" style={MONO}>{`<script setup lang="ts">
import {
  AsciiSpiral, AsciiTorus, AsciiSphere, AsciiCube, AsciiHelix, AsciiDonut,
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
                    <th className="p-2 sm:p-3 text-left font-bold whitespace-nowrap">Prop</th>
                    <th className="p-2 sm:p-3 text-left font-bold whitespace-nowrap">Type</th>
                    <th className="p-2 sm:p-3 text-left font-bold whitespace-nowrap">Default</th>
                    <th className="p-2 sm:p-3 text-left font-bold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { prop: 'size',       type: "'sm'|'md'|'lg'|'hero'",                      def: "'md'",     desc: 'Grid dimensions (sm=24×12 … hero=120×60)' },
                    { prop: 'charset',    type: "'blocks'|'braille'|'classic'|'line'|'dots'", def: 'varies',   desc: 'Character set for rendering' },
                    { prop: 'speed',      type: "'slow'|'normal'|'fast'",                      def: "'normal'", desc: 'Animation speed multiplier (0.4× / 1× / 2.2×)' },
                    { prop: 'color',      type: 'string',                                      def: 'inherit',  desc: 'CSS color. Ignored when multicolor=true' },
                    { prop: 'multicolor', type: 'boolean',                                     def: 'false',    desc: 'Cycle theme palette colors per row' },
                    { prop: 'animated',   type: 'boolean',                                     def: 'true',     desc: 'false = static first frame, no RAF — fully SSR-safe' },
                  ].map(({ prop, type, def, desc }, i) => (
                    <tr key={prop} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                      <td className="p-2 sm:p-3 font-bold text-primary whitespace-nowrap">{prop}</td>
                      <td className="p-2 sm:p-3 text-muted-foreground whitespace-nowrap">{type}</td>
                      <td className="p-2 sm:p-3 whitespace-nowrap">{def}</td>
                      <td className="p-2 sm:p-3 text-muted-foreground">{desc}</td>
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
