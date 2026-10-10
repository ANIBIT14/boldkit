<script setup lang="ts">
// Actions row under a Message (copy, retry, …).
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    data-slot="message-footer"
    :class="
      cn(
        'flex items-center gap-1.5 pt-1 text-xs',
        'group-data-[from=user]/message:col-start-1 group-data-[from=assistant]/message:col-start-2',
        'group-data-[from=user]/message:flex-row-reverse',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
