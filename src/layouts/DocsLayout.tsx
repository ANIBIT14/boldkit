import { Link, Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Menu, Moon, Sun, Github } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'

const components = [
  { name: 'Accordion', href: '/docs/accordion' },
  { name: 'Alert', href: '/docs/alert' },
  { name: 'Avatar', href: '/docs/avatar' },
  { name: 'Badge', href: '/docs/badge' },
  { name: 'Breadcrumb', href: '/docs/breadcrumb' },
  { name: 'Button', href: '/docs/button' },
  { name: 'Card', href: '/docs/card' },
  { name: 'Checkbox', href: '/docs/checkbox' },
  { name: 'Dialog', href: '/docs/dialog' },
  { name: 'Dropdown Menu', href: '/docs/dropdown-menu' },
  { name: 'Input', href: '/docs/input' },
  { name: 'Label', href: '/docs/label' },
  { name: 'Popover', href: '/docs/popover' },
  { name: 'Progress', href: '/docs/progress' },
  { name: 'Radio Group', href: '/docs/radio-group' },
  { name: 'Select', href: '/docs/select' },
  { name: 'Separator', href: '/docs/separator' },
  { name: 'Sheet', href: '/docs/sheet' },
  { name: 'Skeleton', href: '/docs/skeleton' },
  { name: 'Slider', href: '/docs/slider' },
  { name: 'Switch', href: '/docs/switch' },
  { name: 'Table', href: '/docs/table' },
  { name: 'Tabs', href: '/docs/tabs' },
  { name: 'Textarea', href: '/docs/textarea' },
  { name: 'Toggle', href: '/docs/toggle' },
  { name: 'Tooltip', href: '/docs/tooltip' },
]

function Sidebar({ className }: { className?: string }) {
  const location = useLocation()

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-bold uppercase tracking-wide">
            Getting Started
          </h2>
          <div className="space-y-1">
            <Link to="/docs">
              <Button
                variant={location.pathname === '/docs' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                size="sm"
              >
                Introduction
              </Button>
            </Link>
            <Link to="/docs/installation">
              <Button
                variant={location.pathname === '/docs/installation' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                size="sm"
              >
                Installation
              </Button>
            </Link>
            <Link to="/docs/theming">
              <Button
                variant={location.pathname === '/docs/theming' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                size="sm"
              >
                Theming
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-bold uppercase tracking-wide">
            Components
          </h2>
          <div className="space-y-1">
            {components.map((component) => (
              <Link key={component.href} to={component.href}>
                <Button
                  variant={location.pathname === component.href ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
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
        <div className="container flex h-16 items-center px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <ScrollArea className="h-full">
                <Sidebar />
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="text-2xl font-black">◼</span>
            <span className="hidden font-bold uppercase tracking-wide sm:inline-block">
              BoldKit
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/docs" className="transition-colors hover:text-foreground/80">
              Docs
            </Link>
            <Link to="/components" className="transition-colors hover:text-foreground/80">
              Components
            </Link>
            <Link to="/themes" className="transition-colors hover:text-foreground/80">
              Themes
            </Link>
          </nav>

          <div className="ml-auto flex items-center space-x-2">
            <a
              href="https://github.com/boldkit/boldkit"
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

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-6 lg:py-8">
            <Sidebar />
          </ScrollArea>
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
