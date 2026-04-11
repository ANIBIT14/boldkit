import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SEO } from '@/components/SEO'
import {
  Search, ChevronRight, ChevronDown, Menu, X, Moon, Sun,
  Copy, Check, ExternalLink, Github, ArrowLeft, ArrowRight,
  BookOpen, Zap, Layers, Code2, Terminal, Info,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { COUNTS } from '@/config/routes-meta'

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

// ── Copy button ──────────────────────────────────────────
function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className={cn(
        'flex items-center gap-1.5 text-[10px] font-mono font-bold px-2 py-0.5 transition-all duration-100',
        copied
          ? 'bg-success text-success-foreground border border-success'
          : 'border border-background/30 text-background/70 hover:text-background hover:border-background/60'
      )}
    >
      {copied ? <Check className="h-2.5 w-2.5" /> : <Copy className="h-2.5 w-2.5" />}
      {copied ? 'COPIED' : 'COPY'}
    </button>
  )
}

// ── Code block ──────────────────────────────────────────
function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  return (
    <div className="border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] my-5 overflow-hidden">
      {/* Terminal header bar */}
      <div className="flex items-center justify-between bg-foreground px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive opacity-80" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning opacity-80" />
            <div className="w-2.5 h-2.5 rounded-full bg-success opacity-80" />
          </div>
          <span className="text-[10px] font-mono font-bold text-background/50 uppercase tracking-[0.15em] ml-1">
            {lang === 'bash' ? <Terminal className="h-2.5 w-2.5 inline mr-1 -mt-0.5" /> : null}
            {lang}
          </span>
        </div>
        <CopyCodeButton code={code} />
      </div>
      {/* Code body */}
      <pre className="bg-foreground/5 border-t border-foreground/10 p-5 overflow-x-auto text-[13px] font-mono leading-relaxed text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  )
}

