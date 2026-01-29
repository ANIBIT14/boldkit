import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const layeredCardVariants = cva(
  'relative border-3 border-foreground bg-card text-card-foreground',
  {
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
  }
)

const getLayerStyles = (
  layers: 'single' | 'double' | 'triple' | null | undefined,
  offset: 'sm' | 'default' | 'lg' | null | undefined,
  layerColor: 'default' | 'primary' | 'secondary' | 'accent' | 'muted' | null | undefined
) => {
  const offsets = {
    sm: { first: 4, second: 8, third: 12 },
    default: { first: 6, second: 12, third: 18 },
    lg: { first: 8, second: 16, third: 24 },
  }

  const colors = {
    default: 'hsl(var(--card))',
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    accent: 'hsl(var(--accent))',
    muted: 'hsl(var(--muted))',
  }

  const o = offsets[offset || 'default']
  const color = colors[layerColor || 'default']
  const layerCount = layers === 'single' ? 1 : layers === 'triple' ? 3 : 2

  return { offsets: o, color, layerCount }
}

export interface LayeredCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layeredCardVariants> {
  /** Make the card interactive with hover effects */
  interactive?: boolean
}

const LayeredCard = React.forwardRef<HTMLDivElement, LayeredCardProps>(
  ({ className, layers, offset, layerColor, interactive = false, children, ...props }, ref) => {
    const { offsets: o, color, layerCount } = getLayerStyles(layers, offset, layerColor)

    return (
      <div
        ref={ref}
        className={cn(
          layeredCardVariants({ layers, offset, layerColor }),
          interactive &&
            'cursor-pointer transition-transform hover:translate-x-[-4px] hover:translate-y-[-4px]',
          className
        )}
        style={{
          boxShadow: `${o.first}px ${o.first}px 0px ${color}`,
        }}
        {...props}
      >
        {/* Background layers */}
        {layerCount >= 1 && (
          <div
            className="absolute inset-0 -z-10 border-3 border-foreground"
            style={{
              transform: `translate(${o.first}px, ${o.first}px)`,
              backgroundColor: color,
            }}
          />
        )}
        {layerCount >= 2 && (
          <div
            className="absolute inset-0 -z-20 border-3 border-foreground"
            style={{
              transform: `translate(${o.second}px, ${o.second}px)`,
              backgroundColor: layerColor === 'default' ? 'hsl(var(--muted))' : color,
              opacity: 0.7,
            }}
          />
        )}
        {layerCount >= 3 && (
          <div
            className="absolute inset-0 -z-30 border-3 border-foreground"
            style={{
              transform: `translate(${o.third}px, ${o.third}px)`,
              backgroundColor: 'hsl(var(--muted))',
              opacity: 0.5,
            }}
          />
        )}
        {children}
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
    className={cn('flex flex-col space-y-1.5 border-b-3 border-foreground bg-muted p-4', className)}
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
    className={cn('flex items-center border-t-3 border-foreground bg-muted p-4', className)}
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
