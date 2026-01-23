import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useTheme } from '@/hooks/use-theme'
import { Moon, Sun, Github, ArrowRight } from 'lucide-react'

const componentCategories = [
  {
    title: 'Form',
    components: [
      { name: 'Button', description: 'Clickable buttons with multiple variants', href: '/docs/button' },
      { name: 'Input', description: 'Text input fields with bold styling', href: '/docs/input' },
      { name: 'Textarea', description: 'Multi-line text input', href: '/docs/textarea' },
      { name: 'Checkbox', description: 'Checkbox inputs with hard shadows', href: '/docs/checkbox' },
      { name: 'Radio Group', description: 'Radio button groups', href: '/docs/radio-group' },
      { name: 'Select', description: 'Dropdown select menus', href: '/docs/select' },
      { name: 'Switch', description: 'Toggle switches', href: '/docs/switch' },
      { name: 'Slider', description: 'Range slider inputs', href: '/docs/slider' },
      { name: 'Label', description: 'Form labels', href: '/docs/label' },
    ],
  },
  {
    title: 'Data Display',
    components: [
      { name: 'Card', description: 'Container for content with header/footer', href: '/docs/card' },
      { name: 'Badge', description: 'Small labels and tags', href: '/docs/badge' },
      { name: 'Avatar', description: 'User profile images', href: '/docs/avatar' },
      { name: 'Table', description: 'Data tables with bold borders', href: '/docs/table' },
      { name: 'Progress', description: 'Progress bars', href: '/docs/progress' },
      { name: 'Skeleton', description: 'Loading placeholders', href: '/docs/skeleton' },
      { name: 'Separator', description: 'Visual dividers', href: '/docs/separator' },
    ],
  },
  {
    title: 'Feedback',
    components: [
      { name: 'Alert', description: 'Alert messages with icons', href: '/docs/alert' },
      { name: 'Dialog', description: 'Modal dialog boxes', href: '/docs/dialog' },
      { name: 'Sheet', description: 'Slide-out panels', href: '/docs/sheet' },
      { name: 'Toast', description: 'Toast notifications', href: '/docs/toast' },
      { name: 'Tooltip', description: 'Hover tooltips', href: '/docs/tooltip' },
      { name: 'Popover', description: 'Floating content panels', href: '/docs/popover' },
    ],
  },
  {
    title: 'Navigation',
    components: [
      { name: 'Tabs', description: 'Tabbed navigation', href: '/docs/tabs' },
      { name: 'Accordion', description: 'Collapsible content sections', href: '/docs/accordion' },
      { name: 'Breadcrumb', description: 'Navigation breadcrumbs', href: '/docs/breadcrumb' },
      { name: 'Dropdown Menu', description: 'Dropdown menus', href: '/docs/dropdown-menu' },
      { name: 'Command', description: 'Command palette', href: '/docs/command' },
    ],
  },
  {
    title: 'Layout',
    components: [
      { name: 'Aspect Ratio', description: 'Maintain aspect ratios', href: '/docs/aspect-ratio' },
      { name: 'Scroll Area', description: 'Custom scrollbars', href: '/docs/scroll-area' },
      { name: 'Collapsible', description: 'Expandable sections', href: '/docs/collapsible' },
    ],
  },
]

export function Components() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b-3 border-foreground bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl font-black">◼</span>
            <span className="text-xl font-black uppercase tracking-wider">BoldKit</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/docs">
              <Button variant="ghost">Docs</Button>
            </Link>
            <Link to="/themes">
              <Button variant="ghost">Themes</Button>
            </Link>
            <a href="https://github.com/ANIBIT14/boldkit" target="_blank" rel="noopener noreferrer">
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
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <Badge variant="secondary" className="mb-4">30+ Components</Badge>
          <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            All Components
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Browse all available BoldKit components. Click on any component to see documentation and examples.
          </p>
        </div>

        <div className="space-y-12">
          {componentCategories.map((category) => (
            <div key={category.title}>
              <h2 className="mb-6 text-2xl font-bold uppercase tracking-wide border-b-3 border-foreground pb-2 inline-block">
                {category.title}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.components.map((component) => (
                  <Link key={component.name} to={component.href}>
                    <Card className="h-full transition-transform hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center justify-between text-lg">
                          {component.name}
                          <ArrowRight className="h-4 w-4" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{component.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
