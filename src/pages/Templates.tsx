import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Layout } from '@/components/layout'
import { ArrowRight, ExternalLink, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { SEO, pageSEO } from '@/components/SEO'
import { useFramework, FrameworkToggle, ReactIcon, VueIcon } from '@/hooks/use-framework'

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
    sourceUrl: {
      react: 'https://github.com/ANIBIT14/boldkit/blob/main/src/components/templates/LandingPageTemplate.tsx',
      vue: 'https://github.com/ANIBIT14/boldkit/blob/main/packages/vue/src/components/templates/LandingPageTemplate.vue'
    },
    code: {
      react: `import { LandingPageTemplate } from '@/components/templates/LandingPageTemplate'

export default function Page() {
  return <LandingPageTemplate />
}`,
      vue: `<script setup lang="ts">
import LandingPageTemplate from '@/components/templates/LandingPageTemplate.vue'
</script>

<template>
  <LandingPageTemplate />
</template>`
    },
  },
  {
    name: 'Portfolio',
    description: 'A professional portfolio template with hero, services, experience timeline, projects, testimonials, and contact sections.',
    features: ['Hero with Avatar', 'Services Grid', 'Experience Timeline', 'Project Showcase', 'Testimonials', 'Contact Form'],
    path: '/templates/portfolio',
    sourceUrl: {
      react: 'https://github.com/ANIBIT14/boldkit/blob/main/src/components/templates/PortfolioTemplate.tsx',
      vue: 'https://github.com/ANIBIT14/boldkit/blob/main/packages/vue/src/components/templates/PortfolioTemplate.vue'
    },
    code: {
      react: `import { PortfolioTemplate } from '@/components/templates/PortfolioTemplate'

export default function Page() {
  return <PortfolioTemplate />
}`,
      vue: `<script setup lang="ts">
import PortfolioTemplate from '@/components/templates/PortfolioTemplate.vue'
</script>

<template>
  <PortfolioTemplate />
</template>`
    },
  },
]

export function Templates() {
  const { framework } = useFramework()

  return (
    <>
      <SEO {...pageSEO.templates} />
      <Layout>
        {/* Header */}
        <div className="border-b-3 border-foreground bg-muted/30">
          <div className="container mx-auto px-4 py-16">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary">Free Templates</Badge>
              <Badge variant={framework === 'react' ? 'info' : 'success'} className="gap-1.5">
                {framework === 'react' ? <ReactIcon className="h-4 w-4" /> : <VueIcon className="h-4 w-4" />}
                {framework === 'react' ? 'React' : 'Vue 3'}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Page Templates
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-6">
              Ready-to-use neubrutalism page templates. Copy the code and customize for your project.
              100% free, no attribution required.
            </p>
            <FrameworkToggle />
          </div>
        </div>

        {/* Templates Grid */}
        <div className="container mx-auto px-4 py-8 md:py-12 overflow-x-hidden">
          <div className="grid gap-6 md:gap-8 min-w-0">
            {templates.map((template) => (
              <Card key={template.name} className="overflow-hidden min-w-0">
                <div className="grid lg:grid-cols-2 gap-0 min-w-0">
                  {/* Preview - Hidden on mobile, shown on larger screens */}
                  <div className="hidden md:flex bg-muted border-b-3 lg:border-b-0 lg:border-r-3 border-foreground p-6 lg:p-8 items-center justify-center min-h-[250px] lg:min-h-[300px]">
                    <div className="w-full max-w-sm lg:max-w-md aspect-video bg-background border-3 border-foreground shadow-[6px_6px_0px_hsl(var(--shadow-color))] lg:shadow-[8px_8px_0px_hsl(var(--shadow-color))] overflow-hidden">
                      <div className="h-3 lg:h-4 bg-foreground flex items-center px-2 gap-1">
                        <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-destructive" />
                        <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-warning" />
                        <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-success" />
                      </div>
                      <div className="p-3 lg:p-4 space-y-2">
                        <div className="h-6 lg:h-8 bg-primary w-3/4" />
                        <div className="h-2 lg:h-3 bg-muted w-full" />
                        <div className="h-2 lg:h-3 bg-muted w-2/3" />
                        <div className="flex gap-2 mt-3 lg:mt-4">
                          <div className="h-5 lg:h-6 w-16 lg:w-20 bg-primary" />
                          <div className="h-5 lg:h-6 w-16 lg:w-20 border-2 border-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 md:p-6 lg:p-8 min-w-0 overflow-hidden">
                    <CardHeader className="p-0 mb-6">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <CardTitle className="text-xl sm:text-2xl uppercase">{template.name}</CardTitle>
                        <Badge variant="outline">Free</Badge>
                        <Badge variant={framework === 'react' ? 'info' : 'success'} className="gap-1">
                          {framework === 'react' ? <ReactIcon className="h-3 w-3" /> : <VueIcon className="h-3 w-3" />}
                          {framework === 'react' ? 'React' : 'Vue'}
                        </Badge>
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
                      <div className="mb-4 md:mb-6">
                        <div className="flex items-center justify-between mb-2 gap-2">
                          <h4 className="font-bold uppercase text-xs md:text-sm">Usage ({framework === 'react' ? 'React' : 'Vue 3'}):</h4>
                          <CopyButton text={template.code[framework]} />
                        </div>
                        <pre className="bg-muted border-3 border-foreground p-3 md:p-4 text-xs md:text-sm overflow-x-auto">
                          <code>{template.code[framework]}</code>
                        </pre>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <Link to={template.path} className="flex-1 sm:flex-none">
                          <Button className="gap-2 w-full sm:w-auto">
                            Preview
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" className="gap-2 flex-1 sm:flex-none" asChild>
                          <a
                            href={template.sourceUrl[framework]}
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

      </Layout>
    </>
  )
}

export default Templates
