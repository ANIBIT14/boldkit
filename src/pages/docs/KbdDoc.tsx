import { Kbd, KbdCombo } from '@/components/ui/kbd'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const kbdVariants = cva(
  'inline-flex items-center justify-center font-mono font-bold uppercase border-3 border-foreground',
  {
    variants: {
      variant: {
        default: 'bg-muted shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
        outline: 'bg-background',
        ghost: 'bg-transparent border-transparent text-muted-foreground',
      },
      size: {
        sm: 'min-w-5 h-5 px-1 text-[10px]',
        md: 'min-w-6 h-6 px-1.5 text-xs',
        lg: 'min-w-8 h-8 px-2 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Kbd.displayName = 'Kbd'

export { Kbd, kbdVariants }`

const vueSourceCode = `<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const kbdVariants = cva(
  'inline-flex items-center justify-center font-mono font-bold uppercase border-3 border-foreground',
  {
    variants: {
      variant: {
        default: 'bg-muted shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
        outline: 'bg-background',
        ghost: 'bg-transparent border-transparent text-muted-foreground',
      },
      size: {
        sm: 'min-w-5 h-5 px-1 text-[10px]',
        md: 'min-w-6 h-6 px-1.5 text-xs',
        lg: 'min-w-8 h-8 px-2 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

type KbdVariants = VariantProps<typeof kbdVariants>

interface KbdProps {
  variant?: KbdVariants['variant']
  size?: KbdVariants['size']
  class?: string
}

const props = withDefaults(defineProps<KbdProps>(), {
  variant: 'default',
  size: 'md',
})
</script>

<template>
  <kbd :class="cn(kbdVariants({ variant: props.variant, size: props.size }), props.class)">
    <slot />
  </kbd>
</template>`

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
