<script setup lang="ts">
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import { ArrowRight, Play, Sparkles, Star, Zap } from 'lucide-vue-next'

type HeroVariant = 'centered' | 'split' | 'withStats' | 'minimal' | 'withVideo'

interface ActionConfig {
  label: string
  href?: string
  onClick?: () => void
}

interface StatItem {
  value: string
  label: string
}

interface HeroSectionProps {
  variant?: HeroVariant
  badge?: string
  title: string
  titleHighlight?: string
  description: string
  primaryAction?: ActionConfig
  secondaryAction?: ActionConfig
  // Split variant
  imageSrc?: string
  imageAlt?: string
  imagePosition?: 'left' | 'right'
  // WithStats variant
  stats?: StatItem[]
  // WithVideo variant
  videoThumbnail?: string
  class?: string
}

const props = withDefaults(defineProps<HeroSectionProps>(), {
  variant: 'centered',
  imagePosition: 'right',
  imageAlt: 'Hero image',
})

const emit = defineEmits<{
  (e: 'playClick'): void
}>()
</script>

<template>
  <!-- Centered Variant -->
  <section
    v-if="variant === 'centered'"
    :class="cn('py-20 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-4xl mx-auto text-center space-y-8">
      <Badge v-if="badge" variant="outline" class="text-sm px-4 py-1">
        <Sparkles class="h-3 w-3 mr-2" />
        {{ badge }}
      </Badge>

      <h1 class="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
        {{ title }}
        <span v-if="titleHighlight" class="bg-primary px-2 text-primary-foreground">
          {{ titleHighlight }}
        </span>
      </h1>

      <p class="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
        {{ description }}
      </p>

      <div v-if="primaryAction || secondaryAction" class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button v-if="primaryAction" size="lg" @click="primaryAction.onClick">
          {{ primaryAction.label }}
          <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
        <Button v-if="secondaryAction" size="lg" variant="outline" @click="secondaryAction.onClick">
          {{ secondaryAction.label }}
        </Button>
      </div>
    </div>
  </section>

  <!-- Split Variant -->
  <section
    v-else-if="variant === 'split'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <div :class="cn('space-y-6', imagePosition === 'right' ? 'order-1' : 'order-2')">
        <h1 class="text-4xl md:text-5xl font-black uppercase tracking-tight">
          {{ title }}
          <span v-if="titleHighlight" class="bg-accent px-2 text-accent-foreground">
            {{ titleHighlight }}
          </span>
        </h1>

        <p class="text-lg text-muted-foreground font-medium">
          {{ description }}
        </p>

        <div v-if="primaryAction || secondaryAction" class="flex flex-col sm:flex-row gap-4">
          <Button v-if="primaryAction" size="lg" @click="primaryAction.onClick">
            {{ primaryAction.label }}
            <ArrowRight class="ml-2 h-4 w-4" />
          </Button>
          <Button v-if="secondaryAction" size="lg" variant="outline" @click="secondaryAction.onClick">
            <Play class="mr-2 h-4 w-4" />
            {{ secondaryAction.label }}
          </Button>
        </div>
      </div>

      <div :class="cn('relative', imagePosition === 'right' ? 'order-2' : 'order-1')">
        <div class="border-3 border-foreground shadow-[8px_8px_0px_hsl(var(--shadow-color))] overflow-hidden">
          <img
            v-if="imageSrc"
            :src="imageSrc"
            :alt="imageAlt"
            class="w-full h-auto object-cover"
          />
        </div>
        <div class="absolute -top-4 -right-4 w-8 h-8 bg-primary border-3 border-foreground" />
        <div class="absolute -bottom-4 -left-4 w-12 h-12 bg-accent border-3 border-foreground" />
      </div>
    </div>
  </section>

  <!-- WithStats Variant -->
  <section
    v-else-if="variant === 'withStats'"
    :class="cn('py-20 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-6xl mx-auto">
      <div class="text-center space-y-6 mb-16">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
          {{ title }}
          <span v-if="titleHighlight" class="bg-secondary px-2 text-secondary-foreground">
            {{ titleHighlight }}
          </span>
        </h1>

        <p class="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
          {{ description }}
        </p>

        <Button v-if="primaryAction" size="lg" @click="primaryAction.onClick">
          {{ primaryAction.label }}
          <Zap class="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div v-if="stats" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="border-3 border-foreground bg-card p-6 text-center shadow-[4px_4px_0px_hsl(var(--shadow-color))]"
        >
          <div class="text-3xl md:text-4xl font-black">{{ stat.value }}</div>
          <div class="text-sm text-muted-foreground font-bold uppercase tracking-wide mt-1">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Minimal Variant -->
  <section
    v-else-if="variant === 'minimal'"
    :class="cn('py-32 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-3xl mx-auto space-y-8">
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none">
        {{ title }}
      </h1>

      <div class="flex flex-col md:flex-row md:items-end gap-8 justify-between">
        <p class="text-lg text-muted-foreground font-medium max-w-md">
          {{ description }}
        </p>

        <Button v-if="primaryAction" size="lg" class="shrink-0" @click="primaryAction.onClick">
          {{ primaryAction.label }}
          <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div class="w-full h-1 bg-foreground" />
    </div>
  </section>

  <!-- WithVideo Variant -->
  <section
    v-else-if="variant === 'withVideo'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-6xl mx-auto space-y-12">
      <div class="text-center space-y-6">
        <Badge v-if="badge" variant="secondary" class="text-sm px-4 py-1">
          <Star class="h-3 w-3 mr-2" />
          {{ badge }}
        </Badge>

        <h1 class="text-4xl md:text-5xl font-black uppercase tracking-tight">
          {{ title }}
          <span v-if="titleHighlight" class="underline decoration-primary decoration-4 underline-offset-4">
            {{ titleHighlight }}
          </span>
        </h1>

        <p class="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
          {{ description }}
        </p>

        <Button v-if="primaryAction" size="lg" @click="primaryAction.onClick">
          {{ primaryAction.label }}
          <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div class="relative group cursor-pointer" @click="emit('playClick')">
        <div class="border-3 border-foreground shadow-[8px_8px_0px_hsl(var(--shadow-color))] overflow-hidden">
          <img
            v-if="videoThumbnail"
            :src="videoThumbnail"
            alt="Video thumbnail"
            class="w-full h-auto object-cover aspect-video"
          />
        </div>
        <div class="absolute inset-0 flex items-center justify-center bg-foreground/20 group-hover:bg-foreground/30 transition-colors">
          <div class="w-20 h-20 bg-primary border-3 border-foreground flex items-center justify-center shadow-[4px_4px_0px_hsl(var(--shadow-color))] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all">
            <Play class="h-8 w-8 fill-current" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
