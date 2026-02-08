import { useEffect } from 'react'

export interface BreadcrumbItem {
  name: string
  url?: string
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
}

const defaultMeta = {
  title: 'BoldKit - Neubrutalism UI Components for React & Vue 3',
  description: 'Free neubrutalism component library for React and Vue 3 with 45+ UI components and 35 SVG shapes. Built on shadcn/ui with thick borders, hard shadows, and bold colors.',
  keywords: 'neubrutalism, neubrutalism ui, React components, Vue 3 components, shadcn, shadcn-vue, Tailwind CSS, TypeScript, UI library',
  ogImage: 'https://ik.imagekit.io/fincalfy/304a4c07-8de1-41af-813e-e7556234b973.png',
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

    // Robots
    if (noIndex) {
      updateMeta('robots', 'noindex, nofollow')
    } else {
      updateMeta('robots', 'index, follow, max-image-preview:large')
    }

    // Open Graph
    updateMeta('og:title', fullTitle, true)
    updateMeta('og:description', description || defaultMeta.description, true)
    updateMeta('og:type', ogType, true)
    updateMeta('og:image', ogImage || defaultMeta.ogImage, true)

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
    updateMeta('twitter:title', fullTitle)
    updateMeta('twitter:description', description || defaultMeta.description)
    updateMeta('twitter:image', ogImage || defaultMeta.ogImage)

    // JSON-LD Breadcrumb Schema
    const existingJsonLd = document.querySelector('script[data-schema="breadcrumb"]')
    if (existingJsonLd) {
      existingJsonLd.remove()
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      const jsonLdSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          ...(item.url && { item: item.url }),
        })),
      }

      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-schema', 'breadcrumb')
      script.textContent = JSON.stringify(jsonLdSchema)
      document.head.appendChild(script)
    }

  }, [title, description, keywords, canonical, ogImage, ogType, noIndex, breadcrumbs])

  return null
}

// Preset SEO configurations for common pages
export const pageSEO = {
  home: {
    title: undefined, // Uses default
    description: 'Free neubrutalism component library for React and Vue 3 with 45+ UI components and 35 SVG shapes. Built on shadcn/ui with thick borders, hard shadows, and bold colors. Install via CLI.',
    keywords: 'neubrutalism, neubrutalism ui, neubrutalism components, brutalist design, React UI library, Vue 3 components, shadcn components, shadcn-vue, Tailwind CSS, TypeScript',
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
    description: 'Browse 45+ neubrutalism components for React and Vue 3. Buttons, cards, inputs, dialogs, and more with thick borders and hard shadows.',
    keywords: 'React components, Vue 3 components, UI components, neubrutalism buttons, neubrutalism cards, form components',
    canonical: 'https://boldkit.dev/components',
    breadcrumbs: [
      { name: 'Home', url: 'https://boldkit.dev/' },
      { name: 'Components' },
    ],
  },
  shapes: {
    title: '35 Neubrutalism SVG Shapes',
    description: 'Collection of 35 unique neubrutalism SVG shapes for React and Vue 3. Bursts, hearts, stars, badges, and decorative shapes with thick borders.',
    keywords: 'SVG shapes, neubrutalism shapes, React SVG components, Vue 3 SVG components, decorative shapes, badges, stickers',
    canonical: 'https://boldkit.dev/shapes',
    breadcrumbs: [
      { name: 'Home', url: 'https://boldkit.dev/' },
      { name: 'Shapes' },
    ],
  },
  charts: {
    title: 'Charts',
    description: 'Neubrutalism styled charts and data visualization components for React (Recharts) and Vue 3 (vue-echarts). Bar charts, line charts, pie charts with bold styling.',
    keywords: 'React charts, Vue 3 charts, neubrutalism charts, data visualization, chart components, Recharts, vue-echarts',
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
