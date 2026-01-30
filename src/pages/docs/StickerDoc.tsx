import { Sticker, Stamp } from '@/components/ui/sticker'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const stickerVariants = cva(
  'relative inline-flex items-center justify-center border-3 border-foreground font-bold uppercase tracking-wide transition-transform',
  {
    variants: {
      variant: {
        default: 'bg-accent text-accent-foreground',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'bg-background text-foreground',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        default: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
        xl: 'px-6 py-3 text-lg',
      },
      rotation: {
        none: 'rotate-0',
        slight: '-rotate-2',
        medium: '-rotate-6',
        heavy: '-rotate-12',
        'slight-right': 'rotate-2',
        'medium-right': 'rotate-6',
        'heavy-right': 'rotate-12',
      },
      shadow: {
        none: '',
        default: 'shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        colored: 'shadow-[4px_4px_0px_hsl(var(--primary))]',
        double: 'shadow-[3px_3px_0px_hsl(var(--primary)),6px_6px_0px_hsl(var(--shadow-color))]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rotation: 'slight',
      shadow: 'default',
    },
  }
)

const Sticker = React.forwardRef<HTMLDivElement, StickerProps>(
  ({ className, variant, size, rotation, shadow, dashed, tape, interactive, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        stickerVariants({ variant, size, rotation, shadow }),
        dashed && 'before:absolute before:inset-[-6px] before:border-2 before:border-dashed before:border-foreground/50',
        tape && 'after:absolute after:left-1/2 after:top-[-8px] after:-translate-x-1/2 after:rotate-[-2deg] after:w-[50px] after:h-[16px] after:bg-accent/80 after:border-2 after:border-foreground',
        interactive && 'cursor-pointer hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

export { Sticker, stickerVariants }`

const usageCode = `import { Sticker, Stamp } from '@/components/ui/sticker'

export default function Example() {
  return (
    <div className="flex gap-8 items-center">
      <Sticker>New</Sticker>
      <Stamp>Approved</Stamp>
    </div>
  )
}`

export function StickerDoc() {
  return (
    <>
      <ComponentDoc
        name="Sticker"
        description="Rotated labels and stamps with tape effect and double borders - neubrutalist decorative elements for emphasis and visual interest."
        dependencies={['class-variance-authority']}
        sourceCode={sourceCode}
        usageCode={usageCode}
      >
        <div className="flex flex-wrap gap-8 items-center">
          <Sticker>New</Sticker>
          <Sticker variant="primary">Hot</Sticker>
          <Sticker variant="secondary">Featured</Sticker>
          <Stamp>Approved</Stamp>
        </div>
      </ComponentDoc>

      {/* Variants */}
      <ExampleSection
        title="Variants"
        description="Different color variants to match your design needs."
        code={`<Sticker variant="default">Default</Sticker>
<Sticker variant="primary">Primary</Sticker>
<Sticker variant="secondary">Secondary</Sticker>
<Sticker variant="destructive">Destructive</Sticker>
<Sticker variant="outline">Outline</Sticker>`}
      >
        <div className="flex flex-wrap gap-6 items-center">
          <Sticker variant="default">Default</Sticker>
          <Sticker variant="primary">Primary</Sticker>
          <Sticker variant="secondary">Secondary</Sticker>
          <Sticker variant="destructive">Destructive</Sticker>
          <Sticker variant="outline">Outline</Sticker>
        </div>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection
        title="Sizes"
        description="Stickers are available in different sizes."
        code={`<Sticker size="sm">Small</Sticker>
<Sticker size="default">Default</Sticker>
<Sticker size="lg">Large</Sticker>
<Sticker size="xl">Extra Large</Sticker>`}
      >
        <div className="flex flex-wrap gap-6 items-center">
          <Sticker size="sm">Small</Sticker>
          <Sticker size="default">Default</Sticker>
          <Sticker size="lg">Large</Sticker>
          <Sticker size="xl">Extra Large</Sticker>
        </div>
      </ExampleSection>

      {/* Rotations */}
      <ExampleSection
        title="Rotations"
        description="Control the rotation angle for different effects."
        code={`<Sticker rotation="none">No Rotation</Sticker>
<Sticker rotation="slight">Slight</Sticker>
<Sticker rotation="medium">Medium</Sticker>
<Sticker rotation="heavy">Heavy</Sticker>
<Sticker rotation="slight-right">Right</Sticker>
<Sticker rotation="heavy-right">Heavy Right</Sticker>`}
      >
        <div className="flex flex-wrap gap-6 items-center py-4">
          <Sticker rotation="none">No Rotation</Sticker>
          <Sticker rotation="slight">Slight</Sticker>
          <Sticker rotation="medium">Medium</Sticker>
          <Sticker rotation="heavy">Heavy</Sticker>
          <Sticker rotation="slight-right">Right</Sticker>
          <Sticker rotation="heavy-right">Heavy Right</Sticker>
        </div>
      </ExampleSection>

      {/* Shadow Styles */}
      <ExampleSection
        title="Shadow Styles"
        description="Different shadow styles for varied depth effects."
        code={`<Sticker shadow="none">No Shadow</Sticker>
<Sticker shadow="default">Default</Sticker>
<Sticker shadow="colored">Colored</Sticker>
<Sticker shadow="double">Double</Sticker>`}
      >
        <div className="flex flex-wrap gap-6 items-center py-4">
          <Sticker shadow="none">No Shadow</Sticker>
          <Sticker shadow="default">Default</Sticker>
          <Sticker shadow="colored">Colored</Sticker>
          <Sticker shadow="double">Double</Sticker>
        </div>
      </ExampleSection>

      {/* With Dashed Border */}
      <ExampleSection
        title="Dashed Border"
        description="Add a dashed outline for a hand-cut sticker effect."
        code={`<Sticker dashed>Cut Here</Sticker>
<Sticker dashed variant="primary">Limited</Sticker>
<Sticker dashed variant="destructive">Urgent</Sticker>`}
      >
        <div className="flex flex-wrap gap-8 items-center py-4">
          <Sticker dashed>Cut Here</Sticker>
          <Sticker dashed variant="primary">Limited</Sticker>
          <Sticker dashed variant="destructive">Urgent</Sticker>
        </div>
      </ExampleSection>

      {/* With Tape Effect */}
      <ExampleSection
        title="Tape Effect"
        description="Add a decorative tape strip on top."
        code={`<Sticker tape>Note</Sticker>
<Sticker tape variant="outline">Remember</Sticker>
<Sticker tape variant="primary" rotation="medium-right">Important</Sticker>`}
      >
        <div className="flex flex-wrap gap-8 items-center py-8">
          <Sticker tape>Note</Sticker>
          <Sticker tape variant="outline">Remember</Sticker>
          <Sticker tape variant="primary" rotation="medium-right">Important</Sticker>
        </div>
      </ExampleSection>

      {/* Interactive */}
      <ExampleSection
        title="Interactive"
        description="Make stickers clickable with hover effects."
        code={`<Sticker interactive>Click Me</Sticker>
<Sticker interactive variant="primary">Press</Sticker>`}
      >
        <div className="flex flex-wrap gap-6 items-center">
          <Sticker interactive>Click Me</Sticker>
          <Sticker interactive variant="primary">Press</Sticker>
        </div>
      </ExampleSection>

      {/* Stamp Component */}
      <ExampleSection
        title="Stamp"
        description="Circular stamp component for approvals and certifications."
        code={`<Stamp>OK</Stamp>
<Stamp variant="secondary">Verified</Stamp>
<Stamp variant="accent">100%</Stamp>
<Stamp variant="destructive" rotation="medium">Rejected</Stamp>`}
      >
        <div className="flex flex-wrap gap-8 items-center py-4">
          <Stamp>OK</Stamp>
          <Stamp variant="secondary">Verified</Stamp>
          <Stamp variant="accent">100%</Stamp>
          <Stamp variant="destructive" rotation="medium">Rejected</Stamp>
        </div>
      </ExampleSection>

      {/* Stamp Sizes */}
      <ExampleSection
        title="Stamp Sizes"
        description="Different stamp sizes for various use cases."
        code={`<Stamp size="sm">SM</Stamp>
<Stamp size="default">Default</Stamp>
<Stamp size="lg">Large</Stamp>
<Stamp size="xl">Extra Large</Stamp>`}
      >
        <div className="flex flex-wrap gap-8 items-center py-4">
          <Stamp size="sm">SM</Stamp>
          <Stamp size="default">OK</Stamp>
          <Stamp size="lg">Large</Stamp>
          <Stamp size="xl">XL</Stamp>
        </div>
      </ExampleSection>

      {/* Double Ring Stamp */}
      <ExampleSection
        title="Double Ring Stamp"
        description="Add a double ring effect to stamps for extra emphasis."
        code={`<Stamp doubleRing>Certified</Stamp>
<Stamp doubleRing variant="secondary">Approved</Stamp>`}
      >
        <div className="flex flex-wrap gap-8 items-center py-4">
          <Stamp doubleRing>Certified</Stamp>
          <Stamp doubleRing variant="secondary">Approved</Stamp>
        </div>
      </ExampleSection>
    </>
  )
}
