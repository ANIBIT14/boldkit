<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Check, X } from 'lucide-vue-next'

export interface ComparisonRow {
  feature: string
  values: (string | boolean)[]
}

interface ComparisonTableProps {
  title?: string
  subtitle?: string
  columns: string[]
  rows: ComparisonRow[]
  highlightColumn?: number
  class?: string
}

withDefaults(defineProps<ComparisonTableProps>(), {
  title: 'Compare plans',
})

const isBool = (v: string | boolean): v is boolean => typeof v === 'boolean'
</script>

<template>
  <section :class="cn('py-16 px-4 md:px-8 lg:px-16', $props.class)">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12 space-y-3">
        <h2 class="text-4xl md:text-5xl font-black uppercase tracking-tight">{{ title }}</h2>
        <p v-if="subtitle" class="text-muted-foreground max-w-xl mx-auto">{{ subtitle }}</p>
      </div>
      <div
        class="overflow-x-auto border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]"
      >
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b-3 border-foreground bg-muted">
              <th scope="col" class="p-4 text-left text-sm font-black uppercase tracking-wide">
                Feature
              </th>
              <th
                v-for="(col, i) in columns"
                :key="col"
                scope="col"
                :class="cn(
                  'p-4 text-center text-sm font-black uppercase tracking-wide',
                  i === highlightColumn && 'bg-primary text-primary-foreground'
                )"
              >
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in rows"
              :key="row.feature"
              class="border-b-2 border-foreground last:border-b-0"
            >
              <th scope="row" class="p-4 text-left text-sm font-bold">{{ row.feature }}</th>
              <td
                v-for="(value, i) in row.values"
                :key="i"
                :class="cn('p-4 text-center', i === highlightColumn && 'bg-primary/10')"
              >
                <!--
                  The tick/cross IS the data. lucide marks its icons aria-hidden,
                  so without the sr-only text these cells are read as empty.
                -->
                <template v-if="isBool(value)">
                  <span
                    v-if="value"
                    class="inline-flex h-6 w-6 items-center justify-center border-2 border-foreground bg-success"
                  >
                    <Check class="h-3.5 w-3.5 text-success-foreground" />
                    <span class="sr-only">Included</span>
                  </span>
                  <span
                    v-else
                    class="inline-flex h-6 w-6 items-center justify-center border-2 border-foreground bg-muted"
                  >
                    <X class="h-3.5 w-3.5 text-muted-foreground" />
                    <span class="sr-only">Not included</span>
                  </span>
                </template>
                <span v-else class="text-sm font-bold">{{ value }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
