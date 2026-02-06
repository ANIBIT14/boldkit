import { cva } from 'class-variance-authority'

export const chartContainerVariants = cva(
  'flex aspect-video justify-center text-xs',
  {
    variants: {
      variant: {
        default: 'border-3 border-foreground bg-background p-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        elevated: 'border-3 border-foreground bg-background p-4 shadow-[6px_6px_0px_hsl(var(--shadow-color))] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all',
        flat: 'border-3 border-foreground bg-background p-4',
        filled: 'border-3 border-foreground bg-muted/30 p-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        minimal: 'bg-background p-4',
        accent: 'border-3 border-foreground bg-accent/10 p-4 shadow-[4px_4px_0px_hsl(var(--accent))]',
        primary: 'border-3 border-foreground bg-primary/10 p-4 shadow-[4px_4px_0px_hsl(var(--primary))]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)
