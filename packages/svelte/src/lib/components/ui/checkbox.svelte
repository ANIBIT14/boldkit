<script lang="ts">
  import { Checkbox } from 'bits-ui'
  import { Check } from 'lucide-svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends Checkbox.RootProps {
    class?: string
    checked?: boolean
  }

  let { class: className, checked = $bindable(false), ...restProps }: Props = $props()
</script>

<Checkbox.Root
  bind:checked
  class={cn(
    'peer h-5 w-5 shrink-0 border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
    className
  )}
  {...restProps}
>
  <div class="flex items-center justify-center text-current">
    {#if checked}
      <Check class="h-4 w-4 stroke-[3]" />
    {/if}
  </div>
</Checkbox.Root>
