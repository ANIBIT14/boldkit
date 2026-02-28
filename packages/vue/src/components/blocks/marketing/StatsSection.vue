<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import type { Component } from 'vue'

type StatsVariant = 'grid' | 'cards' | 'split' | 'inline' | 'withIcons'

interface StatItem {
  value: string
  label: string
  description?: string
  icon?: Component
  trend?: 'up' | 'down'
  trendValue?: string
}

interface StatsSectionProps {
  variant?: StatsVariant
  title?: string
  subtitle?: string
  description?: string
  stats: StatItem[]
  class?: string
}

const props = withDefaults(defineProps<StatsSectionProps>(), {
  variant: 'grid',
})

const statColors = [
  'bg-primary',
  'bg-secondary',
  'bg-accent',
  'bg-success',
  'bg-info',
  'bg-warning',
]
</script>

<template>
  <!-- Grid Variant -->
  <section
    v-if="variant === 'grid'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-6xl mx-auto">
      <div v-if="title || subtitle" class="text-center mb-12 space-y-4">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-primary">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="text-center p-6 border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] bg-card"
        >
          <div class="text-4xl md:text-5xl font-black">{{ stat.value }}</div>
          <div class="text-sm text-muted-foreground font-bold uppercase tracking-wide mt-2">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Cards Variant -->
  <section
    v-else-if="variant === 'cards'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16 bg-muted/30', props.class)"
  >
    <div class="max-w-7xl mx-auto">
      <div v-if="title || subtitle || description" class="text-center mb-12 space-y-4">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-secondary">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
        <p v-if="description" class="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
          {{ description }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          v-for="(stat, index) in stats"
          :key="index"
          class="group hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all"
        >
          <CardContent class="pt-6">
            <div :class="cn('w-3 h-12 mb-4', statColors[index % 6])" />
            <div class="text-4xl font-black mb-2">{{ stat.value }}</div>
            <div class="font-bold uppercase text-sm">{{ stat.label }}</div>
            <p v-if="stat.description" class="text-sm text-muted-foreground mt-2">
              {{ stat.description }}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- Split Variant -->
  <section
    v-else-if="variant === 'split'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-6xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-primary">
            {{ subtitle }}
          </p>
          <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
            {{ title }}
          </h2>
          <p v-if="description" class="text-lg text-muted-foreground font-medium">
            {{ description }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            :class="cn(
              'p-6 border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
              index % 2 === 0 ? 'bg-primary text-primary-foreground' : 'bg-card'
            )"
          >
            <div class="text-3xl md:text-4xl font-black">{{ stat.value }}</div>
            <div class="text-sm font-bold uppercase tracking-wide mt-1 opacity-80">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Inline Variant -->
  <section
    v-else-if="variant === 'inline'"
    :class="cn('py-8 px-4 md:px-8 lg:px-16 border-y-3 border-foreground bg-muted/30', props.class)"
  >
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-wrap justify-center md:justify-between items-center gap-8">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="text-center px-6"
        >
          <div class="text-3xl font-black">{{ stat.value }}</div>
          <div class="text-sm text-muted-foreground font-bold uppercase">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- WithIcons Variant -->
  <section
    v-else-if="variant === 'withIcons'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-7xl mx-auto">
      <div v-if="title || subtitle" class="text-center mb-12 space-y-4">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-accent">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="flex items-start gap-4 p-6 border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] bg-card"
        >
          <div
            v-if="stat.icon"
            :class="cn(
              'w-12 h-12 flex items-center justify-center border-3 border-foreground shrink-0',
              statColors[index % 6]
            )"
          >
            <component :is="stat.icon" class="h-5 w-5" />
          </div>
          <div>
            <div class="text-3xl font-black">{{ stat.value }}</div>
            <div class="text-sm font-bold uppercase">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
