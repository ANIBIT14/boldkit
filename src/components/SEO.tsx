import { useEffect } from 'react'

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
  structuredData?: Record<string, any>
}

const defaultMeta = {
  title: 'BoldKit - Neubrutalism UI Components for React & Vue 3',
  description: 'Free neubrutalism component library for React and Vue 3 with 50+ UI components, 10 chart types, and 42 SVG shapes. Built on shadcn/ui with thick borders, hard shadows, and bold colors.',
  keywords: 'neubrutalism, neubrutalism ui, React components, Vue 3 components, shadcn, shadcn-vue, Tailwind CSS, TypeScript, UI library, charts, data visualization',
  ogImage: 'https://ik.imagekit.io/fincalfy/304a4c07-8de1-41af-813e-e7556234b973.png',
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
    // Update title
    const fullTitle = title
      ? `${title} | BoldKit`
      : defaultMeta.title
    document.title = fullTitle

    // Update meta tags
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

    // Standard meta tags
    updateMeta('description', description || defaultMeta.description)
    updateMeta('keywords', keywords || defaultMeta.keywords)
    updateMeta('author', 'Aniruddha Agarwal')
    updateMeta('rating', 'general')
    updateMeta('distribution', 'global')

    // Robots
    if (noIndex) {
      updateMeta('robots', 'noindex, nofollow')
    } else {
      updateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    }

    // Open Graph
    updateMeta('og:title', fullTitle, true)
    updateMeta('og:description', description || defaultMeta.description, true)
    updateMeta('og:type', ogType, true)
    updateMeta('og:image', ogImage || defaultMeta.ogImage, true)
    updateMeta('og:site_name', defaultMeta.siteName, true)
    updateMeta('og:locale', 'en_US', true)

    if (canonical) {
      updateMeta('og:url', canonical, true)

      // Update canonical link
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
      if (link) {
        link.href = canonical
      } else {
        link = document.createElement('link')
        link.rel = 'canonical'
        link.href = canonical
        document.head.appendChild(link)
      }
    }

    // Twitter
    updateMeta('twitter:card', 'summary_large_image')
    updateMeta('twitter:title', fullTitle)
    updateMeta('twitter:description', description || defaultMeta.description)
    updateMeta('twitter:image', ogImage || defaultMeta.ogImage)
    updateMeta('twitter:creator', defaultMeta.twitterCreator)

    // Helper to manage JSON-LD scripts
    const updateJsonLd = (id: string, schema: object) => {
      const existingScript = document.querySelector(`script[data-schema="${id}"]`)
      if (existingScript) {
        existingScript.remove()
      }

      if (schema) {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.setAttribute('data-schema', id)
        script.textContent = JSON.stringify(schema)
        document.head.appendChild(script)
      }
    }

    // Breadcrumb Schema
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

    // FAQ Schema
    if (faq && faq.length > 0) {
      updateJsonLd('faq', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      })
    }

    // Custom Structured Data
    if (structuredData) {
      updateJsonLd('custom', structuredData)
    }

  }, [title, description, keywords, canonical, ogImage, ogType, noIndex, breadcrumbs, faq, structuredData])

  return null
}

