import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Menu, Search, X } from 'lucide-react'
import { Header } from '@/components/layout'
import { FrameworkToggle, useFramework } from '@/hooks/use-framework'
import { TableOfContents } from '@/components/TableOfContents'

const marketingBlocks = [
  { name: 'Hero Section', href: '/blocks/hero-section', isNew: true },
  { name: 'Feature Grid', href: '/blocks/feature-grid', isNew: true },
  { name: 'Testimonials', href: '/blocks/testimonials', isNew: true },
  { name: 'Logo Cloud', href: '/blocks/logo-cloud', isNew: true },
  { name: 'CTA Section', href: '/blocks/cta-section', isNew: true },
  { name: 'Stats Section', href: '/blocks/stats-section', isNew: true },
  { name: 'Team Section', href: '/blocks/team-section', isNew: true },
  { name: 'FAQ Section', href: '/blocks/faq-section', isNew: true },
  { name: 'Footer Section', href: '/blocks/footer-section', isNew: true },
  { name: 'Contact Section', href: '/blocks/contact-section', isNew: true },
]

const applicationBlocks = [
  { name: 'Auth Forms', href: '/blocks/auth-forms', isNew: true },
  { name: 'Error Pages', href: '/blocks/error-pages', isNew: true },
  { name: 'Settings Page', href: '/blocks/settings-page', isNew: true },
  { name: 'Onboarding Flow', href: '/blocks/onboarding-flow', isNew: true },
  { name: 'Invoice', href: '/blocks/invoice', isNew: true },
]

const components = [
  { name: 'Accordion', href: '/components/accordion' },
  { name: 'Alert', href: '/components/alert' },
  { name: 'Alert Dialog', href: '/components/alert-dialog' },
  { name: 'Aspect Ratio', href: '/components/aspect-ratio' },
  { name: 'Avatar', href: '/components/avatar' },
  { name: 'Badge', href: '/components/badge' },
  { name: 'Breadcrumb', href: '/components/breadcrumb' },
  { name: 'Button', href: '/components/button' },
  { name: 'Calendar', href: '/components/calendar' },
  { name: 'Card', href: '/components/card' },
  { name: 'Carousel', href: '/components/carousel', isNew: true },
  { name: 'Checkbox', href: '/components/checkbox' },
  { name: 'Collapsible', href: '/components/collapsible' },
  { name: 'Combobox', href: '/components/combobox', isNew: true },
  { name: 'Command', href: '/components/command' },
  { name: 'Data Table', href: '/components/data-table', isNew: true },
  { name: 'Date Range Picker', href: '/components/date-range-picker', isNew: true },
  { name: 'Dialog', href: '/components/dialog' },
  { name: 'Drawer', href: '/components/drawer' },
  { name: 'Dropdown Menu', href: '/components/dropdown-menu' },
  { name: 'Dropzone', href: '/components/dropzone' },
  { name: 'Empty State', href: '/components/empty-state' },
  { name: 'Error Boundary', href: '/components/error-boundary', isNew: true },
  { name: 'Hover Card', href: '/components/hover-card' },
  { name: 'Input', href: '/components/input' },
  { name: 'Input OTP', href: '/components/input-otp' },
  { name: 'Kbd', href: '/components/kbd' },
  { name: 'Label', href: '/components/label' },
  { name: 'Layered Card', href: '/components/layered-card' },
  { name: 'ASCII Shapes', href: '/components/ascii-shapes', isNew: true },
  { name: 'MC Background', href: '/components/math-curve-background', isNew: true },
  { name: 'MC Loader', href: '/components/math-curve-loader', isNew: true },
  { name: 'MC Progress', href: '/components/math-curve-progress', isNew: true },
  { name: 'Marquee', href: '/components/marquee' },
  { name: 'Pagination', href: '/components/pagination' },
  { name: 'Popover', href: '/components/popover' },
  { name: 'Progress', href: '/components/progress' },
  { name: 'Radio Group', href: '/components/radio-group' },
  { name: 'Rating', href: '/components/rating', isNew: true },
  { name: 'Scroll Area', href: '/components/scroll-area' },
  { name: 'Select', href: '/components/select' },
  { name: 'Separator', href: '/components/separator' },
  { name: 'Sheet', href: '/components/sheet' },
  { name: 'Sidebar', href: '/components/sidebar', isNew: true },
  { name: 'Skeleton', href: '/components/skeleton' },
  { name: 'Slider', href: '/components/slider' },
  { name: 'Sonner', href: '/components/sonner' },
  { name: 'Spinner', href: '/components/spinner' },
  { name: 'Stat Card', href: '/components/stat-card' },
  { name: 'Stepper', href: '/components/stepper' },
  { name: 'Sticker', href: '/components/sticker' },
  { name: 'Switch', href: '/components/switch' },
  { name: 'Table', href: '/components/table' },
  { name: 'Tabs', href: '/components/tabs' },
  { name: 'Tag Input', href: '/components/tag-input', isNew: true },
  { name: 'Textarea', href: '/components/textarea' },
  { name: 'Time Picker', href: '/components/time-picker', isNew: true },
  { name: 'Timeline', href: '/components/timeline', isNew: true },
  { name: 'Toggle', href: '/components/toggle' },
  { name: 'Toggle Group', href: '/components/toggle-group' },
  { name: 'Tooltip', href: '/components/tooltip' },
  { name: 'Tour', href: '/components/tour', isNew: true },
  { name: 'Tree View', href: '/components/tree-view', isNew: true },
]

