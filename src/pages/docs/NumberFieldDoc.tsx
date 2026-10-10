import { useState } from 'react'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
} from '@/components/ui/number-field'
import { Label } from '@/components/ui/label'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/number-field.tsx?raw'
import vueRootSource from '@vue-ui/NumberField.vue?raw'
import vueContentSource from '@vue-ui/NumberFieldContent.vue?raw'
import vueInputSource from '@vue-ui/NumberFieldInput.vue?raw'
import vueIncrementSource from '@vue-ui/NumberFieldIncrement.vue?raw'
import vueDecrementSource from '@vue-ui/NumberFieldDecrement.vue?raw'

// The Vue version is split across five SFCs (shadcn-vue's part layout); show
// them all so the copied source is complete.
const vueSourceCode = [
  ['NumberField.vue', vueRootSource],
  ['NumberFieldContent.vue', vueContentSource],
  ['NumberFieldInput.vue', vueInputSource],
  ['NumberFieldIncrement.vue', vueIncrementSource],
  ['NumberFieldDecrement.vue', vueDecrementSource],
]
  .map(([file, source]) => `<!-- ${file} -->\n${source}`)
  .join('\n')

const usageCode = `import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import { Label } from '@/components/ui/label'

export default function Example() {
  return (
    <NumberField id="quantity" defaultValue={1} min={0}>
      <Label htmlFor="quantity">Quantity</Label>
      <NumberFieldContent>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldContent>
    </NumberField>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import { ref } from 'vue'
import Label from '@/components/ui/Label.vue'
import NumberField from '@/components/ui/NumberField.vue'
import NumberFieldContent from '@/components/ui/NumberFieldContent.vue'
import NumberFieldDecrement from '@/components/ui/NumberFieldDecrement.vue'
import NumberFieldIncrement from '@/components/ui/NumberFieldIncrement.vue'
import NumberFieldInput from '@/components/ui/NumberFieldInput.vue'

const quantity = ref(1)
</script>

<template>
  <NumberField id="quantity" v-model="quantity" :min="0">
    <Label for="quantity">Quantity</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>`

/** The standard − [input] + layout used by every example below. */
function Parts() {
  return (
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  )
}

export function NumberFieldDoc() {
  const [quantity, setQuantity] = useState<number | undefined>(1)

  return (
    <>
      <ComponentDoc
        name="Number Field"
        registryName="number-field"
        description="A numeric input with − / + stepper buttons, min/max/step, Intl number formatting, and full spinbutton keyboard support (Arrow keys, PageUp/PageDown ×10, Home/End). Submits in native forms via `name`."
        dependencies={['lucide-react']}
        vueDependencies={['reka-ui', '@lucide/vue']}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueSourceCode={vueSourceCode}
        vueUsageCode={vueUsageCode}
      >
        <NumberField id="nf-quantity" defaultValue={1} min={0} className="w-48">
          <Label htmlFor="nf-quantity">Quantity</Label>
          <Parts />
        </NumberField>
      </ComponentDoc>

      {/* Controlled */}
      <ExampleSection
        title="Controlled"
        description="Drive the value from state. onValueChange receives undefined when the field is cleared, and passing that straight back keeps the field controlled. The mouse wheel steps the value while focused (disableWheelChange turns it off), and the − / + buttons repeat while held."
        code={`const [quantity, setQuantity] = useState<number | undefined>(1)

<NumberField value={quantity} onValueChange={setQuantity}>
  <NumberFieldContent>
    <NumberFieldDecrement />
    <NumberFieldInput aria-label="Quantity" />
    <NumberFieldIncrement />
  </NumberFieldContent>
</NumberField>`}
        vueCode={`<script setup>
const quantity = ref(1)
</script>

<template>
  <NumberField v-model="quantity">
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput aria-label="Quantity" />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
  <p>Value: {{ quantity }}</p>
</template>`}
      >
        <div className="space-y-2">
          <NumberField value={quantity} onValueChange={setQuantity} className="w-48">
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput aria-label="Quantity" />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
          <p className="text-sm text-muted-foreground">Value: {String(quantity)}</p>
        </div>
      </ExampleSection>

      {/* Min / max / step */}
      <ExampleSection
        title="Min, Max & Step"
        description="Values snap to the step grid and clamp to the bounds on blur. The buttons disable at each bound; PageUp/PageDown move ten steps."
        code={`<NumberField id="volume" defaultValue={50} min={0} max={100} step={5}>
  <Label htmlFor="volume">Volume</Label>
  <NumberFieldContent>
    <NumberFieldDecrement />
    <NumberFieldInput />
    <NumberFieldIncrement />
  </NumberFieldContent>
</NumberField>`}
        vueCode={`<template>
  <NumberField id="volume" :default-value="50" :min="0" :max="100" :step="5">
    <Label for="volume">Volume</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>`}
      >
        <NumberField id="nf-volume" defaultValue={50} min={0} max={100} step={5} className="w-48">
          <Label htmlFor="nf-volume">Volume</Label>
          <Parts />
        </NumberField>
      </ExampleSection>

      {/* Currency */}
      <ExampleSection
        title="Currency"
        description="formatOptions takes any Intl.NumberFormat options — currency, percent, units. Typed input is parsed back with the same format."
        code={`<NumberField
  id="price"
  defaultValue={19.99}
  min={0}
  step={0.01}
  formatOptions={{ style: 'currency', currency: 'USD' }}
>
  <Label htmlFor="price">Price</Label>
  <NumberFieldContent>
    <NumberFieldDecrement />
    <NumberFieldInput />
    <NumberFieldIncrement />
  </NumberFieldContent>
</NumberField>`}
        vueCode={`<template>
  <NumberField
    id="price"
    :default-value="19.99"
    :min="0"
    :step="0.01"
    :format-options="{ style: 'currency', currency: 'USD' }"
  >
    <Label for="price">Price</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>`}
      >
        <div className="flex flex-wrap gap-6">
          <NumberField
            id="nf-price"
            defaultValue={19.99}
            min={0}
            step={0.01}
            formatOptions={{ style: 'currency', currency: 'USD' }}
            className="w-56"
          >
            <Label htmlFor="nf-price">Price</Label>
            <Parts />
          </NumberField>
          <NumberField
            id="nf-discount"
            defaultValue={0.15}
            min={0}
            max={1}
            step={0.05}
            formatOptions={{ style: 'percent' }}
            className="w-48"
          >
            <Label htmlFor="nf-discount">Discount</Label>
            <Parts />
          </NumberField>
        </div>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        description="Disable the whole field. Use readOnly (Vue: readonly) to keep the value focusable but unchangeable."
        code={`<NumberField defaultValue={3} disabled>
  <NumberFieldContent>
    <NumberFieldDecrement />
    <NumberFieldInput aria-label="Seats" />
    <NumberFieldIncrement />
  </NumberFieldContent>
</NumberField>`}
        vueCode={`<template>
  <NumberField :default-value="3" disabled>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput aria-label="Seats" />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>`}
      >
        <NumberField defaultValue={3} disabled className="w-48">
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput aria-label="Seats" />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
      </ExampleSection>
    </>
  )
}
