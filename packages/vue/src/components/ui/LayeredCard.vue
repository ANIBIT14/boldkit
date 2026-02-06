<script setup lang="ts">
import { computed } from 'vue'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { layeredCardVariants } from './layered-card-variants'

type LayeredCardVariants = VariantProps<typeof layeredCardVariants>

interface Props {
  class?: string
  layers?: LayeredCardVariants['layers']
  offset?: LayeredCardVariants['offset']
  layerColor?: LayeredCardVariants['layerColor']
  interactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  layers: 'double',
  offset: 'default',
  layerColor: 'default',
  interactive: false,
})

const offsetSizes = {
  sm: 6,
  default: 8,
  lg: 12,
}

const colorClasses = {
  default: 'bg-muted',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  muted: 'bg-muted',
}

const offsetPx = computed(() => offsetSizes[props.offset || 'default'])
const layerCount = computed(() => props.layers === 'single' ? 1 : props.layers === 'triple' ? 3 : 2)
const layerBg = computed(() => colorClasses[props.layerColor || 'default'])
</script>

<template>
  <div
    :class="cn(layeredCardVariants({ layers: props.layers, offset: props.offset, layerColor: props.layerColor }), props.class)"
  >
    <!-- Layer 3 (furthest back) -->
    <div
      v-if="layerCount >= 3"
      :class="cn('absolute inset-0 border-3 border-foreground', layerBg, 'opacity-50')"
      :style="{ transform: `translate(${offsetPx * 3}px, ${offsetPx * 3}px)` }"
    />

    <!-- Layer 2 -->
    <div
      v-if="layerCount >= 2"
      :class="cn('absolute inset-0 border-3 border-foreground', layerBg, 'opacity-70')"
      :style="{ transform: `translate(${offsetPx * 2}px, ${offsetPx * 2}px)` }"
    />

    <!-- Layer 1 -->
    <div
      v-if="layerCount >= 1"
      :class="cn('absolute inset-0 border-3 border-foreground', layerBg)"
      :style="{ transform: `translate(${offsetPx}px, ${offsetPx}px)` }"
    />

    <!-- Main card (top layer) -->
    <div
      :class="
        cn(
          'relative border-3 border-foreground bg-card text-card-foreground',
          interactive && 'cursor-pointer transition-transform duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px]'
        )
      "
    >
      <slot />
    </div>
  </div>
</template>
