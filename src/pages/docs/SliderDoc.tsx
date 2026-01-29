import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden border-3 border-foreground bg-muted bk-shadow-sm">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-6 w-6 border-3 border-foreground bg-background shadow-[2px_2px_0px_hsl(var(--shadow-color))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }`

const usageCode = `import { Slider } from '@/components/ui/slider'

export default function Example() {
  return (
    <Slider defaultValue={[50]} max={100} step={1} />
  )
}`

export function SliderDoc() {
  const [value, setValue] = useState([50])

  return (
    <>
      <ComponentDoc
        name="Slider"
        description="A draggable slider input with bold neubrutalism styling for selecting values from a range."
        installCommand="npx boldkit-ui add slider"
        dependencies={['@radix-ui/react-slider']}
        sourceCode={sourceCode}
        usageCode={usageCode}
      >
        <div className="w-full max-w-md">
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
      </ComponentDoc>

      {/* With Value Display */}
      <ExampleSection
        title="With Value"
        description="Display the current slider value."
        code={`const [value, setValue] = useState([50])

<div className="space-y-4">
  <Slider
    value={value}
    onValueChange={setValue}
    max={100}
    step={1}
  />
  <p className="text-sm font-bold">Value: {value[0]}</p>
</div>`}
      >
        <div className="w-full max-w-md space-y-4">
          <Slider
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
          />
          <p className="text-sm font-bold">Value: {value[0]}</p>
        </div>
      </ExampleSection>

      {/* Step Values */}
      <ExampleSection
        title="Custom Step"
        description="Slider with custom step increments."
        code={`<Slider defaultValue={[25]} max={100} step={25} />`}
      >
        <div className="w-full max-w-md">
          <Slider defaultValue={[25]} max={100} step={25} />
        </div>
      </ExampleSection>

      {/* Range Slider */}
      <ExampleSection
        title="Range"
        description="A slider with two thumbs for selecting a range."
        code={`<Slider defaultValue={[25, 75]} max={100} step={1} />`}
      >
        <div className="w-full max-w-md">
          <Slider defaultValue={[25, 75]} max={100} step={1} />
        </div>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        description="A disabled slider that cannot be interacted with."
        code={`<Slider defaultValue={[50]} max={100} disabled />`}
      >
        <div className="w-full max-w-md">
          <Slider defaultValue={[50]} max={100} disabled />
        </div>
      </ExampleSection>
    </>
  )
}
