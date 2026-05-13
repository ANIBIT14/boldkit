<script lang="ts">
  import { Accordion } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends Accordion.ContentProps {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<Accordion.Content
  class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down border-t-3 border-foreground"
  {...restProps}
>
  <div class={cn('p-4', className)}>
    {@render children?.()}
  </div>
</Accordion.Content>
