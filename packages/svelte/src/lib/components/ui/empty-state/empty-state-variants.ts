import { cva } from 'class-variance-authority'

export const emptyStateVariants = cva(
  'flex flex-col items-center justify-center text-center border-3 border-foreground bg-card p-8 shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
  {
    variants: {
      size: {
        sm: 'p-6 gap-3',
        default: 'p-8 gap-4',
        lg: 'p-12 gap-6',
      },
    },
    defaultVariants: { size: 'default' },
  }
)
