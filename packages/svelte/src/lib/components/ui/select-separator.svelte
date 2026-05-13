<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  interface Props extends HTMLAttributes<HTMLDivElement> {
    class?: string
  }

  let { class: className, ...restProps }: Props = $props()
</script>

<div class={cn('-mx-1 my-1 h-px bg-foreground', className)} role="separator" {...restProps}></div>
