import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, ExternalLink, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO'

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
    image: '/templates/landing-page.png',
    features: ['Hero Section', 'Features Grid', 'Pricing Cards', 'Testimonials', 'CTA Section', 'Footer'],
    path: '/templates/landing-page',
    code: `import { LandingPageTemplate } from '@/components/templates/LandingPageTemplate'

export default function Page() {
  return <LandingPageTemplate />
}`,
  },
]

export function Templates() {
  return (
    <>
      <SEO
        title="Free Neubrutalism Templates"
        description="Free, ready-to-use neubrutalism page templates for React. Landing pages, dashboards, and more. Copy, paste, and customize."
        canonical="https://boldkit.dev/templates"
      />
      <div className="min-h-screen bg-background">
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
                  <div className="bg-muted border-r-3 border-foreground p-8 flex items-center justify-center min-h-[300px]">
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
      </div>
    </>
  )
}

export default Templates
