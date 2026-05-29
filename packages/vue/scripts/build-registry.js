#!/usr/bin/env node

/**
 * Build Vue Registry Script
 * Generates registry JSON files from Vue components for shadcn-vue CLI
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const UI_DIR = path.join(__dirname, '../src/components/ui')
const REGISTRY_DIR = path.join(__dirname, '../../../public/r/vue')

// Component metadata with dependencies
const componentMeta = {
  // Foundation
  button: { deps: ['reka-ui', 'class-variance-authority'], desc: 'Displays a button with neubrutalism styling and press-down animation' },
  input: { deps: [], desc: 'Displays a form input with thick borders' },
  label: { deps: ['reka-ui'], desc: 'Renders an accessible label' },
  badge: { deps: ['class-variance-authority'], desc: 'Displays a badge or tag' },
  separator: { deps: ['reka-ui'], desc: 'Visually separates content' },
  skeleton: { deps: [], desc: 'Displays a loading placeholder' },
  textarea: { deps: [], desc: 'Displays a multi-line text input' },

  // Card
  card: { deps: [], desc: 'Displays a card with header, content, and footer', files: ['Card', 'CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter'] },

  // Interactive
  accordion: { deps: ['reka-ui'], desc: 'A vertically stacked set of interactive headings', files: ['Accordion', 'AccordionItem', 'AccordionTrigger', 'AccordionContent'] },
  dialog: { deps: ['reka-ui', 'lucide-vue-next'], desc: 'A modal dialog with overlay', files: ['Dialog', 'DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogFooter', 'DialogTitle', 'DialogDescription', 'DialogClose'] },
  checkbox: { deps: ['reka-ui', 'lucide-vue-next'], desc: 'A checkbox input control' },
  'radio-group': { deps: ['reka-ui'], desc: 'A set of radio buttons', files: ['RadioGroup', 'RadioGroupItem'] },
  select: { deps: ['reka-ui', 'lucide-vue-next'], desc: 'Displays a list of options for the user to pick from', files: ['Select', 'SelectTrigger', 'SelectValue', 'SelectContent', 'SelectItem', 'SelectGroup', 'SelectLabel', 'SelectSeparator'] },
  switch: { deps: ['reka-ui'], desc: 'A toggle switch control' },
  tabs: { deps: ['reka-ui'], desc: 'A set of layered sections of content', files: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'] },
  tooltip: { deps: ['reka-ui'], desc: 'A popup that displays information on hover', files: ['Tooltip', 'TooltipTrigger', 'TooltipContent', 'TooltipProvider'] },
  popover: { deps: ['reka-ui'], desc: 'Displays rich content in a portal', files: ['Popover', 'PopoverTrigger', 'PopoverContent'] },
  progress: { deps: ['reka-ui'], desc: 'Displays an indicator showing completion progress' },

  // Extended
  'dropdown-menu': { deps: ['reka-ui', 'lucide-vue-next'], desc: 'Displays a menu to the user', files: ['DropdownMenu', 'DropdownMenuTrigger', 'DropdownMenuContent', 'DropdownMenuItem', 'DropdownMenuCheckboxItem', 'DropdownMenuRadioItem', 'DropdownMenuLabel', 'DropdownMenuSeparator', 'DropdownMenuShortcut', 'DropdownMenuRadioGroup'] },
  'alert-dialog': { deps: ['reka-ui'], registryDeps: ['button'], desc: 'A modal dialog that interrupts the user', files: ['AlertDialog', 'AlertDialogTrigger', 'AlertDialogContent', 'AlertDialogHeader', 'AlertDialogFooter', 'AlertDialogTitle', 'AlertDialogDescription', 'AlertDialogAction', 'AlertDialogCancel'] },
  sheet: { deps: ['reka-ui', 'lucide-vue-next', 'class-variance-authority'], desc: 'A side panel that slides in', files: ['Sheet', 'SheetTrigger', 'SheetContent', 'SheetHeader', 'SheetFooter', 'SheetTitle', 'SheetDescription', 'SheetClose'] },
  'hover-card': { deps: ['reka-ui'], desc: 'For sighted users to preview content', files: ['HoverCard', 'HoverCardTrigger', 'HoverCardContent'] },
  collapsible: { deps: ['reka-ui'], desc: 'An interactive component that expands/collapses', files: ['Collapsible', 'CollapsibleTrigger', 'CollapsibleContent'] },
  slider: { deps: ['reka-ui'], desc: 'An input for selecting a value within a range' },
  toggle: { deps: ['reka-ui', 'class-variance-authority'], desc: 'A two-state button' },
  'toggle-group': { deps: ['reka-ui', 'class-variance-authority'], registryDeps: ['toggle'], desc: 'A set of two-state buttons', files: ['ToggleGroup', 'ToggleGroupItem'] },
  'scroll-area': { deps: ['reka-ui'], desc: 'Augments native scroll functionality', files: ['ScrollArea', 'ScrollBar'] },
  table: { deps: [], desc: 'A responsive table component', files: ['Table', 'TableHeader', 'TableBody', 'TableFooter', 'TableHead', 'TableRow', 'TableCell', 'TableCaption'] },
  alert: { deps: ['class-variance-authority'], desc: 'Displays a callout for user attention', files: ['Alert', 'AlertTitle', 'AlertDescription'] },

  // Specialized
  pagination: { deps: ['reka-ui', 'lucide-vue-next'], registryDeps: ['button'], desc: 'Navigation for paged content', files: ['Pagination', 'PaginationContent', 'PaginationItem', 'PaginationLink', 'PaginationEllipsis', 'PaginationPrevious', 'PaginationNext'] },
  breadcrumb: { deps: ['reka-ui', 'lucide-vue-next'], desc: 'Displays the path to the current resource', files: ['Breadcrumb', 'BreadcrumbList', 'BreadcrumbItem', 'BreadcrumbLink', 'BreadcrumbPage', 'BreadcrumbSeparator', 'BreadcrumbEllipsis'] },
  drawer: { deps: ['vaul-vue'], desc: 'A drawer component for Vue', files: ['Drawer', 'DrawerTrigger', 'DrawerContent', 'DrawerHeader', 'DrawerFooter', 'DrawerTitle', 'DrawerDescription', 'DrawerClose'] },
  sonner: { deps: ['vue-sonner'], registryDeps: ['use-theme'], desc: 'An opinionated toast component' },
  calendar: { deps: ['reka-ui', 'lucide-vue-next'], registryDeps: ['button'], desc: 'A date picker calendar component' },
  'input-otp': { deps: ['reka-ui', 'lucide-vue-next'], desc: 'Accessible one-time password input', files: ['InputOTP', 'InputOTPGroup', 'InputOTPSlot', 'InputOTPSeparator'] },
  command: { deps: ['reka-ui', 'lucide-vue-next'], registryDeps: ['dialog'], desc: 'Fast, composable command menu', files: ['Command', 'CommandDialog', 'CommandInput', 'CommandList', 'CommandEmpty', 'CommandGroup', 'CommandItem', 'CommandSeparator', 'CommandShortcut'] },

  // BoldKit unique
  marquee: { deps: [], desc: 'A scrolling marquee component', files: ['Marquee', 'MarqueeItem', 'MarqueeSeparator'] },
  sticker: { deps: ['class-variance-authority'], desc: 'Decorative sticker and stamp components', files: ['Sticker', 'Stamp', 'StickyNote'] },
  'layered-card': { deps: ['class-variance-authority'], desc: 'A card with stacked layer effects', files: ['LayeredCard', 'LayeredCardHeader', 'LayeredCardTitle', 'LayeredCardDescription', 'LayeredCardContent', 'LayeredCardFooter'], extraFiles: ['layered-card-variants.ts'] },
  'aspect-ratio': { deps: ['reka-ui'], desc: 'Displays content within a desired aspect ratio' },
  avatar: { deps: ['reka-ui'], desc: 'An image element with fallback', files: ['Avatar', 'AvatarImage', 'AvatarFallback'] },

  // Charts — every chart SFC imports ChartEmpty. The 4 specialty charts
  // (funnel/treemap/heatmap/sankey) additionally import types from
  // chart-types.ts. Bundle these so consumer installs don't break.
  chart: {
    deps: ['vue-echarts', 'echarts', 'class-variance-authority'],
    desc: 'Chart components with neubrutalism styling',
    files: ['ChartContainer', 'ChartEmpty', 'DonutChart', 'GaugeChart', 'RadarChart', 'RadialBarChart', 'SparklineChart'],
    extraFiles: ['chart-utils.ts', 'chart-variants.ts'],
  },
  'funnel-chart': {
    deps: ['vue-echarts', 'echarts'],
    registryDeps: ['chart-utils'],
    desc: 'Funnel chart for conversion flows and pipeline stages',
    files: ['FunnelChart', 'ChartEmpty'],
    extraFiles: ['chart-types.ts'],
  },
  'treemap-chart': {
    deps: ['vue-echarts', 'echarts'],
    registryDeps: ['chart-utils'],
    desc: 'Treemap for hierarchical data visualization with proportional rectangles',
    files: ['TreemapChart', 'ChartEmpty'],
    extraFiles: ['chart-types.ts'],
  },
  'heatmap-chart': {
    deps: ['vue-echarts', 'echarts'],
    registryDeps: ['chart-utils'],
    desc: 'Heatmap grid for correlation and intensity data',
    files: ['HeatmapChart', 'ChartEmpty'],
    extraFiles: ['chart-types.ts'],
  },
  'sankey-chart': {
    deps: ['vue-echarts', 'echarts'],
    registryDeps: ['chart-utils'],
    desc: 'Sankey flow diagram for proportional flows between nodes',
    files: ['SankeyChart', 'ChartEmpty'],
    extraFiles: ['chart-types.ts'],
  },

  // Shapes (all 35)
  shapes: { deps: [], desc: 'SVG shape components for decorative elements', isShapes: true },

  // ErrorBoundary — Vue equivalent of the React class component using
  // `onErrorCaptured`. Returns the fallback UI when any descendant
  // throws, otherwise renders the default slot.
  'error-boundary': {
    deps: ['lucide-vue-next'],
    registryDeps: ['button', 'card'],
    desc: 'Catches errors in child components using onErrorCaptured and displays a neubrutalism fallback UI with reload and home actions',
    files: ['ErrorBoundary'],
  },

  // ASCII Shapes — 17 animated ASCII components living in a subdirectory.
  // Uses the generic `subDir` codepath that walks the folder and ships
  // every .vue + every .ts helper alongside, mapping each into
  // components/ui/ascii-shapes/ in the consumer project.
  'ascii-shapes': {
    deps: [],
    desc: '17 animated ASCII art components (Spiral, Rose, Wave, Vortex, Pulse, Matrix, Grid, Torus, Sphere, Cube, Helix, Donut, Trefoil Knot, Geodesic Dome, Saturn, Hyperboloid, DNA) with 5 character sets, 4 sizes, and SSR-safe static mode',
    subDir: 'ascii-shapes',
  },

  // v2.7.0 - Data & Forms
  carousel: {
    deps: ['embla-carousel-vue', 'lucide-vue-next'],
    registryDeps: ['button'],
    desc: 'Carousel component with navigation, dots, and touch support built on Embla',
    files: ['Carousel', 'CarouselContent', 'CarouselItem', 'CarouselPrevious', 'CarouselNext', 'CarouselDots']
  },
  'data-table': {
    deps: ['@tanstack/vue-table', 'lucide-vue-next'],
    registryDeps: ['button', 'checkbox', 'dropdown-menu', 'input', 'select', 'table'],
    desc: 'Powerful data table with sorting, filtering, pagination, and row selection',
    files: ['DataTable']
  },
  'date-range-picker': {
    deps: ['date-fns', 'lucide-vue-next'],
    registryDeps: ['button', 'calendar', 'popover'],
    desc: 'Date range picker with presets, dual calendars, and customizable options',
    files: ['DateRangePicker']
  },
  rating: {
    deps: ['class-variance-authority', 'lucide-vue-next'],
    desc: 'Star rating component with half-values, multiple icons, and keyboard navigation',
    files: ['Rating']
  },
  'tag-input': {
    deps: ['lucide-vue-next'],
    desc: 'Multi-tag input with suggestions, validation, and keyboard support',
    files: ['TagInput']
  },
  'time-picker': {
    deps: ['lucide-vue-next'],
    registryDeps: ['button', 'popover', 'scroll-area'],
    desc: 'Popover-based time picker with 12h/24h format and scrollable columns',
    files: ['TimePicker']
  },

  // v2.8.0 - Navigation & Advanced
  sidebar: {
    deps: ['class-variance-authority', 'lucide-vue-next'],
    registryDeps: ['button', 'sheet', 'tooltip'],
    desc: 'Collapsible sidebar with mobile drawer, tooltips, and keyboard shortcut',
    files: ['Sidebar', 'SidebarContent', 'SidebarFooter', 'SidebarGroup', 'SidebarGroupLabel', 'SidebarHeader', 'SidebarInset', 'SidebarItem', 'SidebarProvider', 'SidebarSeparator', 'SidebarToggle']
  },
  timeline: {
    deps: ['class-variance-authority'],
    desc: 'Composable timeline for activity feeds, order tracking, and version history',
    files: ['Timeline', 'TimelineCard', 'TimelineConnector', 'TimelineContent', 'TimelineDescription', 'TimelineDot', 'TimelineHeader', 'TimelineItem', 'TimelineTime', 'TimelineTitle']
  },
  tour: {
    deps: ['lucide-vue-next'],
    registryDeps: ['button'],
    desc: 'Step-by-step product tour with spotlight highlighting and progress indicators',
    files: ['Tour']
  },
  'tree-view': {
    deps: ['reka-ui', 'lucide-vue-next'],
    registryDeps: ['checkbox', 'collapsible'],
    desc: 'Hierarchical tree view with expand/collapse, selection, and checkboxes',
    files: ['TreeView']
  },

  // v2.5.0 components - missing from registry
  dropzone: {
    deps: ['lucide-vue-next'],
    registryDeps: ['progress', 'spinner'],
    desc: 'Drag-and-drop file upload with preview and validation',
    files: ['Dropzone', 'FileList']
  },
  'empty-state': {
    deps: ['lucide-vue-next', 'class-variance-authority'],
    desc: 'Empty state placeholders with 14 presets, horizontal/vertical layouts, animations, and illustration support',
    files: ['EmptyState', 'EmptyStateActions', 'EmptyStateDescription', 'EmptyStateIcon', 'EmptyStateIllustration', 'EmptyStatePreset', 'EmptyStateTitle'],
    extraFiles: ['empty-state-variants.ts']
  },
  kbd: {
    deps: [],
    desc: 'Keyboard shortcut display component',
    files: ['Kbd', 'KbdCombo']
  },
  spinner: {
    deps: ['class-variance-authority'],
    desc: 'Loading spinner with multiple variants',
    files: ['Spinner']
  },
  'stat-card': {
    deps: ['lucide-vue-next'],
    registryDeps: ['card', 'progress'],
    desc: 'Statistics card for dashboards',
    files: ['StatCard']
  },
  stepper: {
    deps: ['class-variance-authority'],
    desc: 'Multi-step wizard/stepper component',
    files: ['Stepper', 'StepperContent', 'StepperItem', 'StepperList', 'StepperSeparator', 'StepperTrigger']
  },

  // ──────────────────────────────────────────────────────────────────
  // Migrated from hand-written public/r/vue/*.json (2026-05-26).
  // Previously bypassed this script entirely, which meant they were
  // vulnerable to manual edits that bypassed the @boldkit scoping helper.
  // ──────────────────────────────────────────────────────────────────

  // Combobox — Popover + Command composition
  combobox: {
    deps: ['reka-ui', 'lucide-vue-next'],
    registryDeps: ['popover', 'command'],
    desc: 'Searchable dropdown built by composing Popover and Command with neubrutalism styling. Includes single-select (ComboboxTrigger) and multi-select with removable chips (ComboboxMultiTrigger).',
    files: ['ComboboxTrigger', 'ComboboxMultiTrigger'],
  },

  // Standalone charts (the parent `chart` entry above ships the chart
  // family bundle; these are single-chart installs with their helpers)
  'donut-chart': {
    deps: ['vue-echarts', 'echarts', 'class-variance-authority'],
    registryDeps: ['chart-utils'],
    desc: 'A donut/pie chart component with neubrutalism styling and center content slot',
    files: ['DonutChart', 'ChartEmpty'],
    extraFiles: ['chart-utils.ts', 'chart-variants.ts'],
  },
  'gauge-chart': {
    deps: ['class-variance-authority'],
    desc: 'A gauge/speedometer chart component with customizable zones and neubrutalism styling',
    files: ['GaugeChart'],
  },
  'radar-chart': {
    deps: ['vue-echarts', 'echarts', 'class-variance-authority'],
    registryDeps: ['chart-utils'],
    desc: 'A radar/spider chart component with neubrutalism styling for multi-dimensional data visualization',
    files: ['RadarChart', 'ChartEmpty'],
    extraFiles: ['chart-utils.ts', 'chart-variants.ts'],
  },
  'radial-bar-chart': {
    deps: ['vue-echarts', 'echarts', 'class-variance-authority'],
    registryDeps: ['chart-utils'],
    desc: 'A radial bar chart component with neubrutalism styling for progress-style data visualization',
    files: ['RadialBarChart', 'ChartEmpty'],
    extraFiles: ['chart-utils.ts', 'chart-variants.ts'],
  },
  sparkline: {
    deps: ['vue-echarts', 'echarts', 'class-variance-authority'],
    desc: 'A compact sparkline chart component for inline data visualization with line, area, and bar variants',
    files: ['SparklineChart'],
  },

  // ──────────────────────────────────────────────────────────────────
  // Cross-folder helpers consumed by UI components.
  // Without these entries, installing a component that imports them
  // produces "Cannot find module" errors in the consumer's project.
  // ──────────────────────────────────────────────────────────────────

  // useTheme — Vue composable. Imported by Sonner.vue.
  'use-theme': {
    deps: [],
    desc: 'Theme provider composable with light/dark/system support. Used by Sonner toast for theme-aware rendering.',
    files: [],
    siblingFiles: [
      { src: 'composables/useTheme.ts', target: 'composables/useTheme.ts' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  // Math Curve family — previously not published to the Vue registry
  // (source files existed on disk but no shadcn-vue install path).
  // Registered 2026-05-26 to close that gap.
  // ──────────────────────────────────────────────────────────────────

  // The vanilla math engine. Lives in src/lib/, so we use siblingFiles.
  // Listed under registry:ui type (no native registry:lib for shadcn-vue).
  'math-curves': {
    deps: [],
    desc: 'Framework-agnostic math engine for parametric curve animations (rose, lissajous, butterfly, spiral, heart, and 14 more). Shared by MathCurveLoader, MathCurveProgress, and MathCurveBackground.',
    files: [], // No .vue file — only the lib
    siblingFiles: [
      { src: 'lib/math-curves.ts', target: 'lib/math-curves.ts' },
    ],
  },

  'math-curve-loader': {
    deps: ['class-variance-authority'],
    registryDeps: ['math-curves'],
    desc: 'Animated mathematical curve loader with neubrutalism aesthetics — 17 curve variants including rose, lissajous, butterfly, spiral, and heart. A point traces the curve while leaving a fading trail.',
    files: ['MathCurveLoader'],
  },

  'math-curve-progress': {
    deps: ['class-variance-authority'],
    registryDeps: ['math-curves'],
    desc: 'Progress indicator that traces a mathematical curve — value-driven head moves along the curve, fill segments behind. 9 curve variants.',
    files: ['MathCurveProgress'],
  },

  'math-curve-background': {
    deps: [],
    registryDeps: ['math-curves'],
    desc: 'Ambient animated mathematical curve background layer with neubrutalism aesthetics — wraps any content with a continuously drawn parametric curve.',
    files: ['MathCurveBackground'],
  },
}

const SHAPES_DIR = path.join(UI_DIR, 'shapes')
const STYLES_DIR = path.join(__dirname, '../src/styles')
const LIB_DIR = path.join(__dirname, '../src/lib')

// Shape component names — auto-discovered from disk so new shapes get
// shipped automatically. The previous hand-maintained list drifted out of
// sync 20 shapes deep before the registry audit caught it.
const SHAPE_FILES = fs.existsSync(SHAPES_DIR)
  ? fs.readdirSync(SHAPES_DIR)
      .filter((f) => f.endsWith('.vue'))
      .map((f) => f.replace(/\.vue$/, ''))
      .sort()
  : []

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch {
    return null
  }
}

function createRegistryJson(name, meta) {
  // Handle shapes specially
  if (meta.isShapes) {
    return createShapesRegistry()
  }

  // Handle nested-subdirectory components (e.g. ascii-shapes): ship every
  // .vue and .ts file in the directory verbatim, preserving the folder
  // layout in the consumer's components/ui/<subDir>/ tree.
  if (meta.subDir) {
    return createSubDirRegistry(name, meta)
  }

  const files = meta.files || [name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')]
  const registryFiles = []

  for (const file of files) {
    const vuePath = path.join(UI_DIR, `${file}.vue`)
    const tsPath = path.join(UI_DIR, `${file.toLowerCase()}-variants.ts`)

    const vueContent = readFile(vuePath)
    if (vueContent) {
      registryFiles.push({
        path: `registry/default/ui/${file}.vue`,
        content: vueContent,
        type: 'registry:ui',
        target: `components/ui/${file}.vue`
      })
    }

    const tsContent = readFile(tsPath)
    if (tsContent) {
      registryFiles.push({
        path: `registry/default/ui/${file.toLowerCase()}-variants.ts`,
        content: tsContent,
        type: 'registry:ui',
        target: `components/ui/${file.toLowerCase()}-variants.ts`
      })
    }
  }

  // Handle extra files (like chart-utils.ts, chart-variants.ts)
  if (meta.extraFiles) {
    for (const extraFile of meta.extraFiles) {
      const extraPath = path.join(UI_DIR, extraFile)
      const extraContent = readFile(extraPath)
      if (extraContent) {
        registryFiles.push({
          path: `registry/default/ui/${extraFile}`,
          content: extraContent,
          type: 'registry:ui',
          target: `components/ui/${extraFile}`
        })
      }
    }
  }

  // Handle sibling files outside UI_DIR (e.g. lib/, composables/).
  // Each entry: { src: '<rel-to-vue-src>', target: '<consumer-target>' }
  // Used by entries like `math-curves` that bundle a vanilla lib helper
  // living in src/lib/ rather than src/components/ui/.
  if (meta.siblingFiles) {
    const VUE_SRC = path.join(__dirname, '../src')
    for (const { src, target } of meta.siblingFiles) {
      const srcPath = path.join(VUE_SRC, src)
      const content = readFile(srcPath)
      if (content) {
        registryFiles.push({
          path: `registry/default/${src}`,
          content,
          type: 'registry:ui',
          target,
        })
      }
    }
  }

  if (registryFiles.length === 0) {
    console.warn(`No files found for ${name}`)
    return null
  }

  // Scope all BoldKit-owned cross-references with the @boldkit/ namespace.
  // Without this, shadcn CLI resolves bare names against the default registry
  // (ui.shadcn.com) instead of BoldKit's, breaking installs. Bare names that
  // look like a full URL are passed through unchanged for completeness.
  const scopeBk = (d) =>
    d.startsWith('@') || d.startsWith('http://') || d.startsWith('https://')
      ? d
      : `@boldkit/${d}`

  return {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name,
    type: 'registry:ui',
    description: meta.desc,
    dependencies: meta.deps || [],
    registryDependencies: ['utils', ...(meta.registryDeps || [])].map(scopeBk),
    files: registryFiles
  }
}

function createSubDirRegistry(name, meta) {
  const dir = path.join(UI_DIR, meta.subDir)
  if (!fs.existsSync(dir)) {
    console.warn(`Sub-dir not found for ${name}: ${dir}`)
    return null
  }

  const registryFiles = []
  for (const entry of fs.readdirSync(dir)) {
    if (!entry.endsWith('.vue') && !entry.endsWith('.ts')) continue
    const content = readFile(path.join(dir, entry))
    if (!content) continue
    registryFiles.push({
      path: `registry/default/ui/${meta.subDir}/${entry}`,
      content,
      type: 'registry:ui',
      target: `components/ui/${meta.subDir}/${entry}`,
    })
  }

  if (registryFiles.length === 0) {
    console.warn(`No files found in sub-dir for ${name}`)
    return null
  }

  return {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name,
    type: 'registry:ui',
    description: meta.desc,
    dependencies: meta.deps || [],
    registryDependencies: ['@boldkit/utils', ...(meta.registryDeps || []).map(d => `@boldkit/${d}`)],
    files: registryFiles,
  }
}

function createShapesRegistry() {
  const registryFiles = []

  for (const shape of SHAPE_FILES) {
    const vuePath = path.join(SHAPES_DIR, `${shape}.vue`)
    const vueContent = readFile(vuePath)
    if (vueContent) {
      registryFiles.push({
        path: `registry/default/ui/shapes/${shape}.vue`,
        content: vueContent,
        type: 'registry:ui',
        target: `components/ui/shapes/${shape}.vue`
      })
    }
  }

  // Add shapes index
  const indexPath = path.join(SHAPES_DIR, 'index.ts')
  const indexContent = readFile(indexPath)
  if (indexContent) {
    registryFiles.push({
      path: 'registry/default/ui/shapes/index.ts',
      content: indexContent,
      type: 'registry:ui',
      target: 'components/ui/shapes/index.ts'
    })
  }

  return {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: 'shapes',
    type: 'registry:ui',
    description: 'SVG shape components for decorative elements',
    dependencies: [],
    registryDependencies: ['@boldkit/utils'],
    files: registryFiles
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
    files: [{
      path: 'registry/default/styles/globals.css',
      content: cssContent,
      type: 'registry:style',
      target: 'styles/globals.css'
    }]
  }
}

function createIndexRegistry(componentNames) {
  return {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'boldkit-vue',
    homepage: 'https://boldkit.dev',
    items: componentNames.map(name => ({
      name,
      type: 'registry:ui',
      registryUrl: `https://boldkit.dev/r/vue/${name}.json`
    }))
  }
}

// Ensure registry directory exists
if (!fs.existsSync(REGISTRY_DIR)) {
  fs.mkdirSync(REGISTRY_DIR, { recursive: true })
}

// Generate registry files
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

console.log(`\nGenerated ${count} registry files + index.json`)
