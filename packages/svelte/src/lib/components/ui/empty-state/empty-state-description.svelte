<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'
  type Props = { class?: string; children?: Snippet }
  let { class: className, children }: Props = $props()
</script>

<p class={cn('text-sm text-muted-foreground max-w-sm', className)}>
  {@render children?.()}
</p>
