<script setup lang="ts">
import { computed } from 'vue'
import { ToastProvider } from 'reka-ui'
import ToastStack from './ToastStack.vue'
import { toastManager, type ToastPosition } from './toast'

// Mount once, near the root of your app, then call `toast()` from anywhere.
// Timers pause while the stack is hovered/focused and while the window is blurred;
// swipe toward the nearest screen edge (or press the close button / Escape) to dismiss.

// Non-prop attrs (aria-*, data-*, style, …) go to the viewport, like React's `...props`.
defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** Where the stack sits on screen. */
    position?: ToastPosition
    /** Maximum number of toasts kept open; older ones are dismissed. */
    max?: number
    /** Default auto-dismiss time in ms. */
    duration?: number
    /** Screen-reader label prefixed to every announcement. */
    label?: string
    class?: string
  }>(),
  { position: 'bottom-right', max: 3, duration: 5000, label: 'Notification' }
)

const swipeDirection = computed(() => (props.position.endsWith('left') ? 'left' : 'right'))
</script>

<template>
  <ToastProvider
    :toast-manager="toastManager"
    :duration="props.duration"
    :label="props.label"
    :swipe-direction="swipeDirection"
  >
    <ToastStack v-bind="$attrs" :position="props.position" :max="props.max" :class="props.class" />
  </ToastProvider>
</template>
