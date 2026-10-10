<script setup lang="ts">
/*
 * MessageScroller — the scroll container for a conversation.
 *
 * It owns scroll behaviour only (never message rendering):
 *  - auto-follow: while the reader is within `threshold` px of the bottom, new
 *    messages and streamed growth of the last one keep the log pinned there.
 *    Growth is observed with a ResizeObserver on the content, not timers.
 *  - any upward scroll by the reader stops following (even inside `threshold`)
 *    and reveals the jump-to-latest button, which counts messages appended
 *    while the reader was away. Following resumes on reaching the bottom, or
 *    on a downward move back inside `threshold`.
 *  - `reach-top` fires on scrolling into the top `threshold`, and also when
 *    the history doesn't overflow the viewport at all (no scroll can happen) —
 *    once per first message, so a page that loads nothing can't loop.
 *  - prepend preservation: when older history is inserted above the first
 *    message, scrollTop is shifted by the scrollHeight delta so the viewport
 *    stays on the same message. `overflow-anchor: none` turns off the browser's
 *    own scroll anchoring so the two never double-apply.
 *
 * Messages are found by their `data-message-id` attribute. A jump button is
 * auto-placed unless a <MessageScrollerJumpButton> is put in the default slot.
 */
import { computed, defineComponent, h, onBeforeUnmount, provide, readonly, ref, shallowRef, watch } from 'vue'
import { cn } from '@/lib/utils'
import MessageScrollerJumpButton from './MessageScrollerJumpButton.vue'
import {
  MESSAGE_SCROLLER_AUTO_JUMP_KEY,
  MESSAGE_SCROLLER_KEY,
  distanceFromBottom,
  messageIds,
  scrollViewport,
  type MessageScrollerScrollOptions,
  type MessageScrollerScrollToMessageOptions,
} from './message-scroller-context'

interface MessageScrollerProps {
  class?: string
  /** Marks the log `aria-busy` while a response is streaming. */
  streaming?: boolean
  /** Distance in px from the bottom (and top) that still counts as "at" it. */
  threshold?: number
}

const props = withDefaults(defineProps<MessageScrollerProps>(), {
  streaming: false,
  threshold: 48,
})

const emit = defineEmits<{
  /** Fired once each time the reader scrolls into the top `threshold` — load older history here. */
  reachTop: []
}>()

const viewport = shallowRef<HTMLElement | null>(null)
const content = shallowRef<HTMLElement | null>(null)
// Mirrors "following": false is what shows the jump button.
const atBottom = ref(true)
const unread = ref(0)
const customJumpButtons = ref(0)

let following = true
// Last measured geometry + boundary ids. scrollHeight is only recorded by
// `sync` (the ResizeObserver), never by the scroll handler, so a scroll event
// landing between a prepend and its observation can't hide the delta.
const snap = {
  scrollTop: 0,
  scrollHeight: 0,
  firstId: null as string | null,
  lastId: null as string | null,
  nearTop: true,
  // First message id when reach-top last fired for non-overflowing content.
  reachTopFiredFor: undefined as string | null | undefined,
}

function sync() {
  const vp = viewport.value
  const ct = content.value
  if (!vp || !ct) return
  const ids = messageIds(ct)
  const firstId = ids[0] ?? null
  const lastId = ids[ids.length - 1] ?? null

  // Messages appended after the previously-last one (for the unread badge).
  let appended = 0
  if (snap.lastId !== null && lastId !== snap.lastId) {
    const index = ids.lastIndexOf(snap.lastId)
    if (index !== -1) appended = ids.length - 1 - index
  }
  // History inserted above the previously-first message.
  const prepended = snap.firstId !== null && firstId !== snap.firstId && ids.includes(snap.firstId)

  if (following) {
    vp.scrollTop = vp.scrollHeight
  } else if (prepended) {
    vp.scrollTop = snap.scrollTop + (vp.scrollHeight - snap.scrollHeight)
  }

  if (distanceFromBottom(vp) <= 1) following = true
  if (following) unread.value = 0
  else if (appended > 0) unread.value += appended
  atBottom.value = following

  snap.scrollTop = vp.scrollTop
  snap.scrollHeight = vp.scrollHeight
  snap.firstId = firstId
  snap.lastId = lastId

  // Nothing to scroll means no top-zone transition will ever happen, so ask
  // for more history directly — again only once the first message changed.
  const fits = vp.scrollHeight - vp.clientHeight <= props.threshold
  if (fits && snap.reachTopFiredFor !== firstId) {
    snap.reachTopFiredFor = firstId
    emit('reachTop')
  }
}

