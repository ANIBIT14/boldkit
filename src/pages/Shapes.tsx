import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Layout } from '@/components/layout'
import { Copy, Check, Terminal } from 'lucide-react'
import { toast } from 'sonner'
import { SEO, pageSEO } from '@/components/SEO'
import { useFramework, FrameworkToggle, ReactIcon, VueIcon } from '@/hooks/use-framework'
import {
  // Geometric
  TriangleShape,
  DiamondBadge,
  PentagonShape,
  HexagonShape,
  OctagonShape,
  CrossShape,
  TrapezoidShape,
  ParallelogramShape,
  // Stars & Bursts
  Star4Shape,
  Star5Shape,
  Star6Shape,
  BurstShape,
  ExplosionShape,
  SplatShape,
  LightningShape,
  // Organic
  BlobShape,
  WaveShape,
  CloudShape,
  HeartShape,
  AppleShape,
  // Celestial & Nature
  SunShape,
  CrescentShape,
  RainbowShape,
  PlanetShape,
  UmbrellaShape,
  // Badges & UI
  ArrowBadge,
  ZigzagBanner,
  RibbonShape,
  ShieldShape,
  TagShape,
  PriceTagShape,
  TicketShape,
  CouponShape,
  BookmarkShape,
  FlagShape,
  PillShape,
  SealShape,
  WavyRectangleShape,
  // Communication
  SpeechBubble,
  CursorShape,
  EyeShape,
  // Decorative
  ScribbleCircle,
  ScribbleUnderline,
  PaperTearShape,
  // Mechanical
  GearShape,
} from '@/components/ui/shapes'

