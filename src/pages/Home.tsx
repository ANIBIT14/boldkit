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
import { Layout } from '@/components/layout'
import { Copy, Check, ArrowRight, Zap, Palette, Code2, Smartphone, Github, Layers } from 'lucide-react'
import { useState } from 'react'
import { SEO, pageSEO } from '@/components/SEO'
import { useFramework, ReactIcon, VueIcon } from '@/hooks/use-framework'

export function Home() {
  const [copied, setCopied] = useState(false)
  // Use global framework context
  const { framework, setFramework } = useFramework()

  const commands = {
    react: 'npx shadcn@latest add https://boldkit.dev/r/button.json',
    vue: 'npx shadcn-vue@latest add https://boldkit.dev/r/vue/button.json'
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

      {/* Hero */}
      <section className="relative overflow-hidden border-b-3 border-foreground">
        <div className="grid-pattern absolute inset-0 opacity-50" />
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            {/* Framework badges */}
            <div className="mb-6 flex items-center justify-center gap-3">
              <Badge variant="accent" className="gap-1.5">
                <ReactIcon className="h-5 w-5" /> React
              </Badge>
              <Badge variant="success" className="gap-1.5">
                <VueIcon className="h-5 w-5" /> Vue 3
                <span className="ml-1 rounded bg-background/20 px-1 py-0.5 text-[10px] font-bold">NEW</span>
              </Badge>
            </div>
            <h1 className="mb-6 text-4xl font-black uppercase tracking-tight md:text-6xl lg:text-7xl">
              Bold. Raw.{' '}
              <span className="relative inline-block bg-primary px-2 py-1 border-3 border-foreground bk-shadow">
                Beautiful.
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              A neubrutalism component library for React and Vue 3.
              High-contrast colors, thick borders, and hard shadows that make your UI pop.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/docs">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/components">
                <Button size="lg" variant="outline">
                  Browse Components
                </Button>
              </Link>
            </div>

            {/* Framework Toggle + CLI Command */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="inline-flex border-3 border-foreground bg-background">
                <button
                  onClick={() => setFramework('react')}
                  className={`flex items-center gap-2 px-4 py-2 font-bold transition-colors ${
                    framework === 'react' ? 'bg-primary' : 'hover:bg-muted'
                  }`}
                >
                  <ReactIcon className="h-5 w-5" /> React
                </button>
                <button
                  onClick={() => setFramework('vue')}
                  className={`flex items-center gap-2 px-4 py-2 font-bold transition-colors border-l-3 border-foreground ${
                    framework === 'vue' ? 'bg-success' : 'hover:bg-muted'
                  }`}
                >
                  <VueIcon className="h-5 w-5" /> Vue
                </button>
              </div>
              <div className="inline-flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-2 bk-shadow">
                <code className="text-sm font-mono">{commands[framework]}</code>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyCommand}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b-3 border-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            <Card interactive>
              <CardHeader className="bg-info">
                <Layers className="h-8 w-8 stroke-[3]" />
                <CardTitle>Multi-Framework</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-muted-foreground">
                  Available for React and Vue 3. Same design, same components, your framework.
                </p>
              </CardContent>
            </Card>

            <Card interactive>
              <CardHeader className="bg-primary">
                <Zap className="h-8 w-8 stroke-[3]" />
                <CardTitle>Fast Setup</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-muted-foreground">
                  Get started in minutes with our CLI. Copy-paste components directly into your project.
                </p>
              </CardContent>
            </Card>

            <Card interactive>
              <CardHeader className="bg-secondary">
                <Palette className="h-8 w-8 stroke-[3]" />
                <CardTitle>Themeable</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-muted-foreground">
                  Customize colors, shadows, and borders with CSS variables. Dark mode included.
                </p>
              </CardContent>
            </Card>

            <Card interactive>
              <CardHeader className="bg-accent">
                <Code2 className="h-8 w-8 stroke-[3]" />
                <CardTitle>TypeScript</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-muted-foreground">
                  Full TypeScript support with complete type definitions for all components.
                </p>
              </CardContent>
            </Card>

            <Card interactive>
              <CardHeader className="bg-success">
                <Smartphone className="h-8 w-8 stroke-[3]" />
                <CardTitle>Responsive</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-muted-foreground">
                  Mobile-first design. All components work beautifully on any screen size.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Component Preview */}
      <section className="border-b-3 border-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Badge variant="secondary" className="mb-4">40+ Components</Badge>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Component Preview
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Buttons */}
            <Card>
              <CardHeader className="bg-muted">
                <CardTitle>Buttons</CardTitle>
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
              <CardHeader className="bg-muted">
                <CardTitle>Badges</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="accent">Accent</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="destructive">Error</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Inputs */}
            <Card>
              <CardHeader className="bg-muted">
                <CardTitle>Inputs</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <Input placeholder="Enter your email..." />
                <div className="flex items-center gap-2">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-sm font-medium">
                    Accept terms and conditions
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Progress & Tabs */}
            <Card>
              <CardHeader className="bg-muted">
                <CardTitle>Progress & Tabs</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <Progress value={66} />
                <Tabs defaultValue="tab1">
                  <TabsList>
                    <TabsTrigger value="tab1">Overview</TabsTrigger>
                    <TabsTrigger value="tab2">Features</TabsTrigger>
                    <TabsTrigger value="tab3">Code</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1">Tab content for overview.</TabsContent>
                  <TabsContent value="tab2">Tab content for features.</TabsContent>
                  <TabsContent value="tab3">Tab content for code.</TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Stickers & Stamps - NEW */}
            <Card>
              <CardHeader className="bg-primary">
                <CardTitle className="flex items-center gap-2">
                  Stickers & Stamps
                  <Badge variant="accent" className="text-[10px]">New</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-6 items-center py-4">
                  <Sticker>New</Sticker>
                  <Sticker variant="primary" rotation="medium-right">Hot</Sticker>
                  <Sticker variant="secondary" dashed>Sale</Sticker>
                  <Stamp size="sm">OK</Stamp>
                  <Stamp variant="secondary" size="sm">Verified</Stamp>
                </div>
              </CardContent>
            </Card>

            {/* Layered Cards - NEW */}
            <Card>
              <CardHeader className="bg-secondary">
                <CardTitle className="flex items-center gap-2">
                  Layered Cards
                  <Badge variant="accent" className="text-[10px]">New</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 pb-10 pr-10">
                <div className="flex gap-8 items-start">
                  <LayeredCard layerColor="primary" className="flex-1">
                    <LayeredCardHeader>
                      <LayeredCardTitle className="text-base">Stacked</LayeredCardTitle>
                    </LayeredCardHeader>
                    <LayeredCardContent>
                      <p className="text-sm">Paper depth effect</p>
                    </LayeredCardContent>
                  </LayeredCard>
                  <LayeredCard layerColor="accent" layers="triple" className="flex-1">
                    <LayeredCardContent className="text-center py-6">
                      <div className="text-2xl font-black">3x</div>
                      <p className="text-xs mt-1">Triple Layer</p>
                    </LayeredCardContent>
                  </LayeredCard>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link to="/components">
              <Button size="lg" variant="outline" className="gap-2">
                View All Components <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-black uppercase tracking-tight md:text-4xl">
            Ready to Build Something Bold?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg">
            Start using BoldKit today. It's free, open-source, and ready for production.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/docs/installation">
              <Button size="lg" variant="outline" className="bg-background">
                Get Started
              </Button>
            </Link>
            <a href="https://github.com/ANIBIT14/boldkit" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2 bg-background">
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
