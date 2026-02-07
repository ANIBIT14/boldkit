import { Separator } from '@/components/ui/separator'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cn } from '@/lib/utils'

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-foreground',
        orientation === 'horizontal' ? 'h-[3px] w-full' : 'h-full w-[3px]',
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }`

const usageCode = `import { Separator } from '@/components/ui/separator'

export default function Example() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-bold">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="text-sm">More content here</div>
    </div>
  )
}`

const vueSourceCode = `<script setup lang="ts">
import { Separator as SeparatorPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: string
  orientation?: 'horizontal' | 'vertical'
}>(), {
  orientation: 'horizontal',
})
</script>

<template>
  <SeparatorPrimitive
    :class="cn(
      'shrink-0 bg-foreground',
      orientation === 'horizontal' ? 'h-[3px] w-full' : 'h-full w-[3px]',
      props.class
    )"
    :orientation="orientation"
  />
</template>`

const vueUsageCode = `<script setup lang="ts">
import { Separator } from '@/components/ui'
</script>

<template>
  <div>
    <div class="space-y-1">
      <h4 class="text-sm font-bold">Radix Primitives</h4>
      <p class="text-sm text-muted-foreground">
        An open-source UI component library.
      </p>
    </div>
    <Separator class="my-4" />
    <div class="text-sm">More content here</div>
  </div>
</template>`

export function SeparatorDoc() {
  return (
    <>
      <ComponentDoc
        name="Separator"
        description="Visually or semantically separates content with a bold 3px line."
        dependencies={['@radix-ui/react-separator']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold uppercase tracking-wide leading-none">BoldKit UI</h4>
            <p className="text-sm text-muted-foreground">
              A neubrutalism UI component library.
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Docs</div>
            <Separator orientation="vertical" />
            <div>Source</div>
            <Separator orientation="vertical" />
            <div>Blog</div>
          </div>
        </div>
      </ComponentDoc>

      {/* Horizontal */}
      <ExampleSection
        title="Horizontal"
        description="A horizontal separator to divide vertical content."
        code={`<div>
  <h4 className="font-bold">Section 1</h4>
  <p className="text-sm text-muted-foreground">Content for section 1.</p>
</div>
<Separator className="my-4" />
<div>
  <h4 className="font-bold">Section 2</h4>
  <p className="text-sm text-muted-foreground">Content for section 2.</p>
</div>`}
      >
        <div className="max-w-md">
          <div>
            <h4 className="font-bold uppercase tracking-wide">Section 1</h4>
            <p className="text-sm text-muted-foreground">This is the content for section 1.</p>
          </div>
          <Separator className="my-4" />
          <div>
            <h4 className="font-bold uppercase tracking-wide">Section 2</h4>
            <p className="text-sm text-muted-foreground">This is the content for section 2.</p>
          </div>
        </div>
      </ExampleSection>

      {/* Vertical */}
      <ExampleSection
        title="Vertical"
        description="A vertical separator to divide horizontal content."
        code={`<div className="flex h-5 items-center space-x-4 text-sm">
  <div>Blog</div>
  <Separator orientation="vertical" />
  <div>Docs</div>
  <Separator orientation="vertical" />
  <div>Source</div>
</div>`}
      >
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div className="font-medium">Blog</div>
          <Separator orientation="vertical" />
          <div className="font-medium">Docs</div>
          <Separator orientation="vertical" />
          <div className="font-medium">Source</div>
        </div>
      </ExampleSection>

      {/* In a Card */}
      <ExampleSection
        title="In a Card"
        description="Use separators to divide content within cards."
        code={`<div className="border-3 border-foreground p-4 bk-shadow max-w-sm">
  <div className="flex items-center justify-between">
    <h3 className="font-bold uppercase">Profile</h3>
    <button className="text-sm text-primary">Edit</button>
  </div>
  <Separator className="my-4" />
  <div className="space-y-3">
    <div className="flex justify-between">
      <span className="text-sm text-muted-foreground">Name</span>
      <span className="text-sm font-medium">John Doe</span>
    </div>
    <div className="flex justify-between">
      <span className="text-sm text-muted-foreground">Email</span>
      <span className="text-sm font-medium">john@example.com</span>
    </div>
  </div>
  <Separator className="my-4" />
  <div className="flex justify-end">
    <button className="text-sm text-destructive">Delete Account</button>
  </div>
</div>`}
      >
        <div className="border-3 border-foreground p-4 bk-shadow max-w-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold uppercase tracking-wide">Profile</h3>
            <button className="text-sm text-primary font-bold uppercase">Edit</button>
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Name</span>
              <span className="text-sm font-medium">John Doe</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="text-sm font-medium">john@example.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Role</span>
              <span className="text-sm font-medium">Administrator</span>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-end">
            <button className="text-sm text-destructive font-bold uppercase">Delete Account</button>
          </div>
        </div>
      </ExampleSection>

      {/* Navigation */}
      <ExampleSection
        title="Navigation"
        description="Separate navigation items in a menu."
        code={`<nav className="space-y-1">
  <a href="#" className="block py-2 font-medium">Dashboard</a>
  <a href="#" className="block py-2 font-medium">Analytics</a>
  <Separator className="my-2" />
  <a href="#" className="block py-2 font-medium">Settings</a>
  <a href="#" className="block py-2 font-medium">Help</a>
  <Separator className="my-2" />
  <a href="#" className="block py-2 text-destructive font-medium">Logout</a>
</nav>`}
      >
        <nav className="space-y-1 max-w-xs">
          <a href="#" className="block py-2 font-medium hover:text-primary transition-colors">Dashboard</a>
          <a href="#" className="block py-2 font-medium hover:text-primary transition-colors">Analytics</a>
          <a href="#" className="block py-2 font-medium hover:text-primary transition-colors">Reports</a>
          <Separator className="my-2" />
          <a href="#" className="block py-2 font-medium hover:text-primary transition-colors">Settings</a>
          <a href="#" className="block py-2 font-medium hover:text-primary transition-colors">Help</a>
          <Separator className="my-2" />
          <a href="#" className="block py-2 text-destructive font-medium">Logout</a>
        </nav>
      </ExampleSection>

      {/* With Text */}
      <ExampleSection
        title="With Text"
        description="Create a separator with text in the middle."
        code={`<div className="relative">
  <div className="absolute inset-0 flex items-center">
    <Separator className="w-full" />
  </div>
  <div className="relative flex justify-center text-xs uppercase">
    <span className="bg-background px-2 text-muted-foreground font-bold">
      Or continue with
    </span>
  </div>
</div>`}
      >
        <div className="max-w-md">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground font-bold tracking-wide">
                Or continue with
              </span>
            </div>
          </div>
        </div>
      </ExampleSection>
    </>
  )
}
