import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[100px] w-full border-3 border-input bg-background px-4 py-3 text-base transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:translate-x-[-2px] focus-visible:translate-y-[-2px] focus-visible:shadow-[6px_6px_0px_hsl(var(--shadow-color))] disabled:cursor-not-allowed disabled:opacity-50 bk-shadow md:text-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }`

const usageCode = `import { Textarea } from '@/components/ui/textarea'

export default function Example() {
  return <Textarea placeholder="Type your message here." />
}`

export function TextareaDoc() {
  return (
    <>
      <ComponentDoc
        name="Textarea"
        description="A multi-line text input field with bold neubrutalism styling."
        installCommand="npx boldkit-ui add textarea"
        dependencies={[]}
        sourceCode={sourceCode}
        usageCode={usageCode}
      >
        <div className="w-full max-w-md">
          <Textarea placeholder="Type your message here." />
        </div>
      </ComponentDoc>

      {/* With Label */}
      <ExampleSection
        title="With Label"
        description="Textarea with an associated label."
        code={`<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Your Message</Label>
  <Textarea placeholder="Type your message here." id="message" />
</div>`}
      >
        <div className="grid w-full max-w-md gap-1.5">
          <Label htmlFor="message">Your Message</Label>
          <Textarea placeholder="Type your message here." id="message" />
        </div>
      </ExampleSection>

      {/* With Helper Text */}
      <ExampleSection
        title="With Helper Text"
        description="Textarea with descriptive helper text below."
        code={`<div className="grid w-full gap-1.5">
  <Label htmlFor="bio">Bio</Label>
  <Textarea placeholder="Tell us about yourself" id="bio" />
  <p className="text-sm text-muted-foreground">
    Your bio will be visible to other users.
  </p>
</div>`}
      >
        <div className="grid w-full max-w-md gap-1.5">
          <Label htmlFor="bio">Bio</Label>
          <Textarea placeholder="Tell us about yourself" id="bio" />
          <p className="text-sm text-muted-foreground">
            Your bio will be visible to other users.
          </p>
        </div>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        description="A disabled textarea that cannot be edited."
        code={`<Textarea placeholder="This textarea is disabled" disabled />`}
      >
        <div className="w-full max-w-md">
          <Textarea placeholder="This textarea is disabled" disabled />
        </div>
      </ExampleSection>

      {/* With Default Value */}
      <ExampleSection
        title="Default Value"
        description="Textarea with a pre-filled default value."
        code={`<Textarea defaultValue="This is the default value for the textarea." />`}
      >
        <div className="w-full max-w-md">
          <Textarea defaultValue="This is the default value for the textarea. You can edit this text." />
        </div>
      </ExampleSection>

      {/* Custom Rows */}
      <ExampleSection
        title="Custom Height"
        description="Textarea with custom number of visible rows."
        code={`<Textarea placeholder="This textarea has 6 rows" rows={6} />`}
      >
        <div className="w-full max-w-md">
          <Textarea placeholder="This textarea has 6 rows" rows={6} />
        </div>
      </ExampleSection>
    </>
  )
}
