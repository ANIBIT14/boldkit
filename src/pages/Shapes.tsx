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
  BurstShape,
  BlobShape,
  ArrowBadge,
  ZigzagBanner,
  ScribbleCircle,
  TicketShape,
  SplatShape,
  SpeechBubble,
  DiamondBadge,
  HexagonShape,
  CrossShape,
  LightningShape,
  HeartShape,
  Star4Shape,
  ShieldShape,
  RibbonShape,
  WaveShape,
  OctagonShape,
  CloudShape,
  TagShape,
  Star5Shape,
  PentagonShape,
  TrapezoidShape,
  ParallelogramShape,
  CursorShape,
  BookmarkShape,
  FlagShape,
  PillShape,
  EyeShape,
  TriangleShape,
  PaperTearShape,
  ScribbleUnderline,
  PriceTagShape,
  ExplosionShape,
  CouponShape,
} from '@/components/ui/shapes'

const shapesList = [
  { name: 'Burst', component: BurstShape, code: '<BurstShape size={100} />', vueCode: '<BurstShape :size="100" />' },
  { name: 'Blob', component: BlobShape, code: '<BlobShape size={100} />', vueCode: '<BlobShape :size="100" />' },
  { name: 'Arrow Badge', component: ArrowBadge, code: '<ArrowBadge size={100} />', vueCode: '<ArrowBadge :size="100" />' },
  { name: 'Zigzag Banner', component: ZigzagBanner, code: '<ZigzagBanner size={100} />', vueCode: '<ZigzagBanner :size="100" />' },
  { name: 'Scribble Circle', component: ScribbleCircle, code: '<ScribbleCircle size={100} />', vueCode: '<ScribbleCircle :size="100" />' },
  { name: 'Ticket', component: TicketShape, code: '<TicketShape size={100} />', vueCode: '<TicketShape :size="100" />' },
  { name: 'Splat', component: SplatShape, code: '<SplatShape size={100} />', vueCode: '<SplatShape :size="100" />' },
  { name: 'Speech Bubble', component: SpeechBubble, code: '<SpeechBubble size={100} />', vueCode: '<SpeechBubble :size="100" />' },
  { name: 'Diamond', component: DiamondBadge, code: '<DiamondBadge size={100} />', vueCode: '<DiamondBadge :size="100" />' },
  { name: 'Hexagon', component: HexagonShape, code: '<HexagonShape size={100} />', vueCode: '<HexagonShape :size="100" />' },
  { name: 'Cross', component: CrossShape, code: '<CrossShape size={100} />', vueCode: '<CrossShape :size="100" />' },
  { name: 'Lightning', component: LightningShape, code: '<LightningShape size={100} />', vueCode: '<LightningShape :size="100" />' },
  { name: 'Heart', component: HeartShape, code: '<HeartShape size={100} />', vueCode: '<HeartShape :size="100" />' },
  { name: 'Star 4-Point', component: Star4Shape, code: '<Star4Shape size={100} />', vueCode: '<Star4Shape :size="100" />' },
  { name: 'Shield', component: ShieldShape, code: '<ShieldShape size={100} />', vueCode: '<ShieldShape :size="100" />' },
  { name: 'Ribbon', component: RibbonShape, code: '<RibbonShape size={100} />', vueCode: '<RibbonShape :size="100" />' },
  { name: 'Wave', component: WaveShape, code: '<WaveShape size={100} />', vueCode: '<WaveShape :size="100" />' },
  { name: 'Octagon', component: OctagonShape, code: '<OctagonShape size={100} />', vueCode: '<OctagonShape :size="100" />' },
  { name: 'Cloud', component: CloudShape, code: '<CloudShape size={100} />', vueCode: '<CloudShape :size="100" />' },
  { name: 'Tag', component: TagShape, code: '<TagShape size={100} />', vueCode: '<TagShape :size="100" />' },
  { name: 'Star 5-Point', component: Star5Shape, code: '<Star5Shape size={100} />', vueCode: '<Star5Shape :size="100" />' },
  { name: 'Pentagon', component: PentagonShape, code: '<PentagonShape size={100} />', vueCode: '<PentagonShape :size="100" />' },
  { name: 'Trapezoid', component: TrapezoidShape, code: '<TrapezoidShape size={100} />', vueCode: '<TrapezoidShape :size="100" />' },
  { name: 'Parallelogram', component: ParallelogramShape, code: '<ParallelogramShape size={100} />', vueCode: '<ParallelogramShape :size="100" />' },
  { name: 'Cursor', component: CursorShape, code: '<CursorShape size={100} />', vueCode: '<CursorShape :size="100" />' },
  { name: 'Bookmark', component: BookmarkShape, code: '<BookmarkShape size={100} />', vueCode: '<BookmarkShape :size="100" />' },
  { name: 'Flag', component: FlagShape, code: '<FlagShape size={100} />', vueCode: '<FlagShape :size="100" />' },
  { name: 'Pill', component: PillShape, code: '<PillShape size={100} />', vueCode: '<PillShape :size="100" />' },
  { name: 'Eye', component: EyeShape, code: '<EyeShape size={100} />', vueCode: '<EyeShape :size="100" />' },
  { name: 'Triangle', component: TriangleShape, code: '<TriangleShape size={100} />', vueCode: '<TriangleShape :size="100" />' },
  { name: 'Paper Tear', component: PaperTearShape, code: '<PaperTearShape size={100} />', vueCode: '<PaperTearShape :size="100" />' },
  { name: 'Scribble Underline', component: ScribbleUnderline, code: '<ScribbleUnderline size={100} />', vueCode: '<ScribbleUnderline :size="100" />' },
  { name: 'Price Tag', component: PriceTagShape, code: '<PriceTagShape size={100} />', vueCode: '<PriceTagShape :size="100" />' },
  { name: 'Explosion', component: ExplosionShape, code: '<ExplosionShape size={100} />', vueCode: '<ExplosionShape :size="100" />' },
  { name: 'Coupon', component: CouponShape, code: '<CouponShape size={100} />', vueCode: '<CouponShape :size="100" />' },
]

