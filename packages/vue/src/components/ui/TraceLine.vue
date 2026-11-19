<script setup lang="ts">
import { computed, provide } from 'vue'
import { cn } from '@/lib/utils'
import { TRACE_LINE_STATUS_KEY, type TraceStatus } from './trace-context'

const props = defineProps<{
  status?: TraceStatus
  class?: string
}>()

provide(
  TRACE_LINE_STATUS_KEY,
  computed(() => props.status)
)
</script>

<template>
  <span
    data-slot="trace-line"
    :data-status="props.status"
    :aria-busy="props.status === 'running' || undefined"
    :class="
      cn(
        'group/trace-line flex w-fit min-w-0 max-w-full items-center gap-2 font-bold text-muted-foreground transition-colors duration-150',
        'in-[a,button]:cursor-pointer in-[a:hover,button:hover]:text-foreground',
        'data-[status=running]:text-foreground data-[status=error]:text-destructive data-[status=pending]:opacity-60',
        props.class
      )
    "
  >
    <slot />
  </span>
</template>
