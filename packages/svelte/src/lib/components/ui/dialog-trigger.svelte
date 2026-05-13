<script lang="ts">
  import { Dialog } from 'bits-ui'
  import type { Snippet } from 'svelte'

  interface Props extends Dialog.TriggerProps {
    children?: Snippet
  }

  let { children, ...restProps }: Props = $props()
</script>

<Dialog.Trigger {...restProps}>
  {@render children?.()}
</Dialog.Trigger>
