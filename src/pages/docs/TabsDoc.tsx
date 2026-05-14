import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/tabs.tsx?raw'
import vueSourceCode from '@vue-ui/Tabs.vue?raw'


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
        vueCode={`<script setup>
import { ref } from 'vue'
const tab = ref('overview')
</script>

<template>
  <Tabs v-model="tab">
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="analytics">Analytics</TabsTrigger>
      <TabsTrigger value="reports">Reports</TabsTrigger>
    </TabsList>
    <TabsContent value="overview">Overview content</TabsContent>
    <TabsContent value="analytics">Analytics content</TabsContent>
    <TabsContent value="reports">Reports content</TabsContent>
  </Tabs>
</template>`}
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
        vueCode={`<script setup>
import { ref } from 'vue'
const tab = ref('active')
</script>

<template>
  <Tabs v-model="tab">
    <TabsList>
      <TabsTrigger value="active">Active</TabsTrigger>
      <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
      <TabsTrigger value="another">Another</TabsTrigger>
    </TabsList>
    <TabsContent value="active">Active tab content</TabsContent>
    <TabsContent value="disabled">Disabled tab content</TabsContent>
    <TabsContent value="another">Another tab content</TabsContent>
  </Tabs>
</template>`}
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
