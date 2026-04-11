import { useEffect } from 'react'
import {
  COUNTS,
  DEFAULT_OG_IMAGE,
  SITE_URL,
  getComponentMeta,
  getBlockMeta,
  getTemplateMeta,
} from '@/config/routes-meta'

export interface BreadcrumbItem {
  name: string
  url?: string
}

export interface FAQItem {
  question: string
  answer: string
}

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noIndex?: boolean
  breadcrumbs?: BreadcrumbItem[]
  faq?: FAQItem[]
  structuredData?: Record<string, unknown>
}

const defaultMeta = {
  title: 'BoldKit — Neubrutalism UI for React & Vue 3',
  description: `Free neubrutalism component library for React and Vue 3 with ${COUNTS.components}+ UI components, ${COUNTS.blocks} section blocks, ${COUNTS.templates} templates, ${COUNTS.shapes} animated SVG shapes, and ${COUNTS.charts} chart types. Built on shadcn/ui with thick borders, hard shadows, and bold colors.`,
  ogImage: DEFAULT_OG_IMAGE,
  twitterCreator: '@boldkitdev',
  siteName: 'BoldKit',
}

export function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  noIndex = false,
  breadcrumbs,
  faq,
  structuredData,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | BoldKit` : defaultMeta.title
    document.title = fullTitle

    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement
      if (meta) {
        meta.content = content
      } else {
        meta = document.createElement('meta')
        meta.setAttribute(attr, name)
        meta.content = content
        document.head.appendChild(meta)
      }
    }

    updateMeta('description', description || defaultMeta.description)
    if (keywords) updateMeta('keywords', keywords)
    updateMeta('author', 'Aniruddha Agarwal')

    if (noIndex) {
      updateMeta('robots', 'noindex, nofollow')
    } else {
      updateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    }

    updateMeta('og:title', fullTitle, true)
    updateMeta('og:description', description || defaultMeta.description, true)
    updateMeta('og:type', ogType, true)
    updateMeta('og:image', ogImage || defaultMeta.ogImage, true)
    updateMeta('og:site_name', defaultMeta.siteName, true)
    updateMeta('og:locale', 'en_US', true)

    const pageUrl = canonical || `${SITE_URL}${window.location.pathname}`
    updateMeta('og:url', pageUrl, true)

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (canonical) {
      if (link) {
        link.href = canonical
      } else {
        link = document.createElement('link')
        link.rel = 'canonical'
        link.href = canonical
        document.head.appendChild(link)
      }
    }

    updateMeta('twitter:card', 'summary_large_image')
    updateMeta('twitter:url', pageUrl)
    updateMeta('twitter:title', fullTitle)
    updateMeta('twitter:description', description || defaultMeta.description)
    updateMeta('twitter:image', ogImage || defaultMeta.ogImage)
    updateMeta('twitter:creator', defaultMeta.twitterCreator)

    const updateJsonLd = (id: string, schema: object) => {
      const existingScript = document.querySelector(`script[data-schema="${id}"]`)
      if (existingScript) existingScript.remove()
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-schema', id)
      try {
        script.textContent = JSON.stringify(schema)
      } catch {
        // skip invalid structured data
      }
      document.head.appendChild(script)
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      updateJsonLd('breadcrumb', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          ...(item.url && { item: item.url }),
        })),
      })
    }

    if (faq && faq.length > 0) {
      updateJsonLd('faq', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      })
    }

    if (structuredData) {
      updateJsonLd('custom', structuredData)
    }
  }, [title, description, keywords, canonical, ogImage, ogType, noIndex, breadcrumbs, faq, structuredData])

  return null
}

// Preset SEO configurations for common pages
export const pageSEO = {
  home: {
    title: undefined as string | undefined,
    description: defaultMeta.description,
    canonical: `${SITE_URL}/`,
    breadcrumbs: [{ name: 'Home' }] as BreadcrumbItem[],
  },
  docs: {
    title: 'Documentation',
    description: 'Learn how to install and use BoldKit neubrutalism components in your React or Vue 3 project. Comprehensive guides, API references, and examples for both frameworks.',
    canonical: `${SITE_URL}/docs`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Documentation' },
    ] as BreadcrumbItem[],
  },
  installation: {
    title: 'Installation',
    description: 'Install BoldKit neubrutalism components using shadcn CLI for React or shadcn-vue for Vue 3. Step-by-step installation guide for TypeScript and Tailwind CSS projects.',
    canonical: `${SITE_URL}/docs/installation`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Documentation', url: `${SITE_URL}/docs` },
      { name: 'Installation' },
    ] as BreadcrumbItem[],
  },
  shapes: {
    title: `${COUNTS.shapes} Neubrutalism SVG Shapes`,
    description: `Collection of ${COUNTS.shapes} unique neubrutalism SVG shapes for React and Vue 3. Bursts, hearts, stars, badges, celestial, and decorative shapes with thick borders.`,
    canonical: `${SITE_URL}/shapes`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Shapes' },
    ] as BreadcrumbItem[],
  },
  charts: {
    title: `Charts — ${COUNTS.charts} Neubrutalism Chart Types`,
    description: `Neubrutalism styled charts for React and Vue 3. ${COUNTS.charts} chart types including bar, line, area, pie, donut, radar, radial bar, gauge, sparkline, funnel, treemap, heatmap, and sankey.`,
    canonical: `${SITE_URL}/charts`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Charts' },
    ] as BreadcrumbItem[],
  },
  themes: {
    title: 'Theme Builder',
    description: 'Customize BoldKit neubrutalism theme colors for React and Vue 3. Generate CSS variables for your design system with live preview.',
    canonical: `${SITE_URL}/themes`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Theme Builder' },
    ] as BreadcrumbItem[],
  },
  templates: {
    title: 'Free Page Templates',
    description: `Free neubrutalism page templates for React and Vue 3. ${COUNTS.templates} full-page templates: landing pages, portfolios, dashboards, pricing, blog, product, and docs.`,
    canonical: `${SITE_URL}/templates`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Templates' },
    ] as BreadcrumbItem[],
  },
  blocks: {
    title: `Section Blocks — ${COUNTS.blocks} Marketing & Application Blocks`,
    description: `Free neubrutalism section blocks for React and Vue 3. 10 marketing blocks (hero, features, testimonials, CTA, stats, team, FAQ, footer, contact, logo cloud) and 5 application blocks (auth forms, settings, onboarding, error pages, invoice).`,
    canonical: `${SITE_URL}/blocks`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Blocks' },
    ] as BreadcrumbItem[],
  },
}

// Component-specific SEO generator
export function getComponentSEO(componentSlug: string, componentTitle?: string) {
  const meta = getComponentMeta(componentSlug)
  return {
    title: meta.title.replace(' | BoldKit', ''),
    description: meta.description,
    canonical: meta.canonical,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Components', url: `${SITE_URL}/components` },
      { name: componentTitle ?? componentSlug },
    ] as BreadcrumbItem[],
  }
}

// Block-specific SEO generator
export function getBlockSEO(blockSlug: string, blockTitle?: string) {
  const meta = getBlockMeta(blockSlug)
  return {
    title: meta.title.replace(' | BoldKit', ''),
    description: meta.description,
    canonical: meta.canonical,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Blocks', url: `${SITE_URL}/blocks` },
      { name: blockTitle ?? blockSlug },
    ] as BreadcrumbItem[],
  }
}

// Template-specific SEO generator
export function getTemplateSEO(templateSlug: string, templateTitle?: string) {
  const meta = getTemplateMeta(templateSlug)
  return {
    title: meta.title.replace(' | BoldKit', ''),
    description: meta.description,
    canonical: meta.canonical,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Templates', url: `${SITE_URL}/templates` },
      { name: templateTitle ?? templateSlug },
    ] as BreadcrumbItem[],
  }
}

export function createBreadcrumbs(...items: Array<{ name: string; path?: string }>): BreadcrumbItem[] {
  return items.map((item, index) => ({
    name: item.name,
    ...(index < items.length - 1 && item.path && { url: `${SITE_URL}${item.path}` }),
  }))
}
