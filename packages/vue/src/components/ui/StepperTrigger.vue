<script setup lang="ts">
import { computed, inject } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-vue-next'
import { STEPPER_INJECTION_KEY, type StepperContext } from './Stepper.vue'
import { STEPPER_ITEM_INJECTION_KEY, type StepperItemContext } from './StepperItem.vue'

const stepVariants = cva(
  'flex items-center justify-center border-3 border-foreground font-bold transition-all duration-200',
  {
    variants: {
      state: {
        completed: 'bg-success text-success-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        active: 'bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] scale-110',
        upcoming: 'bg-muted text-muted-foreground',
      },
      size: {
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10',
        lg: 'h-12 w-12 text-lg',
      },
    },
    defaultVariants: {
      state: 'upcoming',
      size: 'md',
    },
  }
)

type StepVariants = VariantProps<typeof stepVariants>

interface StepperTriggerProps {
  size?: StepVariants['size']
  showStepNumber?: boolean
  class?: string
}

const props = withDefaults(defineProps<StepperTriggerProps>(), {
  size: 'md',
  showStepNumber: true,
})

const stepperContext = inject<StepperContext>(STEPPER_INJECTION_KEY)
const itemContext = inject<StepperItemContext>(STEPPER_ITEM_INJECTION_KEY)

if (!stepperContext || !itemContext) {
  throw new Error('StepperTrigger must be used within a StepperItem')
}

const state = computed<'completed' | 'active' | 'upcoming'>(() => {
  const activeStep = typeof stepperContext.activeStep === 'object' && 'value' in stepperContext.activeStep
    ? stepperContext.activeStep.value
    : stepperContext.activeStep
  if (itemContext.index < activeStep) return 'completed'
  if (itemContext.index === activeStep) return 'active'
  return 'upcoming'
})

const handleClick = () => {
  stepperContext.setActiveStep(itemContext.index)
}
</script>

<template>
  <button
    type="button"
    role="tab"
    :aria-selected="state === 'active'"
    :class="cn(stepVariants({ state, size }), props.class)"
    @click="handleClick"
  >
    <Check v-if="state === 'completed'" class="h-5 w-5" />
    <template v-else-if="showStepNumber">{{ itemContext.index + 1 }}</template>
    <slot v-else />
  </button>
</template>
