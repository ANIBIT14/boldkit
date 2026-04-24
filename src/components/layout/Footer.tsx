import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Github, Mail, ArrowUpRight, Package, BarChart3, LayoutGrid, Shield } from 'lucide-react'

const DISPLAY: React.CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" }
const MONO: React.CSSProperties = { fontFamily: "'DM Mono', monospace" }

const exploreLinks = [
  { label: 'Documentation', href: '/docs' },
  { label: 'Components', href: '/components' },
  { label: 'Shapes', href: '/shapes' },
  { label: 'Charts', href: '/charts' },
  { label: 'Canvas Effects', href: '/canvas-effects' },
  { label: 'Themes', href: '/themes' },
  { label: 'Templates', href: '/templates' },
  { label: 'Blocks', href: '/blocks' },
  { label: 'Dot Matrix Studio', href: '/studio' },
  { label: 'FavGrab', href: 'https://favgrab.boldkit.dev', external: true },
]

const resourceLinks = [
  { label: 'GitHub Repository', href: 'https://github.com/ANIBIT14/boldkit', external: true },
  { label: 'Changelog', href: 'https://github.com/ANIBIT14/boldkit/releases', external: true },
  { label: 'Report an Issue', href: 'https://github.com/ANIBIT14/boldkit/issues', external: true },
]

