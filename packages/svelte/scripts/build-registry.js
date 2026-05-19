#!/usr/bin/env node

/**
 * Build Svelte Registry Script
 * Generates registry JSON files from Svelte components for shadcn-svelte CLI
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const UI_DIR = path.join(__dirname, '../src/lib/components/ui')
const STYLES_DIR = path.join(__dirname, '../src/lib/styles')
const REGISTRY_DIR = path.join(__dirname, '../../../public/r/svelte')

// Component metadata with dependencies
const componentMeta = {
  // Foundation
  button: { deps: ['class-variance-authority'], desc: 'Displays a button with neubrutalism styling and press-down animation' },
  input: { deps: [], desc: 'Displays a form input with thick borders' },
  label: { deps: [], desc: 'Renders an accessible label' },
  badge: { deps: ['class-variance-authority'], desc: 'Displays a badge or tag' },
  separator: { deps: [], desc: 'Visually separates content' },
  skeleton: { deps: [], desc: 'Displays a loading placeholder' },
  textarea: { deps: [], desc: 'Displays a multi-line text input' },

  // Card
  card: {
    deps: [],
    desc: 'Displays a card with header, content, and footer',
    files: ['card', 'card-header', 'card-title', 'card-description', 'card-content', 'card-footer'],
  },

  // Alert
  alert: {
    deps: ['class-variance-authority'],
    desc: 'Displays a callout for user attention',
    files: ['alert', 'alert-title', 'alert-description', 'alert-action'],
  },

  // Avatar
  avatar: {
    deps: ['bits-ui'],
    desc: 'An image element with fallback',
    files: ['avatar', 'avatar-image', 'avatar-fallback'],
  },

  // Interactive (bits-ui)
  checkbox: { deps: ['bits-ui', 'lucide-svelte'], desc: 'A checkbox input control' },
  switch: { deps: ['bits-ui'], desc: 'A toggle switch control' },
  progress: { deps: ['bits-ui'], desc: 'Displays an indicator showing completion progress' },
  toggle: { deps: ['bits-ui', 'class-variance-authority'], desc: 'A two-state button', files: ['toggle', 'toggle-variants'] },

  // Accordion
  accordion: {
    deps: ['bits-ui', 'lucide-svelte'],
    desc: 'A vertically stacked set of interactive headings',
    files: ['accordion', 'accordion-item', 'accordion-trigger', 'accordion-content'],
  },

  // Tabs
  tabs: {
    deps: ['bits-ui'],
    desc: 'A set of layered sections of content',
    files: ['tabs', 'tabs-list', 'tabs-trigger', 'tabs-content'],
  },

  // Dialog
  dialog: {
    deps: ['bits-ui', 'lucide-svelte'],
    desc: 'A modal dialog with overlay',
    files: [
      'dialog',
      'dialog-trigger',
      'dialog-content',
      'dialog-header',
      'dialog-footer',
      'dialog-title',
      'dialog-description',
      'dialog-close',
    ],
  },

  // Select
  select: {
    deps: ['bits-ui', 'lucide-svelte'],
    desc: 'Displays a list of options for the user to pick from',
    files: [
      'select',
      'select-trigger',
      'select-value',
      'select-content',
      'select-item',
      'select-group',
      'select-label',
      'select-separator',
    ],
  },

  // Dropdown Menu
  'dropdown-menu': {
    deps: ['bits-ui'],
    desc: 'Displays a menu to the user',
    files: [
      'dropdown-menu',
      'dropdown-menu-trigger',
      'dropdown-menu-content',
      'dropdown-menu-item',
      'dropdown-menu-label',
      'dropdown-menu-separator',
      'dropdown-menu-shortcut',
    ],
  },
}

const registryAliases = {
  aurora: { deps: [], desc: 'Animated aurora canvas background', files: ['aurora.svelte', 'canvas-effect.svelte'] },
  'dot-blob': { deps: [], desc: 'Animated dot blob canvas effect', files: ['dot-blob.svelte', 'canvas-effect.svelte'] },
  'dot-wave': { deps: [], desc: 'Animated dot wave canvas effect', files: ['dot-wave.svelte', 'canvas-effect.svelte'] },
  'flow-field': { deps: [], desc: 'Animated flow field canvas effect', files: ['flow-field.svelte', 'canvas-effect.svelte'] },
  'lissajous-grid': { deps: [], desc: 'Animated Lissajous grid canvas effect', files: ['lissajous-grid.svelte', 'canvas-effect.svelte'] },
  'matrix-rain': { deps: [], desc: 'Animated matrix rain canvas effect', files: ['matrix-rain.svelte', 'canvas-effect.svelte'] },
  metaballs: { deps: [], desc: 'Animated metaballs canvas effect', files: ['metaballs.svelte', 'canvas-effect.svelte'] },
  'mouse-ripple': { deps: [], desc: 'Pointer-reactive ripple canvas effect', files: ['mouse-ripple.svelte', 'canvas-effect.svelte'] },
  'particle-web': { deps: [], desc: 'Animated particle web canvas effect', files: ['particle-web.svelte', 'canvas-effect.svelte'] },
  plasma: { deps: [], desc: 'Animated plasma canvas effect', files: ['plasma.svelte', 'canvas-effect.svelte'] },
  'chart-utils': { deps: [], desc: 'Shared chart utilities', files: ['chart-utils.ts'] },
  'donut-chart': { deps: ['layerchart'], desc: 'Donut chart components and utilities', files: ['chart-container.svelte', 'chart-tooltip.svelte', 'chart-style.svelte', 'chart-utils.ts'] },
  'funnel-chart': { deps: ['layerchart'], desc: 'Funnel chart components and utilities', files: ['chart-container.svelte', 'chart-tooltip.svelte', 'chart-style.svelte', 'chart-utils.ts'] },
  'gauge-chart': { deps: ['layerchart'], desc: 'Gauge chart components and utilities', files: ['chart-container.svelte', 'chart-tooltip.svelte', 'chart-style.svelte', 'chart-utils.ts'] },
  'heatmap-chart': { deps: ['layerchart'], desc: 'Heatmap chart components and utilities', files: ['chart-container.svelte', 'chart-tooltip.svelte', 'chart-style.svelte', 'chart-utils.ts'] },
  'radar-chart': { deps: ['layerchart'], desc: 'Radar chart components and utilities', files: ['chart-container.svelte', 'chart-tooltip.svelte', 'chart-style.svelte', 'chart-utils.ts'] },
  'radial-bar-chart': { deps: ['layerchart'], desc: 'Radial bar chart components and utilities', files: ['chart-container.svelte', 'chart-tooltip.svelte', 'chart-style.svelte', 'chart-utils.ts'] },
  'sankey-chart': { deps: ['layerchart'], desc: 'Sankey chart components and utilities', files: ['chart-container.svelte', 'chart-tooltip.svelte', 'chart-style.svelte', 'chart-utils.ts'] },
  sparkline: { deps: ['layerchart'], desc: 'Sparkline chart components and utilities', files: ['chart-container.svelte', 'chart-tooltip.svelte', 'chart-style.svelte', 'chart-utils.ts'] },
  'treemap-chart': { deps: ['layerchart'], desc: 'Treemap chart components and utilities', files: ['chart-container.svelte', 'chart-tooltip.svelte', 'chart-style.svelte', 'chart-utils.ts'] },
  'date-range-picker': { deps: ['bits-ui', '@internationalized/date'], desc: 'Date range picker built from range calendar components', files: ['range-calendar.svelte', 'range-calendar-caption.svelte', 'range-calendar-cell.svelte', 'range-calendar-day.svelte', 'range-calendar-grid.svelte', 'range-calendar-grid-body.svelte', 'range-calendar-grid-head.svelte', 'range-calendar-grid-row.svelte', 'range-calendar-head-cell.svelte', 'range-calendar-header.svelte', 'range-calendar-heading.svelte', 'range-calendar-month.svelte', 'range-calendar-month-select.svelte', 'range-calendar-months.svelte', 'range-calendar-nav.svelte', 'range-calendar-next-button.svelte', 'range-calendar-prev-button.svelte', 'range-calendar-year-select.svelte'] },
  shapes: { deps: [], desc: 'SVG shape components', files: ['shape.svelte', 'index.ts'] },
  theme: { deps: [], desc: 'BoldKit theme tokens', files: ['theme.ts'] },
}

function toTitle(name) {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function discoverComponentMeta() {
  const discovered = {}

  for (const entry of fs.readdirSync(UI_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue

    const componentDir = path.join(UI_DIR, entry.name)
    const files = fs
      .readdirSync(componentDir)
      .filter((file) => file.endsWith('.svelte') || file.endsWith('.ts'))

    if (files.length === 0) continue

    discovered[entry.name] = {
      deps: [],
      desc: `${toTitle(entry.name)} component for BoldKit Svelte`,
      files,
    }
  }

  return discovered
}

function readFile(filePath) {
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, 'utf-8')
}

function findComponentFile(filename, ext) {
  const directPath = path.join(UI_DIR, `${filename}${ext}`)
  if (fs.existsSync(directPath)) return directPath

  const dirname = filename.endsWith('-variants')
    ? filename.replace(/-variants$/, '')
    : filename
  const nestedPath = path.join(UI_DIR, dirname, `${filename}${ext}`)
  if (fs.existsSync(nestedPath)) return nestedPath

  for (const entry of fs.readdirSync(UI_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue

    const candidate = path.join(UI_DIR, entry.name, `${filename}${ext}`)
    if (fs.existsSync(candidate)) return candidate
  }

  return directPath
}

function getComponentFiles(name, meta) {
  const filenames = meta.files || [name]
  const registryFiles = []

  for (const filename of filenames) {
    const ext = filename.endsWith('.svelte') || filename.endsWith('.ts')
      ? ''
      : filename.endsWith('-variants')
        ? '.ts'
        : '.svelte'
    const filePath = findComponentFile(filename, ext)
    const content = readFile(filePath)
    if (content) {
      const basename = `${filename}${ext}`
      registryFiles.push({
        path: `registry/default/ui/${basename}`,
        content,
        type: 'registry:ui',
        target: path.relative(path.join(__dirname, '../src'), filePath),
      })
    } else {
      console.warn(`Missing file: ${filename}${ext}`)
    }
  }

  return registryFiles
}

function createRegistryJson(name, meta) {
  const registryFiles = getComponentFiles(name, meta)
  if (registryFiles.length === 0) return null

  return {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name,
    type: 'registry:ui',
    description: meta.desc,
    dependencies: meta.deps || [],
    registryDependencies: (meta.registryDeps || ['utils']).concat(
      name !== 'utils' ? ['utils'] : []
    ).filter((v, i, a) => a.indexOf(v) === i),
    files: registryFiles,
  }
}

function createUtilsRegistry() {
  const utilsPath = path.join(__dirname, '../src/lib/utils.ts')
  const content = readFile(utilsPath)
  if (!content) return null

  return {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: 'utils',
    type: 'registry:lib',
    description: 'Utility function for merging Tailwind CSS class names',
    dependencies: ['clsx', 'tailwind-merge'],
    files: [
      {
        path: 'registry/default/lib/utils.ts',
        content,
        type: 'registry:lib',
        target: 'lib/utils.ts',
      },
    ],
  }
}

function createStylesRegistry() {
  const cssPath = path.join(STYLES_DIR, 'globals.css')
  const cssContent = readFile(cssPath)

  if (!cssContent) {
    console.warn('globals.css not found')
    return null
  }

  return {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: 'styles',
    type: 'registry:style',
    description: 'BoldKit neubrutalism CSS variables and utilities',
    files: [
      {
        path: 'registry/default/styles/globals.css',
        content: cssContent,
        type: 'registry:style',
        target: 'styles/globals.css',
      },
    ],
  }
}

function createIndexRegistry(componentNames) {
  return {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'boldkit-svelte',
    homepage: 'https://boldkit.dev',
    items: componentNames.map((name) => ({
      name,
      type: 'registry:ui',
      registryUrl: `https://boldkit.dev/r/svelte/${name}.json`,
    })),
  }
}

// Ensure registry directory exists
if (!fs.existsSync(REGISTRY_DIR)) {
  fs.mkdirSync(REGISTRY_DIR, { recursive: true })
}

// Generate utils registry
const utilsRegistry = createUtilsRegistry()
if (utilsRegistry) {
  fs.writeFileSync(path.join(REGISTRY_DIR, 'utils.json'), JSON.stringify(utilsRegistry, null, 2))
  console.log('Generated: utils.json')
}

// Generate component registry files
let count = 0
const componentNames = []

const discoveredComponentMeta = discoverComponentMeta()
const allComponentMeta = {
  ...discoveredComponentMeta,
  ...registryAliases,
  ...Object.fromEntries(
    Object.entries(componentMeta).map(([name, meta]) => [
      name,
      {
        ...meta,
        files: discoveredComponentMeta[name]?.files || meta.files,
      },
    ])
  ),
}

for (const [name, meta] of Object.entries(allComponentMeta)) {
  const registry = createRegistryJson(name, meta)
  if (registry) {
    const outPath = path.join(REGISTRY_DIR, `${name}.json`)
    fs.writeFileSync(outPath, JSON.stringify(registry, null, 2))
    count++
    componentNames.push(name)
    console.log(`Generated: ${name}.json`)
  }
}

// Generate styles.json
const stylesRegistry = createStylesRegistry()
if (stylesRegistry) {
  const stylesPath = path.join(REGISTRY_DIR, 'styles.json')
  fs.writeFileSync(stylesPath, JSON.stringify(stylesRegistry, null, 2))
  count++
  console.log('Generated: styles.json')
}

// Generate index.json
const indexRegistry = createIndexRegistry(componentNames)
const indexPath = path.join(REGISTRY_DIR, 'index.json')
fs.writeFileSync(indexPath, JSON.stringify(indexRegistry, null, 2))
console.log('Generated: index.json')

console.log(`\nGenerated ${count} registry files + utils.json + styles.json + index.json`)
