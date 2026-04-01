import { cva } from 'class-variance-authority'

export const emptyStateVariants = cva(
  'flex items-center justify-center',
  {
    variants: {
      variant: {
        default: '',
        filled: 'bg-muted/30 border-3 border-dashed border-foreground p-8',
        card: 'bg-card border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] p-8',
      },
      size: {
        compact: 'gap-2 p-2',
        sm: 'gap-3 p-4',
        md: 'gap-4 p-6',
        lg: 'gap-6 p-8',
      },
      layout: {
        vertical: 'flex-col text-center',
        horizontal: 'flex-row text-left',
      },
      animation: {
        none: '',
        fadeIn: 'animate-[fadeIn_0.3s_ease-out]',
        bounce: 'animate-[bounceIn_0.5s_ease-out]',
        scale: 'animate-[scaleIn_0.3s_ease-out]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      layout: 'vertical',
      animation: 'none',
    },
  }
)

export const iconContainerVariants = cva(
  'flex items-center justify-center border-3 border-foreground shadow-[3px_3px_0px_hsl(var(--shadow-color))]',
  {
    variants: {
      size: {
        xs: 'w-10 h-10',
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-20 h-20',
        xl: 'w-24 h-24',
      },
      iconColor: {
        default: 'bg-muted text-foreground',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        accent: 'bg-accent text-accent-foreground',
        muted: 'bg-muted text-muted-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        warning: 'bg-warning text-warning-foreground',
        success: 'bg-success text-success-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      iconColor: 'default',
    },
  }
)
