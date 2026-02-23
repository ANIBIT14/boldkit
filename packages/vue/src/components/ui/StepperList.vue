<script setup lang="ts">
import { inject } from 'vue'
import { cn } from '@/lib/utils'
import { STEPPER_INJECTION_KEY, type StepperContext } from './Stepper.vue'

interface StepperListProps {
  class?: string
}

const props = defineProps<StepperListProps>()

const context = inject<StepperContext>(STEPPER_INJECTION_KEY)
if (!context) {
  throw new Error('StepperList must be used within a Stepper')
}
</script>

<template>
  <div
    role="tablist"
    :class="cn(
      'flex items-center',
      context.orientation === 'horizontal' ? 'flex-row' : 'flex-col items-start',
      props.class
    )"
  >
    <slot />
  </div>
</template>
