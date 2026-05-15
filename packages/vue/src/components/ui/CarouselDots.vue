<script setup lang="ts">
import { inject, computed } from 'vue'
import { cn } from '@/lib/utils'
import { CAROUSEL_INJECTION_KEY, type CarouselContext } from './Carousel.vue'

interface CarouselDotsProps {
  class?: string
}

const props = defineProps<CarouselDotsProps>()

const context = inject<CarouselContext>(CAROUSEL_INJECTION_KEY)
if (!context) {
  throw new Error('CarouselDots must be used within a Carousel')
}

const hasMultipleSnaps = computed(() => (context.scrollSnaps.value ?? []).length > 1)
</script>

<template>
  <div
    v-if="hasMultipleSnaps"
    :class="cn('flex items-center justify-center gap-2 mt-4', props.class)"
  >
    <button
      v-for="(_, index) in context.scrollSnaps.value"
      :key="index"
      type="button"
      :class="cn(
        'h-3 w-3 border-2 border-foreground transition-all duration-200',
        index === context.selectedIndex.value
          ? 'bg-primary scale-110 shadow-[2px_2px_0px_hsl(var(--shadow-color))]'
          : 'bg-muted hover:bg-muted/80'
      )"
      :aria-label="`Go to slide ${index + 1}`"
      @click="context.scrollTo(index)"
    />
  </div>
</template>