// ── Callout ─────────────────────────────────────────────
function Callout({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' }) {
  const styles = {
    info: 'bg-info/10 border-info',
    warning: 'bg-warning/10 border-warning',
  }
  return (
    <div className={cn('flex gap-3 border-l-4 px-4 py-3 my-5 border-3', styles[type])}>
      <Info className="h-4 w-4 flex-shrink-0 mt-0.5 text-info" />
      <div className="text-sm leading-relaxed text-foreground/80">{children}</div>
    </div>
  )
}

// ── Sidebar nav section ──────────────────────────────────
function NavSection({ section, defaultOpen = true }: { section: typeof NAV_SECTIONS[0]; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-2 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-foreground/50 hover:text-foreground/80 transition-colors"
      >
        {section.title}
        {open
          ? <ChevronDown className="h-3 w-3 flex-shrink-0" />
          : <ChevronRight className="h-3 w-3 flex-shrink-0" />}
      </button>
      {open && (
        <ul className="mb-2">
          {section.items.map(item => (
            <li key={item.label}>
              <a
                href={item.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-[5px] text-sm transition-all duration-100 border-l-2',
                  item.active
                    ? 'border-primary bg-primary/8 font-bold text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/20 hover:bg-muted/40'
                )}
              >
                {item.active && (
                  <span className="w-1 h-1 bg-primary flex-shrink-0" />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ── Main component ───────────────────────────────────────
export function DocsTemplate() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [dark, setDark] = React.useState(false)
  const [searchVal, setSearchVal] = React.useState('')

  return (
    <div className={cn('min-h-screen bg-background text-foreground', dark && 'dark')}>
      <SEO
        title="Documentation — BoldKit Docs Template"
        description="A documentation site template built with BoldKit neubrutalism components."
        canonical="https://boldkit.dev/templates/docs"
      />

      {/* ── Primary color accent eyebrow ───────────────── */}
      <div className="h-[3px] bg-primary w-full" />

      {/* ── Sticky Header ──────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-background border-b-3 border-foreground h-13 flex items-center gap-3 px-4">
        {/* Mobile menu */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-1.5 border-2 border-foreground hover:bg-foreground hover:text-background transition-all"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>

        {/* Logo */}
        <a href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <div className="w-7 h-7 bg-primary border-2 border-foreground flex items-center justify-center shadow-[2px_2px_0px_hsl(var(--shadow-color))] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[3px_3px_0px_hsl(var(--shadow-color))] transition-all duration-100">
            <BookOpen className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <div className="hidden sm:flex items-baseline gap-1.5">
            <span className="font-black text-base uppercase tracking-tight leading-none">BoldKit</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary border border-primary px-1 py-0.5 leading-none">DOCS</span>
          </div>
        </a>

        {/* Search */}
        <div className="flex-1 max-w-xs relative ml-2">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search docs..."
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            className="pl-8 h-8 text-sm font-mono"
          />
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 border-2 border-foreground px-2 py-0.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">ver</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">3.0</span>
          </div>
          <button
            onClick={() => setDark(!dark)}
            className="p-1.5 border-2 border-foreground hover:bg-foreground hover:text-background transition-all"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
          <a
            href="https://github.com/ANIBIT14/boldkit"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 border-2 border-foreground hover:bg-foreground hover:text-background transition-all"
            aria-label="GitHub"
          >
            <Github className="h-3.5 w-3.5" />
          </a>
          <Button size="sm" className="hidden md:flex gap-1.5 h-8 text-xs">
            Components <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </header>

      {/* ── Body ───────────────────────────────────────── */}
      <div className="flex relative">

        {/* ── Left Sidebar ───────────────────────────────── */}
        <aside className={cn(
          'fixed lg:sticky top-[52px] z-40 h-[calc(100vh-52px)] w-56 flex-shrink-0',
          'bg-muted/30 border-r-3 border-foreground overflow-y-auto',
          'transition-transform duration-200 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          <div className="p-3 pt-4">
            {/* Version selector */}
            <div className="mb-4">
              <select className="w-full text-xs font-bold font-mono border-2 border-foreground bg-background px-2 py-1.5 cursor-pointer focus:outline-none focus:ring-0 focus:border-primary">
                <option>v3.0 (latest)</option>
                <option>v2.8</option>
                <option>v2.5</option>
              </select>
            </div>

            {/* Nav sections */}
            <div className="space-y-0.5">
              {NAV_SECTIONS.map((section, i) => (
                <NavSection key={section.title} section={section} defaultOpen={i < 2} />
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-foreground/20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Main Content ───────────────────────────────── */}
        <main className="flex-1 min-w-0">
          {/* Reading column — symmetric horizontal padding, centered */}
          <div className="max-w-[740px] mx-auto px-8 lg:px-12 py-10">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 text-[11px] font-mono font-bold text-muted-foreground mb-7 uppercase tracking-wide">
              <a href="/docs" className="hover:text-foreground transition-colors">Docs</a>
              <ChevronRight className="h-3 w-3 flex-shrink-0" />
              <a href="#getting-started" className="hover:text-foreground transition-colors">Getting Started</a>
              <ChevronRight className="h-3 w-3 flex-shrink-0" />
              <span className="text-foreground">Introduction</span>
            </nav>

            {/* Hero area */}
            <div className="mb-8 pb-8 border-b-3 border-foreground">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="default" className="text-[10px]">New in v3.0</Badge>
                <Badge variant="outline" className="text-[10px]">React & Vue 3</Badge>
              </div>
              <h1 className="text-[2.6rem] font-black uppercase tracking-tight leading-none mb-4">
                Introduction
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                BoldKit is a neubrutalism UI component library for React and Vue 3. Build bold, distinctive interfaces with thick borders, hard shadows, and vibrant colors.
              </p>
            </div>

            {/* Overview */}
            <section id="overview" className="mb-10">
              <h2 className="text-xl font-black uppercase tracking-tight mb-1">Overview</h2>
              <div className="w-8 h-[3px] bg-primary mb-5" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                BoldKit provides 50+ accessible components built on Radix UI and Reka UI primitives, styled with the neubrutalism aesthetic.
              </p>

              {/* Feature grid — compact horizontal list */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Layers className="h-4 w-4" />, title: `${COUNTS.components}+ Components`, desc: 'Accordion to Toggle', color: 'bg-primary text-primary-foreground' },
                  { icon: <Zap className="h-4 w-4" />, title: '10 Chart Types', desc: 'Area, Bar, Sankey…', color: 'bg-secondary text-secondary-foreground' },
                  { icon: <Code2 className="h-4 w-4" />, title: 'shadcn CLI', desc: 'Install individually', color: 'bg-accent text-accent-foreground' },
                  { icon: <BookOpen className="h-4 w-4" />, title: '14 Themes', desc: 'Cyberpunk to Pastel', color: 'bg-success text-success-foreground' },
                ].map(card => (
                  <div
                    key={card.title}
                    className="flex items-start gap-3 p-3.5 border-3 border-foreground shadow-[3px_3px_0px_hsl(var(--shadow-color))] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_hsl(var(--shadow-color))] transition-all duration-100 cursor-default"
                  >
                    <div className={cn('p-1.5 border-2 border-foreground flex-shrink-0', card.color)}>
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-tight leading-tight">{card.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Installation */}
            <section id="installation" className="mb-10">
              <h2 className="text-xl font-black uppercase tracking-tight mb-1">Installation</h2>
              <div className="w-8 h-[3px] bg-secondary mb-5" />
              <p className="text-sm text-muted-foreground mb-1">Install individual components via the shadcn CLI:</p>
              <CodeBlock code="npx shadcn@latest add https://boldkit.dev/r/button.json" lang="bash" />

              <Callout type="info">
                <strong>Tip:</strong> You can browse all available components at{' '}
                <code className="text-xs font-mono bg-foreground/10 px-1 py-0.5">boldkit.dev/components</code>{' '}
                and copy their individual install commands.
              </Callout>

              <p className="text-sm text-muted-foreground mb-1 mt-5">Or install as a full package:</p>
              <CodeBlock code={`npm install @boldkit/react\n# or\npnpm add @boldkit/react`} lang="bash" />
            </section>

            {/* Usage */}
            <section id="usage" className="mb-10">
              <h2 className="text-xl font-black uppercase tracking-tight mb-1">Usage</h2>
              <div className="w-8 h-[3px] bg-accent mb-5" />

              <h3 className="text-sm font-black uppercase tracking-widest mb-2 text-foreground/70" id="basic">
                — Basic Example
              </h3>
              <CodeBlock lang="tsx" code={`import { Button } from '@/components/ui/button'

export default function App() {
  return (
    <Button>Click me</Button>
  )
}`} />

              <h3 className="text-sm font-black uppercase tracking-widest mb-2 mt-6 text-foreground/70" id="variants">
                — With Variants
              </h3>
              <CodeBlock lang="tsx" code={`import { Button } from '@/components/ui/button'

export default function App() {
  return (
    <div className="flex gap-2 flex-wrap">
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
              <h2 className="text-xl font-black uppercase tracking-tight mb-1">Props</h2>
              <div className="w-8 h-[3px] bg-info mb-5" />
              <div className="border-3 border-foreground overflow-x-auto shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-foreground text-background">
                      {['Prop', 'Type', 'Default', 'Description'].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 font-black text-[10px] uppercase tracking-[0.12em] whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { prop: 'variant', type: '"default" | "secondary" | "outline" | "ghost" | "destructive"', def: '"default"', desc: 'Visual style variant' },
                      { prop: 'size', type: '"sm" | "default" | "lg" | "icon"', def: '"default"', desc: 'Size of the button' },
                      { prop: 'asChild', type: 'boolean', def: 'false', desc: 'Render as child via Radix Slot' },
                      { prop: 'disabled', type: 'boolean', def: 'false', desc: 'Disables interaction' },
                      { prop: 'className', type: 'string', def: '—', desc: 'Additional CSS classes' },
                    ].map((row, i) => (
                      <tr key={row.prop} className={cn('border-t border-foreground/10', i % 2 !== 0 && 'bg-muted/40')}>
                        <td className="px-4 py-2.5 font-black font-mono text-primary text-[13px]">{row.prop}</td>
                        <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground max-w-[160px]">
                          <span className="block truncate">{row.type}</span>
                        </td>
                        <td className="px-4 py-2.5 font-mono text-[12px] font-bold text-accent whitespace-nowrap">{row.def}</td>
                        <td className="px-4 py-2.5 text-[13px] text-muted-foreground">{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Prev / Next */}
            <div className="pt-6 border-t-3 border-foreground">
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2 flex-1 justify-start h-auto py-3" disabled>
                  <ArrowLeft className="h-4 w-4 flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Prev</div>
                    <div className="text-sm font-bold truncate">—</div>
                  </div>
                </Button>
                <Button variant="outline" className="gap-2 flex-1 justify-end h-auto py-3">
                  <div className="text-right min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Next</div>
                    <div className="text-sm font-bold truncate">Installation</div>
                  </div>
                  <ArrowRight className="h-4 w-4 flex-shrink-0" />
                </Button>
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-[11px] font-mono font-bold text-muted-foreground hover:text-foreground transition-colors w-fit">
                <ExternalLink className="h-3 w-3" />
                <a href="#">Edit this page on GitHub</a>
              </div>
            </div>

          </div>
        </main>

        {/* ── Right ToC — compact annotation rail ─────────── */}
        <aside className="hidden xl:flex flex-col sticky top-[52px] h-[calc(100vh-52px)] w-44 flex-shrink-0 overflow-y-auto pt-10 pr-5 pl-3 border-l border-foreground/20">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-foreground/40 mb-3">
            On this page
          </p>
          <ul className="space-y-0.5 flex-1">
            {TOC_ITEMS.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    'block text-[11px] leading-5 transition-colors duration-100 hover:text-foreground',
                    item.level === 1
                      ? 'font-bold text-foreground/70 mt-2 first:mt-0'
                      : 'font-medium text-muted-foreground pl-2.5 border-l border-foreground/15 hover:border-primary/60',
                    i === 0 && 'text-primary font-black'
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-4 border-t border-foreground/15 space-y-2 pb-6">
            <a
              href="https://github.com/ANIBIT14/boldkit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-3 w-3" /> GitHub
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-3 w-3" /> Changelog
            </a>
          </div>
        </aside>

      </div>
    </div>
  )
}

export default DocsTemplate
