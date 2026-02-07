import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-3 border-foreground border-b-0 last:border-b-3 bk-shadow', className)}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between bg-background py-4 px-4 font-bold uppercase tracking-wide transition-all hover:bg-muted [&[data-state=open]]:bg-accent [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-5 w-5 shrink-0 stroke-[3] transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down border-t-3 border-foreground"
    {...props}
  >
    <div className={cn('p-4', className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }`

const usageCode = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function Example() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`

const vueSourceCode = `<script setup lang="ts">
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from 'reka-ui'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <AccordionRoot :class="cn('w-full', props.class)">
    <slot />
  </AccordionRoot>
</template>`

const vueUsageCode = `<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui'
</script>

<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>`

export function AccordionDoc() {
  return (
    <>
      <ComponentDoc
        name="Accordion"
        description="A vertically stacked set of interactive headings that each reveal a section of content with bold neubrutalism styling."
        dependencies={['@radix-ui/react-accordion']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <Accordion type="single" collapsible className="w-full max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with bold neubrutalism styling out of the box.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default with smooth expand/collapse transitions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ComponentDoc>

      {/* Single Type */}
      <ExampleSection
        title="Single"
        description="Only one item can be opened at a time."
        code={`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content for section 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content for section 2</AccordionContent>
  </AccordionItem>
</Accordion>`}
        vueCode={`<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Section 1</AccordionTrigger>
      <AccordionContent>Content for section 1</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Section 2</AccordionTrigger>
      <AccordionContent>Content for section 2</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>`}
      >
        <Accordion type="single" collapsible className="w-full max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent>
              Content for section 1. This is the first accordion panel.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Section 2</AccordionTrigger>
            <AccordionContent>
              Content for section 2. This is the second accordion panel.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ExampleSection>

      {/* Multiple Type */}
      <ExampleSection
        title="Multiple"
        description="Multiple items can be opened at the same time."
        code={`<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger>First Item</AccordionTrigger>
    <AccordionContent>First item content</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Second Item</AccordionTrigger>
    <AccordionContent>Second item content</AccordionContent>
  </AccordionItem>
</Accordion>`}
        vueCode={`<template>
  <Accordion type="multiple">
    <AccordionItem value="item-1">
      <AccordionTrigger>First Item</AccordionTrigger>
      <AccordionContent>First item content</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Second Item</AccordionTrigger>
      <AccordionContent>Second item content</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>`}
      >
        <Accordion type="multiple" className="w-full max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>First Item</AccordionTrigger>
            <AccordionContent>
              First item content. You can open multiple items at once.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Second Item</AccordionTrigger>
            <AccordionContent>
              Second item content. Try opening both items!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ExampleSection>

      {/* Default Open */}
      <ExampleSection
        title="Default Open"
        description="Set a default open item using the defaultValue prop."
        code={`<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Open by Default</AccordionTrigger>
    <AccordionContent>This item is open by default.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Another Item</AccordionTrigger>
    <AccordionContent>This item starts closed.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        vueCode={`<template>
  <Accordion type="single" collapsible default-value="item-1">
    <AccordionItem value="item-1">
      <AccordionTrigger>Open by Default</AccordionTrigger>
      <AccordionContent>This item is open by default.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Another Item</AccordionTrigger>
      <AccordionContent>This item starts closed.</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>`}
      >
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>Open by Default</AccordionTrigger>
            <AccordionContent>
              This item is open by default when the component loads.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Another Item</AccordionTrigger>
            <AccordionContent>
              This item starts closed but can be opened.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ExampleSection>
    </>
  )
}
