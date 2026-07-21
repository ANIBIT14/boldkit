<script setup lang="ts">
import { cn } from '@/lib/utils'

export interface DashboardNavItem {
  label: string
  active?: boolean
}

export interface DashboardStat {
  label: string
  value: string
  trend?: string
}

interface DashboardLayoutProps {
  title?: string
  nav: DashboardNavItem[]
  stats: DashboardStat[]
  class?: string
}

withDefaults(defineProps<DashboardLayoutProps>(), {
  title: 'Dashboard',
})

const demoBars = [60, 85, 45, 95, 70, 55, 80]
const tableRows = [
  ['Ada L.', 'Pro', 'Active'],
  ['Alan T.', 'Team', 'Active'],
  ['Grace H.', 'Free', 'Trial'],
]
</script>

<template>
  <section
    :class="cn(
      'flex min-h-[560px] border-3 border-foreground shadow-[6px_6px_0px_hsl(var(--shadow-color))] bg-background',
      $props.class
    )"
  >
    <aside
      class="hidden w-56 shrink-0 flex-col border-r-3 border-foreground bg-card p-4 md:flex"
    >
      <div class="mb-6 text-lg font-black uppercase tracking-tight">BoldKit</div>
      <nav class="space-y-1">
        <button
          v-for="item in nav"
          :key="item.label"
          :class="cn(
            'w-full border-2 border-transparent px-3 py-2 text-left text-sm font-bold uppercase tracking-wide transition',
            item.active
              ? 'border-foreground bg-primary text-primary-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))]'
              : 'hover:border-foreground hover:bg-muted'
          )"
        >
          {{ item.label }}
        </button>
      </nav>
    </aside>

    <div class="flex-1 p-6 space-y-6">
      <header class="flex items-center justify-between">
        <h2 class="text-2xl font-black uppercase tracking-tight">{{ title }}</h2>
        <div
          class="h-9 w-9 border-3 border-foreground bg-accent shadow-[2px_2px_0px_hsl(var(--shadow-color))]"
        />
      </header>

      <div class="grid gap-4 sm:grid-cols-3">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="border-3 border-foreground bg-card p-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))]"
        >
          <div class="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            {{ stat.label }}
          </div>
          <div class="mt-1 text-3xl font-black">{{ stat.value }}</div>
          <div v-if="stat.trend" class="mt-1 text-xs font-bold text-success">{{ stat.trend }}</div>
        </div>
      </div>

      <slot>
        <div
          class="border-3 border-foreground bg-card p-5 shadow-[4px_4px_0px_hsl(var(--shadow-color))]"
        >
          <div class="mb-4 text-sm font-black uppercase tracking-wide">Weekly activity</div>
          <div class="flex h-40 items-end gap-3">
            <div
              v-for="(h, i) in demoBars"
              :key="i"
              class="flex-1 border-2 border-foreground bg-primary"
              :style="{ height: `${h}%` }"
            />
          </div>
        </div>

        <div
          class="overflow-hidden border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]"
        >
          <table class="w-full border-collapse">
            <thead>
              <tr class="border-b-3 border-foreground bg-muted">
                <th
                  v-for="h in ['User', 'Plan', 'Status']"
                  :key="h"
                  class="p-3 text-left text-xs font-black uppercase tracking-wide"
                >
                  {{ h }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in tableRows"
                :key="row[0]"
                class="border-b-2 border-foreground last:border-b-0"
              >
                <td v-for="cell in row" :key="cell" class="p-3 text-sm font-medium">{{ cell }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </slot>
    </div>
  </section>
</template>
