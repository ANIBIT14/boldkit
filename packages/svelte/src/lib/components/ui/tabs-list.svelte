<script lang="ts">
  import { Tabs } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends Tabs.ListProps {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<Tabs.List
  class={cn(
    'inline-flex h-12 items-center justify-center border-3 border-foreground bg-background p-1 text-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</Tabs.List>
