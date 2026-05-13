<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  interface Props extends HTMLAttributes<HTMLHeadingElement> {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<h5 class={cn('mb-1 font-bold uppercase tracking-wide leading-none', className)} {...restProps}>
  {@render children?.()}
</h5>
