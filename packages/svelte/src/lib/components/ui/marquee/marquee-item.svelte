<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'
  type Props = { class?: string; children?: Snippet }
  let { class: className, children }: Props = $props()
</script>

<span class={cn('inline-flex items-center gap-2 whitespace-nowrap px-4 text-lg font-bold uppercase tracking-wide', className)}>
  {@render children?.()}
</span>
