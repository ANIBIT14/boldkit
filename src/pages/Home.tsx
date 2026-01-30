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
import { useTheme } from '@/hooks/use-theme'
import { Moon, Sun, Github, Copy, Check, ArrowRight, Zap, Palette, Code2, Smartphone } from 'lucide-react'
import { useState } from 'react'

export function Home() {
  const { resolvedTheme, setTheme } = useTheme()
  const [copied, setCopied] = useState(false)

  const copyCommand = () => {
    navigator.clipboard.writeText('npx boldkit-ui init')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b-3 border-foreground bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://ik.imagekit.io/fincalfy/304a4c07-8de1-41af-813e-e7556234b973.png" alt="BoldKit" className="h-8 w-8" />
            <span className="text-xl font-black uppercase tracking-wider">BoldKit</span>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Beta</Badge>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/docs" className="hidden sm:block">
              <Button variant="ghost">Docs</Button>
            </Link>
            <Link to="/components" className="hidden sm:block">
              <Button variant="ghost">Components</Button>
            </Link>
            <Link to="/shapes" className="hidden sm:block">
              <Button variant="ghost">Shapes</Button>
            </Link>
            <Link to="/charts" className="hidden sm:block">
              <Button variant="ghost">Charts</Button>
            </Link>
            <Link to="/themes" className="hidden sm:block">
              <Button variant="ghost">Themes</Button>
            </Link>
            <a href="https://github.com/ANIBIT14/boldkit" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
            >
              {resolvedTheme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b-3 border-foreground">
        <div className="grid-pattern absolute inset-0 opacity-50" />
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="accent" className="mb-6">
              Open Source UI Library
            </Badge>
            <h1 className="mb-6 text-4xl font-black uppercase tracking-tight md:text-6xl lg:text-7xl">
              Bold. Raw.{' '}
              <span className="relative inline-block bg-primary px-2 py-1 border-3 border-foreground bk-shadow">
                Beautiful.
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              A neubrutalism React component library built on top of shadcn/ui.
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

            {/* CLI Command */}
            <div className="mt-8 inline-flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-2 bk-shadow">
              <code className="text-sm font-mono">npx boldkit-ui init</code>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyCommand}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b-3 border-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Footer */}
      <footer className="border-t-3 border-foreground bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img src="https://ik.imagekit.io/fincalfy/304a4c07-8de1-41af-813e-e7556234b973.png" alt="BoldKit" className="h-6 w-6" />
                <span className="font-bold uppercase tracking-wide">BoldKit</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Beta</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                A neubrutalism React component library built on top of shadcn/ui.
              </p>
              <p className="text-xs text-muted-foreground">
                Assets powered by{' '}
                <a href="https://vanikya.ai" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                  Vanikya.ai
                </a>
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-bold uppercase tracking-wide text-sm">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground">Documentation</Link>
                <Link to="/components" className="text-sm text-muted-foreground hover:text-foreground">Components</Link>
                <Link to="/shapes" className="text-sm text-muted-foreground hover:text-foreground">Shapes</Link>
                <Link to="/charts" className="text-sm text-muted-foreground hover:text-foreground">Charts</Link>
                <Link to="/themes" className="text-sm text-muted-foreground hover:text-foreground">Themes</Link>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-bold uppercase tracking-wide text-sm">Contact</h4>
              <div className="flex flex-col gap-2">
                <a href="mailto:aniruddha@boldkit.dev" className="text-sm text-muted-foreground hover:text-foreground">
                  aniruddha@boldkit.dev
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h4 className="font-bold uppercase tracking-wide text-sm">Connect</h4>
              <div className="flex items-center gap-4">
                <a href="https://github.com/ANIBIT14/boldkit" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/aniruddhaagarwal/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-muted-foreground/20 text-center">
            <p className="text-xs text-muted-foreground">
              MIT License. Open source and free to use.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
