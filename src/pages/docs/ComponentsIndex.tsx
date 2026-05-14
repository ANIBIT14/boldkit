import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type ComponentItem = {
  name: string
  href: string
  isNew?: boolean
}

type ComponentGroup = {
  id: string
  name: string
  borderClass: string
  headerBg: string
  headerText: string
  items: ComponentItem[]
}

const componentGroups: ComponentGroup[] = [
  {
    id: 'inputs',
    name: 'Inputs & Forms',
    borderClass: 'border-primary',
    headerBg: 'bg-primary',
    headerText: 'text-primary-foreground',
    items: [
      { name: 'Button', href: '/components/button' },
      { name: 'Calendar', href: '/components/calendar' },
      { name: 'Checkbox', href: '/components/checkbox' },
      { name: 'Combobox', href: '/components/combobox', isNew: true },
      { name: 'Date Range Picker', href: '/components/date-range-picker', isNew: true },
      { name: 'Dropzone', href: '/components/dropzone' },
      { name: 'Input', href: '/components/input' },
      { name: 'Input OTP', href: '/components/input-otp' },
      { name: 'Label', href: '/components/label' },
      { name: 'Radio Group', href: '/components/radio-group' },
      { name: 'Rating', href: '/components/rating', isNew: true },
      { name: 'Select', href: '/components/select' },
      { name: 'Slider', href: '/components/slider' },
      { name: 'Switch', href: '/components/switch' },
      { name: 'Tag Input', href: '/components/tag-input', isNew: true },
      { name: 'Textarea', href: '/components/textarea' },
      { name: 'Time Picker', href: '/components/time-picker', isNew: true },
      { name: 'Toggle', href: '/components/toggle' },
      { name: 'Toggle Group', href: '/components/toggle-group' },
    ],
  },
  {
    id: 'layout',
    name: 'Layout & Structure',
    borderClass: 'border-secondary',
    headerBg: 'bg-secondary',
    headerText: 'text-secondary-foreground',
    items: [
      { name: 'Accordion', href: '/components/accordion' },
      { name: 'Aspect Ratio', href: '/components/aspect-ratio' },
      { name: 'Card', href: '/components/card' },
      { name: 'Collapsible', href: '/components/collapsible' },
      { name: 'Layered Card', href: '/components/layered-card' },
      { name: 'Scroll Area', href: '/components/scroll-area' },
      { name: 'Separator', href: '/components/separator' },
      { name: 'Tabs', href: '/components/tabs' },
    ],
  },
  {
    id: 'navigation',
    name: 'Navigation',
    borderClass: 'border-accent',
    headerBg: 'bg-accent',
    headerText: 'text-accent-foreground',
    items: [
      { name: 'Breadcrumb', href: '/components/breadcrumb' },
      { name: 'Command', href: '/components/command' },
      { name: 'Dropdown Menu', href: '/components/dropdown-menu' },
      { name: 'Pagination', href: '/components/pagination' },
      { name: 'Sidebar', href: '/components/sidebar', isNew: true },
      { name: 'Tree View', href: '/components/tree-view', isNew: true },
    ],
  },
  {
    id: 'overlays',
    name: 'Overlays & Dialogs',
    borderClass: 'border-success',
    headerBg: 'bg-success',
    headerText: 'text-success-foreground',
    items: [
      { name: 'Alert Dialog', href: '/components/alert-dialog' },
      { name: 'Dialog', href: '/components/dialog' },
      { name: 'Drawer', href: '/components/drawer' },
      { name: 'Hover Card', href: '/components/hover-card' },
      { name: 'Popover', href: '/components/popover' },
      { name: 'Sheet', href: '/components/sheet' },
      { name: 'Tooltip', href: '/components/tooltip' },
    ],
  },
  {
    id: 'display',
    name: 'Display & Data',
    borderClass: 'border-info',
    headerBg: 'bg-info',
    headerText: 'text-info-foreground',
    items: [
      { name: 'Avatar', href: '/components/avatar' },
      { name: 'Badge', href: '/components/badge' },
      { name: 'Carousel', href: '/components/carousel', isNew: true },
      { name: 'Data Table', href: '/components/data-table', isNew: true },
      { name: 'Kbd', href: '/components/kbd' },
      { name: 'Marquee', href: '/components/marquee' },
      { name: 'Progress', href: '/components/progress' },
      { name: 'Skeleton', href: '/components/skeleton' },
      { name: 'Stat Card', href: '/components/stat-card' },
      { name: 'Sticker', href: '/components/sticker' },
      { name: 'Table', href: '/components/table' },
    ],
  },
  {
    id: 'feedback',
    name: 'Feedback & Flow',
    borderClass: 'border-warning',
    headerBg: 'bg-warning',
    headerText: 'text-warning-foreground',
    items: [
      { name: 'Alert', href: '/components/alert' },
      { name: 'Empty State', href: '/components/empty-state' },
      { name: 'Sonner', href: '/components/sonner' },
      { name: 'Spinner', href: '/components/spinner' },
      { name: 'Stepper', href: '/components/stepper' },
      { name: 'Timeline', href: '/components/timeline', isNew: true },
      { name: 'Tour', href: '/components/tour', isNew: true },
    ],
  },
  {
    id: 'special',
    name: 'Special Effects',
    borderClass: 'border-neon-pink',
    headerBg: 'bg-neon-pink',
    headerText: 'text-foreground',
    items: [
      { name: 'ASCII Shapes', href: '/components/ascii-shapes', isNew: true },
      { name: 'MC Background', href: '/components/math-curve-background', isNew: true },
      { name: 'MC Loader', href: '/components/math-curve-loader', isNew: true },
      { name: 'MC Progress', href: '/components/math-curve-progress', isNew: true },
    ],
  },
]

