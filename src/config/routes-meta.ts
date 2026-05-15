// src/config/routes-meta.ts
// Single source of truth for counts, route metadata, and component/block/template lists.
// No React imports — safe for both browser and Node.js build scripts.

export const COUNTS = {
  components: 56,
  charts: 14,
  shapes: 64,
  blocks: 15,
  templates: 7,
} as const

export const DEFAULT_OG_IMAGE =
  'https://ik.imagekit.io/fincalfy/Screenshot%202026-03-21%20at%209.48.00%E2%80%AFPM.png'

export const SITE_URL = 'https://boldkit.dev'

export interface RouteMeta {
  title: string
  description: string
  canonical: string
  ogImage?: string
  h1: string
}

// Static page meta
export const PAGE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'BoldKit — Neubrutalism UI for React & Vue 3',
    description:
      `Free neubrutalism UI library for React & Vue 3. ${COUNTS.components}+ components, ${COUNTS.blocks} blocks, ${COUNTS.templates} templates, ${COUNTS.shapes} shapes, ${COUNTS.charts} charts. Install via shadcn CLI.`,
    canonical: `${SITE_URL}/`,
    h1: 'BoldKit — Neubrutalism UI Components for React & Vue 3',
  },
  '/docs': {
    title: 'Documentation | BoldKit',
    description:
      'Install and use BoldKit neubrutalism components in your React or Vue 3 project. Guides, API references, and examples for both frameworks.',
    canonical: `${SITE_URL}/docs`,
    h1: 'BoldKit Documentation',
  },
  '/docs/installation': {
    title: 'Installation | BoldKit',
    description:
      'Install BoldKit neubrutalism components via shadcn CLI for React or shadcn-vue for Vue 3. Step-by-step setup for TypeScript and Tailwind CSS.',
    canonical: `${SITE_URL}/docs/installation`,
    h1: 'Installation Guide',
  },
  '/docs/theming': {
    title: 'Theming | BoldKit',
    description:
      'Customize BoldKit theme colors and CSS variables for React and Vue 3. Dark mode support included.',
    canonical: `${SITE_URL}/docs/theming`,
    h1: 'Theming and Customization',
  },
  '/components': {
    title: `${COUNTS.components}+ Neubrutalism Components | BoldKit`,
    description:
      `${COUNTS.components}+ neubrutalism components for React & Vue 3 — buttons, cards, inputs, dialogs, spinners, steppers, and more with thick borders and hard shadows.`,
    canonical: `${SITE_URL}/components`,
    h1: `${COUNTS.components}+ Neubrutalism Components for React & Vue 3`,
  },
  '/shapes': {
    title: `${COUNTS.shapes} Neubrutalism SVG Shapes | BoldKit`,
    description: `${COUNTS.shapes} neubrutalism SVG shapes for React & Vue 3 — bursts, hearts, stars, badges, celestial, and decorative shapes with thick borders.`,
    canonical: `${SITE_URL}/shapes`,
    h1: `${COUNTS.shapes} Neubrutalism SVG Shapes`,
  },
  '/shapes/builder': {
    title: 'Shape Builder | BoldKit',
    description: `Interactively customize BoldKit SVG shapes. Adjust size, color, border, and shadow for any of the ${COUNTS.shapes} neubrutalism shapes.`,
    canonical: `${SITE_URL}/shapes/builder`,
    h1: 'Shape Builder',
  },
  '/ascii-shapes': {
    title: 'ASCII Shape Animations | BoldKit',
    description: 'Animated ASCII art components for React & Vue 3 — 7 animations (spiral, rose, wave, vortex, pulse, matrix, grid) with 5 character sets.',
    canonical: `${SITE_URL}/ascii-shapes`,
    h1: 'ASCII Shape Animations',
  },
  '/charts': {
    title: `${COUNTS.charts} Neubrutalism Chart Types | BoldKit`,
    description: `${COUNTS.charts} neubrutalism chart types for React & Vue 3 — bar, line, area, pie, donut, radar, gauge, sparkline, funnel, treemap, heatmap, sankey.`,
    canonical: `${SITE_URL}/charts`,
    h1: `${COUNTS.charts} Neubrutalism Chart Types`,
  },
  '/themes': {
    title: 'Theme Builder | BoldKit',
    description: 'Customize BoldKit neubrutalism theme colors for React and Vue 3. Generate CSS variables for your design system with live preview.',
    canonical: `${SITE_URL}/themes`,
    h1: 'Neubrutalism Theme Builder',
  },
  '/templates': {
    title: 'Free Page Templates | BoldKit',
    description: `Free neubrutalism page templates for React and Vue 3. ${COUNTS.templates} full-page templates: landing pages, portfolios, dashboards, pricing, blog, product, and docs.`,
    canonical: `${SITE_URL}/templates`,
    h1: `${COUNTS.templates} Free Neubrutalism Page Templates`,
  },
  '/blocks': {
    title: `${COUNTS.blocks} Section Blocks | BoldKit`,
    description: `${COUNTS.blocks} free neubrutalism section blocks for React & Vue 3 — 10 marketing blocks (hero, features, testimonials, CTA, stats, FAQ, footer) and 5 application blocks.`,
    canonical: `${SITE_URL}/blocks`,
    h1: `${COUNTS.blocks} Neubrutalism Section Blocks`,
  },
  '/studio': {
    title: 'Dot Matrix Studio — Pixel Art & Animation Editor | BoldKit',
    description: 'Free in-browser dot matrix editor — draw pixel art, build frame-by-frame animations with 8 presets, export to WebM, PNG, SVG, or JSON.',
    canonical: `${SITE_URL}/studio`,
    h1: 'Dot Matrix Studio — Pixel Art & Animation Editor',
  },
  '/canvas-effects': {
    title: 'Canvas Effects — 10 Animated Canvas Components | BoldKit',
    description: '10 free animated canvas components for React, Vue 3, and Nuxt — Aurora, Flow Field, Plasma, Metaballs, Matrix Rain, Particle Web, and more.',
    canonical: `${SITE_URL}/canvas-effects`,
    h1: 'Canvas Effects — 10 Animated Canvas Components',
  },
}

