import { BlockDoc } from '@/components/docs/BlockDoc'
import { ChangelogSection } from '@/components/blocks/marketing/changelog-section'

const entries = [
  { version: 'v3.4.9', date: '2026-07-21', tag: 'feature' as const, title: 'Blocks, annotations & forms', items: ['5 new blocks', 'Chart annotations', 'Multi-step form primitives'] },
  { version: 'v3.4.8', date: '2026-07-21', tag: 'improvement' as const, title: 'MCP server & CLI', items: ['@boldkit/mcp published', 'boldkit CLI', 'WCAG matrix'] },
  { version: 'v3.4.7', date: '2026-07-18', tag: 'fix' as const, title: 'Audit fixes', items: ['SSR crash fix', 'Theme presets'] },
]

const variants = [
  {
    name: 'Timeline',
    description: 'Dated release entries on a vertical timeline.',
    preview: <ChangelogSection title="Changelog" subtitle="What's new in BoldKit." entries={entries} />,
    reactCode: `import { ChangelogSection } from '@/components/blocks/marketing'

<ChangelogSection
  entries={[
    { version: 'v3.4.9', date: '2026-07-21', tag: 'feature', title: 'Blocks & annotations', items: ['5 new blocks', 'Chart annotations'] },
  ]}
/>`,
    vueCode: `<script setup lang="ts">
import { ChangelogSection } from '@/components/blocks/marketing'
const entries = [
  { version: 'v3.4.9', date: '2026-07-21', tag: 'feature', title: 'Blocks', items: ['5 new blocks'] },
]
</script>

<template>
  <ChangelogSection :entries="entries" />
</template>`,
  },
]

export function ChangelogSectionDoc() {
  return (
    <BlockDoc
      name="Changelog"
      description="Dated release entries / roadmap timeline."
      category="marketing"
      variants={variants}
      sourcePaths={{
        react: 'src/components/blocks/marketing/changelog-section.tsx',
        vue: 'packages/vue/src/components/blocks/marketing/ChangelogSection.vue',
      }}
    />
  )
}

export default ChangelogSectionDoc
