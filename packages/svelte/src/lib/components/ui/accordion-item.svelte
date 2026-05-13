<script lang="ts">
  import { Accordion } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends Accordion.ItemProps {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<Accordion.Item
  class={cn(
    'border-3 border-foreground border-b-0 last:border-b-3 shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</Accordion.Item>
