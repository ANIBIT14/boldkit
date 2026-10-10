<script setup lang="ts">
// Avatar slot of a Message. Grouped rows keep its column width (bubbles stay
// aligned) but collapse its height; system rows hide it.
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    data-slot="message-avatar"
    :class="
      cn(
        'row-span-3 row-start-1 shrink-0 self-start',
        'group-data-[from=user]/message:col-start-2 group-data-[from=assistant]/message:col-start-1 group-data-[from=system]/message:hidden',
        'group-data-[grouped=true]/message:invisible group-data-[grouped=true]/message:h-0 group-data-[grouped=true]/message:overflow-hidden',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
