<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'
  type Props = { class?: string; children?: Snippet }
  let { class: className, children }: Props = $props()
</script>

<h4 class={cn('font-bold uppercase tracking-wide leading-none', className)}>
  {@render children?.()}
</h4>
