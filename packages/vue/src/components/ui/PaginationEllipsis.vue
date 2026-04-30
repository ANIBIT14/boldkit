<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <span
    role="img"
    aria-label="More pages"
    :class="cn('flex h-9 w-9 items-center justify-center', $props.class)"
  >
    <MoreHorizontal aria-hidden="true" class="h-4 w-4 stroke-[3]" />
  </span>
</template>
