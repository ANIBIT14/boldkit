import { Link, useLocation } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { SearchCommand } from '@/components/SearchCommand'
import { GitHubStars } from '@/components/GitHubStars'
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
  LayoutGrid,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const DISPLAY: React.CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" }

const navItems = [
  { label: 'Docs',       href: '/docs',           icon: BookOpen },
  { label: 'Components', href: '/components',     icon: Layers },
  { label: 'Blocks',     href: '/blocks',         icon: LayoutGrid },
  { label: 'Shapes',     href: '/shapes',         icon: Shapes },
  { label: 'Charts',     href: '/charts',         icon: BarChart3 },
  { label: 'Canvas',     href: '/canvas-effects', icon: Sparkles },
  { label: 'Themes',     href: '/themes',         icon: Palette },
  { label: 'Templates',  href: '/templates',      icon: LayoutTemplate },
]

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  return (
    <>
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[200] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:font-bold focus:border-3 focus:border-foreground"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 bg-background border-b-3 border-foreground">
        {/* Multi-color palette stripe */}
        <div className="flex w-full h-1">
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-secondary" />
          <div className="flex-1 bg-accent" />
          <div className="flex-1 bg-success" />
          <div className="flex-1 bg-info" />
        </div>

        <div className="container mx-auto flex h-14 items-center justify-between px-3 lg:px-6">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 group"
            aria-label="BoldKit home"
          >
            <div className="relative">
              <img
                src="https://ik.imagekit.io/fincalfy/304a4c07-8de1-41af-813e-e7556234b973.png"
                alt=""
                className="h-7 w-7 transition-transform group-hover:rotate-[-6deg] duration-200"
              />
            </div>
            <span
              className="text-2xl leading-none tracking-wider"
              style={DISPLAY}
            >
              BoldKit
            </span>
            <Badge
              variant="secondary"
              className="text-[9px] px-1 py-0 h-4 hidden sm:inline-flex"
            >
              v3.2
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = item.href === '/' ? location.pathname === '/' : location.pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'relative px-3 h-14 flex items-center text-sm font-bold tracking-wide transition-colors duration-150',
                    'hover:text-primary',
                    isActive
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground'
                  )}
                >
                  {item.label}
                  {/* Active underline — sits flush with bottom border */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right-side actions */}
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <SearchCommand />

            {/* GitHub stars — hidden on xs, shown sm+ */}
            <div className="hidden sm:block">
              <GitHubStars />
            </div>

            {/* Theme toggle */}
            <button
              className="h-8 w-8 flex items-center justify-center border-3 border-foreground bg-background hover:bg-foreground hover:text-background transition-colors duration-150 shrink-0"
              onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
              aria-label={resolvedTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              title={resolvedTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {resolvedTheme === 'light'
                ? <Moon className="h-3.5 w-3.5" />
                : <Sun className="h-3.5 w-3.5" />
              }
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden h-8 w-8 flex items-center justify-center border-3 border-foreground bg-background hover:bg-foreground hover:text-background transition-colors duration-150 shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/20"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Panel */}
          <div className="absolute top-[calc(3px+56px+3px)] left-0 right-0 bottom-0 bg-background border-t-3 border-foreground overflow-y-auto">

            {/* Nav links */}
            <div className="px-4 pt-4 pb-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2 px-1">
                Navigate
              </p>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = item.href === '/' ? location.pathname === '/' : location.pathname.startsWith(item.href)
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-3 font-bold text-base border-3 transition-all duration-100',
                        isActive
                          ? 'border-foreground bg-primary text-primary-foreground shadow-[3px_3px_0px_hsl(var(--foreground))]'
                          : 'border-transparent hover:border-foreground hover:bg-muted hover:shadow-[3px_3px_0px_hsl(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px]'
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                      {isActive && <span className="ml-auto text-xs opacity-70">Current</span>}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Divider */}
            <div className="mx-4 my-3 border-t-2 border-foreground/10" />

            {/* GitHub & actions */}
            <div className="px-4 pb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2 px-1">
                More
              </p>
              <a
                href="https://github.com/ANIBIT14/boldkit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-3 font-bold text-base border-3 border-transparent hover:border-foreground hover:bg-muted hover:shadow-[3px_3px_0px_hsl(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-100"
              >
                <Github className="h-4 w-4 shrink-0" />
                <span>GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5 ml-auto opacity-50" />
              </a>
            </div>

            {/* Bottom safe area padding */}
            <div className="h-[env(safe-area-inset-bottom,16px)]" />
          </div>
        </div>
      )}
    </>
  )
}
