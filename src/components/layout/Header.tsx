import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SearchCommand } from '@/components/SearchCommand'
import { useTheme } from '@/hooks/use-theme'
import {
  Moon,
  Sun,
  Github,
  Menu,
  X,
  BookOpen,
  Layers,
  Shapes,
  BarChart3,
  Palette,
  LayoutTemplate,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Docs', href: '/docs', icon: BookOpen },
  { label: 'Components', href: '/components', icon: Layers },
  { label: 'Shapes', href: '/shapes', icon: Shapes },
  { label: 'Charts', href: '/charts', icon: BarChart3 },
  { label: 'Themes', href: '/themes', icon: Palette },
  { label: 'Templates', href: '/templates', icon: LayoutTemplate },
]

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-50 border-b-3 border-foreground bg-background">
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:font-bold focus:border-3 focus:border-foreground"
      >
        Skip to main content
      </a>
      <div className="container mx-auto flex h-14 items-center justify-between px-3 lg:px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 shrink-0">
          <img
            src="https://ik.imagekit.io/fincalfy/304a4c07-8de1-41af-813e-e7556234b973.png"
            alt="BoldKit"
            className="h-7 w-7"
          />
          <span className="text-lg font-black uppercase tracking-wider hidden sm:inline">BoldKit</span>
          <Badge variant="secondary" className="text-[9px] px-1 py-0 hidden sm:inline-flex">Beta</Badge>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'h-8 px-2.5 text-xs font-bold gap-1.5',
                    location.pathname.startsWith(item.href) && 'bg-muted'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-1">
          <SearchCommand />
          <a
            href="https://github.com/ANIBIT14/boldkit"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block"
            aria-label="View BoldKit on GitHub"
          >
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="GitHub repository">
              <Github className="h-4 w-4" />
            </Button>
          </a>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
            aria-label={resolvedTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {resolvedTheme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-3 border-foreground bg-background">
          <div className="container mx-auto px-3 py-3 flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'w-full justify-start h-9 text-sm font-bold gap-2',
                      location.pathname.startsWith(item.href) && 'bg-muted'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
            <a
              href="https://github.com/ANIBIT14/boldkit"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden"
            >
              <Button variant="ghost" size="sm" className="w-full justify-start h-9 text-sm font-bold gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
