<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'
  type Props = { class?: string; children?: Snippet }
  let { class: className, children }: Props = $props()
</script>

<time class={cn('text-xs font-medium text-muted-foreground uppercase tracking-wide', className)}>
  {@render children?.()}
</time>
