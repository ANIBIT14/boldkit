import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-5 w-5 shrink-0 border-3 border-foreground bg-background bk-shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="h-4 w-4 stroke-[3]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }`

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
        description="A control that allows the user to toggle between checked and not checked with bold neubrutalism styling."
        installCommand="npx boldkit-ui add checkbox"
        dependencies={['@radix-ui/react-checkbox']}
        sourceCode={sourceCode}
        usageCode={usageCode}
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
