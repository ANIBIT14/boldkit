import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const layeredCardVariants = cva('relative', {
  variants: {
    layers: {
      single: '',
      double: '',
      triple: '',
    },
    offset: {
      sm: '',
      default: '',
      lg: '',
    },
    layerColor: {
      default: '',
      primary: '',
      secondary: '',
      accent: '',
      muted: '',
    },
  },
  defaultVariants: {
    layers: 'double',
    offset: 'default',
    layerColor: 'default',
  },
})

export interface LayeredCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layeredCardVariants> {
  /** Make the card interactive with hover effects */
  interactive?: boolean
}

const LayeredCard = React.forwardRef<HTMLDivElement, LayeredCardProps>(
  ({ className, layers, offset, layerColor, interactive = false, children, ...props }, ref) => {
    // Calculate offsets based on size
    const offsetSizes = {
      sm: 6,
      default: 8,
      lg: 12,
    }
    const offsetPx = offsetSizes[offset || 'default']

    // Get layer count
    const layerCount = layers === 'single' ? 1 : layers === 'triple' ? 3 : 2

    // Get background color class for layers
    const colorClasses = {
      default: 'bg-muted',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent',
      muted: 'bg-muted',
    }
    const layerBg = colorClasses[layerColor || 'default']

    return (
      <div
        ref={ref}
        className={cn(layeredCardVariants({ layers, offset, layerColor }), className)}
        {...props}
      >
        {/* Layer 3 (furthest back) */}
        {layerCount >= 3 && (
          <div
            className={cn(
              'absolute inset-0 border-3 border-foreground',
              layerBg,
              'opacity-50'
            )}
            style={{
              transform: `translate(${offsetPx * 3}px, ${offsetPx * 3}px)`,
            }}
          />
        )}

        {/* Layer 2 */}
        {layerCount >= 2 && (
          <div
            className={cn(
              'absolute inset-0 border-3 border-foreground',
              layerBg,
              'opacity-70'
            )}
            style={{
              transform: `translate(${offsetPx * 2}px, ${offsetPx * 2}px)`,
            }}
          />
        )}

        {/* Layer 1 */}
        {layerCount >= 1 && (
          <div
            className={cn('absolute inset-0 border-3 border-foreground', layerBg)}
            style={{
              transform: `translate(${offsetPx}px, ${offsetPx}px)`,
            }}
          />
        )}

        {/* Main card (top layer) */}
        <div
          className={cn(
            'relative border-3 border-foreground bg-card text-card-foreground',
            interactive &&
              'cursor-pointer transition-transform duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px]'
          )}
        >
          {children}
        </div>
      </div>
    )
  }
)
LayeredCard.displayName = 'LayeredCard'

const LayeredCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col space-y-1.5 border-b-3 border-foreground bg-muted p-4',
      className
    )}
    {...props}
  />
))
LayeredCardHeader.displayName = 'LayeredCardHeader'

const LayeredCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-xl font-bold uppercase tracking-wide', className)}
    {...props}
  />
))
LayeredCardTitle.displayName = 'LayeredCardTitle'

const LayeredCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))
LayeredCardDescription.displayName = 'LayeredCardDescription'

const LayeredCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-4', className)} {...props} />
))
LayeredCardContent.displayName = 'LayeredCardContent'

const LayeredCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center border-t-3 border-foreground bg-muted p-4',
      className
    )}
    {...props}
  />
))
LayeredCardFooter.displayName = 'LayeredCardFooter'

export {
  LayeredCard,
  LayeredCardHeader,
  LayeredCardTitle,
  LayeredCardDescription,
  LayeredCardContent,
  LayeredCardFooter,
  layeredCardVariants,
}
