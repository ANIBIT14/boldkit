import { BlockDoc } from '@/components/docs/BlockDoc'
import {
  StatsGrid,
  StatsCards,
  StatsSplit,
  StatsInline,
  StatsWithIcons,
} from '@/components/blocks/marketing/stats-section'
import { Users, Download, Star, Globe } from 'lucide-react'

const sampleStats = [
  { value: '10K+', label: 'Active Users' },
  { value: '50+', label: 'Components' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
]

const statsWithTrend = [
  { value: '12,543', label: 'Users', trend: 'up' as const, trendValue: '+12%' },
  { value: '$1.2M', label: 'Revenue', trend: 'up' as const, trendValue: '+8%' },
  { value: '98%', label: 'Satisfaction', trend: 'neutral' as const },
  { value: '4.9', label: 'Rating', trend: 'up' as const, trendValue: '+0.2' },
]

const statsWithIcons = [
  { value: '10K+', label: 'Users', icon: <Users className="h-6 w-6 text-primary-foreground" /> },
  { value: '50K+', label: 'Downloads', icon: <Download className="h-6 w-6 text-secondary-foreground" /> },
  { value: '4.9', label: 'Rating', icon: <Star className="h-6 w-6 text-accent-foreground" /> },
  { value: '120+', label: 'Countries', icon: <Globe className="h-6 w-6 text-success-foreground" /> },
]

const variants = [
  {
    name: 'Grid',
    description: 'Simple statistics grid layout.',
    preview: (
      <StatsGrid stats={sampleStats} columns={4} />
    ),
    reactCode: `import { StatsSection } from '@/components/blocks/marketing'

<StatsSection.Grid
  stats={[
    { value: '10K+', label: 'Active Users' },
    { value: '50+', label: 'Components' },
  ]}
  columns={4} // 2 | 3 | 4
/>`,
    vueCode: `<script setup lang="ts">
import { StatsSection } from '@/components/blocks/marketing'

const stats = [
  { value: '10K+', label: 'Active Users' },
]
</script>

<template>
  <StatsSection variant="grid" :stats="stats" :columns="4" />
</template>`,
  },
  {
    name: 'Cards',
    description: 'Stats displayed in colored cards with trend indicators.',
    preview: (
      <StatsCards
        title="Our Impact"
        subtitle="By the Numbers"
        stats={statsWithTrend}
      />
    ),
    reactCode: `import { StatsSection } from '@/components/blocks/marketing'

<StatsSection.Cards
  title="Our Impact"
  subtitle="By the Numbers"
  stats={[
    { value: '12,543', label: 'Users', trend: 'up', trendValue: '+12%' },
    { value: '98%', label: 'Satisfaction', trend: 'neutral' },
  ]}
/>`,
    vueCode: `<template>
  <StatsSection variant="cards" title="Our Impact" :stats="stats" />
</template>`,
  },
  {
    name: 'Split',
    description: 'Stats alongside descriptive content.',
    preview: (
      <StatsSplit
        title="Trusted by developers worldwide"
        description="BoldKit powers applications for thousands of companies, from startups to enterprises."
        stats={sampleStats}
        contentPosition="left"
      />
    ),
    reactCode: `import { StatsSection } from '@/components/blocks/marketing'

<StatsSection.Split
  title="Trusted by developers worldwide"
  description="BoldKit powers applications for thousands of companies."
  stats={stats}
  contentPosition="left" // or 'right'
/>`,
    vueCode: `<template>
  <StatsSection
    variant="split"
    title="Trusted worldwide"
    :stats="stats"
    content-position="left"
  />
</template>`,
  },
  {
    name: 'Inline',
    description: 'Horizontal inline stats bar.',
    preview: (
      <StatsInline stats={sampleStats} />
    ),
    reactCode: `import { StatsSection } from '@/components/blocks/marketing'

<StatsSection.Inline stats={stats} />`,
    vueCode: `<template>
  <StatsSection variant="inline" :stats="stats" />
</template>`,
  },
  {
    name: 'WithIcons',
    description: 'Stats with icon containers.',
    preview: (
      <StatsWithIcons stats={statsWithIcons} />
    ),
    reactCode: `import { StatsSection } from '@/components/blocks/marketing'
import { Users, Download, Star, Globe } from 'lucide-react'

<StatsSection.WithIcons
  stats={[
    { value: '10K+', label: 'Users', icon: <Users /> },
    { value: '50K+', label: 'Downloads', icon: <Download /> },
  ]}
/>`,
    vueCode: `<script setup lang="ts">
import { StatsSection } from '@/components/blocks/marketing'
import { Users, Download } from 'lucide-vue-next'
</script>

<template>
  <StatsSection variant="withIcons" :stats="stats" />
</template>`,
  },
]

export function StatsSectionDoc() {
  return (
    <BlockDoc
      name="Stats Section"
      description="Display key metrics and statistics with various layouts including grids, cards with trends, split layouts, inline bars, and icon-enhanced displays."
      category="marketing"
      variants={variants}
    />
  )
}

export default StatsSectionDoc
