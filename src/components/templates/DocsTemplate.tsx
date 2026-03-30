import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SEO } from '@/components/SEO'
import {
  Search, ChevronRight, ChevronDown, Menu, X, Moon, Sun,
  Copy, Check, ExternalLink, Github, Twitter, ArrowLeft, ArrowRight,
  BookOpen, Zap, Layers, Code2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================
// DOCS SITE TEMPLATE - NEUBRUTALISM STYLE
// ============================================
// Copy this template and customize for your project

const NAV_SECTIONS = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '#introduction', active: true },
      { label: 'Installation', href: '#installation' },
      { label: 'Quick Start', href: '#quick-start' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { label: 'Components', href: '#components' },
      { label: 'Theming', href: '#theming' },
      { label: 'Typography', href: '#typography' },
      { label: 'Spacing', href: '#spacing' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Button', href: '#button' },
      { label: 'Card', href: '#card' },
      { label: 'Badge', href: '#badge' },
      { label: 'Input', href: '#input' },
      { label: 'Dialog', href: '#dialog' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { label: 'Props', href: '#props' },
      { label: 'Variants', href: '#variants' },
      { label: 'Hooks', href: '#hooks' },
    ],
  },
]

const TOC_ITEMS = [
  { label: 'Overview', href: '#overview', level: 1 },
  { label: 'Installation', href: '#installation', level: 1 },
  { label: 'npm / pnpm', href: '#npm', level: 2 },
  { label: 'CDN', href: '#cdn', level: 2 },
  { label: 'Usage', href: '#usage', level: 1 },
  { label: 'Basic example', href: '#basic', level: 2 },
  { label: 'With variants', href: '#variants', level: 2 },
  { label: 'Props', href: '#props', level: 1 },
]

