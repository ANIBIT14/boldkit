import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/accordion.tsx?raw'
import vueSourceCode from '@vue-ui/Accordion.vue?raw'


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
