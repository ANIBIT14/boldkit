import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from 'lucide-react'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { toggleVariants } from '@/components/ui/toggle'

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: 'default',
  variant: 'default',
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn('flex items-center justify-center gap-1', className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }`

const usageCode = `import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

export default function Example() {
  return (
    <ToggleGroup type="single">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}`

const vueSourceCode = `<script setup lang="ts">
import { ToggleGroupRoot, ToggleGroupItem as ToggleGroupItemPrimitive } from 'reka-ui'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { toggleVariants } from './Toggle.vue'
import { provide, inject, type InjectionKey } from 'vue'

type ToggleGroupContext = VariantProps<typeof toggleVariants>
const toggleGroupKey: InjectionKey<ToggleGroupContext> = Symbol('toggleGroup')

defineProps<{
  class?: string
  variant?: ToggleGroupContext['variant']
  size?: ToggleGroupContext['size']
}>()

provide(toggleGroupKey, { variant: props.variant, size: props.size })
</script>

<!-- ToggleGroup -->
<template>
  <ToggleGroupRoot :class="cn('flex items-center justify-center gap-1', props.class)" v-bind="$attrs">
    <slot />
  </ToggleGroupRoot>
</template>

<!-- ToggleGroupItem -->
<script setup lang="ts">
const context = inject(toggleGroupKey, { size: 'default', variant: 'default' })

defineProps<{
  class?: string
  value: string
  variant?: ToggleGroupContext['variant']
  size?: ToggleGroupContext['size']
}>()
</script>

<template>
  <ToggleGroupItemPrimitive
    :value="value"
    :class="cn(
      toggleVariants({
        variant: context.variant ?? variant,
        size: context.size ?? size,
      }),
      props.class
    )"
    v-bind="$attrs"
  >
    <slot />
  </ToggleGroupItemPrimitive>
</template>`

const vueUsageCode = `<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@/components/ui'
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-vue-next'
</script>

<template>
  <ToggleGroup type="single">
    <ToggleGroupItem value="left" aria-label="Align left">
      <AlignLeft class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="center" aria-label="Align center">
      <AlignCenter class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="right" aria-label="Align right">
      <AlignRight class="h-4 w-4" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>`

export function ToggleGroupDoc() {
  return (
    <>
      <ComponentDoc
        name="Toggle Group"
        description="A group of toggle buttons where only one or multiple can be selected with bold neubrutalism styling."
        dependencies={['@radix-ui/react-toggle-group']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </ComponentDoc>

      {/* Single Selection */}
      <ExampleSection
        title="Single"
        description="Only one item can be selected at a time."
        code={`<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left" aria-label="Align left">
    <AlignLeft className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">
    <AlignCenter className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">
    <AlignRight className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`}
      >
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </ExampleSection>

      {/* Multiple Selection */}
      <ExampleSection
        title="Multiple"
        description="Multiple items can be selected at the same time."
        code={`<ToggleGroup type="multiple" defaultValue={['bold']}>
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <Bold className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <Italic className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">
    <Underline className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`}
      >
        <ToggleGroup type="multiple" defaultValue={['bold']}>
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </ExampleSection>

      {/* Outline Variant */}
      <ExampleSection
        title="Outline"
        description="Toggle group with outline variant styling."
        code={`<ToggleGroup type="single" variant="outline" defaultValue="left">
  <ToggleGroupItem value="left" aria-label="Align left">
    <AlignLeft className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">
    <AlignCenter className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">
    <AlignRight className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`}
      >
        <ToggleGroup type="single" variant="outline" defaultValue="left">
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection
        title="Sizes"
        description="Toggle groups in different sizes."
        code={`<ToggleGroup type="single" size="sm">
  ...
</ToggleGroup>

<ToggleGroup type="single" size="default">
  ...
</ToggleGroup>

<ToggleGroup type="single" size="lg">
  ...
</ToggleGroup>`}
      >
        <div className="flex flex-col gap-4">
          <ToggleGroup type="single" size="sm" defaultValue="left">
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="single" size="default" defaultValue="center">
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="single" size="lg" defaultValue="right">
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        description="A disabled toggle group item."
        code={`<ToggleGroup type="single" defaultValue="left">
  <ToggleGroupItem value="left" aria-label="Align left">
    <AlignLeft className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center" disabled>
    <AlignCenter className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">
    <AlignRight className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`}
      >
        <ToggleGroup type="single" defaultValue="left">
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center" disabled>
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </ExampleSection>
    </>
  )
}
