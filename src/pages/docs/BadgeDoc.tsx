import { Badge } from '@/components/ui/badge'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/badge.tsx?raw'
import vueSourceCode from '@vue-ui/Badge.vue?raw'


const usageCode = `import { Badge } from '@/components/ui/badge'

export default function Example() {
  return <Badge>Badge</Badge>
}`


const vueUsageCode = `<script setup lang="ts">
import { Badge } from '@/components/ui'
</script>

<template>
  <Badge>Badge</Badge>
</template>`

export function BadgeDoc() {
  return (
    <>
      <ComponentDoc
        name="Badge"
        description="The BoldKit Badge is a compact neubrutalism label element with 5 variants (default, secondary, accent, destructive, outline) for communicating status, category, or count at a glance. It features bold uppercase typography, a 2px border, and a small hard shadow for visual pop. Use it as a status indicator, content tag, or numeric counter alongside other UI elements."
        dependencies={['class-variance-authority']}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueDependencies={['class-variance-authority']}
        vueSourceCode={vueSourceCode}
        vueUsageCode={vueUsageCode}
      >
        <Badge>Badge</Badge>
      </ComponentDoc>

      {/* Variants */}
      <ExampleSection
        title="Variants"
        description="The badge comes with several variants to convey different meanings."
        code={`<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="outline">Outline</Badge>`}
        vueCode={`<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="outline">Outline</Badge>`}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </ExampleSection>

      {/* Status Badges */}
      <ExampleSection
        title="Status Badges"
        description="Use badges to show status information."
        code={`<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Inactive</Badge>
<Badge variant="info">In Progress</Badge>`}
        vueCode={`<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Inactive</Badge>
<Badge variant="info">In Progress</Badge>`}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="destructive">Inactive</Badge>
          <Badge variant="info">In Progress</Badge>
        </div>
      </ExampleSection>

      {/* With Counter */}
      <ExampleSection
        title="With Counter"
        description="Display counts or numbers in badges."
        code={`<Badge>New 5</Badge>
<Badge variant="destructive">Errors 12</Badge>
<Badge variant="secondary">Messages 99+</Badge>`}
        vueCode={`<Badge>New 5</Badge>
<Badge variant="destructive">Errors 12</Badge>
<Badge variant="secondary">Messages 99+</Badge>`}
      >
        <div className="flex flex-wrap gap-2">
          <Badge>New 5</Badge>
          <Badge variant="destructive">Errors 12</Badge>
          <Badge variant="secondary">Messages 99+</Badge>
        </div>
      </ExampleSection>

      {/* Category Badges */}
      <ExampleSection
        title="Category Badges"
        description="Use badges to categorize content."
        code={`<Badge variant="accent">Design</Badge>
<Badge variant="info">Development</Badge>
<Badge variant="secondary">Marketing</Badge>
<Badge variant="outline">Documentation</Badge>`}
        vueCode={`<Badge variant="accent">Design</Badge>
<Badge variant="info">Development</Badge>
<Badge variant="secondary">Marketing</Badge>
<Badge variant="outline">Documentation</Badge>`}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="accent">Design</Badge>
          <Badge variant="info">Development</Badge>
          <Badge variant="secondary">Marketing</Badge>
          <Badge variant="outline">Documentation</Badge>
        </div>
      </ExampleSection>

      {/* In Context */}
      <ExampleSection
        title="In Context"
        description="Badges are often used alongside text or in headers."
        code={`<div className="flex items-center gap-2">
  <h3 className="text-lg font-bold">Features</h3>
  <Badge variant="accent">New</Badge>
</div>
<div className="flex items-center gap-2">
  <span>Component Library</span>
  <Badge variant="success">v1.0</Badge>
</div>`}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold uppercase">Features</h3>
            <Badge variant="accent">New</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Component Library</span>
            <Badge variant="success">v1.0</Badge>
          </div>
        </div>
      </ExampleSection>
    </>
  )
}