const totalComponents = componentGroups.reduce((acc, g) => acc + g.items.length, 0)
const newComponents = componentGroups.reduce(
  (acc, g) => acc + g.items.filter((i) => i.isNew).length,
  0
)

function ComponentCard({ item }: { item: ComponentItem }) {
  return (
    <Link to={item.href}>
      <div className="group relative border-3 border-foreground bg-card p-3 shadow-[3px_3px_0px_hsl(var(--shadow-color))] transition-all duration-150 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none cursor-pointer">
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm font-bold leading-tight text-foreground">
            {item.name}
          </span>
          <div className="flex items-center gap-1 shrink-0 mt-0.5">
            {item.isNew && (
              <Badge className="h-4 px-1.5 text-[9px] shrink-0">New</Badge>
            )}
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export function ComponentsIndex() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) return componentGroups
    const q = search.toLowerCase()
    return componentGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.name.toLowerCase().includes(q)),
      }))
      .filter((group) => group.items.length > 0)
  }, [search])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1
            className="text-4xl font-black uppercase tracking-tight leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            All Components
          </h1>
        </div>
        <p className="text-sm text-muted-foreground max-w-lg">
          {totalComponents} components across 7 categories. Copy-paste ready for React and Vue 3.
          Install via shadcn CLI.
        </p>
        {/* Stat chips */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: `${totalComponents} Components`, bg: 'bg-primary', text: 'text-primary-foreground' },
            { label: `${newComponents} New`, bg: 'bg-accent', text: 'text-accent-foreground' },
            { label: 'React + Vue 3', bg: 'bg-secondary', text: 'text-secondary-foreground' },
            { label: 'shadcn CLI', bg: 'bg-foreground', text: 'text-background' },
          ].map((chip) => (
            <span
              key={chip.label}
              className={cn(
                'inline-flex items-center border-3 border-foreground px-3 py-0.5 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
                chip.bg,
                chip.text
              )}
            >
              {chip.label}
            </span>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search components..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-10 text-sm"
        />
      </div>

      {/* Groups */}
      {filtered.length === 0 ? (
        <div className="border-3 border-foreground bg-muted p-8 text-center shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
          <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            No components match "{search}"
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {filtered.map((group) => (
            <div key={group.id}>
              {/* Category header */}
              <div
                className={cn(
                  'inline-flex items-center gap-3 border-3 border-foreground px-4 py-1.5 mb-4 shadow-[3px_3px_0px_hsl(var(--shadow-color))]',
                  group.headerBg,
                  group.headerText
                )}
              >
                <span className="text-xs font-black uppercase tracking-widest">
                  {group.name}
                </span>
                <span className="text-xs font-bold opacity-70">{group.items.length}</span>
              </div>

              {/* Component grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {group.items.map((item) => (
                  <ComponentCard key={item.href} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
