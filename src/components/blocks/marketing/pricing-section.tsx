 
import { Check } from 'lucide-react'
import { cn, safeHref } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export interface PricingTier {
  name: string
  price: string
  period?: string
  description?: string
  features: string[]
  cta?: string
  /** Navigate on click. Takes precedence over `onCtaClick`. */
  ctaHref?: string
  /** Called when the tier's CTA is clicked and no `ctaHref` is set. */
  onCtaClick?: () => void
  featured?: boolean
}

export interface PricingSectionProps {
  title?: string
  subtitle?: string
  tiers: PricingTier[]
  className?: string
}

// ============================================================================
// PRICING VARIANT 1: Tiers
// ============================================================================
export function PricingSection({
  title = 'Pricing',
  subtitle,
  tiers,
  className,
}: PricingSectionProps) {
  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">{title}</h2>
          {subtitle && <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'flex flex-col border-3 border-foreground bg-card p-6',
                tier.featured
                  ? 'shadow-[8px_8px_0px_hsl(var(--shadow-color))] md:-translate-y-2'
                  : 'shadow-[4px_4px_0px_hsl(var(--shadow-color))]'
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase tracking-wide">{tier.name}</h3>
                {tier.featured && <Badge variant="accent">Popular</Badge>}
              </div>
              {tier.description && (
                <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
              )}
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black">{tier.price}</span>
                {tier.period && (
                  <span className="text-sm font-bold text-muted-foreground">/{tier.period}</span>
                )}
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm font-medium">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-foreground bg-success">
                      <Check className="h-3 w-3 text-success-foreground" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              {tier.ctaHref ? (
                <Button
                  className="mt-6 w-full"
                  variant={tier.featured ? 'default' : 'outline'}
                  asChild
                >
                  <a href={safeHref(tier.ctaHref)}>{tier.cta ?? 'Get started'}</a>
                </Button>
              ) : (
                <Button
                  className="mt-6 w-full"
                  variant={tier.featured ? 'default' : 'outline'}
                  onClick={tier.onCtaClick}
                >
                  {tier.cta ?? 'Get started'}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// PRICING VARIANT 2: WithCheckout — tiers + an order-summary panel
// ============================================================================
export interface CheckoutSummaryProps {
  planName: string
  lineItems: { label: string; amount: string }[]
  total: string
  /** Label for the checkout button. Defaults to "Checkout". */
  checkoutLabel?: string
  /** Called when the checkout button is clicked. */
  onCheckout?: () => void
  className?: string
}

export function CheckoutSummary({
  planName,
  lineItems,
  total,
  checkoutLabel = 'Checkout',
  onCheckout,
  className,
}: CheckoutSummaryProps) {
  return (
    <div
      className={cn(
        'border-3 border-foreground bg-card p-6 shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        className
      )}
    >
      <h3 className="text-lg font-black uppercase tracking-wide">Order summary</h3>
      <p className="mt-1 text-sm font-bold text-muted-foreground">{planName}</p>
      <div className="mt-4 space-y-2 border-t-2 border-foreground pt-4">
        {lineItems.map((item) => (
          <div key={item.label} className="flex justify-between text-sm font-medium">
            <span>{item.label}</span>
            <span className="font-bold">{item.amount}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between border-t-3 border-foreground pt-4 text-lg font-black uppercase">
        <span>Total</span>
        <span>{total}</span>
      </div>
      <Button className="mt-6 w-full" onClick={onCheckout}>
        {checkoutLabel}
      </Button>
    </div>
  )
}
