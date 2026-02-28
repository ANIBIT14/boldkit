<script setup lang="ts">
import { cn } from '@/lib/utils'

interface EmptyStateActionsProps {
  class?: string
}

const props = defineProps<EmptyStateActionsProps>()
</script>

<template>
  <div :class="cn('mt-4 flex flex-wrap gap-2 justify-center', props.class)">
    <slot />
  </div>
</template>
