<script lang="ts">
  import { cva, type VariantProps } from 'class-variance-authority'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  const badgeVariants = cva(
    'inline-flex items-center border-2 border-foreground px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
    {
      variants: {
        variant: {
          default: 'bg-primary text-primary-foreground',
          secondary: 'bg-secondary text-secondary-foreground',
          accent: 'bg-accent text-accent-foreground',
          destructive: 'bg-destructive text-destructive-foreground',
          success: 'bg-success text-success-foreground',
          warning: 'bg-warning text-warning-foreground',
          info: 'bg-info text-info-foreground',
          outline: 'bg-background text-foreground',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  )

  type BadgeVariants = VariantProps<typeof badgeVariants>

  interface Props extends HTMLAttributes<HTMLDivElement> {
    variant?: BadgeVariants['variant']
    class?: string
    children?: Snippet
  }

  let { variant = 'default', class: className, children, ...restProps }: Props = $props()
</script>

<div class={cn(badgeVariants({ variant }), className)} {...restProps}>
  {@render children?.()}
</div>
