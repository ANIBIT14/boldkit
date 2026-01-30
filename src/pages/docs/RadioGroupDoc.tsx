import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-5 w-5 border-3 border-foreground bg-background bk-shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-primary stroke-none" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }`

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

export function RadioGroupDoc() {
  const [value, setValue] = useState('comfortable')

  return (
    <>
      <ComponentDoc
        name="RadioGroup"
        description="A set of checkable buttons where only one can be checked at a time with bold neubrutalism styling."
        dependencies={['@radix-ui/react-radio-group']}
        sourceCode={sourceCode}
        usageCode={usageCode}
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
