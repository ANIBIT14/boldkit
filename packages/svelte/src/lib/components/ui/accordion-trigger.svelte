<script lang="ts">
  import { Accordion } from 'bits-ui'
  import { ChevronDown } from 'lucide-svelte'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends Accordion.TriggerProps {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<Accordion.Header class="flex">
  <Accordion.Trigger
    class={cn(
      'flex flex-1 items-center justify-between bg-background py-4 px-4 font-bold uppercase tracking-wide transition-all duration-200 hover:bg-muted [&[data-state=open]]:bg-accent [&[data-state=open]>svg]:rotate-180',
      className
    )}
    {...restProps}
  >
    {@render children?.()}
    <ChevronDown class="h-5 w-5 shrink-0 stroke-[3] transition-transform duration-200" />
  </Accordion.Trigger>
</Accordion.Header>
