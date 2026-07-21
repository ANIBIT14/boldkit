import { BlockDoc } from '@/components/docs/BlockDoc'
import { ComparisonTable } from '@/components/blocks/marketing/comparison-table'

const columns = ['Free', 'Pro', 'Team']
const rows = [
  { feature: 'Projects', values: ['1', 'Unlimited', 'Unlimited'] },
  { feature: 'Priority support', values: [false, true, true] },
  { feature: 'SSO & SAML', values: [false, false, true] },
  { feature: 'Seats', values: ['1', '5', 'Unlimited'] },
]

const variants = [
  {
    name: 'Highlighted',
    description: 'Feature matrix with an emphasized column.',
    preview: <ComparisonTable title="Compare plans" columns={columns} rows={rows} highlightColumn={1} />,
    reactCode: `import { ComparisonTable } from '@/components/blocks/marketing'

<ComparisonTable
  columns={['Free', 'Pro', 'Team']}
  highlightColumn={1}
  rows={[
    { feature: 'Projects', values: ['1', 'Unlimited', 'Unlimited'] },
    { feature: 'SSO', values: [false, false, true] },
  ]}
/>`,
    vueCode: `<script setup lang="ts">
import { ComparisonTable } from '@/components/blocks/marketing'
const columns = ['Free', 'Pro', 'Team']
const rows = [
  { feature: 'Projects', values: ['1', 'Unlimited', 'Unlimited'] },
  { feature: 'SSO', values: [false, false, true] },
]
</script>

<template>
  <ComparisonTable :columns="columns" :rows="rows" :highlight-column="1" />
</template>`,
  },
]

export function ComparisonTableDoc() {
  return (
    <BlockDoc
      name="Comparison Table"
      description="Feature comparison matrix with check/x cells and a highlighted column."
      category="marketing"
      variants={variants}
      sourcePaths={{
        react: 'src/components/blocks/marketing/comparison-table.tsx',
        vue: 'packages/vue/src/components/blocks/marketing/ComparisonTable.vue',
      }}
    />
  )
}

export default ComparisonTableDoc
