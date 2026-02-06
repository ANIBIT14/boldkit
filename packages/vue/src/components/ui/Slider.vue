<script setup lang="ts">
import { SliderRoot, SliderTrack, SliderRange, SliderThumb, type SliderRootProps } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props extends SliderRootProps {
  class?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: number[] | undefined]
}>()
</script>

<template>
  <SliderRoot
    v-bind="props"
    :class="cn('relative flex w-full touch-none select-none items-center', props.class)"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <SliderTrack
      class="relative h-3 w-full grow overflow-hidden border-3 border-foreground bg-muted shadow-[4px_4px_0px_hsl(var(--shadow-color))]"
    >
      <SliderRange class="absolute h-full bg-primary transition-all" />
    </SliderTrack>
    <SliderThumb
      class="block h-6 w-6 border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none cursor-grab active:cursor-grabbing"
    />
  </SliderRoot>
</template>
