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
import { Layout } from '@/components/layout'
import {
  Copy, Check, ArrowRight, Zap, Palette, Code2, Smartphone,
  Github, Layers, TrendingUp, DollarSign, LayoutGrid, Sparkles,
  Settings, LogIn, FileX, Package, BarChart3,
} from 'lucide-react'
import { useState } from 'react'
import { SEO, pageSEO } from '@/components/SEO'
import { useFramework, ReactIcon, VueIcon } from '@/hooks/use-framework'

const DISPLAY: React.CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" }
const MONO: React.CSSProperties    = { fontFamily: "'DM Mono', monospace" }

const MARQUEE_ITEMS = [
  '50+ Components', 'React', 'Vue 3', 'Nuxt', '10 Charts',
  '45 Shapes', '15 Blocks', 'TypeScript', 'Accessible',
  'Open Source', 'Free', 'Neubrutalism',
]

export function Home() {
  const [copied, setCopied] = useState(false)
  const { framework, setFramework } = useFramework()

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
                <div className="mb-6 flex flex-wrap gap-2">
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
                    className="leading-none text-primary"
                    style={{ ...DISPLAY, fontSize: 'clamp(56px, 14vw, 180px)', lineHeight: 0.88 }}
                  >
                    BOLD
                  </div>
                  <div
                    className="leading-none bk-text-outline-thick"
                    style={{ ...DISPLAY, fontSize: 'clamp(56px, 14vw, 180px)', lineHeight: 0.88 }}
                  >
                    KIT
                  </div>
                </div>

                {/* Divider + label */}
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-[3px] w-10 bg-foreground" />
                  <span
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                    style={MONO}
                  >
                    Neubrutalism UI Library
                  </span>
                </div>

                <p className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground" style={MONO}>
                  High-contrast colors, thick borders, and hard shadows that make your UI impossible to ignore.
                </p>

                {/* CTAs */}
                <div className="mb-8 flex flex-col sm:flex-row gap-3">
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
                <div className="w-full space-y-2">
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
                <div
                  className="absolute top-0 left-0 z-30 w-64 border-3 border-foreground bg-background p-4 bk-shadow-lg"
                  style={{ transform: 'rotate(-2.5deg)' }}
                >
                  <div className="mb-3 border-b-2 border-foreground pb-1.5 text-[10px] font-black uppercase tracking-widest" style={MONO}>Buttons</div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm">Primary</Button>
                    <Button size="sm" variant="secondary">Secondary</Button>
                    <Button size="sm" variant="accent">Accent</Button>
                    <Button size="sm" variant="outline">Outline</Button>
                  </div>
                </div>

                {/* Card: Badges — top-right, slight tilt */}
                <div
                  className="absolute top-8 right-0 z-20 w-56 border-3 border-foreground bg-background p-4 bk-shadow"
                  style={{ transform: 'rotate(2deg)' }}
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

                {/* Card: Stat Cards — center, slight tilt */}
                <div
                  className="absolute top-[170px] left-4 z-40 w-72 border-3 border-foreground bg-background p-4 bk-shadow-lg"
                  style={{ transform: 'rotate(-1deg)' }}
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

                {/* Card: Spinners — bottom-right, tilted */}
                <div
                  className="absolute bottom-0 right-0 z-30 w-52 border-3 border-foreground bg-accent p-4 bk-shadow"
                  style={{ transform: 'rotate(2.5deg)' }}
                >
                  <div className="mb-3 border-b-2 border-foreground pb-1.5 text-[10px] font-black uppercase tracking-widest" style={MONO}>Spinners</div>
                  <div className="flex items-center gap-4">
                    <Spinner variant="brutal" />
                    <Spinner variant="dots" />
                    <Spinner variant="bars" />
                    <Spinner variant="blocks" />
                  </div>
                </div>

                {/* Card: Stickers — bottom-left, big tilt */}
                <div
                  className="absolute bottom-12 left-0 z-20 w-48 border-3 border-foreground bg-primary p-4 bk-shadow"
                  style={{ transform: 'rotate(-3deg)' }}
                >
                  <div className="mb-3 border-b-2 border-foreground pb-1.5 text-[10px] font-black uppercase tracking-widest" style={MONO}>Stickers</div>
                  <div className="flex items-center gap-3">
                    <Sticker>New</Sticker>
                    <Sticker variant="secondary" rotation="medium-right">Hot</Sticker>
                    <Stamp size="sm">OK</Stamp>
                  </div>
                </div>

                {/* Center decorative block */}
                <div
                  className="absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-3 border-foreground bg-secondary bk-shadow"
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
        </section>

        {/* ── MARQUEE STRIP ──────────────────────────────────────────── */}
        <section className="overflow-hidden border-b-3 border-foreground bg-foreground py-3 text-background">
          <div className="animate-bk-marquee gap-0">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="flex items-center">
                <span
                  className="px-6 text-sm font-black uppercase tracking-widest"
                  style={MONO}
                >
                  {item}
                </span>
                <span className="text-primary text-lg font-black">✦</span>
              </span>
            ))}
          </div>
        </section>

        {/* ── STATS BAR ─────────────────────────────────────────────── */}
        <section className="border-b-3 border-foreground">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              // borders: [mobile-right, mobile-bottom, desktop-right]
              { number: '50+', label: 'Components', bg: 'bg-primary',   icon: <Package className="h-5 w-5" />,   borders: 'border-r-3 border-b-3 md:border-b-0 border-foreground' },
              { number: '10',  label: 'Chart Types', bg: 'bg-secondary', icon: <BarChart3 className="h-5 w-5" />, borders: 'border-b-3 md:border-b-0 md:border-r-3 border-foreground' },
              { number: '45',  label: 'SVG Shapes',  bg: 'bg-accent',   icon: <Sparkles className="h-5 w-5" />,  borders: 'border-r-3 md:border-r-3 border-foreground' },
              { number: '15',  label: 'Blocks',      bg: 'bg-success',  icon: <LayoutGrid className="h-5 w-5" />, borders: '' },
            ].map((stat) => (
              <div
                key={stat.label}
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
                  {stat.number}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMPONENT SHOWCASE ────────────────────────────────────── */}
        <section className="border-b-3 border-foreground py-14 md:py-20">
          <div className="container mx-auto px-4">

            <div className="mb-8 md:mb-12 flex items-end justify-between">
              <div>
                <Badge variant="outline" className="mb-3">Live Preview</Badge>
                <h2
                  className="leading-none"
                  style={{ ...DISPLAY, fontSize: 'clamp(32px, 5.5vw, 76px)' }}
                >
                  50+ COMPONENTS
                </h2>
              </div>
              <Link to="/components" className="hidden md:block">
                <Button variant="outline" className="gap-2">View All <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {/* Buttons — spans 2 cols */}
              <Card className="md:col-span-2 lg:col-span-2">
                <CardHeader className="border-b-3 border-foreground bg-muted">
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
                <CardHeader className="border-b-3 border-foreground bg-muted">
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
                <CardHeader className="border-b-3 border-foreground bg-muted">
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
                <CardContent className="pb-10 pr-10 pt-6">
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
        <section className="border-b-3 border-foreground py-14 md:py-20">
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
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">One command to install. Copy-paste into your project and go.</p>
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
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">
                    Built on Radix UI & Reka UI. Keyboard navigation and screen reader support included.
                  </p>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>

        {/* ── BLOCKS SECTION ────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b-3 border-foreground bg-accent py-14 md:py-20">
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
                  SECTION<br className="hidden sm:block" />BLOCKS
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

            {/* Block preview strip */}
            <div className="mt-8 grid max-w-2xl grid-cols-3 sm:grid-cols-5 gap-3">
              {[
                { name: 'Hero',     color: 'bg-primary'   },
                { name: 'Features', color: 'bg-info'      },
                { name: 'Stats',    color: 'bg-success'   },
                { name: 'Auth',     color: 'bg-secondary' },
                { name: 'Settings', color: 'bg-warning'   },
              ].map(b => (
                <div key={b.name} className={`${b.color} border-3 border-foreground bk-shadow p-3 text-center`}>
                  <span className="text-[11px] font-black uppercase" style={MONO}>{b.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 md:hidden">
              <Link to="/blocks">
                <Button size="lg" className="w-full gap-2">Explore All Blocks <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-foreground py-20 md:py-28">
          <div className="grid-pattern absolute inset-0 opacity-10" />
          <div className="container relative mx-auto px-4 text-center">
            <div
              className="mb-6 select-none leading-none text-background"
              style={{ ...DISPLAY, fontSize: 'clamp(40px, 8vw, 120px)', lineHeight: 0.92 }}
            >
              BUILD SOMETHING<br />
              <span className="text-primary">BOLD.</span>
            </div>
            <p className="mx-auto mb-10 max-w-sm text-sm text-background/60" style={MONO}>
              Free, open-source, and ready for production.<br />Start building in seconds.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/docs/installation" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">Get Started</Button>
              </Link>
              <a href="https://github.com/ANIBIT14/boldkit" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto gap-2 bg-transparent border-background text-background hover:bg-background/10"
                >
                  <Github className="h-4 w-4" /> Star on GitHub
                </Button>
              </a>
            </div>
          </div>
        </section>

      </Layout>
    </>
  )
}
