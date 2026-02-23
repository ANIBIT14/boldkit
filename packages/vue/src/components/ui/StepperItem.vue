<script setup lang="ts">
import { provide, inject } from 'vue'
import { cn } from '@/lib/utils'
import { STEPPER_INJECTION_KEY, type StepperContext } from './Stepper.vue'

export const STEPPER_ITEM_INJECTION_KEY = Symbol('stepper-item')

export interface StepperItemContext {
  index: number
}

interface StepperItemProps {
  index: number
  class?: string
}

const props = defineProps<StepperItemProps>()

const context = inject<StepperContext>(STEPPER_INJECTION_KEY)
if (!context) {
  throw new Error('StepperItem must be used within a Stepper')
}

provide(STEPPER_ITEM_INJECTION_KEY, {
  index: props.index,
})
</script>

<template>
  <div
    :class="cn(
      'flex items-center',
      context.orientation === 'horizontal' ? 'flex-row' : 'flex-col',
      props.class
    )"
  >
    <slot />
  </div>
</template>
