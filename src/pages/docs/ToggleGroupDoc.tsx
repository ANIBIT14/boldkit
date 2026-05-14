import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from 'lucide-react'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/toggle-group.tsx?raw'
import vueSourceCode from '@vue-ui/ToggleGroup.vue?raw'


const usageCode = `import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

export default function Example() {
  return (
    <ToggleGroup type="single">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}`


const vueUsageCode = `<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@/components/ui'
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-vue-next'
</script>

<template>
  <ToggleGroup type="single">
    <ToggleGroupItem value="left" aria-label="Align left">
      <AlignLeft class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="center" aria-label="Align center">
      <AlignCenter class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="right" aria-label="Align right">
      <AlignRight class="h-4 w-4" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>`

export function ToggleGroupDoc() {
  return (
    <>
      <ComponentDoc
        name="Toggle Group"
        description="A group of toggle buttons where only one or multiple can be selected with bold neubrutalism styling."
        dependencies={['@radix-ui/react-toggle-group']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </ComponentDoc>

      {/* Single Selection */}
      <ExampleSection
        title="Single"
        description="Only one item can be selected at a time."
        code={`<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left" aria-label="Align left">
    <AlignLeft className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">
    <AlignCenter className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">
    <AlignRight className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`}
        vueCode={`<script setup>
import { ref } from 'vue'
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-vue-next'
const value = ref('center')
</script>

<template>
  <ToggleGroup type="single" v-model="value">
    <ToggleGroupItem value="left" aria-label="Align left">
      <AlignLeft class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="center" aria-label="Align center">
      <AlignCenter class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="right" aria-label="Align right">
      <AlignRight class="h-4 w-4" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>`}
      >
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </ExampleSection>

      {/* Multiple Selection */}
      <ExampleSection
        title="Multiple"
        description="Multiple items can be selected at the same time."
        code={`<ToggleGroup type="multiple" defaultValue={['bold']}>
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <Bold className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <Italic className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">
    <Underline className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`}
        vueCode={`<script setup>
import { ref } from 'vue'
import { Bold, Italic, Underline } from 'lucide-vue-next'
const values = ref(['bold'])
</script>

<template>
  <ToggleGroup type="multiple" v-model="values">
    <ToggleGroupItem value="bold" aria-label="Toggle bold">
      <Bold class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="italic" aria-label="Toggle italic">
      <Italic class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="underline" aria-label="Toggle underline">
      <Underline class="h-4 w-4" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>`}
      >
        <ToggleGroup type="multiple" defaultValue={['bold']}>
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </ExampleSection>

      {/* Outline Variant */}
      <ExampleSection
        title="Outline"
        description="Toggle group with outline variant styling."
        code={`<ToggleGroup type="single" variant="outline" defaultValue="left">
  <ToggleGroupItem value="left" aria-label="Align left">
    <AlignLeft className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">
    <AlignCenter className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">
    <AlignRight className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`}
        vueCode={`<script setup>
import { ref } from 'vue'
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-vue-next'
const value = ref('left')
</script>

<template>
  <ToggleGroup type="single" variant="outline" v-model="value">
    <ToggleGroupItem value="left" aria-label="Align left">
      <AlignLeft class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="center" aria-label="Align center">
      <AlignCenter class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="right" aria-label="Align right">
      <AlignRight class="h-4 w-4" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>`}
      >
        <ToggleGroup type="single" variant="outline" defaultValue="left">
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection
        title="Sizes"
        description="Toggle groups in different sizes."
        code={`<ToggleGroup type="single" size="sm">
  ...
</ToggleGroup>

<ToggleGroup type="single" size="default">
  ...
</ToggleGroup>

<ToggleGroup type="single" size="lg">
  ...
</ToggleGroup>`}
        vueCode={`<script setup>
import { ref } from 'vue'
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-vue-next'
const smVal = ref('left')
const mdVal = ref('center')
const lgVal = ref('right')
</script>

<template>
  <div class="flex flex-col gap-4">
    <ToggleGroup type="single" size="sm" v-model="smVal">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft class="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter class="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight class="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup type="single" size="default" v-model="mdVal">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft class="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter class="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight class="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup type="single" size="lg" v-model="lgVal">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft class="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter class="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight class="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>`}
      >
        <div className="flex flex-col gap-4">
          <ToggleGroup type="single" size="sm" defaultValue="left">
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="single" size="default" defaultValue="center">
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="single" size="lg" defaultValue="right">
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        description="A disabled toggle group item."
        code={`<ToggleGroup type="single" defaultValue="left">
  <ToggleGroupItem value="left" aria-label="Align left">
    <AlignLeft className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center" disabled>
    <AlignCenter className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">
    <AlignRight className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`}
        vueCode={`<script setup>
import { ref } from 'vue'
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-vue-next'
const value = ref('left')
</script>

<template>
  <ToggleGroup type="single" v-model="value">
    <ToggleGroupItem value="left" aria-label="Align left">
      <AlignLeft class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="center" aria-label="Align center" disabled>
      <AlignCenter class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="right" aria-label="Align right">
      <AlignRight class="h-4 w-4" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>`}
      >
        <ToggleGroup type="single" defaultValue="left">
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center" disabled>
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </ExampleSection>
    </>
  )
}