// Shape categories for organized display
const shapeCategories = [
  {
    name: 'Geometric',
    description: 'Basic polygons and mathematical forms',
    color: 'bg-primary/10',
    shapes: [
      { name: 'Triangle', component: TriangleShape, code: '<TriangleShape size={100} />', vueCode: '<TriangleShape :size="100" />' },
      { name: 'Diamond', component: DiamondBadge, code: '<DiamondBadge size={100} />', vueCode: '<DiamondBadge :size="100" />' },
      { name: 'Pentagon', component: PentagonShape, code: '<PentagonShape size={100} />', vueCode: '<PentagonShape :size="100" />' },
      { name: 'Hexagon', component: HexagonShape, code: '<HexagonShape size={100} />', vueCode: '<HexagonShape :size="100" />' },
      { name: 'Octagon', component: OctagonShape, code: '<OctagonShape size={100} />', vueCode: '<OctagonShape :size="100" />' },
      { name: 'Cross', component: CrossShape, code: '<CrossShape size={100} />', vueCode: '<CrossShape :size="100" />' },
      { name: 'Trapezoid', component: TrapezoidShape, code: '<TrapezoidShape size={100} />', vueCode: '<TrapezoidShape :size="100" />' },
      { name: 'Parallelogram', component: ParallelogramShape, code: '<ParallelogramShape size={100} />', vueCode: '<ParallelogramShape :size="100" />' },
    ]
  },
  {
    name: 'Stars & Bursts',
    description: 'Stars, explosions, and attention-grabbing shapes',
    color: 'bg-warning/10',
    shapes: [
      { name: 'Star 4-Point', component: Star4Shape, code: '<Star4Shape size={100} />', vueCode: '<Star4Shape :size="100" />' },
      { name: 'Star 5-Point', component: Star5Shape, code: '<Star5Shape size={100} />', vueCode: '<Star5Shape :size="100" />' },
      { name: 'Star 6-Point', component: Star6Shape, code: '<Star6Shape size={100} />', vueCode: '<Star6Shape :size="100" />' },
      { name: 'Burst', component: BurstShape, code: '<BurstShape size={100} />', vueCode: '<BurstShape :size="100" />' },
      { name: 'Explosion', component: ExplosionShape, code: '<ExplosionShape size={100} />', vueCode: '<ExplosionShape :size="100" />' },
      { name: 'Splat', component: SplatShape, code: '<SplatShape size={100} />', vueCode: '<SplatShape :size="100" />' },
      { name: 'Lightning', component: LightningShape, code: '<LightningShape size={100} />', vueCode: '<LightningShape :size="100" />' },
    ]
  },
  {
    name: 'Organic',
    description: 'Natural forms, blobs, and flowing shapes',
    color: 'bg-secondary/10',
    shapes: [
      { name: 'Blob', component: BlobShape, code: '<BlobShape size={100} />', vueCode: '<BlobShape :size="100" />' },
      { name: 'Wave', component: WaveShape, code: '<WaveShape size={100} />', vueCode: '<WaveShape :size="100" />' },
      { name: 'Cloud', component: CloudShape, code: '<CloudShape size={100} />', vueCode: '<CloudShape :size="100" />' },
      { name: 'Heart', component: HeartShape, code: '<HeartShape size={100} />', vueCode: '<HeartShape :size="100" />' },
      { name: 'Apple', component: AppleShape, code: '<AppleShape size={100} />', vueCode: '<AppleShape :size="100" />' },
    ]
  },
  {
    name: 'Celestial & Nature',
    description: 'Sun, moon, planets, and natural phenomena',
    color: 'bg-warning/10',
    shapes: [
      { name: 'Sun', component: SunShape, code: '<SunShape size={100} />', vueCode: '<SunShape :size="100" />' },
      { name: 'Crescent', component: CrescentShape, code: '<CrescentShape size={100} />', vueCode: '<CrescentShape :size="100" />' },
      { name: 'Rainbow', component: RainbowShape, code: '<RainbowShape size={100} />', vueCode: '<RainbowShape :size="100" />' },
      { name: 'Planet', component: PlanetShape, code: '<PlanetShape size={100} />', vueCode: '<PlanetShape :size="100" />' },
      { name: 'Umbrella', component: UmbrellaShape, code: '<UmbrellaShape size={100} />', vueCode: '<UmbrellaShape :size="100" />' },
    ]
  },
  {
    name: 'Badges & UI',
    description: 'Tags, ribbons, tickets, and UI elements',
    color: 'bg-accent/10',
    shapes: [
      { name: 'Arrow Badge', component: ArrowBadge, code: '<ArrowBadge size={100} />', vueCode: '<ArrowBadge :size="100" />' },
      { name: 'Zigzag Banner', component: ZigzagBanner, code: '<ZigzagBanner size={100} />', vueCode: '<ZigzagBanner :size="100" />' },
      { name: 'Ribbon', component: RibbonShape, code: '<RibbonShape size={100} />', vueCode: '<RibbonShape :size="100" />' },
      { name: 'Shield', component: ShieldShape, code: '<ShieldShape size={100} />', vueCode: '<ShieldShape :size="100" />' },
      { name: 'Tag', component: TagShape, code: '<TagShape size={100} />', vueCode: '<TagShape :size="100" />' },
      { name: 'Price Tag', component: PriceTagShape, code: '<PriceTagShape size={100} />', vueCode: '<PriceTagShape :size="100" />' },
      { name: 'Ticket', component: TicketShape, code: '<TicketShape size={100} />', vueCode: '<TicketShape :size="100" />' },
      { name: 'Coupon', component: CouponShape, code: '<CouponShape size={100} />', vueCode: '<CouponShape :size="100" />' },
      { name: 'Bookmark', component: BookmarkShape, code: '<BookmarkShape size={100} />', vueCode: '<BookmarkShape :size="100" />' },
      { name: 'Flag', component: FlagShape, code: '<FlagShape size={100} />', vueCode: '<FlagShape :size="100" />' },
      { name: 'Pill', component: PillShape, code: '<PillShape size={100} />', vueCode: '<PillShape :size="100" />' },
      { name: 'Seal', component: SealShape, code: '<SealShape size={100} />', vueCode: '<SealShape :size="100" />', isNew: true },
      { name: 'Wavy Rectangle', component: WavyRectangleShape, code: '<WavyRectangleShape size={100} />', vueCode: '<WavyRectangleShape :size="100" />', isNew: true },
    ]
  },
  {
    name: 'Communication',
    description: 'Speech bubbles, cursors, and interactive elements',
    color: 'bg-info/10',
    shapes: [
      { name: 'Speech Bubble', component: SpeechBubble, code: '<SpeechBubble size={100} />', vueCode: '<SpeechBubble :size="100" />' },
      { name: 'Cursor', component: CursorShape, code: '<CursorShape size={100} />', vueCode: '<CursorShape :size="100" />' },
      { name: 'Eye', component: EyeShape, code: '<EyeShape size={100} />', vueCode: '<EyeShape :size="100" />' },
    ]
  },
  {
    name: 'Decorative',
    description: 'Scribbles, effects, and artistic touches',
    color: 'bg-success/10',
    shapes: [
      { name: 'Scribble Circle', component: ScribbleCircle, code: '<ScribbleCircle size={100} />', vueCode: '<ScribbleCircle :size="100" />' },
      { name: 'Scribble Underline', component: ScribbleUnderline, code: '<ScribbleUnderline size={100} />', vueCode: '<ScribbleUnderline :size="100" />' },
      { name: 'Paper Tear', component: PaperTearShape, code: '<PaperTearShape size={100} />', vueCode: '<PaperTearShape :size="100" />' },
    ]
  },
  {
    name: 'Mechanical',
    description: 'Gears, cogs, and technical elements',
    color: 'bg-muted',
    shapes: [
      { name: 'Gear', component: GearShape, code: '<GearShape size={100} />', vueCode: '<GearShape :size="100" />', isNew: true },
    ]
  },
]