function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="flex items-center gap-1.5 text-xs font-mono font-bold px-2 py-1 border-2 border-foreground/30 hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-100"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  return (
    <div className="relative border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] my-4">
      <div className="flex items-center justify-between bg-foreground px-4 py-1.5">
        <span className="text-xs font-mono font-bold text-background uppercase tracking-widest">{lang}</span>
        <CopyCodeButton code={code} />
      </div>
      <pre className="bg-muted p-4 overflow-x-auto text-sm font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function NavSection({ section, defaultOpen = true }: { section: typeof NAV_SECTIONS[0]; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-1.5 text-xs font-black uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors"
      >
        {section.title}
        {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
      </button>
      {open && (
        <ul className="space-y-0.5 mb-3">
          {section.items.map(item => (
            <li key={item.label}>
              <a
                href={item.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 text-sm font-medium border-l-2 transition-all duration-100',
                  item.active
                    ? 'border-primary bg-primary/10 font-bold text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground hover:bg-muted/50'
                )}
              >
                {item.active && <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function DocsTemplate() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [dark, setDark] = React.useState(false)
  const [searchVal, setSearchVal] = React.useState('')

  return (
    <div className={cn('min-h-screen bg-background text-foreground font-sans', dark && 'dark')}>
      <SEO
        title="Documentation — BoldKit Docs Template"
        description="A documentation site template built with BoldKit neubrutalism components."
        url="/templates/docs"
      />

      {/* ── Sticky Header ─────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b-3 border-foreground bg-background flex items-center gap-3 px-4 h-14 shadow-[0_3px_0px_hsl(var(--shadow-color))]">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-1.5 border-2 border-foreground hover:bg-foreground hover:text-background transition-all"
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>

        {/* Logo */}
        <a href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 bg-primary border-2 border-foreground flex items-center justify-center">
            <BookOpen className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-black text-base uppercase tracking-tight hidden sm:block">BoldKit <span className="text-primary">Docs</span></span>
        </a>

        {/* Search */}
        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search docs..."
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Badge variant="secondary" className="hidden sm:flex">v3.0</Badge>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDark(!dark)}>
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <a href="https://github.com/ANIBIT14/boldkit" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button size="sm" className="hidden sm:flex gap-1.5">
            Get Started <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* ── Sidebar ───────────────────────────────────── */}
        <aside className={cn(
          'fixed lg:sticky top-14 z-40 h-[calc(100vh-3.5rem)] w-64 flex-shrink-0 border-r-3 border-foreground bg-background overflow-y-auto transition-transform duration-200',
          'lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}>
          <nav className="p-4 space-y-1">
            {/* Version selector */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-foreground/20">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Version</span>
              <select className="text-xs font-bold border-2 border-foreground bg-background px-2 py-0.5 cursor-pointer">
                <option>v3.0 (latest)</option>
                <option>v2.8</option>
                <option>v2.5</option>
              </select>
            </div>

            {NAV_SECTIONS.map((section, i) => (
              <NavSection key={section.title} section={section} defaultOpen={i < 2} />
            ))}
          </nav>
        </aside>

        {/* Sidebar overlay on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-foreground/20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Main Content ──────────────────────────────── */}
        <main className="flex-1 min-w-0 max-w-3xl px-6 py-10 lg:pr-0">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs font-mono font-bold text-muted-foreground mb-6">
            <a href="/docs" className="hover:text-foreground transition-colors">Docs</a>
            <ChevronRight className="h-3 w-3" />
            <a href="#getting-started" className="hover:text-foreground transition-colors">Getting Started</a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Introduction</span>
          </nav>

          {/* Page title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="default">New in v3.0</Badge>
              <Badge variant="outline">React & Vue 3</Badge>
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tight mb-3">Introduction</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              BoldKit is a neubrutalism UI component library for React and Vue 3. Build bold, distinctive interfaces with thick borders, hard shadows, and vibrant colors.
            </p>
          </div>

          <Separator className="my-6" />

          {/* Overview */}
          <section id="overview" className="mb-10">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              BoldKit provides 50+ accessible components built on Radix UI and Reka UI primitives, styled with the neubrutalism aesthetic. Every component ships with:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 not-prose">
              {[
                { icon: <Layers className="h-5 w-5" />, title: '50+ Components', desc: 'Accordion to Toggle, fully accessible', color: 'bg-primary' },
                { icon: <Zap className="h-5 w-5" />, title: '10 Chart Types', desc: 'Area, Bar, Donut, Sankey and more', color: 'bg-secondary' },
                { icon: <Code2 className="h-5 w-5" />, title: 'shadcn CLI', desc: 'Install components individually via CLI', color: 'bg-accent' },
                { icon: <BookOpen className="h-5 w-5" />, title: '14 Themes', desc: 'Cyberpunk, Retro, Pastel, Gold and more', color: 'bg-success' },
              ].map(card => (
                <div key={card.title} className="flex gap-3 p-4 border-3 border-foreground shadow-[3px_3px_0px_hsl(var(--shadow-color))] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_hsl(var(--shadow-color))] transition-all duration-100">
                  <div className={`${card.color} p-2 border-2 border-foreground h-fit flex-shrink-0`}>
                    {card.icon}
                  </div>
                  <div>
                    <p className="font-black uppercase text-sm">{card.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Installation */}
          <section id="installation" className="mb-10">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Installation</h2>
            <p className="text-muted-foreground mb-2">Install individual components via the shadcn CLI:</p>
            <CodeBlock code="npx shadcn@latest add https://boldkit.dev/r/button.json" lang="bash" />

            <p className="text-muted-foreground mb-2 mt-6">Or add the full package:</p>
            <CodeBlock code={`npm install @boldkit/react\n# or\npnpm add @boldkit/react`} lang="bash" />
          </section>

          {/* Usage */}
          <section id="usage" className="mb-10">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Usage</h2>

            <h3 className="text-lg font-black uppercase tracking-tight mb-3" id="basic">Basic Example</h3>
            <CodeBlock lang="tsx" code={`import { Button } from '@/components/ui/button'

export default function App() {
  return (
    <Button>Click me</Button>
  )
}`} />

            <h3 className="text-lg font-black uppercase tracking-tight mb-3 mt-6" id="variants">With Variants</h3>
            <CodeBlock lang="tsx" code={`import { Button } from '@/components/ui/button'

export default function App() {
  return (
    <div className="flex gap-2">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}`} />
          </section>

          {/* Props Table */}
          <section id="props" className="mb-10">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Props</h2>
            <div className="border-3 border-foreground overflow-x-auto shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="bg-foreground text-background">
                    <th className="text-left px-4 py-2.5 font-black uppercase text-xs tracking-widest">Prop</th>
                    <th className="text-left px-4 py-2.5 font-black uppercase text-xs tracking-widest">Type</th>
                    <th className="text-left px-4 py-2.5 font-black uppercase text-xs tracking-widest">Default</th>
                    <th className="text-left px-4 py-2.5 font-black uppercase text-xs tracking-widest">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { prop: 'variant', type: '"default" | "secondary" | "outline" | "ghost" | "destructive"', def: '"default"', desc: 'Visual style variant' },
                    { prop: 'size', type: '"sm" | "default" | "lg" | "icon"', def: '"default"', desc: 'Size of the button' },
                    { prop: 'asChild', type: 'boolean', def: 'false', desc: 'Render as child element via Radix Slot' },
                    { prop: 'disabled', type: 'boolean', def: 'false', desc: 'Disables the button' },
                    { prop: 'className', type: 'string', def: '—', desc: 'Additional CSS classes' },
                  ].map((row, i) => (
                    <tr key={row.prop} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/40'}>
                      <td className="px-4 py-2.5 font-bold text-primary">{row.prop}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground max-w-[180px] truncate">{row.type}</td>
                      <td className="px-4 py-2.5 text-accent font-bold">{row.def}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Prev / Next navigation */}
          <Separator className="my-8" />
          <div className="flex items-center justify-between gap-4">
            <Button variant="outline" className="gap-2 flex-1 justify-start" disabled>
              <ArrowLeft className="h-4 w-4" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wide">Previous</div>
                <div className="text-sm font-bold">—</div>
              </div>
            </Button>
            <Button variant="outline" className="gap-2 flex-1 justify-end">
              <div className="text-right">
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wide">Next</div>
                <div className="text-sm font-bold">Installation</div>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Edit this page */}
          <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
            <ExternalLink className="h-3.5 w-3.5" />
            <a href="#" className="hover:text-foreground hover:underline font-mono font-bold transition-colors">Edit this page on GitHub</a>
          </div>
        </main>

        {/* ── Right ToC ─────────────────────────────────── */}
        <aside className="hidden xl:block sticky top-14 h-[calc(100vh-3.5rem)] w-52 flex-shrink-0 overflow-y-auto p-6 border-l-3 border-foreground">
          <p className="text-xs font-black uppercase tracking-widest text-foreground mb-3">On this page</p>
          <ul className="space-y-1">
            {TOC_ITEMS.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    'block text-xs font-medium text-muted-foreground hover:text-foreground transition-colors leading-relaxed',
                    item.level === 2 && 'pl-3 border-l-2 border-foreground/20 hover:border-primary',
                    item.level === 1 && 'font-bold text-foreground/80'
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <Separator className="my-4" />
          <div className="space-y-2">
            <a href="https://github.com/ANIBIT14/boldkit" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-3.5 w-3.5" /> Twitter
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default DocsTemplate
