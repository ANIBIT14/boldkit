<script setup lang="ts">
import { DialogTitle as DialogTitlePrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <DialogTitlePrimitive
    :class="cn('text-lg font-bold uppercase tracking-wide leading-none', $props.class)"
  >
    <slot />
  </DialogTitlePrimitive>
</template>
