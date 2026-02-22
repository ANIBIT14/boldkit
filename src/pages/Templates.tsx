import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Layout } from '@/components/layout'
import { ExternalLink, Copy, Check } from 'lucide-react'
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

// Preview components for each template
function LandingPreview() {
  return (
    <div className="p-2 space-y-2">
      {/* Nav */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-primary border border-foreground" />
          <div className="w-8 h-1.5 bg-foreground" />
        </div>
        <div className="flex gap-1">
          <div className="w-6 h-2 bg-primary" />
        </div>
      </div>
      {/* Hero */}
      <div className="bg-accent/30 p-3 text-center border border-foreground">
        <div className="w-8 h-1.5 bg-accent mx-auto mb-1" />
        <div className="w-16 h-3 bg-foreground mx-auto mb-1" />
        <div className="w-12 h-1 bg-muted mx-auto mb-2" />
        <div className="flex justify-center gap-1">
          <div className="w-6 h-2 bg-primary" />
          <div className="w-6 h-2 border border-foreground" />
        </div>
      </div>
      {/* Features */}
      <div className="grid grid-cols-3 gap-1">
        <div className="h-6 bg-primary/10 border border-foreground p-1">
          <div className="w-2 h-2 bg-primary mb-0.5" />
          <div className="w-full h-0.5 bg-muted" />
        </div>
        <div className="h-6 bg-secondary/10 border border-foreground p-1">
          <div className="w-2 h-2 bg-secondary mb-0.5" />
          <div className="w-full h-0.5 bg-muted" />
        </div>
        <div className="h-6 bg-accent/10 border border-foreground p-1">
          <div className="w-2 h-2 bg-accent mb-0.5" />
          <div className="w-full h-0.5 bg-muted" />
        </div>
      </div>
    </div>
  )
}

function PortfolioPreview() {
  return (
    <div className="p-2 space-y-2">
      {/* Hero */}
      <div className="flex items-center gap-2 p-2 bg-muted/30">
        <div className="w-8 h-8 rounded-full bg-secondary border-2 border-foreground" />
        <div className="flex-1">
          <div className="w-12 h-2 bg-foreground mb-1" />
          <div className="w-8 h-1 bg-muted" />
        </div>
      </div>
      {/* Services */}
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-5 bg-background border border-foreground p-0.5">
            <div className="w-2 h-2 bg-primary mx-auto" />
          </div>
        ))}
      </div>
      {/* Timeline */}
      <div className="flex gap-1">
        <div className="w-0.5 bg-foreground" />
        <div className="flex-1 space-y-1">
          <div className="h-3 bg-muted p-0.5"><div className="w-6 h-1 bg-foreground" /></div>
          <div className="h-3 bg-muted p-0.5"><div className="w-5 h-1 bg-foreground" /></div>
        </div>
      </div>
    </div>
  )
}

