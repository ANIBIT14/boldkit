import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Layout } from '@/components/layout'
import { ExternalLink, Copy, Check, ArrowRight } from 'lucide-react'
import { SEO, pageSEO } from '@/components/SEO'
import { FrameworkToggle, frameworkLabels, useFramework, type Framework } from '@/hooks/use-framework'

// Per-template accent colors — used as left border stripe + underline
const ACCENT_COLORS = [
  '#FFE400', // Landing Page
  '#00D9A8', // Portfolio
  '#FF3B6E', // SaaS Dashboard
  '#FF6B35', // Pricing
  '#4EC9C0', // Blog
  '#C084FC', // Product
  '#52D65F', // Documentation
]

// ─── CopyButton ───────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border-2 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background transition-colors duration-150 flex-shrink-0"
      style={{ boxShadow: '2px 2px 0 hsl(var(--shadow-color))' }}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

// ─── Preview Components ────────────────────────────────────────────────────────

function LandingPreview() {
  return (
    <div className="p-2 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-primary border border-foreground" />
          <div className="w-8 h-1.5 bg-foreground" />
        </div>
        <div className="flex gap-1">
          <div className="w-6 h-2 bg-primary" />
        </div>
      </div>
      <div className="bg-accent/30 p-3 text-center border border-foreground">
        <div className="w-8 h-1.5 bg-accent mx-auto mb-1" />
        <div className="w-16 h-3 bg-foreground mx-auto mb-1" />
        <div className="w-12 h-1 bg-muted mx-auto mb-2" />
        <div className="flex justify-center gap-1">
          <div className="w-6 h-2 bg-primary" />
          <div className="w-6 h-2 border border-foreground" />
        </div>
      </div>
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
      <div className="flex items-center gap-2 p-2 bg-muted/30">
        <div className="w-8 h-8 rounded-full bg-secondary border-2 border-foreground" />
        <div className="flex-1">
          <div className="w-12 h-2 bg-foreground mb-1" />
          <div className="w-8 h-1 bg-muted" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-5 bg-background border border-foreground p-0.5">
            <div className="w-2 h-2 bg-primary mx-auto" />
          </div>
        ))}
      </div>
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
      <div className="w-8 bg-foreground p-1 space-y-1">
        <div className="w-4 h-1.5 bg-primary" />
        <div className="w-full h-0.5 bg-background/30" />
        <div className="w-full h-0.5 bg-background/30" />
        <div className="w-full h-0.5 bg-background/30" />
      </div>
      <div className="flex-1 p-2 space-y-2">
        <div className="grid grid-cols-3 gap-1">
          <div className="col-span-2 h-5 bg-success/20 border border-foreground p-0.5">
            <div className="w-4 h-1 bg-foreground" />
            <div className="w-6 h-1.5 bg-success mt-0.5" />
          </div>
          <div className="h-5 bg-info/20 border border-foreground p-0.5">
            <div className="w-3 h-1 bg-foreground" />
          </div>
        </div>
        <div className="h-8 bg-muted border border-foreground p-1">
          <div className="flex items-end h-full gap-0.5">
            {[40, 60, 45, 80, 55, 70].map((h, i) => (
              <div key={i} className="flex-1 bg-primary" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
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
      <div className="text-center">
        <div className="w-10 h-1.5 bg-foreground mx-auto mb-1" />
        <div className="w-6 h-1 bg-muted mx-auto" />
      </div>
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
      <div className="flex items-center justify-between">
        <div className="w-4 h-3 bg-foreground" />
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-4 h-1 bg-muted" />
          ))}
        </div>
      </div>
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

