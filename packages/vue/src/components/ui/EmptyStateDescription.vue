<script setup lang="ts">
import { cn } from '@/lib/utils'

interface EmptyStateDescriptionProps {
  class?: string
}

const props = defineProps<EmptyStateDescriptionProps>()
</script>

<template>
  <p :class="cn('text-sm text-muted-foreground max-w-sm', props.class)">
    <slot />
  </p>
</template>
