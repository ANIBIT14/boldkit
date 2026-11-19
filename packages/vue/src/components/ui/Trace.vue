<script setup lang="ts">
/*
 * Trace — the steps an agent takes inside one turn: reasoning, tool calls,
 * sources, plans, subagent runs. Each step is a TraceLine (icon + title +
 * optional description) that can sit alone, inside a link/button, or inside a
 * TraceCollapsibleTrigger to expand into detail — including nested Traces.
 *
 * Status mirrors Marker's `status` variant: the icon box fills with accent
 * and the title shimmers while `running`, fills destructive on `error`, and
 * goes dashed + faded while `pending`.
 */
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="trace"
    :class="
      cn(
        'flex w-full min-w-0 flex-col gap-1.5 text-sm',
        '*:has-[>[data-slot=trace-line]]:flex *:has-[>[data-slot=trace-line]]:w-fit *:has-[>[data-slot=trace-line]]:min-w-0 *:has-[>[data-slot=trace-line]]:max-w-full *:has-[>[data-slot=trace-line]]:text-left',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
