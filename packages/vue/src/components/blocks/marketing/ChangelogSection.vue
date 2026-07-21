<script setup lang="ts">
import { cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge.vue'

export type ChangelogTag = 'feature' | 'fix' | 'improvement' | 'breaking'

export interface ChangelogEntry {
  version: string
  date: string
  tag?: ChangelogTag
  title: string
  items: string[]
}

interface ChangelogSectionProps {
  title?: string
  subtitle?: string
  entries: ChangelogEntry[]
  class?: string
}

withDefaults(defineProps<ChangelogSectionProps>(), {
  title: 'Changelog',
})

const tagVariant: Record<ChangelogTag, 'default' | 'secondary' | 'success' | 'destructive'> = {
  feature: 'default',
  improvement: 'secondary',
  fix: 'success',
  breaking: 'destructive',
}
</script>

<template>
  <section :class="cn('py-16 px-4 md:px-8 lg:px-16', $props.class)">
    <div class="max-w-3xl mx-auto">
      <div class="mb-12 space-y-3">
        <h2 class="text-4xl md:text-5xl font-black uppercase tracking-tight">{{ title }}</h2>
        <p v-if="subtitle" class="text-muted-foreground">{{ subtitle }}</p>
      </div>
      <ol class="relative border-l-3 border-foreground pl-8 space-y-10">
        <li v-for="entry in entries" :key="entry.version" class="relative">
          <span
            class="absolute -left-[41px] flex h-5 w-5 items-center justify-center border-3 border-foreground bg-primary shadow-[2px_2px_0px_hsl(var(--shadow-color))]"
          />
          <div class="flex flex-wrap items-center gap-3">
            <span class="text-xl font-black uppercase tracking-wide">{{ entry.version }}</span>
            <Badge v-if="entry.tag" :variant="tagVariant[entry.tag]">{{ entry.tag }}</Badge>
            <span class="text-sm font-bold text-muted-foreground">{{ entry.date }}</span>
          </div>
          <h3 class="mt-2 font-bold">{{ entry.title }}</h3>
          <ul class="mt-2 space-y-1.5">
            <li
              v-for="item in entry.items"
              :key="item"
              class="flex gap-2 text-sm text-muted-foreground"
            >
              <span class="mt-2 h-1.5 w-1.5 shrink-0 bg-foreground" />
              {{ item }}
            </li>
          </ul>
        </li>
      </ol>
    </div>
  </section>
</template>
