import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
            <span className="text-3xl font-black">◼</span>
            <span className="text-xl font-black uppercase tracking-wider">BoldKit</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/docs" className="hidden sm:block">
              <Button variant="ghost">Docs</Button>
            </Link>
            <Link to="/components" className="hidden sm:block">
              <Button variant="ghost">Components</Button>
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
            <Card className="transition-transform hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
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

            <Card className="transition-transform hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
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

            <Card className="transition-transform hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
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

            <Card className="transition-transform hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
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
            <Badge variant="secondary" className="mb-4">30+ Components</Badge>
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
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black">◼</span>
              <span className="font-bold uppercase tracking-wide">BoldKit</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with React, Tailwind CSS & Radix UI. MIT License.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/ANIBIT14/boldkit" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://boldkit.dev" className="text-sm font-medium hover:underline">
                boldkit.dev
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
