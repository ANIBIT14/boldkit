<script setup lang="ts">
// Body column of a Message — bubbles, attachments, markers.
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    data-slot="message-content"
    :class="
      cn(
        'flex min-w-0 max-w-[min(85%,42rem)] flex-col items-start gap-2',
        'group-data-[from=user]/message:col-start-1 group-data-[from=assistant]/message:col-start-2',
        'group-data-[from=user]/message:items-end group-data-[from=system]/message:items-center',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
