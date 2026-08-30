<script setup lang="ts">
import { cn } from '@/lib/utils'
import Kbd from './Kbd.vue'

// Mirrors the variants defined in Kbd.vue, which owns the styling — this
// component only forwards them. Previously a full duplicate `cva()` block was
// kept here purely to derive these two unions, and its class strings could
// silently drift from the ones actually applied.
type KbdVariant = 'default' | 'outline' | 'ghost'
type KbdSize = 'sm' | 'md' | 'lg'

interface KbdComboProps {
  keys: string[]
  separator?: string
  variant?: KbdVariant
  size?: KbdSize
  class?: string
}

const props = withDefaults(defineProps<KbdComboProps>(), {
  separator: '+',
  variant: 'default',
  size: 'md',
})
</script>

<template>
  <div :class="cn('inline-flex items-center gap-1', props.class)">
    <template v-for="(key, index) in keys" :key="index">
      <span v-if="index > 0" class="text-muted-foreground text-xs font-bold">{{ separator }}</span>
      <Kbd :variant="variant" :size="size">{{ key }}</Kbd>
    </template>
  </div>
</template>