// Preset SEO configurations for common pages
export const pageSEO = {
  home: {
    title: undefined, // Uses default
    description: 'Free neubrutalism component library for React and Vue 3 with 50+ UI components, 10 chart types, and 42 SVG shapes. Built on shadcn/ui with thick borders, hard shadows, and bold colors. Install via CLI.',
    keywords: 'neubrutalism, neubrutalism ui, neubrutalism components, brutalist design, React UI library, Vue 3 components, shadcn components, shadcn-vue, Tailwind CSS, TypeScript, charts, spinners, steppers',
    canonical: 'https://boldkit.dev/',
    breadcrumbs: [{ name: 'Home' }],
  },
  docs: {
    title: 'Documentation',
    description: 'Learn how to install and use BoldKit neubrutalism components in your React or Vue 3 project. Comprehensive guides, API references, and examples for both frameworks.',
    keywords: 'BoldKit documentation, React component docs, Vue 3 component docs, neubrutalism guide, installation guide',
    canonical: 'https://boldkit.dev/docs',
    breadcrumbs: [
      { name: 'Home', url: 'https://boldkit.dev/' },
      { name: 'Documentation' },
    ],
  },
  installation: {
    title: 'Installation',
    description: 'Install BoldKit neubrutalism components using shadcn CLI for React or shadcn-vue for Vue 3. Step-by-step installation guide for TypeScript and Tailwind CSS projects.',
    keywords: 'BoldKit installation, shadcn CLI install, shadcn-vue install, React component setup, Vue 3 setup, npm install',
    canonical: 'https://boldkit.dev/docs/installation',
    breadcrumbs: [
      { name: 'Home', url: 'https://boldkit.dev/' },
      { name: 'Documentation', url: 'https://boldkit.dev/docs' },
      { name: 'Installation' },
    ],
  },
  components: {
    title: 'Components',
    description: 'Browse 50+ neubrutalism components for React and Vue 3. Buttons, cards, inputs, dialogs, spinners, steppers, dropzones and more with thick borders and hard shadows.',
    keywords: 'React components, Vue 3 components, UI components, neubrutalism buttons, neubrutalism cards, form components, spinner, stepper, dropzone, stat card, kbd',
    canonical: 'https://boldkit.dev/components',
    breadcrumbs: [
      { name: 'Home', url: 'https://boldkit.dev/' },
      { name: 'Components' },
    ],
  },
  shapes: {
    title: '42 Neubrutalism SVG Shapes',
    description: 'Collection of 42 unique neubrutalism SVG shapes for React and Vue 3. Bursts, hearts, stars, badges, celestial, and decorative shapes with thick borders.',
    keywords: 'SVG shapes, neubrutalism shapes, React SVG components, Vue 3 SVG components, decorative shapes, badges, stickers',
    canonical: 'https://boldkit.dev/shapes',
    breadcrumbs: [
      { name: 'Home', url: 'https://boldkit.dev/' },
      { name: 'Shapes' },
    ],
  },
  charts: {
    title: 'Charts - 10 Neubrutalism Chart Types',
    description: 'Neubrutalism styled charts and data visualization for React and Vue 3. 10 chart types including bar, line, area, pie, donut, radar, radial bar, gauge, and sparkline charts.',
    keywords: 'React charts, Vue 3 charts, neubrutalism charts, data visualization, chart components, Recharts, vue-echarts, gauge chart, radar chart, donut chart, sparkline, radial bar chart',
    canonical: 'https://boldkit.dev/charts',
    breadcrumbs: [
      { name: 'Home', url: 'https://boldkit.dev/' },
      { name: 'Charts' },
    ],
  },
  themes: {
    title: 'Theme Builder',
    description: 'Customize BoldKit neubrutalism theme colors for React and Vue 3. Generate CSS variables for your design system with live preview.',
    keywords: 'theme builder, color picker, CSS variables, design tokens, neubrutalism colors, React theming, Vue 3 theming',
    canonical: 'https://boldkit.dev/themes',
    breadcrumbs: [
      { name: 'Home', url: 'https://boldkit.dev/' },
      { name: 'Theme Builder' },
    ],
  },
  templates: {
    title: 'Free Page Templates',
    description: 'Free neubrutalism page templates for React and Vue 3. Landing pages, portfolios, and more. Copy, paste, and customize for your project.',
    keywords: 'page templates, landing page template, portfolio template, React templates, Vue 3 templates, neubrutalism templates',
    canonical: 'https://boldkit.dev/templates',
    breadcrumbs: [
      { name: 'Home', url: 'https://boldkit.dev/' },
      { name: 'Templates' },
    ],
  },
}

// Component-specific SEO generator
export function getComponentSEO(componentName: string, componentTitle: string) {
  return {
    title: `${componentTitle} - Neubrutalism Component for React & Vue 3`,
    description: `${componentTitle} component with neubrutalism styling for React and Vue 3. Thick borders, hard shadows, and bold colors. Install via shadcn CLI for React or shadcn-vue for Vue.`,
    keywords: `${componentTitle} component, React ${componentTitle}, Vue 3 ${componentTitle}, neubrutalism ${componentTitle}, shadcn ${componentTitle}`,
    canonical: `https://boldkit.dev/components/${componentName}`,
    breadcrumbs: [
      { name: 'Home', url: 'https://boldkit.dev/' },
      { name: 'Components', url: 'https://boldkit.dev/components' },
      { name: componentTitle },
    ],
  }
}

// Helper to create breadcrumbs for any page
export function createBreadcrumbs(...items: Array<{ name: string; path?: string }>): BreadcrumbItem[] {
  return items.map((item, index) => ({
    name: item.name,
    // Don't add URL to the last item (current page)
    ...(index < items.length - 1 && item.path && { url: `https://boldkit.dev${item.path}` }),
  }))
}
