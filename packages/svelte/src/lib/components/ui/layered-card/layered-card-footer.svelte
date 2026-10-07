<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'
  type Props = { class?: string; children?: Snippet }
  let { class: className, children }: Props = $props()
</script>

<div class={cn('flex items-center p-4 border-t-3 border-foreground', className)}>
  {@render children?.()}
</div>
