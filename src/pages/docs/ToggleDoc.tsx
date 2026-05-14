import { Toggle } from '@/components/ui/toggle'
import { Bold, Italic, Underline } from 'lucide-react'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/toggle.tsx?raw'
import vueSourceCode from '@vue-ui/Toggle.vue?raw'


const usageCode = `import { Toggle } from '@/components/ui/toggle'
import { Bold } from 'lucide-react'

export default function Example() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}`


const vueUsageCode = `<script setup lang="ts">
import { Toggle } from '@/components/ui'
import { Bold } from 'lucide-vue-next'
</script>

<template>
  <Toggle aria-label="Toggle bold">
    <Bold class="h-4 w-4" />
  </Toggle>
</template>`

export function ToggleDoc() {
  return (
    <>
      <ComponentDoc
        name="Toggle"
        description="A two-state button that can be toggled on or off with bold neubrutalism styling."
        dependencies={['@radix-ui/react-toggle', 'class-variance-authority']}
        vueDependencies={['reka-ui', 'class-variance-authority']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <Toggle aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </Toggle>
      </ComponentDoc>

      {/* With Text */}
      <ExampleSection
        title="With Text"
        description="Toggle button with text content."
        code={`<Toggle aria-label="Toggle italic">
  <Italic className="h-4 w-4" />
  Italic
</Toggle>`}
        vueCode={`<script setup>
import { ref } from 'vue'
import { Italic } from 'lucide-vue-next'
const pressed = ref(false)
</script>

<template>
  <Toggle v-model:pressed="pressed" aria-label="Toggle italic">
    <Italic class="h-4 w-4" />
    Italic
  </Toggle>
</template>`}
      >
        <Toggle aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
          Italic
        </Toggle>
      </ExampleSection>

      {/* Outline Variant */}
      <ExampleSection
        title="Outline"
        description="Toggle with outline variant styling."
        code={`<Toggle variant="outline" aria-label="Toggle underline">
  <Underline className="h-4 w-4" />
</Toggle>`}
        vueCode={`<script setup>
import { ref } from 'vue'
import { Underline } from 'lucide-vue-next'
const pressed = ref(false)
</script>

<template>
  <Toggle variant="outline" v-model:pressed="pressed" aria-label="Toggle underline">
    <Underline class="h-4 w-4" />
  </Toggle>
</template>`}
      >
        <Toggle variant="outline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </Toggle>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection
        title="Sizes"
        description="Toggle buttons in different sizes."
        code={`<Toggle size="sm" aria-label="Toggle small">
  <Bold className="h-4 w-4" />
</Toggle>

<Toggle size="default" aria-label="Toggle default">
  <Bold className="h-4 w-4" />
</Toggle>

<Toggle size="lg" aria-label="Toggle large">
  <Bold className="h-4 w-4" />
</Toggle>`}
        vueCode={`<script setup>
import { ref } from 'vue'
import { Bold } from 'lucide-vue-next'
const sm = ref(false)
const md = ref(false)
const lg = ref(false)
</script>

<template>
  <div class="flex items-center gap-4">
    <Toggle size="sm" v-model:pressed="sm" aria-label="Toggle small">
      <Bold class="h-4 w-4" />
    </Toggle>
    <Toggle size="default" v-model:pressed="md" aria-label="Toggle default">
      <Bold class="h-4 w-4" />
    </Toggle>
    <Toggle size="lg" v-model:pressed="lg" aria-label="Toggle large">
      <Bold class="h-4 w-4" />
    </Toggle>
  </div>
</template>`}
      >
        <div className="flex items-center gap-4">
          <Toggle size="sm" aria-label="Toggle small">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle size="default" aria-label="Toggle default">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle size="lg" aria-label="Toggle large">
            <Bold className="h-4 w-4" />
          </Toggle>
        </div>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        description="A disabled toggle that cannot be interacted with."
        code={`<Toggle aria-label="Toggle disabled" disabled>
  <Bold className="h-4 w-4" />
</Toggle>`}
        vueCode={`<script setup>
import { Bold } from 'lucide-vue-next'
</script>

<template>
  <Toggle aria-label="Toggle disabled" disabled>
    <Bold class="h-4 w-4" />
  </Toggle>
</template>`}
      >
        <Toggle aria-label="Toggle disabled" disabled>
          <Bold className="h-4 w-4" />
        </Toggle>
      </ExampleSection>

      {/* Default Pressed */}
      <ExampleSection
        title="Default Pressed"
        description="Toggle that starts in the pressed state."
        code={`<Toggle defaultPressed aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>`}
        vueCode={`<script setup>
import { ref } from 'vue'
import { Bold } from 'lucide-vue-next'
const pressed = ref(true)
</script>

<template>
  <Toggle v-model:pressed="pressed" aria-label="Toggle bold">
    <Bold class="h-4 w-4" />
  </Toggle>
</template>`}
      >
        <Toggle defaultPressed aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </Toggle>
      </ExampleSection>
    </>
  )
}
