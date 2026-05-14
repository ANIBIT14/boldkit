import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/sheet.tsx?raw'
import vueSourceCode from '@vue-ui/Sheet.vue?raw'


const usageCode = `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export default function Example() {
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This is a sheet description.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}`


const vueUsageCode = `<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui'
import { Button } from '@/components/ui'
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button>Open</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Sheet Title</SheetTitle>
        <SheetDescription>
          This is a sheet description.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>`

export function SheetDoc() {
  return (
    <>
      <ComponentDoc
        name="Sheet"
        description="A slide-out panel that extends from the edge of the screen with bold neubrutalism styling."
        dependencies={['@radix-ui/react-dialog', 'class-variance-authority']}
        vueDependencies={['reka-ui', 'class-variance-authority']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit Profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" defaultValue="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </ComponentDoc>

      {/* Side Variants */}
      <ExampleSection
        title="Side Variants"
        description="The sheet can slide in from different sides of the screen."
        code={`<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Right</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Right Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Left</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Left Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`}
        vueCode={`<script setup>
import { ref } from 'vue'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui'
import { Button } from '@/components/ui'

const rightOpen = ref(false)
const leftOpen = ref(false)
const topOpen = ref(false)
const bottomOpen = ref(false)
</script>

<template>
  <Sheet v-model:open="rightOpen">
    <SheetTrigger as-child>
      <Button variant="outline">Right</Button>
    </SheetTrigger>
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>Right Sheet</SheetTitle>
      </SheetHeader>
    </SheetContent>
  </Sheet>

  <Sheet v-model:open="leftOpen">
    <SheetTrigger as-child>
      <Button variant="outline">Left</Button>
    </SheetTrigger>
    <SheetContent side="left">
      <SheetHeader>
        <SheetTitle>Left Sheet</SheetTitle>
      </SheetHeader>
    </SheetContent>
  </Sheet>

  <Sheet v-model:open="topOpen">
    <SheetTrigger as-child>
      <Button variant="outline">Top</Button>
    </SheetTrigger>
    <SheetContent side="top">
      <SheetHeader>
        <SheetTitle>Top Sheet</SheetTitle>
      </SheetHeader>
    </SheetContent>
  </Sheet>

  <Sheet v-model:open="bottomOpen">
    <SheetTrigger as-child>
      <Button variant="outline">Bottom</Button>
    </SheetTrigger>
    <SheetContent side="bottom">
      <SheetHeader>
        <SheetTitle>Bottom Sheet</SheetTitle>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>`}
      >
        <div className="flex gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Right</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Right Sheet</SheetTitle>
                <SheetDescription>This sheet slides in from the right.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Left</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Left Sheet</SheetTitle>
                <SheetDescription>This sheet slides in from the left.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Top</Button>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>Top Sheet</SheetTitle>
                <SheetDescription>This sheet slides in from the top.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Bottom</Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Bottom Sheet</SheetTitle>
                <SheetDescription>This sheet slides in from the bottom.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </ExampleSection>
    </>
  )
}
