import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      className={cn('w-full', className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex h-12 items-center justify-center border-3 border-foreground bg-background p-1 text-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap border-2 border-transparent px-4 py-1.5 gap-1.5 text-sm font-bold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-foreground',
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }`

const usageCode = `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Example() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">
        Change your password here.
      </TabsContent>
    </Tabs>
  )
}`

const vueSourceCode = `<script setup lang="ts">
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>

<template>
  <TabsRoot v-bind="$attrs">
    <slot />
  </TabsRoot>
</template>`

const vueUsageCode = `<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
</script>

<template>
  <Tabs default-value="account">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      Make changes to your account here.
    </TabsContent>
    <TabsContent value="password">
      Change your password here.
    </TabsContent>
  </Tabs>
</template>`

export function TabsDoc() {
  return (
    <>
      <ComponentDoc
        name="Tabs"
        description="A tabbed interface component with bold neubrutalism styling for organizing content into selectable panels."
        dependencies={['@radix-ui/react-tabs']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <Tabs defaultValue="account" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <p className="text-sm text-muted-foreground">
              Make changes to your account here. Click save when you're done.
            </p>
          </TabsContent>
          <TabsContent value="password">
            <p className="text-sm text-muted-foreground">
              Change your password here. After saving, you'll be logged out.
            </p>
          </TabsContent>
        </Tabs>
      </ComponentDoc>

      {/* Three Tabs */}
      <ExampleSection
        title="Multiple Tabs"
        description="Tabs with multiple panels."
        code={`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
  <TabsContent value="reports">Reports content</TabsContent>
</Tabs>`}
      >
        <Tabs defaultValue="overview" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="text-sm text-muted-foreground">
              This is the overview panel. It shows a summary of your data.
            </p>
          </TabsContent>
          <TabsContent value="analytics">
            <p className="text-sm text-muted-foreground">
              This is the analytics panel. It shows detailed statistics.
            </p>
          </TabsContent>
          <TabsContent value="reports">
            <p className="text-sm text-muted-foreground">
              This is the reports panel. It shows generated reports.
            </p>
          </TabsContent>
        </Tabs>
      </ExampleSection>

      {/* Disabled Tab */}
      <ExampleSection
        title="Disabled"
        description="A tab that is disabled and cannot be selected."
        code={`<Tabs defaultValue="active">
  <TabsList>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
    <TabsTrigger value="another">Another</TabsTrigger>
  </TabsList>
  <TabsContent value="active">Active tab content</TabsContent>
  <TabsContent value="disabled">Disabled tab content</TabsContent>
  <TabsContent value="another">Another tab content</TabsContent>
</Tabs>`}
      >
        <Tabs defaultValue="active" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="disabled" disabled>
              Disabled
            </TabsTrigger>
            <TabsTrigger value="another">Another</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <p className="text-sm text-muted-foreground">This is the active tab content.</p>
          </TabsContent>
          <TabsContent value="disabled">
            <p className="text-sm text-muted-foreground">This content is not accessible.</p>
          </TabsContent>
          <TabsContent value="another">
            <p className="text-sm text-muted-foreground">This is another tab content.</p>
          </TabsContent>
        </Tabs>
      </ExampleSection>
    </>
  )
}
