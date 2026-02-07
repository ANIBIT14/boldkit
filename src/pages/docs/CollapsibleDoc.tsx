import { useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import { ChevronsUpDown } from 'lucide-react'

const sourceCode = `import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }`

const usageCode = `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown } from 'lucide-react'

export default function Example() {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="outline">
          Toggle <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="border-3 border-foreground p-4">
          Collapsible content here.
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}`

const vueSourceCode = `<script setup lang="ts">
import { CollapsibleRoot, CollapsibleContent, CollapsibleTrigger } from 'reka-ui'
</script>

<template>
  <CollapsibleRoot v-bind="$attrs">
    <slot />
  </CollapsibleRoot>
</template>`

const vueUsageCode = `<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui'
import { Button } from '@/components/ui'
import { ChevronsUpDown } from 'lucide-vue-next'
</script>

<template>
  <Collapsible>
    <CollapsibleTrigger as-child>
      <Button variant="outline">
        Toggle <ChevronsUpDown class="ml-2 h-4 w-4" />
      </Button>
    </CollapsibleTrigger>
    <CollapsibleContent class="mt-2">
      <div class="border-3 border-foreground p-4">
        Collapsible content here.
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>`

export function CollapsibleDoc() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ComponentDoc
        name="Collapsible"
        description="An interactive component which expands/collapses a panel with smooth animations."
        dependencies={['@radix-ui/react-collapsible']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <Collapsible className="w-full max-w-sm">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Toggle Content
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="border-3 border-foreground bg-muted p-4 bk-shadow">
              <p>This content can be collapsed and expanded.</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </ComponentDoc>

      {/* Basic */}
      <ExampleSection
        title="Basic"
        description="A simple collapsible section."
        code={`<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="outline">
      Toggle <ChevronsUpDown className="ml-2 h-4 w-4" />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="mt-2">
    <div className="border-3 border-foreground p-4">
      Hidden content revealed!
    </div>
  </CollapsibleContent>
</Collapsible>`}
      >
        <Collapsible className="w-full max-w-sm">
          <CollapsibleTrigger asChild>
            <Button variant="outline">
              Toggle <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="border-3 border-foreground p-4 bk-shadow">
              Hidden content revealed!
            </div>
          </CollapsibleContent>
        </Collapsible>
      </ExampleSection>

      {/* Controlled */}
      <ExampleSection
        title="Controlled"
        description="Control the open state programmatically."
        code={`const [isOpen, setIsOpen] = useState(false)

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <div className="flex items-center gap-4">
    <CollapsibleTrigger asChild>
      <Button variant="outline">
        {isOpen ? 'Close' : 'Open'}
      </Button>
    </CollapsibleTrigger>
    <span className="text-sm text-muted-foreground">
      State: {isOpen ? 'Open' : 'Closed'}
    </span>
  </div>
  <CollapsibleContent className="mt-2">
    <div className="border-3 border-foreground p-4">
      Controlled content
    </div>
  </CollapsibleContent>
</Collapsible>`}
      >
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full max-w-sm">
          <div className="flex items-center gap-4">
            <CollapsibleTrigger asChild>
              <Button variant="outline">
                {isOpen ? 'Close' : 'Open'}
              </Button>
            </CollapsibleTrigger>
            <span className="text-sm text-muted-foreground">
              State: {isOpen ? 'Open' : 'Closed'}
            </span>
          </div>
          <CollapsibleContent className="mt-2">
            <div className="border-3 border-foreground p-4 bk-shadow">
              Controlled content that responds to external state.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </ExampleSection>

      {/* Default Open */}
      <ExampleSection
        title="Default Open"
        description="Start with the collapsible section expanded."
        code={`<Collapsible defaultOpen>
  <CollapsibleTrigger asChild>
    <Button variant="outline">
      Toggle <ChevronsUpDown className="ml-2 h-4 w-4" />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="mt-2">
    <div className="border-3 border-foreground p-4">
      This section is open by default.
    </div>
  </CollapsibleContent>
</Collapsible>`}
      >
        <Collapsible defaultOpen className="w-full max-w-sm">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Toggle
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="border-3 border-foreground p-4 bk-shadow">
              This section is open by default when the page loads.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </ExampleSection>

      {/* Multiple Items */}
      <ExampleSection
        title="List with More Items"
        description="Show additional items when expanded."
        code={`<Collapsible className="w-full max-w-sm space-y-2">
  <div className="border-3 border-foreground px-4 py-2">Item 1</div>
  <div className="border-3 border-foreground px-4 py-2">Item 2</div>
  <CollapsibleContent className="space-y-2">
    <div className="border-3 border-foreground px-4 py-2">Item 3</div>
    <div className="border-3 border-foreground px-4 py-2">Item 4</div>
    <div className="border-3 border-foreground px-4 py-2">Item 5</div>
  </CollapsibleContent>
  <CollapsibleTrigger asChild>
    <Button variant="ghost" size="sm" className="w-full">
      Show more <ChevronsUpDown className="ml-2 h-4 w-4" />
    </Button>
  </CollapsibleTrigger>
</Collapsible>`}
      >
        <Collapsible className="w-full max-w-sm space-y-2">
          <div className="border-3 border-foreground px-4 py-2 bk-shadow-sm font-medium">Item 1</div>
          <div className="border-3 border-foreground px-4 py-2 bk-shadow-sm font-medium">Item 2</div>
          <CollapsibleContent className="space-y-2">
            <div className="border-3 border-foreground px-4 py-2 bk-shadow-sm font-medium">Item 3</div>
            <div className="border-3 border-foreground px-4 py-2 bk-shadow-sm font-medium">Item 4</div>
            <div className="border-3 border-foreground px-4 py-2 bk-shadow-sm font-medium">Item 5</div>
          </CollapsibleContent>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full">
              Show more <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </ExampleSection>
    </>
  )
}
