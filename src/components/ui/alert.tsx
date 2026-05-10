import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full border-3 border-foreground p-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))] animate-in fade-in-0 slide-in-from-top-2 duration-300 transition-all [&>svg~*]:pl-8 [&>svg~button]:pl-0 [&>svg~button]:ml-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'bg-destructive text-destructive-foreground [&>svg]:text-destructive-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        info: 'bg-info text-info-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-bold uppercase tracking-wide leading-none', className)}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export interface AlertActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Shows an inline spinner and disables the button automatically */
  loading?: boolean
}

const AlertAction = React.forwardRef<HTMLButtonElement, AlertActionProps>(
  ({ className, loading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      data-alert-action=""
      disabled={disabled || loading}
      className={cn(
        // layout
        'mt-3 inline-flex items-center gap-1.5 max-w-full min-w-0',
        // shape — no rounded corners, thin border inheriting text color
        'rounded-none border border-current',
        // typography
        'px-3 py-1 text-xs font-bold uppercase tracking-wide',
        // default state
        'opacity-80 transition-all duration-150',
        // hover
        'hover:opacity-100 hover:bg-current/10',
        // active
        'active:scale-95',
        // focus
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1',
        // disabled (covers both disabled and loading)
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        className
      )}
      {...props}
    >
      {loading && (
        <span
          data-testid="alert-action-spinner"
          aria-hidden="true"
          className="h-3 w-3 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap overflow-hidden">{children}</span>
    </button>
  )
)
AlertAction.displayName = 'AlertAction'

export { Alert, AlertTitle, AlertDescription, AlertAction }