function DashboardPreview() {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-8 bg-foreground p-1 space-y-1">
        <div className="w-4 h-1.5 bg-primary" />
        <div className="w-full h-0.5 bg-background/30" />
        <div className="w-full h-0.5 bg-background/30" />
        <div className="w-full h-0.5 bg-background/30" />
      </div>
      {/* Main */}
      <div className="flex-1 p-2 space-y-2">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-1">
          <div className="col-span-2 h-5 bg-success/20 border border-foreground p-0.5">
            <div className="w-4 h-1 bg-foreground" />
            <div className="w-6 h-1.5 bg-success mt-0.5" />
          </div>
          <div className="h-5 bg-info/20 border border-foreground p-0.5">
            <div className="w-3 h-1 bg-foreground" />
          </div>
        </div>
        {/* Chart */}
        <div className="h-8 bg-muted border border-foreground p-1">
          <div className="flex items-end h-full gap-0.5">
            {[40, 60, 45, 80, 55, 70].map((h, i) => (
              <div key={i} className="flex-1 bg-primary" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        {/* Table */}
        <div className="space-y-0.5">
          <div className="h-2 bg-foreground" />
          <div className="h-2 bg-muted" />
          <div className="h-2 bg-muted" />
        </div>
      </div>
    </div>
  )
}

function PricingPreview() {
  return (
    <div className="p-2 space-y-2">
      {/* Header */}
      <div className="text-center">
        <div className="w-10 h-1.5 bg-foreground mx-auto mb-1" />
        <div className="w-6 h-1 bg-muted mx-auto" />
      </div>
      {/* Cards */}
      <div className="grid grid-cols-3 gap-1">
        <div className="bg-muted border border-foreground p-1">
          <div className="w-4 h-1 bg-foreground mb-1" />
          <div className="w-3 h-2 bg-foreground mb-1" />
          <div className="space-y-0.5">
            <div className="w-full h-0.5 bg-muted-foreground/30" />
            <div className="w-full h-0.5 bg-muted-foreground/30" />
          </div>
        </div>
        <div className="bg-primary/10 border-2 border-primary p-1 -mt-1">
          <div className="w-4 h-1 bg-primary mb-1" />
          <div className="w-3 h-2 bg-foreground mb-1" />
          <div className="space-y-0.5">
            <div className="w-full h-0.5 bg-primary/50" />
            <div className="w-full h-0.5 bg-primary/50" />
            <div className="w-full h-0.5 bg-primary/50" />
          </div>
        </div>
        <div className="bg-foreground text-background border border-foreground p-1">
          <div className="w-4 h-1 bg-background mb-1" />
          <div className="w-3 h-2 bg-background mb-1" />
          <div className="space-y-0.5">
            <div className="w-full h-0.5 bg-background/30" />
            <div className="w-full h-0.5 bg-background/30" />
          </div>
        </div>
      </div>
      {/* FAQ */}
      <div className="grid grid-cols-2 gap-1">
        <div className="h-3 bg-muted border border-foreground" />
        <div className="h-3 bg-muted border border-foreground" />
      </div>
    </div>
  )
}

function BlogPreview() {
  return (
    <div className="p-2 space-y-2">
      {/* Nav */}
      <div className="flex items-center justify-between">
        <div className="w-4 h-3 bg-foreground" />
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-4 h-1 bg-muted" />
          ))}
        </div>
      </div>
      {/* Featured */}
      <div className="flex gap-2 bg-muted/30 border border-foreground p-1">
        <div className="w-12 h-8 bg-primary/20 border-l-2 border-primary" />
        <div className="flex-1 space-y-1">
          <div className="w-8 h-1.5 bg-foreground" />
          <div className="w-full h-0.5 bg-muted" />
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            <div className="w-4 h-0.5 bg-muted" />
          </div>
        </div>
      </div>
      {/* Grid */}
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="border border-foreground">
            <div className={`h-4 ${['bg-info/20', 'bg-primary/20', 'bg-warning/20'][i]} border-l-2 ${['border-info', 'border-primary', 'border-warning'][i]}`} />
            <div className="p-0.5">
              <div className="w-full h-0.5 bg-foreground mb-0.5" />
              <div className="w-3/4 h-0.5 bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductPreview() {
  return (
    <div className="p-2 space-y-2">
      {/* Breadcrumb */}
      <div className="flex gap-1">
        <div className="w-4 h-1 bg-muted" />
        <div className="w-1 h-1 bg-muted" />
        <div className="w-6 h-1 bg-foreground" />
      </div>
      {/* Product */}
      <div className="flex gap-2">
        {/* Gallery */}
        <div className="w-14">
          <div className="aspect-square bg-muted border border-foreground mb-1 relative">
            <div className="absolute top-0.5 left-0.5 w-3 h-1.5 bg-destructive text-[4px] text-destructive-foreground flex items-center justify-center font-bold">-24%</div>
          </div>
          <div className="grid grid-cols-3 gap-0.5">
            <div className="aspect-square bg-muted border border-primary" />
            <div className="aspect-square bg-muted border border-foreground" />
            <div className="aspect-square bg-muted border border-foreground" />
          </div>
        </div>
        {/* Info */}
        <div className="flex-1 space-y-1">
          <div className="w-8 h-1.5 bg-foreground" />
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="w-1.5 h-1.5 bg-warning" />
            ))}
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 bg-foreground" />
            <div className="w-3 h-1.5 bg-muted line-through" />
          </div>
          {/* Colors */}
          <div className="flex gap-0.5">
            <div className="w-2 h-2 bg-foreground border border-primary" />
            <div className="w-2 h-2 bg-background border border-foreground" />
            <div className="w-2 h-2 bg-destructive border border-foreground" />
          </div>
          <div className="w-full h-2 bg-primary" />
        </div>
      </div>
    </div>
  )
}

