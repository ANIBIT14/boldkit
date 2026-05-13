<script lang="ts">
  import { Accordion } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  type Props = {
    class?: string
    type?: 'single' | 'multiple'
    children?: Snippet
    [key: string]: unknown
  }

  let { class: className, type = 'single', children, ...restProps }: Props = $props()
</script>

<Accordion.Root {type} class={cn('w-full', className)} {...restProps}>
  {@render children?.()}
</Accordion.Root>