// ─── NavItem ────────────────────────────────────────────────────────────────
interface NavItemProps {
  to: string
  label: string
  isNew?: boolean
  isActive: boolean
  onClick?: () => void
  accentClass?: string
}

function NavItem({ to, label, isNew, isActive, onClick, accentClass = 'border-primary' }: NavItemProps) {
  return (
    <Link to={to} onClick={onClick} className="block">
      <div
        className={cn(
          'flex items-center justify-between py-1.5 pl-3 pr-2 text-sm transition-colors duration-100 border-l-3',
          isActive
            ? cn('bg-muted font-bold text-foreground', accentClass)
            : 'border-transparent font-medium text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
      >
        <span className="truncate">{label}</span>
        {isNew && (
          <Badge className="ml-1.5 shrink-0 h-4 px-1.5 text-[9px]">New</Badge>
        )}
      </div>
    </Link>
  )
}

const borderToBg: Record<string, string> = {
  'border-primary': 'bg-primary',
  'border-secondary': 'bg-secondary',
  'border-accent': 'bg-accent',
  'border-success': 'bg-success',
}

// ─── SectionHeader ──────────────────────────────────────────────────────────
function SectionHeader({
  label,
  accentClass,
  count,
}: {
  label: string
  accentClass: string
  count?: number
}) {
  return (
    <div className="mb-1.5 flex items-center gap-2 px-3">
      <div className={cn('h-3 w-1 shrink-0', borderToBg[accentClass] ?? 'bg-foreground')} />
      <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {count !== undefined && (
        <span className="text-[10px] font-bold text-muted-foreground/60 ml-auto">{count}</span>
      )}
    </div>
  )
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ className, onLinkClick }: { className?: string; onLinkClick?: () => void }) {
  const location = useLocation()
  const { framework } = useFramework()
  const [search, setSearch] = useState('')

  const frameworkLabels: Record<string, string> = {
    react: 'React',
    vue: 'Vue 3',
  }

  const q = search.toLowerCase().trim()

  const filteredComponents = q
    ? components.filter((c) => c.name.toLowerCase().includes(q))
    : components

  const filteredMarketing = q
    ? marketingBlocks.filter((b) => b.name.toLowerCase().includes(q))
    : marketingBlocks

  const filteredApp = q
    ? applicationBlocks.filter((b) => b.name.toLowerCase().includes(q))
    : applicationBlocks

  const gettingStartedItems = [
    { label: 'Introduction', to: '/docs' },
    { label: 'Installation', to: '/docs/installation' },
    { label: 'Theming', to: '/docs/theming' },
  ]

  const filteredGettingStarted = q
    ? gettingStartedItems.filter((i) => i.label.toLowerCase().includes(q))
    : gettingStartedItems

  const hasResults =
    filteredGettingStarted.length > 0 ||
    filteredComponents.length > 0 ||
    filteredMarketing.length > 0 ||
    filteredApp.length > 0

  const totalResults =
    filteredGettingStarted.length +
    filteredComponents.length +
    filteredMarketing.length +
    filteredApp.length

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-5 py-4">

        {/* Framework Toggle */}
        <div className="px-3 space-y-2">
          <div className="flex items-center justify-between px-3">
            <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
              Framework
            </span>
            <span className="text-[11px] font-bold text-foreground bg-muted border-3 border-foreground px-2 py-0.5 shadow-[2px_2px_0px_hsl(var(--shadow-color))]">
              {frameworkLabels[framework]}
            </span>
          </div>
          <div className="px-3">
            <FrameworkToggle variant="compact" />
          </div>
        </div>

        {/* Search */}
        <div className="px-3 space-y-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none z-10" />
            <Input
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-8 h-9 text-sm shadow-[2px_2px_0px_hsl(var(--shadow-color))] focus-visible:shadow-none focus-visible:translate-x-[2px] focus-visible:translate-y-[2px]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {q && (
            <p className="px-1 text-[11px] text-muted-foreground">
              {totalResults} result{totalResults !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Getting Started */}
        {filteredGettingStarted.length > 0 && (
          <div className="space-y-0.5">
            <SectionHeader label="Getting Started" accentClass="border-primary" />
            {filteredGettingStarted.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                label={item.label}
                isActive={location.pathname === item.to}
                onClick={onLinkClick}
                accentClass="border-primary"
              />
            ))}
          </div>
        )}

        {/* Components */}
        {filteredComponents.length > 0 && (
          <div className="space-y-0.5">
            <SectionHeader
              label="Components"
              accentClass="border-secondary"
              count={q ? filteredComponents.length : undefined}
            />
            {filteredComponents.map((component) => (
              <NavItem
                key={component.href}
                to={component.href}
                label={component.name}
                isNew={component.isNew}
                isActive={location.pathname === component.href}
                onClick={onLinkClick}
                accentClass="border-secondary"
              />
            ))}
          </div>
        )}

        {/* Marketing Blocks */}
        {filteredMarketing.length > 0 && (
          <div className="space-y-0.5">
            <SectionHeader
              label="Marketing Blocks"
              accentClass="border-accent"
              count={q ? filteredMarketing.length : undefined}
            />
            {filteredMarketing.map((block) => (
              <NavItem
                key={block.href}
                to={block.href}
                label={block.name}
                isNew={block.isNew}
                isActive={location.pathname === block.href}
                onClick={onLinkClick}
                accentClass="border-accent"
              />
            ))}
          </div>
        )}

        {/* Application Blocks */}
        {filteredApp.length > 0 && (
          <div className="space-y-0.5">
            <SectionHeader
              label="Application Blocks"
              accentClass="border-success"
              count={q ? filteredApp.length : undefined}
            />
            {filteredApp.map((block) => (
              <NavItem
                key={block.href}
                to={block.href}
                label={block.name}
                isNew={block.isNew}
                isActive={location.pathname === block.href}
                onClick={onLinkClick}
                accentClass="border-success"
              />
            ))}
          </div>
        )}

        {/* No results */}
        {!hasResults && q && (
          <div className="px-3">
            <div className="border-3 border-foreground bg-muted px-3 py-3 shadow-[2px_2px_0px_hsl(var(--shadow-color))]">
              <p className="text-xs font-bold text-muted-foreground">
                No results for &ldquo;{search}&rdquo;
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

// ─── Scroll Position Persistence ─────────────────────────────────────────────
const SIDEBAR_SCROLL_KEY = 'bk-sidebar-scroll'

// ─── DocsLayout ──────────────────────────────────────────────────────────────
export function DocsLayout() {
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Desktop sidebar scroll persistence
  useEffect(() => {
    const root = sidebarRef.current
    if (!root) return
    const viewport = root.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement | null
    if (!viewport) return

    const saved = sessionStorage.getItem(SIDEBAR_SCROLL_KEY)
    if (saved) viewport.scrollTop = parseInt(saved, 10)

    const onScroll = () => sessionStorage.setItem(SIDEBAR_SCROLL_KEY, String(viewport.scrollTop))
    viewport.addEventListener('scroll', onScroll, { passive: true })
    return () => viewport.removeEventListener('scroll', onScroll)
  }, [])

  // ── Mobile drawer state ─────────────────────────────────────────────────────
  // `drawerMounted` keeps the DOM node alive during slide-out; `drawerOpen`
  // drives the CSS transform so the transition has a start and end state.
  const [drawerMounted, setDrawerMounted] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const openDrawer = useCallback(() => {
    setDrawerMounted(true)
    // Two rAF guarantees the panel is painted before the transition fires
    requestAnimationFrame(() => requestAnimationFrame(() => setDrawerOpen(true)))
  }, [])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
    // Unmount after the 300 ms slide-out finishes
    setTimeout(() => setDrawerMounted(false), 300)
  }, [])

  // ESC key + body-scroll lock while drawer is visible
  useEffect(() => {
    if (!drawerMounted) return
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer() }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [drawerMounted, closeDrawer])

  const handleLinkClick = useCallback(() => {
    // Short delay so the active-link style updates before the drawer closes
    setTimeout(closeDrawer, 80)
  }, [closeDrawer])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Shared Header */}
      <Header />

      {/* Mobile nav bar */}
      <div className="md:hidden border-b-3 border-foreground bg-muted">
        <div className="container px-3 py-2 flex items-center justify-between">
          <Button variant="default" size="sm" className="h-8 gap-2" onClick={openDrawer}>
            <Menu className="h-4 w-4" />
            Navigation
          </Button>
          <span
            className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            BoldKit Docs
          </span>
        </div>
      </div>

      {/* ── Mobile slide-in drawer ─────────────────────────────────────────── */}
      {drawerMounted && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop — fades in/out */}
          <div
            className={cn(
              'absolute inset-0 bg-black/70 transition-opacity duration-300',
              drawerOpen ? 'opacity-100' : 'opacity-0'
            )}
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Slide panel */}
          <div
            className={cn(
              'absolute inset-y-0 left-0 flex w-[280px] flex-col bg-background',
              'border-r-3 border-foreground shadow-[6px_0px_0px_hsl(var(--shadow-color))]',
              'transition-transform duration-300 ease-in-out',
              drawerOpen ? 'translate-x-0' : '-translate-x-full'
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            {/* Drawer header — mirrors the main header height */}
            <div className="flex h-[63px] shrink-0 items-center justify-between border-b-3 border-foreground bg-muted px-4">
              <span
                className="text-xs font-black uppercase tracking-widest text-foreground"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                BoldKit Docs
              </span>
              <button
                onClick={closeDrawer}
                className={cn(
                  'border-3 border-foreground bg-background p-1',
                  'shadow-[3px_3px_0px_hsl(var(--shadow-color))]',
                  'transition-all duration-150',
                  'hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                )}
                aria-label="Close navigation"
              >
                <X className="h-4 w-4 stroke-[3]" />
              </button>
            </div>

            {/* Scrollable sidebar content */}
            <div className="flex-1 overflow-y-auto">
              <Sidebar className="px-2" onLinkClick={handleLinkClick} />
            </div>
          </div>
        </div>
      )}

      {/* ── Desktop three-column layout ────────────────────────────────────── */}
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[240px_minmax(0,1fr)_200px] px-3 md:px-4">
        <aside className="fixed top-[63px] z-30 hidden h-[calc(100vh-63px)] w-full shrink-0 md:sticky md:block border-r-3 border-foreground">
          <ScrollArea ref={sidebarRef} className="h-full py-2 pr-4">
            <Sidebar />
          </ScrollArea>
        </aside>
        <main id="main-content" className="relative py-6 lg:py-8">
          <div className="mx-auto w-full min-w-0">
            <Outlet />
          </div>
        </main>
        <aside className="hidden xl:block">
          <div className="sticky top-20 py-6">
            <TableOfContents />
          </div>
        </aside>
      </div>
    </div>
  )
}
