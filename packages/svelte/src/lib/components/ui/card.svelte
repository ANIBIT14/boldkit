<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  interface Props extends HTMLAttributes<HTMLDivElement> {
    class?: string
    interactive?: boolean
    children?: Snippet
  }

  let { class: className, interactive = false, children, ...restProps }: Props = $props()
</script>

<div
  class={cn(
    'bg-card text-card-foreground border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200',
    interactive &&
      'cursor-pointer hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
