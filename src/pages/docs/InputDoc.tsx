import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import { Search } from 'lucide-react'

const sourceCode = `import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full border-3 border-foreground bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bk-shadow',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }`

const usageCode = `import { Input } from '@/components/ui/input'

export default function Example() {
  return <Input type="email" placeholder="Email" />
}`

const vueSourceCode = `<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <input
    :class="cn('flex h-11 w-full border-3 border-foreground bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 shadow-[4px_4px_0px_hsl(var(--shadow-color))]', props.class)"
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>`

const vueUsageCode = `<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@/components/ui/input'

const email = ref('')
</script>

<template>
  <Input v-model="email" type="email" placeholder="Email" />
</template>`

export function InputDoc() {
  return (
    <>
      <ComponentDoc
        name="Input"
        description="A text input field with neubrutalism styling featuring bold borders and hard shadows."
        dependencies={[]}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueDependencies={[]}
        vueSourceCode={vueSourceCode}
        vueUsageCode={vueUsageCode}
      >
        <Input type="email" placeholder="Email" className="max-w-sm" />
      </ComponentDoc>

      {/* Default */}
      <ExampleSection
        title="Default"
        code={`<Input placeholder="Enter your name..." />`}
        vueCode={`<Input placeholder="Enter your name..." />`}
      >
        <Input placeholder="Enter your name..." className="max-w-sm" />
      </ExampleSection>

      {/* With Label */}
      <ExampleSection
        title="With Label"
        description="Pair inputs with labels for better accessibility."
        code={`<div className="grid w-full max-w-sm gap-2">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Enter your email" />
</div>`}
        vueCode={`<div class="grid w-full max-w-sm gap-2">
  <Label for="email">Email</Label>
  <Input type="email" id="email" placeholder="Enter your email" />
</div>`}
      >
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Enter your email" />
        </div>
      </ExampleSection>

      {/* With Button */}
      <ExampleSection
        title="With Button"
        description="Combine inputs with buttons for forms."
        code={`<div className="flex w-full max-w-sm gap-2">
  <Input type="email" placeholder="Email" />
  <Button>Subscribe</Button>
</div>`}
        vueCode={`<div class="flex w-full max-w-sm gap-2">
  <Input type="email" placeholder="Email" />
  <Button>Subscribe</Button>
</div>`}
      >
        <div className="flex w-full max-w-sm gap-2">
          <Input type="email" placeholder="Email" />
          <Button>Subscribe</Button>
        </div>
      </ExampleSection>

      {/* File Input */}
      <ExampleSection
        title="File Input"
        code={`<Input type="file" />`}
        vueCode={`<Input type="file" />`}
      >
        <Input type="file" className="max-w-sm" />
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        code={`<Input disabled placeholder="Disabled input" />`}
        vueCode={`<Input disabled placeholder="Disabled input" />`}
      >
        <Input disabled placeholder="Disabled input" className="max-w-sm" />
      </ExampleSection>

      {/* With Icon */}
      <ExampleSection
        title="With Icon"
        description="Add icons inside inputs using wrapper elements."
        code={`<div className="relative max-w-sm">
  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input placeholder="Search..." className="pl-10" />
</div>`}
        vueCode={`<div class="relative max-w-sm">
  <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input placeholder="Search..." class="pl-10" />
</div>`}
      >
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-10" />
        </div>
      </ExampleSection>
    </>
  )
}
