<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'
  type Props = { class?: string; children?: Snippet }
  let { class: className, children }: Props = $props()
</script>

<span class={cn('text-2xl font-black text-muted-foreground', className)}>
  {#if children}
    {@render children()}
  {:else}
    /
  {/if}
</span>
