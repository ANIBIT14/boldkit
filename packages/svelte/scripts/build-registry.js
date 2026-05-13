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

function readFile(filePath) {
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, 'utf-8')
}

function getComponentFiles(name, meta) {
  const filenames = meta.files || [name]
  const registryFiles = []

  for (const filename of filenames) {
    const ext = filename.endsWith('-variants') ? '.ts' : '.svelte'
    const filePath = path.join(UI_DIR, `${filename}${ext}`)
    const content = readFile(filePath)
    if (content) {
      registryFiles.push({
        path: `registry/default/ui/${filename}${ext}`,
        content,
        type: 'registry:ui',
        target: `lib/components/ui/${filename}${ext}`,
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

for (const [name, meta] of Object.entries(componentMeta)) {
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