function DocsPreview() {
  return (
    <div className="flex flex-col h-full text-[6px]">
      <div className="flex items-center justify-between bg-foreground text-background px-2 py-1 border-b border-background/20">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-primary" />
          <div className="w-6 h-1 bg-background" />
        </div>
        <div className="flex gap-1">
          <div className="w-5 h-1 bg-background/50" />
          <div className="w-5 h-1 bg-background/50" />
          <div className="w-5 h-1 bg-background/50" />
        </div>
        <div className="w-8 h-1.5 bg-primary" />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-10 border-r border-foreground bg-muted/30 p-1 space-y-1 flex-shrink-0">
          <div className="w-full h-0.5 bg-muted-foreground/40" />
          <div className="space-y-0.5">
            <div className="w-full h-1 bg-primary" />
            <div className="w-3/4 h-0.5 bg-muted-foreground/50 pl-1" />
            <div className="w-3/4 h-0.5 bg-muted-foreground/50 pl-1" />
          </div>
          <div className="w-full h-0.5 bg-muted-foreground/40" />
          <div className="space-y-0.5">
            <div className="w-full h-1 bg-foreground" />
            <div className="w-3/4 h-0.5 bg-muted-foreground/50 pl-1" />
            <div className="w-3/4 h-0.5 bg-foreground/70 pl-1" />
            <div className="w-3/4 h-0.5 bg-muted-foreground/50 pl-1" />
          </div>
          <div className="w-full h-0.5 bg-muted-foreground/40" />
          <div className="space-y-0.5">
            <div className="w-full h-1 bg-foreground" />
            <div className="w-3/4 h-0.5 bg-muted-foreground/50 pl-1" />
          </div>
        </div>
        <div className="flex-1 p-1.5 space-y-1 min-w-0">
          <div className="flex items-center gap-0.5 mb-1">
            <div className="w-3 h-0.5 bg-muted-foreground/40" />
            <div className="w-0.5 h-0.5 bg-muted-foreground/40" />
            <div className="w-5 h-0.5 bg-foreground" />
          </div>
          <div className="w-3/4 h-2 bg-foreground" />
          <div className="space-y-0.5">
            <div className="w-full h-0.5 bg-muted-foreground/50" />
            <div className="w-5/6 h-0.5 bg-muted-foreground/50" />
          </div>
          <div className="bg-muted border border-foreground p-1 space-y-0.5">
            <div className="w-8 h-0.5 bg-success" />
            <div className="w-full h-0.5 bg-info/70" />
            <div className="w-3/4 h-0.5 bg-info/70" />
          </div>
          <div className="w-1/2 h-1.5 bg-foreground mt-1" />
          <div className="space-y-0.5">
            <div className="w-full h-0.5 bg-muted-foreground/50" />
            <div className="w-full h-0.5 bg-muted-foreground/50" />
            <div className="w-4/5 h-0.5 bg-muted-foreground/50" />
          </div>
          <div className="grid grid-cols-2 gap-0.5 mt-0.5">
            <div className="bg-primary/10 border border-foreground p-0.5">
              <div className="w-3 h-0.5 bg-primary mb-0.5" />
              <div className="w-full h-0.5 bg-muted-foreground/40" />
            </div>
            <div className="bg-secondary/10 border border-foreground p-0.5">
              <div className="w-3 h-0.5 bg-secondary mb-0.5" />
              <div className="w-full h-0.5 bg-muted-foreground/40" />
            </div>
          </div>
        </div>
        <div className="w-10 border-l border-foreground bg-muted/20 p-1 space-y-0.5 flex-shrink-0">
          <div className="w-full h-0.5 bg-foreground mb-1" />
          <div className="w-full h-0.5 bg-primary" />
          <div className="w-3/4 h-0.5 bg-muted-foreground/50 pl-0.5" />
          <div className="w-3/4 h-0.5 bg-muted-foreground/50 pl-0.5" />
          <div className="w-full h-0.5 bg-muted-foreground/70" />
          <div className="w-3/4 h-0.5 bg-muted-foreground/50 pl-0.5" />
          <div className="w-full h-0.5 bg-muted-foreground/70" />
          <div className="w-3/4 h-0.5 bg-muted-foreground/50 pl-0.5" />
          <div className="w-3/4 h-0.5 bg-muted-foreground/50 pl-0.5" />
        </div>
      </div>
    </div>
  )
}

