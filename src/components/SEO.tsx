import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noIndex?: boolean
}

const defaultMeta = {
  title: 'BoldKit - Neubrutalism UI Components for React',
  description: 'Free neubrutalism React component library with 45 UI components and 30 SVG shapes. Built on shadcn/ui with thick borders, hard shadows, and bold colors.',
  keywords: 'neubrutalism, neubrutalism ui, React components, shadcn, Tailwind CSS, TypeScript, UI library',
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

  }, [title, description, keywords, canonical, ogImage, ogType, noIndex])

  return null
}

// Preset SEO configurations for common pages
export const pageSEO = {
  home: {
    title: undefined, // Uses default
    description: 'Free neubrutalism React component library with 45 UI components and 30 SVG shapes. Built on shadcn/ui with thick borders, hard shadows, and bold colors. Install via shadcn CLI.',
    keywords: 'neubrutalism, neubrutalism ui, neubrutalism components, brutalist design, React UI library, shadcn components, Tailwind CSS, TypeScript',
    canonical: 'https://boldkit.dev/',
  },
  docs: {
    title: 'Documentation',
    description: 'Learn how to install and use BoldKit neubrutalism components in your React project. Comprehensive guides, API references, and examples.',
    keywords: 'BoldKit documentation, React component docs, neubrutalism guide, installation guide',
    canonical: 'https://boldkit.dev/docs',
  },
  installation: {
    title: 'Installation',
    description: 'Install BoldKit neubrutalism components using shadcn CLI. Step-by-step installation guide for React, TypeScript, and Tailwind CSS projects.',
    keywords: 'BoldKit installation, shadcn CLI install, React component setup, npm install',
    canonical: 'https://boldkit.dev/docs/installation',
  },
  components: {
    title: 'Components',
    description: 'Browse 45 neubrutalism React components. Buttons, cards, inputs, dialogs, and more with thick borders and hard shadows.',
    keywords: 'React components, UI components, neubrutalism buttons, neubrutalism cards, form components',
    canonical: 'https://boldkit.dev/components',
  },
  shapes: {
    title: '30 Neubrutalism SVG Shapes',
    description: 'Collection of 30 unique neubrutalism SVG shapes for React. Bursts, hearts, stars, badges, and decorative shapes with thick borders.',
    keywords: 'SVG shapes, neubrutalism shapes, React SVG components, decorative shapes, badges, stickers',
    canonical: 'https://boldkit.dev/shapes',
  },
  charts: {
    title: 'Charts',
    description: 'Neubrutalism styled charts and data visualization components for React. Bar charts, line charts, pie charts with bold styling.',
    keywords: 'React charts, neubrutalism charts, data visualization, chart components',
    canonical: 'https://boldkit.dev/charts',
  },
  themes: {
    title: 'Theme Builder',
    description: 'Customize BoldKit neubrutalism theme colors. Generate CSS variables for your design system with live preview.',
    keywords: 'theme builder, color picker, CSS variables, design tokens, neubrutalism colors',
    canonical: 'https://boldkit.dev/themes',
  },
}

// Component-specific SEO generator
export function getComponentSEO(componentName: string, componentTitle: string) {
  return {
    title: `${componentTitle} - Neubrutalism React Component`,
    description: `${componentTitle} component with neubrutalism styling. Thick borders, hard shadows, and bold colors. Install via shadcn CLI: npx shadcn@latest add https://boldkit.dev/r/${componentName}.json`,
    keywords: `${componentTitle} component, React ${componentTitle}, neubrutalism ${componentTitle}, shadcn ${componentTitle}`,
    canonical: `https://boldkit.dev/components/${componentName}`,
  }
}
