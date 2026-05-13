<script lang="ts">
  import { DropdownMenu } from 'bits-ui'
  import { cn } from '$lib/utils.js'

  interface Props extends DropdownMenu.SeparatorProps {
    class?: string
  }

  let { class: className, ...restProps }: Props = $props()
</script>

<DropdownMenu.Separator class={cn('-mx-1 my-1 h-px bg-foreground', className)} {...restProps} />
