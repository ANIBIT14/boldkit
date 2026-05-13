<script lang="ts">
  import { Avatar } from 'bits-ui'
  import { cn } from '$lib/utils.js'

  interface Props extends Avatar.ImageProps {
    class?: string
  }

  let { class: className, ...restProps }: Props = $props()
</script>

<Avatar.Image
  class={cn('aspect-square h-full w-full object-cover', className)}
  {...restProps}
/>
