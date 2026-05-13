<script lang="ts">
  import { Switch } from 'bits-ui'
  import { cn } from '$lib/utils.js'

  interface Props extends Switch.RootProps {
    class?: string
  }

  let { class: className, ...restProps }: Props = $props()
</script>

<Switch.Root
  class={cn(
    'peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center border-3 border-foreground bg-muted shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
    className
  )}
  {...restProps}
>
  <Switch.Thumb
    class="pointer-events-none block h-5 w-5 border-2 border-foreground bg-background shadow-sm transition-transform duration-200 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5"
  />
</Switch.Root>
