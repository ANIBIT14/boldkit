<script setup lang="ts">
import { inject, computed } from 'vue'
import { ArrowLeft } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { CAROUSEL_INJECTION_KEY, type CarouselContext } from './Carousel.vue'
import Button from './Button.vue'

interface CarouselPreviousProps {
  variant?: 'default' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost' | 'link' | 'noShadow' | 'reverse'
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon'
  class?: string
}

const props = withDefaults(defineProps<CarouselPreviousProps>(), {
  variant: 'outline',
  size: 'icon',
})

const context = inject<CarouselContext>(CAROUSEL_INJECTION_KEY)
if (!context) {
  throw new Error('CarouselPrevious must be used within a Carousel')
}

const isDisabled = computed(() => !context.canScrollPrev.value)
</script>

<template>
  <Button
    :variant="variant"
    :size="size"
    :class="cn(
      'absolute h-10 w-10',
      'hover:translate-x-0 hover:translate-y-0 hover:scale-105 hover:shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
      context.orientation === 'horizontal'
        ? '-left-12 top-1/2 -translate-y-1/2'
        : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
      props.class
    )"
    :disabled="isDisabled"
    @click="context.scrollPrev"
  >
    <ArrowLeft class="h-5 w-5 stroke-[3]" />
    <span class="sr-only">Previous slide</span>
  </Button>
</template>
