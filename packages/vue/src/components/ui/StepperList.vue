<script setup lang="ts">
import { inject, useSlots, watchEffect, Comment, Fragment, type VNode } from 'vue'
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

// Report the number of step items up to the Stepper so `totalSteps` is
// populated (it was provided but never set). Flatten v-for fragments and skip
// comment placeholders from falsy v-if so the count matches rendered items.
const slots = useSlots()
const countSteps = (nodes: VNode[]): number =>
  nodes.reduce((acc, node) => {
    if (node.type === Comment) return acc
    if (node.type === Fragment && Array.isArray(node.children)) {
      return acc + countSteps(node.children as VNode[])
    }
    return acc + 1
  }, 0)

watchEffect(() => {
  context.setTotalSteps(countSteps(slots.default?.() ?? []))
})
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
