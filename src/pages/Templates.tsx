import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, ExternalLink, Copy, Check, Moon, Sun, Github } from 'lucide-react'
import { useState } from 'react'
import { SEO } from '@/components/SEO'
import { useTheme } from '@/hooks/use-theme'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="outline" size="sm" onClick={copy} className="gap-2">
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copied!' : 'Copy Code'}
    </Button>
  )
}

const templates = [
  {
    name: 'Landing Page',
    description: 'A complete SaaS landing page with hero, features, pricing, testimonials, and footer sections.',
    features: ['Hero Section', 'Features Grid', 'Pricing Cards', 'Testimonials', 'CTA Section', 'Footer'],
    path: '/templates/landing-page',
    code: `import { LandingPageTemplate } from '@/components/templates/LandingPageTemplate'

export default function Page() {
  return <LandingPageTemplate />
}`,
  },
]

export function Templates() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <>
      <SEO
        title="Free Neubrutalism Templates"
        description="Free, ready-to-use neubrutalism page templates for React. Landing pages, dashboards, and more. Copy, paste, and customize."
        canonical="https://boldkit.dev/templates"
      />
      <div className="min-h-screen bg-background">
        {/* Nav - Consistent with Home */}
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
              <Link to="/templates" className="hidden sm:block">
                <Button variant="ghost">Templates</Button>
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

        {/* Header */}
        <div className="border-b-3 border-foreground bg-muted/30">
          <div className="container mx-auto px-4 py-16">
            <Badge variant="secondary" className="mb-4">Free Templates</Badge>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Page Templates
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Ready-to-use neubrutalism page templates. Copy the code and customize for your project.
              100% free, no attribution required.
            </p>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8">
            {templates.map((template) => (
              <Card key={template.name} className="overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Preview */}
                  <div className="bg-muted border-b-3 lg:border-b-0 lg:border-r-3 border-foreground p-8 flex items-center justify-center min-h-[300px]">
                    <div className="w-full max-w-md aspect-video bg-background border-3 border-foreground shadow-[8px_8px_0px_hsl(var(--shadow-color))] overflow-hidden">
                      <div className="h-4 bg-foreground flex items-center px-2 gap-1">
                        <div className="w-2 h-2 rounded-full bg-destructive" />
                        <div className="w-2 h-2 rounded-full bg-warning" />
                        <div className="w-2 h-2 rounded-full bg-success" />
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="h-8 bg-primary w-3/4" />
                        <div className="h-3 bg-muted w-full" />
                        <div className="h-3 bg-muted w-2/3" />
                        <div className="flex gap-2 mt-4">
                          <div className="h-6 w-20 bg-primary" />
                          <div className="h-6 w-20 border-2 border-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-8">
                    <CardHeader className="p-0 mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl uppercase">{template.name}</CardTitle>
                        <Badge variant="outline">Free</Badge>
                      </div>
                      <CardDescription className="text-base">
                        {template.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-0">
                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-bold uppercase text-sm mb-3">Includes:</h4>
                        <div className="flex flex-wrap gap-2">
                          {template.features.map((feature) => (
                            <Badge key={feature} variant="secondary">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Code Preview */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold uppercase text-sm">Usage:</h4>
                          <CopyButton text={template.code} />
                        </div>
                        <pre className="bg-muted border-3 border-foreground p-4 text-sm overflow-x-auto">
                          <code>{template.code}</code>
                        </pre>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Link to={template.path}>
                          <Button className="gap-2">
                            Preview
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" className="gap-2" asChild>
                          <a
                            href="https://github.com/ANIBIT14/boldkit/blob/main/src/components/templates/LandingPageTemplate.tsx"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Source
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Coming Soon */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold uppercase mb-4">More Templates Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              Dashboard, Auth Pages, Blog, Pricing Page, and more.
            </p>
            <Button variant="outline" asChild>
              <a
                href="https://github.com/ANIBIT14/boldkit/issues/new?title=Template%20Request&body=I%20would%20like%20a%20template%20for..."
                target="_blank"
                rel="noopener noreferrer"
              >
                Request a Template
              </a>
            </Button>
          </div>
        </div>

        {/* Footer - Consistent with Home */}
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
                  <Link to="/templates" className="text-sm text-muted-foreground hover:text-foreground">Templates</Link>
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
    </>
  )
}

export default Templates
