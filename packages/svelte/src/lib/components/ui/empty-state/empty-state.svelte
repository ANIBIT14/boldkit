<script lang="ts">
  import type { Snippet } from 'svelte'
  import { type VariantProps } from 'class-variance-authority'
  import { cn } from '$lib/utils.js'
  import { emptyStateVariants } from './empty-state-variants.js'

  type EmptyStateVariants = VariantProps<typeof emptyStateVariants>
  type Props = { class?: string; size?: EmptyStateVariants['size']; children?: Snippet }
  let { class: className, size = 'default', children }: Props = $props()
</script>

<div class={cn(emptyStateVariants({ size }), className)}>
  {@render children?.()}
</div>
