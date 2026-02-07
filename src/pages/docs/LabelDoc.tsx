import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const labelVariants = cva(
  'text-sm font-bold uppercase tracking-wide leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }`

const usageCode = `import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function Example() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}`

const vueSourceCode = `<script setup lang="ts">
import { Label as LabelPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <LabelPrimitive
    :class="cn('text-sm font-bold uppercase tracking-wide leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', props.class)"
  >
    <slot />
  </LabelPrimitive>
</template>`

const vueUsageCode = `<script setup lang="ts">
import { Label } from '@/components/ui'
import { Input } from '@/components/ui'
</script>

<template>
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <Label for="email">Email</Label>
    <Input type="email" id="email" placeholder="Email" />
  </div>
</template>`

export function LabelDoc() {
  return (
    <>
      <ComponentDoc
        name="Label"
        description="Renders an accessible label associated with form controls with bold uppercase styling."
        dependencies={['@radix-ui/react-label', 'class-variance-authority']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email-preview">Email</Label>
          <Input type="email" id="email-preview" placeholder="Enter your email" />
        </div>
      </ComponentDoc>

      {/* Basic */}
      <ExampleSection
        title="Basic"
        description="A simple label with an input field."
        code={`<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>`}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email-basic">Email</Label>
          <Input type="email" id="email-basic" placeholder="Email" />
        </div>
      </ExampleSection>

      {/* With Checkbox */}
      <ExampleSection
        title="With Checkbox"
        description="Labels work seamlessly with checkboxes."
        code={`<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`}
      >
        <div className="flex items-center space-x-2">
          <Checkbox id="terms-label" />
          <Label htmlFor="terms-label">Accept terms and conditions</Label>
        </div>
      </ExampleSection>

      {/* Required Field */}
      <ExampleSection
        title="Required Field"
        description="Indicate required fields with an asterisk."
        code={`<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="username">
    Username <span className="text-destructive">*</span>
  </Label>
  <Input type="text" id="username" placeholder="Enter username" required />
</div>`}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="username-required">
            Username <span className="text-destructive">*</span>
          </Label>
          <Input type="text" id="username-required" placeholder="Enter username" required />
        </div>
      </ExampleSection>

      {/* With Helper Text */}
      <ExampleSection
        title="With Helper Text"
        description="Add helper text below the input for additional context."
        code={`<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="password">Password</Label>
  <Input type="password" id="password" placeholder="Enter password" />
  <p className="text-sm text-muted-foreground">
    Password must be at least 8 characters.
  </p>
</div>`}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password-helper">Password</Label>
          <Input type="password" id="password-helper" placeholder="Enter password" />
          <p className="text-sm text-muted-foreground">
            Password must be at least 8 characters.
          </p>
        </div>
      </ExampleSection>

      {/* Disabled State */}
      <ExampleSection
        title="Disabled State"
        description="Labels automatically adjust when the associated input is disabled."
        code={`<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="disabled-input">Disabled Field</Label>
  <Input type="text" id="disabled-input" placeholder="Cannot edit" disabled />
</div>`}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="disabled-input" className="peer-disabled:opacity-70">Disabled Field</Label>
          <Input type="text" id="disabled-input" placeholder="Cannot edit" disabled className="peer" />
        </div>
      </ExampleSection>

      {/* Form Layout */}
      <ExampleSection
        title="Form Layout"
        description="Use labels in a typical form layout."
        code={`<form className="grid w-full max-w-sm gap-4">
  <div className="grid gap-1.5">
    <Label htmlFor="first-name">First Name</Label>
    <Input id="first-name" placeholder="John" />
  </div>
  <div className="grid gap-1.5">
    <Label htmlFor="last-name">Last Name</Label>
    <Input id="last-name" placeholder="Doe" />
  </div>
  <div className="grid gap-1.5">
    <Label htmlFor="email-form">Email</Label>
    <Input id="email-form" type="email" placeholder="john@example.com" />
  </div>
</form>`}
      >
        <form className="grid w-full max-w-sm gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="first-name">First Name</Label>
            <Input id="first-name" placeholder="John" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="last-name">Last Name</Label>
            <Input id="last-name" placeholder="Doe" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="email-form">Email</Label>
            <Input id="email-form" type="email" placeholder="john@example.com" />
          </div>
        </form>
      </ExampleSection>
    </>
  )
}
