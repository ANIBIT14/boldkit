import * as React from 'react'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export interface StatItem {
  value: string
  label: string
  description?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

// ============================================================================
// STATS VARIANT 1: Simple Grid
// ============================================================================
export interface StatsGridProps {
  stats: StatItem[]
  columns?: 2 | 3 | 4
  className?: string
}

export function StatsGrid({
  stats,
  columns = 4,
  className,
}: StatsGridProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }

  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className={cn('max-w-6xl mx-auto grid gap-6', gridCols[columns])}>
        {stats.map((stat, index) => (
          <div key={index} className="text-center space-y-2">
            <div className="text-4xl md:text-5xl font-black">{stat.value}</div>
            <div className="text-sm text-muted-foreground font-bold uppercase tracking-wide">
              {stat.label}
            </div>
            {stat.description && (
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================================================
// STATS VARIANT 2: With Cards
// ============================================================================
export interface StatsCardsProps {
  title?: string
  subtitle?: string
  stats: StatItem[]
  className?: string
}

export function StatsCards({
  title,
  subtitle,
  stats,
  className,
}: StatsCardsProps) {
  const cardColors = [
    'bg-primary/10',
    'bg-secondary/10',
    'bg-accent/10',
    'bg-success/10',
  ]

  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16 bg-muted/30', className)}>
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12 space-y-2">
            {subtitle && (
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                {title}
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                'border-3 border-foreground p-6 shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all',
                cardColors[index % 4]
              )}
            >
              <div className="text-3xl md:text-4xl font-black">{stat.value}</div>
              <div className="text-sm font-bold uppercase tracking-wide mt-2">
                {stat.label}
              </div>
              {stat.trend && (
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === 'up' && (
                    <TrendingUp className="h-4 w-4 text-success" />
                  )}
                  {stat.trend === 'down' && (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                  {stat.trend === 'neutral' && (
                    <Minus className="h-4 w-4 text-muted-foreground" />
                  )}
                  {stat.trendValue && (
                    <span
                      className={cn(
                        'text-xs font-bold',
                        stat.trend === 'up' && 'text-success',
                        stat.trend === 'down' && 'text-destructive',
                        stat.trend === 'neutral' && 'text-muted-foreground'
                      )}
                    >
                      {stat.trendValue}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// STATS VARIANT 3: Split with Content
// ============================================================================
export interface StatsSplitProps {
  title: string
  description: string
  stats: StatItem[]
  contentPosition?: 'left' | 'right'
  className?: string
}

export function StatsSplit({
  title,
  description,
  stats,
  contentPosition = 'left',
  className,
}: StatsSplitProps) {
  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div
        className={cn(
          'max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center',
          contentPosition === 'right' && 'md:[&>*:first-child]:order-2'
        )}
      >
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border-3 border-foreground bg-card p-6 shadow-[4px_4px_0px_hsl(var(--shadow-color))]"
            >
              <div className="text-3xl font-black">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-bold uppercase tracking-wide mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// STATS VARIANT 4: Inline
// ============================================================================
export interface StatsInlineProps {
  stats: StatItem[]
  className?: string
}

export function StatsInline({
  stats,
  className,
}: StatsInlineProps) {
  return (
    <section
      className={cn(
        'py-8 px-4 md:px-8 lg:px-16 border-y-3 border-foreground bg-muted/30',
        className
      )}
    >
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <span className="text-3xl md:text-4xl font-black">{stat.value}</span>
            <span className="text-sm text-muted-foreground font-bold uppercase tracking-wide ml-2">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================================================
// STATS VARIANT 5: With Icons
// ============================================================================
export interface StatWithIconItem extends StatItem {
  icon: React.ReactNode
}

export interface StatsWithIconsProps {
  stats: StatWithIconItem[]
  className?: string
}

export function StatsWithIcons({
  stats,
  className,
}: StatsWithIconsProps) {
  const iconColors = [
    'bg-primary',
    'bg-secondary',
    'bg-accent',
    'bg-success',
  ]

  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center space-y-4">
            <div
              className={cn(
                'w-16 h-16 mx-auto flex items-center justify-center border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
                iconColors[index % 4]
              )}
            >
              {stat.icon}
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-bold uppercase tracking-wide mt-1">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================================================
// Export all variants
// ============================================================================
export const StatsSection = {
  Grid: StatsGrid,
  Cards: StatsCards,
  Split: StatsSplit,
  Inline: StatsInline,
  WithIcons: StatsWithIcons,
}
