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
    title: 'Canvas Effects — 19 Animated Canvas Components | BoldKit',
    description: '19 free animated canvas components for React, Vue 3, and Nuxt — Dither, Halftone, CRT, Truchet, Aurora, Flow Field, Plasma, Metaballs, Lightning, Warp Speed, Gravity Wells, and more.',
    canonical: `${SITE_URL}/canvas-effects`,
    h1: 'Canvas Effects — 19 Animated Canvas Components',
  },

  // ── SEO / landing pages - neubrutalism topic cluster ──
  '/neubrutalism': {
    title: 'What Is Neubrutalism? The Complete Guide (2026) | BoldKit',
    description:
      'Neubrutalism (neobrutalism) explained: thick borders, hard shadows, sharp corners, bold flat color and chunky type. Core traits, do’s and don’ts, accessibility, and how to build it in React & Vue.',
    canonical: `${SITE_URL}/neubrutalism`,
    h1: 'What Is Neubrutalism?',
  },
  '/neubrutalism/colors': {
    title: 'Neubrutalism Color Palettes - Copy-Paste Hex & HSL | BoldKit',
    description:
      'Ready-to-use neubrutalism color palettes with hex codes - acid lime, electric blue, hot pink, risograph and newsprint. Plus how to pick 2-3 high-contrast colors that pass WCAG.',
    canonical: `${SITE_URL}/neubrutalism/colors`,
    h1: 'Neubrutalism Color Palettes',
  },
  '/neubrutalism/fonts': {
    title: 'Best Neubrutalism Fonts & Pairings (2026) | BoldKit',
    description:
      'The best fonts for neubrutalist design - bold neo-grotesque and geometric sans display faces, clean body fonts, and mono accents, with ready-made pairing recipes.',
    canonical: `${SITE_URL}/neubrutalism/fonts`,
    h1: 'Neubrutalism Fonts',
  },
  '/neubrutalism/examples': {
    title: 'Neubrutalism Website Examples & Patterns | BoldKit',
    description:
      'Neubrutalism in the wild - the recurring patterns (sticker collage, marquee tickers, oversized type, hard-bordered bento) plus live, inspectable BoldKit template examples for React & Vue.',
    canonical: `${SITE_URL}/neubrutalism/examples`,
    h1: 'Neubrutalism Examples',
  },
  '/neubrutalism/vs-brutalism': {
    title: 'Neubrutalism vs Brutalism vs Memphis - The Differences | BoldKit',
    description:
      'How neubrutalism differs from raw brutalism and 80s Memphis design - era, borders, color, shadows and usability compared side by side, with guidance on when to use each.',
    canonical: `${SITE_URL}/neubrutalism/vs-brutalism`,
    h1: 'Neubrutalism vs Brutalism',
  },

  // ── SEO / landing pages - tools + FavGrab funnel ──
  '/tools': {
    title: 'Free Brutalist Web Tools | BoldKit',
    description:
      'Free in-browser tools from BoldKit - FavGrab favicon extractor & image converter, Dot Matrix Studio, Theme Builder, Shape Builder, Canvas Effects and ASCII Shapes.',
    canonical: `${SITE_URL}/tools`,
    h1: 'BoldKit Tools',
  },
  '/tools/favicon-generator': {
    title: 'Free Favicon Generator - PNG, ICO, SVG & App Icons | BoldKit',
    description:
      'Generate a complete favicon set from any image. Create favicon.ico plus 16, 32, 180, 192 and 512px PNGs for browsers, iOS, Android and PWAs. Free, in-browser, no signup.',
    canonical: `${SITE_URL}/tools/favicon-generator`,
    h1: 'Favicon Generator',
  },
  '/tools/png-to-ico': {
    title: 'Convert PNG to ICO - Free Favicon Converter | BoldKit',
    description:
      'Convert a PNG into a multi-resolution favicon.ico (16/32/48) for free in your browser. What ICO is, PNG vs ICO, step-by-step conversion, and the exact link tag to add.',
    canonical: `${SITE_URL}/tools/png-to-ico`,
    h1: 'Convert PNG to ICO',
  },
  '/tools/favicon-sizes': {
    title: 'Favicon Sizes & Formats Cheat Sheet (2026) | BoldKit',
    description:
      'Every favicon size and format you need in 2026 - 16, 32, 180, 192, 512px, ICO, PNG and SVG - with the exact HTML link tags and the modern minimal set vs the legacy set.',
    canonical: `${SITE_URL}/tools/favicon-sizes`,
    h1: 'Favicon Sizes & Formats',
  },
  '/tools/extract-favicon': {
    title: 'How to Extract a Favicon From Any Website | BoldKit',
    description:
      'Five ways to grab the favicon from any website - FavGrab, the /favicon.ico path, Google’s favicon endpoint, the page’s link tags and more - plus the formats you get and an ethics note.',
    canonical: `${SITE_URL}/tools/extract-favicon`,
    h1: 'Extract a Favicon From Any Website',
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
  'gauge-chart': 'Gauge Chart',
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

// Breadcrumb trail (used for static BreadcrumbList JSON-LD in generate-html)
export type Breadcrumb = { name: string; url?: string }

// Readable labels for path segments not covered by the component/block/template maps.
const SEGMENT_LABELS: Record<string, string> = {
  components: 'Components',
  blocks: 'Blocks',
  templates: 'Templates',
  docs: 'Documentation',
  installation: 'Installation',
  theming: 'Theming',
  charts: 'Charts',
  shapes: 'Shapes',
  builder: 'Shape Builder',
  themes: 'Theme Builder',
  studio: 'Dot Matrix Studio',
  'ascii-shapes': 'ASCII Shapes',
  'canvas-effects': 'Canvas Effects',
  neubrutalism: 'Neubrutalism',
  tools: 'Tools',
  colors: 'Colors',
  fonts: 'Fonts',
  examples: 'Examples',
  'vs-brutalism': 'vs Brutalism',
  'favicon-generator': 'Favicon Generator',
  'png-to-ico': 'PNG to ICO',
  'favicon-sizes': 'Favicon Sizes',
  'extract-favicon': 'Extract Favicon',
}

function labelForSegment(segment: string): string {
  return (
    COMPONENT_TITLES[segment] ??
    BLOCK_TITLES[segment] ??
    TEMPLATE_TITLES[segment] ??
    SEGMENT_LABELS[segment] ??
    segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  )
}

// Build a breadcrumb trail from a route path. The last crumb (current page) has no url.
export function getBreadcrumbs(path: string): Breadcrumb[] {
  if (path === '/') return [{ name: 'Home' }]
  const segments = path.split('/').filter(Boolean)
  const crumbs: Breadcrumb[] = [{ name: 'Home', url: `${SITE_URL}/` }]
  let acc = ''
  segments.forEach((seg, i) => {
    acc += `/${seg}`
    const isLast = i === segments.length - 1
    crumbs.push(isLast ? { name: labelForSegment(seg) } : { name: labelForSegment(seg), url: `${SITE_URL}${acc}` })
  })
  return crumbs
}

// Type for sitemap routes
export type SitemapRoute = {
  path: string
  meta: RouteMeta
  priority: number
  changefreq: string
  lastmod: string
  breadcrumbs: Breadcrumb[]
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
    // SEO topic cluster - neubrutalism
    '/neubrutalism': { priority: 0.9, changefreq: 'monthly' },
    '/neubrutalism/colors': { priority: 0.7, changefreq: 'monthly' },
    '/neubrutalism/fonts': { priority: 0.7, changefreq: 'monthly' },
    '/neubrutalism/examples': { priority: 0.7, changefreq: 'monthly' },
    '/neubrutalism/vs-brutalism': { priority: 0.7, changefreq: 'monthly' },
    // SEO tools cluster - FavGrab funnel
    '/tools': { priority: 0.8, changefreq: 'monthly' },
    '/tools/favicon-generator': { priority: 0.8, changefreq: 'monthly' },
    '/tools/png-to-ico': { priority: 0.7, changefreq: 'monthly' },
    '/tools/favicon-sizes': { priority: 0.7, changefreq: 'monthly' },
    '/tools/extract-favicon': { priority: 0.7, changefreq: 'monthly' },
  }

  for (const [path, seo] of Object.entries(staticPriorities)) {
    const meta = PAGE_META[path]
    if (!meta) throw new Error(`Missing PAGE_META for path: ${path}`)
    routes.push({ path, meta, ...seo, lastmod: LAST_MODIFIED, breadcrumbs: getBreadcrumbs(path) })
  }

  // Component pages
  for (const slug of Object.keys(COMPONENT_TITLES)) {
    const path = `/components/${slug}`
    routes.push({
      path,
      meta: getComponentMeta(slug),
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: LAST_MODIFIED,
      breadcrumbs: getBreadcrumbs(path),
    })
  }

  // Block pages
  for (const slug of Object.keys(BLOCK_TITLES)) {
    const path = `/blocks/${slug}`
    routes.push({
      path,
      meta: getBlockMeta(slug),
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: LAST_MODIFIED,
      breadcrumbs: getBreadcrumbs(path),
    })
  }

  // Template pages
  for (const slug of Object.keys(TEMPLATE_TITLES)) {
    const path = `/templates/${slug}`
    routes.push({
      path,
      meta: getTemplateMeta(slug),
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: LAST_MODIFIED,
      breadcrumbs: getBreadcrumbs(path),
    })
  }

  return routes
}
