import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Layout } from '@/components/layout'
import { SEO, type BreadcrumbItem, type FAQItem } from '@/components/SEO'

const DISPLAY: CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" }
const MONO: CSSProperties = { fontFamily: "'DM Mono', monospace" }

export interface TocItem {
  id: string
  label: string
}

interface SeoArticleLayoutProps {
  eyebrow: string
  title: string
  lede: string
  accent?: string
  updated?: string
  toc?: TocItem[]
  seo: {
    title: string
    description: string
    canonical: string
    keywords?: string
    breadcrumbs?: BreadcrumbItem[]
    faq?: FAQItem[]
    structuredData?: Record<string, unknown>
  }
  children: ReactNode
}

/**
 * SeoArticleLayout - shared neubrutalist editorial shell for SEO/landing pages.
 * Provides the masthead, optional table of contents, and a consistent content
 * column. Pages compose the exported primitives (Section, Callout, etc.) inside.
 */
export function SeoArticleLayout({
  eyebrow,
  title,
  lede,
  accent = '#FFE400',
  updated,
  toc,
  seo,
  children,
}: SeoArticleLayoutProps) {
  return (
    <>
      <SEO {...seo} />
      <Layout>
        {/* ── Masthead ─────────────────────────────────────────────── */}
        <header className="relative overflow-hidden border-b-3 border-foreground">
          <div className="grid-pattern absolute inset-0 opacity-[0.12]" />
          <div
            className="absolute -right-16 -top-16 h-56 w-56 rotate-12 border-3 border-foreground"
            style={{ backgroundColor: accent }}
            aria-hidden
          />
          <div className="container relative mx-auto px-4 py-14 md:py-20">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold uppercase tracking-[0.15em]" style={MONO}>
                {(seo.breadcrumbs ?? []).map((b, i, arr) => (
                  <li key={b.name} className="flex items-center gap-2">
                    {b.url ? (
                      <a href={b.url} className="text-foreground/55 hover:text-foreground transition-colors">{b.name}</a>
                    ) : (
                      <span className="text-foreground">{b.name}</span>
                    )}
                    {i < arr.length - 1 && <span className="text-foreground/30">/</span>}
                  </li>
                ))}
              </ol>
            </nav>

            <div className="max-w-3xl">
              <span
                className="inline-block border-3 border-foreground px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] shadow-[3px_3px_0px_hsl(var(--shadow-color))]"
                style={{ ...MONO, backgroundColor: accent }}
              >
                {eyebrow}
              </span>
              <h1
                className="mt-5 text-5xl leading-[0.92] tracking-tight md:text-7xl lg:text-8xl"
                style={DISPLAY}
              >
                {title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
                {lede}
              </p>
              {updated && (
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/45" style={MONO}>
                  Last updated · {updated}
                </p>
              )}
            </div>
          </div>
        </header>

        {/* ── Body ─────────────────────────────────────────────────── */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className={toc ? 'grid gap-12 lg:grid-cols-[220px_1fr]' : ''}>
            {toc && (
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/45" style={MONO}>
                  On this page
                </p>
                <ul className="space-y-2 border-l-3 border-foreground pl-4">
                  {toc.map(item => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-sm font-semibold text-foreground/70 hover:text-foreground hover:underline decoration-2 underline-offset-4"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
            <article className="min-w-0 max-w-3xl">{children}</article>
          </div>
        </div>
      </Layout>
    </>
  )
}

/* ── Content primitives ─────────────────────────────────────────────── */

export function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="mb-4 text-3xl tracking-tight md:text-4xl" style={DISPLAY}>
        {title}
      </h2>
      <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80 [&_a]:font-semibold [&_a]:text-foreground [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-2 [&_strong]:font-bold [&_strong]:text-foreground">
        {children}
      </div>
    </section>
  )
}

export function Callout({
  title,
  children,
  tone = '#FFE400',
}: {
  title?: string
  children: ReactNode
  tone?: string
}) {
  return (
    <div
      className="my-6 border-3 border-foreground p-5 shadow-[4px_4px_0px_hsl(var(--shadow-color))]"
      style={{ backgroundColor: `${tone}22` }}
    >
      {title && (
        <p className="mb-2 text-[12px] font-black uppercase tracking-[0.18em]" style={MONO}>
          {title}
        </p>
      )}
      <div className="text-[15px] leading-relaxed text-foreground/85">{children}</div>
    </div>
  )
}

/** Two-column do / don't grid for design-guidance pages. */
export function DoDont({ doItems, dontItems }: { doItems: string[]; dontItems: string[] }) {
  return (
    <div className="my-6 grid gap-4 sm:grid-cols-2">
      <div className="border-3 border-foreground bg-[#52D65F22] p-5 shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
        <p className="mb-3 text-[12px] font-black uppercase tracking-[0.18em] text-foreground" style={MONO}>✓ Do</p>
        <ul className="space-y-2 text-sm text-foreground/85">
          {doItems.map(i => <li key={i} className="flex gap-2"><span aria-hidden>-</span><span>{i}</span></li>)}
        </ul>
      </div>
      <div className="border-3 border-foreground bg-[#FF3B6E22] p-5 shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
        <p className="mb-3 text-[12px] font-black uppercase tracking-[0.18em] text-foreground" style={MONO}>✗ Don't</p>
        <ul className="space-y-2 text-sm text-foreground/85">
          {dontItems.map(i => <li key={i} className="flex gap-2"><span aria-hidden>-</span><span>{i}</span></li>)}
        </ul>
      </div>
    </div>
  )
}

/** Neubrutalist data table with a bordered header row. */
export function DataGrid({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="my-6 overflow-x-auto border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-foreground text-background">
            {headers.map(h => (
              <th key={h} className="border-r border-background/20 px-4 py-3 text-left text-[11px] font-black uppercase tracking-[0.12em] last:border-r-0" style={MONO}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-t-2 border-foreground/15 odd:bg-foreground/[0.03]">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 align-top text-foreground/85">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Primary call-to-action band - used to funnel to FavGrab or BoldKit installs. */
export function CTABox({
  title,
  body,
  href,
  cta,
  external = false,
  tone = '#FFE400',
}: {
  title: string
  body: string
  href: string
  cta: string
  external?: boolean
  tone?: string
}) {
  const inner = (
    <span className="inline-flex items-center gap-2 border-3 border-foreground bg-foreground px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-background shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-transform duration-150 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]">
      {cta}
      {external ? <ArrowUpRight className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
    </span>
  )
  return (
    <div
      className="my-10 border-3 border-foreground p-7 shadow-[6px_6px_0px_hsl(var(--shadow-color))]"
      style={{ backgroundColor: `${tone}22` }}
    >
      <h2 className="text-3xl tracking-tight md:text-4xl" style={DISPLAY}>{title}</h2>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-foreground/80">{body}</p>
      <div className="mt-5">
        {external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="group inline-block">{inner}</a>
        ) : (
          <Link to={href} className="group inline-block">{inner}</Link>
        )}
      </div>
    </div>
  )
}

/** Compact internal-link card grid for "related pages" sections. */
export function LinkCards({ items }: { items: { to: string; label: string; desc: string; external?: boolean }[] }) {
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2">
      {items.map(item => {
        const body = (
          <div className="group flex h-full flex-col border-3 border-foreground bg-background p-4 shadow-[3px_3px_0px_hsl(var(--shadow-color))] transition-transform duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_hsl(var(--shadow-color))]">
            <span className="flex items-center gap-1.5 text-sm font-black uppercase tracking-[0.08em]">
              {item.label}
              {item.external ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
            </span>
            <span className="mt-1 text-[13px] leading-snug text-foreground/65">{item.desc}</span>
          </div>
        )
        return item.external ? (
          <a key={item.to} href={item.to} target="_blank" rel="noopener noreferrer">{body}</a>
        ) : (
          <Link key={item.to} to={item.to}>{body}</Link>
        )
      })}
    </div>
  )
}

export { DISPLAY, MONO }
