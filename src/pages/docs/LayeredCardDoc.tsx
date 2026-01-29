import {
  LayeredCard,
  LayeredCardHeader,
  LayeredCardTitle,
  LayeredCardDescription,
  LayeredCardContent,
  LayeredCardFooter,
} from '@/components/ui/layered-card'
import { Button } from '@/components/ui/button'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const layeredCardVariants = cva(
  'relative border-3 border-foreground bg-card text-card-foreground',
  {
    variants: {
      layers: {
        single: '',
        double: '',
        triple: '',
      },
      offset: {
        sm: '',
        default: '',
        lg: '',
      },
      layerColor: {
        default: '',
        primary: '',
        secondary: '',
        accent: '',
        muted: '',
      },
    },
    defaultVariants: {
      layers: 'double',
      offset: 'default',
      layerColor: 'default',
    },
  }
)

const LayeredCard = React.forwardRef<HTMLDivElement, LayeredCardProps>(
  ({ className, layers, offset, layerColor, interactive, children, ...props }, ref) => {
    // Component implementation with background layers
    return (
      <div ref={ref} className={cn(layeredCardVariants({ layers, offset, layerColor }), className)} {...props}>
        {/* Background layer divs */}
        {children}
      </div>
    )
  }
)

const LayeredCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 border-b-3 border-foreground bg-muted p-4', className)} {...props} />
  )
)

const LayeredCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-xl font-bold uppercase tracking-wide', className)} {...props} />
  )
)

const LayeredCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-4', className)} {...props} />
  )
)

const LayeredCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center border-t-3 border-foreground bg-muted p-4', className)} {...props} />
  )
)

export { LayeredCard, LayeredCardHeader, LayeredCardTitle, LayeredCardDescription, LayeredCardContent, LayeredCardFooter }`

const usageCode = `import {
  LayeredCard,
  LayeredCardHeader,
  LayeredCardTitle,
  LayeredCardDescription,
  LayeredCardContent,
  LayeredCardFooter,
} from '@/components/ui/layered-card'

export default function Example() {
  return (
    <LayeredCard className="w-[350px]">
      <LayeredCardHeader>
        <LayeredCardTitle>Layered Card</LayeredCardTitle>
        <LayeredCardDescription>With stacked depth effect</LayeredCardDescription>
      </LayeredCardHeader>
      <LayeredCardContent>
        <p>This card has visible layers behind it for a 3D stacked paper effect.</p>
      </LayeredCardContent>
    </LayeredCard>
  )
}`

export function LayeredCardDoc() {
  return (
    <>
      <ComponentDoc
        name="Layered Card"
        description="Card component with stacked layers effect showing offset depth - a neubrutalist design pattern that creates a sense of physicality and dimension."
        installCommand="npx boldkit-ui add layered-card"
        dependencies={['class-variance-authority']}
        sourceCode={sourceCode}
        usageCode={usageCode}
        registryName="layered-card"
      >
        <div className="pb-6 pr-6">
          <LayeredCard className="w-[350px]">
            <LayeredCardHeader>
              <LayeredCardTitle>Layered Card</LayeredCardTitle>
              <LayeredCardDescription>With stacked depth effect</LayeredCardDescription>
            </LayeredCardHeader>
            <LayeredCardContent>
              <p>This card has visible layers behind it for a 3D stacked paper effect.</p>
            </LayeredCardContent>
          </LayeredCard>
        </div>
      </ComponentDoc>

      {/* Layer Count */}
      <ExampleSection
        title="Layer Count"
        description="Control how many layers appear behind the card."
        code={`<LayeredCard layers="single">
  <LayeredCardContent>Single Layer</LayeredCardContent>
</LayeredCard>

<LayeredCard layers="double">
  <LayeredCardContent>Double Layer (Default)</LayeredCardContent>
</LayeredCard>

<LayeredCard layers="triple">
  <LayeredCardContent>Triple Layer</LayeredCardContent>
</LayeredCard>`}
      >
        <div className="flex flex-wrap gap-12 items-start pb-8 pr-8">
          <LayeredCard layers="single" className="w-[200px]">
            <LayeredCardContent>
              <p className="font-bold">Single Layer</p>
            </LayeredCardContent>
          </LayeredCard>
          <LayeredCard layers="double" className="w-[200px]">
            <LayeredCardContent>
              <p className="font-bold">Double Layer</p>
            </LayeredCardContent>
          </LayeredCard>
          <LayeredCard layers="triple" className="w-[200px]">
            <LayeredCardContent>
              <p className="font-bold">Triple Layer</p>
            </LayeredCardContent>
          </LayeredCard>
        </div>
      </ExampleSection>

      {/* Offset Sizes */}
      <ExampleSection
        title="Offset Sizes"
        description="Adjust the offset distance between layers."
        code={`<LayeredCard offset="sm">
  <LayeredCardContent>Small Offset</LayeredCardContent>
</LayeredCard>

<LayeredCard offset="default">
  <LayeredCardContent>Default Offset</LayeredCardContent>
</LayeredCard>

<LayeredCard offset="lg">
  <LayeredCardContent>Large Offset</LayeredCardContent>
</LayeredCard>`}
      >
        <div className="flex flex-wrap gap-12 items-start pb-8 pr-8">
          <LayeredCard offset="sm" className="w-[200px]">
            <LayeredCardContent>
              <p className="font-bold">Small Offset</p>
            </LayeredCardContent>
          </LayeredCard>
          <LayeredCard offset="default" className="w-[200px]">
            <LayeredCardContent>
              <p className="font-bold">Default Offset</p>
            </LayeredCardContent>
          </LayeredCard>
          <LayeredCard offset="lg" className="w-[200px]">
            <LayeredCardContent>
              <p className="font-bold">Large Offset</p>
            </LayeredCardContent>
          </LayeredCard>
        </div>
      </ExampleSection>

      {/* Layer Colors */}
      <ExampleSection
        title="Layer Colors"
        description="Customize the color of the background layers."
        code={`<LayeredCard layerColor="primary">
  <LayeredCardContent>Primary Layers</LayeredCardContent>
