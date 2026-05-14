import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/textarea.tsx?raw'
import vueSourceCode from '@vue-ui/Textarea.vue?raw'


const usageCode = `import { Textarea } from '@/components/ui/textarea'

export default function Example() {
  return <Textarea placeholder="Type your message here." />
}`


const vueUsageCode = `<script setup lang="ts">
import { Textarea } from '@/components/ui'
</script>

<template>
  <Textarea placeholder="Type your message here." />
</template>`

export function TextareaDoc() {
  return (
    <>
      <ComponentDoc
        name="Textarea"
        description="A multi-line text input field with bold neubrutalism styling."
        dependencies={[]}
        vueDependencies={[]}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="w-full max-w-md">
          <Textarea placeholder="Type your message here." />
        </div>
      </ComponentDoc>

      {/* With Label */}
      <ExampleSection
        title="With Label"
        description="Textarea with an associated label."
        code={`<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Your Message</Label>
  <Textarea placeholder="Type your message here." id="message" />
</div>`}
        vueCode={`<template>
  <div class="grid w-full gap-1.5">
    <Label for="message">Your Message</Label>
    <Textarea placeholder="Type your message here." id="message" />
  </div>
</template>`}
      >
        <div className="grid w-full max-w-md gap-1.5">
          <Label htmlFor="message">Your Message</Label>
          <Textarea placeholder="Type your message here." id="message" />
        </div>
      </ExampleSection>

      {/* With Helper Text */}
      <ExampleSection
        title="With Helper Text"
        description="Textarea with descriptive helper text below."
        code={`<div className="grid w-full gap-1.5">
  <Label htmlFor="bio">Bio</Label>
  <Textarea placeholder="Tell us about yourself" id="bio" />
  <p className="text-sm text-muted-foreground">
    Your bio will be visible to other users.
  </p>
</div>`}
        vueCode={`<template>
  <div class="grid w-full gap-1.5">
    <Label for="bio">Bio</Label>
    <Textarea placeholder="Tell us about yourself" id="bio" />
    <p class="text-sm text-muted-foreground">
      Your bio will be visible to other users.
    </p>
  </div>
</template>`}
      >
        <div className="grid w-full max-w-md gap-1.5">
          <Label htmlFor="bio">Bio</Label>
          <Textarea placeholder="Tell us about yourself" id="bio" />
          <p className="text-sm text-muted-foreground">
            Your bio will be visible to other users.
          </p>
        </div>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        description="A disabled textarea that cannot be edited."
        code={`<Textarea placeholder="This textarea is disabled" disabled />`}
        vueCode={`<template>
  <Textarea placeholder="This textarea is disabled" disabled />
</template>`}
      >
        <div className="w-full max-w-md">
          <Textarea placeholder="This textarea is disabled" disabled />
        </div>
      </ExampleSection>

      {/* With Default Value */}
      <ExampleSection
        title="Default Value"
        description="Textarea with a pre-filled default value."
        code={`<Textarea defaultValue="This is the default value for the textarea." />`}
        vueCode={`<script setup>
import { ref } from 'vue'
const text = ref('This is the default value for the textarea.')
</script>

<template>
  <Textarea v-model="text" />
</template>`}
      >
        <div className="w-full max-w-md">
          <Textarea defaultValue="This is the default value for the textarea. You can edit this text." />
        </div>
      </ExampleSection>

      {/* Custom Rows */}
      <ExampleSection
        title="Custom Height"
        description="Textarea with custom number of visible rows."
        code={`<Textarea placeholder="This textarea has 6 rows" rows={6} />`}
        vueCode={`<template>
  <Textarea placeholder="This textarea has 6 rows" :rows="6" />
</template>`}
      >
        <div className="w-full max-w-md">
          <Textarea placeholder="This textarea has 6 rows" rows={6} />
        </div>
      </ExampleSection>
    </>
  )
}