// Component slug -> display title map
export const COMPONENT_TITLES: Record<string, string> = {
  accordion: 'Accordion',
  alert: 'Alert',
  'alert-dialog': 'Alert Dialog',
  'aspect-ratio': 'Aspect Ratio',
  avatar: 'Avatar',
  badge: 'Badge',
  breadcrumb: 'Breadcrumb',
  button: 'Button',
  calendar: 'Calendar',
  card: 'Card',
  carousel: 'Carousel',
  checkbox: 'Checkbox',
  collapsible: 'Collapsible',
  combobox: 'Combobox',
  command: 'Command',
  'data-table': 'Data Table',
  'date-range-picker': 'Date Range Picker',
  dialog: 'Dialog',
  'donut-chart': 'Donut Chart',
  drawer: 'Drawer',
  'dropdown-menu': 'Dropdown Menu',
  dropzone: 'Dropzone',
  'empty-state': 'Empty State',
  'funnel-chart': 'Funnel Chart',
  'gauge-chart': 'Gauge Chart',
  'heatmap-chart': 'Heatmap Chart',
  'hover-card': 'Hover Card',
  input: 'Input',
  'input-otp': 'Input OTP',
  kbd: 'Kbd',
  label: 'Label',
  'layered-card': 'Layered Card',
  marquee: 'Marquee',
  'math-curve-background': 'Math Curve Background',
  'math-curve-loader': 'Math Curve Loader',
  'math-curve-progress': 'Math Curve Progress',
  pagination: 'Pagination',
  popover: 'Popover',
  progress: 'Progress',
  'radar-chart': 'Radar Chart',
  'radial-bar-chart': 'Radial Bar Chart',
  'radio-group': 'Radio Group',
  rating: 'Rating',
  'sankey-chart': 'Sankey Chart',
  'scroll-area': 'Scroll Area',
  select: 'Select',
  separator: 'Separator',
  sheet: 'Sheet',
  sidebar: 'Sidebar',
  skeleton: 'Skeleton',
  slider: 'Slider',
  sonner: 'Sonner',
  sparkline: 'Sparkline',
  spinner: 'Spinner',
  'stat-card': 'Stat Card',
  stepper: 'Stepper',
  sticker: 'Sticker',
  switch: 'Switch',
  table: 'Table',
  tabs: 'Tabs',
  'tag-input': 'Tag Input',
  textarea: 'Textarea',
  'time-picker': 'Time Picker',
  timeline: 'Timeline',
  toggle: 'Toggle',
  'toggle-group': 'Toggle Group',
  tooltip: 'Tooltip',
  tour: 'Tour',
  'tree-view': 'Tree View',
  'treemap-chart': 'Treemap Chart',
}

// Block slug -> display title map
export const BLOCK_TITLES: Record<string, string> = {
  'hero-section': 'Hero Section',
  'feature-grid': 'Feature Grid',
  testimonials: 'Testimonials',
  'logo-cloud': 'Logo Cloud',
  'cta-section': 'CTA Section',
  'stats-section': 'Stats Section',
  'team-section': 'Team Section',
  'faq-section': 'FAQ Section',
  'footer-section': 'Footer Section',
  'contact-section': 'Contact Section',
  'auth-forms': 'Auth Forms',
  'settings-page': 'Settings Page',
  'onboarding-flow': 'Onboarding Flow',
  'error-pages': 'Error Pages',
  invoice: 'Invoice',
}

