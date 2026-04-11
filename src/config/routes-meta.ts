// src/config/routes-meta.ts
// Single source of truth for counts, route metadata, and component/block/template lists.
// No React imports — safe for both browser and Node.js build scripts.

export const COUNTS = {
  components: 55,
  charts: 14,
  shapes: 54,
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
}

// Static page meta
export const PAGE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'BoldKit — Neubrutalism UI for React & Vue 3',
    description:
      `Free neubrutalism component library for React and Vue 3 with ${COUNTS.components}+ UI components, ` +
      `${COUNTS.blocks} section blocks, ${COUNTS.templates} templates, ${COUNTS.shapes} animated SVG shapes, and ` +
      `${COUNTS.charts} chart types. Built on shadcn/ui with thick borders, hard shadows, and bold colors. Install via CLI.`,
    canonical: `${SITE_URL}/`,
  },
  '/docs': {
    title: 'Documentation | BoldKit',
    description:
      'Learn how to install and use BoldKit neubrutalism components in your React or Vue 3 project. Comprehensive guides, API references, and examples for both frameworks.',
    canonical: `${SITE_URL}/docs`,
  },
  '/docs/installation': {
    title: 'Installation | BoldKit',
    description:
      'Install BoldKit neubrutalism components using shadcn CLI for React or shadcn-vue for Vue 3. Step-by-step installation guide for TypeScript and Tailwind CSS projects.',
    canonical: `${SITE_URL}/docs/installation`,
  },
  '/docs/theming': {
    title: 'Theming | BoldKit',
    description:
      'Customize BoldKit theme colors and CSS variables for React and Vue 3. Dark mode support included.',
    canonical: `${SITE_URL}/docs/theming`,
  },
  '/components': {
    title: `${COUNTS.components}+ Neubrutalism Components | BoldKit`,
    description:
      `Browse ${COUNTS.components}+ neubrutalism components for React and Vue 3. Buttons, cards, inputs, dialogs, spinners, steppers, dropzones and more with thick borders and hard shadows.`,
    canonical: `${SITE_URL}/components`,
  },
  '/shapes': {
    title: `${COUNTS.shapes} Neubrutalism SVG Shapes | BoldKit`,
    description: `Collection of ${COUNTS.shapes} unique neubrutalism SVG shapes for React and Vue 3. Bursts, hearts, stars, badges, celestial, and decorative shapes with thick borders.`,
    canonical: `${SITE_URL}/shapes`,
  },
  '/shapes/builder': {
    title: 'Shape Builder | BoldKit',
    description: 'Interactively customize BoldKit SVG shapes. Adjust size, color, border, and shadow for any of the 54 neubrutalism shapes.',
    canonical: `${SITE_URL}/shapes/builder`,
  },
  '/charts': {
    title: `${COUNTS.charts} Neubrutalism Chart Types | BoldKit`,
    description: `Neubrutalism styled charts for React and Vue 3. ${COUNTS.charts} chart types including bar, line, area, pie, donut, radar, radial bar, gauge, sparkline, funnel, treemap, heatmap, and sankey charts.`,
    canonical: `${SITE_URL}/charts`,
  },
  '/themes': {
    title: 'Theme Builder | BoldKit',
    description: 'Customize BoldKit neubrutalism theme colors for React and Vue 3. Generate CSS variables for your design system with live preview.',
    canonical: `${SITE_URL}/themes`,
  },
  '/templates': {
    title: 'Free Page Templates | BoldKit',
    description: `Free neubrutalism page templates for React and Vue 3. ${COUNTS.templates} full-page templates: landing pages, portfolios, dashboards, pricing, blog, product, and docs.`,
    canonical: `${SITE_URL}/templates`,
  },
  '/blocks': {
    title: `${COUNTS.blocks} Section Blocks | BoldKit`,
    description: `Free neubrutalism section blocks for React and Vue 3. 10 marketing blocks (hero, features, testimonials, CTA, stats, team, FAQ, footer, contact, logo cloud) and 5 application blocks (auth forms, settings, onboarding, error pages, invoice).`,
    canonical: `${SITE_URL}/blocks`,
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
    description: `${title} component with neubrutalism styling for React and Vue 3. Thick borders, hard shadows, bold colors. Install via shadcn CLI for React or shadcn-vue for Vue.`,
    canonical: `${SITE_URL}/components/${slug}`,
  }
}

export function getBlockMeta(slug: string): RouteMeta {
  const title = BLOCK_TITLES[slug] ?? slug
  return {
    title: `${title} Block — Neubrutalism Section for React & Vue 3 | BoldKit`,
    description: `${title} block with neubrutalism styling for React and Vue 3. Multiple variants included. Perfect for landing pages and web applications.`,
    canonical: `${SITE_URL}/blocks/${slug}`,
  }
}

export function getTemplateMeta(slug: string): RouteMeta {
  const title = TEMPLATE_TITLES[slug] ?? slug
  return {
    title: `${title} — Free Neubrutalism Template | BoldKit`,
    description: `Free neubrutalism ${title.toLowerCase()} for React and Vue 3. Copy, paste, and customize for your project.`,
    canonical: `${SITE_URL}/templates/${slug}`,
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
  const LAST_MODIFIED = '2026-04-11'

  // Static pages
  const staticPriorities: Record<string, { priority: number; changefreq: string }> = {
    '/': { priority: 1.0, changefreq: 'weekly' },
    '/docs': { priority: 0.9, changefreq: 'weekly' },
    '/docs/installation': { priority: 0.9, changefreq: 'monthly' },
    '/docs/theming': { priority: 0.7, changefreq: 'monthly' },
    '/components': { priority: 0.9, changefreq: 'monthly' },
    '/shapes': { priority: 0.9, changefreq: 'monthly' },
    '/shapes/builder': { priority: 0.8, changefreq: 'monthly' },
    '/charts': { priority: 0.9, changefreq: 'monthly' },
    '/themes': { priority: 0.8, changefreq: 'monthly' },
    '/templates': { priority: 0.9, changefreq: 'monthly' },
    '/blocks': { priority: 0.9, changefreq: 'monthly' },
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
