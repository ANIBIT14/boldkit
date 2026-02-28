<script setup lang="ts">
import { cn } from '@/lib/utils'

interface EmptyStateTitleProps {
  class?: string
}

const props = defineProps<EmptyStateTitleProps>()
</script>

<template>
  <h3 :class="cn('text-lg font-bold uppercase tracking-tight', props.class)">
    <slot />
  </h3>
</template>
