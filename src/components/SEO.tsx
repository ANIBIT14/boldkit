import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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
  const { pathname } = useLocation()

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

    const pageUrl = canonical || `${SITE_URL}${pathname}`
    updateMeta('og:url', pageUrl, true)

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (link) {
      link.href = pageUrl
    } else {
      link = document.createElement('link')
      link.rel = 'canonical'
      link.href = pageUrl
      document.head.appendChild(link)
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
      try {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.setAttribute('data-schema', id)
        script.textContent = JSON.stringify(schema)
        document.head.appendChild(script)
      } catch {
        // skip invalid structured data
      }
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
  }, [title, description, keywords, canonical, ogImage, ogType, noIndex, breadcrumbs, faq, structuredData, pathname])

  return null
}

// Preset SEO configurations for common pages
export const pageSEO = {
  home: {
    title: undefined,
    description: defaultMeta.description,
    canonical: `${SITE_URL}/`,
    breadcrumbs: [{ name: 'Home' }],
  },
  docs: {
    title: 'Documentation',
    description: 'Learn how to install and use BoldKit neubrutalism components in your React or Vue 3 project. Comprehensive guides, API references, and examples for both frameworks.',
    canonical: `${SITE_URL}/docs`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Documentation' },
    ],
  },
  installation: {
    title: 'Installation',
    description: 'Install BoldKit neubrutalism components using shadcn CLI for React or shadcn-vue for Vue 3. Step-by-step installation guide for TypeScript and Tailwind CSS projects.',
    canonical: `${SITE_URL}/docs/installation`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Documentation', url: `${SITE_URL}/docs` },
      { name: 'Installation' },
    ],
  },
  asciiShapes: {
    title: 'ASCII Shape Animations',
    description: 'Animated ASCII art components for React and Vue 3. 7 animations with 5 character sets and 4 sizes — SSR-safe.',
    canonical: `${SITE_URL}/ascii-shapes`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'ASCII Shapes' },
    ],
  },
  shapes: {
    title: `${COUNTS.shapes} Neubrutalism SVG Shapes`,
    description: `Collection of ${COUNTS.shapes} unique neubrutalism SVG shapes for React and Vue 3. Bursts, hearts, stars, badges, celestial, and decorative shapes with thick borders.`,
    canonical: `${SITE_URL}/shapes`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Shapes' },
    ],
  },
  charts: {
    title: `Charts — ${COUNTS.charts} Neubrutalism Chart Types`,
    description: `Neubrutalism styled charts for React and Vue 3. ${COUNTS.charts} chart types including bar, line, area, pie, donut, radar, radial bar, gauge, sparkline, funnel, treemap, heatmap, and sankey.`,
    canonical: `${SITE_URL}/charts`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Charts' },
    ],
  },
  themes: {
    title: 'Theme Builder',
    description: 'Customize BoldKit neubrutalism theme colors for React and Vue 3. Generate CSS variables for your design system with live preview.',
    canonical: `${SITE_URL}/themes`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Theme Builder' },
    ],
  },
  templates: {
    title: 'Free Page Templates',
    description: `Free neubrutalism page templates for React and Vue 3. ${COUNTS.templates} full-page templates: landing pages, portfolios, dashboards, pricing, blog, product, and docs.`,
    canonical: `${SITE_URL}/templates`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Templates' },
    ],
  },
  blocks: {
    title: `Section Blocks — ${COUNTS.blocks} Marketing & Application Blocks`,
    description: `Free neubrutalism section blocks for React and Vue 3. 10 marketing blocks (hero, features, testimonials, CTA, stats, team, FAQ, footer, contact, logo cloud) and 5 application blocks (auth forms, settings, onboarding, error pages, invoice).`,
    canonical: `${SITE_URL}/blocks`,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Blocks' },
    ],
  },
  studio: {
    title: 'Dot Matrix Studio — Pixel Art & Animation Editor',
    description: 'Free in-browser dot matrix animation editor. Draw pixel art, build frame-by-frame animations with 8 presets, and export to WebM video, PNG, SVG, or JSON. No installs required.',
    canonical: `${SITE_URL}/studio`,
    keywords: 'dot matrix, pixel art editor, animation editor, frame animation, WebM export, pixel art tool, neubrutalism',
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Dot Matrix Studio' },
    ],
  },
  canvasEffects: {
    title: 'Canvas Effects — 10 Animated Canvas Components',
    description: 'Free animated canvas components for React, Vue 3, and Nuxt 3. 10 zero-dependency effects: Aurora, Flow Field, Plasma, Metaballs, Matrix Rain, Particle Web, Lissajous Grid, and more. Fully typed with customisable props.',
    canonical: `${SITE_URL}/canvas-effects`,
    keywords: 'canvas animation, react canvas, vue canvas, animated background, aurora effect, particle web, flow field, plasma waves, metaballs, matrix rain, neubrutalism',
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Canvas Effects' },
    ],
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
    ],
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
    ],
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
    ],
  }
}

export function createBreadcrumbs(...items: Array<{ name: string; path?: string }>): BreadcrumbItem[] {
  return items.map((item, index) => ({
    name: item.name,
    ...(index < items.length - 1 && item.path && { url: `${SITE_URL}${item.path}` }),
  }))
}
