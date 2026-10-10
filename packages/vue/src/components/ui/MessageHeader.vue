<script setup lang="ts">
// Author name + timestamp row. Hidden on grouped rows.
import { cn } from '@/lib/utils'

const props = defineProps<{
  /** Author name, rendered bold and uppercase. */
  name?: string
  /** Display timestamp, e.g. "10:42". */
  timestamp?: string
  /** Machine-readable value for the `<time>` element, e.g. an ISO string. */
  dateTime?: string
  class?: string
}>()
</script>

<template>
  <div
    data-slot="message-header"
    :class="
      cn(
        'flex items-baseline gap-2 text-xs',
        'group-data-[from=user]/message:col-start-1 group-data-[from=assistant]/message:col-start-2',
        'group-data-[from=user]/message:flex-row-reverse group-data-[grouped=true]/message:hidden',
        props.class
      )
    "
  >
    <span v-if="props.name != null" class="font-bold uppercase tracking-wide">{{ props.name }}</span>
    <time
      v-if="props.timestamp != null"
      :datetime="props.dateTime"
      class="font-mono text-muted-foreground"
    >{{ props.timestamp }}</time>
    <slot />
  </div>
</template>
