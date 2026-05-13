<script lang="ts">
  import { Select } from 'bits-ui'
  import { Check } from 'lucide-svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends Omit<Select.ItemProps, 'children'> {
    class?: string
    label?: string
  }

  let { class: className, label, value, ...restProps }: Props = $props()
</script>

<Select.Item
  {value}
  label={label ?? value}
  class={cn(
    'relative flex w-full cursor-default select-none items-center py-2 pl-8 pr-2 text-sm outline-none transition-all duration-150 focus:bg-accent focus:text-accent-foreground focus:translate-x-1 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    className
  )}
  {...restProps}
>
  {#snippet children({ selected })}
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {#if selected}
        <Check class="h-4 w-4 stroke-[3]" />
      {/if}
    </span>
    {label ?? value}
  {/snippet}
</Select.Item>
