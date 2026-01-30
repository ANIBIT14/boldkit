import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import { AlertCircle, CheckCircle, Info, AlertTriangle, Terminal } from 'lucide-react'

const sourceCode = `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full border-3 border-foreground p-4 bk-shadow [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'bg-destructive text-destructive-foreground [&>svg]:text-destructive-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        info: 'bg-info text-info-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-bold uppercase tracking-wide leading-none', className)}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }`

const usageCode = `import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'

export default function Example() {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  )
}`

export function AlertDoc() {
  return (
    <>
      <ComponentDoc
        name="Alert"
        description="Displays a callout for user attention with various severity levels and bold neubrutalism styling."
        dependencies={['class-variance-authority']}
        sourceCode={sourceCode}
        usageCode={usageCode}
      >
        <Alert className="max-w-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the CLI.
          </AlertDescription>
        </Alert>
      </ComponentDoc>

      {/* Variants */}
      <ExampleSection
        title="Variants"
        description="The alert comes with several variants to convey different levels of importance."
        code={`<Alert variant="default">
  <Terminal className="h-4 w-4" />
  <AlertTitle>Default</AlertTitle>
  <AlertDescription>This is a default alert.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>

<Alert variant="success">
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Operation completed.</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Please be careful.</AlertDescription>
</Alert>

<Alert variant="info">
  <Info className="h-4 w-4" />
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>Here is some information.</AlertDescription>
</Alert>`}
      >
        <div className="space-y-4 max-w-md">
          <Alert variant="default">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Default</AlertTitle>
            <AlertDescription>This is a default alert message.</AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong. Please try again.</AlertDescription>
          </Alert>

          <Alert variant="success">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your changes have been saved successfully.</AlertDescription>
          </Alert>

          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>This action cannot be undone.</AlertDescription>
          </Alert>

          <Alert variant="info">
            <Info className="h-4 w-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>Here is some helpful information.</AlertDescription>
          </Alert>
        </div>
      </ExampleSection>

      {/* Without Icon */}
      <ExampleSection
        title="Without Icon"
        description="Alerts can be used without an icon for simpler notifications."
        code={`<Alert>
  <AlertTitle>Notice</AlertTitle>
  <AlertDescription>
    This is a simple alert without an icon.
  </AlertDescription>
</Alert>`}
      >
        <Alert className="max-w-md">
          <AlertTitle>Notice</AlertTitle>
          <AlertDescription>
            This is a simple alert without an icon for cleaner layouts.
          </AlertDescription>
        </Alert>
      </ExampleSection>

      {/* Description Only */}
      <ExampleSection
        title="Description Only"
        description="Use just the description for brief inline messages."
        code={`<Alert variant="info">
  <Info className="h-4 w-4" />
  <AlertDescription>
    Your session will expire in 5 minutes.
  </AlertDescription>
</Alert>`}
      >
        <Alert variant="info" className="max-w-md">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Your session will expire in 5 minutes. Save your work now.
          </AlertDescription>
        </Alert>
      </ExampleSection>
    </>
  )
}
