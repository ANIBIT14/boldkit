import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LayeredCard, LayeredCardContent, LayeredCardHeader, LayeredCardTitle } from '@/components/ui/layered-card'
import { Sticker, Stamp } from '@/components/ui/sticker'
import { StatCard } from '@/components/ui/stat-card'
import { Spinner } from '@/components/ui/spinner'
import { MathCurveLoader } from '@/components/ui/math-curve-loader'
import { Layout } from '@/components/layout'
import {
  Copy, Check, ArrowRight, Zap, Palette, Code2, Smartphone,
  Github, Layers, TrendingUp, DollarSign, LayoutGrid, Sparkles,
  Settings, LogIn, FileX, Package, BarChart3, Wand2,
} from 'lucide-react'
import { useState } from 'react'
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

const DISPLAY: React.CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" }
const MONO: React.CSSProperties    = { fontFamily: "'DM Mono', monospace" }

const MARQUEE_ITEMS = [
  `${COUNTS.components}+ Components`, 'React', 'Vue 3', 'Nuxt', `${COUNTS.charts} Charts`,
  `${COUNTS.shapes} Shapes`, `${COUNTS.blocks} Blocks`, 'TypeScript', 'Accessible',
  'Open Source', 'Free', 'Neubrutalism',
]

const MARQUEE_SEP_COLORS = ['text-primary', 'text-secondary', 'text-accent', 'text-success', 'text-info']
const WHATS_NEW_DOT_COLORS = ['bg-primary', 'bg-info', 'bg-secondary', 'bg-accent', 'bg-success', 'bg-warning', 'bg-primary', 'bg-info', 'bg-secondary', 'bg-accent']

