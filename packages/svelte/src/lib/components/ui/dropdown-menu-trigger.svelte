<script lang="ts">
  import { DropdownMenu } from 'bits-ui'
  import type { Snippet } from 'svelte'

  interface Props extends DropdownMenu.TriggerProps {
    children?: Snippet
  }

  let { children, ...restProps }: Props = $props()
</script>

<DropdownMenu.Trigger {...restProps}>
  {@render children?.()}
</DropdownMenu.Trigger>
