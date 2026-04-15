import { useState } from 'react'
import {
  AsciiTorus, AsciiDonut, AsciiSphere, AsciiCube, AsciiHelix,
  AsciiSpiral, AsciiRose, AsciiWave, AsciiVortex, AsciiPulse, AsciiMatrix, AsciiGrid,
  type AsciiCharset, type AsciiSize,
} from '@/components/ui/ascii-shapes'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

// ─── Source code snippets ────────────────────────────────────────────────────

const sourceCode = `import * as React from 'react'
import { cn } from '@/lib/utils'

export type AsciiSize    = 'sm' | 'md' | 'lg' | 'hero'
export type AsciiCharset = 'blocks' | 'braille' | 'classic' | 'line' | 'dots'
export type AsciiSpeed   = 'slow' | 'normal' | 'fast'

export interface AsciiShapeProps extends React.HTMLAttributes<HTMLPreElement> {
  size?:       AsciiSize     // default: 'md'
  charset?:    AsciiCharset  // default: varies per shape
  color?:      string        // CSS color; ignored when multicolor=true
  speed?:      AsciiSpeed    // default: 'normal'
  animated?:   boolean       // false = static first frame, SSR-safe
  multicolor?: boolean       // cycle primary/secondary/accent… per row
}

const SIZE_MAP: Record<AsciiSize, { cols: number; rows: number }> = {
  sm:   { cols: 24,  rows: 12 },
  md:   { cols: 48,  rows: 24 },
  lg:   { cols: 72,  rows: 36 },
  hero: { cols: 120, rows: 60 },
}

const CHARSETS: Record<AsciiCharset, string[]> = {
  blocks:  [' ', '░', '▒', '▓', '█'],
  braille: [' ', '⠁', '⠃', '⠇', '⠿', '⠷'],
  classic: [' ', '.', ':', 'o', '*', '#', '@'],
  line:    [' ', '-', '/', '|', '\\\\', '+', 'X'],
  dots:    [' ', '.', '·', '•', '●'],
}

const MULTICOLOR_PALETTE = [
  'hsl(var(--primary))',   'hsl(var(--secondary))',
  'hsl(var(--accent))',    'hsl(var(--warning))',
  'hsl(var(--info))',      'hsl(var(--success))',
]

// 3D Torus — perspective projection + z-buffering + Lambertian shading
function drawTorus(grid: string[][], cols: number, rows: number, t: number, chars: string[]) {
  const A = t * 0.0012, B = t * 0.0007
  const cosA = Math.cos(A), sinA = Math.sin(A)
  const cosB = Math.cos(B), sinB = Math.sin(B)
  const R1 = 1.0, R2 = 2.2, K2 = 5.0
  const cx = cols / 2, cy = rows / 2, aspect = 0.5
  const K1 = Math.min(cols * aspect, rows) * 0.85 * K2 / (K2 + R1 + R2)
  const zbuf = Array.from({ length: rows }, () => Array(cols).fill(-Infinity))
  for (let theta = 0; theta < 2 * Math.PI; theta += 0.05) {
    for (let phi = 0; phi < 2 * Math.PI; phi += 0.02) {
      const cosT = Math.cos(theta), sinT = Math.sin(theta)
      const cosP = Math.cos(phi), sinP = Math.sin(phi)
      const ox = (R2 + R1 * cosT) * cosP, oy = (R2 + R1 * cosT) * sinP, oz = R1 * sinT
      const oy1 = oy * cosA - oz * sinA, oz1 = oy * sinA + oz * cosA
      const ox2 = ox * cosB - oy1 * sinB, oy2 = ox * sinB + oy1 * cosB
      const zDist = K2 - oz1
      if (zDist <= 0) continue
      const ooz = 1 / zDist
      const xp = Math.round(cx + K1 * ox2 * ooz)
      const yp = Math.round(cy - K1 * oy2 * ooz * aspect)
      if (xp < 0 || xp >= cols || yp < 0 || yp >= rows) continue
      const nx = cosT * cosP, ny = cosT * sinP, nz = sinT
      const ny1 = ny * cosA - nz * sinA, nz1 = ny * sinA + nz * cosA
      const nx2 = nx * cosB - ny1 * sinB, ny2 = nx * sinB + ny1 * cosB
      const L = nx2 * 0.57 + ny2 * 0.57 + nz1 * (-0.57)
      if (L > 0 && ooz > zbuf[yp][xp]) {
        zbuf[yp][xp] = ooz
        grid[yp][xp] = chars[Math.min(Math.floor(L * (chars.length - 1)), chars.length - 1)]
      }
    }
  }
}

// Generic component factory — wraps any draw function
function makeAsciiComponent(drawFn: Function, defaultCharset: AsciiCharset = 'classic') {
  return React.forwardRef<HTMLPreElement, AsciiShapeProps>(
    ({ size = 'md', charset = defaultCharset, color, speed = 'normal',
       animated = true, multicolor = false, className, ...props }, ref) => {
      const { cols, rows } = SIZE_MAP[size]
      const chars = CHARSETS[charset]
      const [lines, setLines] = React.useState<string[]>(() => {
        const g = Array.from({ length: rows }, () => Array(cols).fill(' '))
        drawFn(g, cols, rows, 0, chars)
        return g.map(row => row.join(''))
      })
      React.useEffect(() => {
        if (!animated) {
          const g = Array.from({ length: rows }, () => Array(cols).fill(' '))
          drawFn(g, cols, rows, 0, chars)
          setLines(g.map((row: string[]) => row.join('')))
          return
        }
        const start = performance.now()
        const speed_mul = { slow: 0.4, normal: 1.0, fast: 2.2 }[speed] ?? 1.0
        let raf = 0
        const loop = (now: number) => {
          const g = Array.from({ length: rows }, () => Array(cols).fill(' '))
          drawFn(g, cols, rows, (now - start) * speed_mul, chars)
          setLines(g.map((row: string[]) => row.join('')))
          raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(raf)
      }, [size, charset, speed, animated])
      return (
        <pre ref={ref}
          className={cn('inline-block border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] bg-background overflow-hidden font-mono text-xs leading-none tracking-tight select-none p-1', className)}
          style={multicolor ? undefined : { color: color || 'currentColor' }}
          {...props}
        >
          {multicolor
            ? lines.map((line, i) => (
                <React.Fragment key={i}>
                  <span style={{ color: MULTICOLOR_PALETTE[i % MULTICOLOR_PALETTE.length] }}>{line}</span>
                  {i < lines.length - 1 && '\\n'}
                </React.Fragment>
              ))
            : lines.join('\\n')}
        </pre>
      )
    }
  )
}

export const AsciiTorus  = makeAsciiComponent(drawTorus,  'blocks')
// ... AsciiDonut, AsciiSphere, AsciiCube, AsciiHelix,
// ... AsciiSpiral, AsciiRose, AsciiWave, AsciiVortex, AsciiPulse, AsciiMatrix, AsciiGrid
`

