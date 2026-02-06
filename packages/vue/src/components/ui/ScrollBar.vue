<script setup lang="ts">
import { ScrollAreaScrollbar, ScrollAreaThumb } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  orientation?: 'vertical' | 'horizontal'
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
})
</script>

<template>
  <ScrollAreaScrollbar
    :orientation="props.orientation"
    :class="
      cn(
        'flex touch-none select-none transition-colors',
        props.orientation === 'vertical' && 'h-full w-3 border-l-3 border-l-transparent p-[1px]',
        props.orientation === 'horizontal' && 'h-3 flex-col border-t-3 border-t-transparent p-[1px]',
        props.class
      )
    "
  >
    <ScrollAreaThumb class="relative flex-1 bg-foreground" />
  </ScrollAreaScrollbar>
</template>
