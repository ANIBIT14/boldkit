<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'
  type Props = { class?: string; children?: Snippet; variant?: 'default' | 'outline' | 'accent' }
  let { class: className, children, variant = 'default' }: Props = $props()

  const variants = {
    default: 'bg-foreground border-foreground',
    outline: 'bg-background border-foreground',
    accent: 'bg-accent border-foreground',
  }
</script>

<div
  class={cn(
    'relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-3 mt-0.5',
    variants[variant],
    className
  )}
>
  {@render children?.()}
</div>
