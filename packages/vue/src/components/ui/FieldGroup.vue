<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('flex flex-col gap-5', props.class)">
    <slot />
  </div>
</template>
