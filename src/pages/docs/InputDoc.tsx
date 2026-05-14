import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import { Search } from 'lucide-react'
import sourceCode from '@/components/ui/input.tsx?raw'
import vueSourceCode from '@vue-ui/Input.vue?raw'


const usageCode = `import { Input } from '@/components/ui/input'

export default function Example() {
  return <Input type="email" placeholder="Email" />
}`


const vueUsageCode = `<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@/components/ui/input'

const email = ref('')
</script>

<template>
  <Input v-model="email" type="email" placeholder="Email" />
</template>`

export function InputDoc() {
  return (
    <>
      <ComponentDoc
        name="Input"
        description="The BoldKit Input is a neubrutalism-styled text field with a thick 3px border and a hard shadow that snaps to a focus ring on interaction. It supports accessible label association via htmlFor and works in both controlled and uncontrolled modes. Drop it into any form alongside the Label component for a fully accessible, visually bold input experience."
        dependencies={[]}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueDependencies={[]}
        vueSourceCode={vueSourceCode}
        vueUsageCode={vueUsageCode}
      >
        <Input type="email" placeholder="Email" className="max-w-sm" />
      </ComponentDoc>

      {/* Default */}
      <ExampleSection
        title="Default"
        code={`<Input placeholder="Enter your name..." />`}
        vueCode={`<Input placeholder="Enter your name..." />`}
      >
        <Input placeholder="Enter your name..." className="max-w-sm" />
      </ExampleSection>

      {/* With Label */}
      <ExampleSection
        title="With Label"
        description="Pair inputs with labels for better accessibility."
        code={`<div className="grid w-full max-w-sm gap-2">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Enter your email" />
</div>`}
        vueCode={`<div class="grid w-full max-w-sm gap-2">
  <Label for="email">Email</Label>
  <Input type="email" id="email" placeholder="Enter your email" />
</div>`}
      >
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Enter your email" />
        </div>
      </ExampleSection>

      {/* With Button */}
      <ExampleSection
        title="With Button"
        description="Combine inputs with buttons for forms."
        code={`<div className="flex w-full max-w-sm gap-2">
  <Input type="email" placeholder="Email" />
  <Button>Subscribe</Button>
</div>`}
        vueCode={`<div class="flex w-full max-w-sm gap-2">
  <Input type="email" placeholder="Email" />
  <Button>Subscribe</Button>
</div>`}
      >
        <div className="flex w-full max-w-sm gap-2">
          <Input type="email" placeholder="Email" />
          <Button>Subscribe</Button>
        </div>
      </ExampleSection>

      {/* File Input */}
      <ExampleSection
        title="File Input"
        code={`<Input type="file" />`}
        vueCode={`<Input type="file" />`}
      >
        <Input type="file" className="max-w-sm" />
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        code={`<Input disabled placeholder="Disabled input" />`}
        vueCode={`<Input disabled placeholder="Disabled input" />`}
      >
        <Input disabled placeholder="Disabled input" className="max-w-sm" />
      </ExampleSection>

      {/* With Icon */}
      <ExampleSection
        title="With Icon"
        description="Add icons inside inputs using wrapper elements."
        code={`<div className="relative max-w-sm">
  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input placeholder="Search..." className="pl-10" />
</div>`}
        vueCode={`<div class="relative max-w-sm">
  <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input placeholder="Search..." class="pl-10" />
</div>`}
      >
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-10" />
        </div>
      </ExampleSection>
    </>
  )
}
