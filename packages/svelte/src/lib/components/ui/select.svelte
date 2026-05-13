<script lang="ts">
  import { Select } from 'bits-ui'
  import type { Snippet } from 'svelte'

  type Props = {
    type?: 'single' | 'multiple'
    children?: Snippet
    [key: string]: unknown
  }

  let { type = 'single', children, ...restProps }: Props = $props()
</script>

<Select.Root type={type as 'single'} {...restProps}>
  {@render children?.()}
</Select.Root>
