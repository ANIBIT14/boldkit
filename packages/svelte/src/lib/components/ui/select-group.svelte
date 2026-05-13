<script lang="ts">
  import { Select } from 'bits-ui'
  import type { Snippet } from 'svelte'

  interface Props extends Select.GroupProps {
    children?: Snippet
  }

  let { children, ...restProps }: Props = $props()
</script>

<Select.Group {...restProps}>
  {@render children?.()}
</Select.Group>