export function Home() {
  const [copied, setCopied] = useState(false)
  const { framework, setFramework } = useFramework()

  const componentsCount = useCountUp({ end: COUNTS.components, duration: 1200 })
  const chartsCount     = useCountUp({ end: COUNTS.charts, duration: 900 })
  const shapesCount     = useCountUp({ end: COUNTS.shapes, duration: 1100 })
  const blocksCount     = useCountUp({ end: COUNTS.blocks, duration: 800 })

  const showcaseReveal    = useScrollReveal()
  const featuresReveal    = useScrollReveal()
  const shapeBuilderReveal = useScrollReveal()
  const blocksReveal      = useScrollReveal()
  const ctaReveal         = useScrollReveal()
  const whatsNewReveal    = useScrollReveal()

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

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b-3 border-foreground">
          <div className="grid-pattern absolute inset-0 opacity-25" />

          <div className="container relative mx-auto px-4 py-16 md:py-20 lg:py-24">
            <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_500px] gap-8 lg:gap-12 items-center">

              {/* ── Left: Text Content ── */}
              <div className="relative z-10 min-w-0">

                {/* Framework pills */}
                <div className="mb-6 flex flex-wrap gap-2 animate-stagger-fade-in stagger-1">
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
                </div>

                {/* Giant display text */}
                <div className="mb-6 select-none">
                  <div
                    className="leading-none text-primary animate-stagger-fade-in stagger-2"
                    style={{ ...DISPLAY, fontSize: 'clamp(56px, 14vw, 180px)', lineHeight: 0.88 }}
                  >
                    BOLD
                  </div>
                  <div
                    className="leading-none bk-text-outline-thick animate-stagger-fade-in stagger-3"
                    style={{ ...DISPLAY, fontSize: 'clamp(56px, 14vw, 180px)', lineHeight: 0.88 }}
                  >
                    KIT
                  </div>
                </div>

                {/* Divider + label */}
                <div className="mb-5 flex items-center gap-3 animate-stagger-fade-in stagger-4">
                  <div className="h-[3px] w-10 bg-foreground" />
                  <span
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                    style={MONO}
                  >
                    Neubrutalism UI Library
                  </span>
                </div>

                <p className="mb-8 max-w-md text-lg leading-relaxed text-foreground/70 border-l-4 border-primary pl-4 animate-stagger-fade-in stagger-5">
                  High-contrast colors, thick borders, and hard shadows that make your UI impossible to ignore.
                </p>

                {/* CTAs */}
                <div className="mb-8 flex flex-col sm:flex-row gap-3 animate-stagger-fade-in stagger-6">
                  <Link to="/docs" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto gap-2">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/components" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">Browse Components</Button>
                  </Link>
                </div>

                {/* Framework toggle + CLI */}
                <div className="w-full space-y-2 animate-stagger-fade-in stagger-7">
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

              {/* ── Right: Component Collage ── */}
              <div className="relative hidden lg:block h-[540px]">

                {/* Card: Buttons — top-left, tilted */}
                <div className="absolute top-0 left-0 z-30 animate-stagger-fade-in" style={{ animationDelay: '300ms' }}>
                  <div
                    className="w-64 border-3 border-foreground bg-background p-4 bk-shadow-lg"
                    style={{ animation: 'card-float-1 3.2s ease-in-out infinite', animationDelay: '0s' }}
                  >
                    <div className="mb-3 border-b-2 border-foreground pb-1.5 text-[10px] font-black uppercase tracking-widest" style={MONO}>Buttons</div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm">Primary</Button>
                      <Button size="sm" variant="secondary">Secondary</Button>
                      <Button size="sm" variant="accent">Accent</Button>
                      <Button size="sm" variant="outline">Outline</Button>
                    </div>
                  </div>
                </div>

                {/* Card: Badges — top-right, slight tilt */}
                <div className="absolute top-8 right-0 z-20 animate-stagger-fade-in" style={{ animationDelay: '400ms' }}>
                  <div
                    className="w-56 border-3 border-foreground bg-background p-4 bk-shadow"
                    style={{ animation: 'card-float-2 2.8s ease-in-out infinite', animationDelay: '0.4s' }}
                  >
                    <div className="mb-3 border-b-2 border-foreground pb-1.5 text-[10px] font-black uppercase tracking-widest" style={MONO}>Badges</div>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Teal</Badge>
                      <Badge variant="accent">Yellow</Badge>
                      <Badge variant="success">Success</Badge>
                      <Badge variant="warning">Warning</Badge>
                      <Badge variant="info">Info</Badge>
                    </div>
                  </div>
                </div>

                {/* Card: Stat Cards — center, slight tilt */}
                <div className="absolute top-[170px] left-4 z-40 animate-stagger-fade-in" style={{ animationDelay: '500ms' }}>
                  <div
                    className="w-72 border-3 border-foreground bg-background p-4 bk-shadow-lg"
                    style={{ animation: 'card-float-3 3.6s ease-in-out infinite', animationDelay: '0.8s' }}
                  >
                    <div className="mb-3 border-b-2 border-foreground pb-1.5 text-[10px] font-black uppercase tracking-widest" style={MONO}>Stat Cards</div>
                    <div className="grid grid-cols-2 gap-3">
                      <StatCard
                        title="Revenue"
                        value="$45K"
                        change="+20%"
                        trend="up"
                        icon={<DollarSign className="h-4 w-4" />}
                        color="success"
                      />
                      <StatCard
                        title="Growth"
                        value="12.5%"
                        change="+4%"
                        trend="up"
                        icon={<TrendingUp className="h-4 w-4" />}
                        color="primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Card: Spinners — bottom-right, tilted */}
                <div className="absolute bottom-0 right-0 z-30 animate-stagger-fade-in" style={{ animationDelay: '600ms' }}>
                  <div
                    className="w-52 border-3 border-foreground bg-accent p-4 bk-shadow"
                    style={{ animation: 'card-float-4 3s ease-in-out infinite', animationDelay: '0.2s' }}
                  >
                    <div className="mb-3 border-b-2 border-foreground pb-1.5 text-[10px] font-black uppercase tracking-widest" style={MONO}>Spinners</div>
                    <div className="flex items-center gap-4">
                      <Spinner variant="brutal" />
                      <Spinner variant="dots" />
                      <Spinner variant="bars" />
                      <Spinner variant="blocks" />
                    </div>
                  </div>
                </div>

                {/* Card: Stickers — bottom-left, big tilt */}
                <div className="absolute bottom-12 left-0 z-20 animate-stagger-fade-in" style={{ animationDelay: '700ms' }}>
                  <div
                    className="w-48 border-3 border-foreground bg-primary p-4 bk-shadow"
                    style={{ animation: 'card-float-5 2.6s ease-in-out infinite', animationDelay: '0.6s' }}
                  >
                    <div className="mb-3 border-b-2 border-foreground pb-1.5 text-[10px] font-black uppercase tracking-widest" style={MONO}>Stickers</div>
                    <div className="flex items-center gap-3">
                      <Sticker>New</Sticker>
                      <Sticker variant="secondary" rotation="medium-right">Hot</Sticker>
                      <Stamp size="sm">OK</Stamp>
                    </div>
                  </div>
                </div>

                {/* Center decorative block */}
                <div
                  className="absolute left-1/2 top-1/2 z-10 animate-stagger-fade-in"
                  style={{ animationDelay: '800ms' }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center border-3 border-foreground bg-secondary bk-shadow"
                    style={{ transform: 'translate(-50%, -50%) rotate(45deg)' }}
                  >
                    <span
                      className="font-black text-xs"
                      style={{ ...DISPLAY, transform: 'rotate(-45deg)', display: 'block' }}
                    >
                      UI
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Mobile Component Showcase (< lg only) ── */}
            <div className="block lg:hidden pt-8 pb-2 animate-stagger-fade-in stagger-8">
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-none">

                {/* Buttons */}
                <div className="snap-start shrink-0 w-56 border-3 border-foreground bg-background p-4 bk-shadow" style={{ transform: 'rotate(-1.5deg)' }}>
                  <div className="mb-3 border-b-2 border-foreground pb-1.5 text-[10px] font-black uppercase tracking-widest" style={MONO}>Buttons</div>
                  <div className="flex flex-wrap gap-1.5">
                    <Button size="sm">Primary</Button>
                    <Button size="sm" variant="secondary">Secondary</Button>
                    <Button size="sm" variant="accent">Accent</Button>
                    <Button size="sm" variant="outline">Outline</Button>
                  </div>
                </div>

                {/* Badges */}
                <div className="snap-start shrink-0 w-52 border-3 border-foreground bg-background p-4 bk-shadow" style={{ transform: 'rotate(1.5deg)' }}>
                  <div className="mb-3 border-b-2 border-foreground pb-1.5 text-[10px] font-black uppercase tracking-widest" style={MONO}>Badges</div>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Teal</Badge>
                    <Badge variant="accent">Yellow</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="info">Info</Badge>
                  </div>
                </div>

                {/* Spinners */}
                <div className="snap-start shrink-0 w-48 border-3 border-foreground bg-accent p-4 bk-shadow" style={{ transform: 'rotate(-1deg)' }}>
                  <div className="mb-3 border-b-2 border-foreground pb-1.5 text-[10px] font-black uppercase tracking-widest" style={MONO}>Spinners</div>
                  <div className="flex items-center gap-4 py-1">
                    <Spinner variant="brutal" />
                    <Spinner variant="dots" />
                    <Spinner variant="bars" />
                    <Spinner variant="blocks" />
                  </div>
                </div>

                {/* Stickers */}
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

        {/* ── MARQUEE STRIP ──────────────────────────────────────────── */}
        <section className="overflow-hidden border-b-3 border-foreground bg-foreground py-3 text-background">
          {/* Gradient fade on left and right edges */}
          <div className="relative marquee-fade-edges">
            <div className="animate-bk-marquee gap-0">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => {
                const sepColor = MARQUEE_SEP_COLORS[i % MARQUEE_SEP_COLORS.length]
                return (
                  <span key={i} className="flex items-center">
                    <span
                      className="px-6 text-sm font-black uppercase tracking-widest"
                      style={MONO}
                    >
                      {item}
                    </span>
                    <span className={`${sepColor} text-lg font-black`}>✦</span>
                  </span>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── STATS BAR ─────────────────────────────────────────────── */}
        <section className="border-b-3 border-foreground">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              {
                count: componentsCount.count,
                suffix: '+',
                ref: componentsCount.ref,
                label: 'Components',
                bg: 'bg-primary',
                icon: <Package className="h-5 w-5" />,
                borders: 'border-r-3 border-b-3 md:border-b-0 border-foreground',
              },
              {
                count: chartsCount.count,
                suffix: '',
                ref: chartsCount.ref,
                label: 'Chart Types',
                bg: 'bg-info',
                icon: <BarChart3 className="h-5 w-5" />,
                borders: 'border-b-3 md:border-b-0 md:border-r-3 border-foreground',
              },
              {
                count: shapesCount.count,
                suffix: '',
                ref: shapesCount.ref,
                label: 'SVG Shapes',
                bg: 'bg-accent',
                icon: <Sparkles className="h-5 w-5" />,
                borders: 'border-r-3 md:border-r-3 border-foreground',
              },
              {
                count: blocksCount.count,
                suffix: '',
                ref: blocksCount.ref,
                label: 'Blocks',
                bg: 'bg-secondary',
                icon: <LayoutGrid className="h-5 w-5" />,
                borders: '',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                ref={stat.ref}
                className={`${stat.bg} ${stat.borders} p-6 md:p-10 flex flex-col gap-1`}
              >
                <div className="mb-1 flex items-center gap-2">
                  {stat.icon}
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={MONO}>{stat.label}</span>
                </div>
                <div
                  className="font-black leading-none"
                  style={{ ...DISPLAY, fontSize: 'clamp(40px, 7vw, 96px)' }}
                >
                  {stat.count}{stat.suffix}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHAT'S NEW ────────────────────────────────────────────── */}
        <section
          ref={whatsNewReveal.ref}
          className={`border-b-3 border-foreground py-10 md:py-14 transition-all duration-700 ease-out ${whatsNewReveal.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="container mx-auto px-4">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-[3px] w-6 bg-primary" />
                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground" style={MONO}>Recently Added</span>
              </div>
              <Link to="/components" className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1" style={MONO}>
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none snap-x snap-mandatory">
              {[
                { label: 'ASCII Shapes',     href: '/ascii-shapes' },
                { label: 'Carousel',         href: '/components/carousel' },
                { label: 'Data Table',       href: '/components/data-table' },
                { label: 'Sidebar',          href: '/components/sidebar' },
                { label: 'Timeline',         href: '/components/timeline' },
                { label: 'Tree View',        href: '/components/tree-view' },
                { label: 'Tour',             href: '/components/tour' },
                { label: 'Tag Input',        href: '/components/tag-input' },
                { label: 'Rating',           href: '/components/rating' },
                { label: 'MC Loader',        href: '/components/math-curve-loader' },
                { label: 'Date Range Picker', href: '/components/date-range-picker' },
              ].map((item, i) => {
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="snap-start shrink-0 group"
                  >
                    <div className="flex items-center gap-2 border-3 border-foreground bg-background px-3 py-2 bk-shadow hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_hsl(var(--foreground))] transition-all duration-150">
                      <div className={`h-2 w-2 shrink-0 ${WHATS_NEW_DOT_COLORS[i]}`} />
                      <span className="text-xs font-bold whitespace-nowrap">{item.label}</span>
                      <Badge variant="secondary" className="text-[8px] px-1 py-0 h-3.5 shrink-0">New</Badge>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── COMPONENT SHOWCASE ────────────────────────────────────── */}
        <section
          ref={showcaseReveal.ref}
          className={`border-b-3 border-foreground py-14 md:py-20 overflow-x-hidden transition-all duration-700 ease-out ${showcaseReveal.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="container mx-auto px-4">

            <div className="mb-8 md:mb-12 flex items-end justify-between">
              <div>
                <Badge variant="outline" className="mb-3">Live Preview</Badge>
                <h2
                  className="leading-none"
                  style={{ ...DISPLAY, fontSize: 'clamp(32px, 5.5vw, 76px)' }}
                >
                  {COUNTS.components}+ COMPONENTS
                </h2>
              </div>
              <Link to="/components" className="hidden md:block">
                <Button variant="outline" className="gap-2">View All <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {/* Buttons — spans 2 cols */}
              <Card className="md:col-span-2 lg:col-span-2">
                <CardHeader className="border-b-3 border-foreground bg-primary">
                  <CardTitle style={MONO}>Buttons</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
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

              {/* Badges */}
              <Card>
                <CardHeader className="border-b-3 border-foreground bg-primary">
                  <CardTitle style={MONO}>Badges</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
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

              {/* Inputs */}
              <Card>
                <CardHeader className="border-b-3 border-foreground bg-info">
                  <CardTitle style={MONO}>Inputs</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <Input placeholder="Enter your email..." />
                  <div className="flex items-center gap-2">
                    <Checkbox id="terms-demo" />
                    <label htmlFor="terms-demo" className="text-sm font-medium">Accept terms</label>
                  </div>
                </CardContent>
              </Card>

              {/* Spinners */}
              <Card>
                <CardHeader className="border-b-3 border-foreground bg-accent">
                  <CardTitle className="flex items-center gap-2" style={MONO}>
                    Spinners <Badge variant="secondary" className="text-[10px]">New</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
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

              {/* Progress & Tabs */}
              <Card>
                <CardHeader className="border-b-3 border-foreground bg-secondary">
                  <CardTitle style={MONO}>Progress & Tabs</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <Progress value={66} />
                  <Tabs defaultValue="t1">
                    <TabsList>
                      <TabsTrigger value="t1">Overview</TabsTrigger>
                      <TabsTrigger value="t2">Features</TabsTrigger>
                      <TabsTrigger value="t3">Code</TabsTrigger>
                    </TabsList>
                    <TabsContent value="t1" className="mt-2 text-sm">Overview content here.</TabsContent>
                    <TabsContent value="t2" className="mt-2 text-sm">Features content here.</TabsContent>
                    <TabsContent value="t3" className="mt-2 text-sm">Code content here.</TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Stat Cards — spans 2 cols */}
              <Card className="md:col-span-2 lg:col-span-2">
                <CardHeader className="border-b-3 border-foreground bg-success">
                  <CardTitle className="flex items-center gap-2" style={MONO}>
                    Stat Cards <Badge variant="accent" className="text-[10px]">New</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <StatCard title="Revenue" value="$45,231" change="+20.1%" trend="up" icon={<DollarSign className="h-5 w-5" />} color="success" />
                    <StatCard title="Growth"  value="12.5%"   change="+4.3%"  trend="up" icon={<TrendingUp className="h-5 w-5"  />} color="primary" />
                  </div>
                </CardContent>
              </Card>

              {/* Layered Cards */}
              <Card>
                <CardHeader className="border-b-3 border-foreground bg-secondary">
                  <CardTitle style={MONO}>Layered Cards</CardTitle>
                </CardHeader>
                <CardContent className="pb-6 pr-6 sm:pb-10 sm:pr-10 pt-6">
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

              {/* Stickers — full width */}
              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader className="border-b-3 border-foreground bg-warning">
                  <CardTitle style={MONO}>Stickers & Stamps</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
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

            <div className="mt-8 text-center md:hidden">
              <Link to="/components">
                <Button size="lg" variant="outline" className="gap-2 w-full">
                  View All Components <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FEATURES ──────────────────────────────────────────────── */}
        <section
          ref={featuresReveal.ref}
          className={`border-b-3 border-foreground py-14 md:py-20 transition-all duration-700 ease-out ${featuresReveal.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="container mx-auto px-4">

            <div className="mb-8 md:mb-12">
              <Badge variant="outline" className="mb-3">Why BoldKit</Badge>
              <h2
                className="leading-none"
                style={{ ...DISPLAY, fontSize: 'clamp(32px, 5.5vw, 76px)' }}
              >
                BUILT DIFFERENT
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {/* Multi-Framework — tall, spans rows via flex */}
              <Card interactive className="flex flex-col lg:row-span-2">
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
                  <p className="text-muted-foreground">
                    Same design system, same components, your choice of framework. Build with what you love.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="gap-1"><ReactIcon className="h-3 w-3" /> React</Badge>
                    <Badge variant="outline" className="gap-1"><VueIcon className="h-3 w-3" /> Vue</Badge>
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

              <Card interactive>
                <CardHeader className="border-b-3 border-foreground bg-primary">
                  <Zap className="h-8 w-8 stroke-[3]" />
                  <CardTitle>Fast Setup</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <p className="text-muted-foreground">One command to install. Copy-paste into your project and go.</p>
                  <div className="space-y-1.5">
                    {[
                      { step: '1', label: 'Install via CLI', done: true },
                      { step: '2', label: 'Import component', done: true },
                      { step: '3', label: 'Ship it', done: true },
                    ].map(({ step, label }) => (
                      <div key={step} className="flex items-center gap-2 border-2 border-foreground bg-muted px-2.5 py-1.5">
                        <div className="h-4 w-4 border-2 border-foreground bg-primary flex items-center justify-center shrink-0">
                          <Check className="h-2.5 w-2.5" />
                        </div>
                        <span className="text-xs font-mono font-medium">{label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card interactive>
                <CardHeader className="border-b-3 border-foreground bg-secondary">
                  <Palette className="h-8 w-8 stroke-[3]" />
                  <CardTitle>Themeable</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <p className="text-muted-foreground">Customize everything with CSS variables. Dark mode out of the box.</p>
                  <div className="flex gap-2">
                    {['bg-primary','bg-secondary','bg-accent','bg-success','bg-info'].map(c => (
                      <div key={c} className={`h-6 w-6 border-2 border-foreground ${c}`} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card interactive>
                <CardHeader className="border-b-3 border-foreground bg-accent">
                  <Code2 className="h-8 w-8 stroke-[3]" />
                  <CardTitle>TypeScript</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <p className="text-muted-foreground">Complete type definitions for all components.</p>
                  <code className="block border-2 border-foreground bg-muted p-2 text-xs font-mono">
                    {'<Button variant="primary" />'}
                  </code>
                </CardContent>
              </Card>

              <Card interactive className="md:col-span-2 lg:col-span-1">
                <CardHeader className="border-b-3 border-foreground bg-warning">
                  <Smartphone className="h-8 w-8 stroke-[3]" />
                  <CardTitle>Accessible & Mobile</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <p className="text-muted-foreground">
                    Built on Radix UI & Reka UI. Keyboard navigation and screen reader support included.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {['aria-label', 'role="button"', 'tabIndex', 'aria-expanded', 'focus-visible'].map(attr => (
                      <code key={attr} className="text-[10px] font-mono border-2 border-foreground bg-muted px-1.5 py-0.5">{attr}</code>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>

        {/* ── SHAPE BUILDER ─────────────────────────────────────────── */}
        <section
          ref={shapeBuilderReveal.ref}
          className={`relative overflow-hidden border-b-3 border-foreground bg-foreground transition-all duration-700 ease-out ${shapeBuilderReveal.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* Dot grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--background)) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          />

          <div className="container relative mx-auto px-4 py-14 md:py-20">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Left: Copy */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-[3px] w-8 bg-primary" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary" style={MONO}>v3.0 Tool</span>
                </div>
                <h2
                  className="leading-none text-background mb-5"
                  style={{ ...DISPLAY, fontSize: 'clamp(48px, 8vw, 112px)', lineHeight: 0.9 }}
                >
                  SHAPE<br />
                  <span className="text-primary">BUILDER</span>
                </h2>
                <p className="text-background/60 text-base leading-relaxed mb-8 max-w-sm border-l-2 border-primary/40 pl-4" style={MONO}>
                  Pick any of the 42 neubrutalism shapes. Dial in size, color, fill, stroke, animation, and speed. Copy the generated code — React or Vue.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['42 Shapes', '7 Animations', 'React & Vue', 'Copy Code'].map(f => (
                    <span
                      key={f}
                      className="border-2 border-background/20 text-background/70 text-[11px] font-bold uppercase tracking-wide px-3 py-1"
                      style={MONO}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <Link to="/shapes/builder">
                  <Button size="lg" variant="accent" className="gap-2 group">
                    <Wand2 className="h-4 w-4 transition-transform group-hover:rotate-12" />
                    Open Shape Builder
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Right: Live animated shape grid */}
              <div className="grid grid-cols-3 gap-3">
                {([
                  { Component: GearShape,      anim: 'spin',    label: 'Spin',    bg: 'bg-primary',   color: 'hsl(var(--primary-foreground))' },
                  { Component: Star5Shape,     anim: 'pulse',   label: 'Pulse',   bg: 'bg-secondary', color: 'hsl(var(--secondary-foreground))' },
                  { Component: BlobShape,      anim: 'float',   label: 'Float',   bg: 'bg-accent',    color: 'hsl(var(--accent-foreground))' },
                  { Component: LightningShape, anim: 'wiggle',  label: 'Wiggle',  bg: 'bg-warning',   color: 'hsl(var(--warning-foreground))' },
                  { Component: BurstShape,     anim: 'bounce',  label: 'Bounce',  bg: 'bg-info',      color: 'hsl(var(--info-foreground))' },
                  { Component: HexagonShape,   anim: 'glitch',  label: 'Glitch',  bg: 'bg-success',   color: 'hsl(var(--success-foreground))' },
                ] as const).map(({ Component, anim, label, bg, color }) => (
                  <Link key={anim} to="/shapes/builder">
                    <div className="group border-3 border-background/20 hover:border-background/60 transition-all hover:shadow-[4px_4px_0px_hsl(var(--primary))] hover:-translate-x-1 hover:-translate-y-1 overflow-hidden">
                      <div className={`${bg} flex items-center justify-center py-5`}>
                        <Component size={52} color={color} animation={anim} speed="normal" />
                      </div>
                      <div className="bg-background/5 border-t-2 border-background/20 px-2 py-1.5 text-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-background/60" style={MONO}>{label}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── BLOCKS SECTION ────────────────────────────────────────── */}
        <section
          ref={blocksReveal.ref}
          className={`relative overflow-hidden border-b-3 border-foreground bg-accent py-14 md:py-20 transition-all duration-700 ease-out ${blocksReveal.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="grid-pattern absolute inset-0 opacity-20" />
          <div className="container relative mx-auto px-4">

            <div className="mb-4 flex items-end justify-between">
              <div>
                <Badge variant="secondary" className="mb-3 gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> New in v2.6.0
                </Badge>
                <h2
                  className="leading-none"
                  style={{ ...DISPLAY, fontSize: 'clamp(32px, 5.5vw, 76px)' }}
                >
                  <span className="block">SECTION</span>
                  <span className="block">BLOCKS</span>
                </h2>
              </div>
              <Link to="/blocks" className="hidden md:block">
                <Button className="gap-2">Explore All Blocks <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </div>

            <p className="mb-10 max-w-xl text-base leading-relaxed" style={MONO}>
              15 pre-built sections for landing pages & web apps. Copy, paste, ship.
            </p>

            <div className="grid max-w-3xl gap-6 md:grid-cols-2">

              <Card className="bg-background">
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
                  <div className="flex flex-wrap gap-2">
                    {['Hero','Features','Testimonials','CTA','Stats','Team','FAQ','Footer','Contact','Logo Cloud'].map(b => (
                      <Badge key={b} variant="outline">{b}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background">
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
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="gap-1"><LogIn className="h-3 w-3" /> Auth</Badge>
                    <Badge variant="outline" className="gap-1"><Settings className="h-3 w-3" /> Settings</Badge>
                    <Badge variant="outline" className="gap-1"><Sparkles className="h-3 w-3" /> Onboarding</Badge>
                    <Badge variant="outline" className="gap-1"><FileX className="h-3 w-3" /> Error Pages</Badge>
                    <Badge variant="outline">Invoice</Badge>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Block preview strip — wireframe thumbnails */}
            <div className="mt-8 grid max-w-2xl grid-cols-3 sm:grid-cols-5 gap-3">

              {/* Hero */}
              <div className="border-3 border-foreground bg-background overflow-hidden">
                <div className="h-[100px] flex flex-col items-center justify-center p-3 text-center">
                  <div className="w-10 h-1.5 bg-primary/60 mb-2" />
                  <div className="w-20 h-3 bg-foreground mb-1.5" />
                  <div className="w-14 h-1.5 bg-muted-foreground/40 mb-3" />
                  <div className="flex gap-1.5">
                    <div className="w-10 h-4 bg-primary border border-foreground" />
                    <div className="w-10 h-4 bg-muted border border-foreground" />
                  </div>
                </div>
                <div className="border-t-2 border-foreground px-2 py-1 bg-muted/40">
                  <span className="text-[9px] font-black uppercase" style={MONO}>Hero</span>
                </div>
              </div>

              {/* Features */}
              <div className="border-3 border-foreground bg-background overflow-hidden">
                <div className="h-[100px] p-2">
                  <div className="grid grid-cols-3 gap-1 h-full">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex flex-col items-center p-1 border border-foreground bg-card">
                        <div className="w-4 h-4 bg-primary/20 border border-foreground mb-1" />
                        <div className="w-full h-1 bg-foreground mb-0.5" />
                        <div className="w-2/3 h-0.5 bg-muted-foreground/40" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t-2 border-foreground px-2 py-1 bg-muted/40">
                  <span className="text-[9px] font-black uppercase" style={MONO}>Features</span>
                </div>
              </div>

              {/* Stats */}
              <div className="border-3 border-foreground bg-background overflow-hidden">
                <div className="h-[100px] grid grid-cols-2 gap-0">
                  {['bg-primary', 'bg-secondary', 'bg-accent', 'bg-success'].map((bg, i) => (
                    <div key={i} className={`${bg} flex flex-col items-center justify-center ${i % 2 === 0 ? 'border-r border-foreground/50' : ''} ${i < 2 ? 'border-b border-foreground/50' : ''}`}>
                      <div className="text-xs font-black leading-none">99</div>
                      <div className="w-6 h-0.5 bg-foreground/40 mt-1" />
                    </div>
                  ))}
                </div>
                <div className="border-t-2 border-foreground px-2 py-1 bg-muted/40">
                  <span className="text-[9px] font-black uppercase" style={MONO}>Stats</span>
                </div>
              </div>

              {/* Auth */}
              <div className="border-3 border-foreground bg-background overflow-hidden">
                <div className="h-[100px] flex flex-col items-center justify-center p-3">
                  <div className="w-16 h-2 bg-foreground mb-2" />
                  <div className="w-full max-w-[72px] space-y-1.5">
                    <div className="h-4 bg-muted border border-foreground" />
                    <div className="h-4 bg-muted border border-foreground" />
                    <div className="h-4 bg-primary border border-foreground" />
                  </div>
                </div>
                <div className="border-t-2 border-foreground px-2 py-1 bg-muted/40">
                  <span className="text-[9px] font-black uppercase" style={MONO}>Auth</span>
                </div>
              </div>

              {/* Settings */}
              <div className="border-3 border-foreground bg-background overflow-hidden">
                <div className="h-[100px] flex gap-1.5 p-2">
                  <div className="w-1/4 space-y-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`h-3 ${i === 1 ? 'bg-primary/30' : 'bg-muted'} border border-foreground`} />
                    ))}
                  </div>
                  <div className="flex-1 border border-foreground p-1">
                    <div className="w-10 h-1.5 bg-foreground mb-1.5" />
                    <div className="space-y-1">
                      <div className="h-3 bg-muted border border-foreground/50" />
                      <div className="h-3 bg-muted border border-foreground/50" />
                    </div>
                  </div>
                </div>
                <div className="border-t-2 border-foreground px-2 py-1 bg-muted/40">
                  <span className="text-[9px] font-black uppercase" style={MONO}>Settings</span>
                </div>
              </div>

            </div>

            <div className="mt-8 md:hidden">
              <Link to="/blocks">
                <Button size="lg" className="w-full gap-2">Explore All Blocks <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── MATH CURVES SECTION ───────────────────────────────────── */}
        <section className="relative overflow-hidden border-b-3 border-foreground py-14 md:py-20" style={{ background: '#0a0f1a' }}>
          {/* Teal dot-grid overlay — visually distinct from the primary grid in Shape Builder */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(circle, hsl(var(--secondary)) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="container relative mx-auto px-4">
            {/* Header */}
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 border-2 border-primary px-3 py-1">
                  <span className="h-2 w-2 bg-primary animate-pulse" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary" style={MONO}>New Component</span>
                </div>
                <h2
                  className="leading-none text-white"
                  style={{ ...DISPLAY, fontSize: 'clamp(32px, 5.5vw, 76px)' }}
                >
                  <span className="block">MATH CURVE</span>
                  <span className="block text-primary">LOADERS</span>
                </h2>
                <p className="mt-3 max-w-md text-sm text-white/60" style={MONO}>
                  Parametric curve animations — 15 shapes including rose, lissajous, butterfly, astroid, triskelion & more. A loader, progress indicator, and background component.
                </p>
              </div>
              <div className="hidden sm:flex flex-col gap-2">
                {[
                  { label: 'Loader', sub: '15 curves', to: '/components/math-curve-loader', color: 'bg-primary' },
                  { label: 'Progress', sub: '9 curves', to: '/components/math-curve-progress', color: 'bg-secondary' },
                  { label: 'Background', sub: '7 curves', to: '/components/math-curve-background', color: 'bg-accent' },
                ].map(({ label, sub, to, color }) => (
                  <Link key={to} to={to}>
                    <div className="group flex items-center gap-3 border-2 border-white/20 px-4 py-2.5 hover:border-white/60 hover:bg-white/5 transition-all duration-150">
                      <div className={`h-2 w-2 shrink-0 ${color}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-black uppercase tracking-wider text-white leading-none">{label}</div>
                        <div className="text-[10px] text-white/40 mt-0.5" style={MONO}>{sub}</div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-white/30 group-hover:text-white/80 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Curve grid — 15 animated loaders */}
            <div className="grid grid-cols-3 gap-0 sm:grid-cols-5 border-3 border-white/20 w-full max-w-4xl">
              {(['rose', 'lissajous', 'butterfly', 'hypotrochoid', 'cardioid', 'lemniscate', 'fourier', 'rose3', 'astroid', 'deltoid', 'nephroid', 'epicycloid', 'superellipse', 'triskelion', 'involute'] as const).map((curve, i) => (
                <div
                  key={curve}
                  className="flex flex-col items-center justify-center gap-3 border border-white/10 py-6 px-2 hover:bg-white/5 transition-colors"
                >
                  <MathCurveLoader
                    curve={curve}
                    size="lg"
                    speed="normal"
                    className="text-white"
                    headColor={i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(var(--secondary))' : 'hsl(var(--accent))'}
                  />
                  <span
                    className="text-[9px] font-black uppercase tracking-widest text-white/40"
                    style={MONO}
                  >
                    {curve}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile component links */}
            <div className="mt-6 flex gap-3 sm:hidden">
              {[
                { label: 'Loader', to: '/components/math-curve-loader', color: 'bg-primary' },
                { label: 'Progress', to: '/components/math-curve-progress', color: 'bg-secondary' },
                { label: 'Background', to: '/components/math-curve-background', color: 'bg-accent' },
              ].map(({ label, to, color }) => (
                <Link key={to} to={to} className="flex-1">
                  <div className="flex items-center justify-center gap-2 border-2 border-white/20 py-2 text-xs font-black uppercase text-white hover:border-white/50 transition-colors">
                    <div className={`h-1.5 w-1.5 ${color}`} />
                    {label}
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom pill badges */}
            <div className="mt-8 flex flex-wrap gap-2">
              {['Rose', 'Lissajous', 'Butterfly', 'Hypotrochoid', 'Cardioid', 'Lemniscate', 'Fourier', 'Spiral', 'Heart', 'Astroid', 'Deltoid', 'Nephroid', 'Epicycloid', 'Superellipse', 'Triskelion', 'Involute'].map(name => (
                <span
                  key={name}
                  className="border border-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white/50"
                  style={MONO}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── ASCII SHAPES SECTION ─────────────────────────────────── */}
        <section
          className="relative overflow-hidden border-b-3 border-foreground bg-foreground py-14 md:py-20"
        >
          <div className="grid-pattern absolute inset-0 opacity-5" />
          <div className="container relative mx-auto px-4">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">

              {/* Left: text */}
              <div className="flex-1 space-y-4">
                <Badge variant="secondary" className="gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> New
                </Badge>
                <h2
                  className="leading-none text-background"
                  style={{ ...DISPLAY, fontSize: 'clamp(32px, 5.5vw, 72px)' }}
                >
                  ASCII<br />
                  <span className="text-primary">ANIMATIONS</span>
                </h2>
                <p className="mt-3 max-w-md text-sm text-white/60" style={MONO}>
                  7 animated ASCII art components — spiral, rose, wave, vortex, pulse, matrix & grid. 5 character sets, 4 sizes. React & Vue 3.
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  {[
                    { label: 'Shapes', sub: '7 animations', to: '/ascii-shapes', color: 'bg-primary' },
                    { label: 'Charsets', sub: '5 styles', to: '/ascii-shapes', color: 'bg-secondary' },
                    { label: 'Sizes', sub: 'sm → hero', to: '/ascii-shapes', color: 'bg-accent' },
                  ].map(({ label, sub, to, color }) => (
                    <Link key={label} to={to}>
                      <div className="group flex items-center gap-3 border-2 border-white/20 px-4 py-2.5 hover:border-white/60 hover:bg-white/5 transition-all duration-150">
                        <div className={`h-2 w-2 shrink-0 ${color}`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-black uppercase tracking-wider text-white leading-none">{label}</div>
                          <div className="text-[10px] text-white/40 mt-0.5" style={MONO}>{sub}</div>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-white/30 group-hover:text-white/80 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right: 4 live ASCII shapes */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
                {([
                  { C: AsciiSpiral,  charset: 'classic', label: 'SPIRAL',  color: 'hsl(var(--primary))' },
                  { C: AsciiVortex,  charset: 'blocks',  label: 'VORTEX',  color: 'hsl(var(--secondary))' },
                  { C: AsciiMatrix,  charset: 'classic', label: 'MATRIX',  color: 'hsl(var(--accent))' },
                  { C: AsciiGrid,    charset: 'line',    label: 'GRID',    color: 'hsl(var(--warning))' },
                ] as const).map(({ C, charset, label, color }) => (
                  <Link key={label} to="/ascii-shapes">
                    <div className="group flex flex-col items-center gap-2 hover:opacity-90 transition-opacity">
                      <C size="sm" charset={charset} color={color} speed="normal" className="border-white/20 shadow-none" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/40" style={MONO}>{label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Link to="/ascii-shapes">
                <Button variant="secondary" className="gap-2">
                  Explore ASCII Shapes <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────── */}
        <section
          ref={ctaReveal.ref}
          className={`relative overflow-hidden bg-foreground py-20 md:py-28 transition-all duration-700 ease-out ${ctaReveal.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="grid-pattern absolute inset-0 opacity-10" />

          {/* Decorative: top-left sticker */}
          <div className="absolute -top-2 -left-4 opacity-90 hidden sm:block pointer-events-none select-none" style={{ transform: 'rotate(-8deg)' }}>
            <Sticker variant="primary" size="lg" rotation="none">Free</Sticker>
          </div>

          {/* Decorative: top-right stamp */}
          <div className="absolute top-6 -right-2 opacity-80 hidden sm:block pointer-events-none select-none" style={{ transform: 'rotate(12deg)' }}>
            <Stamp size="sm" variant="secondary" rotation="none">MIT</Stamp>
          </div>

          {/* Decorative: bottom-left stamp */}
          <div className="absolute -bottom-2 left-8 opacity-75 hidden md:block pointer-events-none select-none" style={{ transform: 'rotate(-6deg)' }}>
            <Stamp size="sm" rotation="none">v2.6</Stamp>
          </div>

          {/* Decorative: bottom-right sticker */}
          <div className="absolute bottom-4 -right-3 opacity-85 hidden sm:block pointer-events-none select-none" style={{ transform: 'rotate(9deg)' }}>
            <Sticker variant="secondary" rotation="none" size="sm">Open Source</Sticker>
          </div>

          {/* Decorative sparkles */}
          <span className="absolute top-8 left-1/4 text-primary text-3xl opacity-30 hidden lg:block select-none pointer-events-none">✦</span>
          <span className="absolute bottom-10 right-1/4 text-secondary text-2xl opacity-25 hidden lg:block select-none pointer-events-none">✦</span>
          <span className="absolute top-1/2 left-12 text-accent text-xl opacity-20 hidden lg:block select-none pointer-events-none">✦</span>

          <div className="container relative mx-auto px-4">
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">

              {/* Left: Headline */}
              <div>
                <div
                  className="mb-4 select-none leading-none text-background"
                  style={{ ...DISPLAY, fontSize: 'clamp(40px, 8vw, 120px)', lineHeight: 0.92 }}
                >
                  BUILD SOMETHING<br />
                  <span className="text-primary">BOLD.</span>
                </div>
                <p className="max-w-sm text-sm text-background/60" style={MONO}>
                  Free, open-source, and ready for production. Start building in seconds with React, Vue 3, or Nuxt.
                </p>
              </div>

              {/* Right: Action panel */}
              <div className="flex flex-col gap-3 lg:min-w-[260px]">
                {/* Stats summary */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: '50+', label: 'Components' },
                    { value: '10',  label: 'Chart Types' },
                    { value: '15',  label: 'Blocks' },
                    { value: 'MIT', label: 'License' },
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
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full gap-2 bg-transparent border-background text-background hover:bg-background/10"
                  >
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
