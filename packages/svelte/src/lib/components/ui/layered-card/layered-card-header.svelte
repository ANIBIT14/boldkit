<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'
  type Props = { class?: string; children?: Snippet }
  let { class: className, children }: Props = $props()
</script>

<div class={cn('flex flex-col space-y-1.5 border-b-3 border-foreground bg-muted p-4', className)}>
  {@render children?.()}
</div>
