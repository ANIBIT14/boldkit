import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useTheme } from '@/hooks/use-theme'
import { Moon, Sun, Github, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Docs', href: '/docs' },
  { label: 'Components', href: '/components' },
  { label: 'Shapes', href: '/shapes' },
  { label: 'Charts', href: '/charts' },
  { label: 'Themes', href: '/themes' },
  { label: 'Templates', href: '/templates' },
]

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-50 border-b-3 border-foreground bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://ik.imagekit.io/fincalfy/304a4c07-8de1-41af-813e-e7556234b973.png"
            alt="BoldKit"
            className="h-8 w-8"
          />
          <span className="text-xl font-black uppercase tracking-wider">BoldKit</span>
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Beta</Badge>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  location.pathname.startsWith(item.href) && 'bg-muted'
                )}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/ANIBIT14/boldkit"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block"
          >
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
          >
            {resolvedTheme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-3 border-foreground bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start',
                    location.pathname.startsWith(item.href) && 'bg-muted'
                  )}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <a
              href="https://github.com/ANIBIT14/boldkit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Github className="h-5 w-5" />
                GitHub
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
