import { cva } from 'class-variance-authority'

export const stickerVariants = cva(
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
        colored: 'shadow-[4px_4px_0px_hsl(var(--primary))]',
        double: 'shadow-[3px_3px_0px_hsl(var(--primary)),6px_6px_0px_hsl(var(--shadow-color))]',
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

export const stampVariants = cva(
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

export const stickyNoteVariants = cva(
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
