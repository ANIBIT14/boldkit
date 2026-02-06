<script setup lang="ts">
import { Separator as SeparatorPrimitive, type SeparatorProps } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props extends SeparatorProps {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  decorative: true,
})
</script>

<template>
  <SeparatorPrimitive
    :orientation="props.orientation"
    :decorative="props.decorative"
    :class="
      cn(
        'shrink-0 bg-foreground',
        props.orientation === 'horizontal' ? 'h-[3px] w-full' : 'h-full w-[3px]',
        props.class
      )
    "
  />
</template>
