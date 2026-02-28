<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Component } from 'vue'

type FeatureGridVariant = 'withIcons' | 'withImages' | 'alternating' | 'bento'

interface FeatureItem {
  icon?: Component
  image?: string
  title: string
  description: string
  span?: 'normal' | 'wide' | 'tall'
}

interface FeatureGridProps {
  variant?: FeatureGridVariant
  title?: string
  subtitle?: string
  description?: string
  features: FeatureItem[]
  columns?: 2 | 3 | 4
  class?: string
}

const props = withDefaults(defineProps<FeatureGridProps>(), {
  variant: 'withIcons',
  columns: 3,
})

const featureColors = [
  'bg-primary/10',
  'bg-secondary/10',
  'bg-accent/10',
  'bg-success/10',
  'bg-warning/10',
  'bg-info/10',
]

const iconColors = [
  'bg-primary',
  'bg-secondary',
  'bg-accent',
  'bg-success',
  'bg-warning',
  'bg-info',
]

const gridCols: Record<number, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
}
</script>

<template>
  <!-- WithIcons Variant -->
  <section
    v-if="variant === 'withIcons'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-7xl mx-auto">
      <div v-if="title || subtitle || description" class="text-center mb-12 space-y-4">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-primary">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
        <p v-if="description" class="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
          {{ description }}
        </p>
      </div>

      <div :class="cn('grid gap-6', gridCols[columns])">
        <Card
          v-for="(feature, index) in features"
          :key="index"
          :class="cn(
            'group hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all',
            featureColors[index % 6]
          )"
        >
          <CardHeader>
            <div
              :class="cn(
                'w-14 h-14 flex items-center justify-center border-3 border-foreground mb-4 shadow-[3px_3px_0px_hsl(var(--shadow-color))]',
                iconColors[index % 6]
              )"
            >
              <component v-if="feature.icon" :is="feature.icon" class="h-6 w-6" />
            </div>
            <CardTitle class="uppercase">{{ feature.title }}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription class="text-base">
              {{ feature.description }}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- WithImages Variant -->
  <section
    v-else-if="variant === 'withImages'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-7xl mx-auto">
      <div v-if="title || subtitle" class="text-center mb-12 space-y-4">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-secondary">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(feature, index) in features" :key="index" class="group">
          <div class="border-3 border-foreground overflow-hidden shadow-[6px_6px_0px_hsl(var(--shadow-color))] group-hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all mb-4">
            <img
              v-if="feature.image"
              :src="feature.image"
              :alt="feature.title"
              class="w-full h-48 object-cover"
            />
          </div>
          <h3 class="text-xl font-black uppercase mb-2">{{ feature.title }}</h3>
          <p class="text-muted-foreground font-medium">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Alternating Variant -->
  <section
    v-else-if="variant === 'alternating'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-6xl mx-auto space-y-16">
      <div
        v-for="(feature, index) in features"
        :key="index"
        :class="cn(
          'grid md:grid-cols-2 gap-8 md:gap-12 items-center',
          index % 2 === 1 && 'md:[&>*:first-child]:order-2'
        )"
      >
        <div class="space-y-4">
          <div
            :class="cn(
              'w-16 h-16 flex items-center justify-center border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
              iconColors[index % 6]
            )"
          >
            <component v-if="feature.icon" :is="feature.icon" class="h-7 w-7" />
          </div>
          <h3 class="text-2xl md:text-3xl font-black uppercase">
            {{ feature.title }}
          </h3>
          <p class="text-lg text-muted-foreground font-medium">
            {{ feature.description }}
          </p>
        </div>

        <div class="relative">
          <div class="border-3 border-foreground shadow-[8px_8px_0px_hsl(var(--shadow-color))] overflow-hidden">
            <img
              v-if="feature.image"
              :src="feature.image"
              :alt="feature.title"
              class="w-full h-auto object-cover"
            />
          </div>
          <div
            :class="cn(
              'absolute -bottom-4 w-16 h-16 border-3 border-foreground',
              index % 2 === 1 ? '-left-4' : '-right-4',
              featureColors[index % 6]
            )"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Bento Variant -->
  <section
    v-else-if="variant === 'bento'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-7xl mx-auto">
      <div v-if="title || subtitle" class="text-center mb-12 space-y-4">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-accent-foreground bg-accent inline-block px-3 py-1 border-2 border-foreground">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
        <Card
          v-for="(feature, index) in features"
          :key="index"
          :class="cn(
            'group hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all flex flex-col',
            featureColors[index % 6],
            feature.span === 'wide' && 'md:col-span-2',
            feature.span === 'tall' && 'md:row-span-2'
          )"
        >
          <CardHeader class="flex-1">
            <div
              :class="cn(
                'w-12 h-12 flex items-center justify-center border-3 border-foreground mb-4 shadow-[3px_3px_0px_hsl(var(--shadow-color))]',
                iconColors[index % 6]
              )"
            >
              <component v-if="feature.icon" :is="feature.icon" class="h-5 w-5" />
            </div>
            <CardTitle class="uppercase text-lg">{{ feature.title }}</CardTitle>
            <CardDescription class="text-base">
              {{ feature.description }}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  </section>
</template>
