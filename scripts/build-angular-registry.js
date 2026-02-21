#!/usr/bin/env node

/**
 * Build Angular Registry
 *
 * This script generates registry JSON files for Angular components
 * similar to how shadcn/ui works for React.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const COMPONENTS_DIR = path.join(__dirname, '../packages/angular/projects/boldkit/src/lib/components')
const UTILS_DIR = path.join(__dirname, '../packages/angular/projects/boldkit/src/lib/utils')
const OUTPUT_DIR = path.join(__dirname, '../public/r/angular')

// Component metadata with dependencies
const COMPONENT_META = {
  'button': {
    description: 'A neubrutalism button with press-down animation',
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'card': {
    description: 'A card container with neubrutalism styling',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'badge': {
    description: 'A badge/tag component with multiple variants',
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'input': {
    description: 'A text input with neubrutalism styling',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'textarea': {
    description: 'A textarea with neubrutalism styling',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'checkbox': {
    description: 'A checkbox with neubrutalism styling',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'switch': {
    description: 'A toggle switch with neubrutalism styling',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'slider': {
    description: 'A range slider with neubrutalism styling',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'progress': {
    description: 'A progress bar with neubrutalism styling',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'separator': {
    description: 'A horizontal or vertical separator',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'skeleton': {
    description: 'A skeleton loading placeholder',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'label': {
    description: 'A form label component',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'alert': {
    description: 'An alert/notification component',
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'toggle': {
    description: 'A toggle button component',
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'sticker': {
    description: 'A sticker/stamp decorative component',
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'shapes': {
    description: 'SVG shape components (heart, star, burst, etc.)',
    dependencies: [],
    registryDependencies: []
  },
  'accordion': {
    description: 'An expandable accordion component',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'tabs': {
    description: 'A tabbed interface component',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'dialog': {
    description: 'A modal dialog component',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'popover': {
    description: 'A popover/dropdown component',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'tooltip': {
    description: 'A tooltip component',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'select': {
    description: 'A select/dropdown component',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'radio-group': {
    description: 'A radio button group component',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'table': {
    description: 'A table component with neubrutalism styling',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'pagination': {
    description: 'A pagination component',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'breadcrumb': {
    description: 'A breadcrumb navigation component',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'avatar': {
    description: 'An avatar/profile image component',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'aspect-ratio': {
    description: 'An aspect ratio container component',
    dependencies: [],
    registryDependencies: []
  },
  'collapsible': {
    description: 'A collapsible/expandable content component',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'scroll-area': {
    description: 'A scrollable area with custom scrollbar',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'marquee': {
    description: 'A marquee/scrolling text component',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'layered-card': {
    description: 'A card with stacked layer effect',
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  },
  'toggle-group': {
    description: 'A group of toggle buttons',
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  }
}

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Generate utils registry item
function generateUtilsRegistry() {
  const utilsPath = path.join(UTILS_DIR, 'cn.ts')
  const content = fs.readFileSync(utilsPath, 'utf-8')

  const registry = {
    "$schema": "https://ui.shadcn.com/schema/registry-item.json",
    "name": "utils",
    "type": "registry:lib",
    "description": "Utility function for merging Tailwind CSS classes",
    "dependencies": ["clsx", "tailwind-merge"],
    "files": [
      {
        "path": "lib/utils.ts",
        "content": content,
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  }

  const outputPath = path.join(OUTPUT_DIR, 'utils.json')
  fs.writeFileSync(outputPath, JSON.stringify(registry, null, 2))
  console.log(`Generated: utils.json`)
}

// Generate component registry item
function generateComponentRegistry(componentName) {
  const componentDir = path.join(COMPONENTS_DIR, componentName)

  if (!fs.existsSync(componentDir)) {
    console.log(`Skipping ${componentName}: directory not found`)
    return
  }

  const meta = COMPONENT_META[componentName] || {
    description: `${componentName} component`,
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: ['utils']
  }

  const files = []

  // Read all .ts files in the component directory
  const componentFiles = fs.readdirSync(componentDir).filter(f => f.endsWith('.ts'))

  for (const file of componentFiles) {
    const filePath = path.join(componentDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
      // Update import paths for standalone usage
      .replace(/from ['"]\.\.\/\.\.\/utils\/cn['"]/g, "from '../lib/utils'")
      .replace(/from ['"]\.\.\/utils\/cn['"]/g, "from '../lib/utils'")

    files.push({
      "path": `components/ui/${componentName}/${file}`,
      "content": content,
      "type": "registry:ui",
      "target": `components/ui/${componentName}/${file}`
    })
  }

  const registry = {
    "$schema": "https://ui.shadcn.com/schema/registry-item.json",
    "name": componentName,
    "type": "registry:ui",
    "description": meta.description,
    "dependencies": meta.dependencies,
    "registryDependencies": meta.registryDependencies,
    "files": files
  }

  const outputPath = path.join(OUTPUT_DIR, `${componentName}.json`)
  fs.writeFileSync(outputPath, JSON.stringify(registry, null, 2))
  console.log(`Generated: ${componentName}.json`)
}

// Main
console.log('Building Angular registry...\n')

// Generate utils first
generateUtilsRegistry()

// Generate all component registries
const components = fs.readdirSync(COMPONENTS_DIR).filter(f => {
  const stat = fs.statSync(path.join(COMPONENTS_DIR, f))
  return stat.isDirectory()
})

for (const component of components) {
  generateComponentRegistry(component)
}

console.log(`\nRegistry build complete! Files saved to: ${OUTPUT_DIR}`)
