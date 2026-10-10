<script setup lang="ts">
/*
 * Message — one conversation row. Layout is a two-column grid (avatar | body);
 * the parts read `from` / `grouped` off the row's data attributes through
 * `group/message` variants, so they need no injection and compose in any order.
 *
 *   user      → avatar on the right, body right-aligned
 *   assistant → avatar on the left, body left-aligned
 *   system    → centred, no avatar
 *
 * `grouped` marks a follow-up from the same author: the header is dropped and
 * the avatar keeps its column width but collapses, so bubbles stay aligned.
 */
import { cn } from '@/lib/utils'

interface MessageProps {
  from?: 'user' | 'assistant' | 'system'
  /** Consecutive message from the same author: hide header, collapse avatar. */
  grouped?: boolean
  class?: string
}

const props = withDefaults(defineProps<MessageProps>(), {
  from: 'assistant',
  grouped: false,
})
</script>

<template>
  <div
    data-slot="message"
    :data-from="props.from"
    :data-grouped="props.grouped"
    :class="
      cn(
        'group/message grid w-full gap-x-3 gap-y-1.5',
        props.from === 'user' && 'grid-cols-[minmax(0,1fr)_auto] justify-items-end',
        props.from === 'assistant' && 'grid-cols-[auto_minmax(0,1fr)] justify-items-start',
        props.from === 'system' && 'grid-cols-1 justify-items-center',
        props.grouped && '-mt-2',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
