<script lang="ts">
  import { Dialog } from 'bits-ui'
  import type { Snippet } from 'svelte'

  interface Props extends Dialog.RootProps {
    children?: Snippet
  }

  let { children, ...restProps }: Props = $props()
</script>

<Dialog.Root {...restProps}>
  {@render children?.()}
</Dialog.Root>
