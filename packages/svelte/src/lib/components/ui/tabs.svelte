<script lang="ts">
  import { Tabs } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends Tabs.RootProps {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<Tabs.Root class={cn('w-full', className)} {...restProps}>
  {@render children?.()}
</Tabs.Root>