</LayeredCard>

<LayeredCard layerColor="secondary">
  <LayeredCardContent>Secondary Layers</LayeredCardContent>
</LayeredCard>

<LayeredCard layerColor="accent">
  <LayeredCardContent>Accent Layers</LayeredCardContent>
</LayeredCard>`}
      >
        <div className="flex flex-wrap gap-12 items-start pb-8 pr-8">
          <LayeredCard layerColor="primary" className="w-[200px]">
            <LayeredCardContent>
              <p className="font-bold">Primary</p>
            </LayeredCardContent>
          </LayeredCard>
          <LayeredCard layerColor="secondary" className="w-[200px]">
            <LayeredCardContent>
              <p className="font-bold">Secondary</p>
            </LayeredCardContent>
          </LayeredCard>
          <LayeredCard layerColor="accent" className="w-[200px]">
            <LayeredCardContent>
              <p className="font-bold">Accent</p>
            </LayeredCardContent>
          </LayeredCard>
        </div>
      </ExampleSection>

      {/* Interactive */}
      <ExampleSection
        title="Interactive"
        description="Make the card interactive with hover lift effect."
        code={`<LayeredCard interactive>
  <LayeredCardHeader>
    <LayeredCardTitle>Hover Me</LayeredCardTitle>
  </LayeredCardHeader>
  <LayeredCardContent>
    <p>This card lifts up on hover!</p>
  </LayeredCardContent>
</LayeredCard>`}
      >
        <div className="pb-6 pr-6">
          <LayeredCard interactive className="w-[300px]">
            <LayeredCardHeader>
              <LayeredCardTitle>Hover Me</LayeredCardTitle>
            </LayeredCardHeader>
            <LayeredCardContent>
              <p>This card lifts up on hover!</p>
            </LayeredCardContent>
          </LayeredCard>
        </div>
      </ExampleSection>

      {/* Full Example */}
      <ExampleSection
        title="Full Example"
        description="Complete card with header, content, and footer."
        code={`<LayeredCard layerColor="primary" className="w-[350px]">
  <LayeredCardHeader>
    <LayeredCardTitle>Subscription Plan</LayeredCardTitle>
    <LayeredCardDescription>Everything you need to get started</LayeredCardDescription>
  </LayeredCardHeader>
  <LayeredCardContent className="space-y-4">
    <div className="text-4xl font-black">$29<span className="text-lg font-normal">/mo</span></div>
    <ul className="space-y-2 text-sm">
      <li>✓ Unlimited projects</li>
      <li>✓ Priority support</li>
      <li>✓ Advanced analytics</li>
    </ul>
  </LayeredCardContent>
  <LayeredCardFooter>
    <Button className="w-full">Get Started</Button>
  </LayeredCardFooter>
</LayeredCard>`}
      >
        <div className="pb-6 pr-6">
          <LayeredCard layerColor="primary" className="w-[350px]">
            <LayeredCardHeader>
              <LayeredCardTitle>Subscription Plan</LayeredCardTitle>
              <LayeredCardDescription>Everything you need to get started</LayeredCardDescription>
            </LayeredCardHeader>
            <LayeredCardContent className="space-y-4">
              <div className="text-4xl font-black">$29<span className="text-lg font-normal">/mo</span></div>
              <ul className="space-y-2 text-sm">
                <li>✓ Unlimited projects</li>
                <li>✓ Priority support</li>
                <li>✓ Advanced analytics</li>
              </ul>
            </LayeredCardContent>
            <LayeredCardFooter>
              <Button className="w-full">Get Started</Button>
            </LayeredCardFooter>
          </LayeredCard>
        </div>
      </ExampleSection>

      {/* Card Grid */}
      <ExampleSection
        title="Card Grid"
        description="Use layered cards in a grid layout for visual hierarchy."
        code={`<div className="grid grid-cols-3 gap-8">
  <LayeredCard layerColor="primary">
    <LayeredCardContent className="text-center">
      <div className="text-3xl font-black">01</div>
      <p className="mt-2 font-bold">Design</p>
    </LayeredCardContent>
  </LayeredCard>
  <LayeredCard layerColor="secondary">
    <LayeredCardContent className="text-center">
      <div className="text-3xl font-black">02</div>
      <p className="mt-2 font-bold">Develop</p>
    </LayeredCardContent>
  </LayeredCard>
  <LayeredCard layerColor="accent">
    <LayeredCardContent className="text-center">
      <div className="text-3xl font-black">03</div>
      <p className="mt-2 font-bold">Deploy</p>
    </LayeredCardContent>
  </LayeredCard>
</div>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-6 pr-6">
          <LayeredCard layerColor="primary">
            <LayeredCardContent className="text-center">
              <div className="text-3xl font-black">01</div>
              <p className="mt-2 font-bold">Design</p>
            </LayeredCardContent>
          </LayeredCard>
          <LayeredCard layerColor="secondary">
            <LayeredCardContent className="text-center">
              <div className="text-3xl font-black">02</div>
              <p className="mt-2 font-bold">Develop</p>
            </LayeredCardContent>
          </LayeredCard>
          <LayeredCard layerColor="accent">
            <LayeredCardContent className="text-center">
              <div className="text-3xl font-black">03</div>
              <p className="mt-2 font-bold">Deploy</p>
            </LayeredCardContent>
          </LayeredCard>
        </div>
      </ExampleSection>
    </>
  )
}