const vueSourceCode = `<!-- AsciiTorus.vue — all shapes follow this exact pattern -->
<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted, watch } from 'vue'
import { cn } from '@/lib/utils'
import {
  SIZE_MAP, CHARSETS, SPEED_MAP, makeGrid, gridToLines, MULTICOLOR_PALETTE,
  type AsciiSize, type AsciiCharset, type AsciiSpeed,
} from './constants'

interface Props {
  class?:      string
  size?:       AsciiSize
  charset?:    AsciiCharset
  color?:      string
  speed?:      AsciiSpeed
  animated?:   boolean
  multicolor?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  size: 'md', charset: 'blocks', speed: 'normal', animated: true, multicolor: false,
})

let rafId = 0
let isMounted = false
const lines = shallowRef<string[]>(buildFrame(0))

function drawTorus(grid: string[][], cols: number, rows: number, t: number, chars: string[]) {
  const A = t * 0.0012, B = t * 0.0007
  const cosA = Math.cos(A), sinA = Math.sin(A)
  const cosB = Math.cos(B), sinB = Math.sin(B)
  const R1 = 1.0, R2 = 2.2, K2 = 5.0
  const cx = cols / 2, cy = rows / 2, aspect = 0.5
  const K1 = Math.min(cols * aspect, rows) * 0.85 * K2 / (K2 + R1 + R2)
  const zbuf: number[][] = Array.from({ length: rows }, () => Array(cols).fill(-Infinity))
  for (let theta = 0; theta < 2 * Math.PI; theta += 0.05) {
    const cosT = Math.cos(theta), sinT = Math.sin(theta)
    for (let phi = 0; phi < 2 * Math.PI; phi += 0.02) {
      const cosP = Math.cos(phi), sinP = Math.sin(phi)
      const ox = (R2 + R1 * cosT) * cosP
      const oy = (R2 + R1 * cosT) * sinP
      const oz = R1 * sinT
      const oy1 = oy * cosA - oz * sinA
      const oz1 = oy * sinA + oz * cosA
      const ox2 = ox * cosB - oy1 * sinB
      const oy2 = ox * sinB + oy1 * cosB
      const zDist = K2 - oz1
      if (zDist <= 0) continue
      const ooz = 1 / zDist
      const xp = Math.round(cx + K1 * ox2 * ooz)
      const yp = Math.round(cy - K1 * oy2 * ooz * aspect)
      if (xp < 0 || xp >= cols || yp < 0 || yp >= rows) continue
      const nx = cosT * cosP, ny = cosT * sinP, nz = sinT
      const ny1 = ny * cosA - nz * sinA
      const nz1 = ny * sinA + nz * cosA
      const nx2 = nx * cosB - ny1 * sinB
      const ny2 = nx * sinB + ny1 * cosB
      const L = nx2 * 0.57 + ny2 * 0.57 + nz1 * (-0.57)
      if (L > 0 && ooz > zbuf[yp][xp]) {
        zbuf[yp][xp] = ooz
        grid[yp][xp] = chars[Math.min(Math.floor(L * (chars.length - 1)), chars.length - 1)]
      }
    }
  }
}

function buildFrame(t: number): string[] {
  const { cols, rows } = SIZE_MAP[props.size]
  const chars = CHARSETS[props.charset]
  const g = makeGrid(cols, rows)
  drawTorus(g, cols, rows, t, chars)
  return gridToLines(g)
}

function start() {
  if (!isMounted) return
  cancelAnimationFrame(rafId)
  if (!props.animated) { lines.value = buildFrame(0); return }
  const startTime = performance.now()
  const speedMul = SPEED_MAP[props.speed]
  function loop(now: number) {
    lines.value = buildFrame((now - startTime) * speedMul)
    rafId = requestAnimationFrame(loop)
  }
  rafId = requestAnimationFrame(loop)
}

onMounted(() => { isMounted = true; start() })
onUnmounted(() => { isMounted = false; cancelAnimationFrame(rafId) })
watch(() => [props.size, props.charset, props.speed, props.animated], () => start())
</script>

<template>
  <pre
    :class="cn('inline-block border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] bg-background overflow-hidden font-mono text-xs leading-none tracking-tight select-none p-1', props.class)"
    :style="props.multicolor ? undefined : { color: props.color || 'currentColor' }"
  ><template v-if="props.multicolor"
    ><template v-for="(line, i) in lines" :key="i"
      ><span :style="{ color: MULTICOLOR_PALETTE[i % MULTICOLOR_PALETTE.length] }">{{ line }}</span
      ><template v-if="i < lines.length - 1">&#10;</template></template
  ></template><template v-else>{{ lines.join('\\n') }}</template></pre>
</template>`

