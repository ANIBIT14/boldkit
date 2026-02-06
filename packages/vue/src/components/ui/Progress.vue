<script setup lang="ts">
import { ProgressRoot, ProgressIndicator, type ProgressRootProps } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props extends ProgressRootProps {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <ProgressRoot
    v-bind="props"
    :class="
      cn(
        'relative h-5 w-full overflow-hidden border-3 border-foreground bg-muted shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        props.class
      )
    "
  >
    <ProgressIndicator
      class="h-full w-full flex-1 bg-primary transition-all duration-500 ease-out"
      :style="{ transform: `translateX(-${100 - (props.modelValue || 0)}%)` }"
    />
  </ProgressRoot>
</template>
