<script setup lang="ts">
import { cn } from '@/lib/utils'
import Label from './Label.vue'

const props = defineProps<{
  class?: string
  for?: string
}>()
</script>

<template>
  <Label :for="props.for" :class="cn('text-xs', props.class)">
    <slot />
  </Label>
</template>
