<script lang="ts">
  import { Dialog } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends Dialog.TitleProps {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<Dialog.Title
  class={cn('text-lg font-bold uppercase tracking-wide leading-none', className)}
  {...restProps}
>
  {@render children?.()}
</Dialog.Title>
