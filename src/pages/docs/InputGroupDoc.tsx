import { Search, Mail } from 'lucide-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/input-group.tsx?raw'
import vueSourceCode from '@vue-ui/InputGroup.vue?raw'

const vueUsageCode = `<script setup lang="ts">
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui'
</script>

<template>
  <InputGroup>
    <InputGroupAddon position="leading">@</InputGroupAddon>
    <InputGroupInput placeholder="username" />
  </InputGroup>
</template>`

const usageCode = `import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

export default function Example() {
  return (
    <InputGroup>
      <InputGroupAddon position="leading">@</InputGroupAddon>
      <InputGroupInput placeholder="username" />
    </InputGroup>
  )
}`

export function InputGroupDoc() {
  return (
    <>
      <ComponentDoc
        name="Input Group"
        description="Joins an input with leading or trailing addons — icons, text, or shortcuts — in a single bordered field."
        registryName="input-group"
        dependencies={['lucide-react']}
        vueDependencies={['lucide-vue-next']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <InputGroup className="max-w-sm">
          <InputGroupAddon position="leading">
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search components..." />
          <InputGroupAddon position="trailing">⌘K</InputGroupAddon>
        </InputGroup>
      </ComponentDoc>

      <ExampleSection
        title="Leading Text"
        description="Use a text addon as a prefix."
        code={`<InputGroup>
  <InputGroupAddon position="leading">https://</InputGroupAddon>
  <InputGroupInput placeholder="boldkit.dev" />
</InputGroup>`}
      >
        <InputGroup className="max-w-sm">
          <InputGroupAddon position="leading">https://</InputGroupAddon>
          <InputGroupInput placeholder="boldkit.dev" />
        </InputGroup>
      </ExampleSection>

      <ExampleSection
        title="Trailing Icon"
        description="Place an icon after the input."
        code={`<InputGroup>
  <InputGroupInput type="email" placeholder="you@example.com" />
  <InputGroupAddon position="trailing">
    <Mail />
  </InputGroupAddon>
</InputGroup>`}
      >
        <InputGroup className="max-w-sm">
          <InputGroupInput type="email" placeholder="you@example.com" />
          <InputGroupAddon position="trailing">
            <Mail />
          </InputGroupAddon>
        </InputGroup>
      </ExampleSection>
    </>
  )
}
