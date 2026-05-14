import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/checkbox.tsx?raw'
import vueSourceCode from '@vue-ui/Checkbox.vue?raw'



const vueUsageCode = `<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@/components/ui'
import { Label } from '@/components/ui'

const checked = ref(false)
</script>

<template>
  <div class="flex items-center space-x-2">
    <Checkbox id="terms" v-model:checked="checked" />
    <Label for="terms">Accept terms</Label>
  </div>
</template>`

const usageCode = `import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function Example() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}`

export function CheckboxDoc() {
  const [checked, setChecked] = useState(false)

  return (
    <>
      <ComponentDoc
        name="Checkbox"
        description="The BoldKit Checkbox is a neubrutalism-styled form input built on Radix UI Checkbox, with a thick 3px border and a bold check icon for clear visual feedback. It supports controlled and uncontrolled usage, the indeterminate state for tri-state selection, and is fully keyboard and screen-reader accessible. Pair it with the Label component for properly associated, accessible form controls."
        dependencies={['@radix-ui/react-checkbox']}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueDependencies={['reka-ui']}
        vueSourceCode={vueSourceCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="flex items-center space-x-2">
          <Checkbox id="preview-terms" />
          <Label htmlFor="preview-terms">Accept terms and conditions</Label>
        </div>
      </ComponentDoc>

      {/* Basic */}
      <ExampleSection
        title="Basic"
        description="A simple checkbox with a label."
        code={`<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`}
        vueCode={`<template>
  <div class="flex items-center space-x-2">
    <Checkbox id="terms" />
    <Label for="terms">Accept terms and conditions</Label>
  </div>
</template>`}
      >
        <div className="flex items-center space-x-2">
          <Checkbox id="basic-terms" />
          <Label htmlFor="basic-terms">Accept terms and conditions</Label>
        </div>
      </ExampleSection>

      {/* Controlled */}
      <ExampleSection
        title="Controlled"
        description="Control the checkbox state programmatically."
        code={`const [checked, setChecked] = useState(false)

<div className="flex items-center space-x-2">
  <Checkbox
    id="controlled"
    checked={checked}
    onCheckedChange={setChecked}
  />
  <Label htmlFor="controlled">
    {checked ? 'Checked' : 'Unchecked'}
  </Label>
</div>`}
        vueCode={`<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <div class="flex items-center space-x-2">
    <Checkbox
      id="controlled"
      v-model:checked="checked"
    />
    <Label for="controlled">
      {{ checked ? 'Checked' : 'Unchecked' }}
    </Label>
  </div>
</template>`}
      >
        <div className="flex items-center space-x-2">
          <Checkbox
            id="controlled"
            checked={checked}
            onCheckedChange={(value) => setChecked(value as boolean)}
          />
          <Label htmlFor="controlled">
            {checked ? 'Checked' : 'Unchecked'}
          </Label>
        </div>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        description="Disable the checkbox to prevent interaction."
        code={`<div className="flex items-center space-x-2">
  <Checkbox id="disabled" disabled />
  <Label htmlFor="disabled" className="opacity-50">Disabled checkbox</Label>
</div>
<div className="flex items-center space-x-2">
  <Checkbox id="disabled-checked" disabled checked />
  <Label htmlFor="disabled-checked" className="opacity-50">Disabled checked</Label>
</div>`}
        vueCode={`<template>
  <div class="flex items-center space-x-2">
    <Checkbox id="disabled" disabled />
    <Label for="disabled" class="opacity-50">Disabled checkbox</Label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox id="disabled-checked" disabled :checked="true" />
    <Label for="disabled-checked" class="opacity-50">Disabled checked</Label>
  </div>
</template>`}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled" disabled />
            <Label htmlFor="disabled" className="opacity-50">Disabled checkbox</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled-checked" disabled checked />
            <Label htmlFor="disabled-checked" className="opacity-50">Disabled checked</Label>
          </div>
        </div>
      </ExampleSection>

      {/* Multiple Checkboxes */}
      <ExampleSection
        title="Checkbox Group"
        description="Group multiple checkboxes together for related options."
        code={`<div className="space-y-3">
  <div className="flex items-center space-x-2">
    <Checkbox id="option1" />
    <Label htmlFor="option1">Email notifications</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="option2" />
    <Label htmlFor="option2">SMS notifications</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="option3" />
    <Label htmlFor="option3">Push notifications</Label>
  </div>
</div>`}
      >
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="option1" />
            <Label htmlFor="option1">Email notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="option2" />
            <Label htmlFor="option2">SMS notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="option3" />
            <Label htmlFor="option3">Push notifications</Label>
          </div>
        </div>
      </ExampleSection>

      {/* With Description */}
      <ExampleSection
        title="With Description"
        description="Add additional description text below the label."
        code={`<div className="flex items-start space-x-2">
  <Checkbox id="marketing" className="mt-1" />
  <div className="grid gap-1.5 leading-none">
    <Label htmlFor="marketing">Marketing emails</Label>
    <p className="text-sm text-muted-foreground">
      Receive emails about new products, features, and more.
    </p>
  </div>
</div>`}
      >
        <div className="flex items-start space-x-2">
          <Checkbox id="marketing" className="mt-1" />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="marketing">Marketing emails</Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about new products, features, and more.
            </p>
          </div>
        </div>
      </ExampleSection>
    </>
  )
}
