<script setup lang="ts">
/*
 * Bubble — the hard-edged message surface. No tail: the offset shadow does the
 * pointing, falling towards the author's side (right for assistant/start,
 * left for user/end). With `align="auto"` it reads the side from an enclosing
 * <Message> via `group/message`.
 *
 * `collapsedLines` clamps long content with a "Show more" toggle (shown only
 * when the content actually overflows). Pass `@reaction-click` to make the
 * reaction chips toggle buttons.
 */
import { computed, nextTick, onBeforeUnmount, onMounted, onUpdated, ref, useId, watch } from 'vue'
import { cn } from '@/lib/utils'

export interface BubbleReaction {
  emoji: string
  count: number
  /** Accessible name for the emoji, e.g. "thumbs up". Defaults to the emoji. */
  label?: string
  /** The current user reacted with this emoji. */
  active?: boolean
}

interface BubbleProps {
  variant?: 'default' | 'primary' | 'muted' | 'outline'
  /** Which side the shadow falls towards. `auto` follows the enclosing Message. */
  align?: 'auto' | 'start' | 'end'
  /** Clamp the content to this many lines with a "Show more" toggle when it overflows. */
  collapsedLines?: number
  reactions?: BubbleReaction[]
  /** Bound by `@reaction-click`; makes reaction chips toggle buttons. */
  onReactionClick?: (reaction: BubbleReaction, index: number) => void
  class?: string
}

const props = withDefaults(defineProps<BubbleProps>(), {
  variant: 'default',
  align: 'auto',
})

const variantClasses = {
  default: 'bg-card text-card-foreground',
  primary: 'bg-primary text-primary-foreground',
  muted: 'bg-muted text-foreground',
  outline: 'bg-transparent text-foreground',
}
const alignClasses = {
  start: 'shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
  end: 'shadow-[-4px_4px_0px_hsl(var(--shadow-color))]',
  auto: 'shadow-[4px_4px_0px_hsl(var(--shadow-color))] group-data-[from=user]/message:shadow-[-4px_4px_0px_hsl(var(--shadow-color))]',
}

const contentId = `bubble-${useId().replace(/:/g, '')}`
const contentEl = ref<HTMLElement | null>(null)
const expanded = ref(false)
const overflowing = ref(false)
const collapsible = computed(() => props.collapsedLines != null && props.collapsedLines > 0)
const clamped = computed(() => collapsible.value && !expanded.value)

// Only measurable while clamped; once expanded, the toggle must stay so the
// reader can collapse again.
function measure() {
  const el = contentEl.value
  if (el && clamped.value) overflowing.value = el.scrollHeight > el.clientHeight + 1
}

let observer: ResizeObserver | null = null
onMounted(() => {
  measure()
  if (typeof ResizeObserver === 'undefined' || !contentEl.value) return
  observer = new ResizeObserver(measure)
  observer.observe(contentEl.value)
})
onUpdated(measure)
watch(clamped, () => nextTick(measure))
onBeforeUnmount(() => observer?.disconnect())

const contentStyle = computed(() =>
  clamped.value
    ? {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical' as const,
        WebkitLineClamp: String(props.collapsedLines),
      }
    : undefined
)

const chipClass = (active?: boolean) =>
  cn(
    'inline-flex items-center gap-1 border-2 border-foreground px-1.5 py-0.5 text-xs font-bold',
    active ? 'bg-accent text-accent-foreground' : 'bg-background text-foreground'
  )
const reactionLabel = (r: BubbleReaction) => `${r.label ?? r.emoji}: ${r.count}`
</script>

<template>
  <div
    data-slot="bubble"
    :data-variant="props.variant"
    :class="
      cn(
        'w-fit max-w-full border-3 border-foreground px-4 py-3 text-sm leading-relaxed break-words',
        '[&_a]:font-bold [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-2 [&_a:hover]:decoration-4',
        '[&_code]:border-2 [&_code]:border-current [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.9em]',
        variantClasses[props.variant],
        props.variant === 'outline' ? 'shadow-none' : alignClasses[props.align],
        props.class
      )
    "
  >
    <div
      :id="contentId"
      ref="contentEl"
      data-slot="bubble-content"
      :data-state="collapsible ? (expanded ? 'expanded' : 'collapsed') : undefined"
      :class="cn('space-y-2', clamped && 'overflow-hidden')"
      :style="contentStyle"
    >
      <slot />
    </div>

    <button
      v-if="collapsible && (overflowing || expanded)"
      type="button"
      :aria-expanded="expanded"
      :aria-controls="contentId"
      class="mt-2 text-xs font-bold uppercase tracking-wide underline decoration-2 underline-offset-4 hover:decoration-4 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
      @click="expanded = !expanded"
    >
      {{ expanded ? 'Show less' : 'Show more' }}
    </button>

    <ul
      v-if="props.reactions && props.reactions.length > 0"
      aria-label="Reactions"
      class="mt-3 flex flex-wrap gap-1.5"
    >
      <li v-for="(reaction, index) in props.reactions" :key="`${reaction.emoji}-${index}`">
        <button
          v-if="props.onReactionClick"
          type="button"
          :aria-pressed="!!reaction.active"
          :aria-label="reactionLabel(reaction)"
          :class="
            cn(
              chipClass(reaction.active),
              'shadow-[2px_2px_0px_hsl(var(--shadow-color))] transition duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring'
            )
          "
          @click="props.onReactionClick(reaction, index)"
        >
          <span aria-hidden="true">{{ reaction.emoji }}</span>
          <span aria-hidden="true">{{ reaction.count }}</span>
        </button>
        <span v-else :class="chipClass(reaction.active)">
          <span aria-hidden="true">{{ reaction.emoji }}</span>
          <span aria-hidden="true">{{ reaction.count }}</span>
          <span class="sr-only">{{ reactionLabel(reaction) }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>
