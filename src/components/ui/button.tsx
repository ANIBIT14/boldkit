import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wide transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-3 border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground bk-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_hsl(var(--shadow-color))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
        secondary:
          'bg-secondary text-secondary-foreground bk-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_hsl(var(--shadow-color))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
        accent:
          'bg-accent text-accent-foreground bk-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_hsl(var(--shadow-color))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
        destructive:
          'bg-destructive text-destructive-foreground bk-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_hsl(var(--shadow-color))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
        outline:
          'bg-background text-foreground bk-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_hsl(var(--shadow-color))] hover:bg-muted active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
        ghost:
          'border-transparent shadow-none hover:bg-muted hover:border-foreground hover:bk-shadow',
        link: 'border-transparent shadow-none underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-11 px-5 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
