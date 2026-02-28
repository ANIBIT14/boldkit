import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ArrowRight, Mail, Sparkles, Zap } from 'lucide-react'

// ============================================================================
// CTA VARIANT 1: Simple Centered
// ============================================================================
export interface CTASimpleProps {
  title: string
  description?: string
  primaryAction: { label: string; href?: string; onClick?: () => void }
  secondaryAction?: { label: string; href?: string; onClick?: () => void }
  className?: string
}

export function CTASimple({
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: CTASimpleProps) {
  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {title}
        </h2>

        {description && (
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            {description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={primaryAction.onClick}>
            {primaryAction.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          {secondaryAction && (
            <Button size="lg" variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA VARIANT 2: With Background
// ============================================================================
export interface CTAWithBackgroundProps {
  title: string
  description?: string
  primaryAction: { label: string; href?: string; onClick?: () => void }
  backgroundColor?: 'primary' | 'secondary' | 'accent' | 'muted'
  className?: string
}

export function CTAWithBackground({
  title,
  description,
  primaryAction,
  backgroundColor = 'primary',
  className,
}: CTAWithBackgroundProps) {
  const bgColors = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    muted: 'bg-muted text-foreground',
  }

  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div
        className={cn(
          'max-w-5xl mx-auto border-3 border-foreground p-8 md:p-12 shadow-[8px_8px_0px_hsl(var(--shadow-color))]',
          bgColors[backgroundColor]
        )}
      >
        <div className="text-center space-y-6">
          <Sparkles className="h-12 w-12 mx-auto" />

          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
            {title}
          </h2>

          {description && (
            <p className="text-lg font-medium max-w-2xl mx-auto opacity-90">
              {description}
            </p>
          )}

          <Button
            size="lg"
            variant={backgroundColor === 'muted' ? 'default' : 'outline'}
            className={backgroundColor !== 'muted' ? 'bg-background text-foreground hover:bg-background/90' : ''}
            onClick={primaryAction.onClick}
          >
            {primaryAction.label}
            <Zap className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA VARIANT 3: Newsletter
// ============================================================================
export interface CTANewsletterProps {
  title: string
  description?: string
  placeholder?: string
  buttonLabel?: string
  onSubmit?: (email: string) => void
  className?: string
}

export function CTANewsletter({
  title,
  description,
  placeholder = 'Enter your email',
  buttonLabel = 'Subscribe',
  onSubmit,
  className,
}: CTANewsletterProps) {
  const [email, setEmail] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(email)
    setEmail('')
  }

  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16 bg-muted/30', className)}>
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <Mail className="h-12 w-12 mx-auto text-primary" />

        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
          {title}
        </h2>

        {description && (
          <p className="text-muted-foreground font-medium">
            {description}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" size="lg">
            {buttonLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="text-xs text-muted-foreground">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}

// ============================================================================
// CTA VARIANT 4: Split with Image
// ============================================================================
export interface CTASplitProps {
  title: string
  description?: string
  primaryAction: { label: string; href?: string; onClick?: () => void }
  secondaryAction?: { label: string; href?: string; onClick?: () => void }
  imageSrc: string
  imageAlt?: string
  imagePosition?: 'left' | 'right'
  className?: string
}

export function CTASplit({
  title,
  description,
  primaryAction,
  secondaryAction,
  imageSrc,
  imageAlt = 'CTA image',
  imagePosition = 'right',
  className,
}: CTASplitProps) {
  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-6xl mx-auto border-3 border-foreground shadow-[8px_8px_0px_hsl(var(--shadow-color))] overflow-hidden">
        <div
          className={cn(
            'grid md:grid-cols-2',
            imagePosition === 'left' && 'md:[&>*:first-child]:order-2'
          )}
        >
          <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              {title}
            </h2>

            {description && (
              <p className="text-muted-foreground font-medium">
                {description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={primaryAction.onClick}>
                {primaryAction.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              {secondaryAction && (
                <Button size="lg" variant="outline" onClick={secondaryAction.onClick}>
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          </div>

          <div className="bg-muted">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA VARIANT 5: Banner
// ============================================================================
export interface CTABannerProps {
  text: string
  action: { label: string; href?: string; onClick?: () => void }
  dismissible?: boolean
  onDismiss?: () => void
  variant?: 'primary' | 'secondary' | 'accent' | 'warning'
  className?: string
}

export function CTABanner({
  text,
  action,
  dismissible = false,
  onDismiss,
  variant = 'primary',
  className,
}: CTABannerProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  const variantStyles = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    warning: 'bg-warning text-warning-foreground',
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'py-3 px-4 border-b-3 border-foreground',
        variantStyles[variant],
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
        <p className="font-bold text-sm">
          {text}
        </p>
        <Button
          size="sm"
          variant="outline"
          className="bg-background text-foreground hover:bg-background/90 shrink-0"
          onClick={action.onClick}
        >
          {action.label}
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
        {dismissible && (
          <button
            onClick={() => {
              setIsVisible(false)
              onDismiss?.()
            }}
            className="absolute right-4 text-current opacity-70 hover:opacity-100"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// Export all variants
// ============================================================================
export const CTASection = {
  Simple: CTASimple,
  WithBackground: CTAWithBackground,
  Newsletter: CTANewsletter,
  Split: CTASplit,
  Banner: CTABanner,
}
