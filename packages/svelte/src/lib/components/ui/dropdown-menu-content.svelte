<script lang="ts">
  import { DropdownMenu } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends DropdownMenu.ContentProps {
    class?: string
    sideOffset?: number
    children?: Snippet
  }

  let { class: className, sideOffset = 4, children, ...restProps }: Props = $props()
</script>

<DropdownMenu.Portal>
  <DropdownMenu.Content
    {sideOffset}
    class={cn(
      'z-50 min-w-[8rem] overflow-hidden border-3 border-foreground bg-popover p-1 text-popover-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
      className
    )}
    {...restProps}
  >
    {@render children?.()}
  </DropdownMenu.Content>
</DropdownMenu.Portal>
