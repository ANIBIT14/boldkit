<script lang="ts">
  import { Select } from 'bits-ui'
  import { ChevronUp, ChevronDown } from 'lucide-svelte'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends Select.ContentProps {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<Select.Portal>
  <Select.Content
    class={cn(
      'relative z-50 max-h-96 min-w-[8rem] overflow-hidden border-3 border-foreground bg-popover text-popover-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
      className
    )}
    {...restProps}
  >
    <Select.ScrollUpButton class="flex cursor-default items-center justify-center py-1">
      <ChevronUp class="h-4 w-4 stroke-[3]" />
    </Select.ScrollUpButton>
    <Select.Viewport class="p-1">
      {@render children?.()}
    </Select.Viewport>
    <Select.ScrollDownButton class="flex cursor-default items-center justify-center py-1">
      <ChevronDown class="h-4 w-4 stroke-[3]" />
    </Select.ScrollDownButton>
  </Select.Content>
</Select.Portal>
