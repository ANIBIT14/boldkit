<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <p
    role="alert"
    :class="cn('text-xs font-bold uppercase tracking-wide text-destructive', props.class)"
  >
    <slot />
  </p>
</template>
