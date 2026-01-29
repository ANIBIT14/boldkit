import { Link, Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Menu, Moon, Sun, Github } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'

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
  { name: 'Checkbox', href: '/components/checkbox' },
  { name: 'Collapsible', href: '/components/collapsible' },
  { name: 'Command', href: '/components/command' },
  { name: 'Dialog', href: '/components/dialog' },
  { name: 'Drawer', href: '/components/drawer' },
  { name: 'Dropdown Menu', href: '/components/dropdown-menu' },
  { name: 'Hover Card', href: '/components/hover-card' },
  { name: 'Input', href: '/components/input' },
  { name: 'Input OTP', href: '/components/input-otp' },
  { name: 'Label', href: '/components/label' },
  { name: 'Layered Card', href: '/components/layered-card' },
  { name: 'Marquee', href: '/components/marquee' },
  { name: 'Pagination', href: '/components/pagination' },
  { name: 'Popover', href: '/components/popover' },
  { name: 'Progress', href: '/components/progress' },
  { name: 'Radio Group', href: '/components/radio-group' },
  { name: 'Scroll Area', href: '/components/scroll-area' },
  { name: 'Select', href: '/components/select' },
  { name: 'Separator', href: '/components/separator' },
  { name: 'Sheet', href: '/components/sheet' },
  { name: 'Skeleton', href: '/components/skeleton' },
  { name: 'Slider', href: '/components/slider' },
  { name: 'Sonner', href: '/components/sonner' },
  { name: 'Sticker', href: '/components/sticker' },
  { name: 'Switch', href: '/components/switch' },
  { name: 'Table', href: '/components/table' },
  { name: 'Tabs', href: '/components/tabs' },
  { name: 'Textarea', href: '/components/textarea' },
  { name: 'Toggle', href: '/components/toggle' },
  { name: 'Toggle Group', href: '/components/toggle-group' },
  { name: 'Tooltip', href: '/components/tooltip' },
]

function Sidebar({ className }: { className?: string }) {
  const location = useLocation()

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-6 py-4">
        {/* Getting Started Section */}
        <div className="px-3">
          <h2 className="mb-3 px-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Getting Started
          </h2>
          <div className="space-y-1">
            <Link to="/docs">
              <Button
                variant={location.pathname === '/docs' ? 'secondary' : 'ghost'}
                className="w-full justify-start h-9"
                size="sm"
              >
                Introduction
              </Button>
            </Link>
            <Link to="/docs/installation">
              <Button
                variant={location.pathname === '/docs/installation' ? 'secondary' : 'ghost'}
                className="w-full justify-start h-9"
                size="sm"
              >
                Installation
              </Button>
            </Link>
            <Link to="/docs/theming">
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
          <h2 className="mb-3 px-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Components
          </h2>
          <div className="space-y-1">
            {components.map((component) => (
              <Link key={component.href} to={component.href}>
                <Button
                  variant={location.pathname === component.href ? 'secondary' : 'ghost'}
                  className="w-full justify-start h-9"
                  size="sm"
                >
                  {component.name}
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
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b-3 border-foreground bg-background">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <ScrollArea className="h-full">
                <Sidebar className="px-2" />
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <Link to="/" className="mr-8 flex items-center gap-2">
            <img
              src="https://ik.imagekit.io/fincalfy/304a4c07-8de1-41af-813e-e7556234b973.png"
              alt="BoldKit"
              className="h-8 w-8"
            />
            <span className="hidden font-bold uppercase tracking-wide sm:inline-block">
              BoldKit
            </span>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Beta</Badge>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              to="/docs"
              className="transition-colors hover:text-foreground/80"
            >
              Docs
            </Link>
            <Link
              to="/components"
              className="transition-colors hover:text-foreground/80"
            >
              Components
            </Link>
            <Link
              to="/charts"
              className="transition-colors hover:text-foreground/80"
            >
              Charts
            </Link>
            <Link
              to="/themes"
              className="transition-colors hover:text-foreground/80"
            >
              Themes
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <a
              href="https://github.com/ANIBIT14/boldkit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
            >
              {resolvedTheme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12 px-4 md:px-6">
        <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-4">
            <Sidebar />
          </ScrollArea>
        </aside>
        <main className="relative py-8 lg:py-10">
          <div className="mx-auto w-full min-w-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