function handleScroll() {
  const vp = viewport.value
  if (!vp) return
  const top = vp.scrollTop
  const distance = distanceFromBottom(vp)
  // Our own scrolls never read as upward: sync/prepend anchoring/
  // scrollToBottom only move down and record snap.scrollTop afterwards, and a
  // clamp from shrinking content lands exactly at the bottom.
  if (distance <= 1) following = true
  else if (top < snap.scrollTop - 1) following = false
  else if (distance <= props.threshold) following = true
  if (following) unread.value = 0
  atBottom.value = following
  snap.scrollTop = top

  const nearTop = top <= props.threshold
  if (nearTop && !snap.nearTop) emit('reachTop')
  snap.nearTop = nearTop
}

function scrollToBottom({ behavior = 'smooth' }: MessageScrollerScrollOptions = {}) {
  const vp = viewport.value
  if (!vp) return
  following = true
  unread.value = 0
  atBottom.value = true
  scrollViewport(vp, vp.scrollHeight, behavior)
  snap.scrollTop = vp.scrollTop
}

function scrollToMessage(
  id: string,
  { behavior = 'smooth', block = 'start' }: MessageScrollerScrollToMessageOptions = {}
): boolean {
  const vp = viewport.value
  const ct = content.value
  if (!vp || !ct) return false
  const target = Array.from(ct.querySelectorAll<HTMLElement>('[data-message-id]')).find(
    (node) => node.getAttribute('data-message-id') === id
  )
  if (!target) return false
  const rect = target.getBoundingClientRect()
  let top = rect.top - vp.getBoundingClientRect().top + vp.scrollTop
  if (block === 'center') top -= (vp.clientHeight - rect.height) / 2
  if (block === 'end') top -= vp.clientHeight - rect.height
  const maxTop = Math.max(0, vp.scrollHeight - vp.clientHeight)
  top = Math.min(maxTop, Math.max(0, top))
  following = maxTop - top <= props.threshold
  atBottom.value = following
  scrollViewport(vp, top, behavior)
  snap.scrollTop = vp.scrollTop
  return true
}

function isAtBottom() {
  return viewport.value ? distanceFromBottom(viewport.value) <= props.threshold : true
}

let observer: ResizeObserver | null = null
watch(
  [viewport, content],
  ([vp, ct]) => {
    observer?.disconnect()
    observer = null
    if (!vp || !ct) return
    sync()
    if (typeof ResizeObserver === 'undefined') return
    observer = new ResizeObserver(() => sync())
    observer.observe(ct)
    observer.observe(vp)
  },
  { flush: 'post' }
)
onBeforeUnmount(() => observer?.disconnect())

provide(MESSAGE_SCROLLER_KEY, {
  setViewport: (el) => {
    viewport.value = el
  },
  setContent: (el) => {
    content.value = el
  },
  handleScroll,
  jumpToLatest: () => scrollToBottom({ behavior: 'smooth' }),
  focusViewport: () => viewport.value?.focus({ preventScroll: true }),
  registerJumpButton: (delta) => {
    customJumpButtons.value += delta
  },
  atBottom: readonly(atBottom),
  unread: readonly(unread),
  streaming: computed(() => props.streaming),
})

defineExpose({ scrollToBottom, scrollToMessage, isAtBottom })

// The root's own jump button, marked so it doesn't count as a custom one.
const AutoJumpButton = defineComponent({
  name: 'MessageScrollerAutoJumpButton',
  setup() {
    provide(MESSAGE_SCROLLER_AUTO_JUMP_KEY, true)
    return () => h(MessageScrollerJumpButton)
  },
})
</script>

<template>
  <div
    data-slot="message-scroller"
    :data-at-bottom="atBottom"
    :class="cn('relative flex min-h-0 flex-col', props.class)"
  >
    <slot />
    <AutoJumpButton v-if="customJumpButtons === 0" />
  </div>
</template>
