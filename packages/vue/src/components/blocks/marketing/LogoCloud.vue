<script setup lang="ts">
import { cn } from '@/lib/utils'
import Marquee from '@/components/ui/Marquee.vue'
import type { Component } from 'vue'

type LogoCloudVariant = 'grid' | 'marquee' | 'cards' | 'withStats'

interface LogoItem {
  name: string
  logo: string | Component
  url?: string
}

interface StatItem {
  value: string
  label: string
}

interface LogoCloudProps {
  variant?: LogoCloudVariant
  title?: string
  subtitle?: string
  logos: LogoItem[]
  columns?: 3 | 4 | 5 | 6
  speed?: 'slow' | 'normal' | 'fast'
  direction?: 'left' | 'right'
  stats?: StatItem[]
  class?: string
}

const props = withDefaults(defineProps<LogoCloudProps>(), {
  variant: 'grid',
  columns: 5,
  speed: 'normal',
  direction: 'left',
})

const gridCols: Record<number, string> = {
  3: 'grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
  5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-3 md:grid-cols-6',
}
</script>

<template>
  <!-- Grid Variant -->
  <section
    v-if="variant === 'grid'"
    :class="cn('py-12 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-6xl mx-auto">
      <div v-if="title || subtitle" class="text-center mb-8 space-y-2">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-xl md:text-2xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
      </div>

      <div :class="cn('grid gap-8 items-center', gridCols[columns])">
        <template v-for="(logo, index) in logos" :key="index">
          <a
            v-if="logo.url"
            :href="logo.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center h-12 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
          >
            <img
              v-if="typeof logo.logo === 'string'"
              :src="logo.logo"
              :alt="logo.name"
              class="h-full w-auto object-contain"
            />
            <component v-else :is="logo.logo" />
          </a>
          <div
            v-else
            class="flex items-center justify-center h-12 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
          >
            <img
              v-if="typeof logo.logo === 'string'"
              :src="logo.logo"
              :alt="logo.name"
              class="h-full w-auto object-contain"
            />
            <component v-else :is="logo.logo" />
          </div>
        </template>
      </div>
    </div>
  </section>

  <!-- Marquee Variant -->
  <section
    v-else-if="variant === 'marquee'"
    :class="cn('py-12 px-4 md:px-8 lg:px-16 overflow-hidden', props.class)"
  >
    <div class="max-w-7xl mx-auto">
      <p v-if="title" class="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
        {{ title }}
      </p>

      <Marquee class="py-4" :direction="direction" :speed="speed">
        <div
          v-for="(logo, index) in logos"
          :key="index"
          class="mx-8 flex items-center justify-center h-12 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
        >
          <img
            v-if="typeof logo.logo === 'string'"
            :src="logo.logo"
            :alt="logo.name"
            class="h-full w-auto object-contain"
          />
          <component v-else :is="logo.logo" />
        </div>
      </Marquee>
    </div>
  </section>

  <!-- Cards Variant -->
  <section
    v-else-if="variant === 'cards'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16 bg-muted/30', props.class)"
  >
    <div class="max-w-6xl mx-auto">
      <div v-if="title || subtitle" class="text-center mb-10 space-y-2">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-primary">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-2xl md:text-3xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="(logo, index) in logos"
          :key="index"
          class="border-3 border-foreground bg-card p-6 flex items-center justify-center h-24 hover:shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer"
        >
          <img
            v-if="typeof logo.logo === 'string'"
            :src="logo.logo"
            :alt="logo.name"
            class="h-10 w-auto object-contain"
          />
          <component v-else :is="logo.logo" />
        </div>
      </div>
    </div>
  </section>

  <!-- WithStats Variant -->
  <section
    v-else-if="variant === 'withStats'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-6xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-8">
          <h2 v-if="title" class="text-2xl md:text-3xl font-black uppercase tracking-tight">
            {{ title }}
          </h2>

          <div v-if="stats" class="grid grid-cols-2 gap-4">
            <div
              v-for="(stat, index) in stats"
              :key="index"
              class="border-3 border-foreground p-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))]"
            >
              <div class="text-3xl font-black">{{ stat.value }}</div>
              <div class="text-sm text-muted-foreground font-bold uppercase">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-6">
          <div
            v-for="(logo, index) in logos.slice(0, 9)"
            :key="index"
            class="flex items-center justify-center h-16 opacity-70 hover:opacity-100 transition-opacity"
          >
            <img
              v-if="typeof logo.logo === 'string'"
              :src="logo.logo"
              :alt="logo.name"
              class="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all"
            />
            <component v-else :is="logo.logo" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