const usageCode = `import {
  AsciiTorus, AsciiDonut, AsciiSphere, AsciiCube, AsciiHelix,
  AsciiSpiral, AsciiRose, AsciiWave, AsciiVortex,
  AsciiPulse, AsciiMatrix, AsciiGrid,
} from '@/components/ui/ascii-shapes'

// Default — animated, medium size
<AsciiTorus />

// Custom options
<AsciiDonut
  size="lg"          // 'sm' | 'md' | 'lg' | 'hero'
  charset="classic"  // 'blocks' | 'braille' | 'classic' | 'line' | 'dots'
  speed="fast"       // 'slow' | 'normal' | 'fast'
  color="#e74c3c"    // any CSS color (ignored when multicolor=true)
/>

// Multicolor — cycles primary → secondary → accent → warning → info → success per row
<AsciiSphere size="lg" multicolor />

// Static (SSR-safe, no requestAnimationFrame)
<AsciiCube animated={false} />

// Pass any <pre> HTML attribute
<AsciiSpiral className="border-primary" aria-label="Decorative spiral" />`

const vueUsageCode = `<script setup lang="ts">
import {
  AsciiTorus, AsciiDonut, AsciiSphere, AsciiCube, AsciiHelix,
  AsciiSpiral, AsciiRose, AsciiWave, AsciiVortex,
  AsciiPulse, AsciiMatrix, AsciiGrid,
} from '@/components/ui/ascii-shapes'
</script>

<template>
  <!-- Default — animated, medium size -->
  <AsciiTorus />

  <!-- Custom options -->
  <AsciiDonut
    size="lg"
    charset="classic"
    speed="fast"
    color="#e74c3c"
  />

  <!-- Multicolor -->
  <AsciiSphere size="lg" :multicolor="true" />

  <!-- Static snapshot — SSR-safe, no requestAnimationFrame -->
  <AsciiCube :animated="false" />

  <!-- Nuxt: wrap animated shapes in <ClientOnly> to avoid hydration mismatch -->
  <ClientOnly>
    <AsciiTorus size="lg" charset="blocks" :multicolor="true" />
  </ClientOnly>
</template>`