function ShapeCard({ name, Component, code, vueCode }: { name: string; Component: React.ComponentType<any>; code: string; vueCode: string }) {
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedCli, setCopiedCli] = useState(false)
  const { framework } = useFramework()

  const cliCommands = {
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
      <CardContent className="flex flex-col items-center justify-center p-6 min-h-[200px]">
        <div className="mb-4 transition-transform group-hover:scale-110">
          <Component size={70} />
        </div>
        <p className="text-sm font-bold uppercase tracking-wide text-center mb-3">{name}</p>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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

  const cliCommands = {
    react: 'npx shadcn@latest add https://boldkit.dev/r/shapes.json',
    vue: 'npx shadcn-vue@latest add https://boldkit.dev/r/vue/shapes.json'
  }

  const copyInstall = () => {
    navigator.clipboard.writeText(cliCommands[framework])
    setCopiedInstall(true)
    toast.success('CLI command copied!')
    setTimeout(() => setCopiedInstall(false), 2000)
  }

  return (
    <>
      <SEO {...pageSEO.shapes} />
      <Layout>
      {/* Hero */}
      <section className="border-b-3 border-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Badge variant="accent">35 Shapes</Badge>
              <Badge variant={framework === 'react' ? 'info' : 'success'} className="gap-1.5">
                {framework === 'react' ? <ReactIcon className="h-4 w-4" /> : <VueIcon className="h-4 w-4" />}
                {framework === 'react' ? 'React' : 'Vue 3'}
              </Badge>
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tight md:text-5xl mb-4">
              Neubrutalist Shapes
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Bold, geometric shapes for your neubrutalism designs. Perfect for badges, decorations, and visual accents.
              All shapes feature thick borders and work with your theme colors.
            </p>
            <div className="flex justify-center mb-6">
              <FrameworkToggle />
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={copyInstall} className="gap-2">
                {copiedInstall ? <Check className="h-4 w-4" /> : <Terminal className="h-4 w-4" />}
                Copy Install Command
              </Button>
              <Link to="/docs">
                <Button size="lg" variant="outline">
                  Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Install Section */}
      <section className="border-b-3 border-foreground py-8 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-sm font-bold uppercase tracking-wide mb-3 text-center">
              Install with {framework === 'react' ? 'shadcn' : 'shadcn-vue'} CLI
            </h3>
            <div className="flex items-center gap-2 border-3 border-foreground bg-background p-3 bk-shadow">
              <code className="flex-1 text-sm font-mono overflow-x-auto">{cliCommands[framework]}</code>
              <Button variant="ghost" size="sm" onClick={copyInstall}>
                {copiedInstall ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Usage */}
      <section className="border-b-3 border-foreground py-12 bg-muted">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="usage" className="max-w-3xl mx-auto">
            <TabsList className="mb-4">
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="props">Props</TabsTrigger>
              <TabsTrigger value="install">Installation</TabsTrigger>
            </TabsList>
            <TabsContent value="usage">
              <pre className="border-3 border-foreground bg-background p-4 text-sm overflow-x-auto bk-shadow">
                <code>{framework === 'react' ? `import { BurstShape, HeartShape, LightningShape } from '@/components/ui/shapes'

// Basic usage
<BurstShape size={100} />

// Custom color
<HeartShape size={80} className="text-destructive" />

// Outline only
<LightningShape size={60} filled={false} />

// Custom stroke width
<BurstShape size={100} strokeWidth={5} />` : `<script setup lang="ts">
import { BurstShape, HeartShape, LightningShape } from '@/components/ui/shapes'
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
              <div className="border-3 border-foreground bg-background p-4 bk-shadow">
                <table className="w-full text-sm">
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
            <TabsContent value="install">
              <div className="border-3 border-foreground bg-background p-4 bk-shadow space-y-4">
                <div>
                  <h4 className="font-bold uppercase text-sm mb-2">
                    Using {framework === 'react' ? 'shadcn' : 'shadcn-vue'} CLI (Recommended)
                  </h4>
                  <pre className="bg-muted p-3 text-sm overflow-x-auto border border-foreground">
                    <code>{cliCommands[framework]}</code>
                  </pre>
                </div>
                <div>
                  <h4 className="font-bold uppercase text-sm mb-2">Manual Installation</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Copy the shapes component from our GitHub repository</li>
                    <li>Place it in <code className="bg-muted px-1">components/ui/shapes.{framework === 'react' ? 'tsx' : 'vue'}</code></li>
                    <li>Import and use any shape in your components</li>
                  </ol>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Shapes Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-8 text-center">
            All Shapes
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {shapesList.map((shape) => (
              <ShapeCard
                key={shape.name}
                name={shape.name}
                Component={shape.component}
                code={shape.code}
                vueCode={shape.vueCode}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="border-t-3 border-foreground py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-8 text-center">
            Example Uses
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Badge Example */}
            <Card>
              <CardContent className="p-6">
                <div className="relative inline-block mb-4">
                  <BurstShape size={120} className="text-accent" />
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-black uppercase">
                    New!
                  </span>
                </div>
                <p className="text-sm font-bold uppercase">Sale Badge</p>
                <p className="text-xs text-muted-foreground">Use burst shapes for attention-grabbing badges</p>
              </CardContent>
            </Card>

            {/* Quote Example */}
            <Card>
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <SpeechBubble size={150} className="text-card" />
                  <p className="absolute inset-0 flex items-center justify-center text-sm font-bold p-4 pt-2">
                    "Bold is beautiful"
                  </p>
                </div>
                <p className="text-sm font-bold uppercase">Testimonial</p>
                <p className="text-xs text-muted-foreground">Speech bubbles for quotes and reviews</p>
              </CardContent>
            </Card>

            {/* Icon Example */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4 mb-4">
                  <HeartShape size={50} className="text-destructive" />
                  <LightningShape size={50} className="text-warning" />
                  <Star5Shape size={50} className="text-accent" />
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
