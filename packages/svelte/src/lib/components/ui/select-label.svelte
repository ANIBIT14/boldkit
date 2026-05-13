<script lang="ts">
  import { Select } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  interface Props extends Select.GroupHeadingProps {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...restProps }: Props = $props()
</script>

<Select.GroupHeading
  class={cn('py-1.5 pl-8 pr-2 text-sm font-bold uppercase tracking-wide', className)}
  {...restProps}
>
  {@render children?.()}
</Select.GroupHeading>
