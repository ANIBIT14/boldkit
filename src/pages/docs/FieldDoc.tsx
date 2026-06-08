import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/field.tsx?raw'
import vueSourceCode from '@vue-ui/Field.vue?raw'

const vueUsageCode = `<script setup lang="ts">
import { Field, FieldLabel, FieldDescription, Input } from '@/components/ui'
</script>

<template>
  <Field>
    <FieldLabel for="email">Email</FieldLabel>
    <Input id="email" type="email" placeholder="you@example.com" />
    <FieldDescription>We'll never share your email.</FieldDescription>
  </Field>
</template>`

const usageCode = `import {
  Field,
  FieldDescription,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export default function Example() {
  return (
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" placeholder="you@example.com" />
      <FieldDescription>We'll never share your email.</FieldDescription>
    </Field>
  )
}`

export function FieldDoc() {
  return (
    <>
      <ComponentDoc
        name="Field"
        description="A composition layer that pairs a label, control, description and error message into a consistent form field."
        registryName="field"
        dependencies={[]}
        vueDependencies={[]}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <FieldGroup className="w-full max-w-sm">
          <Field>
            <FieldLabel htmlFor="field-email">Email</FieldLabel>
            <Input id="field-email" type="email" placeholder="you@example.com" />
            <FieldDescription>We&apos;ll never share your email.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="field-name">Name</FieldLabel>
            <Input id="field-name" placeholder="Jane Doe" />
          </Field>
        </FieldGroup>
      </ComponentDoc>

      <ExampleSection
        title="With Error"
        description="Render a validation error below the control."
        code={`<Field>
  <FieldLabel htmlFor="username">Username</FieldLabel>
  <Input id="username" defaultValue="ab" />
  <FieldError>Username must be at least 3 characters.</FieldError>
</Field>`}
      >
        <Field className="w-full max-w-sm">
          <FieldLabel htmlFor="field-username">Username</FieldLabel>
          <Input id="field-username" defaultValue="ab" />
          <FieldError>Username must be at least 3 characters.</FieldError>
        </Field>
      </ExampleSection>
    </>
  )
}
