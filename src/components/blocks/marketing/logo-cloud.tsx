import * as React from 'react'
import { cn } from '@/lib/utils'
import { Marquee } from '@/components/ui/marquee'

export interface LogoItem {
  name: string
  logo: string | React.ReactNode
  url?: string
}

// ============================================================================
// LOGO CLOUD VARIANT 1: Simple Grid
// ============================================================================
export interface LogoCloudGridProps {
  title?: string
  subtitle?: string
  logos: LogoItem[]
  columns?: 3 | 4 | 5 | 6
  className?: string
}

export function LogoCloudGrid({
  title,
  subtitle,
  logos,
  columns = 5,
  className,
}: LogoCloudGridProps) {
  const gridCols = {
    3: 'grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-3 md:grid-cols-6',
  }

  return (
    <section className={cn('py-12 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-8 space-y-2">
            {subtitle && (
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">
                {title}
              </h2>
            )}
          </div>
        )}

        <div className={cn('grid gap-8 items-center', gridCols[columns])}>
          {logos.map((logo, index) => (
            <LogoItem key={index} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// LOGO CLOUD VARIANT 2: With Marquee
// ============================================================================
export interface LogoCloudMarqueeProps {
  title?: string
  logos: LogoItem[]
  speed?: 'slow' | 'normal' | 'fast'
  direction?: 'left' | 'right'
  className?: string
}

export function LogoCloudMarquee({
  title,
  logos,
  speed = 'normal',
  direction = 'left',
  className,
}: LogoCloudMarqueeProps) {
  return (
    <section className={cn('py-12 px-4 md:px-8 lg:px-16 overflow-hidden', className)}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <p className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
            {title}
          </p>
        )}

        <Marquee
          className="py-4"
          direction={direction}
          speed={speed}
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              className="mx-8 flex items-center justify-center h-12 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            >
              {typeof logo.logo === 'string' ? (
                <img
                  src={logo.logo}
                  alt={logo.name}
                  className="h-full w-auto object-contain"
                />
              ) : (
                logo.logo
              )}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

// ============================================================================
// LOGO CLOUD VARIANT 3: Bordered Cards
// ============================================================================
export interface LogoCloudCardsProps {
  title?: string
  subtitle?: string
  logos: LogoItem[]
  className?: string
}

export function LogoCloudCards({
  title,
  subtitle,
  logos,
  className,
}: LogoCloudCardsProps) {
  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16 bg-muted/30', className)}>
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-10 space-y-2">
            {subtitle && (
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                {title}
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="border-3 border-foreground bg-card p-6 flex items-center justify-center h-24 hover:shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer"
            >
              {typeof logo.logo === 'string' ? (
                <img
                  src={logo.logo}
                  alt={logo.name}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                logo.logo
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// LOGO CLOUD VARIANT 4: With Stats
// ============================================================================
export interface LogoCloudWithStatsProps {
  title?: string
  logos: LogoItem[]
  stats: Array<{ value: string; label: string }>
  className?: string
}

export function LogoCloudWithStats({
  title,
  logos,
  stats,
  className,
}: LogoCloudWithStatsProps) {
  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {title && (
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                {title}
              </h2>
            )}

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="border-3 border-foreground p-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))]"
                >
                  <div className="text-3xl font-black">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-bold uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {logos.slice(0, 9).map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-16 opacity-70 hover:opacity-100 transition-opacity"
              >
                {typeof logo.logo === 'string' ? (
                  <img
                    src={logo.logo}
                    alt={logo.name}
                    className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  />
                ) : (
                  logo.logo
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Helper Component
// ============================================================================
function LogoItem({ logo }: { logo: LogoItem }) {
  const content = (
    <div className="flex items-center justify-center h-12 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
      {typeof logo.logo === 'string' ? (
        <img
          src={logo.logo}
          alt={logo.name}
          className="h-full w-auto object-contain"
        />
      ) : (
        logo.logo
      )}
    </div>
  )

  if (logo.url) {
    return (
      <a href={logo.url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}

// ============================================================================
// Export all variants
// ============================================================================
export const LogoCloud = {
  Grid: LogoCloudGrid,
  Marquee: LogoCloudMarquee,
  Cards: LogoCloudCards,
  WithStats: LogoCloudWithStats,
}
