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
  LayoutGrid,
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
  { name: 'Dropzone', path: '/components/dropzone' },
  { name: 'Empty State', path: '/components/empty-state' },
  { name: 'Hover Card', path: '/components/hover-card' },
  { name: 'Input', path: '/components/input' },
  { name: 'Input OTP', path: '/components/input-otp' },
  { name: 'Kbd', path: '/components/kbd' },
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
  { name: 'Spinner', path: '/components/spinner' },
  { name: 'Stat Card', path: '/components/stat-card' },
  { name: 'Stepper', path: '/components/stepper' },
  { name: 'Sticker', path: '/components/sticker' },
  { name: 'Switch', path: '/components/switch' },
  { name: 'Table', path: '/components/table' },
  { name: 'Tabs', path: '/components/tabs' },
  { name: 'Textarea', path: '/components/textarea' },
  { name: 'Toggle', path: '/components/toggle' },
  { name: 'Toggle Group', path: '/components/toggle-group' },
  { name: 'Tooltip', path: '/components/tooltip' },
]

const marketingBlocks = [
  { name: 'Hero Section', path: '/blocks/hero-section' },
  { name: 'Feature Grid', path: '/blocks/feature-grid' },
  { name: 'Testimonials', path: '/blocks/testimonials' },
  { name: 'Logo Cloud', path: '/blocks/logo-cloud' },
  { name: 'CTA Section', path: '/blocks/cta-section' },
  { name: 'Stats Section', path: '/blocks/stats-section' },
  { name: 'Team Section', path: '/blocks/team-section' },
  { name: 'FAQ Section', path: '/blocks/faq-section' },
  { name: 'Footer Section', path: '/blocks/footer-section' },
  { name: 'Contact Section', path: '/blocks/contact-section' },
]

const applicationBlocks = [
  { name: 'Auth Forms', path: '/blocks/auth-forms' },
  { name: 'Settings Page', path: '/blocks/settings-page' },
  { name: 'Onboarding Flow', path: '/blocks/onboarding-flow' },
  { name: 'Error Pages', path: '/blocks/error-pages' },
  { name: 'Invoice', path: '/blocks/invoice' },
]

const pages = [
  { name: 'Home', path: '/', icon: Layout },
  { name: 'Documentation', path: '/docs', icon: FileText },
  { name: 'Installation', path: '/docs/installation', icon: FileText },
  { name: 'Components', path: '/components', icon: Layers },
  { name: 'Blocks', path: '/blocks', icon: LayoutGrid },
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
        className="inline-flex items-center gap-2 h-8 border-3 border-foreground bg-background px-2 sm:px-3 text-sm font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-150 shrink-0"
        aria-label="Search (⌘K)"
      >
        <Search className="h-3.5 w-3.5 shrink-0" />
        <span className="hidden md:inline text-xs text-muted-foreground">Search...</span>
        <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 border-2 border-foreground/30 bg-muted px-1.5 font-mono text-[10px] font-bold ml-1">
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
          <CommandSeparator />
          <CommandGroup heading="Marketing Blocks">
            {marketingBlocks.map((block) => (
              <CommandItem
                key={block.path}
                value={block.name}
                onSelect={() => runCommand(() => navigate(block.path))}
              >
                <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                <span>{block.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Application Blocks">
            {applicationBlocks.map((block) => (
              <CommandItem
                key={block.path}
                value={block.name}
                onSelect={() => runCommand(() => navigate(block.path))}
              >
                <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                <span>{block.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
