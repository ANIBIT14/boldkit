import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/card.tsx?raw'
import vueSourceCode from '@vue-ui/Card.vue?raw'


const usageCode = `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}`


const vueUsageCode = `<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Card Content</p>
    </CardContent>
    <CardFooter>
      <p>Card Footer</p>
    </CardFooter>
  </Card>
</template>`

export function CardDoc() {
  return (
    <>
      <ComponentDoc
        name="Card"
        description="The BoldKit Card is a neubrutalism content container with a thick 3px border and hard offset shadow that grounds it on the page. It ships with CardHeader, CardContent, and CardFooter subcomponents for structured layouts. Use it to group related information, form fields, or media in a visually bold, cohesive block."
        dependencies={[]}
        vueDependencies={[]}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </ComponentDoc>

      {/* With Form */}
      <ExampleSection
        title="With Form"
        description="Use cards to group form elements."
        code={`<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Create Account</CardTitle>
    <CardDescription>Enter your details below</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="John Doe" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>
    </div>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Create Account</Button>
  </CardFooter>
</Card>`}
        vueCode={`<template>
  <Card class="w-[350px]">
    <CardHeader>
      <CardTitle>Create Account</CardTitle>
      <CardDescription>Enter your details below</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input id="name" placeholder="John Doe" />
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" />
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full">Create Account</Button>
    </CardFooter>
  </Card>
</template>`}
      >
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Enter your details below</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email2">Email</Label>
                <Input id="email2" type="email" placeholder="john@example.com" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Create Account</Button>
          </CardFooter>
        </Card>
      </ExampleSection>

      {/* Colored Header */}
      <ExampleSection
        title="Colored Header"
        description="Add background colors to headers for emphasis."
        code={`<Card className="w-[350px]">
  <CardHeader className="bg-primary">
    <CardTitle>Featured</CardTitle>
  </CardHeader>
  <CardContent className="pt-6">
    <p>This card has a colored header.</p>
  </CardContent>
</Card>`}
        vueCode={`<template>
  <Card class="w-[350px]">
    <CardHeader class="bg-primary">
      <CardTitle>Featured</CardTitle>
    </CardHeader>
    <CardContent class="pt-6">
      <p>This card has a colored header.</p>
    </CardContent>
  </Card>
</template>`}
      >
        <Card className="w-[350px]">
          <CardHeader className="bg-primary">
            <CardTitle>Featured</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p>This card has a colored header.</p>
          </CardContent>
        </Card>
      </ExampleSection>
    </>
  )
}
