<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import PaginationLink from './PaginationLink.vue'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
  href?: string
}>()
</script>

<template>
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    :href="href"
    :class="cn('gap-1 pr-2.5', $props.class)"
  >
    <span>Next</span>
    <ChevronRight class="h-4 w-4 stroke-[3]" />
  </PaginationLink>
</template>
