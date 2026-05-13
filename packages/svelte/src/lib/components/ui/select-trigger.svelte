<script lang="ts">
  import { Select } from 'bits-ui'
  import { ChevronDown } from 'lucide-svelte'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends Select.TriggerProps {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<Select.Trigger
  class={cn(
    'flex h-11 w-full items-center justify-between border-3 border-input bg-background px-4 py-2 text-sm font-medium shadow-[4px_4px_0px_hsl(var(--shadow-color))] placeholder:text-muted-foreground focus:outline-none focus:translate-x-[4px] focus:translate-y-[4px] focus:shadow-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-all duration-200',
    className
  )}
  {...restProps}
>
  {@render children?.()}
  <ChevronDown class="h-5 w-5 stroke-[3]" />
</Select.Trigger>
