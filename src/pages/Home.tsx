import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LayeredCard, LayeredCardContent, LayeredCardHeader, LayeredCardTitle } from '@/components/ui/layered-card'
import { Sticker, Stamp } from '@/components/ui/sticker'
import { StatCard } from '@/components/ui/stat-card'
import { Spinner } from '@/components/ui/spinner'
import { MathCurveLoader } from '@/components/ui/math-curve-loader'
import { Sparkline } from '@/components/ui/chart'
import { GaugeChart } from '@/components/ui/chart'
import { DonutChart } from '@/components/ui/chart'
import { Layout } from '@/components/layout'
import {
  Copy, Check, ArrowRight, Zap, Palette, Code2, Smartphone,
  Github, Layers, TrendingUp, DollarSign, LayoutGrid, Sparkles,
  Settings, LogIn, FileX, Package, BarChart3, Wand2, Cpu,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { SEO, pageSEO } from '@/components/SEO'
import { useFramework, ReactIcon, VueIcon } from '@/hooks/use-framework'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { useCountUp } from '@/hooks/use-count-up'
import { COUNTS } from '@/config/routes-meta'
import {
  GearShape, Star5Shape, BlobShape, LightningShape, BurstShape, HexagonShape,
} from '@/components/ui/shapes'
import {
  AsciiSpiral, AsciiVortex, AsciiMatrix, AsciiGrid,
} from '@/components/ui/ascii-shapes'
import {
  Aurora, FlowField, Plasma, Metaballs, MatrixRain, ParticleWeb,
} from '@/components/CanvasEffects/react'

const DISPLAY: React.CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" }
const MONO: React.CSSProperties    = { fontFamily: "'DM Mono', monospace" }

// ── Dot Matrix Studio animated preview ────────────────────────────────────
const DM_ROWS = 8
const DM_COLS = 20
type DMAnim = (r: number, c: number, t: number) => boolean
const DM_ANIMS: DMAnim[] = [
  (r, c, t) => {
    const cx = DM_COLS / 2 - 0.5, cy = DM_ROWS / 2 - 0.5
    const dist = Math.sqrt((c - cx) ** 2 + (r - cy) ** 2)
    return Math.sin(dist * 1.2 - t * 0.35) > 0.15
  },
  (r, c, t) => {
    const wave = Math.sin(c * 0.5 - t * 0.4) * 2.5 + 4
    return Math.abs(r - wave) < 1.5
  },
  (r, c, t) => ((r + c * 1.5 + t * 0.5) % 10) < 3.5,
]
function DotMatrixPreview() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 80)
    return () => clearInterval(id)
  }, [])
  const animIdx = Math.floor(tick / 40) % DM_ANIMS.length
  const anim = DM_ANIMS[animIdx]
  return (
    <svg viewBox={`0 0 ${DM_COLS} ${DM_ROWS}`} className="w-full h-full" aria-hidden="true">
      {Array.from({ length: DM_ROWS }, (_, r) =>
        Array.from({ length: DM_COLS }, (_, c) => (
          <circle key={`${r},${c}`} cx={c + 0.5} cy={r + 0.5} r={0.38}
            fill={anim(r, c, tick) ? '#5b4fcf' : '#1e1e2e'} />
        ))
      )}
    </svg>
  )
}

const MARQUEE_ITEMS = [
  `${COUNTS.components}+ Components`, 'React', 'Vue 3', 'Nuxt', `${COUNTS.charts} Charts`,
  `${COUNTS.shapes} Shapes`, `${COUNTS.blocks} Blocks`, 'TypeScript', 'Accessible',
  'Open Source', 'Free', 'Neubrutalism', 'Dot Matrix Studio', 'Canvas Effects', 'ASCII Art',
]
const MARQUEE_SEP_COLORS = ['text-primary', 'text-secondary', 'text-accent', 'text-success', 'text-info']

// ── Donut chart demo data ──────────────────────────────────────────────────
const DONUT_DATA = [
  { name: 'UI', value: 55, fill: 'hsl(var(--primary))' },
  { name: 'Charts', value: 14, fill: 'hsl(var(--secondary))' },
  { name: 'Shapes', value: 64, fill: 'hsl(var(--accent))' },
  { name: 'Blocks', value: 15, fill: 'hsl(var(--success))' },
]
const DONUT_CONFIG = {
  UI: { label: 'Components' },
  Charts: { label: 'Charts' },
  Shapes: { label: 'Shapes' },
  Blocks: { label: 'Blocks' },
}

