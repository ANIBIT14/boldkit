<script setup lang="ts">
import { computed, inject } from 'vue'
import { cn } from '@/lib/utils'
import { STEPPER_INJECTION_KEY, type StepperContext } from './Stepper.vue'

interface StepperContentProps {
  index: number
  class?: string
}

const props = defineProps<StepperContentProps>()

const context = inject<StepperContext>(STEPPER_INJECTION_KEY)
if (!context) {
  throw new Error('StepperContent must be used within a Stepper')
}

const isActive = computed(() => {
  const activeStep = typeof context.activeStep === 'object' && 'value' in context.activeStep
    ? context.activeStep.value
    : context.activeStep
  return props.index === activeStep
})
</script>

<template>
  <div
    v-if="isActive"
    role="tabpanel"
    :class="cn('mt-4 animate-[slide-in-from-bottom_200ms_ease-out]', props.class)"
  >
    <slot />
  </div>
</template>
