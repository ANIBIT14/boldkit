import { BlockDoc } from '@/components/docs/BlockDoc'
import { DashboardLayout } from '@/components/blocks/application/dashboard-layout'

const nav = [{ label: 'Overview', active: true }, { label: 'Reports' }, { label: 'Customers' }, { label: 'Settings' }]
const stats = [
  { label: 'Revenue', value: '$45K', trend: '+20% MoM' },
  { label: 'Active users', value: '2,340', trend: '+8%' },
  { label: 'Churn', value: '1.2%', trend: '-0.3%' },
]

const variants = [
  {
    name: 'Default',
    description: 'Sidebar + stat cards + chart + data table.',
    preview: <DashboardLayout title="Overview" nav={nav} stats={stats} />,
    reactCode: `import { DashboardLayout } from '@/components/blocks/application'

<DashboardLayout
  title="Overview"
  nav={[{ label: 'Home', active: true }, { label: 'Reports' }, { label: 'Settings' }]}
  stats={[
    { label: 'Revenue', value: '$45K', trend: '+20%' },
    { label: 'Users', value: '2,340', trend: '+8%' },
    { label: 'Churn', value: '1.2%', trend: '-0.3%' },
  ]}
/>`,
    vueCode: `<script setup lang="ts">
import { DashboardLayout } from '@/components/blocks/application'
const nav = [{ label: 'Home', active: true }, { label: 'Reports' }]
const stats = [{ label: 'Revenue', value: '$45K', trend: '+20%' }]
</script>

<template>
  <DashboardLayout title="Overview" :nav="nav" :stats="stats" />
</template>`,
  },
]

export function DashboardLayoutDoc() {
  return (
    <BlockDoc
      name="Dashboard Layout"
      description="Application shell with sidebar, stat-card row, a chart, and a data-table."
      category="application"
      variants={variants}
      sourcePaths={{
        react: 'src/components/blocks/application/dashboard-layout.tsx',
        vue: 'packages/vue/src/components/blocks/application/DashboardLayout.vue',
      }}
    />
  )
}

export default DashboardLayoutDoc
