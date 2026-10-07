<script lang="ts">
  import { cn } from '$lib/utils.js'
  type Props = { class?: string }
  let { class: className }: Props = $props()
</script>

<div
  class={cn(
    'absolute left-2.5 top-5 bottom-0 w-[3px] -translate-x-1/2 bg-foreground',
    className
  )}
></div>
