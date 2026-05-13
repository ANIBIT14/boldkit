<script lang="ts">
  import { Dialog } from 'bits-ui'
  import type { Snippet } from 'svelte'

  interface Props extends Dialog.CloseProps {
    children?: Snippet
  }

  let { children, ...restProps }: Props = $props()
</script>

<Dialog.Close {...restProps}>
  {@render children?.()}
</Dialog.Close>
