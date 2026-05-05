import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Layout } from '@/components/layout'
import { Copy, Check, Terminal, Wand2, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { SEO, pageSEO } from '@/components/SEO'
import { useFramework, FrameworkToggle } from '@/hooks/use-framework'
import {
  TriangleShape, DiamondBadge, PentagonShape, HexagonShape, OctagonShape,
  CrossShape, TrapezoidShape, ParallelogramShape,
  Star4Shape, Star5Shape, Star6Shape, BurstShape, ExplosionShape, SplatShape, LightningShape,
  BlobShape, WaveShape, CloudShape, HeartShape, AppleShape,
  SunShape, CrescentShape, RainbowShape, PlanetShape, UmbrellaShape,
  ArrowBadge, ZigzagBanner, RibbonShape, ShieldShape, TagShape, PriceTagShape,
  TicketShape, CouponShape, BookmarkShape, FlagShape, PillShape, SealShape, WavyRectangleShape,
  SpeechBubble, CursorShape, EyeShape,
  ScribbleCircle, ScribbleUnderline, PaperTearShape,
  GearShape,
  HeptagonShape, DecagonShape, RhombusShape, EllipseShape, TrefoilShape,
  FibonacciSpiralShape, PenroseTriangleShape, KochSnowflakeShape, MobiusStripShape, TorusShape,
} from '@/components/ui/shapes'

const DISPLAY: CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" }
const MONO: CSSProperties = { fontFamily: "'DM Mono', monospace" }

// ─── Data ────────────────────────────────────────────────────────────────────

const shapeCategories = [
  {
    name: 'Geometric', num: '01',
    description: 'Basic polygons and mathematical forms',
    accent: 'bg-primary', bg: 'bg-primary/8 dark:bg-primary/10',
    shapes: [
      { name: 'Triangle',     component: TriangleShape,     code: '<TriangleShape size={100} />',     vueCode: '<TriangleShape :size="100" />' },
      { name: 'Diamond',      component: DiamondBadge,      code: '<DiamondBadge size={100} />',      vueCode: '<DiamondBadge :size="100" />' },
      { name: 'Pentagon',     component: PentagonShape,     code: '<PentagonShape size={100} />',     vueCode: '<PentagonShape :size="100" />' },
      { name: 'Hexagon',      component: HexagonShape,      code: '<HexagonShape size={100} />',     vueCode: '<HexagonShape :size="100" />' },
      { name: 'Octagon',      component: OctagonShape,      code: '<OctagonShape size={100} />',     vueCode: '<OctagonShape :size="100" />' },
      { name: 'Cross',        component: CrossShape,        code: '<CrossShape size={100} />',       vueCode: '<CrossShape :size="100" />' },
      { name: 'Trapezoid',    component: TrapezoidShape,    code: '<TrapezoidShape size={100} />',   vueCode: '<TrapezoidShape :size="100" />' },
      { name: 'Parallelogram',component: ParallelogramShape,code: '<ParallelogramShape size={100} />',vueCode: '<ParallelogramShape :size="100" />' },
      { name: 'Heptagon',     component: HeptagonShape,     code: '<HeptagonShape size={100} />',    vueCode: '<HeptagonShape :size="100" />', isNew: true },
      { name: 'Decagon',      component: DecagonShape,      code: '<DecagonShape size={100} />',     vueCode: '<DecagonShape :size="100" />', isNew: true },
      { name: 'Rhombus',      component: RhombusShape,      code: '<RhombusShape size={100} />',     vueCode: '<RhombusShape :size="100" />', isNew: true },
      { name: 'Ellipse',      component: EllipseShape,      code: '<EllipseShape size={100} />',     vueCode: '<EllipseShape :size="100" />', isNew: true },
      { name: 'Trefoil',      component: TrefoilShape,      code: '<TrefoilShape size={100} />',     vueCode: '<TrefoilShape :size="100" />', isNew: true },
    ],
  },
  {
    name: 'Stars & Bursts', num: '02',
    description: 'Stars, explosions, and attention-grabbing shapes',
    accent: 'bg-warning', bg: 'bg-warning/8 dark:bg-warning/10',
    shapes: [
      { name: 'Star 4-Point', component: Star4Shape,     code: '<Star4Shape size={100} />',     vueCode: '<Star4Shape :size="100" />' },
      { name: 'Star 5-Point', component: Star5Shape,     code: '<Star5Shape size={100} />',     vueCode: '<Star5Shape :size="100" />' },
      { name: 'Star 6-Point', component: Star6Shape,     code: '<Star6Shape size={100} />',     vueCode: '<Star6Shape :size="100" />' },
      { name: 'Burst',        component: BurstShape,     code: '<BurstShape size={100} />',     vueCode: '<BurstShape :size="100" />' },
      { name: 'Explosion',    component: ExplosionShape, code: '<ExplosionShape size={100} />', vueCode: '<ExplosionShape :size="100" />' },
      { name: 'Splat',        component: SplatShape,     code: '<SplatShape size={100} />',     vueCode: '<SplatShape :size="100" />' },
      { name: 'Lightning',    component: LightningShape, code: '<LightningShape size={100} />', vueCode: '<LightningShape :size="100" />' },
    ],
  },
  {
    name: 'Organic', num: '03',
    description: 'Natural forms, blobs, and flowing shapes',
    accent: 'bg-secondary', bg: 'bg-secondary/8 dark:bg-secondary/10',
    shapes: [
      { name: 'Blob',  component: BlobShape,  code: '<BlobShape size={100} />',  vueCode: '<BlobShape :size="100" />' },
      { name: 'Wave',  component: WaveShape,  code: '<WaveShape size={100} />',  vueCode: '<WaveShape :size="100" />' },
      { name: 'Cloud', component: CloudShape, code: '<CloudShape size={100} />', vueCode: '<CloudShape :size="100" />' },
      { name: 'Heart', component: HeartShape, code: '<HeartShape size={100} />', vueCode: '<HeartShape :size="100" />' },
      { name: 'Apple', component: AppleShape, code: '<AppleShape size={100} />', vueCode: '<AppleShape :size="100" />' },
    ],
  },
  {
    name: 'Celestial & Nature', num: '04',
    description: 'Sun, moon, planets, and natural phenomena',
    accent: 'bg-accent', bg: 'bg-accent/8 dark:bg-accent/10',
    shapes: [
      { name: 'Sun',      component: SunShape,      code: '<SunShape size={100} />',      vueCode: '<SunShape :size="100" />' },
      { name: 'Crescent', component: CrescentShape, code: '<CrescentShape size={100} />', vueCode: '<CrescentShape :size="100" />' },
      { name: 'Rainbow',  component: RainbowShape,  code: '<RainbowShape size={100} />',  vueCode: '<RainbowShape :size="100" />' },
      { name: 'Planet',   component: PlanetShape,   code: '<PlanetShape size={100} />',   vueCode: '<PlanetShape :size="100" />' },
      { name: 'Umbrella', component: UmbrellaShape, code: '<UmbrellaShape size={100} />', vueCode: '<UmbrellaShape :size="100" />' },
    ],
  },
  {
    name: 'Badges & UI', num: '05',
    description: 'Tags, ribbons, tickets, and UI elements',
    accent: 'bg-info', bg: 'bg-info/8 dark:bg-info/10',
    shapes: [
      { name: 'Arrow Badge',    component: ArrowBadge,        code: '<ArrowBadge size={100} />',        vueCode: '<ArrowBadge :size="100" />' },
      { name: 'Zigzag Banner',  component: ZigzagBanner,      code: '<ZigzagBanner size={100} />',      vueCode: '<ZigzagBanner :size="100" />' },
      { name: 'Ribbon',         component: RibbonShape,       code: '<RibbonShape size={100} />',       vueCode: '<RibbonShape :size="100" />' },
      { name: 'Shield',         component: ShieldShape,       code: '<ShieldShape size={100} />',       vueCode: '<ShieldShape :size="100" />' },
      { name: 'Tag',            component: TagShape,          code: '<TagShape size={100} />',          vueCode: '<TagShape :size="100" />' },
      { name: 'Price Tag',      component: PriceTagShape,     code: '<PriceTagShape size={100} />',     vueCode: '<PriceTagShape :size="100" />' },
      { name: 'Ticket',         component: TicketShape,       code: '<TicketShape size={100} />',       vueCode: '<TicketShape :size="100" />' },
      { name: 'Coupon',         component: CouponShape,       code: '<CouponShape size={100} />',       vueCode: '<CouponShape :size="100" />' },
      { name: 'Bookmark',       component: BookmarkShape,     code: '<BookmarkShape size={100} />',     vueCode: '<BookmarkShape :size="100" />' },
      { name: 'Flag',           component: FlagShape,         code: '<FlagShape size={100} />',         vueCode: '<FlagShape :size="100" />' },
      { name: 'Pill',           component: PillShape,         code: '<PillShape size={100} />',         vueCode: '<PillShape :size="100" />' },
      { name: 'Seal',           component: SealShape,         code: '<SealShape size={100} />',         vueCode: '<SealShape :size="100" />', isNew: true },
      { name: 'Wavy Rectangle', component: WavyRectangleShape,code: '<WavyRectangleShape size={100} />',vueCode: '<WavyRectangleShape :size="100" />', isNew: true },
    ],
  },
  {
    name: 'Communication', num: '06',
    description: 'Speech bubbles, cursors, and interactive elements',
    accent: 'bg-success', bg: 'bg-success/8 dark:bg-success/10',
    shapes: [
      { name: 'Speech Bubble', component: SpeechBubble,  code: '<SpeechBubble size={100} />',  vueCode: '<SpeechBubble :size="100" />' },
      { name: 'Cursor',        component: CursorShape,   code: '<CursorShape size={100} />',   vueCode: '<CursorShape :size="100" />' },
      { name: 'Eye',           component: EyeShape,      code: '<EyeShape size={100} />',      vueCode: '<EyeShape :size="100" />' },
    ],
  },
  {
    name: 'Decorative', num: '07',
    description: 'Scribbles, effects, and artistic touches',
    accent: 'bg-destructive', bg: 'bg-destructive/8 dark:bg-destructive/10',
    shapes: [
      { name: 'Scribble Circle',    component: ScribbleCircle,    code: '<ScribbleCircle size={100} />',    vueCode: '<ScribbleCircle :size="100" />' },
      { name: 'Scribble Underline', component: ScribbleUnderline, code: '<ScribbleUnderline size={100} />', vueCode: '<ScribbleUnderline :size="100" />' },
      { name: 'Paper Tear',         component: PaperTearShape,    code: '<PaperTearShape size={100} />',    vueCode: '<PaperTearShape :size="100" />' },
    ],
  },
  {
    name: 'Mechanical', num: '08',
    description: 'Gears, cogs, and technical elements',
    accent: 'bg-muted-foreground', bg: 'bg-muted',
    shapes: [
      { name: 'Gear', component: GearShape, code: '<GearShape size={100} />', vueCode: '<GearShape :size="100" />', isNew: true },
    ],
  },
  {
    name: 'Mathematical', num: '09',
    description: 'Fractals, topology, and mathematical constructs',
    accent: 'bg-primary', bg: 'bg-primary/5 dark:bg-primary/8',
    shapes: [
      { name: 'Fibonacci Spiral', component: FibonacciSpiralShape, code: '<FibonacciSpiralShape size={100} />', vueCode: '<FibonacciSpiralShape :size="100" />', isNew: true },
      { name: 'Penrose Triangle', component: PenroseTriangleShape, code: '<PenroseTriangleShape size={100} />', vueCode: '<PenroseTriangleShape :size="100" />', isNew: true },
      { name: 'Koch Snowflake',   component: KochSnowflakeShape,   code: '<KochSnowflakeShape size={100} />',   vueCode: '<KochSnowflakeShape :size="100" />', isNew: true },
      { name: 'Möbius Strip',     component: MobiusStripShape,     code: '<MobiusStripShape size={100} />',     vueCode: '<MobiusStripShape :size="100" />', isNew: true },
      { name: 'Torus',            component: TorusShape,           code: '<TorusShape size={100} />',           vueCode: '<TorusShape :size="100" />', isNew: true },
    ],
  },
]

// ─── ShapeCard ────────────────────────────────────────────────────────────────

function ShapeCard({
  name, Component, code, vueCode, isNew,
}: {
  name: string
  Component: React.ComponentType<any>
  code: string
  vueCode: string
  isNew?: boolean
}) {
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedCli, setCopiedCli] = useState(false)
  const { framework } = useFramework()

  const cliCommand = framework === 'react'
    ? 'npx shadcn@latest add https://boldkit.dev/r/shapes.json'
    : 'npx shadcn-vue@latest add https://boldkit.dev/r/vue/shapes.json'

  const currentCode = framework === 'react' ? code : vueCode

  const copyCode = () => {
    navigator.clipboard.writeText(currentCode)
    setCopiedCode(true)
    toast.success('Code copied!')
    setTimeout(() => setCopiedCode(false), 2000)
  }
  const copyCli = () => {
    navigator.clipboard.writeText(cliCommand)
    setCopiedCli(true)
    toast.success('CLI command copied!')
    setTimeout(() => setCopiedCli(false), 2000)
  }

  return (
    <div className="group relative border-3 border-foreground bg-background transition-all duration-150 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[6px_6px_0px_hsl(var(--foreground))] cursor-default">
      {isNew && (
        <span
          className="absolute top-2 right-2 z-10 bg-accent border-2 border-foreground text-[9px] font-black uppercase px-1.5 py-0.5 leading-none"
          style={MONO}
        >
          NEW
        </span>
      )}

      {/* Shape preview — takes up most of the card */}
      <div className="flex items-center justify-center p-4 sm:p-6 aspect-square">
        <div className="transition-transform duration-300 group-hover:scale-110">
          <Component size={56} className="sm:hidden" />
          <Component size={72} className="hidden sm:block lg:hidden" />
          <Component size={80} className="hidden lg:block" />
        </div>
      </div>

      {/* Label strip */}
      <div className="border-t-3 border-foreground bg-muted px-2 py-2 flex items-center justify-between gap-1 min-h-[36px]">
        <p
          className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider truncate text-foreground leading-none"
          style={MONO}
        >
          {name}
        </p>
        {/* Buttons — always visible on mobile, appear on hover for desktop */}
        <div className="flex gap-0.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
          <button
            onClick={copyCode}
            className="w-6 h-6 flex items-center justify-center border-2 border-foreground bg-background hover:bg-foreground hover:text-background transition-colors"
            title={`Copy ${framework === 'react' ? 'JSX' : 'Vue'} code`}
          >
            {copiedCode ? <Check className="h-2.5 w-2.5" /> : <Copy className="h-2.5 w-2.5" />}
          </button>
          <button
            onClick={copyCli}
            className="w-6 h-6 flex items-center justify-center border-2 border-foreground bg-background hover:bg-foreground hover:text-background transition-colors"
            title="Copy CLI install"
          >
            {copiedCli ? <Check className="h-2.5 w-2.5" /> : <Terminal className="h-2.5 w-2.5" />}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function Shapes() {
  const [copiedInstall, setCopiedInstall] = useState(false)
  const { framework } = useFramework()

  const cliCommand = framework === 'react'
    ? 'npx shadcn@latest add https://boldkit.dev/r/shapes.json'
    : 'npx shadcn-vue@latest add https://boldkit.dev/r/vue/shapes.json'

  const totalShapes = shapeCategories.reduce((acc, cat) => acc + cat.shapes.length, 0)

  const copyInstall = () => {
    navigator.clipboard.writeText(cliCommand)
    setCopiedInstall(true)
    toast.success('CLI command copied!')
    setTimeout(() => setCopiedInstall(false), 2000)
  }

  return (
    <>
      <SEO {...pageSEO.shapes} />
      <Layout>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative border-b-3 border-foreground overflow-hidden bg-background">
          <div className="grid-pattern absolute inset-0 opacity-20 pointer-events-none" />

          {/* Floating decorative shapes (desktop only) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block select-none" aria-hidden>
            <div className="absolute top-10 right-[10%] text-primary/25 rotate-12">
              <BurstShape size={88} />
            </div>
            <div className="absolute top-32 right-[26%] text-secondary/20 -rotate-8">
              <HexagonShape size={56} />
            </div>
            <div className="absolute bottom-10 right-[18%] text-accent/30 rotate-[20deg]">
              <Star5Shape size={72} />
            </div>
            <div className="absolute top-8 right-[36%] text-foreground/8 rotate-[-15deg]">
              <DiamondBadge size={44} />
            </div>
            <div className="absolute bottom-16 right-[6%] text-warning/25 rotate-6">
              <CloudShape size={96} />
            </div>
            <div className="absolute top-40 right-[4%] text-success/20 -rotate-3">
              <GearShape size={52} />
            </div>
            <div className="absolute bottom-6 right-[30%] text-primary/15 rotate-[30deg]">
              <LightningShape size={48} />
            </div>
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 py-10 md:py-16 lg:py-20">
            {/* Breadcrumb-style label */}
            <div className="flex items-center gap-2 mb-5 md:mb-6">
              <span className="w-6 h-0.5 bg-primary inline-block" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground" style={MONO}>
                BoldKit&nbsp;/&nbsp;Shapes
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="text-[72px] sm:text-[96px] md:text-[128px] lg:text-[160px] leading-[0.85] uppercase font-black mb-6 md:mb-8"
              style={DISPLAY}
            >
              SHAPES
            </h1>

            {/* Stats row — connected blocks */}
            <div className="flex flex-wrap mb-7 md:mb-8">
              <div className="flex items-center gap-2 border-3 border-foreground px-4 py-2.5 bg-primary -mr-[3px]">
                <span className="text-3xl font-black leading-none" style={DISPLAY}>{totalShapes}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest" style={MONO}>shapes</span>
              </div>
              <div className="flex items-center gap-2 border-3 border-foreground px-4 py-2.5 bg-secondary -mr-[3px]">
                <span className="text-3xl font-black leading-none" style={DISPLAY}>{shapeCategories.length}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest" style={MONO}>categories</span>
              </div>
              <div className="flex items-center gap-2 border-3 border-foreground px-4 py-2.5 bg-accent">
                <span className="text-[10px] font-bold uppercase tracking-widest" style={MONO}>6 animations</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground max-w-lg mb-7 md:mb-8 leading-relaxed">
              Bold, geometric SVG shapes with full animation support. Drop them into any project as badges,
              decorations, icons, or visual accents.
            </p>

            {/* Framework toggle + CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <FrameworkToggle />
              <div className="flex flex-wrap gap-3">
                <Button size="lg" onClick={copyInstall} className="gap-2">
                  {copiedInstall ? <Check className="h-4 w-4" /> : <Terminal className="h-4 w-4" />}
                  Install
                </Button>
                <Link to="/shapes/builder">
                  <Button size="lg" variant="secondary" className="gap-2">
                    <Wand2 className="h-4 w-4" />
                    Shape Builder
                  </Button>
                </Link>
                <Link to="/docs">
                  <Button size="lg" variant="outline">
                    Docs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── INSTALL STRIP ────────────────────────────────────────────────── */}
        <section className="border-b-3 border-foreground bg-foreground text-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 py-3 sm:py-4">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 shrink-0" style={MONO}>
                {framework === 'react' ? 'shadcn' : 'shadcn-vue'}
              </span>
              <span className="opacity-30 shrink-0">|</span>
              <code className="flex-1 text-xs sm:text-sm font-mono overflow-x-auto opacity-90">
                {cliCommand}
              </code>
              <button
                onClick={copyInstall}
                className="shrink-0 w-8 h-8 flex items-center justify-center border-2 border-background/40 hover:border-background hover:bg-background hover:text-foreground transition-colors"
                title="Copy command"
              >
                {copiedInstall ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </section>

        {/* ── USAGE / PROPS / CATEGORIES TABS ─────────────────────────────── */}
        <section className="border-b-3 border-foreground py-8 md:py-12 bg-muted">
          <div className="container mx-auto px-4 sm:px-6">
            <Tabs defaultValue="usage" className="max-w-3xl mx-auto">
              <TabsList className="mb-4 md:mb-6 w-full sm:w-auto">
                <TabsTrigger value="usage"   className="flex-1 sm:flex-none">Usage</TabsTrigger>
                <TabsTrigger value="props"   className="flex-1 sm:flex-none">Props</TabsTrigger>
                <TabsTrigger value="categories" className="flex-1 sm:flex-none">Categories</TabsTrigger>
              </TabsList>

              <TabsContent value="usage">
                <pre className="border-3 border-foreground bg-background p-3 md:p-5 text-xs sm:text-sm overflow-x-auto bk-shadow">
                  <code style={MONO}>{framework === 'react'
                    ? `import { BurstShape, HeartShape, LightningShape } from '@/components/ui/shapes'\n\n// Basic usage\n<BurstShape size={100} />\n\n// Custom color via className\n<HeartShape size={80} className="text-destructive" />\n\n// Outline only\n<LightningShape size={60} filled={false} />\n\n// Custom stroke width\n<BurstShape size={100} strokeWidth={5} />`
                    : `<script setup lang="ts">\nimport { BurstShape, HeartShape, LightningShape } from '@/components/ui/shapes'\n</script>\n\n<template>\n  <BurstShape :size="100" />\n  <HeartShape :size="80" class="text-destructive" />\n  <LightningShape :size="60" :filled="false" />\n  <BurstShape :size="100" :stroke-width="5" />\n</template>`
                  }</code>
                </pre>
              </TabsContent>

              <TabsContent value="props">
                <div className="border-3 border-foreground bg-background bk-shadow overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm min-w-[320px]">
                    <thead>
                      <tr className="border-b-3 border-foreground bg-muted">
                        <th className="text-left px-4 py-3 font-black uppercase tracking-wide" style={MONO}>Prop</th>
                        <th className="text-left px-4 py-3 font-black uppercase tracking-wide" style={MONO}>Type</th>
                        <th className="text-left px-4 py-3 font-black uppercase tracking-wide" style={MONO}>Default</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { prop: 'size',      type: 'number',  def: '100' },
                        { prop: framework === 'react' ? 'strokeWidth' : 'stroke-width', type: 'number', def: '3' },
                        { prop: 'filled',    type: 'boolean', def: 'true' },
                        { prop: 'color',     type: 'string',  def: 'currentColor' },
                        { prop: 'animation', type: "'none' | 'spin' | 'pulse' | 'float' | 'wiggle' | 'bounce' | 'glitch'", def: "'none'" },
                        { prop: 'speed',     type: "'slow' | 'normal' | 'fast'", def: "'normal'" },
                        { prop: framework === 'react' ? 'className' : 'class', type: 'string', def: '—' },
                      ].map((row, i, arr) => (
                        <tr key={row.prop} className={i < arr.length - 1 ? 'border-b border-muted' : ''}>
                          <td className="px-4 py-2.5 font-bold" style={MONO}>{row.prop}</td>
                          <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>{row.type}</td>
                          <td className="px-4 py-2.5" style={MONO}>{row.def}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="categories">
                <div className="border-3 border-foreground bg-background p-4 md:p-5 bk-shadow">
                  <p className="text-sm text-muted-foreground mb-4">
                    Import shapes individually or via category namespace objects:
                  </p>
                  <pre className="bg-muted border-2 border-foreground p-3 text-xs sm:text-sm overflow-x-auto">
                    <code style={MONO}>{framework === 'react'
                      ? `import {\n  GeometricShapes,   // Triangle, Diamond, Pentagon…\n  StarShapes,        // Star4, Star5, Burst, Explosion…\n  OrganicShapes,     // Blob, Wave, Cloud, Heart, Apple\n  CelestialShapes,   // Sun, Crescent, Rainbow…\n  BadgeShapes,       // Arrow, Ribbon, Tag, Ticket…\n  CommunicationShapes,\n  DecorativeShapes,\n} from '@/components/ui/shapes'\n\n<GeometricShapes.HexagonShape size={100} />\n<CelestialShapes.SunShape size={100} />`
                      : `<script setup>\nimport {\n  GeometricShapes, StarShapes, OrganicShapes,\n  CelestialShapes, BadgeShapes,\n} from '@/components/ui/shapes'\n</script>`
                    }</code>
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* ── ANIMATION SHOWCASE ───────────────────────────────────────────── */}
        <section className="border-b-3 border-foreground py-10 md:py-14">
          <div className="container mx-auto px-4 sm:px-6">

            {/* Section header */}
            <div className="flex items-end justify-between mb-6 md:mb-8 gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1" style={MONO}>
                  animation prop
                </p>
                <h2
                  className="text-3xl md:text-5xl font-black uppercase leading-none"
                  style={DISPLAY}
                >
                  Animated Shapes
                </h2>
              </div>
              <span className="bg-accent border-3 border-foreground px-2 py-1 text-[10px] font-black uppercase tracking-wide shrink-0" style={MONO}>
                New in v3.0
              </span>
            </div>

            {/* Filmstrip */}
            <div className="overflow-x-auto -mx-4 sm:mx-0 pb-2">
              <div className="flex border-3 border-foreground min-w-[560px] sm:min-w-0 mx-4 sm:mx-0">
                {([
                  { anim: 'spin',   label: 'Spin',   bg: 'bg-primary'     },
                  { anim: 'pulse',  label: 'Pulse',  bg: 'bg-secondary'   },
                  { anim: 'float',  label: 'Float',  bg: 'bg-accent'      },
                  { anim: 'wiggle', label: 'Wiggle', bg: 'bg-success'     },
                  { anim: 'bounce', label: 'Bounce', bg: 'bg-info'        },
                  { anim: 'glitch', label: 'Glitch', bg: 'bg-warning'     },
                ] as const).map(({ anim, label, bg }, i) => (
                  <div
                    key={anim}
                    className={`${bg} flex-1 flex flex-col items-center justify-center gap-3 py-8 px-3 ${i < 5 ? 'border-r-3 border-foreground' : ''}`}
                  >
                    <Star5Shape size={48} animation={anim} />
                    <span
                      className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest leading-none"
                      style={MONO}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code snippet */}
            <div className="mt-5 md:mt-6">
              <pre className="border-3 border-foreground bg-muted p-3 md:p-4 text-xs sm:text-sm overflow-x-auto bk-shadow">
                <code style={MONO}>{framework === 'react'
                  ? `<Star5Shape animation="spin" />\n<BurstShape  animation="pulse" speed="slow" />\n<HeartShape  animation="float" />\n<LightningShape animation="wiggle" speed="fast" />\n<HexagonShape   animation="bounce" />\n<DiamondBadge   animation="glitch" />`
                  : `<Star5Shape animation="spin" />\n<BurstShape  animation="pulse" speed="slow" />\n<HeartShape  animation="float" />\n<LightningShape animation="wiggle" speed="fast" />`
                }</code>
              </pre>
            </div>
          </div>
        </section>

        {/* ── SHAPES GALLERY ───────────────────────────────────────────────── */}
        <section className="py-10 md:py-16 relative">
          <div className="grid-pattern absolute inset-0 opacity-10 pointer-events-none" />
          <div className="container relative mx-auto px-4 sm:px-6">

            {/* Section title */}
            <div className="mb-10 md:mb-14">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1" style={MONO}>
                {totalShapes} shapes — {shapeCategories.length} categories
              </p>
              <h2
                className="text-4xl md:text-6xl font-black uppercase leading-none"
                style={DISPLAY}
              >
                Shape Library
              </h2>
            </div>

            <div className="space-y-16 md:space-y-20">
              {shapeCategories.map((category) => (
                <div key={category.name}>

                  {/* Category header */}
                  <div className={`relative border-3 border-foreground overflow-hidden mb-5 md:mb-6 ${category.bg}`}>
                    {/* Big outlined section number in background */}
                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[80px] md:text-[100px] font-black leading-none text-foreground/6 select-none pointer-events-none"
                      style={DISPLAY}
                      aria-hidden
                    >
                      {category.num}
                    </span>

                    <div className="flex items-stretch">
                      {/* Color accent bar */}
                      <div className={`w-1.5 shrink-0 ${category.accent}`} />

                      {/* Content */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 md:px-6 py-4 md:py-5 flex-1 pr-16 md:pr-24">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5" style={MONO}>
                            {category.num}
                          </p>
                          <h3
                            className="text-2xl md:text-3xl font-black uppercase leading-none tracking-wide"
                            style={DISPLAY}
                          >
                            {category.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1" style={MONO}>
                            {category.description}
                          </p>
                        </div>
                        <div className={`shrink-0 self-start sm:self-center border-3 border-foreground px-3 py-1.5 ${category.accent}`}>
                          <span className="text-[10px] font-black uppercase tracking-widest" style={MONO}>
                            {category.shapes.length} shapes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shape grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                    {category.shapes.map((shape) => (
                      <ShapeCard
                        key={shape.name}
                        name={shape.name}
                        Component={shape.component}
                        code={shape.code}
                        vueCode={shape.vueCode}
                        isNew={'isNew' in shape ? shape.isNew : undefined}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXAMPLE USES ─────────────────────────────────────────────────── */}
        <section className="border-t-3 border-foreground py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 sm:px-6">

            <div className="mb-8 md:mb-12">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1" style={MONO}>
                in the wild
              </p>
              <h2
                className="text-4xl md:text-5xl font-black uppercase leading-none"
                style={DISPLAY}
              >
                Example Uses
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

              {/* Sale Badge */}
              <div className="border-3 border-foreground bg-background bk-shadow">
                <div className="border-b-3 border-foreground p-6 flex items-center justify-center min-h-[160px]">
                  <div className="relative">
                    <BurstShape size={110} className="text-accent hidden sm:block" />
                    <BurstShape size={90} className="text-accent sm:hidden" />
                    <span className="absolute inset-0 flex items-center justify-center text-base sm:text-lg font-black uppercase">
                      New!
                    </span>
                  </div>
                </div>
                <div className="p-4 md:p-5">
                  <p className="text-sm font-black uppercase tracking-wide">Sale Badge</p>
                  <p className="text-xs text-muted-foreground mt-1" style={MONO}>
                    BurstShape · text-accent · size=110
                  </p>
                </div>
              </div>

              {/* Testimonial */}
              <div className="border-3 border-foreground bg-background bk-shadow">
                <div className="border-b-3 border-foreground p-6 flex items-center justify-center min-h-[160px]">
                  <div className="relative">
                    <SpeechBubble size={140} className="text-secondary hidden sm:block" />
                    <SpeechBubble size={110} className="text-secondary sm:hidden" />
                    <p className="absolute inset-0 flex items-center justify-center text-xs font-bold p-5 pt-3 text-center leading-snug">
                      "Bold is beautiful"
                    </p>
                  </div>
                </div>
                <div className="p-4 md:p-5">
                  <p className="text-sm font-black uppercase tracking-wide">Testimonial</p>
                  <p className="text-xs text-muted-foreground mt-1" style={MONO}>
                    SpeechBubble · text-secondary · size=140
                  </p>
                </div>
              </div>

              {/* Decorative Icons */}
              <div className="border-3 border-foreground bg-background bk-shadow sm:col-span-2 md:col-span-1">
                <div className="border-b-3 border-foreground p-6 flex items-center justify-center min-h-[160px]">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex flex-col items-center gap-1.5">
                      <HeartShape size={44} className="text-destructive" />
                      <span className="text-[9px] font-bold uppercase" style={MONO}>love</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <LightningShape size={44} className="text-warning" />
                      <span className="text-[9px] font-bold uppercase" style={MONO}>fast</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <Star5Shape size={44} className="text-accent" />
                      <span className="text-[9px] font-bold uppercase" style={MONO}>best</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 md:p-5">
                  <p className="text-sm font-black uppercase tracking-wide">Feature Icons</p>
                  <p className="text-xs text-muted-foreground mt-1" style={MONO}>
                    Mix shapes as icon replacements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPLORE MORE ─────────────────────────────────────────────────── */}
        <section className="border-t-3 border-foreground py-8 md:py-10 bg-primary/10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5" style={MONO}>
                  what's next
                </p>
                <h2
                  className="text-2xl md:text-3xl font-black uppercase leading-none"
                  style={DISPLAY}
                >
                  Explore More
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/components">
                  <Button variant="outline" className="gap-2">
                    Browse Components <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link to="/shapes/builder">
                  <Button variant="secondary" className="gap-2">
                    <Wand2 className="h-3.5 w-3.5" /> Shape Builder
                  </Button>
                </Link>
                <Link to="/templates">
                  <Button variant="outline" className="gap-2">
                    Templates <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </Layout>
    </>
  )
}
