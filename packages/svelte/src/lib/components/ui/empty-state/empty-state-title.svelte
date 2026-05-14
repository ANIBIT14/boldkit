<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'
  type Props = { class?: string; children?: Snippet }
  let { class: className, children }: Props = $props()
</script>

<h3 class={cn('text-xl font-bold uppercase tracking-wide', className)}>
  {@render children?.()}
</h3>