export function Footer() {
  return (
    <footer className="border-t-3 border-foreground">

      {/* ── Hero section: always-dark bg ── */}
      <div className="bg-neutral-950 text-white px-4 py-14 sm:py-16">
        <div className="container mx-auto">

          {/* Giant wordmark */}
          <div className="mb-8">
            <p
              className="text-[clamp(80px,18vw,220px)] leading-none tracking-tight text-white/10 select-none pointer-events-none"
              style={DISPLAY}
              aria-hidden="true"
            >
              BUILD BOLD
            </p>
            <p className="text-base sm:text-lg text-white/70 font-medium -mt-3 sm:-mt-5 pl-1">
              A neubrutalism UI library for{' '}
              <span className="text-white font-bold">React</span>{' '}
              and{' '}
              <span className="text-[#42b883] font-bold">Vue 3</span>
            </p>
          </div>

          {/* What's included grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 max-w-2xl border-3 border-white/20 overflow-hidden">
            {[
              { icon: Package,    value: '50+',  label: 'Components', desc: 'React & Vue 3',    accent: '#f87171' },
              { icon: BarChart3,  value: '10',   label: 'Chart Types', desc: 'Recharts + ECharts', accent: '#4db8a8' },
              { icon: LayoutGrid, value: '15',   label: 'Blocks',     desc: 'Copy & paste',     accent: '#fcd34d' },
              { icon: Shield,     value: 'MIT',  label: 'License',    desc: 'Free forever',     accent: '#5cdb5c' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className={`p-5 bg-white/5 hover:bg-white/8 transition-colors ${i < 3 ? 'border-r-3 border-white/20' : ''}`}
                >
                  <Icon className="h-4 w-4 mb-3" style={{ color: item.accent }} />
                  <div
                    className="text-2xl font-black leading-none text-white mb-1"
                    style={DISPLAY}
                  >
                    {item.value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white mb-0.5">{item.label}</div>
                  <div className="text-[10px] text-white/40">{item.desc}</div>
                </div>
              )
            })}
          </div>

        </div>
      </div>

      {/* ── Links grid ── */}
      <div className="bg-background px-4 py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">

            {/* Brand column */}
            <div className="col-span-2 md:col-span-1 space-y-4">
              <Link to="/" className="flex items-center gap-2 group w-fit">
                <img
                  src="https://ik.imagekit.io/fincalfy/304a4c07-8de1-41af-813e-e7556234b973.png"
                  alt="BoldKit"
                  className="h-6 w-6 transition-transform group-hover:rotate-[-6deg] duration-200"
                  loading="lazy"
                />
                <span className="text-xl leading-none" style={DISPLAY}>BoldKit</span>
                <Badge variant="secondary" className="text-[9px] px-1 py-0 h-4">v3.2</Badge>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
                Neubrutalism UI components for React and Vue 3. Open source, MIT licensed.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://github.com/ANIBIT14/boldkit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 flex items-center justify-center border-3 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background transition-colors duration-150"
                  aria-label="GitHub"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/aniruddhaagarwal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 flex items-center justify-center border-3 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background transition-colors duration-150"
                  aria-label="LinkedIn"
                >
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="mailto:aniruddha@boldkit.dev"
                  className="h-8 w-8 flex items-center justify-center border-3 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background transition-colors duration-150"
                  aria-label="Email"
                >
                  <Mail className="h-3.5 w-3.5" />
                </a>
              </div>
              <p className="text-[11px] text-muted-foreground pt-1">
                Assets by{' '}
                <a
                  href="https://vanikya.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-foreground transition-colors underline underline-offset-2"
                >
                  Vanikya.ai
                </a>
              </p>
            </div>

            {/* Explore */}
            <div className="space-y-3">
              <h4
                className="text-sm font-black uppercase tracking-widest"
                style={DISPLAY}
              >
                Explore
              </h4>
              <nav className="flex flex-col gap-2" aria-label="Explore links">
                {exploreLinks.map((link) =>
                  'external' in link && link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-100 w-fit"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-50" />
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-100 w-fit"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
            </div>

            {/* Resources */}
            <div className="space-y-3">
              <h4
                className="text-sm font-black uppercase tracking-widest"
                style={DISPLAY}
              >
                Resources
              </h4>
              <nav className="flex flex-col gap-2" aria-label="Resource links">
                {resourceLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-100 w-fit"
                  >
                    {link.label}
                    {link.external && <ArrowUpRight className="h-3 w-3 opacity-50" />}
                  </a>
                ))}
              </nav>
            </div>

            {/* Frameworks */}
            <div className="col-span-2 md:col-span-1 space-y-3">
              <h4
                className="text-sm font-black uppercase tracking-widest"
                style={DISPLAY}
              >
                Frameworks
              </h4>
              <div className="flex flex-col gap-2">
                {/* React */}
                <div className="border-3 border-foreground p-3 flex items-start gap-3 hover:shadow-[4px_4px_0px_hsl(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150">
                  <div className="h-7 w-7 bg-[#61dafb]/10 border-2 border-[#61dafb]/30 flex items-center justify-center shrink-0">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <ellipse cx="12" cy="12" rx="10.5" ry="4" stroke="#61dafb" strokeWidth="1.2"/>
                      <ellipse cx="12" cy="12" rx="10.5" ry="4" stroke="#61dafb" strokeWidth="1.2" transform="rotate(60 12 12)"/>
                      <ellipse cx="12" cy="12" rx="10.5" ry="4" stroke="#61dafb" strokeWidth="1.2" transform="rotate(120 12 12)"/>
                      <circle cx="12" cy="12" r="2" fill="#61dafb"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wide">React</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Radix UI + Recharts</p>
                  </div>
                </div>
                {/* Vue */}
                <div className="border-3 border-foreground p-3 flex items-start gap-3 hover:shadow-[4px_4px_0px_hsl(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150">
                  <div className="h-7 w-7 bg-[#42b883]/10 border-2 border-[#42b883]/30 flex items-center justify-center shrink-0">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#42b883" d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wide">Vue 3 + Nuxt</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Reka UI + ECharts</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t-3 border-foreground bg-foreground text-background">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/50 font-medium" style={MONO}>
            MIT License · Open source and free to use
          </p>
          <p className="text-xs text-background/50 font-medium" style={MONO}>
            Made with{' '}
            <span className="text-primary">♥</span>
            {' '}by{' '}
            <a
              href="https://www.linkedin.com/in/aniruddhaagarwal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background hover:text-background/80 underline underline-offset-2 transition-colors"
            >
              Aniruddha Agarwal
            </a>
          </p>
        </div>
      </div>

    </footer>
  )
}
