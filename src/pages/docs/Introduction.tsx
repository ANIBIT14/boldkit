import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, Copy, Check, LayoutGrid, Settings, Terminal, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { useFramework, FrameworkToggle, ReactIcon, VueIcon } from '@/hooks/use-framework'
import { SEO, pageSEO } from '@/components/SEO'
import { COUNTS } from '@/config/routes-meta'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copyCommand = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyCommand}>
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  )
}

export function Introduction() {
  const { framework } = useFramework()

  return (
    <div className="space-y-8">
      <SEO {...pageSEO.docs} title="Introduction" />
      <div>
        <Badge variant="accent" className="mb-4">Documentation</Badge>
        <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
          Introduction
        </h1>
        <p className="mt-4 text-lg text-foreground/70 border-l-4 border-primary pl-4">
          BoldKit is a neubrutalism-styled component library for React, Vue, and Nuxt, built on top of shadcn/ui primitives.
        </p>
      </div>

      {/* Framework Toggle */}
      <div className="flex items-center gap-4">
        <span className="font-bold text-sm uppercase">Choose Framework:</span>
        <FrameworkToggle />
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold uppercase tracking-wide">What is BoldKit?</h2>
        <p>
          BoldKit brings the bold, raw aesthetic of neubrutalism to your {framework === 'vue' ? 'Vue 3' : 'React'} applications.
          It features high-contrast colors, thick borders, hard shadows, and a deliberately
          unpolished look that makes your UI stand out.
        </p>

        <h3 className="text-xl font-bold uppercase tracking-wide mt-8">Key Features</h3>
        <ul className="space-y-2 list-none pl-0">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>{COUNTS.components}+ Components</strong> - All shadcn/ui components with neubrutalism styling</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>15 Section Blocks</strong> - Pre-built hero, features, auth, settings, and more</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>{COUNTS.templates} Page Templates</strong> - Landing, dashboard, portfolio, pricing, blog, product, docs</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>64 SVG Shapes</strong> - Geometric, organic, celestial, mathematical, and mechanical shapes with interactive Shape Builder</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>12 ASCII Shapes</strong> - Animated 3D ASCII art (Torus, Donut, Sphere, Cube, Helix) and generative animations (Spiral, Matrix, Wave…) with multicolor support</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>Math Curve Components</strong> - 15 mathematical curves as animated loaders, progress bars, and backgrounds — no animation library required</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>{COUNTS.charts} Chart Types</strong> - Bar, line, area, pie, donut, radar, radial bar, gauge, sparkline, and more</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>{framework === 'vue' ? 'shadcn-vue' : 'shadcn'} CLI Compatible</strong> - Install components directly using the CLI</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>Accessible</strong> - Built on {framework === 'vue' ? 'Reka UI' : 'Radix UI'} primitives</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>TypeScript + Dark Mode</strong> - Full type safety and theme support</span>
          </li>
          {framework === 'vue' && (
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">◼</span>
              <span><strong>Nuxt Ready</strong> - Full SSR support with shadcn-nuxt module</span>
            </li>
          )}
        </ul>

        <h3 className="text-xl font-bold uppercase tracking-wide mt-8">Design Philosophy</h3>
        <p>
          Neubrutalism is characterized by:
        </p>
        <Card className="my-4">
          <CardHeader className="border-b-3 border-foreground bg-secondary py-3">
            <CardTitle className="text-sm">Core Principles</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              <li><strong>Bold Colors:</strong> High-contrast, vibrant color palettes</li>
              <li><strong>Thick Borders:</strong> 3px solid borders that define elements</li>
              <li><strong>Hard Shadows:</strong> Offset shadows with no blur (e.g., 4px 4px 0px)</li>
              <li><strong>Raw Typography:</strong> Bold, uppercase text for emphasis</li>
              <li><strong>Minimal Radius:</strong> Square or barely-rounded corners</li>
            </ul>
          </CardContent>
        </Card>

        <h3 className="text-xl font-bold uppercase tracking-wide mt-8 flex items-center gap-2">
          Section Blocks
          <Badge variant="accent" className="text-[10px]">New</Badge>
        </h3>
        <p>
          BoldKit introduces <strong>15 pre-built section blocks</strong> to accelerate your development.
          These ready-to-use sections let you build complete pages in minutes.
        </p>

        <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
          <Card>
            <CardHeader className="border-b-3 border-foreground bg-primary py-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" /> Marketing Blocks
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">
                10 sections for landing pages: Hero, Features, Testimonials, CTA, Stats, Team, FAQ, Footer, Contact, Logo Cloud.
              </p>
              <Link to="/blocks">
                <Button size="sm" variant="outline" className="gap-1">
                  View Blocks <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="border-b-3 border-foreground bg-success py-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Settings className="h-4 w-4" /> Application Blocks
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">
                5 app sections: Auth Forms, Settings Page, Onboarding Flow, Error Pages, Invoice.
              </p>
              <Link to="/blocks">
                <Button size="sm" variant="outline" className="gap-1">
                  View Blocks <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-xl font-bold uppercase tracking-wide mt-8 flex items-center gap-2">
          ASCII Shapes
          <Badge variant="accent" className="text-[10px]">New</Badge>
        </h3>
        <p>
          12 animated ASCII art components rendered with perspective projection, z-buffering, and Lambertian shading — no canvas, no WebGL, just text characters. Works in React, Vue 3, and Nuxt.
        </p>

        <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
          <Card>
            <CardHeader className="border-b-3 border-foreground bg-foreground py-3">
              <CardTitle className="text-sm flex items-center gap-2 text-background">
                <Terminal className="h-4 w-4" /> 3D Shapes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">
                Torus, Donut, Sphere, Cube, Helix — real 3D perspective projection with z-buffering and Lambertian shading.
              </p>
              <Link to="/components/ascii-shapes">
                <Button size="sm" variant="outline" className="gap-1">
                  ASCII Shapes Docs <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="border-b-3 border-foreground bg-accent py-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Terminal className="h-4 w-4" /> Generative Animations
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">
                Spiral, Rose, Wave, Vortex, Pulse, Matrix, Grid — 2D parametric animations with 5 character sets, multicolor, and SSR-safe static mode.
              </p>
              <Link to="/ascii-shapes">
                <Button size="sm" variant="outline" className="gap-1">
                  See All Shapes <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="not-prose my-4 border-3 border-foreground bg-muted p-4 bk-shadow">
          <p className="text-sm font-bold uppercase tracking-wide mb-3">Install ASCII Shapes</p>
          {framework === 'react' ? (
            <div className="flex items-center gap-2 border-3 border-foreground bg-background px-4 py-3">
              <code className="flex-1 font-mono text-sm">npx shadcn@latest add https://boldkit.dev/r/ascii-shapes.json</code>
              <CopyButton text="npx shadcn@latest add https://boldkit.dev/r/ascii-shapes.json" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 border-3 border-foreground bg-background px-4 py-3 mb-2">
                <code className="flex-1 font-mono text-sm">npx shadcn-vue@latest add https://boldkit.dev/r/vue/ascii-shapes.json</code>
                <CopyButton text="npx shadcn-vue@latest add https://boldkit.dev/r/vue/ascii-shapes.json" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <strong>Nuxt:</strong> Wrap animated shapes in <code className="bg-background border px-1">&lt;ClientOnly&gt;</code>. Use <code className="bg-background border px-1">:animated="false"</code> for SSR-safe static rendering without any wrapper.
              </p>
            </>
          )}
        </div>

        <h3 className="text-xl font-bold uppercase tracking-wide mt-8 flex items-center gap-2">
          Math Curve Components
          <Badge variant="secondary" className="text-[10px]">New</Badge>
        </h3>
        <p>
          15 mathematical curves (Lissajous, Hypotrochoid, Epitrochoid, Rose, Spirograph, and more) rendered as animated SVG UI elements — loaders, progress bars, and full-bleed backgrounds.
        </p>

        <div className="not-prose grid sm:grid-cols-3 gap-4 my-6">
          <Card>
            <CardHeader className="border-b-3 border-foreground bg-info py-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> MC Loader
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">Animated loading spinner driven by any of the 15 curves.</p>
              <Link to="/components/math-curve-loader">
                <Button size="sm" variant="outline" className="gap-1">Docs <ArrowRight className="h-3 w-3" /></Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="border-b-3 border-foreground bg-warning py-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> MC Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">Progress bar rendered as an animated mathematical curve.</p>
              <Link to="/components/math-curve-progress">
                <Button size="sm" variant="outline" className="gap-1">Docs <ArrowRight className="h-3 w-3" /></Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="border-b-3 border-foreground bg-success py-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> MC Background
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">Full-bleed animated curve background for sections and heroes.</p>
              <Link to="/components/math-curve-background">
                <Button size="sm" variant="outline" className="gap-1">Docs <ArrowRight className="h-3 w-3" /></Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-xl font-bold uppercase tracking-wide mt-8 flex items-center gap-2">
          Quick Start with {framework === 'vue' ? 'shadcn-vue' : 'shadcn'} CLI
          {framework === 'vue' ? <VueIcon className="h-5 w-5" /> : <ReactIcon className="h-5 w-5" />}
        </h3>
        <p>The fastest way to add BoldKit components is using the {framework === 'vue' ? 'shadcn-vue' : 'shadcn'} CLI:</p>

        <div className="not-prose my-4">
          <p className="text-sm text-muted-foreground mb-2">1. Add BoldKit registry to your components.json:</p>
          {framework === 'react' ? (
            <div className="flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-3 bk-shadow">
              <code className="flex-1 font-mono text-sm">
                {`"registries": { "@boldkit": "https://boldkit.dev/r" }`}
              </code>
              <CopyButton text={`"registries": { "@boldkit": "https://boldkit.dev/r" }`} />
            </div>
          ) : (
            <div className="flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-3 bk-shadow">
              <code className="flex-1 font-mono text-sm">
                {`"registries": { "@boldkit": "https://boldkit.dev/r/vue" }`}
              </code>
              <CopyButton text={`"registries": { "@boldkit": "https://boldkit.dev/r/vue" }`} />
            </div>
          )}
        </div>

        <div className="not-prose my-4">
          <p className="text-sm text-muted-foreground mb-2">2. Install components:</p>
          <Tabs defaultValue="single" className="w-full">
            <TabsList>
              <TabsTrigger value="single">Single</TabsTrigger>
              <TabsTrigger value="multiple">Multiple</TabsTrigger>
              <TabsTrigger value="url">Direct URL</TabsTrigger>
            </TabsList>
            {framework === 'react' ? (
              <>
                <TabsContent value="single">
                  <div className="flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-3 bk-shadow">
                    <code className="flex-1 font-mono text-sm">npx shadcn@latest add @boldkit/button</code>
                    <CopyButton text="npx shadcn@latest add @boldkit/button" />
                  </div>
                </TabsContent>
                <TabsContent value="multiple">
                  <div className="flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-3 bk-shadow">
                    <code className="flex-1 font-mono text-sm">npx shadcn@latest add @boldkit/button @boldkit/card @boldkit/input</code>
                    <CopyButton text="npx shadcn@latest add @boldkit/button @boldkit/card @boldkit/input" />
                  </div>
                </TabsContent>
                <TabsContent value="url">
                  <div className="flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-3 bk-shadow">
                    <code className="flex-1 font-mono text-sm">npx shadcn@latest add https://boldkit.dev/r/button.json</code>
                    <CopyButton text="npx shadcn@latest add https://boldkit.dev/r/button.json" />
                  </div>
                </TabsContent>
              </>
            ) : (
              <>
                <TabsContent value="single">
                  <div className="flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-3 bk-shadow">
                    <code className="flex-1 font-mono text-sm">npx shadcn-vue@latest add @boldkit/button</code>
                    <CopyButton text="npx shadcn-vue@latest add @boldkit/button" />
                  </div>
                </TabsContent>
                <TabsContent value="multiple">
                  <div className="flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-3 bk-shadow">
                    <code className="flex-1 font-mono text-sm">npx shadcn-vue@latest add @boldkit/button @boldkit/card @boldkit/input</code>
                    <CopyButton text="npx shadcn-vue@latest add @boldkit/button @boldkit/card @boldkit/input" />
                  </div>
                </TabsContent>
                <TabsContent value="url">
                  <div className="flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-3 bk-shadow">
                    <code className="flex-1 font-mono text-sm">npx shadcn-vue@latest add https://boldkit.dev/r/vue/button.json</code>
                    <CopyButton text="npx shadcn-vue@latest add https://boldkit.dev/r/vue/button.json" />
                  </div>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>

        <p>Or follow the manual installation guide for full setup:</p>

        <Link to="/docs/installation">
          <Button className="mt-4 gap-2">
            Installation Guide <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
