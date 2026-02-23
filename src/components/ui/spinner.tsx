import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const spinnerVariants = cva(
  'inline-flex items-center justify-center',
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
      variant: {
        default: '',
        dots: '',
        bars: '',
        blocks: '',
        brutal: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, ...props }, ref) => {
    const sizeClasses = {
      xs: { element: 'h-3 w-3', dot: 'h-1 w-1', bar: 'w-0.5 h-2', block: 'h-1 w-1', ring: 'h-3 w-3' },
      sm: { element: 'h-4 w-4', dot: 'h-1 w-1', bar: 'w-0.5 h-2.5', block: 'h-1.5 w-1.5', ring: 'h-4 w-4' },
      md: { element: 'h-6 w-6', dot: 'h-1.5 w-1.5', bar: 'w-1 h-4', block: 'h-2 w-2', ring: 'h-6 w-6' },
      lg: { element: 'h-8 w-8', dot: 'h-2 w-2', bar: 'w-1 h-5', block: 'h-2.5 w-2.5', ring: 'h-8 w-8' },
      xl: { element: 'h-12 w-12', dot: 'h-3 w-3', bar: 'w-1.5 h-8', block: 'h-4 w-4', ring: 'h-12 w-12' },
    }

    const currentSize = size || 'md'
    const sizes = sizeClasses[currentSize]

    if (variant === 'dots') {
      return (
        <div
          ref={ref}
          className={cn(spinnerVariants({ size, variant }), 'gap-1', className)}
          {...props}
        >
          <div className={cn(sizes.dot, 'bg-foreground animate-[brutal-dots_1.4s_ease-in-out_infinite]')} style={{ animationDelay: '0ms' }} />
          <div className={cn(sizes.dot, 'bg-foreground animate-[brutal-dots_1.4s_ease-in-out_infinite]')} style={{ animationDelay: '200ms' }} />
          <div className={cn(sizes.dot, 'bg-foreground animate-[brutal-dots_1.4s_ease-in-out_infinite]')} style={{ animationDelay: '400ms' }} />
        </div>
      )
    }

    if (variant === 'bars') {
      return (
        <div
          ref={ref}
          className={cn(spinnerVariants({ size, variant }), 'gap-0.5', className)}
          {...props}
        >
          <div className={cn(sizes.bar, 'bg-foreground animate-[brutal-bars_1.2s_ease-in-out_infinite]')} style={{ animationDelay: '0ms' }} />
          <div className={cn(sizes.bar, 'bg-foreground animate-[brutal-bars_1.2s_ease-in-out_infinite]')} style={{ animationDelay: '150ms' }} />
          <div className={cn(sizes.bar, 'bg-foreground animate-[brutal-bars_1.2s_ease-in-out_infinite]')} style={{ animationDelay: '300ms' }} />
        </div>
      )
    }

    if (variant === 'blocks') {
      return (
        <div
          ref={ref}
          className={cn(spinnerVariants({ size, variant }), 'relative', className)}
          {...props}
        >
          <div className="relative animate-[brutal-blocks_1.2s_linear_infinite]">
            <div className={cn(sizes.block, 'absolute bg-foreground')} style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }} />
            <div className={cn(sizes.block, 'absolute bg-foreground')} style={{ top: '50%', right: 0, transform: 'translateY(-50%)' }} />
            <div className={cn(sizes.block, 'absolute bg-foreground')} style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)' }} />
            <div className={cn(sizes.block, 'absolute bg-foreground')} style={{ top: '50%', left: 0, transform: 'translateY(-50%)' }} />
          </div>
        </div>
      )
    }

    if (variant === 'brutal') {
      return (
        <div
          ref={ref}
          className={cn(spinnerVariants({ size, variant }), className)}
          {...props}
        >
          <div className={cn(sizes.ring, 'relative')}>
            <div className="absolute inset-0 bg-foreground border-3 border-foreground" />
            <div className="absolute inset-0 bg-foreground animate-[brutal-shadow-spin_1s_linear_infinite]" style={{ boxShadow: '3px 3px 0px hsl(var(--primary))' }} />
          </div>
        </div>
      )
    }

    // Default ring spinner
    return (
      <div
        ref={ref}
        className={cn(spinnerVariants({ size, variant }), className)}
        {...props}
      >
        <svg
          className={cn(sizes.ring, 'animate-spin')}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    )
  }
)
Spinner.displayName = 'Spinner'

export { Spinner, spinnerVariants }
