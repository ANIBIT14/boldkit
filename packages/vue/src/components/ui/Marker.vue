<script setup lang="ts">
/*
 * Marker — inline status rows inside the conversation log:
 *   note      — a system note ("ADA JOINED THE CHAT")
 *   separator — a labeled rule ("TODAY")
 *   status    — live activity ("SEARCHING THE WEB…"); `active` adds the
 *               `.bk-shimmer` text effect while the work is in flight.
 * Pass an icon through the `icon` slot.
 *
 * No live-region role of its own: inside MessageScroller the surrounding
 * role="log" already announces it, and a nested live region double-announces.
 */
import { cn } from '@/lib/utils'

interface MarkerProps {
  variant?: 'note' | 'separator' | 'status'
  /** Streaming / tool activity in progress — shimmers the label. */
  active?: boolean
  class?: string
}

const props = withDefaults(defineProps<MarkerProps>(), {
  variant: 'note',
  active: false,
})
</script>

<template>
  <div
    data-slot="marker"
    :data-variant="props.variant"
    :data-active="props.active"
    :class="
      cn(
        'flex w-full items-center text-xs font-bold uppercase tracking-widest',
        props.variant === 'note' && 'justify-center',
        props.variant === 'separator' && 'gap-3',
        props.variant === 'status' && 'gap-2',
        props.class
      )
    "
  >
    <template v-if="props.variant === 'separator'">
      <span aria-hidden="true" class="h-[3px] flex-1 bg-foreground" />
      <span
        class="inline-flex items-center gap-2 border-3 border-foreground bg-background px-2 py-0.5 shadow-[2px_2px_0px_hsl(var(--shadow-color))]"
      >
        <span v-if="$slots.icon" aria-hidden="true" class="flex shrink-0 items-center [&_svg]:h-4 [&_svg]:w-4">
          <slot name="icon" />
        </span>
        <span data-slot="marker-label" :class="cn(props.active && 'bk-shimmer')"><slot /></span>
      </span>
      <span aria-hidden="true" class="h-[3px] flex-1 bg-foreground" />
    </template>
    <template v-else-if="props.variant === 'status'">
      <span
        v-if="$slots.icon"
        :class="
          cn(
            'flex h-7 w-7 shrink-0 items-center justify-center border-2 border-foreground',
            props.active ? 'bg-accent text-accent-foreground' : 'bg-background'
          )
        "
      >
        <span aria-hidden="true" class="flex shrink-0 items-center [&_svg]:h-4 [&_svg]:w-4">
          <slot name="icon" />
        </span>
      </span>
      <span data-slot="marker-label" :class="cn(props.active && 'bk-shimmer')"><slot /></span>
    </template>
    <span
      v-else
      class="inline-flex items-center gap-2 border-2 border-dashed border-foreground bg-muted px-3 py-1 text-foreground"
    >
      <span v-if="$slots.icon" aria-hidden="true" class="flex shrink-0 items-center [&_svg]:h-4 [&_svg]:w-4">
        <slot name="icon" />
      </span>
      <span data-slot="marker-label" :class="cn(props.active && 'bk-shimmer')"><slot /></span>
    </span>
  </div>
</template>
