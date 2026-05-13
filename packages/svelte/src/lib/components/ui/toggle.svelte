<script lang="ts">
  import { Toggle } from 'bits-ui'
  import type { VariantProps } from 'class-variance-authority'
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'
  import { toggleVariants } from './toggle-variants.js'

  type ToggleVariants = VariantProps<typeof toggleVariants>

  interface Props extends Toggle.RootProps {
    class?: string
    variant?: ToggleVariants['variant']
    size?: ToggleVariants['size']
    children?: Snippet
  }

  let {
    class: className,
    variant = 'default',
    size = 'default',
    children,
    ...restProps
  }: Props = $props()
</script>

<Toggle.Root
  class={cn(toggleVariants({ variant, size }), className)}
  {...restProps}
>
  {@render children?.()}
</Toggle.Root>
