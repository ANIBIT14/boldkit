<script setup lang="ts">
import { computed } from 'vue'
import { DrawerRoot, type DrawerOpenChangeDetails, type DrawerRootEmits, type DrawerRootProps } from 'reka-ui'

// Reka's native Drawer (2.10+) replaces vaul-vue. The vaul-era props below are
// still accepted so existing code keeps working: `direction` maps to Reka's
// `swipeDirection`, `activeSnapPoint` to `snapPoint`, and `dismissible: false`
// cancels swipe / outside / Escape closes.
interface Props extends DrawerRootProps {
  /** @deprecated use `swipeDirection` (`down` | `up` | `left` | `right`). */
  direction?: 'top' | 'bottom' | 'left' | 'right'
  /** @deprecated use `snapPoint` (v-model:snap-point). */
  activeSnapPoint?: number | string | null
  dismissible?: boolean
  /** @deprecated vaul-only; Reka handles these itself. Accepted and ignored. */
  shouldScaleBackground?: boolean
  /** @deprecated */ fadeFromIndex?: number
  /** @deprecated */ closeThreshold?: number
  /** @deprecated */ handleOnly?: boolean
  /** @deprecated nesting is detected automatically */ nested?: boolean
  /** @deprecated */ fixed?: boolean
  /** @deprecated */ noBodyStyles?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: undefined,
  defaultOpen: undefined,
  modal: true,
  dismissible: true,
  snapPoint: undefined,
  activeSnapPoint: undefined,
})

const emit = defineEmits<DrawerRootEmits & {
  'update:activeSnapPoint': [value: number | string | null]
}>()

const DIRECTION = { top: 'up', bottom: 'down', left: 'left', right: 'right' } as const

const swipeDirection = computed(() =>
  props.swipeDirection ?? (props.direction ? DIRECTION[props.direction] : 'down'),
)
const snapPoint = computed(() => props.snapPoint !== undefined ? props.snapPoint : props.activeSnapPoint)

const USER_DISMISS = new Set(['swipe', 'escape-key', 'outside-press'])

function onOpenUpdate(value: boolean, details: DrawerOpenChangeDetails) {
  if (!value && !props.dismissible && details.reason && USER_DISMISS.has(details.reason)) {
    details.cancel()
    return
  }
  emit('update:open', value, details)
}

function onSnapUpdate(value: number | string | null) {
  emit('update:snapPoint', value)
  emit('update:activeSnapPoint', value)
}
</script>

<template>
  <DrawerRoot
    :open="props.open"
    :default-open="props.defaultOpen"
    :modal="props.modal"
    :swipe-direction="swipeDirection"
    :snap-points="props.snapPoints"
    :snap-point="snapPoint"
    :default-snap-point="props.defaultSnapPoint"
    :snap-to-sequential-points="props.snapToSequentialPoints"
    @update:open="onOpenUpdate"
    @update:open-complete="emit('update:openComplete', $event)"
    @update:snap-point="onSnapUpdate"
  >
    <template #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
  </DrawerRoot>
</template>
