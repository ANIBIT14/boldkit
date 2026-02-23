<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import Card from './Card.vue'
import CardContent from './CardContent.vue'
import Progress from './Progress.vue'
import { TrendingUp, TrendingDown, Minus } from 'lucide-vue-next'

const statCardVariants = cva(
  'relative overflow-hidden',
  {
    variants: {
      variant: {
        default: '',
        compact: '[&_.stat-content]:p-4',
        large: 'md:col-span-2',
      },
      colorScheme: {
        primary: '[&_.stat-icon]:bg-primary [&_.stat-bg]:bg-primary',
        secondary: '[&_.stat-icon]:bg-secondary [&_.stat-bg]:bg-secondary',
        accent: '[&_.stat-icon]:bg-accent [&_.stat-bg]:bg-accent',
        success: '[&_.stat-icon]:bg-success [&_.stat-bg]:bg-success',
        warning: '[&_.stat-icon]:bg-warning [&_.stat-bg]:bg-warning',
        info: '[&_.stat-icon]:bg-info [&_.stat-bg]:bg-info',
        destructive: '[&_.stat-icon]:bg-destructive [&_.stat-bg]:bg-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
      colorScheme: 'primary',
    },
  }
)

type StatCardVariants = VariantProps<typeof statCardVariants>

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  progress?: { value: number; label?: string }
  comparison?: string
  variant?: StatCardVariants['variant']
  colorScheme?: StatCardVariants['colorScheme']
  /** @deprecated Use colorScheme instead */
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'destructive'
  class?: string
}

const props = withDefaults(defineProps<StatCardProps>(), {
  trend: 'neutral',
  comparison: 'vs last month',
  variant: 'default',
  colorScheme: undefined,
  color: undefined,
})

const resolvedColorScheme = computed(() => props.colorScheme ?? props.color ?? 'primary')

const TrendIcon = computed(() => {
  if (props.trend === 'up') return TrendingUp
  if (props.trend === 'down') return TrendingDown
  return Minus
})

const trendColor = computed(() => {
  if (props.trend === 'up') return 'text-success'
  if (props.trend === 'down') return 'text-destructive'
  return 'text-muted-foreground'
})
</script>

<template>
  <Card :class="cn(statCardVariants({ variant, colorScheme: resolvedColorScheme }), props.class)">
    <!-- Decorative background element -->
    <div class="stat-bg absolute top-0 right-0 w-24 h-24 opacity-20 -translate-y-8 translate-x-8 rotate-12" />

    <CardContent class="stat-content p-6">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-1">
            {{ title }}
          </p>
          <p class="text-3xl font-black">{{ value }}</p>
          <div v-if="change" :class="cn('flex items-center gap-1 mt-2', trendColor)">
            <component :is="TrendIcon" class="h-4 w-4" />
            <span class="text-sm font-bold">{{ change }}</span>
            <span class="text-sm text-muted-foreground">{{ comparison }}</span>
          </div>
        </div>
        <div v-if="$slots.icon" class="stat-icon w-12 h-12 border-3 border-foreground flex items-center justify-center shadow-[3px_3px_0px_hsl(var(--shadow-color))] text-foreground">
          <slot name="icon" />
        </div>
      </div>

      <!-- Progress section for large variant -->
      <div v-if="(variant === 'large' || progress) && progress" class="mt-4 pt-4 border-t-2 border-foreground/10">
        <div class="flex items-center justify-between text-sm mb-2">
          <span class="text-muted-foreground">{{ progress.label || 'Progress' }}</span>
          <span class="font-bold">{{ progress.value }}%</span>
        </div>
        <Progress :model-value="progress.value" class="h-3" />
      </div>
    </CardContent>
  </Card>
</template>
