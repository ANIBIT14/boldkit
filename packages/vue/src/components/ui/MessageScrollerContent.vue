<script setup lang="ts">
// The scrolling viewport (role="log") plus the observed list inside it.
// Focusable so keyboard users can scroll it; aria-label is overridable via attrs.
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'
import { useMessageScrollerContext } from './message-scroller-context'

const props = defineProps<{
  class?: string
}>()

const ctx = useMessageScrollerContext('MessageScrollerContent')
const viewportEl = ref<HTMLElement | null>(null)
const listEl = ref<HTMLElement | null>(null)

onMounted(() => {
  ctx.setViewport(viewportEl.value)
  ctx.setContent(listEl.value)
})
onBeforeUnmount(() => {
  ctx.setViewport(null)
  ctx.setContent(null)
})
</script>

<template>
  <div
    ref="viewportEl"
    role="log"
    aria-live="polite"
    aria-label="Conversation"
    tabindex="0"
    data-slot="message-scroller-content"
    :aria-busy="ctx.streaming.value ? 'true' : undefined"
    :class="
      cn(
        'bk-scroll-fade min-h-0 flex-1 overflow-y-auto overscroll-contain [overflow-anchor:none] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring',
        props.class
      )
    "
    @scroll="ctx.handleScroll"
  >
    <div
      ref="listEl"
      data-slot="message-scroller-list"
      class="flex min-h-full flex-col justify-end gap-4 p-4"
    >
      <slot />
    </div>
  </div>
</template>
