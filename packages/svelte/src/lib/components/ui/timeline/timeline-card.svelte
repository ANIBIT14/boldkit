<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'
  type Props = { class?: string; children?: Snippet }
  let { class: className, children }: Props = $props()
</script>

<div
  class={cn(
    'border-3 border-foreground bg-card p-3 shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
    className
  )}
>
  {@render children?.()}
</div>
