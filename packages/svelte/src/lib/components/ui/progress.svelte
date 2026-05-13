<script lang="ts">
  import { Progress } from 'bits-ui'
  import { cn } from '$lib/utils.js'

  interface Props extends Progress.RootProps {
    class?: string
    value?: number
  }

  let { class: className, value = 0, ...restProps }: Props = $props()
</script>

<Progress.Root
  {value}
  class={cn(
    'relative h-5 w-full overflow-hidden border-3 border-foreground bg-muted shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
    className
  )}
  {...restProps}
>
  <div
    class="h-full w-full flex-1 bg-primary transition-all duration-500 ease-out"
    style="transform: translateX(-{100 - ((value as number) || 0)}%)"
  ></div>
</Progress.Root>
