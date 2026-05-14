import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/avatar.tsx?raw'
import vueSourceCode from '@vue-ui/Avatar.vue?raw'


const usageCode = `import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Example() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`


const vueUsageCode = `<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
</script>

<template>
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</template>`

export function AvatarDoc() {
  return (
    <>
      <ComponentDoc
        name="Avatar"
        description="An image element with a fallback for representing the user with bold neubrutalism borders."
        dependencies={['@radix-ui/react-avatar']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </ComponentDoc>

      {/* With Image */}
      <ExampleSection
        title="With Image"
        description="Display a user's profile picture."
        code={`<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`}
        vueCode={`<template>
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</template>`}
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </ExampleSection>

      {/* Fallback */}
      <ExampleSection
        title="Fallback"
        description="Shows initials when image fails to load or is not provided."
        code={`<Avatar>
  <AvatarImage src="/broken-image.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`}
        vueCode={`<template>
  <Avatar>
    <AvatarImage src="/broken-image.jpg" alt="User" />
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
</template>`}
      >
        <Avatar>
          <AvatarImage src="/broken-image.jpg" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </ExampleSection>

      {/* Different Sizes */}
      <ExampleSection
        title="Sizes"
        description="Avatars can be customized to different sizes using className."
        code={`<Avatar className="h-8 w-8">
  <AvatarFallback>SM</AvatarFallback>
</Avatar>
<Avatar className="h-10 w-10">
  <AvatarFallback>MD</AvatarFallback>
</Avatar>
<Avatar className="h-14 w-14">
  <AvatarFallback>LG</AvatarFallback>
</Avatar>
<Avatar className="h-20 w-20">
  <AvatarFallback>XL</AvatarFallback>
</Avatar>`}
        vueCode={`<template>
  <div class="flex items-center gap-4">
    <Avatar class="h-8 w-8">
      <AvatarFallback>SM</AvatarFallback>
    </Avatar>
    <Avatar class="h-10 w-10">
      <AvatarFallback>MD</AvatarFallback>
    </Avatar>
    <Avatar class="h-14 w-14">
      <AvatarFallback>LG</AvatarFallback>
    </Avatar>
    <Avatar class="h-20 w-20">
      <AvatarFallback>XL</AvatarFallback>
    </Avatar>
  </div>
</template>`}
      >
        <div className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">SM</AvatarFallback>
          </Avatar>
          <Avatar className="h-10 w-10">
            <AvatarFallback className="text-sm">MD</AvatarFallback>
          </Avatar>
          <Avatar className="h-14 w-14">
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-xl">XL</AvatarFallback>
          </Avatar>
        </div>
      </ExampleSection>

      {/* Avatar Group */}
      <ExampleSection
        title="Avatar Group"
        description="Stack multiple avatars together for a group display with overlapping effect."
        code={`<div className="flex items-center">
  <Avatar className="ring-2 ring-background z-40">
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar className="ring-2 ring-background -ml-3 z-30">
    <AvatarFallback className="bg-secondary">JD</AvatarFallback>
  </Avatar>
  <Avatar className="ring-2 ring-background -ml-3 z-20">
    <AvatarFallback className="bg-accent">AB</AvatarFallback>
  </Avatar>
  <Avatar className="ring-2 ring-background -ml-3 z-10">
    <AvatarFallback className="bg-muted text-muted-foreground text-xs">+3</AvatarFallback>
  </Avatar>
</div>`}
        vueCode={`<template>
  <div class="flex items-center">
    <Avatar class="ring-2 ring-background z-40">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar class="ring-2 ring-background -ml-3 z-30">
      <AvatarFallback class="bg-secondary">JD</AvatarFallback>
    </Avatar>
    <Avatar class="ring-2 ring-background -ml-3 z-20">
      <AvatarFallback class="bg-accent">AB</AvatarFallback>
    </Avatar>
    <Avatar class="ring-2 ring-background -ml-3 z-10">
      <AvatarFallback class="bg-muted text-muted-foreground text-xs">+3</AvatarFallback>
    </Avatar>
  </div>
</template>`}
      >
        <div className="flex items-center">
          <Avatar className="ring-2 ring-background z-40">
            <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="ring-2 ring-background -ml-3 z-30">
            <AvatarFallback className="bg-secondary">JD</AvatarFallback>
          </Avatar>
          <Avatar className="ring-2 ring-background -ml-3 z-20">
            <AvatarFallback className="bg-accent">AB</AvatarFallback>
          </Avatar>
          <Avatar className="ring-2 ring-background -ml-3 z-10">
            <AvatarFallback className="bg-muted text-muted-foreground text-xs">+3</AvatarFallback>
          </Avatar>
        </div>
      </ExampleSection>

      {/* Custom Fallback Colors */}
      <ExampleSection
        title="Custom Colors"
        description="Customize the fallback background color for different users."
        code={`<Avatar>
  <AvatarFallback className="bg-primary">AB</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback className="bg-secondary text-secondary-foreground">CD</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback className="bg-accent text-accent-foreground">EF</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback className="bg-destructive text-destructive-foreground">GH</AvatarFallback>
</Avatar>`}
        vueCode={`<template>
  <div class="flex items-center gap-4">
    <Avatar>
      <AvatarFallback class="bg-primary">AB</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback class="bg-secondary text-secondary-foreground">CD</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback class="bg-accent text-accent-foreground">EF</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback class="bg-destructive text-destructive-foreground">GH</AvatarFallback>
    </Avatar>
  </div>
</template>`}
      >
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback className="bg-primary">AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-secondary text-secondary-foreground">CD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-accent text-accent-foreground">EF</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-destructive text-destructive-foreground">GH</AvatarFallback>
          </Avatar>
        </div>
      </ExampleSection>
    </>
  )
}
