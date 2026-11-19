<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="code-block-title"
    :class="
      cn(
        'flex min-w-0 items-center gap-2 truncate text-xs font-bold uppercase tracking-wider [&_svg]:size-3.5 [&_svg]:shrink-0',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
