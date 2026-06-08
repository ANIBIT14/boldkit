import { NativeSelect } from '@/components/ui/native-select'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/native-select.tsx?raw'
import vueSourceCode from '@vue-ui/NativeSelect.vue?raw'

const vueUsageCode = `<script setup lang="ts">
import { NativeSelect } from '@/components/ui'
import { ref } from 'vue'

const fruit = ref('')
</script>

<template>
  <NativeSelect v-model="fruit">
    <option value="" disabled>Select a fruit</option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
  </NativeSelect>
</template>`

const usageCode = `import { NativeSelect } from '@/components/ui/native-select'

export default function Example() {
  return (
    <NativeSelect defaultValue="">
      <option value="" disabled>Select a fruit</option>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
    </NativeSelect>
  )
}`

export function NativeSelectDoc() {
  return (
    <>
      <ComponentDoc
        name="Native Select"
        description="A styled wrapper around the native select element — lightweight and accessible, for simple option lists that don't need a custom popover."
        registryName="native-select"
        dependencies={['lucide-react']}
        vueDependencies={['lucide-vue-next']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <NativeSelect className="max-w-xs" defaultValue="">
          <option value="" disabled>
            Select a fruit
          </option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </NativeSelect>
      </ComponentDoc>

      <ExampleSection
        title="Disabled"
        description="Disable the entire control."
        code={`<NativeSelect disabled defaultValue="apple">
  <option value="apple">Apple</option>
</NativeSelect>`}
      >
        <NativeSelect className="max-w-xs" disabled defaultValue="apple">
          <option value="apple">Apple</option>
        </NativeSelect>
      </ExampleSection>
    </>
  )
}
