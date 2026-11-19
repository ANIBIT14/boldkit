<script setup lang="ts">
import { inject } from 'vue'
import { cn } from '@/lib/utils'
import { TRACE_LINE_STATUS_KEY } from './trace-context'

const props = defineProps<{ class?: string }>()
const status = inject(TRACE_LINE_STATUS_KEY, undefined)
</script>

<template>
  <span
    data-slot="trace-title"
    :class="cn('min-w-0 truncate', status === 'running' && 'bk-shimmer', props.class)"
  >
    <slot />
  </span>
</template>
