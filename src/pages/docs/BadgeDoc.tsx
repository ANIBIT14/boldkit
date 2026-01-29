import { Badge } from '@/components/ui/badge'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center border-2 border-foreground px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        accent: 'bg-accent text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        info: 'bg-info text-info-foreground',
        outline: 'bg-background text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }`

const usageCode = `import { Badge } from '@/components/ui/badge'

export default function Example() {
  return <Badge>Badge</Badge>
}`

export function BadgeDoc() {
  return (
    <>
      <ComponentDoc
        name="Badge"
        description="Displays a badge or a component that looks like a badge with bold neubrutalism styling."
        installCommand="npx boldkit-ui add badge"
        dependencies={['class-variance-authority']}
        sourceCode={sourceCode}
        usageCode={usageCode}
      >
        <Badge>Badge</Badge>
      </ComponentDoc>

      {/* Variants */}
      <ExampleSection
        title="Variants"
        description="The badge comes with several variants to convey different meanings."
        code={`<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="outline">Outline</Badge>`}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </ExampleSection>

      {/* Status Badges */}
      <ExampleSection
        title="Status Badges"
        description="Use badges to show status information."
        code={`<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Inactive</Badge>
<Badge variant="info">In Progress</Badge>`}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="destructive">Inactive</Badge>
          <Badge variant="info">In Progress</Badge>
        </div>
      </ExampleSection>

      {/* With Counter */}
      <ExampleSection
        title="With Counter"
        description="Display counts or numbers in badges."
        code={`<Badge>New 5</Badge>
<Badge variant="destructive">Errors 12</Badge>
<Badge variant="secondary">Messages 99+</Badge>`}
      >
        <div className="flex flex-wrap gap-2">
          <Badge>New 5</Badge>
          <Badge variant="destructive">Errors 12</Badge>
          <Badge variant="secondary">Messages 99+</Badge>
        </div>
      </ExampleSection>

      {/* Category Badges */}
      <ExampleSection
        title="Category Badges"
        description="Use badges to categorize content."
        code={`<Badge variant="accent">Design</Badge>
<Badge variant="info">Development</Badge>
<Badge variant="secondary">Marketing</Badge>
<Badge variant="outline">Documentation</Badge>`}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="accent">Design</Badge>
          <Badge variant="info">Development</Badge>
          <Badge variant="secondary">Marketing</Badge>
          <Badge variant="outline">Documentation</Badge>
        </div>
      </ExampleSection>

      {/* In Context */}
      <ExampleSection
        title="In Context"
        description="Badges are often used alongside text or in headers."
        code={`<div className="flex items-center gap-2">
  <h3 className="text-lg font-bold">Features</h3>
  <Badge variant="accent">New</Badge>
</div>
<div className="flex items-center gap-2">
  <span>Component Library</span>
  <Badge variant="success">v1.0</Badge>
</div>`}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold uppercase">Features</h3>
            <Badge variant="accent">New</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Component Library</span>
            <Badge variant="success">v1.0</Badge>
          </div>
        </div>
      </ExampleSection>
    </>
  )
}
