import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '@/lib/utils'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 border-3 border-foreground bg-popover p-4 text-popover-foreground bk-shadow outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }`

const usageCode = `import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

export default function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        Place content for the popover here.
      </PopoverContent>
    </Popover>
  )
}`

const vueSourceCode = `<script setup lang="ts">
import { PopoverRoot, PopoverContent, PopoverTrigger } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>

<template>
  <PopoverRoot v-bind="$attrs">
    <slot />
  </PopoverRoot>
</template>`

const vueUsageCode = `<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import { Button } from '@/components/ui'
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button>Open Popover</Button>
    </PopoverTrigger>
    <PopoverContent>
      Place content for the popover here.
    </PopoverContent>
  </Popover>
</template>`

export function PopoverDoc() {
  return (
    <>
      <ComponentDoc
        name="Popover"
        description="Displays rich content in a portal, triggered by a button with bold neubrutalism styling."
        dependencies={['@radix-ui/react-popover']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-bold uppercase tracking-wide leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </ComponentDoc>

      {/* Basic */}
      <ExampleSection
        title="Basic"
        description="A simple popover with text content."
        code={`<Popover>
  <PopoverTrigger asChild>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>This is popover content.</p>
  </PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>This is popover content with neubrutalism styling.</p>
          </PopoverContent>
        </Popover>
      </ExampleSection>

      {/* With Form */}
      <ExampleSection
        title="With Form"
        description="Use popovers to display forms or settings."
        code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Update Dimensions</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-bold uppercase">Dimensions</h4>
        <p className="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="width">Width</Label>
          <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="height">Height</Label>
          <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
        </div>
      </div>
    </div>
  </PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Update Dimensions</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-bold uppercase tracking-wide">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Width</Label>
                  <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">Height</Label>
                  <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">Max Height</Label>
                  <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </ExampleSection>

      {/* Alignment */}
      <ExampleSection
        title="Alignment"
        description="Control the alignment of the popover relative to its trigger."
        code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Align Start</Button>
  </PopoverTrigger>
  <PopoverContent align="start">
    Aligned to the start.
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Align Center</Button>
  </PopoverTrigger>
  <PopoverContent align="center">
    Aligned to the center.
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Align End</Button>
  </PopoverTrigger>
  <PopoverContent align="end">
    Aligned to the end.
  </PopoverContent>
</Popover>`}
      >
        <div className="flex flex-wrap gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Align Start</Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <p className="text-sm">Aligned to the start of the trigger.</p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Align Center</Button>
            </PopoverTrigger>
            <PopoverContent align="center">
              <p className="text-sm">Aligned to the center of the trigger.</p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Align End</Button>
            </PopoverTrigger>
            <PopoverContent align="end">
              <p className="text-sm">Aligned to the end of the trigger.</p>
            </PopoverContent>
          </Popover>
        </div>
      </ExampleSection>

      {/* Side Placement */}
      <ExampleSection
        title="Side Placement"
        description="Position the popover on different sides of the trigger."
        code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Top</Button>
  </PopoverTrigger>
  <PopoverContent side="top">
    Opens on top.
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Right</Button>
  </PopoverTrigger>
  <PopoverContent side="right">
    Opens on right.
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Left</Button>
  </PopoverTrigger>
  <PopoverContent side="left">
    Opens on left.
  </PopoverContent>
</Popover>`}
      >
        <div className="flex flex-wrap gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Top</Button>
            </PopoverTrigger>
            <PopoverContent side="top">
              <p className="text-sm">This popover opens on top.</p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Right</Button>
            </PopoverTrigger>
            <PopoverContent side="right">
              <p className="text-sm">This popover opens on the right.</p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Bottom</Button>
            </PopoverTrigger>
            <PopoverContent side="bottom">
              <p className="text-sm">This popover opens on bottom.</p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Left</Button>
            </PopoverTrigger>
            <PopoverContent side="left">
              <p className="text-sm">This popover opens on the left.</p>
            </PopoverContent>
          </Popover>
        </div>
      </ExampleSection>
    </>
  )
}
