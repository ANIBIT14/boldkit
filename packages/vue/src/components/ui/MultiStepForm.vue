<script setup lang="ts" generic="V extends object">
import { provideMultiStepForm, type MultiStepFormStep } from './useMultiStepForm'

const props = defineProps<{
  steps: MultiStepFormStep<V>[]
  initialValues: V
  onSubmit: (values: V) => void
}>()

provideMultiStepForm<V>({
  steps: props.steps,
  initialValues: props.initialValues,
  onSubmit: props.onSubmit,
})
</script>

<template>
  <slot />
</template>
