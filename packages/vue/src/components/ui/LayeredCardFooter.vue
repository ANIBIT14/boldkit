<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center border-t-3 border-foreground bg-muted p-4',
        $props.class
      )
    "
  >
    <slot />
  </div>
</template>
