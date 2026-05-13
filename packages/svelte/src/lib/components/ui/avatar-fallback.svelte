<script lang="ts">
  import { Avatar } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends Avatar.FallbackProps {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<Avatar.Fallback
  class={cn(
    'flex h-full w-full items-center justify-center bg-primary text-primary-foreground font-bold uppercase',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</Avatar.Fallback>
