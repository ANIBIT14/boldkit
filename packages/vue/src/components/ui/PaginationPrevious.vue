<script setup lang="ts">
import { ChevronLeft } from 'lucide-vue-next'
import PaginationLink from './PaginationLink.vue'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
  href?: string
}>()
</script>

<template>
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    :href="href"
    :class="cn('gap-1 pl-2.5', $props.class)"
  >
    <ChevronLeft class="h-4 w-4 stroke-[3]" />
    <span>Previous</span>
  </PaginationLink>
</template>
