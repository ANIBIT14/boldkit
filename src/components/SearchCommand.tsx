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
} from 'lucide-react'

const components = [
  { name: 'Accordion', path: '/components/accordion', category: 'layout' },
  { name: 'Alert', path: '/components/alert', category: 'feedback' },
  { name: 'Alert Dialog', path: '/components/alert-dialog', category: 'overlay' },
  { name: 'Aspect Ratio', path: '/components/aspect-ratio', category: 'layout' },
  { name: 'Avatar', path: '/components/avatar', category: 'display' },
  { name: 'Badge', path: '/components/badge', category: 'display' },
  { name: 'Breadcrumb', path: '/components/breadcrumb', category: 'navigation' },
  { name: 'Button', path: '/components/button', category: 'form' },
  { name: 'Calendar', path: '/components/calendar', category: 'form' },
  { name: 'Card', path: '/components/card', category: 'layout' },
  { name: 'Checkbox', path: '/components/checkbox', category: 'form' },
  { name: 'Collapsible', path: '/components/collapsible', category: 'layout' },
  { name: 'Command', path: '/components/command', category: 'overlay' },
  { name: 'Dialog', path: '/components/dialog', category: 'overlay' },
  { name: 'Drawer', path: '/components/drawer', category: 'overlay' },
  { name: 'Dropdown Menu', path: '/components/dropdown-menu', category: 'overlay' },
  { name: 'Hover Card', path: '/components/hover-card', category: 'overlay' },
  { name: 'Input', path: '/components/input', category: 'form' },
  { name: 'Input OTP', path: '/components/input-otp', category: 'form' },
  { name: 'Label', path: '/components/label', category: 'form' },
  { name: 'Layered Card', path: '/components/layered-card', category: 'layout' },
  { name: 'Marquee', path: '/components/marquee', category: 'display' },
  { name: 'Pagination', path: '/components/pagination', category: 'navigation' },
  { name: 'Popover', path: '/components/popover', category: 'overlay' },
  { name: 'Progress', path: '/components/progress', category: 'feedback' },
  { name: 'Radio Group', path: '/components/radio-group', category: 'form' },
  { name: 'Scroll Area', path: '/components/scroll-area', category: 'layout' },
  { name: 'Select', path: '/components/select', category: 'form' },
  { name: 'Separator', path: '/components/separator', category: 'layout' },
  { name: 'Sheet', path: '/components/sheet', category: 'overlay' },
  { name: 'Skeleton', path: '/components/skeleton', category: 'feedback' },
  { name: 'Slider', path: '/components/slider', category: 'form' },
  { name: 'Sonner', path: '/components/sonner', category: 'feedback' },
  { name: 'Sticker', path: '/components/sticker', category: 'display' },
  { name: 'Switch', path: '/components/switch', category: 'form' },
  { name: 'Table', path: '/components/table', category: 'display' },
  { name: 'Tabs', path: '/components/tabs', category: 'layout' },
  { name: 'Textarea', path: '/components/textarea', category: 'form' },
  { name: 'Toggle', path: '/components/toggle', category: 'form' },
  { name: 'Toggle Group', path: '/components/toggle-group', category: 'form' },
  { name: 'Tooltip', path: '/components/tooltip', category: 'overlay' },
]

const pages = [
  { name: 'Home', path: '/', icon: Layout },
  { name: 'Documentation', path: '/docs', icon: FileText },
  { name: 'Installation', path: '/docs/installation', icon: FileText },
  { name: 'Theme Builder', path: '/themes', icon: Palette },
  { name: 'Charts', path: '/charts', icon: Box },
  { name: 'Shapes', path: '/shapes', icon: Box },
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
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground border-3 border-foreground bg-background hover:bg-muted transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="hidden md:inline">Search...</span>
        <kbd className="hidden md:inline-flex h-5 items-center gap-1 border-2 border-foreground bg-muted px-1.5 font-mono text-[10px] font-bold">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search components, pages..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {pages.map((page) => (
              <CommandItem
                key={page.path}
                value={page.name}
                onSelect={() => runCommand(() => navigate(page.path))}
              >
                <page.icon className="mr-2 h-4 w-4" />
                {page.name}
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
                <Box className="mr-2 h-4 w-4" />
                {component.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
