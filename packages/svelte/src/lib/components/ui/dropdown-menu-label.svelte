<script lang="ts">
  import { DropdownMenu } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends DropdownMenu.GroupHeadingProps {
    class?: string
    inset?: boolean
    children?: Snippet
  }

  let { class: className, inset = false, children, ...restProps }: Props = $props()
</script>

<DropdownMenu.GroupHeading
  class={cn(
    'px-2 py-1.5 text-sm font-bold uppercase tracking-wide',
    inset && 'pl-8',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</DropdownMenu.GroupHeading>