export function Home() {
  const [copied, setCopied] = useState(false)
  const { framework, setFramework } = useFramework()

  const componentsCount = useCountUp({ end: COUNTS.components, duration: 1200 })
  const chartsCount     = useCountUp({ end: COUNTS.charts,     duration: 900  })
  const shapesCount     = useCountUp({ end: COUNTS.shapes,     duration: 1100 })
  const blocksCount     = useCountUp({ end: COUNTS.blocks,     duration: 800  })

  const showcaseReveal  = useScrollReveal()
  const toolsReveal     = useScrollReveal()
  const effectsReveal   = useScrollReveal()
  const featuresReveal  = useScrollReveal()
  const ctaReveal       = useScrollReveal()

  const commands: Record<string, string> = {
    react: 'npx shadcn@latest add https://boldkit.dev/r/button.json',
    vue:   'npx shadcn-vue@latest add https://boldkit.dev/r/vue/button.json',
  }

  const copyCommand = () => {
    navigator.clipboard.writeText(commands[framework])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <SEO {...pageSEO.home} />
      <Layout>

        {/* ── ANNOUNCEMENT BAR ───────────────────────────────────────── */}
        <a
          href="https://favgrab.boldkit.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-3 border-b-3 border-foreground bg-primary px-4 py-2 hover:bg-primary/90 transition-colors"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-foreground/70" style={MONO}>New Tool</span>
          <span className="h-3 w-[2px] bg-primary-foreground/30" />
          <span className="text-xs font-bold text-primary-foreground" style={MONO}>
            FavGrab — Extract &amp; download favicons from any website
          </span>
        </a>

        {/* ══════════════════════════════════════════════════════════════
            ACT 1 — HERO
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden border-b-3 border-foreground">
          <div className="grid-pattern absolute inset-0 opacity-20" />

          <div className="container relative mx-auto px-4 py-14 md:py-20 lg:py-24">
            <div className="grid xl:grid-cols-[1fr_520px] gap-10 xl:gap-14 items-center">

              {/* ── Left: Masthead ── */}
              <div className="relative z-10 min-w-0">

                {/* Version badge row */}
                <div className="mb-5 flex flex-wrap items-center gap-2 animate-stagger-fade-in stagger-1">
                  <Badge variant="accent" className="gap-1.5">
                    <ReactIcon className="h-4 w-4" /> React
                  </Badge>
                  <Badge variant="success" className="gap-1.5">
                    <VueIcon className="h-4 w-4" /> Vue 3
                  </Badge>
                  <Badge variant="secondary" className="gap-1.5">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.464 3.222L21 18.222h-4.151l-2.607-5.185-2.591 5.185H7.5L13.464 3.222zM3 18.222h4.151l2.607-5.185 2.591 5.185H16.5L10.536 3.222 3 18.222z"/>
                    </svg>
                    Nuxt
                    <span className="ml-0.5 rounded-sm bg-background/25 px-1 py-px text-[9px] font-black">NEW</span>
                  </Badge>
                  <span className="h-4 w-[2px] bg-foreground/20 hidden sm:block" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground hidden sm:block" style={MONO}>v3.2.1</span>
                </div>

                {/* Giant masthead — newspaper column style */}
                <div className="mb-0 select-none">
                  {/* "BOLD" with thick left color bar */}
                  <div className="flex items-stretch animate-stagger-fade-in stagger-2">
                    <div className="w-[6px] shrink-0 bg-primary mr-4" />
                    <div
                      className="leading-none text-foreground"
                      style={{ ...DISPLAY, fontSize: 'clamp(72px, 16vw, 200px)', lineHeight: 0.87 }}
                    >
                      BOLD
                    </div>
                  </div>
                  {/* Ruled divider */}
                  <div className="my-1.5 h-[3px] bg-foreground animate-stagger-fade-in stagger-3" />
                  {/* "KIT" outlined */}
                  <div
                    className="leading-none bk-text-outline-thick animate-stagger-fade-in stagger-3"
                    style={{ ...DISPLAY, fontSize: 'clamp(72px, 16vw, 200px)', lineHeight: 0.87 }}
                  >
                    KIT
                  </div>
                </div>

                {/* Subline */}
                <p className="mt-6 mb-7 max-w-md text-base leading-relaxed text-foreground/65 border-l-4 border-primary pl-4 animate-stagger-fade-in stagger-4" style={MONO}>
                  High-contrast colors, thick borders, and hard shadows — a neubrutalism UI library that makes your UI impossible to ignore.
                </p>

                {/* CTAs */}
                <div className="mb-7 flex flex-col sm:flex-row gap-3 animate-stagger-fade-in stagger-5">
                  <Link to="/docs" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto gap-2">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/components" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Browse Components
                    </Button>
                  </Link>
                  <a
                    href="https://github.com/ANIBIT14/boldkit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button size="lg" variant="ghost" className="w-full sm:w-auto gap-2">
                      <Github className="h-4 w-4" /> GitHub
                    </Button>
                  </a>
                </div>

                {/* Framework toggle + CLI */}
                <div className="w-full space-y-2 animate-stagger-fade-in stagger-6">
                  <div className="inline-flex border-3 border-foreground bg-background">
                    <button
                      onClick={() => setFramework('react')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold transition-colors ${
                        framework === 'react' ? 'bg-primary' : 'hover:bg-muted'
                      }`}
                    >
                      <ReactIcon className="h-4 w-4" /> React
                    </button>
                    <button
                      onClick={() => setFramework('vue')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold transition-colors border-l-3 border-foreground ${
                        framework === 'vue' ? 'bg-success' : 'hover:bg-muted'
                      }`}
                    >
                      <VueIcon className="h-4 w-4" /> Vue
                    </button>
                  </div>
                  <div className="flex w-full min-w-0 items-center gap-2 border-3 border-foreground bg-muted px-4 py-2 bk-shadow">
                    <code className="min-w-0 flex-1 truncate text-xs font-mono">{commands[framework]}</code>
                    <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={copyCommand}>
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* ── Right: Newspaper-style live preview grid ── */}
              <div className="hidden xl:grid grid-rows-[auto_auto_auto] gap-0 border-3 border-foreground bk-shadow-lg animate-stagger-fade-in" style={{ animationDelay: '300ms' }}>

                {/* Row header */}
                <div className="border-b-3 border-foreground bg-foreground px-4 py-2 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-background" style={MONO}>BoldKit v3.2 — Live Preview</span>
                  <div className="flex gap-1">
                    <div className="h-2.5 w-2.5 bg-primary" />
                    <div className="h-2.5 w-2.5 bg-secondary" />
                    <div className="h-2.5 w-2.5 bg-accent" />
                  </div>
                </div>

                {/* 2×2 live preview grid */}
                <div className="grid grid-cols-2">

                  {/* Cell: Components */}
                  <div className="border-b-3 border-r-3 border-foreground p-4 bg-background">
                    <div className="mb-2.5 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground" style={MONO}>Components</div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        <Button size="sm">Primary</Button>
                        <Button size="sm" variant="secondary">Sec</Button>
                        <Button size="sm" variant="accent">Accent</Button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Teal</Badge>
                        <Badge variant="accent">Yellow</Badge>
                        <Badge variant="success">Ok</Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Spinner variant="brutal" size="sm" />
                        <Spinner variant="dots" size="sm" />
                        <Spinner variant="bars" size="sm" />
                        <Progress value={72} className="flex-1 h-2" />
                      </div>
                    </div>
                  </div>

                  {/* Cell: Canvas Effect */}
                  <div className="border-b-3 border-foreground relative overflow-hidden" style={{ minHeight: 150, background: '#040404' }}>
                    <div className="absolute inset-0">
                      <Plasma palette={['#0a1450','#1e64c8','#00d2dc','#5affa6','#ffc832','#ff4b82']} speed={0.8} />
                    </div>
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent" style={MONO}>Canvas Effects</span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="accent" className="text-[8px] px-1.5 py-0 h-4">New v3.2</Badge>
                    </div>
                  </div>

                  {/* Cell: Shapes */}
                  <div className="border-r-3 border-foreground p-4 bg-background">
                    <div className="mb-2.5 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground" style={MONO}>Shapes</div>
                    <div className="grid grid-cols-3 gap-2">
                      {([
                        { Component: GearShape,      bg: 'bg-primary',   color: 'hsl(var(--primary-foreground))',   anim: 'spin'   },
                        { Component: Star5Shape,     bg: 'bg-secondary', color: 'hsl(var(--secondary-foreground))', anim: 'pulse'  },
                        { Component: BlobShape,      bg: 'bg-accent',    color: 'hsl(var(--accent-foreground))',    anim: 'float'  },
                        { Component: LightningShape, bg: 'bg-warning',   color: 'hsl(var(--warning-foreground))',   anim: 'wiggle' },
                        { Component: BurstShape,     bg: 'bg-info',      color: 'hsl(var(--info-foreground))',      anim: 'bounce' },
                        { Component: HexagonShape,   bg: 'bg-success',   color: 'hsl(var(--success-foreground))',   anim: 'glitch' },
                      ] as const).map(({ Component, bg, color, anim }) => (
                        <div key={anim} className={`${bg} border-2 border-foreground/20 flex items-center justify-center py-2`}>
                          <Component size={28} color={color} animation={anim} speed="normal" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cell: Stat Cards */}
                  <div className="p-4 bg-background">
                    <div className="mb-2.5 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground" style={MONO}>Stat Cards</div>
                    <div className="space-y-2">
                      <StatCard title="Revenue" value="$45K" change="+20%" trend="up" icon={<DollarSign className="h-3.5 w-3.5" />} color="success" />
                      <StatCard title="Growth"  value="12.5%" change="+4%" trend="up" icon={<TrendingUp className="h-3.5 w-3.5" />} color="primary" />
                    </div>
                  </div>
                </div>

                {/* Bottom strip: Stickers */}
                <div className="border-t-3 border-foreground bg-muted px-4 py-2.5 flex items-center gap-4">
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground" style={MONO}>Stickers</span>
                  <div className="flex items-center gap-3">
                    <Sticker size="sm">New</Sticker>
                    <Sticker variant="primary" size="sm" rotation="medium-right">Hot</Sticker>
                    <Sticker variant="secondary" size="sm" dashed>Sale</Sticker>
                    <Stamp size="sm">MIT</Stamp>
                    <Stamp size="sm" variant="secondary">Free</Stamp>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Mobile: horizontal card scroll ── */}
            <div className="block xl:hidden pt-8 pb-2 animate-stagger-fade-in stagger-8">
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-none">
                <div className="snap-start shrink-0 w-56 border-3 border-foreground bg-background p-4 bk-shadow" style={{ transform: 'rotate(-1.5deg)' }}>
                  <div className="mb-3 border-b-2 border-foreground pb-1.5 text-[10px] font-black uppercase tracking-widest" style={MONO}>Buttons</div>
                  <div className="flex flex-wrap gap-1.5">
                    <Button size="sm">Primary</Button>
                    <Button size="sm" variant="secondary">Secondary</Button>
                    <Button size="sm" variant="accent">Accent</Button>
                  </div>
                </div>
                <div className="snap-start shrink-0 w-52 border-3 border-foreground bg-background p-4 bk-shadow" style={{ transform: 'rotate(1.5deg)' }}>
                  <div className="mb-3 border-b-2 border-foreground pb-1.5 text-[10px] font-black uppercase tracking-widest" style={MONO}>Badges</div>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Teal</Badge>
                    <Badge variant="accent">Yellow</Badge>
                    <Badge variant="success">Success</Badge>
                  </div>
                </div>
                <div className="snap-start shrink-0 w-48 border-3 border-foreground bg-accent p-4 bk-shadow" style={{ transform: 'rotate(-1deg)' }}>
                  <div className="mb-3 border-b-2 border-foreground pb-1.5 text-[10px] font-black uppercase tracking-widest" style={MONO}>Spinners</div>
                  <div className="flex items-center gap-4 py-1">
                    <Spinner variant="brutal" />
                    <Spinner variant="dots" />
                    <Spinner variant="bars" />
                    <Spinner variant="blocks" />
                  </div>
                </div>
                <div className="snap-start shrink-0 w-48 border-3 border-foreground bg-primary p-4 bk-shadow" style={{ transform: 'rotate(2deg)' }}>
                  <div className="mb-3 border-b-2 border-foreground pb-1.5 text-[10px] font-black uppercase tracking-widest" style={MONO}>Stickers</div>
                  <div className="flex items-center gap-3">
                    <Sticker>New</Sticker>
                    <Sticker variant="secondary" rotation="medium-right">Hot</Sticker>
                    <Stamp size="sm">OK</Stamp>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            ACT 2 — TICKER BOARD (Marquee + Stats merged)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="overflow-hidden border-b-3 border-foreground bg-foreground py-3 text-background">
          <div className="relative marquee-fade-edges">
            <div className="animate-bk-marquee gap-0">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => {
                const sepColor = MARQUEE_SEP_COLORS[i % MARQUEE_SEP_COLORS.length]
                return (
                  <span key={i} className="flex items-center">
                    <span className="px-6 text-sm font-black uppercase tracking-widest" style={MONO}>{item}</span>
                    <span className={`${sepColor} text-lg font-black`}>✦</span>
                  </span>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats scoreboard */}
        <section className="border-b-3 border-foreground">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { count: componentsCount.count, suffix: '+', ref: componentsCount.ref, label: 'Components', bg: 'bg-primary',   icon: <Package className="h-5 w-5" />,  borders: 'border-r-3 border-b-3 md:border-b-0 border-foreground' },
              { count: chartsCount.count,     suffix: '',  ref: chartsCount.ref,     label: 'Chart Types', bg: 'bg-info',      icon: <BarChart3 className="h-5 w-5" />, borders: 'border-b-3 md:border-b-0 md:border-r-3 border-foreground' },
              { count: shapesCount.count,     suffix: '',  ref: shapesCount.ref,     label: 'SVG Shapes',  bg: 'bg-accent',    icon: <Sparkles className="h-5 w-5" />, borders: 'border-r-3 md:border-r-3 border-foreground' },
              { count: blocksCount.count,     suffix: '',  ref: blocksCount.ref,     label: 'Blocks',      bg: 'bg-secondary', icon: <LayoutGrid className="h-5 w-5" />, borders: '' },
            ].map((stat) => (
              <div key={stat.label} ref={stat.ref} className={`${stat.bg} ${stat.borders} p-6 md:p-10 flex flex-col gap-1`}>
                <div className="mb-1 flex items-center gap-2">
                  {stat.icon}
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={MONO}>{stat.label}</span>
                </div>
                <div className="font-black leading-none" style={{ ...DISPLAY, fontSize: 'clamp(40px, 7vw, 96px)' }}>
                  {stat.count}{stat.suffix}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            ACT 3 — COMPONENT UNIVERSE (Tabbed Showcase)
        ═══════════════════════════════════════════════════════════════ */}
        <section
          ref={showcaseReveal.ref}
          className={`border-b-3 border-foreground py-14 md:py-20 overflow-x-hidden transition-all duration-700 ease-out ${showcaseReveal.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="container mx-auto px-4">

            {/* Header */}
            <div className="mb-8 md:mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Badge variant="outline" className="mb-3">Everything You Need</Badge>
                <h2 className="leading-none" style={{ ...DISPLAY, fontSize: 'clamp(32px, 5.5vw, 76px)' }}>
                  THE FULL TOOLKIT
                </h2>
              </div>
              {/* What's new strip */}
              <div className="flex flex-col items-end gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground" style={MONO}>Recently Added</span>
                <div className="flex gap-1.5 flex-wrap justify-end">
                  {['Canvas Effects', 'ASCII Shapes', 'Math Curves', 'Carousel', 'Sidebar', 'Timeline'].map((label) => (
                    <span key={label} className="border-2 border-foreground bg-background px-2 py-0.5 text-[10px] font-bold" style={MONO}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="components">
              <div className="overflow-x-auto scrollbar-none -mx-4 px-4 mb-6">
                <TabsList className="w-max min-w-0">
                  <TabsTrigger value="components">
                    <Package className="h-3.5 w-3.5 mr-1.5" /> Components
                  </TabsTrigger>
                  <TabsTrigger value="charts">
                    <BarChart3 className="h-3.5 w-3.5 mr-1.5" /> Charts
                  </TabsTrigger>
                  <TabsTrigger value="shapes">
                    <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Shapes
                  </TabsTrigger>
                  <TabsTrigger value="blocks">
                    <LayoutGrid className="h-3.5 w-3.5 mr-1.5" /> Blocks
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* ── Components Tab ── */}
              <TabsContent value="components">
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="md:col-span-2">
                    <CardHeader className="border-b-3 border-foreground bg-primary">
                      <CardTitle style={MONO}>Buttons</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-5">
                      <div className="flex flex-wrap gap-3">
                        <Button>Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="accent">Accent</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="destructive">Danger</Button>
                        <Button variant="ghost">Ghost</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="border-b-3 border-foreground bg-primary">
                      <CardTitle style={MONO}>Badges</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-5">
                      <div className="flex flex-wrap gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Teal</Badge>
                        <Badge variant="accent">Yellow</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                        <Badge variant="destructive">Error</Badge>
                        <Badge variant="info">Info</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="border-b-3 border-foreground bg-info">
                      <CardTitle style={MONO}>Inputs</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-5 space-y-3">
                      <Input placeholder="Enter your email..." />
                      <div className="flex items-center gap-2">
                        <Checkbox id="terms-demo" />
                        <label htmlFor="terms-demo" className="text-sm font-medium">Accept terms</label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="border-b-3 border-foreground bg-accent">
                      <CardTitle className="flex items-center gap-2" style={MONO}>
                        Spinners <Badge variant="secondary" className="text-[10px]">New</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-5">
                      <div className="flex flex-wrap items-center gap-6">
                        {(['brutal', 'dots', 'bars', 'blocks'] as const).map(v => (
                          <div key={v} className="flex flex-col items-center gap-2">
                            <Spinner variant={v} size="lg" />
                            <span className="text-[10px] font-bold uppercase" style={MONO}>{v}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="border-b-3 border-foreground bg-secondary">
                      <CardTitle style={MONO}>Skeleton</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-5 space-y-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 shrink-0" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-3 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-5/6" />
                      <Skeleton className="h-3 w-4/6" />
                      <div className="flex gap-2 pt-1">
                        <Skeleton className="h-7 w-16" />
                        <Skeleton className="h-7 w-20" />
                        <Skeleton className="h-7 w-12" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader className="border-b-3 border-foreground bg-success">
                      <CardTitle className="flex items-center gap-2" style={MONO}>
                        Stat Cards <Badge variant="accent" className="text-[10px]">New</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <StatCard title="Revenue" value="$45,231" change="+20.1%" trend="up" icon={<DollarSign className="h-5 w-5" />} color="success" />
                        <StatCard title="Growth"  value="12.5%"   change="+4.3%"  trend="up" icon={<TrendingUp className="h-5 w-5"  />} color="primary" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="border-b-3 border-foreground bg-secondary">
                      <CardTitle style={MONO}>Layered Cards</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-6 pr-6 sm:pb-10 sm:pr-10 pt-5">
                      <div className="flex gap-6 items-start">
                        <LayeredCard layerColor="primary" className="flex-1">
                          <LayeredCardHeader><LayeredCardTitle className="text-sm">Stacked</LayeredCardTitle></LayeredCardHeader>
                          <LayeredCardContent><p className="text-xs">Paper depth</p></LayeredCardContent>
                        </LayeredCard>
                        <LayeredCard layerColor="accent" layers="triple" className="flex-1">
                          <LayeredCardContent className="py-4 text-center">
                            <div className="text-2xl font-black">3×</div>
                            <p className="mt-1 text-xs">Triple Layer</p>
                          </LayeredCardContent>
                        </LayeredCard>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2 lg:col-span-3">
                    <CardHeader className="border-b-3 border-foreground bg-warning">
                      <CardTitle style={MONO}>Stickers & Stamps</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-5">
                      <div className="flex flex-wrap items-center gap-6">
                        <Sticker>New</Sticker>
                        <Sticker variant="primary" rotation="medium-right">Hot</Sticker>
                        <Sticker variant="secondary" dashed>Sale</Sticker>
                        <Sticker variant="neon" rotation="slight-right">Beta</Sticker>
                        <Stamp size="sm">OK</Stamp>
                        <Stamp variant="secondary" size="sm">Verified</Stamp>
                        <Stamp size="lg">Pro</Stamp>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-7 flex gap-3">
                  <Link to="/components">
                    <Button variant="outline" className="gap-2">
                      All {COUNTS.components}+ Components <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              {/* ── Charts Tab ── */}
              <TabsContent value="charts">
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                  <Card className="lg:col-span-2">
                    <CardHeader className="border-b-3 border-foreground bg-info">
                      <CardTitle style={MONO}>Sparklines — {COUNTS.charts} Chart Types</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-5">
                      <div className="grid grid-cols-3 gap-4">
                        {([
                          { label: 'Area',  type: 'area' as const,  color: 'hsl(var(--primary))',   data: [2,5,3,8,4,9,6,12,8,14] },
                          { label: 'Line',  type: 'line' as const,  color: 'hsl(var(--secondary))', data: [8,3,10,2,7,5,12,4,9,6] },
                          { label: 'Bar',   type: 'bar' as const,   color: 'hsl(var(--accent))',    data: [4,9,3,11,6,8,2,10,5,7] },
                        ]).map(({ label, type, color, data }) => (
                          <div key={label} className="border-2 border-foreground p-3">
                            <Sparkline data={data} type={type} color={color} height={60} />
                            <div className="mt-2 text-[10px] font-black uppercase tracking-widest text-center" style={MONO}>{label}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="border-b-3 border-foreground bg-secondary">
                      <CardTitle style={MONO}>Donut Chart</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-5 flex justify-center">
                      <DonutChart
                        data={DONUT_DATA}
                        config={DONUT_CONFIG}
                        className="h-40 w-full"
                        centerContent={
                          <div className="text-center">
                            <div className="text-xl font-black" style={DISPLAY}>148</div>
                            <div className="text-[9px] text-muted-foreground font-bold uppercase" style={MONO}>Total</div>
                          </div>
                        }
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="border-b-3 border-foreground bg-accent">
                      <CardTitle style={MONO}>Gauge Chart</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-5 flex justify-center">
                      <GaugeChart
                        value={72}
                        min={0}
                        max={100}
                        variant="semicircle"
                        size="md"
                        className="h-32 w-full"
                        zones={[
                          { from: 0,  to: 40, color: 'hsl(var(--destructive))', label: 'Low'  },
                          { from: 40, to: 70, color: 'hsl(var(--warning))',     label: 'Mid'  },
                          { from: 70, to: 100, color: 'hsl(var(--success))',    label: 'High' },
                        ]}
                      />
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader className="border-b-3 border-foreground bg-primary">
                      <CardTitle style={MONO}>All Chart Types</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-5">
                      <div className="flex flex-wrap gap-2">
                        {['Area', 'Bar', 'Line', 'Pie', 'Horizontal Bar', 'Donut', 'Radar', 'Radial Bar', 'Gauge', 'Sparkline', 'Funnel', 'Treemap', 'Heatmap', 'Sankey'].map(c => (
                          <Badge key={c} variant="outline">{c}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-7 flex gap-3">
                  <Link to="/charts">
                    <Button variant="outline" className="gap-2">
                      Explore {COUNTS.charts} Charts <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              {/* ── Shapes Tab ── */}
              <TabsContent value="shapes">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-2xl">
                  {([
                    { Component: GearShape,      anim: 'spin',   label: 'Spin',   bg: 'bg-primary',   color: 'hsl(var(--primary-foreground))'   },
                    { Component: Star5Shape,     anim: 'pulse',  label: 'Pulse',  bg: 'bg-secondary', color: 'hsl(var(--secondary-foreground))' },
                    { Component: BlobShape,      anim: 'float',  label: 'Float',  bg: 'bg-accent',    color: 'hsl(var(--accent-foreground))'    },
                    { Component: LightningShape, anim: 'wiggle', label: 'Wiggle', bg: 'bg-warning',   color: 'hsl(var(--warning-foreground))'   },
                    { Component: BurstShape,     anim: 'bounce', label: 'Bounce', bg: 'bg-info',      color: 'hsl(var(--info-foreground))'      },
                    { Component: HexagonShape,   anim: 'glitch', label: 'Glitch', bg: 'bg-success',   color: 'hsl(var(--success-foreground))'   },
                  ] as const).map(({ Component, anim, label, bg, color }) => (
                    <Link key={anim} to="/shapes/builder">
                      <div className="group border-3 border-foreground hover:shadow-[4px_4px_0px_hsl(var(--primary))] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150 overflow-hidden">
                        <div className={`${bg} flex items-center justify-center py-5`}>
                          <Component size={52} color={color} animation={anim} speed="normal" />
                        </div>
                        <div className="bg-muted border-t-2 border-foreground px-2 py-1.5 text-center">
                          <span className="text-[10px] font-black uppercase tracking-widest" style={MONO}>{label}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-6">
                  <p className="mb-3 text-sm text-muted-foreground" style={MONO}>{COUNTS.shapes} shapes total — badges, geometric, decorative, arrows, icons</p>
                  <div className="flex gap-3 flex-wrap">
                    <Link to="/shapes">
                      <Button variant="outline" className="gap-2">Browse All Shapes <ArrowRight className="h-4 w-4" /></Button>
                    </Link>
                    <Link to="/shapes/builder">
                      <Button variant="accent" className="gap-2">
                        <Wand2 className="h-4 w-4" /> Shape Builder
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>

              {/* ── Blocks Tab ── */}
              <TabsContent value="blocks">
                <div className="grid md:grid-cols-2 gap-5 max-w-2xl">
                  <Card>
                    <CardHeader className="border-b-3 border-foreground bg-primary">
                      <div className="flex items-center gap-3">
                        <LayoutGrid className="h-8 w-8 stroke-[3]" />
                        <div>
                          <CardTitle>Marketing Blocks</CardTitle>
                          <p className="mt-1 text-sm font-medium">10 Sections</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3">
                      <p className="text-sm text-muted-foreground">Everything you need for a stunning landing page.</p>
                      <div className="flex flex-wrap gap-1.5">
                        {['Hero','Features','Testimonials','CTA','Stats','Team','FAQ','Footer','Contact','Logo Cloud'].map(b => (
                          <Badge key={b} variant="outline">{b}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="border-b-3 border-foreground bg-secondary">
                      <div className="flex items-center gap-3">
                        <Settings className="h-8 w-8 stroke-[3]" />
                        <div>
                          <CardTitle>Application Blocks</CardTitle>
                          <p className="mt-1 text-sm font-medium">5 Sections</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3">
                      <p className="text-sm text-muted-foreground">Essential app sections ready to use.</p>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge variant="outline" className="gap-1"><LogIn className="h-3 w-3" /> Auth</Badge>
                        <Badge variant="outline" className="gap-1"><Settings className="h-3 w-3" /> Settings</Badge>
                        <Badge variant="outline" className="gap-1"><Sparkles className="h-3 w-3" /> Onboarding</Badge>
                        <Badge variant="outline" className="gap-1"><FileX className="h-3 w-3" /> Error Pages</Badge>
                        <Badge variant="outline">Invoice</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-7 flex gap-3">
                  <Link to="/blocks">
                    <Button className="gap-2">Explore All Blocks <ArrowRight className="h-4 w-4" /></Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            ACT 4 — TOOLS (3-panel: Shape Builder | Dot Matrix | Canvas Effects)
        ═══════════════════════════════════════════════════════════════ */}
        <section
          ref={toolsReveal.ref}
          className={`border-b-3 border-foreground transition-all duration-700 ease-out ${toolsReveal.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* Section header */}
          <div className="border-b-3 border-foreground px-4 md:px-8 py-5 flex items-center justify-between bg-background">
            <div className="flex items-center gap-3">
              <div className="h-[3px] w-8 bg-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground" style={MONO}>Interactive Tools — v3.2</span>
            </div>
            <Badge variant="secondary" className="gap-1.5">3 Tools</Badge>
          </div>

          {/* 3 equal tool cards */}
          <div className="grid md:grid-cols-3">

            {/* ── Tool 1: Shape Builder ── */}
            <div className="relative overflow-hidden border-r-0 md:border-r-3 border-b-3 md:border-b-0 border-foreground bg-foreground">
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--background)) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              />
              <div className="relative p-8 flex flex-col h-full min-h-[380px]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-[3px] w-6 bg-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary" style={MONO}>Tool 01</span>
                </div>
                <h3 className="leading-none text-background mb-4" style={{ ...DISPLAY, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.9 }}>
                  SHAPE<br /><span className="text-primary">BUILDER</span>
                </h3>
                <p className="text-background/60 text-sm leading-relaxed mb-6 border-l-2 border-primary/40 pl-3" style={MONO}>
                  42 shapes. 7 animations. React & Vue. Dial in every prop and copy the code.
                </p>
                {/* Mini shape grid */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {([
                    { C: GearShape,   bg: 'bg-primary',   color: 'hsl(var(--primary-foreground))',   a: 'spin'   },
                    { C: Star5Shape,  bg: 'bg-secondary', color: 'hsl(var(--secondary-foreground))', a: 'pulse'  },
                    { C: BlobShape,   bg: 'bg-accent',    color: 'hsl(var(--accent-foreground))',    a: 'float'  },
                    { C: LightningShape, bg: 'bg-warning', color: 'hsl(var(--warning-foreground))', a: 'wiggle' },
                    { C: BurstShape,  bg: 'bg-info',      color: 'hsl(var(--info-foreground))',      a: 'bounce' },
                    { C: HexagonShape, bg: 'bg-success',  color: 'hsl(var(--success-foreground))',   a: 'glitch' },
                  ] as const).map(({ C, bg, color, a }) => (
                    <div key={a} className={`${bg} border-2 border-background/20 flex items-center justify-center py-3`}>
                      <C size={32} color={color} animation={a} speed="normal" />
                    </div>
                  ))}
                </div>
                <div className="mt-auto">
                  <Link to="/shapes/builder">
                    <Button variant="accent" className="gap-2 group">
                      <Wand2 className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                      Open Builder <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Tool 2: Dot Matrix Studio ── */}
            <div className="relative overflow-hidden border-r-0 md:border-r-3 border-b-3 md:border-b-0 border-foreground bg-foreground">
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--background)) 1px, transparent 1px)', backgroundSize: '16px 16px' }}
              />
              <div className="relative p-8 flex flex-col h-full min-h-[380px]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-[3px] w-6 bg-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary" style={MONO}>Tool 02</span>
                </div>
                <h3 className="leading-none text-background mb-4" style={{ ...DISPLAY, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.9 }}>
                  DOT MATRIX<br /><span className="text-primary">STUDIO</span>
                </h3>
                <p className="text-background/60 text-sm leading-relaxed mb-5 border-l-2 border-primary/40 pl-3" style={MONO}>
                  Draw pixel art, animate frame-by-frame, export to WebM / PNG / SVG / JSON.
                </p>
                {/* Live animated preview */}
                <div className="mb-6 border-3 border-background/20 bg-[#080808] p-3" style={{ boxShadow: '4px 4px 0px hsl(var(--primary))' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: `${DM_COLS}/${DM_ROWS}` }}>
                    <div
                      className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
                      style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,1) 1px, rgba(0,0,0,1) 2px)', backgroundSize: '100% 2px' }}
                    />
                    <DotMatrixPreview />
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-background/10 pt-2">
                    <span className="text-[8px] font-mono text-background/30" style={MONO}>8 × 20 · live</span>
                    <div className="flex gap-1">
                      {['WebM', 'PNG', 'SVG', 'JSON'].map(f => (
                        <span key={f} className="text-[7px] font-bold border border-background/20 px-1 py-0.5 text-background/30" style={MONO}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  <Link to="/studio">
                    <Button variant="accent" className="gap-2 group">
                      <Cpu className="h-4 w-4" />
                      Open Studio <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Tool 3: Theme Builder ── */}
            <div className="relative overflow-hidden border-foreground bg-background">
              <div className="grid-pattern absolute inset-0 opacity-10" />
              <div className="relative p-8 flex flex-col h-full min-h-[380px]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-[3px] w-6 bg-secondary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary" style={MONO}>Tool 03</span>
                </div>
                <h3 className="leading-none mb-4" style={{ ...DISPLAY, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.9 }}>
                  THEME<br /><span className="text-secondary">BUILDER</span>
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed mb-5 border-l-2 border-secondary/40 pl-3" style={MONO}>
                  Customize every color token live. Preview your palette across all components and copy the generated CSS variables.
                </p>
                {/* Color swatches preview */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {[
                    { label: 'Primary',     bg: 'bg-primary',     text: 'text-primary-foreground'     },
                    { label: 'Secondary',   bg: 'bg-secondary',   text: 'text-secondary-foreground'   },
                    { label: 'Accent',      bg: 'bg-accent',      text: 'text-accent-foreground'      },
                    { label: 'Success',     bg: 'bg-success',     text: 'text-success-foreground'     },
                    { label: 'Warning',     bg: 'bg-warning',     text: 'text-warning-foreground'     },
                    { label: 'Info',        bg: 'bg-info',        text: 'text-info-foreground'        },
                  ].map(({ label, bg, text }) => (
                    <div key={label} className={`${bg} border-2 border-foreground/20 flex items-end justify-start p-2`} style={{ minHeight: 52 }}>
                      <span className={`${text} text-[9px] font-black uppercase leading-none`} style={MONO}>{label}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-6 border-2 border-foreground bg-muted p-3 space-y-2">
                  {['--primary: 142 71% 45%', '--secondary: 174 62% 42%', '--accent: 45 100% 55%'].map(v => (
                    <div key={v} className="text-[10px] font-mono text-muted-foreground">{v}</div>
                  ))}
                </div>
                <div className="mt-auto">
                  <Link to="/theme-builder">
                    <Button variant="secondary" className="gap-2 group">
                      <Palette className="h-4 w-4" />
                      Open Theme Builder <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            ACT 5 — EFFECTS GALLERY (Math Curves | ASCII | Canvas — 3 columns)
        ═══════════════════════════════════════════════════════════════ */}
        <section
          ref={effectsReveal.ref}
          className={`relative overflow-hidden border-b-3 border-foreground transition-all duration-700 ease-out ${effectsReveal.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ background: '#080810' }}
        >
          {/* Section header */}
          <div className="border-b-3 border-white/15 px-4 md:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-[3px] w-8 bg-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60" style={MONO}>BoldKit Effects & Animations</span>
            </div>
            <div className="flex gap-1.5">
              <span className="border border-white/20 text-white/40 text-[10px] font-bold px-2 py-0.5 uppercase" style={MONO}>React</span>
              <span className="border border-white/20 text-white/40 text-[10px] font-bold px-2 py-0.5 uppercase" style={MONO}>Vue 3</span>
              <span className="border border-white/20 text-white/40 text-[10px] font-bold px-2 py-0.5 uppercase" style={MONO}>Nuxt</span>
            </div>
          </div>

          {/* 3-column gallery */}
          <div className="grid md:grid-cols-3">

            {/* Col 1: Math Curves */}
            <div className="border-r-0 md:border-r-3 border-b-3 md:border-b-0 border-white/15 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-black text-lg uppercase" style={MONO}>Math Curves</h3>
                  <p className="text-white/40 text-[11px] mt-0.5" style={MONO}>15 parametric shapes</p>
                </div>
                <Link to="/components/math-curve-loader">
                  <Button variant="ghost" size="sm" className="text-primary border-primary/30 gap-1 text-xs">
                    View <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
              {/* 3×5 grid of math curve loaders */}
              <div className="grid grid-cols-5 gap-px border border-white/10">
                {(['rose', 'lissajous', 'butterfly', 'hypotrochoid', 'cardioid',
                  'lemniscate', 'fourier', 'rose3', 'astroid', 'deltoid',
                  'nephroid', 'epicycloid', 'superellipse', 'triskelion', 'involute'] as const).map((curve, i) => (
                  <div key={curve} className="flex flex-col items-center justify-center gap-1.5 border border-white/5 py-3 px-1 hover:bg-white/5 transition-colors">
                    <MathCurveLoader
                      curve={curve}
                      size="sm"
                      speed="normal"
                      className="text-white"
                      headColor={i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(var(--secondary))' : 'hsl(var(--accent))'}
                    />
                    <span className="text-[7px] font-bold uppercase text-white/30 leading-none text-center" style={MONO}>{curve.slice(0,6)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {['Loader', 'Progress', 'Background'].map(v => (
                  <span key={v} className="text-[10px] font-bold uppercase border border-white/15 px-2 py-0.5 text-white/40" style={MONO}>{v}</span>
                ))}
              </div>
            </div>

            {/* Col 2: ASCII Animations */}
            <div className="border-r-0 md:border-r-3 border-b-3 md:border-b-0 border-white/15 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-black text-lg uppercase" style={MONO}>ASCII Art</h3>
                  <p className="text-white/40 text-[11px] mt-0.5" style={MONO}>7 animated shapes</p>
                </div>
                <Link to="/ascii-shapes">
                  <Button variant="ghost" size="sm" className="text-secondary border-secondary/30 gap-1 text-xs">
                    View <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { C: AsciiSpiral, charset: 'classic', label: 'SPIRAL', color: 'hsl(var(--primary))' },
                  { C: AsciiVortex, charset: 'blocks',  label: 'VORTEX', color: 'hsl(var(--secondary))' },
                  { C: AsciiMatrix, charset: 'classic', label: 'MATRIX', color: 'hsl(var(--accent))' },
                  { C: AsciiGrid,   charset: 'line',    label: 'GRID',   color: 'hsl(var(--warning))' },
                ] as const).map(({ C, charset, label, color }) => (
                  <Link key={label} to="/ascii-shapes">
                    <div className="flex flex-col items-center gap-2 hover:opacity-90 transition-opacity border border-white/10 p-2 hover:border-white/25">
                      <C size="sm" charset={charset} color={color} speed="normal" className="border-white/20 shadow-none !bg-transparent" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/40" style={MONO}>{label}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {['5 Charsets', '4 Sizes', 'React & Vue'].map(v => (
                  <span key={v} className="text-[10px] font-bold uppercase border border-white/15 px-2 py-0.5 text-white/40" style={MONO}>{v}</span>
                ))}
              </div>
            </div>

            {/* Col 3: Canvas Effects */}
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-black text-lg uppercase" style={MONO}>Canvas FX</h3>
                  <p className="text-white/40 text-[11px] mt-0.5" style={MONO}>10 zero-dep components</p>
                </div>
                <Link to="/canvas-effects">
                  <Button variant="ghost" size="sm" className="text-accent border-accent/30 gap-1 text-xs">
                    View <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { node: <FlowField count={100} hueStart={170} hueRange={120} speed={1} decay={0.028} />,       label: 'FLOW FIELD', accent: '#22d3ee' },
                  { node: <Plasma palette={['#0a1450','#1e64c8','#00d2dc','#5affa6','#ffc832','#ff4b82']} speed={1} />, label: 'PLASMA',    accent: '#fb923c' },
                  { node: <Metaballs colors={['#ff5050','#3cb9ff','#ffc32d','#aa4bff']} blobRadius={55} speed={1} />,  label: 'METABALLS', accent: '#f472b6' },
                  { node: <Aurora colors={['#00ffaa','#00beff','#78ff64','#be50ff']} starCount={80} speed={1} />,  label: 'AURORA',    accent: '#00ffaa' },
                  { node: <MatrixRain headColor="#00ff41" trailHue={120} speed={1} />,                             label: 'MATRIX',    accent: '#00ff41' },
                  { node: <ParticleWeb count={60} particleColor="#5b4fcf" lineColor="#5b4fcf" />,                    label: 'PARTICLE',  accent: '#a78bfa' },
                ] as const).map(({ node, label, accent }) => (
                  <Link key={label} to="/canvas-effects">
                    <div className="group flex flex-col items-center gap-1.5 hover:opacity-90 transition-opacity">
                      <div className="overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors relative" style={{ width: '100%', height: 72, background: '#070707' }}>
                        {node}
                        <div className="absolute bottom-1 left-1.5">
                          <span className="text-[7px] font-black uppercase" style={{ ...MONO, color: accent }}>{label}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {['Aurora', 'Flow Field', 'Plasma', 'Metaballs', 'Matrix Rain', 'Particle Web', 'Dot Wave', 'Dot Blob', 'Mouse Ripple', 'Lissajous'].map(name => (
                  <span key={name} className="text-[9px] font-bold uppercase border border-white/10 px-1.5 py-0.5 text-white/35" style={MONO}>{name}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            ACT 6 — WHY BOLDKIT (Bento-grid features)
        ═══════════════════════════════════════════════════════════════ */}
        <section
          ref={featuresReveal.ref}
          className={`border-b-3 border-foreground py-14 md:py-20 transition-all duration-700 ease-out ${featuresReveal.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="container mx-auto px-4">
            <div className="mb-8 md:mb-12">
              <Badge variant="outline" className="mb-3">Why BoldKit</Badge>
              <h2 className="leading-none" style={{ ...DISPLAY, fontSize: 'clamp(32px, 5.5vw, 76px)' }}>
                BUILT DIFFERENT
              </h2>
            </div>

            {/* Bento grid */}
            <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto">

              {/* Multi-framework — 2 cols wide, 2 rows tall */}
              <Card interactive className="flex flex-col md:col-span-2 lg:row-span-2">
                <CardHeader className="border-b-3 border-foreground bg-info">
                  <div className="flex items-center gap-3">
                    <Layers className="h-10 w-10 stroke-[3]" />
                    <div>
                      <CardTitle>Multi-Framework</CardTitle>
                      <p className="mt-1 text-sm font-medium">React, Vue 3 & Nuxt</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4 pt-4">
                  <p className="text-muted-foreground">Same design system, same components, your choice of framework. Build with what you love.</p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="gap-1"><ReactIcon className="h-3 w-3" /> React</Badge>
                    <Badge variant="outline" className="gap-1"><VueIcon className="h-3 w-3" /> Vue</Badge>
                    <Badge variant="outline">Nuxt</Badge>
                  </div>
                  <div className="mt-auto space-y-2 border-t-2 border-foreground pt-4">
                    <code className="block border-2 border-foreground bg-muted p-2.5 text-[11px] font-mono leading-relaxed">
                      npx shadcn@latest add<br />
                      boldkit.dev/r/button.json
                    </code>
                    <code className="block border-2 border-foreground bg-muted p-2.5 text-[11px] font-mono leading-relaxed">
                      npx shadcn-vue@latest add<br />
                      boldkit.dev/r/vue/button.json
                    </code>
                  </div>
                </CardContent>
              </Card>

              {/* Fast setup */}
              <Card interactive>
                <CardHeader className="border-b-3 border-foreground bg-primary">
                  <Zap className="h-8 w-8 stroke-[3]" />
                  <CardTitle>Fast Setup</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-2">
                  <p className="text-muted-foreground text-sm">One command to install. Copy-paste and ship.</p>
                  {[
                    { step: '1', label: 'Install via CLI' },
                    { step: '2', label: 'Import component' },
                    { step: '3', label: 'Ship it' },
                  ].map(({ step, label }) => (
                    <div key={step} className="flex items-center gap-2 border-2 border-foreground bg-muted px-2.5 py-1.5">
                      <div className="h-4 w-4 border-2 border-foreground bg-primary flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5" />
                      </div>
                      <span className="text-xs font-mono font-medium">{label}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Themeable */}
              <Card interactive>
                <CardHeader className="border-b-3 border-foreground bg-secondary">
                  <Palette className="h-8 w-8 stroke-[3]" />
                  <CardTitle>Themeable</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <p className="text-muted-foreground text-sm">CSS variables. Dark mode out of the box.</p>
                  <div className="flex gap-2">
                    {['bg-primary','bg-secondary','bg-accent','bg-success','bg-info','bg-warning'].map(c => (
                      <div key={c} className={`h-6 w-6 border-2 border-foreground ${c}`} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* TypeScript */}
              <Card interactive>
                <CardHeader className="border-b-3 border-foreground bg-accent">
                  <Code2 className="h-8 w-8 stroke-[3]" />
                  <CardTitle>TypeScript</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <p className="text-muted-foreground text-sm">Complete type definitions for all components.</p>
                  <code className="block border-2 border-foreground bg-muted p-2 text-xs font-mono">
                    {'<Button variant="primary" />'}
                  </code>
                </CardContent>
              </Card>

              {/* Accessible */}
              <Card interactive>
                <CardHeader className="border-b-3 border-foreground bg-warning">
                  <Smartphone className="h-8 w-8 stroke-[3]" />
                  <CardTitle>Accessible & Mobile</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <p className="text-muted-foreground text-sm">Built on Radix UI & Reka UI. Keyboard navigation included.</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['aria-label', 'role="button"', 'tabIndex', 'focus-visible'].map(attr => (
                      <code key={attr} className="text-[10px] font-mono border-2 border-foreground bg-muted px-1.5 py-0.5">{attr}</code>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Open Source */}
              <Card interactive>
                <CardHeader className="border-b-3 border-foreground bg-success">
                  <Github className="h-8 w-8 stroke-[3]" />
                  <CardTitle>Open Source</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <p className="text-muted-foreground text-sm">MIT licensed. Free forever. Community-driven.</p>
                  <div className="flex gap-2">
                    <Stamp size="sm">MIT</Stamp>
                    <Sticker size="sm" variant="primary">Free</Sticker>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            ACT 7 — FINAL CTA (with live Plasma background)
        ═══════════════════════════════════════════════════════════════ */}
        <section
          ref={ctaReveal.ref}
          className={`relative overflow-hidden bg-foreground py-20 md:py-28 transition-all duration-700 ease-out ${ctaReveal.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* Live Plasma canvas behind overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <Plasma palette={['#0a0f1a','#1a0a2e','#0d1f1a','#1a1a08','#1a0a0a','#0a1a1a']} speed={0.5} />
          </div>
          <div className="absolute inset-0 bg-foreground/75 pointer-events-none" />
          <div className="grid-pattern absolute inset-0 opacity-[0.06]" />

          {/* Decorative stickers */}
          <div className="absolute -top-2 -left-4 opacity-90 hidden sm:block pointer-events-none select-none" style={{ transform: 'rotate(-8deg)' }}>
            <Sticker variant="primary" size="lg" rotation="none">Free</Sticker>
          </div>
          <div className="absolute top-6 -right-2 opacity-80 hidden sm:block pointer-events-none select-none" style={{ transform: 'rotate(12deg)' }}>
            <Stamp size="sm" variant="secondary" rotation="none">MIT</Stamp>
          </div>
          <div className="absolute -bottom-2 left-8 opacity-75 hidden md:block pointer-events-none select-none" style={{ transform: 'rotate(-6deg)' }}>
            <Stamp size="sm" rotation="none">v3.2</Stamp>
          </div>
          <div className="absolute bottom-4 -right-3 opacity-85 hidden sm:block pointer-events-none select-none" style={{ transform: 'rotate(9deg)' }}>
            <Sticker variant="secondary" rotation="none" size="sm">Open Source</Sticker>
          </div>
          <span className="absolute top-8 left-1/4 text-primary text-3xl opacity-30 hidden lg:block select-none pointer-events-none">✦</span>
          <span className="absolute bottom-10 right-1/4 text-secondary text-2xl opacity-25 hidden lg:block select-none pointer-events-none">✦</span>
          <span className="absolute top-1/2 left-12 text-accent text-xl opacity-20 hidden lg:block select-none pointer-events-none">✦</span>

          <div className="container relative mx-auto px-4">
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">

              {/* Left: Headline */}
              <div>
                <div className="mb-4 select-none leading-none text-background" style={{ ...DISPLAY, fontSize: 'clamp(40px, 8vw, 120px)', lineHeight: 0.92 }}>
                  BUILD SOMETHING<br />
                  <span className="text-primary">BOLD.</span>
                </div>
                <p className="max-w-sm text-sm text-background/60" style={MONO}>
                  Free, open-source, and ready for production. Start building in seconds with React, Vue 3, or Nuxt.
                </p>
              </div>

              {/* Right: Action panel */}
              <div className="flex flex-col gap-3 lg:min-w-[260px]">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: `${COUNTS.components}+`, label: 'Components' },
                    { value: `${COUNTS.charts}`,      label: 'Chart Types' },
                    { value: `${COUNTS.blocks}`,      label: 'Blocks'      },
                    { value: 'MIT',                   label: 'License'     },
                  ].map((s) => (
                    <div key={s.label} className="border-2 border-background/20 p-2.5 text-center">
                      <div className="text-lg font-black text-background leading-none" style={DISPLAY}>{s.value}</div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-background/40 mt-0.5" style={MONO}>{s.label}</div>
                    </div>
                  ))}
                </div>
                {/* CTAs */}
                <Link to="/docs/installation">
                  <Button size="lg" className="w-full">
                    Get Started <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <a href="https://github.com/ANIBIT14/boldkit" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="w-full gap-2 bg-transparent border-background text-background hover:bg-background/10">
                    <Github className="h-4 w-4" /> Star on GitHub
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

      </Layout>
    </>
  )
}
