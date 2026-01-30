import { Toggle } from '@/components/ui/toggle'
import { Bold, Italic, Underline } from 'lucide-react'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const toggleVariants = cva(
  'inline-flex items-center justify-center text-sm font-bold uppercase tracking-wide transition-all hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground border-3 border-foreground bk-shadow-sm [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'bg-background',
      },
      size: {
        default: 'h-10 px-3 min-w-10',
        sm: 'h-9 px-2.5 min-w-9',
        lg: 'h-11 px-5 min-w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }`

const usageCode = `import { Toggle } from '@/components/ui/toggle'
import { Bold } from 'lucide-react'

export default function Example() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}`

export function ToggleDoc() {
  return (
    <>
      <ComponentDoc
        name="Toggle"
        description="A two-state button that can be toggled on or off with bold neubrutalism styling."
        dependencies={['@radix-ui/react-toggle', 'class-variance-authority']}
        sourceCode={sourceCode}
        usageCode={usageCode}
      >
        <Toggle aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </Toggle>
      </ComponentDoc>

      {/* With Text */}
      <ExampleSection
        title="With Text"
        description="Toggle button with text content."
        code={`<Toggle aria-label="Toggle italic">
  <Italic className="h-4 w-4" />
  Italic
</Toggle>`}
      >
        <Toggle aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
          Italic
        </Toggle>
      </ExampleSection>

      {/* Outline Variant */}
      <ExampleSection
        title="Outline"
        description="Toggle with outline variant styling."
        code={`<Toggle variant="outline" aria-label="Toggle underline">
  <Underline className="h-4 w-4" />
</Toggle>`}
      >
        <Toggle variant="outline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </Toggle>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection
        title="Sizes"
        description="Toggle buttons in different sizes."
        code={`<Toggle size="sm" aria-label="Toggle small">
  <Bold className="h-4 w-4" />
</Toggle>

<Toggle size="default" aria-label="Toggle default">
  <Bold className="h-4 w-4" />
</Toggle>

<Toggle size="lg" aria-label="Toggle large">
  <Bold className="h-4 w-4" />
</Toggle>`}
      >
        <div className="flex items-center gap-4">
          <Toggle size="sm" aria-label="Toggle small">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle size="default" aria-label="Toggle default">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle size="lg" aria-label="Toggle large">
            <Bold className="h-4 w-4" />
          </Toggle>
        </div>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        description="A disabled toggle that cannot be interacted with."
        code={`<Toggle aria-label="Toggle disabled" disabled>
  <Bold className="h-4 w-4" />
</Toggle>`}
      >
        <Toggle aria-label="Toggle disabled" disabled>
          <Bold className="h-4 w-4" />
        </Toggle>
      </ExampleSection>

      {/* Default Pressed */}
      <ExampleSection
        title="Default Pressed"
        description="Toggle that starts in the pressed state."
        code={`<Toggle defaultPressed aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>`}
      >
        <Toggle defaultPressed aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </Toggle>
      </ExampleSection>
    </>
  )
}
