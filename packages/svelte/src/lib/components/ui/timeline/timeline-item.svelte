<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'
  type Props = { class?: string; children?: Snippet }
  let { class: className, children }: Props = $props()
</script>

<div class={cn('relative flex gap-4 pb-8 last:pb-0', className)}>
  {@render children?.()}
</div>
