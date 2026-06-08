import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/button-group.tsx?raw'
import vueSourceCode from '@vue-ui/ButtonGroup.vue?raw'

const usageCode = `import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'

export default function Example() {
  return (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import { ButtonGroup, Button } from '@/components/ui'
</script>

<template>
  <ButtonGroup>
    <Button variant="outline">Left</Button>
    <Button variant="outline">Center</Button>
    <Button variant="outline">Right</Button>
  </ButtonGroup>
</template>`

export function ButtonGroupDoc() {
  return (
    <>
      <ComponentDoc
        name="Button Group"
        description="Visually joins a row or column of buttons into a single bordered unit with one hard shadow."
        registryName="button-group"
        dependencies={[]}
        vueDependencies={[]}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <ButtonGroup>
          <Button variant="outline">Left</Button>
          <Button variant="outline">Center</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
      </ComponentDoc>

      <ExampleSection
        title="Vertical"
        description="Stack buttons into a vertical group."
        code={`<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Middle</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>`}
      >
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Top</Button>
          <Button variant="outline">Middle</Button>
          <Button variant="outline">Bottom</Button>
        </ButtonGroup>
      </ExampleSection>
    </>
  )
}
