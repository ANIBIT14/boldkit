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
  'dropdown-menu': { deps: ['reka-ui', 'lucide-vue-next'], desc: 'Displays a menu to the user', files: ['DropdownMenu', 'DropdownMenuTrigger', 'DropdownMenuContent', 'DropdownMenuItem', 'DropdownMenuCheckboxItem', 'DropdownMenuRadioItem', 'DropdownMenuLabel', 'DropdownMenuSeparator', 'DropdownMenuGroup', 'DropdownMenuRadioGroup'] },
  'alert-dialog': { deps: ['reka-ui'], desc: 'A modal dialog that interrupts the user', files: ['AlertDialog', 'AlertDialogTrigger', 'AlertDialogContent', 'AlertDialogHeader', 'AlertDialogFooter', 'AlertDialogTitle', 'AlertDialogDescription', 'AlertDialogAction', 'AlertDialogCancel'] },
  sheet: { deps: ['reka-ui', 'lucide-vue-next', 'class-variance-authority'], desc: 'A side panel that slides in', files: ['Sheet', 'SheetTrigger', 'SheetContent', 'SheetHeader', 'SheetFooter', 'SheetTitle', 'SheetDescription', 'SheetClose'] },
  'hover-card': { deps: ['reka-ui'], desc: 'For sighted users to preview content', files: ['HoverCard', 'HoverCardTrigger', 'HoverCardContent'] },
  collapsible: { deps: ['reka-ui'], desc: 'An interactive component that expands/collapses', files: ['Collapsible', 'CollapsibleTrigger', 'CollapsibleContent'] },
  slider: { deps: ['reka-ui'], desc: 'An input for selecting a value within a range' },
  toggle: { deps: ['reka-ui', 'class-variance-authority'], desc: 'A two-state button' },
  'toggle-group': { deps: ['reka-ui', 'class-variance-authority'], desc: 'A set of two-state buttons', files: ['ToggleGroup', 'ToggleGroupItem'] },
  'scroll-area': { deps: ['reka-ui'], desc: 'Augments native scroll functionality', files: ['ScrollArea', 'ScrollBar'] },
  table: { deps: [], desc: 'A responsive table component', files: ['Table', 'TableHeader', 'TableBody', 'TableFooter', 'TableHead', 'TableRow', 'TableCell', 'TableCaption'] },
  alert: { deps: ['class-variance-authority'], desc: 'Displays a callout for user attention', files: ['Alert', 'AlertTitle', 'AlertDescription'] },

  // Specialized
  pagination: { deps: ['reka-ui', 'lucide-vue-next'], desc: 'Navigation for paged content', files: ['Pagination', 'PaginationList', 'PaginationListItem', 'PaginationEllipsis', 'PaginationFirst', 'PaginationLast', 'PaginationPrev', 'PaginationNext'] },
  breadcrumb: { deps: ['reka-ui', 'lucide-vue-next'], desc: 'Displays the path to the current resource', files: ['Breadcrumb', 'BreadcrumbList', 'BreadcrumbItem', 'BreadcrumbLink', 'BreadcrumbPage', 'BreadcrumbSeparator', 'BreadcrumbEllipsis'] },
  drawer: { deps: ['vaul-vue'], desc: 'A drawer component for Vue', files: ['Drawer', 'DrawerTrigger', 'DrawerContent', 'DrawerHeader', 'DrawerFooter', 'DrawerTitle', 'DrawerDescription', 'DrawerClose'] },
  sonner: { deps: ['vue-sonner'], desc: 'An opinionated toast component' },
  calendar: { deps: ['reka-ui', 'lucide-vue-next'], desc: 'A date picker calendar component' },
  'input-otp': { deps: ['reka-ui', 'lucide-vue-next'], desc: 'Accessible one-time password input', files: ['InputOTP', 'InputOTPGroup', 'InputOTPSlot', 'InputOTPSeparator'] },
  command: { deps: ['reka-ui', 'lucide-vue-next'], desc: 'Fast, composable command menu', files: ['Command', 'CommandDialog', 'CommandInput', 'CommandList', 'CommandEmpty', 'CommandGroup', 'CommandItem', 'CommandSeparator', 'CommandShortcut'] },

  // BoldKit unique
  marquee: { deps: [], desc: 'A scrolling marquee component', files: ['Marquee', 'MarqueeItem', 'MarqueeSeparator'] },
  sticker: { deps: ['class-variance-authority'], desc: 'Decorative sticker and stamp components', files: ['Sticker', 'Stamp', 'StickyNote'] },
  'layered-card': { deps: ['class-variance-authority'], desc: 'A card with stacked layer effects', files: ['LayeredCard', 'LayeredCardHeader', 'LayeredCardTitle', 'LayeredCardDescription', 'LayeredCardContent', 'LayeredCardFooter'] },
  'aspect-ratio': { deps: ['reka-ui'], desc: 'Displays content within a desired aspect ratio' },
  avatar: { deps: ['reka-ui'], desc: 'An image element with fallback', files: ['Avatar', 'AvatarImage', 'AvatarFallback'] },

  // Charts
  chart: { deps: ['vue-echarts', 'echarts', 'class-variance-authority'], desc: 'Chart components with neubrutalism styling', files: ['ChartContainer'], extraFiles: ['chart-utils.ts', 'chart-variants.ts'] },

  // Shapes (all 35)
  shapes: { deps: [], desc: 'SVG shape components for decorative elements', isShapes: true },
}

const SHAPES_DIR = path.join(UI_DIR, 'shapes')
const STYLES_DIR = path.join(__dirname, '../src/styles')
const LIB_DIR = path.join(__dirname, '../src/lib')

// All shape component names
const SHAPE_FILES = [
  'BurstShape', 'BlobShape', 'ArrowBadge', 'ZigzagBanner', 'ScribbleCircle',
  'TicketShape', 'SplatShape', 'SpeechBubble', 'DiamondBadge', 'HexagonShape',
  'CrossShape', 'LightningShape', 'HeartShape', 'Star4Shape', 'ShieldShape',
  'RibbonShape', 'WaveShape', 'OctagonShape', 'CloudShape', 'TagShape',
  'Star5Shape', 'PentagonShape', 'TrapezoidShape', 'ParallelogramShape',
  'CursorShape', 'BookmarkShape', 'FlagShape', 'PillShape', 'EyeShape',
  'TriangleShape', 'PaperTearShape', 'ScribbleUnderline', 'PriceTagShape',
  'ExplosionShape', 'CouponShape'
]

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

  if (registryFiles.length === 0) {
    console.warn(`No files found for ${name}`)
    return null
  }

  return {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name,
    type: 'registry:ui',
    description: meta.desc,
    dependencies: meta.deps || [],
    registryDependencies: ['utils'],
    files: registryFiles
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
    registryDependencies: ['utils'],
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
