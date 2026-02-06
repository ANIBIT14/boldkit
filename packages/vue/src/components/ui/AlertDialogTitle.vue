<script setup lang="ts">
import { AlertDialogTitle as AlertDialogTitlePrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <AlertDialogTitlePrimitive
    :class="cn('text-lg font-bold uppercase tracking-wide', $props.class)"
  >
    <slot />
  </AlertDialogTitlePrimitive>
</template>