const previewComponents: Record<string, React.FC> = {
  'Landing Page': LandingPreview,
  'Portfolio': PortfolioPreview,
  'SaaS Dashboard': DashboardPreview,
  'Pricing': PricingPreview,
  'Blog': BlogPreview,
  'Product': ProductPreview,
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
    } as Record<string, string>,
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
    } as Record<string, string>,
  },
  {
    name: 'Portfolio',
    description: 'A professional portfolio template with hero, services, experience timeline, projects, testimonials, and contact sections.',
    features: ['Hero with Avatar', 'Services Grid', 'Experience Timeline', 'Project Showcase', 'Testimonials', 'Contact Form'],
    path: '/templates/portfolio',
    sourceUrl: {
      react: 'https://github.com/ANIBIT14/boldkit/blob/main/src/components/templates/PortfolioTemplate.tsx',
      vue: 'https://github.com/ANIBIT14/boldkit/blob/main/packages/vue/src/components/templates/PortfolioTemplate.vue'
    } as Record<string, string>,
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
    } as Record<string, string>,
  },
  {
    name: 'SaaS Dashboard',
    description: 'An admin panel with dark sidebar, stats grid, charts, activity feed, and data tables.',
    features: ['Stats Grid', 'Charts', 'Activity Feed', 'Data Table', 'Sidebar Nav', 'Pagination'],
    path: '/templates/dashboard',
    sourceUrl: {
      react: 'https://github.com/ANIBIT14/boldkit/blob/main/src/components/templates/DashboardTemplate.tsx',
      vue: 'https://github.com/ANIBIT14/boldkit/blob/main/packages/vue/src/components/templates/DashboardTemplate.vue'
    } as Record<string, string>,
    code: {
      react: `import { DashboardTemplate } from '@/components/templates/DashboardTemplate'

export default function Page() {
  return <DashboardTemplate />
}`,
      vue: `<script setup lang="ts">
import DashboardTemplate from '@/components/templates/DashboardTemplate.vue'
</script>

<template>
  <DashboardTemplate />
</template>`
    } as Record<string, string>,
  },
  {
    name: 'Pricing',
    description: 'A 3-tier pricing page with feature comparison table, FAQ accordion, and social proof.',
    features: ['3-Tier Cards', 'Monthly/Yearly Toggle', 'Feature Comparison', 'FAQ Section', 'Logo Marquee', 'Contact CTA'],
    path: '/templates/pricing',
    sourceUrl: {
      react: 'https://github.com/ANIBIT14/boldkit/blob/main/src/components/templates/PricingTemplate.tsx',
      vue: 'https://github.com/ANIBIT14/boldkit/blob/main/packages/vue/src/components/templates/PricingTemplate.vue'
    } as Record<string, string>,
    code: {
      react: `import { PricingTemplate } from '@/components/templates/PricingTemplate'

export default function Page() {
  return <PricingTemplate />
}`,
      vue: `<script setup lang="ts">
import PricingTemplate from '@/components/templates/PricingTemplate.vue'
</script>

<template>
  <PricingTemplate />
</template>`
    } as Record<string, string>,
  },
  {
    name: 'Blog',
    description: 'An editorial magazine-style blog with asymmetric grids, featured articles, and newsletter signup.',
    features: ['Featured Hero', 'Article Grid', 'Sidebar', 'Newsletter', 'Category Nav', 'Pagination'],
    path: '/templates/blog',
    sourceUrl: {
      react: 'https://github.com/ANIBIT14/boldkit/blob/main/src/components/templates/BlogTemplate.tsx',
      vue: 'https://github.com/ANIBIT14/boldkit/blob/main/packages/vue/src/components/templates/BlogTemplate.vue'
    } as Record<string, string>,
    code: {
      react: `import { BlogTemplate } from '@/components/templates/BlogTemplate'

export default function Page() {
  return <BlogTemplate />
}`,
      vue: `<script setup lang="ts">
import BlogTemplate from '@/components/templates/BlogTemplate.vue'
</script>

<template>
  <BlogTemplate />
</template>`
    } as Record<string, string>,
  },
  {
    name: 'Product',
    description: 'An e-commerce product page with image gallery, variant selectors, reviews, and related products.',
    features: ['Image Gallery', 'Color/Size Selectors', 'Reviews', 'Related Products', 'Sticky Cart', 'Trust Badges'],
    path: '/templates/product',
    sourceUrl: {
      react: 'https://github.com/ANIBIT14/boldkit/blob/main/src/components/templates/ProductTemplate.tsx',
      vue: 'https://github.com/ANIBIT14/boldkit/blob/main/packages/vue/src/components/templates/ProductTemplate.vue'
    } as Record<string, string>,
    code: {
      react: `import { ProductTemplate } from '@/components/templates/ProductTemplate'

export default function Page() {
  return <ProductTemplate />
}`,
      vue: `<script setup lang="ts">
import ProductTemplate from '@/components/templates/ProductTemplate.vue'
</script>

<template>
  <ProductTemplate />
</template>`
    } as Record<string, string>,
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
                      <div className="h-[calc(100%-12px)] lg:h-[calc(100%-16px)]">
                        {previewComponents[template.name] ? (
                          React.createElement(previewComponents[template.name])
                        ) : (
                          <div className="p-3 lg:p-4 space-y-2">
                            <div className="h-6 lg:h-8 bg-primary w-3/4" />
                            <div className="h-2 lg:h-3 bg-muted w-full" />
                            <div className="h-2 lg:h-3 bg-muted w-2/3" />
                          </div>
                        )}
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
                        <Button className="gap-2 flex-1 sm:flex-none" asChild>
                          <a
                            href={template.path}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Preview
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
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
              Auth Pages, Contact Forms, 404 Pages, and more.
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
