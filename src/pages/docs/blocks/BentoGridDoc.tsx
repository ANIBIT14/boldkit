import { BlockDoc } from '@/components/docs/BlockDoc'
import { BentoGrid } from '@/components/blocks/marketing/bento-grid'

const items = [
  { title: 'Lightning fast', description: 'Ships as copy-paste components with zero runtime overhead.', span: 'large' as const, accent: 'primary' as const },
  { title: 'Bold by default', description: 'Neubrutalist styling out of the box.', accent: 'secondary' as const },
  { title: 'Fully typed', description: 'First-class TypeScript.', accent: 'accent' as const },
  { title: 'React + Vue', description: 'Parity across both frameworks.', span: 'wide' as const },
]

const variants = [
  {
    name: 'Default',
    description: 'Asymmetric grid with a large hero cell.',
    preview: <BentoGrid title="Why BoldKit" items={items} />,
    reactCode: `import { BentoGrid } from '@/components/blocks/marketing'

<BentoGrid
  title="Why BoldKit"
  items={[
    { title: 'Fast', description: 'Zero overhead', span: 'large', accent: 'primary' },
    { title: 'Bold', description: 'Neubrutalist', accent: 'secondary' },
    { title: 'Typed', description: 'TypeScript', accent: 'accent' },
    { title: 'React + Vue', description: 'Parity', span: 'wide' },
  ]}
/>`,
    vueCode: `<script setup lang="ts">
import { BentoGrid } from '@/components/blocks/marketing'
const items = [
  { title: 'Fast', description: 'Zero overhead', span: 'large', accent: 'primary' },
  { title: 'Bold', description: 'Neubrutalist', accent: 'secondary' },
]
</script>

<template>
  <BentoGrid title="Why BoldKit" :items="items" />
</template>`,
  },
]

export function BentoGridDoc() {
  return (
    <BlockDoc
      name="Bento Grid"
      description="Asymmetric feature grid with grid-breaking hero cells."
      category="marketing"
      variants={variants}
      sourcePaths={{
        react: 'src/components/blocks/marketing/bento-grid.tsx',
        vue: 'packages/vue/src/components/blocks/marketing/BentoGrid.vue',
      }}
    />
  )
}

export default BentoGridDoc
