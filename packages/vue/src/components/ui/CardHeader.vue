<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn('flex flex-col space-y-1.5 p-6 border-b-3 border-foreground', $props.class)"
  >
    <slot />
  </div>
</template>
