import { cva, type VariantProps } from 'class-variance-authority'

export const codeBlockVariants = cva(
  'group/code-block relative flex w-full min-w-0 flex-col overflow-hidden border-foreground bg-background text-foreground',
  {
    variants: {
      variant: {
        default: '',
        destructive:
          '[&_[data-slot=code-block-header]]:bg-destructive [&_[data-slot=code-block-header]]:text-destructive-foreground',
      },
      size: {
        default: 'border-3 text-sm shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        sm: 'border-2 text-xs shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export const codeBlockLineVariants = cva(
  // The negative margin + padding lets the diff bar and tint run edge to edge.
  "relative -mx-4 block border-l-4 border-transparent px-4 group-data-[size=sm]/code-block:-mx-2.5 group-data-[size=sm]/code-block:px-2.5 [[data-numbered]_&]:col-span-2 [[data-numbered]_&]:grid [[data-numbered]_&]:grid-cols-subgrid [[data-numbered]_&]:[counter-increment:line] [[data-numbered]_&]:before:mr-4 [[data-numbered]_&]:before:select-none [[data-numbered]_&]:before:text-right [[data-numbered]_&]:before:font-bold [[data-numbered]_&]:before:text-muted-foreground [[data-numbered]_&]:before:content-[counter(line)]",
  {
    variants: {
      variant: {
        default: '',
        added: 'border-success bg-success/20',
        removed: 'border-destructive bg-destructive/15',
        highlighted: 'border-accent bg-accent/25',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export type CodeBlockVariants = VariantProps<typeof codeBlockVariants>
export type CodeBlockLineVariants = VariantProps<typeof codeBlockLineVariants>
