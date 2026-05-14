import { Sticker, Stamp, StickyNote } from '@/components/ui/sticker'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/sticker.tsx?raw'
import vueSourceCode from '@vue-ui/Sticker.vue?raw'


const usageCode = `import { Sticker, Stamp } from '@/components/ui/sticker'

export default function Example() {
  return (
    <div className="flex gap-8 items-center">
      <Sticker>New</Sticker>
      <Stamp>Approved</Stamp>
    </div>
  )
}`


const vueUsageCode = `<script setup lang="ts">
import { Sticker, Stamp } from '@/components/ui'
</script>

<template>
  <div class="flex gap-8 items-center">
    <Sticker>New</Sticker>
    <Stamp>Approved</Stamp>
  </div>
</template>`

export function StickerDoc() {
  return (
    <>
      <ComponentDoc
        name="Sticker"
        description="Rotated labels and stamps with tape effect and double borders - neubrutalist decorative elements for emphasis and visual interest."
        dependencies={['class-variance-authority']}
        vueDependencies={['class-variance-authority']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="flex flex-wrap gap-8 items-center">
          <Sticker>New</Sticker>
          <Sticker variant="primary">Hot</Sticker>
          <Sticker variant="secondary">Featured</Sticker>
          <Stamp>Approved</Stamp>
        </div>
      </ComponentDoc>

      {/* Variants */}
      <ExampleSection
        title="Variants"
        description="Different color variants to match your design needs."
        code={`<Sticker variant="default">Default</Sticker>
<Sticker variant="primary">Primary</Sticker>
<Sticker variant="secondary">Secondary</Sticker>
<Sticker variant="destructive">Destructive</Sticker>
<Sticker variant="outline">Outline</Sticker>`}
        vueCode={`<script setup>
import { Sticker } from '@/components/ui'
</script>

<template>
  <div class="flex flex-wrap gap-6 items-center">
    <Sticker variant="default">Default</Sticker>
    <Sticker variant="primary">Primary</Sticker>
    <Sticker variant="secondary">Secondary</Sticker>
    <Sticker variant="destructive">Destructive</Sticker>
    <Sticker variant="outline">Outline</Sticker>
  </div>
</template>`}
      >
        <div className="flex flex-wrap gap-6 items-center">
          <Sticker variant="default">Default</Sticker>
          <Sticker variant="primary">Primary</Sticker>
          <Sticker variant="secondary">Secondary</Sticker>
          <Sticker variant="destructive">Destructive</Sticker>
          <Sticker variant="outline">Outline</Sticker>
        </div>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection
        title="Sizes"
        description="Stickers are available in different sizes."
        code={`<Sticker size="sm">Small</Sticker>
<Sticker size="default">Default</Sticker>
<Sticker size="lg">Large</Sticker>
<Sticker size="xl">Extra Large</Sticker>`}
        vueCode={`<script setup>
import { Sticker } from '@/components/ui'
</script>

<template>
  <div class="flex flex-wrap gap-6 items-center">
    <Sticker size="sm">Small</Sticker>
    <Sticker size="default">Default</Sticker>
    <Sticker size="lg">Large</Sticker>
    <Sticker size="xl">Extra Large</Sticker>
  </div>
</template>`}
      >
        <div className="flex flex-wrap gap-6 items-center">
          <Sticker size="sm">Small</Sticker>
          <Sticker size="default">Default</Sticker>
          <Sticker size="lg">Large</Sticker>
          <Sticker size="xl">Extra Large</Sticker>
        </div>
      </ExampleSection>

      {/* Rotations */}
      <ExampleSection
        title="Rotations"
        description="Control the rotation angle for different effects."
        code={`<Sticker rotation="none">No Rotation</Sticker>
<Sticker rotation="slight">Slight</Sticker>
<Sticker rotation="medium">Medium</Sticker>
<Sticker rotation="heavy">Heavy</Sticker>
<Sticker rotation="slight-right">Right</Sticker>
<Sticker rotation="heavy-right">Heavy Right</Sticker>`}
        vueCode={`<script setup>
import { Sticker } from '@/components/ui'
</script>

<template>
  <div class="flex flex-wrap gap-6 items-center py-4">
    <Sticker rotation="none">No Rotation</Sticker>
    <Sticker rotation="slight">Slight</Sticker>
    <Sticker rotation="medium">Medium</Sticker>
    <Sticker rotation="heavy">Heavy</Sticker>
    <Sticker rotation="slight-right">Right</Sticker>
    <Sticker rotation="heavy-right">Heavy Right</Sticker>
  </div>
</template>`}
      >
        <div className="flex flex-wrap gap-6 items-center py-4">
          <Sticker rotation="none">No Rotation</Sticker>
          <Sticker rotation="slight">Slight</Sticker>
          <Sticker rotation="medium">Medium</Sticker>
          <Sticker rotation="heavy">Heavy</Sticker>
          <Sticker rotation="slight-right">Right</Sticker>
          <Sticker rotation="heavy-right">Heavy Right</Sticker>
        </div>
      </ExampleSection>

      {/* Shadow Styles */}
      <ExampleSection
        title="Shadow Styles"
        description="Different shadow styles for varied depth effects."
        code={`<Sticker shadow="none">No Shadow</Sticker>
<Sticker shadow="default">Default</Sticker>
<Sticker shadow="colored">Colored</Sticker>
<Sticker shadow="double">Double</Sticker>`}
        vueCode={`<script setup>
import { Sticker } from '@/components/ui'
</script>

<template>
  <div class="flex flex-wrap gap-6 items-center py-4">
    <Sticker shadow="none">No Shadow</Sticker>
    <Sticker shadow="default">Default</Sticker>
    <Sticker shadow="colored">Colored</Sticker>
    <Sticker shadow="double">Double</Sticker>
  </div>
</template>`}
      >
        <div className="flex flex-wrap gap-6 items-center py-4">
          <Sticker shadow="none">No Shadow</Sticker>
          <Sticker shadow="default">Default</Sticker>
          <Sticker shadow="colored">Colored</Sticker>
          <Sticker shadow="double">Double</Sticker>
        </div>
      </ExampleSection>

      {/* With Dashed Border */}
      <ExampleSection
        title="Dashed Border"
        description="Add a dashed outline for a hand-cut sticker effect."
        code={`<Sticker dashed>Cut Here</Sticker>
<Sticker dashed variant="primary">Limited</Sticker>
<Sticker dashed variant="destructive">Urgent</Sticker>`}
        vueCode={`<script setup>
import { Sticker } from '@/components/ui'
</script>

<template>
  <div class="flex flex-wrap gap-8 items-center py-4">
    <Sticker dashed>Cut Here</Sticker>
    <Sticker dashed variant="primary">Limited</Sticker>
    <Sticker dashed variant="destructive">Urgent</Sticker>
  </div>
</template>`}
      >
        <div className="flex flex-wrap gap-8 items-center py-4">
          <Sticker dashed>Cut Here</Sticker>
          <Sticker dashed variant="primary">Limited</Sticker>
          <Sticker dashed variant="destructive">Urgent</Sticker>
        </div>
      </ExampleSection>

      {/* With Tape Effect */}
      <ExampleSection
        title="Tape Effect"
        description="Add a decorative tape strip on top."
        code={`<Sticker tape>Note</Sticker>
<Sticker tape variant="outline">Remember</Sticker>
<Sticker tape variant="primary" rotation="medium-right">Important</Sticker>`}
        vueCode={`<script setup>
import { Sticker } from '@/components/ui'
</script>

<template>
  <div class="flex flex-wrap gap-8 items-center py-8">
    <Sticker tape>Note</Sticker>
    <Sticker tape variant="outline">Remember</Sticker>
    <Sticker tape variant="primary" rotation="medium-right">Important</Sticker>
  </div>
</template>`}
      >
        <div className="flex flex-wrap gap-8 items-center py-8">
          <Sticker tape>Note</Sticker>
          <Sticker tape variant="outline">Remember</Sticker>
          <Sticker tape variant="primary" rotation="medium-right">Important</Sticker>
        </div>
      </ExampleSection>

      {/* Interactive */}
      <ExampleSection
        title="Interactive"
        description="Make stickers clickable with hover effects."
        code={`<Sticker interactive>Click Me</Sticker>
<Sticker interactive variant="primary">Press</Sticker>`}
        vueCode={`<script setup>
import { Sticker } from '@/components/ui'
</script>

<template>
  <div class="flex flex-wrap gap-6 items-center">
    <Sticker interactive>Click Me</Sticker>
    <Sticker interactive variant="primary">Press</Sticker>
  </div>
</template>`}
      >
        <div className="flex flex-wrap gap-6 items-center">
          <Sticker interactive>Click Me</Sticker>
          <Sticker interactive variant="primary">Press</Sticker>
        </div>
      </ExampleSection>

      {/* Stamp Component */}
      <ExampleSection
        title="Stamp"
        description="Circular stamp component for approvals and certifications."
        code={`<Stamp>OK</Stamp>
<Stamp variant="secondary">Verified</Stamp>
<Stamp variant="accent">100%</Stamp>
<Stamp variant="destructive" rotation="medium">Rejected</Stamp>`}
        vueCode={`<script setup>
import { Stamp } from '@/components/ui'
</script>

<template>
  <div class="flex flex-wrap gap-8 items-center py-4">
    <Stamp>OK</Stamp>
    <Stamp variant="secondary">Verified</Stamp>
    <Stamp variant="accent">100%</Stamp>
    <Stamp variant="destructive" rotation="medium">Rejected</Stamp>
  </div>
</template>`}
      >
        <div className="flex flex-wrap gap-8 items-center py-4">
          <Stamp>OK</Stamp>
          <Stamp variant="secondary">Verified</Stamp>
          <Stamp variant="accent">100%</Stamp>
          <Stamp variant="destructive" rotation="medium">Rejected</Stamp>
        </div>
      </ExampleSection>

      {/* Stamp Sizes */}
      <ExampleSection
        title="Stamp Sizes"
        description="Different stamp sizes for various use cases."
        code={`<Stamp size="sm">SM</Stamp>
<Stamp size="default">Default</Stamp>
<Stamp size="lg">Large</Stamp>
<Stamp size="xl">Extra Large</Stamp>`}
        vueCode={`<script setup>
import { Stamp } from '@/components/ui'
</script>

<template>
  <div class="flex flex-wrap gap-8 items-center py-4">
    <Stamp size="sm">SM</Stamp>
    <Stamp size="default">OK</Stamp>
    <Stamp size="lg">Large</Stamp>
    <Stamp size="xl">XL</Stamp>
  </div>
</template>`}
      >
        <div className="flex flex-wrap gap-8 items-center py-4">
          <Stamp size="sm">SM</Stamp>
          <Stamp size="default">OK</Stamp>
          <Stamp size="lg">Large</Stamp>
          <Stamp size="xl">XL</Stamp>
        </div>
      </ExampleSection>

      {/* Double Ring Stamp */}
      <ExampleSection
        title="Double Ring Stamp"
        description="Add a double ring effect to stamps for extra emphasis."
        code={`<Stamp doubleRing>Certified</Stamp>
<Stamp doubleRing variant="secondary">Approved</Stamp>`}
        vueCode={`<script setup>
import { Stamp } from '@/components/ui'
</script>

<template>
  <div class="flex flex-wrap gap-8 items-center py-4">
    <Stamp double-ring>Certified</Stamp>
    <Stamp double-ring variant="secondary">Approved</Stamp>
  </div>
</template>`}
      >
        <div className="flex flex-wrap gap-8 items-center py-4">
          <Stamp doubleRing>Certified</Stamp>
          <Stamp doubleRing variant="secondary">Approved</Stamp>
        </div>
      </ExampleSection>

      {/* Sticky Note Component */}
      <ExampleSection
        title="Sticky Note"
        description="Post-it style notes for annotations and reminders."
        code={`<StickyNote>Remember to star the repo!</StickyNote>
<StickyNote variant="pink">Important meeting at 3pm</StickyNote>
<StickyNote variant="blue" pin>Don't forget!</StickyNote>`}
        vueCode={`<script setup>
import { StickyNote } from '@/components/ui'
</script>

<template>
  <div class="flex flex-wrap gap-8 items-start py-8">
    <StickyNote>Remember to star the repo!</StickyNote>
    <StickyNote variant="pink">Important meeting at 3pm</StickyNote>
    <StickyNote variant="blue" pin>Don't forget!</StickyNote>
  </div>
</template>`}
      >
        <div className="flex flex-wrap gap-8 items-start py-8">
          <StickyNote>Remember to star the repo!</StickyNote>
          <StickyNote variant="pink">Important meeting at 3pm</StickyNote>
          <StickyNote variant="blue" pin>Don't forget!</StickyNote>
        </div>
      </ExampleSection>

      {/* Sticky Note Variants */}
      <ExampleSection
        title="Sticky Note Colors"
        description="Different color variants for organizing notes."
        code={`<StickyNote variant="yellow">Yellow</StickyNote>
<StickyNote variant="pink">Pink</StickyNote>
<StickyNote variant="blue">Blue</StickyNote>
<StickyNote variant="green">Green</StickyNote>
<StickyNote variant="purple">Purple</StickyNote>`}
        vueCode={`<script setup>
import { StickyNote } from '@/components/ui'
</script>

<template>
  <div class="flex flex-wrap gap-6 items-start py-4">
    <StickyNote variant="yellow">Yellow note</StickyNote>
    <StickyNote variant="pink">Pink note</StickyNote>
    <StickyNote variant="blue">Blue note</StickyNote>
    <StickyNote variant="green">Green note</StickyNote>
    <StickyNote variant="purple">Purple note</StickyNote>
  </div>
</template>`}
      >
        <div className="flex flex-wrap gap-6 items-start py-4">
          <StickyNote variant="yellow">Yellow note</StickyNote>
          <StickyNote variant="pink">Pink note</StickyNote>
          <StickyNote variant="blue">Blue note</StickyNote>
          <StickyNote variant="green">Green note</StickyNote>
          <StickyNote variant="purple">Purple note</StickyNote>
        </div>
      </ExampleSection>

      {/* Sticky Note with Pin */}
      <ExampleSection
        title="Sticky Note with Pin"
        description="Add a push pin decoration to notes."
        code={`<StickyNote pin>Pinned to board</StickyNote>
<StickyNote pin variant="pink" rotation="right">Todo list</StickyNote>`}
        vueCode={`<script setup>
import { StickyNote } from '@/components/ui'
</script>

<template>
  <div class="flex flex-wrap gap-8 items-start py-8">
    <StickyNote pin>Pinned to board</StickyNote>
    <StickyNote pin variant="pink" rotation="right">Todo list</StickyNote>
    <StickyNote pin variant="green" rotation="tilt-left">Great idea!</StickyNote>
  </div>
</template>`}
      >
        <div className="flex flex-wrap gap-8 items-start py-8">
          <StickyNote pin>Pinned to board</StickyNote>
          <StickyNote pin variant="pink" rotation="right">Todo list</StickyNote>
          <StickyNote pin variant="green" rotation="tilt-left">Great idea!</StickyNote>
        </div>
      </ExampleSection>

      {/* Sticky Note Sizes */}
      <ExampleSection
        title="Sticky Note Sizes"
        description="Different sizes for various content lengths."
        code={`<StickyNote size="sm">Small</StickyNote>
<StickyNote size="default">Default size note</StickyNote>
<StickyNote size="lg">Large note with more space</StickyNote>`}
        vueCode={`<script setup>
import { StickyNote } from '@/components/ui'
</script>

<template>
  <div class="flex flex-wrap gap-6 items-start py-4">
    <StickyNote size="sm">Small</StickyNote>
    <StickyNote size="default">Default size</StickyNote>
    <StickyNote size="lg">Large note</StickyNote>
  </div>
</template>`}
      >
        <div className="flex flex-wrap gap-6 items-start py-4">
          <StickyNote size="sm">Small</StickyNote>
          <StickyNote size="default">Default size</StickyNote>
          <StickyNote size="lg">Large note</StickyNote>
        </div>
      </ExampleSection>
    </>
  )
}
