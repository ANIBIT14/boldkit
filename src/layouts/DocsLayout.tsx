import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Menu } from 'lucide-react'
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
  { name: 'Command', href: '/components/command' },
  { name: 'Data Table', href: '/components/data-table', isNew: true },
  { name: 'Date Range Picker', href: '/components/date-range-picker', isNew: true },
  { name: 'Dialog', href: '/components/dialog' },
  { name: 'Drawer', href: '/components/drawer' },
  { name: 'Dropdown Menu', href: '/components/dropdown-menu' },
  { name: 'Dropzone', href: '/components/dropzone' },
  { name: 'Empty State', href: '/components/empty-state' },
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


function Sidebar({ className, onLinkClick }: { className?: string; onLinkClick?: () => void }) {
  const location = useLocation()
  const { framework } = useFramework()

  const frameworkLabels: Record<string, string> = {
    react: 'React',
    vue: 'Vue 3'
  }

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-6 py-4">
        {/* Framework Toggle */}
        <div className="px-3">
          <div className="px-4 mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Framework
            </span>
            <span className="text-xs font-bold text-foreground">
              {frameworkLabels[framework]}
            </span>
          </div>
          <div className="px-4">
            <FrameworkToggle variant="compact" />
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="px-3">
          <h2 className="mb-3 px-4 text-xs font-black uppercase tracking-widest text-foreground border-l-3 border-primary pl-3">
            Getting Started
          </h2>
          <div className="space-y-1">
            <Link to="/docs" onClick={onLinkClick}>
              <Button
                variant={location.pathname === '/docs' ? 'secondary' : 'ghost'}
                className="w-full justify-start h-9"
                size="sm"
              >
                Introduction
              </Button>
            </Link>
            <Link to="/docs/installation" onClick={onLinkClick}>
              <Button
                variant={location.pathname === '/docs/installation' ? 'secondary' : 'ghost'}
                className="w-full justify-start h-9"
                size="sm"
              >
                Installation
              </Button>
            </Link>
            <Link to="/docs/theming" onClick={onLinkClick}>
              <Button
                variant={location.pathname === '/docs/theming' ? 'secondary' : 'ghost'}
                className="w-full justify-start h-9"
                size="sm"
              >
                Theming
              </Button>
            </Link>
          </div>
        </div>

        {/* Components Section */}
        <div className="px-3">
          <h2 className="mb-3 px-4 text-xs font-black uppercase tracking-widest text-foreground border-l-3 border-secondary pl-3">
            Components
          </h2>
          <div className="space-y-1">
            {components.map((component) => (
              <Link key={component.href} to={component.href} onClick={onLinkClick}>
                <Button
                  variant={location.pathname === component.href ? 'secondary' : 'ghost'}
                  className="w-full justify-between h-9"
                  size="sm"
                >
                  <span className="truncate">{component.name}</span>
                  {component.isNew && (
                    <Badge className="ml-1 shrink-0 h-4 px-1.5 text-[9px]">New</Badge>
                  )}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Marketing Blocks Section */}
        <div className="px-3">
          <h2 className="mb-3 px-4 text-xs font-black uppercase tracking-widest text-foreground border-l-3 border-accent pl-3">
            Marketing Blocks
          </h2>
          <div className="space-y-1">
            {marketingBlocks.map((block) => (
              <Link key={block.href} to={block.href} onClick={onLinkClick}>
                <Button
                  variant={location.pathname === block.href ? 'secondary' : 'ghost'}
                  className="w-full justify-between h-9"
                  size="sm"
                >
                  <span>{block.name}</span>
                  {block.isNew && (
                    <Badge className="ml-1 shrink-0 h-4 px-1.5 text-[9px]">New</Badge>
                  )}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Application Blocks Section */}
        <div className="px-3">
          <h2 className="mb-3 px-4 text-xs font-black uppercase tracking-widest text-foreground border-l-3 border-success pl-3">
            Application Blocks
          </h2>
          <div className="space-y-1">
            {applicationBlocks.map((block) => (
              <Link key={block.href} to={block.href} onClick={onLinkClick}>
                <Button
                  variant={location.pathname === block.href ? 'secondary' : 'ghost'}
                  className="w-full justify-between h-9"
                  size="sm"
                >
                  <span>{block.name}</span>
                  {block.isNew && (
                    <Badge className="ml-1 shrink-0 h-4 px-1.5 text-[9px]">New</Badge>
                  )}
                </Button>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLinkClick = () => {
    // Small delay to prevent flicker during navigation
    setTimeout(() => setSidebarOpen(false), 100)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Shared Header */}
      <Header />

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden border-b-3 border-foreground bg-muted">
        <div className="container px-3 py-2 flex items-center justify-between">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="default" size="sm" className="h-8 gap-2">
                <Menu className="h-4 w-4" />
                Navigation
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 pt-[63px]">
              <ScrollArea className="h-full">
                <Sidebar className="px-2" onLinkClick={handleLinkClick} />
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
            BoldKit Docs
          </span>
        </div>
      </div>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[240px_minmax(0,1fr)_200px] px-3 md:px-4">
        <aside className="fixed top-[63px] z-30 hidden h-[calc(100vh-63px)] w-full shrink-0 md:sticky md:block border-r-3 border-foreground">
          <ScrollArea className="h-full py-6 pr-4">
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
