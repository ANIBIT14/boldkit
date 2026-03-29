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
  { label: 'Themes', href: '/themes' },
  { label: 'Templates', href: '/templates' },
  { label: 'Blocks', href: '/blocks' },
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
                <Badge variant="secondary" className="text-[9px] px-1.5 py-0">Beta</Badge>
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
                {exploreLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-100 w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
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
                    <svg className="h-4 w-4 text-[#61dafb]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 9.861A2.139 2.139 0 1 0 12 14.139 2.139 2.139 0 1 0 12 9.861zM6.008 16.255l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.12.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.468zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 0 1 1.182-3.046A24.752 24.752 0 0 1 5.317 8.95zM17.992 16.255l-.133-.468a23.307 23.307 0 0 0-1.363-3.578l-.101-.213.101-.213a23.53 23.53 0 0 0 1.363-3.578l.133-.468.472.12c3.518.889 5.536 2.398 5.536 4.139s-2.018 3.25-5.536 4.139l-.472.12zm.753-7.305a24.752 24.752 0 0 1-1.182 3.046 24.95 24.95 0 0 1 1.182 3.046c2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046zM5.547 21.497l-.133-.469c-.446-1.579-.68-3.243-.68-4.934 0-1.693.234-3.357.68-4.934l.133-.468.468.133c1.075.305 2.22.578 3.405.811l.214.042.048.213a23.406 23.406 0 0 1 1.862 5.099l.109.218-.109.218c-.68 1.349-1.287 2.777-1.862 5.099l-.048.213-.214.042a36.96 36.96 0 0 0-3.405.811l-.468.133zM6.32 12.14a21.89 21.89 0 0 0-.527 4.954 21.89 21.89 0 0 0 .527 4.954 31.097 31.097 0 0 1 2.677-.629 24.455 24.455 0 0 1 1.7-4.325 24.3 24.3 0 0 1-1.7-4.325 31.165 31.165 0 0 1-2.677-.629zm12.132 9.908l-.468-.133a36.96 36.96 0 0 0-3.405-.811l-.214-.042-.048-.213a23.408 23.408 0 0 0-1.862-5.099l-.109-.218.109-.218c.674-1.346 1.287-2.774 1.862-5.099l.048-.213.214-.042a36.78 36.78 0 0 0 3.405-.811l.468-.133.133.468c.446 1.579.68 3.243.68 4.934 0 1.693-.234 3.357-.68 4.934l-.133.469zM17.68 17.094a24.3 24.3 0 0 1-1.7 4.325 31.097 31.097 0 0 1 2.677.629 21.89 21.89 0 0 0 .527-4.954 21.89 21.89 0 0 0-.527-4.954 31.165 31.165 0 0 1-2.677.629 24.455 24.455 0 0 1 1.7 4.325z"/>
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
