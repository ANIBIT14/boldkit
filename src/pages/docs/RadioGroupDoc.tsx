import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/radio-group.tsx?raw'
import vueSourceCode from '@vue-ui/RadioGroup.vue?raw'


const usageCode = `import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export default function Example() {
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  )
}`


const vueUsageCode = `<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, RadioGroupItem } from '@/components/ui'
import { Label } from '@/components/ui'

const value = ref('option-one')
</script>

<template>
  <RadioGroup v-model="value">
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="option-one" id="option-one" />
      <Label for="option-one">Option One</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="option-two" id="option-two" />
      <Label for="option-two">Option Two</Label>
    </div>
  </RadioGroup>
</template>`

export function RadioGroupDoc() {
  const [value, setValue] = useState('comfortable')

  return (
    <>
      <ComponentDoc
        name="Radio Group"
        description="A set of checkable buttons where only one can be checked at a time with bold neubrutalism styling."
        registryName="radio-group"
        dependencies={['@radix-ui/react-radio-group']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Compact</Label>
          </div>
        </RadioGroup>
      </ComponentDoc>

      {/* Basic */}
      <ExampleSection
        title="Basic"
        description="A simple radio group with options."
        code={`<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>`}
        vueCode={`<template>
  <RadioGroup default-value="option-one">
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="option-one" id="option-one" />
      <Label for="option-one">Option One</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="option-two" id="option-two" />
      <Label for="option-two">Option Two</Label>
    </div>
  </RadioGroup>
</template>`}
      >
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="basic-one" />
            <Label htmlFor="basic-one">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="basic-two" />
            <Label htmlFor="basic-two">Option Two</Label>
          </div>
        </RadioGroup>
      </ExampleSection>

      {/* Controlled */}
      <ExampleSection
        title="Controlled"
        description="Control the selected value programmatically."
        code={`const [value, setValue] = useState('comfortable')

<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="controlled-1" />
    <Label htmlFor="controlled-1">Default</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="controlled-2" />
    <Label htmlFor="controlled-2">Comfortable</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="compact" id="controlled-3" />
    <Label htmlFor="controlled-3">Compact</Label>
  </div>
</RadioGroup>

<p>Selected: {value}</p>`}
        vueCode={`<script setup>
import { ref } from 'vue'
const value = ref('comfortable')
</script>

<template>
  <RadioGroup v-model="value">
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="default" id="controlled-1" />
      <Label for="controlled-1">Default</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="comfortable" id="controlled-2" />
      <Label for="controlled-2">Comfortable</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="compact" id="controlled-3" />
      <Label for="controlled-3">Compact</Label>
    </div>
  </RadioGroup>
  <p>Selected: {{ value }}</p>
</template>`}
      >
        <div className="space-y-4">
          <RadioGroup value={value} onValueChange={setValue}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="controlled-1" />
              <Label htmlFor="controlled-1">Default</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="controlled-2" />
              <Label htmlFor="controlled-2">Comfortable</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="controlled-3" />
              <Label htmlFor="controlled-3">Compact</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-muted-foreground">Selected: <span className="font-bold text-foreground">{value}</span></p>
        </div>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        description="Disable individual radio items or the entire group."
        code={`<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="disabled-1" />
    <Label htmlFor="disabled-1">Available</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="disabled-2" disabled />
    <Label htmlFor="disabled-2" className="opacity-50">Disabled</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-three" id="disabled-3" />
    <Label htmlFor="disabled-3">Available</Label>
  </div>
</RadioGroup>`}
        vueCode={`<template>
  <RadioGroup default-value="option-one">
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="option-one" id="disabled-1" />
      <Label for="disabled-1">Available</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="option-two" id="disabled-2" disabled />
      <Label for="disabled-2" class="opacity-50">Disabled</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="option-three" id="disabled-3" />
      <Label for="disabled-3">Available</Label>
    </div>
  </RadioGroup>
</template>`}
      >
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="disabled-1" />
            <Label htmlFor="disabled-1">Available</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="disabled-2" disabled />
            <Label htmlFor="disabled-2" className="opacity-50">Disabled</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-three" id="disabled-3" />
            <Label htmlFor="disabled-3">Available</Label>
          </div>
        </RadioGroup>
      </ExampleSection>

      {/* With Descriptions */}
      <ExampleSection
        title="With Descriptions"
        description="Add descriptions to each radio option."
        code={`<RadioGroup defaultValue="card">
  <div className="flex items-start space-x-2">
    <RadioGroupItem value="card" id="card" className="mt-1" />
    <div className="grid gap-1.5 leading-none">
      <Label htmlFor="card">Card</Label>
      <p className="text-sm text-muted-foreground">
        Pay with credit or debit card.
      </p>
    </div>
  </div>
  <div className="flex items-start space-x-2">
    <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
    <div className="grid gap-1.5 leading-none">
      <Label htmlFor="paypal">PayPal</Label>
      <p className="text-sm text-muted-foreground">
        Pay with your PayPal account.
      </p>
    </div>
  </div>
  <div className="flex items-start space-x-2">
    <RadioGroupItem value="bank" id="bank" className="mt-1" />
    <div className="grid gap-1.5 leading-none">
      <Label htmlFor="bank">Bank Transfer</Label>
      <p className="text-sm text-muted-foreground">
        Pay directly from your bank account.
      </p>
    </div>
  </div>
</RadioGroup>`}
        vueCode={`<template>
  <RadioGroup default-value="card">
    <div class="flex items-start space-x-2">
      <RadioGroupItem value="card" id="card" class="mt-1" />
      <div class="grid gap-1.5 leading-none">
        <Label for="card">Card</Label>
        <p class="text-sm text-muted-foreground">
          Pay with credit or debit card.
        </p>
      </div>
    </div>
    <div class="flex items-start space-x-2">
      <RadioGroupItem value="paypal" id="paypal" class="mt-1" />
      <div class="grid gap-1.5 leading-none">
        <Label for="paypal">PayPal</Label>
        <p class="text-sm text-muted-foreground">
          Pay with your PayPal account.
        </p>
      </div>
    </div>
    <div class="flex items-start space-x-2">
      <RadioGroupItem value="bank" id="bank" class="mt-1" />
      <div class="grid gap-1.5 leading-none">
        <Label for="bank">Bank Transfer</Label>
        <p class="text-sm text-muted-foreground">
          Pay directly from your bank account.
        </p>
      </div>
    </div>
  </RadioGroup>
</template>`}
      >
        <RadioGroup defaultValue="card">
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="card" id="card" className="mt-1" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="card">Card</Label>
              <p className="text-sm text-muted-foreground">
                Pay with credit or debit card.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="paypal">PayPal</Label>
              <p className="text-sm text-muted-foreground">
                Pay with your PayPal account.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="bank" id="bank" className="mt-1" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="bank">Bank Transfer</Label>
              <p className="text-sm text-muted-foreground">
                Pay directly from your bank account.
              </p>
            </div>
          </div>
        </RadioGroup>
      </ExampleSection>

      {/* Horizontal Layout */}
      <ExampleSection
        title="Horizontal Layout"
        description="Display radio options in a horizontal row."
        code={`<RadioGroup defaultValue="small" className="flex gap-4">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="small" id="small" />
    <Label htmlFor="small">Small</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="medium" id="medium" />
    <Label htmlFor="medium">Medium</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="large" id="large" />
    <Label htmlFor="large">Large</Label>
  </div>
</RadioGroup>`}
        vueCode={`<template>
  <RadioGroup default-value="small" class="flex gap-4">
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="small" id="small" />
      <Label for="small">Small</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="medium" id="medium" />
      <Label for="medium">Medium</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="large" id="large" />
      <Label for="large">Large</Label>
    </div>
  </RadioGroup>
</template>`}
      >
        <RadioGroup defaultValue="small" className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="small" id="small" />
            <Label htmlFor="small">Small</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="large" id="large" />
            <Label htmlFor="large">Large</Label>
          </div>
        </RadioGroup>
      </ExampleSection>
    </>
  )
}
