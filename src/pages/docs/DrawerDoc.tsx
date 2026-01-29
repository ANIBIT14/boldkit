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

const sourceCode = `import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import { cn } from '@/lib/utils'

const Drawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
)

const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerPortal = DrawerPrimitive.Portal
const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-black/70', className)}
    {...props}
  />
))

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col border-t-3 border-x-3 border-foreground bg-background shadow-[0px_-8px_0px_hsl(var(--shadow-color))]',
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] bg-foreground" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))

// ... DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}`

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

export function DrawerDoc() {
  return (
    <>
      <ComponentDoc
        name="Drawer"
        description="A drawer component that slides in from the bottom of the screen with neubrutalism styling."
        installCommand="npx boldkit-ui add drawer"
        dependencies={['vaul']}
        sourceCode={sourceCode}
        usageCode={usageCode}
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
