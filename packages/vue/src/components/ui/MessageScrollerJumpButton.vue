<script setup lang="ts">
// Square jump-to-latest button with an unread-count sticker. Rendered only
// while the reader is scrolled away from the bottom. Placing one anywhere in
// the MessageScroller slot replaces the auto-placed default. A consumer
// @click that calls event.preventDefault() cancels the jump.
import { computed, inject, onBeforeUnmount, onMounted } from 'vue'
import { ArrowDown } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { MESSAGE_SCROLLER_AUTO_JUMP_KEY, useMessageScrollerContext } from './message-scroller-context'

const props = defineProps<{
  class?: string
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const ctx = useMessageScrollerContext('MessageScrollerJumpButton')
const isAuto = inject(MESSAGE_SCROLLER_AUTO_JUMP_KEY, false)
if (!isAuto) {
  onMounted(() => ctx.registerJumpButton(1))
  onBeforeUnmount(() => ctx.registerJumpButton(-1))
}

const unread = computed(() => ctx.unread.value)
const count = computed(() => (unread.value > 99 ? '99+' : String(unread.value)))

function onClick(event: MouseEvent) {
  emit('click', event)
  if (event.defaultPrevented) return
  // The button unmounts once following resumes; hand keyboard focus to the
  // log instead of letting it fall to <body>.
  if (document.activeElement === event.currentTarget) ctx.focusViewport()
  ctx.jumpToLatest()
}
</script>

<template>
  <button
    v-if="!ctx.atBottom.value"
    type="button"
    data-slot="message-scroller-jump-button"
    :aria-label="unread > 0 ? `Jump to latest message, ${unread} new` : 'Jump to latest message'"
    :class="
      cn(
        'absolute bottom-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center border-3 border-foreground bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition duration-200 animate-in fade-in-0 slide-in-from-bottom-2 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2',
        props.class
      )
    "
    @click="onClick"
  >
    <slot>
      <ArrowDown class="h-5 w-5" :stroke-width="3" aria-hidden="true" />
    </slot>
    <span
      v-if="unread > 0"
      aria-hidden="true"
      class="absolute -right-3 -top-3 flex h-6 min-w-6 items-center justify-center border-2 border-foreground bg-accent px-1 text-xs font-bold text-accent-foreground"
    >
      {{ count }}
    </span>
  </button>
</template>
