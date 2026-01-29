import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import { Loader2, Mail, ChevronRight } from 'lucide-react'

const sourceCode = `import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-bold uppercase tracking-wide transition-all border-3 border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground bk-shadow bk-hover',
        secondary: 'bg-secondary text-secondary-foreground bk-shadow bk-hover',
        accent: 'bg-accent text-accent-foreground bk-shadow bk-hover',
        destructive: 'bg-destructive text-destructive-foreground bk-shadow bk-hover',
        outline: 'bg-background hover:bg-muted bk-shadow bk-hover',
        ghost: 'border-transparent hover:bg-muted',
        link: 'border-transparent underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-5 py-2',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-12 px-8 text-lg',
        xl: 'h-14 px-10 text-xl',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }`

const usageCode = `import { Button } from '@/components/ui/button'

export default function Example() {
  return <Button>Click me</Button>
}`

export function ButtonDoc() {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <ComponentDoc
        name="Button"
        description="Displays a button or a component that looks like a button with neubrutalism styling."
        installCommand="npx boldkit-ui add button"
        dependencies={['@radix-ui/react-slot', 'class-variance-authority']}
        sourceCode={sourceCode}
        usageCode={usageCode}
      >
        <div className="flex flex-wrap gap-4">
          <Button>Button</Button>
        </div>
      </ComponentDoc>

      {/* Variants */}
      <ExampleSection
        title="Variants"
        description="The button comes with several variants to match different use cases."
        code={`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection
        title="Sizes"
        description="Buttons are available in different sizes."
        code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon"><Mail className="h-4 w-4" /></Button>`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
          <Button size="icon"><Mail className="h-4 w-4" /></Button>
        </div>
      </ExampleSection>

      {/* With Icon */}
      <ExampleSection
        title="With Icon"
        description="Add icons to buttons for better visual feedback."
        code={`<Button>
  <Mail className="mr-2 h-4 w-4" /> Login with Email
</Button>
<Button variant="secondary">
  Next <ChevronRight className="ml-2 h-4 w-4" />
</Button>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button>
            <Mail className="mr-2 h-4 w-4" /> Login with Email
          </Button>
          <Button variant="secondary">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </ExampleSection>

      {/* Loading */}
      <ExampleSection
        title="Loading"
        description="Show a loading state while an action is in progress."
        code={`<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Please wait
</Button>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
          <Button
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 2000)
            }}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Loading...' : 'Click me'}
          </Button>
        </div>
      </ExampleSection>

      {/* As Child */}
      <ExampleSection
        title="As Child"
        description="Use the asChild prop to render the button as a different element like a link."
        code={`<Button asChild>
  <a href="#">Link styled as Button</a>
</Button>`}
      >
        <Button asChild>
          <a href="#">Link styled as Button</a>
        </Button>
      </ExampleSection>
    </>
  )
}
