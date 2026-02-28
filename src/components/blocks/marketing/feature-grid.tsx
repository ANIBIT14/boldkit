import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const featureColors = [
  'bg-primary/10',
  'bg-secondary/10',
  'bg-accent/10',
  'bg-success/10',
  'bg-warning/10',
  'bg-info/10',
]

const iconColors = [
  'bg-primary',
  'bg-secondary',
  'bg-accent',
  'bg-success',
  'bg-warning',
  'bg-info',
]

// ============================================================================
// FEATURE GRID VARIANT 1: With Icons
// ============================================================================
export interface FeatureItem {
  icon: React.ReactNode
  title: string
  description: string
}

export interface FeatureGridWithIconsProps {
  title?: string
  subtitle?: string
  description?: string
  features: FeatureItem[]
  columns?: 2 | 3 | 4
  className?: string
}

export function FeatureGridWithIcons({
  title,
  subtitle,
  description,
  features,
  columns = 3,
  className,
}: FeatureGridWithIconsProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle || description) && (
          <div className="text-center mb-12 space-y-4">
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
            {description && (
              <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        <div className={cn('grid gap-6', gridCols[columns])}>
          {features.map((feature, index) => (
            <Card
              key={index}
              className={cn(
                'group hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all',
                featureColors[index % 6]
              )}
            >
              <CardHeader>
                <div
                  className={cn(
                    'w-14 h-14 flex items-center justify-center border-3 border-foreground mb-4 shadow-[3px_3px_0px_hsl(var(--shadow-color))]',
                    iconColors[index % 6]
                  )}
                >
                  {feature.icon}
                </div>
                <CardTitle className="uppercase">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FEATURE GRID VARIANT 2: With Images
// ============================================================================
export interface FeatureWithImageItem {
  image: string
  title: string
  description: string
}

export interface FeatureGridWithImagesProps {
  title?: string
  subtitle?: string
  features: FeatureWithImageItem[]
  className?: string
}

export function FeatureGridWithImages({
  title,
  subtitle,
  features,
  className,
}: FeatureGridWithImagesProps) {
  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12 space-y-4">
            {subtitle && (
              <p className="text-sm font-bold uppercase tracking-widest text-secondary">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="border-3 border-foreground overflow-hidden shadow-[6px_6px_0px_hsl(var(--shadow-color))] group-hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all mb-4">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <h3 className="text-xl font-black uppercase mb-2">{feature.title}</h3>
              <p className="text-muted-foreground font-medium">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FEATURE GRID VARIANT 3: Alternating
// ============================================================================
export interface FeatureAlternatingItem {
  icon: React.ReactNode
  title: string
  description: string
  image: string
}

export interface FeatureGridAlternatingProps {
  features: FeatureAlternatingItem[]
  className?: string
}

export function FeatureGridAlternating({
  features,
  className,
}: FeatureGridAlternatingProps) {
  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-6xl mx-auto space-y-16">
        {features.map((feature, index) => {
          const isReversed = index % 2 === 1

          return (
            <div
              key={index}
              className={cn(
                'grid md:grid-cols-2 gap-8 md:gap-12 items-center',
                isReversed && 'md:[&>*:first-child]:order-2'
              )}
            >
              <div className="space-y-4">
                <div
                  className={cn(
                    'w-16 h-16 flex items-center justify-center border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
                    iconColors[index % 6]
                  )}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground font-medium">
                  {feature.description}
                </p>
              </div>

              <div className="relative">
                <div className="border-3 border-foreground shadow-[8px_8px_0px_hsl(var(--shadow-color))] overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div
                  className={cn(
                    'absolute -bottom-4 w-16 h-16 border-3 border-foreground',
                    isReversed ? '-left-4' : '-right-4',
                    featureColors[index % 6]
                  )}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ============================================================================
// FEATURE GRID VARIANT 4: Bento Grid
// ============================================================================
export interface BentoFeatureItem {
  icon: React.ReactNode
  title: string
  description: string
  span?: 'normal' | 'wide' | 'tall'
}

export interface FeatureBentoGridProps {
  title?: string
  subtitle?: string
  features: BentoFeatureItem[]
  className?: string
}

export function FeatureBentoGrid({
  title,
  subtitle,
  features,
  className,
}: FeatureBentoGridProps) {
  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12 space-y-4">
            {subtitle && (
              <p className="text-sm font-bold uppercase tracking-widest text-accent-foreground bg-accent inline-block px-3 py-1 border-2 border-foreground">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
          {features.map((feature, index) => {
            const spanClass = {
              normal: '',
              wide: 'md:col-span-2',
              tall: 'md:row-span-2',
            }[feature.span || 'normal']

            return (
              <Card
                key={index}
                className={cn(
                  'group hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all flex flex-col',
                  featureColors[index % 6],
                  spanClass
                )}
              >
                <CardHeader className="flex-1">
                  <div
                    className={cn(
                      'w-12 h-12 flex items-center justify-center border-3 border-foreground mb-4 shadow-[3px_3px_0px_hsl(var(--shadow-color))]',
                      iconColors[index % 6]
                    )}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="uppercase text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Export all variants
// ============================================================================
export const FeatureGrid = {
  WithIcons: FeatureGridWithIcons,
  WithImages: FeatureGridWithImages,
  Alternating: FeatureGridAlternating,
  Bento: FeatureBentoGrid,
}
