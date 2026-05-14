import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/popover.tsx?raw'
import vueSourceCode from '@vue-ui/Popover.vue?raw'


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
        vueCode={`<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button>Open</Button>
    </PopoverTrigger>
    <PopoverContent>
      <p>This is popover content.</p>
    </PopoverContent>
  </Popover>
</template>`}
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
        vueCode={`<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">Update Dimensions</Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-bold uppercase">Dimensions</h4>
          <p class="text-sm text-muted-foreground">
            Set the dimensions for the layer.
          </p>
        </div>
        <div class="grid gap-2">
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="width">Width</Label>
            <Input id="width" default-value="100%" class="col-span-2 h-8" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="height">Height</Label>
            <Input id="height" default-value="25px" class="col-span-2 h-8" />
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>`}
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
        vueCode={`<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">Align Start</Button>
    </PopoverTrigger>
    <PopoverContent align="start">
      Aligned to the start.
    </PopoverContent>
  </Popover>

  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">Align Center</Button>
    </PopoverTrigger>
    <PopoverContent align="center">
      Aligned to the center.
    </PopoverContent>
  </Popover>

  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">Align End</Button>
    </PopoverTrigger>
    <PopoverContent align="end">
      Aligned to the end.
    </PopoverContent>
  </Popover>
</template>`}
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
        vueCode={`<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">Top</Button>
    </PopoverTrigger>
    <PopoverContent side="top">
      Opens on top.
    </PopoverContent>
  </Popover>

  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">Right</Button>
    </PopoverTrigger>
    <PopoverContent side="right">
      Opens on right.
    </PopoverContent>
  </Popover>

  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">Left</Button>
    </PopoverTrigger>
    <PopoverContent side="left">
      Opens on left.
    </PopoverContent>
  </Popover>
</template>`}
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
