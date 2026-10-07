<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'
  type Props = { class?: string; children?: Snippet }
  let { class: className, children }: Props = $props()
</script>

<div
  class={cn(
    'flex h-16 w-16 items-center justify-center border-3 border-foreground bg-muted shadow-[4px_4px_0px_hsl(var(--shadow-color))] [&>svg]:h-8 [&>svg]:w-8',
    className
  )}
>
  {@render children?.()}
</div>
