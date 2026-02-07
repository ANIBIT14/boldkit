import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  FileText,
  Layout,
  Palette,
  Box,
  Search,
  Layers,
  Shapes,
  BarChart3,
} from 'lucide-react'

const components = [
  { name: 'Accordion', path: '/components/accordion' },
  { name: 'Alert', path: '/components/alert' },
  { name: 'Alert Dialog', path: '/components/alert-dialog' },
  { name: 'Aspect Ratio', path: '/components/aspect-ratio' },
  { name: 'Avatar', path: '/components/avatar' },
  { name: 'Badge', path: '/components/badge' },
  { name: 'Breadcrumb', path: '/components/breadcrumb' },
  { name: 'Button', path: '/components/button' },
  { name: 'Calendar', path: '/components/calendar' },
  { name: 'Card', path: '/components/card' },
  { name: 'Checkbox', path: '/components/checkbox' },
  { name: 'Collapsible', path: '/components/collapsible' },
  { name: 'Command', path: '/components/command' },
  { name: 'Dialog', path: '/components/dialog' },
  { name: 'Drawer', path: '/components/drawer' },
  { name: 'Dropdown Menu', path: '/components/dropdown-menu' },
  { name: 'Hover Card', path: '/components/hover-card' },
  { name: 'Input', path: '/components/input' },
  { name: 'Input OTP', path: '/components/input-otp' },
  { name: 'Label', path: '/components/label' },
  { name: 'Layered Card', path: '/components/layered-card' },
  { name: 'Marquee', path: '/components/marquee' },
  { name: 'Pagination', path: '/components/pagination' },
  { name: 'Popover', path: '/components/popover' },
  { name: 'Progress', path: '/components/progress' },
  { name: 'Radio Group', path: '/components/radio-group' },
  { name: 'Scroll Area', path: '/components/scroll-area' },
  { name: 'Select', path: '/components/select' },
  { name: 'Separator', path: '/components/separator' },
  { name: 'Sheet', path: '/components/sheet' },
  { name: 'Skeleton', path: '/components/skeleton' },
  { name: 'Slider', path: '/components/slider' },
  { name: 'Sonner', path: '/components/sonner' },
  { name: 'Sticker', path: '/components/sticker' },
  { name: 'Switch', path: '/components/switch' },
  { name: 'Table', path: '/components/table' },
  { name: 'Tabs', path: '/components/tabs' },
  { name: 'Textarea', path: '/components/textarea' },
  { name: 'Toggle', path: '/components/toggle' },
  { name: 'Toggle Group', path: '/components/toggle-group' },
  { name: 'Tooltip', path: '/components/tooltip' },
]

const pages = [
  { name: 'Home', path: '/', icon: Layout },
  { name: 'Documentation', path: '/docs', icon: FileText },
  { name: 'Installation', path: '/docs/installation', icon: FileText },
  { name: 'Components', path: '/components', icon: Layers },
  { name: 'Shapes', path: '/shapes', icon: Shapes },
  { name: 'Charts', path: '/charts', icon: BarChart3 },
  { name: 'Theme Builder', path: '/themes', icon: Palette },
  { name: 'Templates', path: '/templates', icon: Layout },
]

export function SearchCommand() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center h-8 w-8 sm:w-auto sm:px-3 sm:gap-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Search (⌘K)"
      >
        <Search className="h-4 w-4" />
        <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 border border-foreground/20 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {pages.map((page) => (
              <CommandItem
                key={page.path}
                value={page.name}
                onSelect={() => runCommand(() => navigate(page.path))}
              >
                <page.icon className="h-4 w-4 text-muted-foreground" />
                <span>{page.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Components">
            {components.map((component) => (
              <CommandItem
                key={component.path}
                value={component.name}
                onSelect={() => runCommand(() => navigate(component.path))}
              >
                <Box className="h-4 w-4 text-muted-foreground" />
                <span>{component.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
