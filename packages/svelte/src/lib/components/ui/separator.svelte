<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  interface Props extends HTMLAttributes<HTMLDivElement> {
    class?: string
    orientation?: 'horizontal' | 'vertical'
    decorative?: boolean
  }

  let {
    class: className,
    orientation = 'horizontal',
    decorative = true,
    ...restProps
  }: Props = $props()
</script>

<div
  role={decorative ? 'none' : 'separator'}
  aria-orientation={decorative ? undefined : orientation}
  class={cn(
    'shrink-0 bg-foreground',
    orientation === 'horizontal' ? 'h-[3px] w-full' : 'h-full w-[3px]',
    className
  )}
  {...restProps}
></div>
