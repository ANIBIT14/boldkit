<script lang="ts">
  import { Avatar } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends Avatar.RootProps {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<Avatar.Root
  class={cn(
    'relative flex h-10 w-10 shrink-0 overflow-hidden border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</Avatar.Root>
