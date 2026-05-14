import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/drawer.tsx?raw'
import vueSourceCode from '@vue-ui/Drawer.vue?raw'


const usageCode = `import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

export default function Example() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>Drawer description.</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}`


const vueUsageCode = `<script setup lang="ts">
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui'
import { Button } from '@/components/ui'
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button>Open Drawer</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Drawer Title</DrawerTitle>
        <DrawerDescription>Drawer description.</DrawerDescription>
      </DrawerHeader>
    </DrawerContent>
  </Drawer>
</template>`

export function DrawerDoc() {
  return (
    <>
      <ComponentDoc
        name="Drawer"
        description="A drawer component that slides in from the bottom of the screen with neubrutalism styling."
        dependencies={['vaul']}
        vueDependencies={['vaul-vue']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
        nuxtClientOnly={true}
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Welcome to BoldKit</DrawerTitle>
              <DrawerDescription>
                This is a drawer with neubrutalism styling. Drag down or click outside to close.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </ComponentDoc>

      {/* Basic */}
      <ExampleSection
        title="Basic"
        description="A simple drawer with title and description."
        code={`<Drawer>
  <DrawerTrigger asChild>
    <Button>Open</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>`}
        vueCode={`<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button>Open</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Are you sure?</DrawerTitle>
        <DrawerDescription>This action cannot be undone.</DrawerDescription>
      </DrawerHeader>
    </DrawerContent>
  </Drawer>
</template>`}
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Open</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone. This will permanently delete your account.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Confirm</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </ExampleSection>

      {/* With Form */}
      <ExampleSection
        title="With Form"
        description="Use drawers to collect user input through forms."
        code={`<Drawer>
  <DrawerTrigger asChild>
    <Button>Edit Profile</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Edit Profile</DrawerTitle>
      <DrawerDescription>Make changes to your profile.</DrawerDescription>
    </DrawerHeader>
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Your name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Your email" />
      </div>
    </div>
    <DrawerFooter>
      <Button>Save changes</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
        vueCode={`<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button>Edit Profile</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Edit Profile</DrawerTitle>
        <DrawerDescription>Make changes to your profile.</DrawerDescription>
      </DrawerHeader>
      <div class="p-4 space-y-4">
        <div class="space-y-2">
          <Label for="name">Name</Label>
          <Input id="name" placeholder="Your name" />
        </div>
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="Your email" />
        </div>
      </div>
      <DrawerFooter>
        <Button>Save changes</Button>
        <DrawerClose as-child>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>`}
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Edit Profile</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit Profile</DrawerTitle>
              <DrawerDescription>Make changes to your profile here.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="drawer-name">Name</Label>
                <Input id="drawer-name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="drawer-email">Email</Label>
                <Input id="drawer-email" type="email" placeholder="Your email" />
              </div>
            </div>
            <DrawerFooter>
              <Button>Save changes</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </ExampleSection>

      {/* Responsive Dialog */}
      <ExampleSection
        title="Mobile-Friendly"
        description="Drawers are great for mobile interfaces where bottom sheets feel natural."
        code={`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="secondary">Share</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Share this page</DrawerTitle>
      <DrawerDescription>Choose how you want to share.</DrawerDescription>
    </DrawerHeader>
    <div className="p-4 grid grid-cols-4 gap-4">
      <Button variant="outline" className="flex-col h-auto py-4">
        <span className="text-2xl">📧</span>
        <span className="text-xs mt-1">Email</span>
      </Button>
      <Button variant="outline" className="flex-col h-auto py-4">
        <span className="text-2xl">💬</span>
        <span className="text-xs mt-1">Message</span>
      </Button>
      <Button variant="outline" className="flex-col h-auto py-4">
        <span className="text-2xl">🔗</span>
        <span className="text-xs mt-1">Copy Link</span>
      </Button>
      <Button variant="outline" className="flex-col h-auto py-4">
        <span className="text-2xl">📱</span>
        <span className="text-xs mt-1">QR Code</span>
      </Button>
    </div>
  </DrawerContent>
</Drawer>`}
        vueCode={`<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button variant="secondary">Share</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Share this page</DrawerTitle>
        <DrawerDescription>Choose how you want to share.</DrawerDescription>
      </DrawerHeader>
      <div class="p-4 grid grid-cols-4 gap-4">
        <Button variant="outline" class="flex-col h-auto py-4">
          <span class="text-2xl">📧</span>
          <span class="text-xs mt-1">Email</span>
        </Button>
        <Button variant="outline" class="flex-col h-auto py-4">
          <span class="text-2xl">💬</span>
          <span class="text-xs mt-1">Message</span>
        </Button>
        <Button variant="outline" class="flex-col h-auto py-4">
          <span class="text-2xl">🔗</span>
          <span class="text-xs mt-1">Copy Link</span>
        </Button>
        <Button variant="outline" class="flex-col h-auto py-4">
          <span class="text-2xl">📱</span>
          <span class="text-xs mt-1">QR Code</span>
        </Button>
      </div>
    </DrawerContent>
  </Drawer>
</template>`}
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="secondary">Share</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Share this page</DrawerTitle>
              <DrawerDescription>Choose how you want to share.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 grid grid-cols-4 gap-4">
              <Button variant="outline" className="flex-col h-auto py-4">
                <span className="text-2xl">📧</span>
                <span className="text-xs mt-1">Email</span>
              </Button>
              <Button variant="outline" className="flex-col h-auto py-4">
                <span className="text-2xl">💬</span>
                <span className="text-xs mt-1">Message</span>
              </Button>
              <Button variant="outline" className="flex-col h-auto py-4">
                <span className="text-2xl">🔗</span>
                <span className="text-xs mt-1">Copy Link</span>
              </Button>
              <Button variant="outline" className="flex-col h-auto py-4">
                <span className="text-2xl">📱</span>
                <span className="text-xs mt-1">QR Code</span>
              </Button>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </ExampleSection>
    </>
  )
}
