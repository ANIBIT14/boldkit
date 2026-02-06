<script setup lang="ts">
import { DrawerRoot } from 'vaul-vue'

interface Props {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
  direction?: 'top' | 'bottom' | 'left' | 'right'
  activeSnapPoint?: number | string | null
  snapPoints?: (number | string)[]
  fadeFromIndex?: number
  shouldScaleBackground?: boolean
  closeThreshold?: number
  dismissible?: boolean
  handleOnly?: boolean
  nested?: boolean
  fixed?: boolean
  noBodyStyles?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  shouldScaleBackground: true,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <DrawerRoot
    v-bind="props"
    :should-scale-background="props.shouldScaleBackground"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </DrawerRoot>
</template>
