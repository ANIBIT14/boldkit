<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  interface Props extends HTMLAttributes<HTMLDivElement> {
    class?: string
  }

  let { class: className, ...restProps }: Props = $props()
</script>

<div
  class={cn('animate-pulse bg-muted border-2 border-foreground/20', className)}
  {...restProps}
></div>
