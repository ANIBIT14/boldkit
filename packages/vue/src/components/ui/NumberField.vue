<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import {
  NumberFieldRoot,
  useForwardPropsEmits,
  type NumberFieldRootEmits,
  type NumberFieldRootProps,
} from 'reka-ui'
import { cn } from '@/lib/utils'

// Thin styled wrapper over Reka's NumberFieldRoot. useForwardPropsEmits only
// forwards props the consumer actually set, so Reka's own defaults
// (stepSnapping, focusOnChange = true) survive Vue's boolean-prop casting.
// Note Reka's prop is `readonly` (lowercase), unlike React's `readOnly`.
const props = defineProps<NumberFieldRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<NumberFieldRootEmits>()

const delegatedProps = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <NumberFieldRoot
    v-slot="slotProps"
    v-bind="forwarded"
    data-slot="number-field"
    :class="cn('grid gap-1.5', props.class)"
  >
    <slot v-bind="slotProps" />
  </NumberFieldRoot>
</template>