// Template slug -> display title map
export const TEMPLATE_TITLES: Record<string, string> = {
  'landing-page': 'Landing Page Template',
  portfolio: 'Portfolio Template',
  dashboard: 'Dashboard Template',
  pricing: 'Pricing Template',
  blog: 'Blog Template',
  product: 'Product Template',
  docs: 'Docs Template',
}

// Derived meta generators (no React deps)
export function getComponentMeta(slug: string): RouteMeta {
  const title = COMPONENT_TITLES[slug] ?? slug
  return {
    title: `${title} — Neubrutalism Component for React & Vue 3 | BoldKit`,
    description: `${title} — neubrutalism React & Vue 3 component with thick borders, hard shadows, bold colors. Install via shadcn or shadcn-vue.`,
    canonical: `${SITE_URL}/components/${slug}`,
    h1: `${title} — Neubrutalism Component for React & Vue 3`,
  }
}

export function getBlockMeta(slug: string): RouteMeta {
  const title = BLOCK_TITLES[slug] ?? slug
  return {
    title: `${title} Block — Neubrutalism Section for React & Vue 3 | BoldKit`,
    description: `${title} block with neubrutalism styling for React and Vue 3. Multiple variants included. Perfect for landing pages and web applications.`,
    canonical: `${SITE_URL}/blocks/${slug}`,
    h1: `${title} — Neubrutalism Block for React & Vue 3`,
  }
}

export function getTemplateMeta(slug: string): RouteMeta {
  const title = TEMPLATE_TITLES[slug] ?? slug
  return {
    title: `${title} — Free Neubrutalism Template | BoldKit`,
    description: `Free neubrutalism ${title.toLowerCase()} for React and Vue 3. Copy, paste, and customize for your project.`,
    canonical: `${SITE_URL}/templates/${slug}`,
    h1: `${title} — Free Neubrutalism Template`,
  }
}

// Type for sitemap routes
export type SitemapRoute = {
  path: string
  meta: RouteMeta
  priority: number
  changefreq: string
  lastmod: string
}

// Full route list used by generate-html and generate-sitemap scripts
export function getAllRoutes(): SitemapRoute[] {
  const routes: SitemapRoute[] = []
  const LAST_MODIFIED = '2026-04-15'

  // Static pages
  const staticPriorities: Record<string, { priority: number; changefreq: string }> = {
    '/': { priority: 1.0, changefreq: 'weekly' },
    '/docs': { priority: 0.9, changefreq: 'weekly' },
    '/docs/installation': { priority: 0.9, changefreq: 'monthly' },
    '/docs/theming': { priority: 0.7, changefreq: 'monthly' },
    '/components': { priority: 0.9, changefreq: 'monthly' },
    '/shapes': { priority: 0.9, changefreq: 'monthly' },
    '/shapes/builder': { priority: 0.8, changefreq: 'monthly' },
    '/ascii-shapes': { priority: 0.8, changefreq: 'monthly' },
    '/charts': { priority: 0.9, changefreq: 'monthly' },
    '/themes': { priority: 0.8, changefreq: 'monthly' },
    '/templates': { priority: 0.9, changefreq: 'monthly' },
    '/blocks': { priority: 0.9, changefreq: 'monthly' },
    '/studio': { priority: 0.9, changefreq: 'monthly' },
    '/canvas-effects': { priority: 0.9, changefreq: 'monthly' },
  }

  for (const [path, seo] of Object.entries(staticPriorities)) {
    const meta = PAGE_META[path]
    if (!meta) throw new Error(`Missing PAGE_META for path: ${path}`)
    routes.push({ path, meta, ...seo, lastmod: LAST_MODIFIED })
  }

  // Component pages
  for (const slug of Object.keys(COMPONENT_TITLES)) {
    routes.push({
      path: `/components/${slug}`,
      meta: getComponentMeta(slug),
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: LAST_MODIFIED,
    })
  }

  // Block pages
  for (const slug of Object.keys(BLOCK_TITLES)) {
    routes.push({
      path: `/blocks/${slug}`,
      meta: getBlockMeta(slug),
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: LAST_MODIFIED,
    })
  }

  // Template pages
  for (const slug of Object.keys(TEMPLATE_TITLES)) {
    routes.push({
      path: `/templates/${slug}`,
      meta: getTemplateMeta(slug),
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: LAST_MODIFIED,
    })
  }

  return routes
}
