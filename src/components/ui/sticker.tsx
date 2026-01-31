import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const stickerVariants = cva(
  'relative inline-flex items-center justify-center border-3 border-foreground font-bold uppercase tracking-wide transition-transform',
  {
    variants: {
      variant: {
        default: 'bg-accent text-accent-foreground',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'bg-background text-foreground',
        neon: 'bg-neon-pink text-foreground',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        default: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
        xl: 'px-6 py-3 text-lg',
      },
      rotation: {
        none: 'rotate-0',
        slight: '-rotate-2',
        medium: '-rotate-6',
        heavy: '-rotate-12',
        'slight-right': 'rotate-2',
        'medium-right': 'rotate-6',
        'heavy-right': 'rotate-12',
      },
      shadow: {
        none: '',
        default: 'shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        colored:
          'shadow-[4px_4px_0px_hsl(var(--primary))]',
        double:
          'shadow-[3px_3px_0px_hsl(var(--primary)),6px_6px_0px_hsl(var(--shadow-color))]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rotation: 'slight',
      shadow: 'default',
    },
  }
)

export interface StickerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stickerVariants> {
  /** Show dashed outline effect */
  dashed?: boolean
  /** Show tape decoration on top */
  tape?: boolean
  /** Interactive hover effect */
  interactive?: boolean
}

const Sticker = React.forwardRef<HTMLDivElement, StickerProps>(
  (
    {
      className,
      variant,
      size,
      rotation,
      shadow,
      dashed = false,
      tape = false,
      interactive = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          stickerVariants({ variant, size, rotation, shadow }),
          dashed && 'before:absolute before:inset-[-6px] before:border-2 before:border-dashed before:border-foreground/50',
          tape && 'after:absolute after:left-1/2 after:top-[-8px] after:-translate-x-1/2 after:rotate-[-2deg] after:w-[50px] after:h-[16px] after:bg-accent/80 after:border-2 after:border-foreground',
          interactive && 'cursor-pointer hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Sticker.displayName = 'Sticker'

const stampVariants = cva(
  'relative inline-flex items-center justify-center rounded-full border-4 border-foreground font-black uppercase tracking-widest',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        accent: 'bg-accent text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'bg-background text-foreground',
      },
      size: {
        sm: 'h-16 w-16 text-[10px]',
        default: 'h-24 w-24 text-xs',
        lg: 'h-32 w-32 text-sm',
        xl: 'h-40 w-40 text-base',
      },
      rotation: {
        none: 'rotate-0',
        slight: '-rotate-12',
        medium: '-rotate-[25deg]',
        heavy: '-rotate-45',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rotation: 'slight',
    },
  }
)

export interface StampProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stampVariants> {
  /** Show double ring effect */
  doubleRing?: boolean
}

const Stamp = React.forwardRef<HTMLDivElement, StampProps>(
  ({ className, variant, size, rotation, doubleRing = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          stampVariants({ variant, size, rotation }),
          'shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
          doubleRing && 'ring-2 ring-foreground ring-offset-2 ring-offset-background',
          className
        )}
        {...props}
      >
        <span className="text-center leading-tight">{children}</span>
      </div>
    )
  }
)
Stamp.displayName = 'Stamp'

const stickyNoteVariants = cva(
  'relative border-3 border-foreground font-medium shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
  {
    variants: {
      variant: {
        yellow: 'bg-accent text-accent-foreground',
        pink: 'bg-primary text-primary-foreground',
        blue: 'bg-info text-info-foreground',
        green: 'bg-success text-success-foreground',
        purple: 'bg-secondary text-secondary-foreground',
      },
      size: {
        sm: 'p-3 text-sm min-w-[120px]',
        default: 'p-4 text-base min-w-[160px]',
        lg: 'p-6 text-lg min-w-[200px]',
      },
      rotation: {
        none: 'rotate-0',
        left: '-rotate-2',
        right: 'rotate-2',
        'tilt-left': '-rotate-6',
        'tilt-right': 'rotate-6',
      },
    },
    defaultVariants: {
      variant: 'yellow',
      size: 'default',
      rotation: 'left',
    },
  }
)

export interface StickyNoteProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stickyNoteVariants> {
  /** Show pin decoration on top */
  pin?: boolean
  /** Show folded corner effect */
  folded?: boolean
}

const StickyNote = React.forwardRef<HTMLDivElement, StickyNoteProps>(
  ({ className, variant, size, rotation, pin = false, folded = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          stickyNoteVariants({ variant, size, rotation }),
          folded && 'before:absolute before:bottom-0 before:right-0 before:w-0 before:h-0 before:border-l-[20px] before:border-l-transparent before:border-b-[20px] before:border-b-foreground/20',
          className
        )}
        {...props}
      >
        {pin && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-destructive border-2 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))]" />
        )}
        {children}
      </div>
    )
  }
)
StickyNote.displayName = 'StickyNote'

export { Sticker, stickerVariants, Stamp, stampVariants, StickyNote, stickyNoteVariants }
