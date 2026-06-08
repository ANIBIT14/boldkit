import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * A bordered container that joins an input with leading/trailing addons
 * (icons, text, or buttons) into a single neubrutalism field.
 */
const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-stretch border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-none',
      className
    )}
    {...props}
  />
))
InputGroup.displayName = 'InputGroup'

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'w-full flex-1 bg-transparent px-3 py-2 text-sm font-medium outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  />
))
InputGroupInput.displayName = 'InputGroupInput'

export interface InputGroupAddonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'leading' | 'trailing'
}

const InputGroupAddon = React.forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ className, position = 'leading', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center bg-muted px-3 text-sm font-bold uppercase tracking-wide text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0',
        position === 'leading' ? 'border-r-3 border-foreground' : 'border-l-3 border-foreground',
        className
      )}
      {...props}
    />
  )
)
InputGroupAddon.displayName = 'InputGroupAddon'

export { InputGroup, InputGroupInput, InputGroupAddon }
