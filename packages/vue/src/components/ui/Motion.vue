<script setup lang="ts">
/**
 * BoldKit Motion — <Motion>
 * Declarative recipe composition. Same prop surface as the React adapter.
 */
import { computed } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { cn } from '@/lib/utils'

interface MotionProps extends PrimitiveProps {
  press?: boolean
  stamp?: boolean
  pulse?: boolean
  class?: string
}

const props = withDefaults(defineProps<MotionProps>(), {
  as: 'div',
})

const classes = computed(() =>
  cn(
    props.press && 'bk-press',
    props.stamp && 'bk-stamp-in',
    props.pulse && 'bk-pulse-shadow',
    props.class
  )
)
</script>

<template>
  <Primitive :as="as" :class="classes">
    <slot />
  </Primitive>
</template>