function ShapeCard({ name, Component, code, vueCode, isNew }: { name: string; Component: React.ComponentType<any>; code: string; vueCode: string; isNew?: boolean }) {
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedCli, setCopiedCli] = useState(false)
  const { framework } = useFramework()

  const cliCommands: Record<string, string> = {
    react: 'npx shadcn@latest add https://boldkit.dev/r/shapes.json',
    vue: 'npx shadcn-vue@latest add https://boldkit.dev/r/vue/shapes.json'
  }

  const currentCode = framework === 'react' ? code : vueCode

  const copyCode = () => {
    navigator.clipboard.writeText(currentCode)
    setCopiedCode(true)
    toast.success('Code copied!')
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const copyCli = () => {
    navigator.clipboard.writeText(cliCommands[framework])
    setCopiedCli(true)
    toast.success('CLI command copied!')
    setTimeout(() => setCopiedCli(false), 2000)
  }

  return (
    <Card className="group relative overflow-hidden">
      {isNew && (
        <Badge variant="accent" className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 z-10">
          New
        </Badge>
      )}
      <CardContent className="flex flex-col items-center justify-center p-4 md:p-6 min-h-[160px] md:min-h-[200px]">
        <div className="mb-3 md:mb-4 transition-transform group-hover:scale-110">
          <Component size={50} className="md:hidden" />
          <Component size={70} className="hidden md:block" />
        </div>
        <p className="text-xs md:text-sm font-bold uppercase tracking-wide text-center mb-2 md:mb-3">{name}</p>
        <div className="flex gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={copyCode}
            title="Copy component code"
          >
            {copiedCode ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={copyCli}
            title="Copy CLI install command"
          >
            {copiedCli ? <Check className="h-3 w-3" /> : <Terminal className="h-3 w-3" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function Shapes() {
  const [copiedInstall, setCopiedInstall] = useState(false)
  const { framework } = useFramework()

  const cliCommands: Record<string, string> = {
    react: 'npx shadcn@latest add https://boldkit.dev/r/shapes.json',
    vue: 'npx shadcn-vue@latest add https://boldkit.dev/r/vue/shapes.json'
  }

  const copyInstall = () => {
    navigator.clipboard.writeText(cliCommands[framework])
    setCopiedInstall(true)
    toast.success('CLI command copied!')
    setTimeout(() => setCopiedInstall(false), 2000)
  }

  const totalShapes = shapeCategories.reduce((acc, cat) => acc + cat.shapes.length, 0)

  return (
    <>
      <SEO {...pageSEO.shapes} />
      <Layout>
      {/* Hero */}
      <section className="border-b-3 border-foreground py-10 md:py-16">
        <div className="container mx-auto px-3 md:px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
              <Badge variant="accent">{totalShapes} Shapes</Badge>
              <Badge variant="secondary">{shapeCategories.length} Categories</Badge>
              <Badge variant={framework === 'react' ? 'info' : 'success'} className="gap-1.5">
                {framework === 'react' ? <ReactIcon className="h-4 w-4" /> : <VueIcon className="h-4 w-4" />}
                {framework === 'react' ? 'React' : 'Vue 3'}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight lg:text-5xl mb-3 md:mb-4">
              Neubrutalist Shapes
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 px-2">
              Bold, geometric shapes organized by category. Perfect for badges, decorations, and visual accents.
            </p>
            <div className="flex justify-center mb-4 md:mb-6">
              <FrameworkToggle />
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <Button size="lg" onClick={copyInstall} className="gap-2">
                {copiedInstall ? <Check className="h-4 w-4" /> : <Terminal className="h-4 w-4" />}
                Copy Install Command
              </Button>
              <Link to="/docs">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Install Section */}
      <section className="border-b-3 border-foreground py-6 md:py-8 bg-primary/10">
        <div className="container mx-auto px-3 md:px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xs md:text-sm font-bold uppercase tracking-wide mb-2 md:mb-3 text-center">
              Install with {framework === 'react' ? 'shadcn' : 'shadcn-vue'} CLI
            </h3>
            <div className="flex items-center gap-2 border-3 border-foreground bg-background p-2 md:p-3 bk-shadow">
              <code className="flex-1 text-xs md:text-sm font-mono overflow-x-auto">{cliCommands[framework]}</code>
              <Button variant="ghost" size="sm" onClick={copyInstall} className="shrink-0">
                {copiedInstall ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Usage */}
      <section className="border-b-3 border-foreground py-8 md:py-12 bg-muted">
        <div className="container mx-auto px-3 md:px-4">
          <Tabs defaultValue="usage" className="max-w-3xl mx-auto">
            <TabsList className="mb-3 md:mb-4 w-full sm:w-auto">
              <TabsTrigger value="usage" className="flex-1 sm:flex-none">Usage</TabsTrigger>
              <TabsTrigger value="props" className="flex-1 sm:flex-none">Props</TabsTrigger>
              <TabsTrigger value="categories" className="flex-1 sm:flex-none">Categories</TabsTrigger>
            </TabsList>
            <TabsContent value="usage">
              <pre className="border-3 border-foreground bg-background p-3 md:p-4 text-xs md:text-sm overflow-x-auto bk-shadow">
                <code>{framework === 'react' ? `import { BurstShape, HeartShape, LightningShape } from '@/components/ui/shapes'

// You can also import by category
import { GeometricShapes, StarShapes, OrganicShapes } from '@/components/ui/shapes'

// Basic usage
<BurstShape size={100} />

// Custom color
<HeartShape size={80} className="text-destructive" />

// Outline only
<LightningShape size={60} filled={false} />

// Custom stroke width
<BurstShape size={100} strokeWidth={5} />` : `<script setup lang="ts">
import { BurstShape, HeartShape, LightningShape } from '@/components/ui/shapes'

// You can also import by category
import { GeometricShapes, StarShapes, OrganicShapes } from '@/components/ui/shapes'
</script>

<template>
  <!-- Basic usage -->
  <BurstShape :size="100" />

  <!-- Custom color -->
  <HeartShape :size="80" class="text-destructive" />

  <!-- Outline only -->
  <LightningShape :size="60" :filled="false" />

  <!-- Custom stroke width -->
  <BurstShape :size="100" :stroke-width="5" />
</template>`}</code>
              </pre>
            </TabsContent>
            <TabsContent value="props">
              <div className="border-3 border-foreground bg-background p-3 md:p-4 bk-shadow overflow-x-auto">
                <table className="w-full text-xs md:text-sm min-w-[300px]">
                  <thead>
                    <tr className="border-b-2 border-foreground">
                      <th className="text-left py-2 font-bold uppercase">Prop</th>
                      <th className="text-left py-2 font-bold uppercase">Type</th>
                      <th className="text-left py-2 font-bold uppercase">Default</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-muted">
                      <td className="py-2">size</td>
                      <td className="py-2 text-muted-foreground">number</td>
                      <td className="py-2">100</td>
                    </tr>
                    <tr className="border-b border-muted">
                      <td className="py-2">{framework === 'react' ? 'strokeWidth' : 'stroke-width'}</td>
                      <td className="py-2 text-muted-foreground">number</td>
                      <td className="py-2">3</td>
                    </tr>
                    <tr className="border-b border-muted">
                      <td className="py-2">filled</td>
                      <td className="py-2 text-muted-foreground">boolean</td>
                      <td className="py-2">true</td>
                    </tr>
                    <tr className="border-b border-muted">
                      <td className="py-2">color</td>
                      <td className="py-2 text-muted-foreground">string</td>
                      <td className="py-2">currentColor</td>
                    </tr>
                    <tr>
                      <td className="py-2">{framework === 'react' ? 'className' : 'class'}</td>
                      <td className="py-2 text-muted-foreground">string</td>
                      <td className="py-2">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="categories">
              <div className="border-3 border-foreground bg-background p-3 md:p-4 bk-shadow space-y-3">
                <p className="text-sm text-muted-foreground mb-3">
                  Import shapes individually or by category for better organization:
                </p>
                <pre className="bg-muted p-3 text-xs md:text-sm overflow-x-auto border border-foreground">
                  <code>{framework === 'react' ? `// Import category groups
import {
  GeometricShapes,   // Triangle, Diamond, Pentagon, etc.
  StarShapes,        // Star4, Star5, Star6, Burst, etc.
  OrganicShapes,     // Blob, Wave, Cloud, Heart, Apple
  CelestialShapes,   // Sun, Crescent, Rainbow, Planet, Umbrella
  BadgeShapes,       // Arrow, Ribbon, Tag, Ticket, etc.
  CommunicationShapes, // SpeechBubble, Cursor, Eye
  DecorativeShapes   // ScribbleCircle, ScribbleUnderline, PaperTear
} from '@/components/ui/shapes'

// Use shapes from category
<GeometricShapes.TriangleShape size={100} />
<CelestialShapes.SunShape size={100} />` : `<script setup>
// Import category groups
import {
  GeometricShapes,
  StarShapes,
  OrganicShapes,
  CelestialShapes,
  BadgeShapes,
  CommunicationShapes,
  DecorativeShapes
} from '@/components/ui/shapes'
</script>`}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Shapes by Category */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-3 md:px-4">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-6 md:mb-8 text-center">
            Shapes by Category
          </h2>

          <div className="space-y-10 md:space-y-16">
            {shapeCategories.map((category) => (
              <div key={category.name}>
                <div className={`${category.color} border-3 border-foreground p-4 md:p-6 mb-4 md:mb-6`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-lg md:text-xl font-black uppercase">{category.name}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    <Badge variant="outline" className="self-start sm:self-center">
                      {category.shapes.length} shapes
                    </Badge>
                  </div>
                </div>
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

      {/* Examples */}
      <section className="border-t-3 border-foreground py-10 md:py-16 bg-muted">
        <div className="container mx-auto px-3 md:px-4">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-6 md:mb-8 text-center">
            Example Uses
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {/* Badge Example */}
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="relative inline-block mb-3 md:mb-4">
                  <BurstShape size={100} className="text-accent md:hidden" />
                  <BurstShape size={120} className="text-accent hidden md:block" />
                  <span className="absolute inset-0 flex items-center justify-center text-base md:text-lg font-black uppercase">
                    New!
                  </span>
                </div>
                <p className="text-sm font-bold uppercase">Sale Badge</p>
                <p className="text-xs text-muted-foreground">Use burst shapes for attention-grabbing badges</p>
              </CardContent>
            </Card>

            {/* Quote Example */}
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="relative mb-3 md:mb-4">
                  <SpeechBubble size={120} className="text-card md:hidden" />
                  <SpeechBubble size={150} className="text-card hidden md:block" />
                  <p className="absolute inset-0 flex items-center justify-center text-xs md:text-sm font-bold p-4 pt-2">
                    "Bold is beautiful"
                  </p>
                </div>
                <p className="text-sm font-bold uppercase">Testimonial</p>
                <p className="text-xs text-muted-foreground">Speech bubbles for quotes and reviews</p>
              </CardContent>
            </Card>

            {/* Icon Example */}
            <Card className="sm:col-span-2 md:col-span-1">
              <CardContent className="p-4 md:p-6">
                <div className="flex gap-3 md:gap-4 mb-3 md:mb-4">
                  <HeartShape size={40} className="text-destructive md:hidden" />
                  <LightningShape size={40} className="text-warning md:hidden" />
                  <Star5Shape size={40} className="text-accent md:hidden" />
                  <HeartShape size={50} className="text-destructive hidden md:block" />
                  <LightningShape size={50} className="text-warning hidden md:block" />
                  <Star5Shape size={50} className="text-accent hidden md:block" />
                </div>
                <p className="text-sm font-bold uppercase">Decorative Icons</p>
                <p className="text-xs text-muted-foreground">Mix shapes for visual interest</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      </Layout>
    </>
  )
}