// ─── Doc page ────────────────────────────────────────────────────────────────

const CHARSETS_LIST: AsciiCharset[] = ['blocks', 'braille', 'classic', 'line', 'dots']
const SIZES_LIST: AsciiSize[]       = ['sm', 'md', 'lg']

export function AsciiShapesDoc() {
  const [previewMulticolor, setPreviewMulticolor] = useState(false)

  return (
    <>
      <ComponentDoc
        name="ASCII Shapes"
        description="12 animated ASCII art components — 5 mathematical 3D shapes (Torus, Donut, Sphere, Cube, Helix) and 7 generative animations (Spiral, Rose, Wave, Vortex, Pulse, Matrix, Grid). Rendered with a custom rasterizer using perspective projection, z-buffering, and Lambertian shading. No canvas, no WebGL — just text."
        registryName="ascii-shapes"
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
        nuxtClientOnly={true}
      >
        <div className="flex flex-wrap justify-center gap-6">
          <AsciiTorus size="md" charset="blocks" multicolor />
          <AsciiDonut size="md" charset="classic" />
          <AsciiSphere size="md" charset="classic" />
        </div>
      </ComponentDoc>

      {/* ── 3D Shapes ──────────────────────────────────────────────────── */}
      <ExampleSection
        title="3D Shapes"
        description="Rasterized using perspective projection, z-buffering, and Lambertian shading. Character height ≈ 2× width, so all shapes apply a 0.5 aspect correction to appear circular."
        code={`import { AsciiTorus, AsciiDonut, AsciiSphere, AsciiCube, AsciiHelix } from '@/components/ui/ascii-shapes'

<div className="flex flex-wrap gap-4">
  <AsciiTorus size="sm" charset="blocks" />  {/* X+Y axes, slender tube */}
  <AsciiDonut size="sm" charset="classic" /> {/* Classic donut.c — X+Z axes, fatter tube */}
  <AsciiSphere size="sm" charset="classic" />{/* Lat/lon grid texture + dark side */}
  <AsciiCube size="sm" charset="blocks" />   {/* Back-face culling, per-face shading */}
  <AsciiHelix size="sm" charset="braille" /> {/* DNA double helix with connecting rungs */}
</div>`}
        vueCode={`<script setup lang="ts">
import { AsciiTorus, AsciiDonut, AsciiSphere, AsciiCube, AsciiHelix } from '@/components/ui/ascii-shapes'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <AsciiTorus  size="sm" charset="blocks"  />
    <AsciiDonut  size="sm" charset="classic" />
    <AsciiSphere size="sm" charset="classic" />
    <AsciiCube   size="sm" charset="blocks"  />
    <AsciiHelix  size="sm" charset="braille" />
  </div>
</template>`}
      >
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <AsciiTorus size="sm" charset="blocks" />
            <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">Torus</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AsciiDonut size="sm" charset="classic" />
            <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">Donut</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AsciiSphere size="sm" charset="classic" />
            <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">Sphere</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AsciiCube size="sm" charset="blocks" />
            <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">Cube</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AsciiHelix size="sm" charset="braille" />
            <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">Helix</span>
          </div>
        </div>
      </ExampleSection>

      {/* ── 2D Generative ──────────────────────────────────────────────── */}
      <ExampleSection
        title="Generative Animations"
        description="2D animations drawn directly into a character grid each frame using parametric math — no SVG, no canvas."
        code={`import { AsciiSpiral, AsciiRose, AsciiWave, AsciiVortex, AsciiPulse, AsciiMatrix, AsciiGrid } from '@/components/ui/ascii-shapes'

<div className="flex flex-wrap gap-4">
  <AsciiSpiral size="sm" charset="classic" />
  <AsciiRose   size="sm" charset="braille" />
  <AsciiWave   size="sm" charset="classic" />
  <AsciiVortex size="sm" charset="blocks"  />
  <AsciiPulse  size="sm" charset="dots"    />
  <AsciiMatrix size="sm" charset="classic" />
  <AsciiGrid   size="sm" charset="line"    />
</div>`}
        vueCode={`<script setup lang="ts">
import { AsciiSpiral, AsciiRose, AsciiWave, AsciiVortex, AsciiPulse, AsciiMatrix, AsciiGrid } from '@/components/ui/ascii-shapes'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <AsciiSpiral size="sm" charset="classic" />
    <AsciiRose   size="sm" charset="braille" />
    <AsciiWave   size="sm" charset="classic" />
    <AsciiVortex size="sm" charset="blocks"  />
    <AsciiPulse  size="sm" charset="dots"    />
    <AsciiMatrix size="sm" charset="classic" />
    <AsciiGrid   size="sm" charset="line"    />
  </div>
</template>`}
      >
        <div className="flex flex-wrap justify-center gap-4">
          {([
            { C: AsciiSpiral, label: 'Spiral',  cs: 'classic' as AsciiCharset },
            { C: AsciiRose,   label: 'Rose',    cs: 'braille' as AsciiCharset },
            { C: AsciiWave,   label: 'Wave',    cs: 'classic' as AsciiCharset },
            { C: AsciiVortex, label: 'Vortex',  cs: 'blocks'  as AsciiCharset },
            { C: AsciiPulse,  label: 'Pulse',   cs: 'dots'    as AsciiCharset },
            { C: AsciiMatrix, label: 'Matrix',  cs: 'classic' as AsciiCharset },
            { C: AsciiGrid,   label: 'Grid',    cs: 'line'    as AsciiCharset },
          ]).map(({ C, label, cs }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <C size="sm" charset={cs} />
              <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </ExampleSection>

      {/* ── Character Sets ─────────────────────────────────────────────── */}
      <ExampleSection
        title="Character Sets"
        description="5 built-in character sets — each creates a different visual texture. The charset controls how light intensity maps to ASCII characters."
        code={`// blocks  — block elements  [' ', '░', '▒', '▓', '█']
// braille — braille dots    [' ', '⠁', '⠃', '⠇', '⠿', '⠷']
// classic — classic ASCII   [' ', '.', ':', 'o', '*', '#', '@']
// line    — line chars      [' ', '-', '/', '|', '\\\\', '+', 'X']
// dots    — filled dots     [' ', '.', '·', '•', '●']

<AsciiRose size="sm" charset="blocks"  />
<AsciiRose size="sm" charset="braille" />
<AsciiRose size="sm" charset="classic" />
<AsciiRose size="sm" charset="line"    />
<AsciiRose size="sm" charset="dots"    />`}
        vueCode={`<template>
  <AsciiRose size="sm" charset="blocks"  />
  <AsciiRose size="sm" charset="braille" />
  <AsciiRose size="sm" charset="classic" />
  <AsciiRose size="sm" charset="line"    />
  <AsciiRose size="sm" charset="dots"    />
</template>`}
      >
        <div className="flex flex-wrap justify-center gap-4">
          {CHARSETS_LIST.map((cs) => (
            <div key={cs} className="flex flex-col items-center gap-2">
              <AsciiRose size="sm" charset={cs} animated={false} />
              <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">{cs}</span>
            </div>
          ))}
        </div>
      </ExampleSection>

      {/* ── Sizes ──────────────────────────────────────────────────────── */}
      <ExampleSection
        title="Sizes"
        description="4 sizes control the character grid dimensions. sm=24×12, md=48×24, lg=72×36, hero=120×60."
        code={`<AsciiTorus size="sm" />   {/* 24×12 grid */}
<AsciiTorus size="md" />   {/* 48×24 grid */}
<AsciiTorus size="lg" />   {/* 72×36 grid */}
<AsciiTorus size="hero" /> {/* 120×60 grid */}`}
        vueCode={`<AsciiTorus size="sm" />
<AsciiTorus size="md" />
<AsciiTorus size="lg" />
<AsciiTorus size="hero" />`}
      >
        <div className="flex flex-wrap justify-center items-end gap-4">
          {SIZES_LIST.map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <AsciiTorus size={s} charset="blocks" animated={false} />
              <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      </ExampleSection>

      {/* ── Color ──────────────────────────────────────────────────────── */}
      <ExampleSection
        title="Color"
        description='The color prop accepts any CSS color string. By default, shapes inherit currentColor from their parent.'
        code={`<AsciiSpiral color="hsl(var(--primary))"   />
<AsciiSpiral color="hsl(var(--secondary))" />
<AsciiSpiral color="hsl(var(--accent))"    />
<AsciiSpiral color="hsl(var(--warning))"   />
<AsciiSpiral color="hsl(var(--info))"      />
<AsciiSpiral color="hsl(var(--success))"   />`}
        vueCode={`<AsciiSpiral color="hsl(var(--primary))"   />
<AsciiSpiral color="hsl(var(--secondary))" />
<AsciiSpiral color="hsl(var(--accent))"    />
<AsciiSpiral color="hsl(var(--warning))"   />
<AsciiSpiral color="hsl(var(--info))"      />
<AsciiSpiral color="hsl(var(--success))"   />`}
      >
        <div className="flex flex-wrap justify-center gap-4">
          {([
            { c: 'hsl(var(--primary))',   label: 'Primary'   },
            { c: 'hsl(var(--secondary))', label: 'Secondary' },
            { c: 'hsl(var(--accent))',    label: 'Accent'    },
            { c: 'hsl(var(--warning))',   label: 'Warning'   },
            { c: 'hsl(var(--info))',      label: 'Info'      },
            { c: 'hsl(var(--success))',   label: 'Success'   },
          ]).map(({ c, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <AsciiSpiral size="sm" charset="classic" animated={false} color={c} />
              <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </ExampleSection>

      {/* ── Multicolor ─────────────────────────────────────────────────── */}
      <ExampleSection
        title="Multicolor"
        description="When multicolor=true, each row is wrapped in a <span> with a cycling theme color: primary → secondary → accent → warning → info → success. The color prop is ignored."
        code={`<AsciiTorus  size="sm" multicolor />
<AsciiSphere size="sm" multicolor />
<AsciiDonut  size="sm" multicolor />
<AsciiSpiral size="sm" multicolor />
<AsciiRose   size="sm" multicolor />`}
        vueCode={`<AsciiTorus  size="sm" :multicolor="true" />
<AsciiSphere size="sm" :multicolor="true" />
<AsciiDonut  size="sm" :multicolor="true" />
<AsciiSpiral size="sm" :multicolor="true" />
<AsciiRose   size="sm" :multicolor="true" />`}
      >
        <div className="flex flex-wrap justify-center gap-4">
          {([
            { C: AsciiTorus,  label: 'Torus',  cs: 'blocks'  as AsciiCharset },
            { C: AsciiSphere, label: 'Sphere', cs: 'classic' as AsciiCharset },
            { C: AsciiDonut,  label: 'Donut',  cs: 'classic' as AsciiCharset },
            { C: AsciiSpiral, label: 'Spiral', cs: 'classic' as AsciiCharset },
            { C: AsciiRose,   label: 'Rose',   cs: 'braille' as AsciiCharset },
          ]).map(({ C, label, cs }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <C size="sm" charset={cs} animated={false} multicolor />
              <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </ExampleSection>

      {/* ── Speed ──────────────────────────────────────────────────────── */}
      <ExampleSection
        title="Speed"
        description="Controls the animation time multiplier: slow=0.4×, normal=1×, fast=2.2×."
        code={`<AsciiVortex speed="slow"   />  {/* 0.4× */}
<AsciiVortex speed="normal" />  {/* 1.0× */}
<AsciiVortex speed="fast"   />  {/* 2.2× */}`}
        vueCode={`<AsciiVortex speed="slow"   />
<AsciiVortex speed="normal" />
<AsciiVortex speed="fast"   />`}
      >
        <div className="flex flex-wrap justify-center gap-6">
          {(['slow', 'normal', 'fast'] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <AsciiVortex size="sm" charset="blocks" speed={s} />
              <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      </ExampleSection>

      {/* ── Static / SSR-safe ──────────────────────────────────────────── */}
      <ExampleSection
        title="Static / SSR-Safe"
        description="Set animated={false} to render just the first frame — no requestAnimationFrame, no performance.now(). Safe in server-rendered React and in Nuxt without <ClientOnly>."
        code={`// Safe in Next.js App Router, Astro, Remix, and Nuxt (no <ClientOnly> needed)
<AsciiTorus  animated={false} />
<AsciiSphere animated={false} />
<AsciiCube   animated={false} charset="blocks" color="hsl(var(--primary))" />`}
        vueCode={`<!-- Safe in Nuxt SSR without <ClientOnly> -->
<AsciiTorus  :animated="false" />
<AsciiSphere :animated="false" />
<AsciiCube   :animated="false" charset="blocks" color="hsl(var(--primary))" />

<!-- Animated variants need <ClientOnly> in Nuxt to avoid hydration mismatch -->
<ClientOnly>
  <AsciiTorus size="lg" charset="blocks" :multicolor="true" />
</ClientOnly>`}
      >
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <AsciiTorus size="sm" charset="blocks" animated={false} />
            <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">animated=false</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AsciiSphere size="sm" charset="classic" animated={false} />
            <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">animated=false</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AsciiCube size="sm" charset="blocks" animated={false} color="hsl(var(--primary))" />
            <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">animated=false</span>
          </div>
        </div>
      </ExampleSection>

      {/* ── Props Table ────────────────────────────────────────────────── */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold uppercase tracking-wide mb-2">Props</h2>
        <p className="text-muted-foreground mb-4">All 12 shapes share the same prop interface.</p>
        <div className="border-3 border-foreground overflow-x-auto shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
          <table className="w-full text-sm font-mono">
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
                { prop: 'size',       type: "'sm' | 'md' | 'lg' | 'hero'",                       def: "'md'",     desc: 'Grid dimensions — sm 24×12, md 48×24, lg 72×36, hero 120×60' },
                { prop: 'charset',    type: "'blocks' | 'braille' | 'classic' | 'line' | 'dots'", def: 'varies',   desc: 'Character set used for brightness levels' },
                { prop: 'speed',      type: "'slow' | 'normal' | 'fast'",                         def: "'normal'", desc: 'Animation speed multiplier: 0.4× / 1× / 2.2×' },
                { prop: 'color',      type: 'string',                                              def: 'inherit',  desc: 'CSS color string. Ignored when multicolor=true' },
                { prop: 'multicolor', type: 'boolean',                                             def: 'false',    desc: 'Cycle theme palette (primary→secondary→accent…) per row' },
                { prop: 'animated',   type: 'boolean',                                             def: 'true',     desc: 'false = static first frame, no RAF — fully SSR-safe' },
                { prop: 'className',  type: 'string',                                              def: '—',        desc: 'Extra classes on the <pre> element' },
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
      </section>
    </>
  )
}
