import { Kbd, KbdCombo } from '@/components/ui/kbd'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/kbd.tsx?raw'
import vueSourceCode from '@vue-ui/Kbd.vue?raw'



const usageCode = `import { Kbd, KbdCombo } from '@/components/ui/kbd'

export default function Example() {
  return (
    <>
      <Kbd>K</Kbd>
      <KbdCombo keys={['Ctrl', 'K']} />
    </>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import { Kbd, KbdCombo } from '@/components/ui'
</script>

<template>
  <Kbd>K</Kbd>
  <KbdCombo :keys="['Ctrl', 'K']" />
</template>`

export function KbdDoc() {
  return (
    <>
      <ComponentDoc
        name="Kbd"
        description="Keyboard key indicators for displaying shortcuts and hotkeys with neubrutalism styling."
        dependencies={['class-variance-authority']}
        vueDependencies={['class-variance-authority']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Kbd>K</Kbd>
          <KbdCombo keys={['Ctrl', 'K']} />
        </div>
      </ComponentDoc>

      <ExampleSection
        title="Variants"
        description="Different visual styles for various contexts."
        code={`<Kbd variant="default">Esc</Kbd>
<Kbd variant="outline">Esc</Kbd>
<Kbd variant="ghost">Esc</Kbd>`}
        vueCode={`<template>
  <Kbd variant="default">Esc</Kbd>
  <Kbd variant="outline">Esc</Kbd>
  <Kbd variant="ghost">Esc</Kbd>
</template>`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Kbd variant="default">Esc</Kbd>
            <span className="text-xs font-bold uppercase">Default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Kbd variant="outline">Esc</Kbd>
            <span className="text-xs font-bold uppercase">Outline</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Kbd variant="ghost">Esc</Kbd>
            <span className="text-xs font-bold uppercase">Ghost</span>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Available keyboard indicator sizes."
        code={`<Kbd size="sm">A</Kbd>
<Kbd size="md">A</Kbd>
<Kbd size="lg">A</Kbd>`}
        vueCode={`<template>
  <Kbd size="sm">A</Kbd>
  <Kbd size="md">A</Kbd>
  <Kbd size="lg">A</Kbd>
</template>`}
      >
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col items-center gap-2">
            <Kbd size="sm">A</Kbd>
            <span className="text-xs font-bold uppercase">SM</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Kbd size="md">A</Kbd>
            <span className="text-xs font-bold uppercase">MD</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Kbd size="lg">A</Kbd>
            <span className="text-xs font-bold uppercase">LG</span>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Keyboard Combinations"
        description="Use KbdCombo for multi-key shortcuts."
        code={`<KbdCombo keys={['Ctrl', 'K']} />
<KbdCombo keys={['Cmd', 'Shift', 'P']} />
<KbdCombo keys={['Alt', 'F4']} />`}
        vueCode={`<template>
  <KbdCombo :keys="['Ctrl', 'K']" />
  <KbdCombo :keys="['Cmd', 'Shift', 'P']" />
  <KbdCombo :keys="['Alt', 'F4']" />
</template>`}
      >
        <div className="flex flex-wrap items-center gap-6">
          <KbdCombo keys={['Ctrl', 'K']} />
          <KbdCombo keys={['Cmd', 'Shift', 'P']} />
          <KbdCombo keys={['Alt', 'F4']} />
        </div>
      </ExampleSection>

      <ExampleSection
        title="Common Shortcuts"
        description="Examples of common keyboard shortcuts."
        code={`<p className="flex items-center gap-2">
  Press <KbdCombo keys={['Ctrl', 'S']} /> to save
</p>
<p className="flex items-center gap-2">
  Press <KbdCombo keys={['Ctrl', 'Z']} /> to undo
</p>
<p className="flex items-center gap-2">
  Press <Kbd>Esc</Kbd> to close
</p>`}
        vueCode={`<template>
  <p class="flex items-center gap-2">
    Press <KbdCombo :keys="['Ctrl', 'S']" /> to save
  </p>
  <p class="flex items-center gap-2">
    Press <KbdCombo :keys="['Ctrl', 'Z']" /> to undo
  </p>
  <p class="flex items-center gap-2">
    Press <Kbd>Esc</Kbd> to close
  </p>
</template>`}
      >
        <div className="space-y-3">
          <p className="flex items-center gap-2 text-sm">
            Press <KbdCombo keys={['Ctrl', 'S']} size="sm" /> to save
          </p>
          <p className="flex items-center gap-2 text-sm">
            Press <KbdCombo keys={['Ctrl', 'Z']} size="sm" /> to undo
          </p>
          <p className="flex items-center gap-2 text-sm">
            Press <Kbd size="sm">Esc</Kbd> to close
          </p>
        </div>
      </ExampleSection>
    </>
  )
}
