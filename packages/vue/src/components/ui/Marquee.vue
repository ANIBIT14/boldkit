<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  direction?: 'left' | 'right'
  speed?: 'slow' | 'normal' | 'fast'
  pauseOnHover?: boolean
  bordered?: boolean
  repeat?: number
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'left',
  speed: 'normal',
  pauseOnHover: true,
  bordered: true,
  repeat: 4,
})

const speedClasses = {
  slow: 'animate-marquee-slow',
  normal: 'animate-marquee',
  fast: 'animate-marquee-fast',
}

const animationClass = computed(() =>
  props.direction === 'right' ? 'animate-marquee-reverse' : speedClasses[props.speed]
)

const animationDirection = computed(() =>
  props.direction === 'right' ? 'reverse' : 'normal'
)

</script>

<template>
  <div
    :class="
      cn(
        'flex overflow-hidden',
        bordered && 'border-3 border-foreground bg-background',
        pauseOnHover && '[&:hover_.marquee-content]:pause',
        props.class
      )
    "
  >
    <div
      :class="
        cn(
          'marquee-content flex shrink-0 items-center gap-8 py-3',
          animationClass,
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )
      "
      :style="{ animationDirection }"
    >
      <slot v-for="_n in repeat" :key="_n" />
    </div>
    <div
      :class="
        cn(
          'marquee-content flex shrink-0 items-center gap-8 py-3',
          animationClass,
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )
      "
      :style="{ animationDirection }"
      aria-hidden="true"
    >
      <slot v-for="_m in repeat" :key="`dup-${_m}`" />
    </div>
  </div>
</template>
