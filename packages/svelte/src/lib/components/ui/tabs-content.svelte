<script lang="ts">
  import { Tabs } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends Tabs.ContentProps {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<Tabs.Content
  class={cn(
    'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</Tabs.Content>
