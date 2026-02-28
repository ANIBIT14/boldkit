import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ArrowRight, Play, Sparkles, Star, Zap } from 'lucide-react'

// ============================================================================
// HERO VARIANT 1: Centered with Badge
// ============================================================================
export interface HeroCenteredProps {
  badge?: string
  title: string
  titleHighlight?: string
  description: string
  primaryAction?: { label: string; href?: string; onClick?: () => void }
  secondaryAction?: { label: string; href?: string; onClick?: () => void }
  className?: string
}

export function HeroCentered({
  badge,
  title,
  titleHighlight,
  description,
  primaryAction,
  secondaryAction,
  className,
}: HeroCenteredProps) {
  return (
    <section className={cn('py-20 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {badge && (
          <Badge variant="outline" className="text-sm px-4 py-1">
            <Sparkles className="h-3 w-3 mr-2" />
            {badge}
          </Badge>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
          {title}{' '}
          {titleHighlight && (
            <span className="bg-primary px-2 text-primary-foreground">
              {titleHighlight}
            </span>
          )}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
          {description}
        </p>

        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryAction && (
              <Button size="lg" onClick={primaryAction.onClick}>
                {primaryAction.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            {secondaryAction && (
              <Button size="lg" variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

// ============================================================================
// HERO VARIANT 2: Split with Image
// ============================================================================
export interface HeroSplitProps {
  title: string
  titleHighlight?: string
  description: string
  primaryAction?: { label: string; href?: string; onClick?: () => void }
  secondaryAction?: { label: string; href?: string; onClick?: () => void }
  imageSrc: string
  imageAlt?: string
  imagePosition?: 'left' | 'right'
  className?: string
}

export function HeroSplit({
  title,
  titleHighlight,
  description,
  primaryAction,
  secondaryAction,
  imageSrc,
  imageAlt = 'Hero image',
  imagePosition = 'right',
  className,
}: HeroSplitProps) {
  const contentOrder = imagePosition === 'right' ? 'order-1' : 'order-2'
  const imageOrder = imagePosition === 'right' ? 'order-2' : 'order-1'

  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className={cn('space-y-6', contentOrder)}>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            {title}{' '}
            {titleHighlight && (
              <span className="bg-accent px-2 text-accent-foreground">
                {titleHighlight}
              </span>
            )}
          </h1>

          <p className="text-lg text-muted-foreground font-medium">
            {description}
          </p>

          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryAction && (
                <Button size="lg" onClick={primaryAction.onClick}>
                  {primaryAction.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              {secondaryAction && (
                <Button size="lg" variant="outline" onClick={secondaryAction.onClick}>
                  <Play className="mr-2 h-4 w-4" />
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>

        <div className={cn('relative', imageOrder)}>
          <div className="border-3 border-foreground shadow-[8px_8px_0px_hsl(var(--shadow-color))] overflow-hidden">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary border-3 border-foreground" />
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent border-3 border-foreground" />
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// HERO VARIANT 3: With Stats
// ============================================================================
export interface HeroWithStatsProps {
  title: string
  titleHighlight?: string
  description: string
  primaryAction?: { label: string; href?: string; onClick?: () => void }
  stats: Array<{ value: string; label: string }>
  className?: string
}

export function HeroWithStats({
  title,
  titleHighlight,
  description,
  primaryAction,
  stats,
  className,
}: HeroWithStatsProps) {
  return (
    <section className={cn('py-20 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
            {title}{' '}
            {titleHighlight && (
              <span className="bg-secondary px-2 text-secondary-foreground">
                {titleHighlight}
              </span>
            )}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            {description}
          </p>

          {primaryAction && (
            <Button size="lg" onClick={primaryAction.onClick}>
              {primaryAction.label}
              <Zap className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border-3 border-foreground bg-card p-6 text-center shadow-[4px_4px_0px_hsl(var(--shadow-color))]"
            >
              <div className="text-3xl md:text-4xl font-black">{stat.value}</div>
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
// HERO VARIANT 4: Minimal
// ============================================================================
export interface HeroMinimalProps {
  title: string
  description: string
  primaryAction?: { label: string; href?: string; onClick?: () => void }
  className?: string
}

export function HeroMinimal({
  title,
  description,
  primaryAction,
  className,
}: HeroMinimalProps) {
  return (
    <section className={cn('py-32 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none">
          {title}
        </h1>

        <div className="flex flex-col md:flex-row md:items-end gap-8 justify-between">
          <p className="text-lg text-muted-foreground font-medium max-w-md">
            {description}
          </p>

          {primaryAction && (
            <Button size="lg" className="shrink-0" onClick={primaryAction.onClick}>
              {primaryAction.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="w-full h-1 bg-foreground" />
      </div>
    </section>
  )
}

// ============================================================================
// HERO VARIANT 5: With Video
// ============================================================================
export interface HeroWithVideoProps {
  badge?: string
  title: string
  titleHighlight?: string
  description: string
  primaryAction?: { label: string; href?: string; onClick?: () => void }
  videoThumbnail: string
  onPlayClick?: () => void
  className?: string
}

export function HeroWithVideo({
  badge,
  title,
  titleHighlight,
  description,
  primaryAction,
  videoThumbnail,
  onPlayClick,
  className,
}: HeroWithVideoProps) {
  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          {badge && (
            <Badge variant="secondary" className="text-sm px-4 py-1">
              <Star className="h-3 w-3 mr-2" />
              {badge}
            </Badge>
          )}

          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            {title}{' '}
            {titleHighlight && (
              <span className="underline decoration-primary decoration-4 underline-offset-4">
                {titleHighlight}
              </span>
            )}
          </h1>

          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            {description}
          </p>

          {primaryAction && (
            <Button size="lg" onClick={primaryAction.onClick}>
              {primaryAction.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="relative group cursor-pointer" onClick={onPlayClick}>
          <div className="border-3 border-foreground shadow-[8px_8px_0px_hsl(var(--shadow-color))] overflow-hidden">
            <img
              src={videoThumbnail}
              alt="Video thumbnail"
              className="w-full h-auto object-cover aspect-video"
            />
          </div>
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 group-hover:bg-foreground/30 transition-colors">
            <div className="w-20 h-20 bg-primary border-3 border-foreground flex items-center justify-center shadow-[4px_4px_0px_hsl(var(--shadow-color))] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all">
              <Play className="h-8 w-8 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Export all variants
// ============================================================================
export const HeroSection = {
  Centered: HeroCentered,
  Split: HeroSplit,
  WithStats: HeroWithStats,
  Minimal: HeroMinimal,
  WithVideo: HeroWithVideo,
}
