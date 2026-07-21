<script setup lang="ts">
import { cn } from '@/lib/utils'

export interface BentoItem {
  title: string
  description?: string
  span?: 'large' | 'tall' | 'wide' | 'normal'
  accent?: 'primary' | 'secondary' | 'accent' | 'card'
}

interface BentoGridProps {
  title?: string
  subtitle?: string
  items: BentoItem[]
  class?: string
}

defineProps<BentoGridProps>()

const spanClass: Record<NonNullable<BentoItem['span']>, string> = {
  large: 'md:col-span-2 md:row-span-2',
  tall: 'md:row-span-2',
  wide: 'md:col-span-2',
  normal: '',
}

const accentClass: Record<NonNullable<BentoItem['accent']>, string> = {
  primary: 'bg-primary/15',
  secondary: 'bg-secondary/15',
  accent: 'bg-accent/15',
  card: 'bg-card',
}
</script>

<template>
  <section :class="cn('py-16 px-4 md:px-8 lg:px-16', $props.class)">
    <div class="max-w-6xl mx-auto">
      <div v-if="title || subtitle" class="text-center mb-12 space-y-3">
        <h2 v-if="title" class="text-4xl md:text-5xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-muted-foreground max-w-xl mx-auto">{{ subtitle }}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(140px,auto)] gap-4">
        <div
          v-for="item in items"
          :key="item.title"
          :class="cn(
            'flex flex-col justify-between border-3 border-foreground p-5 shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_hsl(var(--shadow-color))]',
            spanClass[item.span ?? 'normal'],
            accentClass[item.accent ?? 'card']
          )"
        >
          <div>
            <h3 class="text-lg font-black uppercase tracking-wide">{{ item.title }}</h3>
            <p v-if="item.description" class="mt-1 text-sm text-muted-foreground">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
