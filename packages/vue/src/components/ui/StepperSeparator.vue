<script setup lang="ts">
import { computed, inject } from 'vue'
import { cn } from '@/lib/utils'
import { STEPPER_INJECTION_KEY, type StepperContext } from './Stepper.vue'
import { STEPPER_ITEM_INJECTION_KEY, type StepperItemContext } from './StepperItem.vue'

interface StepperSeparatorProps {
  class?: string
}

const props = defineProps<StepperSeparatorProps>()

const stepperContext = inject<StepperContext>(STEPPER_INJECTION_KEY)
const itemContext = inject<StepperItemContext>(STEPPER_ITEM_INJECTION_KEY)

if (!stepperContext || !itemContext) {
  throw new Error('StepperSeparator must be used within a StepperItem')
}

const isCompleted = computed(() => {
  const activeStep = typeof stepperContext.activeStep === 'object' && 'value' in stepperContext.activeStep
    ? stepperContext.activeStep.value
    : stepperContext.activeStep
  return itemContext.index < activeStep
})
</script>

<template>
  <div
    :class="cn(
      'transition-all duration-200',
      stepperContext.orientation === 'horizontal'
        ? 'h-[3px] flex-1 min-w-8 mx-2'
        : 'w-[3px] min-h-8 my-2 ml-5',
      isCompleted
        ? 'bg-foreground'
        : 'bg-foreground/30 border-foreground/30',
      !isCompleted && 'border-dashed border-2 bg-transparent',
      props.class
    )"
  />
</template>
