<script lang="ts">
  import { DropdownMenu } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends DropdownMenu.ItemProps {
    class?: string
    inset?: boolean
    children?: Snippet
  }

  let { class: className, inset = false, children, ...restProps }: Props = $props()
</script>

<DropdownMenu.Item
  class={cn(
    'relative flex cursor-default select-none items-center px-2 py-1.5 text-sm outline-none transition-all duration-150 focus:bg-accent focus:text-accent-foreground focus:translate-x-1 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    inset && 'pl-8',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</DropdownMenu.Item>
