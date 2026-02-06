<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <li
    role="presentation"
    aria-hidden="true"
    :class="cn('[&>svg]:h-3.5 [&>svg]:w-3.5', $props.class)"
  >
    <slot>
      <ChevronRight class="stroke-[3]" />
    </slot>
  </li>
</template>
