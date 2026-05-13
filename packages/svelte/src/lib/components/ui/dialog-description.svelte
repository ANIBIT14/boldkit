<script lang="ts">
  import { Dialog } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends Dialog.DescriptionProps {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<Dialog.Description
  class={cn('text-sm text-muted-foreground', className)}
  {...restProps}
>
  {@render children?.()}
</Dialog.Description>
