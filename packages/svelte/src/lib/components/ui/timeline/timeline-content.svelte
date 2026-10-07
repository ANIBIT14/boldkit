<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'
  type Props = { class?: string; children?: Snippet }
  let { class: className, children }: Props = $props()
</script>

<div class={cn('flex flex-col gap-1 flex-1 min-w-0', className)}>
  {@render children?.()}
</div>