function ProductPreview() {
  return (
    <div className="p-2 space-y-2">
      <div className="flex gap-1">
        <div className="w-4 h-1 bg-muted" />
        <div className="w-1 h-1 bg-muted" />
        <div className="w-6 h-1 bg-foreground" />
      </div>
      <div className="flex gap-2">
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
  'Documentation Site': DocsPreview,
}

// ─── Template Data ─────────────────────────────────────────────────────────────

const templates = [
  {
    name: 'Landing Page',
    description: 'A complete SaaS landing page with hero, features, pricing, testimonials, and footer sections.',
    features: ['Hero Section', 'Features Grid', 'Pricing Cards', 'Testimonials', 'CTA Section', 'Footer'],
    path: '/templates/landing-page',
    sourceUrl: {
      react: 'https://github.com/ANIBIT14/boldkit/blob/main/src/components/templates/LandingPageTemplate.tsx',
      vue: 'https://github.com/ANIBIT14/boldkit/blob/main/packages/vue/src/components/templates/LandingPageTemplate.vue',
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
</template>`,
    } as Record<string, string>,
  },
  {
    name: 'Portfolio',
    description: 'A professional portfolio template with hero, services, experience timeline, projects, testimonials, and contact sections.',
    features: ['Hero with Avatar', 'Services Grid', 'Experience Timeline', 'Project Showcase', 'Testimonials', 'Contact Form'],
    path: '/templates/portfolio',
    sourceUrl: {
      react: 'https://github.com/ANIBIT14/boldkit/blob/main/src/components/templates/PortfolioTemplate.tsx',
      vue: 'https://github.com/ANIBIT14/boldkit/blob/main/packages/vue/src/components/templates/PortfolioTemplate.vue',
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
</template>`,
    } as Record<string, string>,
  },
  {
    name: 'SaaS Dashboard',
    description: 'An admin panel with dark sidebar, stats grid, charts, activity feed, and data tables.',
    features: ['Stats Grid', 'Charts', 'Activity Feed', 'Data Table', 'Sidebar Nav', 'Pagination'],
    path: '/templates/dashboard',
    sourceUrl: {
      react: 'https://github.com/ANIBIT14/boldkit/blob/main/src/components/templates/DashboardTemplate.tsx',
      vue: 'https://github.com/ANIBIT14/boldkit/blob/main/packages/vue/src/components/templates/DashboardTemplate.vue',
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
</template>`,
    } as Record<string, string>,
  },
  {
    name: 'Pricing',
    description: 'A 3-tier pricing page with feature comparison table, FAQ accordion, and social proof.',
    features: ['3-Tier Cards', 'Monthly/Yearly Toggle', 'Feature Comparison', 'FAQ Section', 'Logo Marquee', 'Contact CTA'],
    path: '/templates/pricing',
    sourceUrl: {
      react: 'https://github.com/ANIBIT14/boldkit/blob/main/src/components/templates/PricingTemplate.tsx',
      vue: 'https://github.com/ANIBIT14/boldkit/blob/main/packages/vue/src/components/templates/PricingTemplate.vue',
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
</template>`,
    } as Record<string, string>,
  },
  {
    name: 'Blog',
    description: 'An editorial magazine-style blog with asymmetric grids, featured articles, and newsletter signup.',
    features: ['Featured Hero', 'Article Grid', 'Sidebar', 'Newsletter', 'Category Nav', 'Pagination'],
    path: '/templates/blog',
    sourceUrl: {
      react: 'https://github.com/ANIBIT14/boldkit/blob/main/src/components/templates/BlogTemplate.tsx',
      vue: 'https://github.com/ANIBIT14/boldkit/blob/main/packages/vue/src/components/templates/BlogTemplate.vue',
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
</template>`,
    } as Record<string, string>,
  },
  {
    name: 'Product',
    description: 'An e-commerce product page with image gallery, variant selectors, reviews, and related products.',
    features: ['Image Gallery', 'Color/Size Selectors', 'Reviews', 'Related Products', 'Sticky Cart', 'Trust Badges'],
    path: '/templates/product',
    sourceUrl: {
      react: 'https://github.com/ANIBIT14/boldkit/blob/main/src/components/templates/ProductTemplate.tsx',
      vue: 'https://github.com/ANIBIT14/boldkit/blob/main/packages/vue/src/components/templates/ProductTemplate.vue',
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
</template>`,
    } as Record<string, string>,
  },
  {
    name: 'Documentation Site',
    description: 'A full-featured documentation site with sticky header, collapsible sidebar nav, MDX-ready content area with code blocks, and a sticky table of contents.',
    features: ['Sticky Header', 'Sidebar Nav', 'Code Blocks', 'Table of Contents', 'Breadcrumbs', 'Prev / Next Nav'],
    path: '/templates/docs',
    sourceUrl: {
      react: 'https://github.com/ANIBIT14/boldkit/blob/main/src/components/templates/DocsTemplate.tsx',
      vue: 'https://github.com/ANIBIT14/boldkit/blob/main/packages/vue/src/components/templates/DocsTemplate.vue',
    } as Record<string, string>,
    code: {
      react: `import { DocsTemplate } from '@/components/templates/DocsTemplate'

export default function Page() {
  return <DocsTemplate />
}`,
      vue: `<script setup lang="ts">
import DocsTemplate from '@/components/templates/DocsTemplate.vue'
</script>

<template>
  <DocsTemplate />
</template>`,
    } as Record<string, string>,
  },
]

function getTemplateCode(template: (typeof templates)[number], framework: Framework) {
  if (framework !== 'svelte') {
    return template.code[framework]
  }

  const componentName = template.name
    .split(/\s+/)
    .map((part) => part.replace(/[^a-zA-Z0-9]/g, ''))
    .filter(Boolean)
    .join('')

  return `<script lang="ts">
  import ${componentName}Template from '$lib/components/templates/${componentName}Template.svelte'
</script>

<${componentName}Template />`
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export function Templates() {
  const { framework } = useFramework()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        .tmpl-syne { font-family: 'Syne', system-ui, sans-serif; }

        /* Header is always dark regardless of light/dark mode */
        .tmpl-hero {
          background-color: hsl(240 12% 9%);
          color: hsl(60 9% 96%);
        }
        .tmpl-hero-muted  { color: rgba(248, 246, 238, 0.45); }
        .tmpl-hero-subtle { color: rgba(248, 246, 238, 0.2);  }

        /* Code block always dark */
        .tmpl-code {
          background-color: hsl(220 16% 11%);
          color: hsl(60 9% 88%);
        }

        /* Marquee animation */
        @keyframes tmpl-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .tmpl-marquee { animation: tmpl-marquee 30s linear infinite; }

        /* Preview frame hover */
        .tmpl-frame {
          box-shadow: 8px 8px 0 hsl(var(--shadow-color));
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .tmpl-frame:hover {
          transform: translateY(-5px);
          box-shadow: 10px 14px 0 hsl(var(--shadow-color));
        }
      `}</style>

      <SEO {...pageSEO.templates} />
      <Layout>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <header className="tmpl-syne tmpl-hero border-b-3 border-foreground overflow-hidden relative">
          {/* Dot grid — always white on dark header */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="container relative mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10">
            {/* Eyebrow */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-7">
              <span className="tmpl-hero-muted border border-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em]">
                BoldKit v2.5
              </span>
              <span className="tmpl-hero-subtle text-sm">·</span>
              <span className="tmpl-hero-muted text-[10px] font-black uppercase tracking-[0.22em]">
                100% Free
              </span>
            </div>

            {/* Headline */}
            <h1
              className="tmpl-syne font-black uppercase leading-[0.88] tracking-tight mb-5"
              style={{ fontSize: 'clamp(48px, 11vw, 140px)' }}
            >
              Page<br />Templates
            </h1>

            {/* Accent rule */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[3px] w-16 sm:w-20 bg-[#FFE400]" />
              <span className="tmpl-hero-muted text-[10px] font-black uppercase tracking-[0.22em]">
                7 templates — React + Vue 3 + Svelte
              </span>
            </div>

            <p className="tmpl-hero-muted text-sm sm:text-base max-w-sm sm:max-w-lg mb-8 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
              Ready-to-use neubrutalism layouts. Copy the import, customize everything.
              No attribution required.
            </p>

            {/* Reset text color so toggle's bg-background reads correctly in light mode */}
            <div style={{ color: 'hsl(var(--foreground))' }}>
              <FrameworkToggle />
            </div>
          </div>

          {/* Scrolling marquee */}
          <div className="border-t border-white/10 py-3 overflow-hidden">
            <div className="flex whitespace-nowrap tmpl-marquee">
              {[...templates, ...templates, ...templates].map((t, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-4 px-4 text-[9px] font-black uppercase tracking-[0.3em] tmpl-hero-subtle"
                >
                  {t.name}
                  <span style={{ color: ACCENT_COLORS[i % ACCENT_COLORS.length], opacity: 0.5 }}>◆</span>
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* ── CATALOG ──────────────────────────────────────────────── */}
        <div className="tmpl-syne">
          {templates.map((template, index) => {
            const accent = ACCENT_COLORS[index % ACCENT_COLORS.length]
            const isEven = index % 2 === 0
            const PreviewComp = previewComponents[template.name]
            const templateCode = getTemplateCode(template, framework)

            return (
              <section
                key={template.name}
                className="border-b-3 border-foreground relative overflow-hidden"
                style={{ borderLeft: `5px solid ${accent}` }}
              >
                {/* Ghost index numeral — decorative, behind content */}
                <div
                  aria-hidden="true"
                  className="absolute pointer-events-none select-none font-black text-foreground"
                  style={{
                    fontSize: 'clamp(80px, 16vw, 180px)',
                    opacity: 0.05,
                    top: '-0.05em',
                    right: '0.05em',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    zIndex: 0,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Main content — always above ghost numeral */}
                <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-16 relative" style={{ zIndex: 1 }}>
                  <div
                    className={`flex flex-col gap-8 sm:gap-10 lg:gap-12 lg:items-start ${
                      isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >

                    {/* ── INFO PANEL ── always above preview in stacking order */}
                    <div className="w-full lg:w-[46%] flex-shrink-0 min-w-0 relative" style={{ zIndex: 2 }}>

                      {/* Counter */}
                      <div className="flex items-center gap-3 mb-4 sm:mb-5">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">
                          {String(index + 1).padStart(2, '0')} / {String(templates.length).padStart(2, '0')}
                        </span>
                        <div className="flex-1 h-px bg-border/40" />
                        <div className="w-2 h-2 border-2 border-foreground/20" style={{ backgroundColor: accent }} />
                      </div>

                      {/* Template name */}
                      <h2
                        className="font-black uppercase leading-tight mb-3 text-foreground break-words"
                        style={{
                          fontSize: 'clamp(24px, 3.5vw, 42px)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {template.name}
                      </h2>

                      {/* Accent underline */}
                      <div className="h-[3px] w-10 mb-4 sm:mb-5" style={{ backgroundColor: accent }} />

                      {/* Description */}
                      <p
                        className="text-muted-foreground leading-relaxed mb-5 sm:mb-6 text-sm sm:text-base"
                        style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}
                      >
                        {template.description}
                      </p>

                      {/* Feature tags */}
                      <div className="mb-5 sm:mb-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground mb-2.5">
                          Includes
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {template.features.map((feat) => (
                            <span
                              key={feat}
                              className="px-2 py-1 text-[10px] font-black uppercase tracking-wide border-2 border-foreground bg-background text-foreground"
                              style={{ boxShadow: '2px 2px 0 hsl(var(--shadow-color))' }}
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Code block */}
                      <div className="mb-5 sm:mb-6">
                        <div className="flex items-center justify-between mb-2 gap-2">
                          <span className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground min-w-0 truncate">
                            {frameworkLabels[framework]} Usage
                          </span>
                          <CopyButton text={templateCode} />
                        </div>
                        <pre
                          className="tmpl-code border-3 border-foreground p-3 sm:p-4 text-[11px] leading-relaxed overflow-x-auto"
                          style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace" }}
                        >
                          <code>{templateCode}</code>
                        </pre>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        <Button asChild className="gap-2">
                          <a href={template.path} target="_blank" rel="noopener noreferrer">
                            Live Preview <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                        <Button variant="outline" asChild className="gap-2">
                          <a href={template.sourceUrl[framework] || template.sourceUrl.react} target="_blank" rel="noopener noreferrer">
                            View Source <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* ── PREVIEW PANEL ── */}
                    <div className="w-full lg:flex-1 min-w-0">
                      <div className="border-3 border-foreground tmpl-frame overflow-hidden">
                        {/* Browser chrome */}
                        <div
                          className="px-3 py-2 flex items-center gap-2 border-b-2 border-foreground"
                          style={{ backgroundColor: 'hsl(240 12% 12%)' }}
                        >
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
                            <div className="w-2.5 h-2.5 rounded-full bg-warning" />
                            <div className="w-2.5 h-2.5 rounded-full bg-success" />
                          </div>
                          <div
                            className="flex-1 mx-2 h-5 flex items-center px-2 overflow-hidden min-w-0"
                            style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
                          >
                            <span
                              className="truncate"
                              style={{
                                fontSize: '9px',
                                fontFamily: "'JetBrains Mono', monospace",
                                color: 'rgba(255,255,255,0.35)',
                              }}
                            >
                              boldkit.dev{template.path}
                            </span>
                          </div>
                        </div>

                        {/* Preview wireframe */}
                        <div className="aspect-video bg-background overflow-hidden">
                          {PreviewComp ? (
                            <PreviewComp />
                          ) : (
                            <div className="h-full flex items-center justify-center">
                              <span className="text-muted-foreground text-xs font-black uppercase tracking-widest">
                                Preview
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Label below frame */}
                      <div className="flex items-center gap-2 mt-2.5">
                        <div className="w-1.5 h-1.5 flex-shrink-0" style={{ backgroundColor: accent }} />
                        <span className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground truncate">
                          {template.name} — Layout Preview
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            )
          })}
        </div>

        {/* ── COMING SOON ──────────────────────────────────────────── */}
        <div className="tmpl-syne bg-muted/40 border-b-3 border-foreground">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">

              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-3 sm:mb-4 block">
                  Upcoming — v2.6.0 Blocks Release
                </span>
                <h3
                  className="font-black uppercase leading-none mb-4 sm:mb-5 text-foreground"
                  style={{ fontSize: 'clamp(24px, 4.5vw, 44px)', letterSpacing: '-0.02em' }}
                >
                  More Templates<br />Coming Soon
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Auth Forms', 'Error Pages', 'Settings Page', 'Onboarding Flow', 'Invoice'].map((name, i) => (
                    <span
                      key={name}
                      className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wide border-2 border-foreground/30 text-muted-foreground"
                      style={{
                        borderStyle: 'dashed',
                        borderLeftWidth: '3px',
                        borderLeftStyle: 'solid',
                        borderLeftColor: ACCENT_COLORS[i % ACCENT_COLORS.length],
                      }}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0">
                <Button variant="outline" asChild className="gap-2">
                  <a
                    href="https://github.com/ANIBIT14/boldkit/issues/new?title=Template%20Request&body=I%20would%20like%20a%20template%20for..."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Request a Template <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

            </div>
          </div>
        </div>

      </Layout>
    </>
  )
}

export default Templates
