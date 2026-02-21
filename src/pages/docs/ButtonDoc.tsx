import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import { Loader2, Mail, ChevronRight } from 'lucide-react'

const sourceCode = `import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-bold uppercase tracking-wide transition-all border-3 border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground bk-shadow bk-hover',
        secondary: 'bg-secondary text-secondary-foreground bk-shadow bk-hover',
        accent: 'bg-accent text-accent-foreground bk-shadow bk-hover',
        destructive: 'bg-destructive text-destructive-foreground bk-shadow bk-hover',
        outline: 'bg-background hover:bg-muted bk-shadow bk-hover',
        ghost: 'border-transparent hover:bg-muted',
        link: 'border-transparent underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-5 py-2',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-12 px-8 text-lg',
        xl: 'h-14 px-10 text-xl',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }`

const vueSourceCode = `<script setup lang="ts">
import { computed } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wide transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-3 border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
        secondary:
          'bg-secondary text-secondary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
        accent:
          'bg-accent text-accent-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
        destructive:
          'bg-destructive text-destructive-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
        outline:
          'bg-background text-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none hover:bg-muted',
        ghost: 'border-transparent shadow-none hover:bg-muted hover:border-foreground',
        link: 'border-transparent shadow-none underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-11 px-5 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-11 w-11',
      },
      animation: {
        none: '',
        pulse: 'animate-[brutal-pulse_2s_ease-in-out_infinite]',
        bounce: 'animate-[brutal-bounce_0.5s_ease-in-out_infinite]',
        shake: 'hover:animate-[brutal-shake_0.4s_ease-in-out]',
        wiggle: 'hover:animate-[brutal-wiggle_0.3s_ease-in-out]',
        pop: 'hover:animate-[brutal-pop_0.2s_ease-out] active:scale-95',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      animation: 'none',
    },
  }
)

type ButtonVariants = VariantProps<typeof buttonVariants>

interface ButtonProps extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  animation?: ButtonVariants['animation']
  class?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  variant: 'default',
  size: 'default',
  animation: 'none',
})

const delegatedProps = computed(() => {
  const { class: _, variant: __, size: ___, animation: ____, ...rest } = props
  return rest
})
</script>

<template>
  <Primitive
    v-bind="delegatedProps"
    :class="cn(buttonVariants({ variant, size, animation }), props.class)"
  >
    <slot />
  </Primitive>
</template>`

const usageCode = `import { Button } from '@/components/ui/button'

export default function Example() {
  return <Button>Click me</Button>
}`

const vueUsageCode = `<script setup lang="ts">
import { Button } from '@/components/ui'
</script>

<template>
  <Button>Click me</Button>
</template>`

export function ButtonDoc() {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <ComponentDoc
        name="Button"
        description="Displays a button or a component that looks like a button with neubrutalism styling."
        dependencies={['@radix-ui/react-slot', 'class-variance-authority']}
        vueDependencies={['reka-ui', 'class-variance-authority']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="flex flex-wrap gap-4">
          <Button>Button</Button>
        </div>
      </ComponentDoc>

      {/* Variants */}
      <ExampleSection
        title="Variants"
        description="The button comes with several variants to match different use cases."
        code={`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
        vueCode={`<template>
  <Button variant="default">Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="accent">Accent</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</template>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection
        title="Sizes"
        description="Buttons are available in different sizes."
        code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon"><Mail className="h-4 w-4" /></Button>`}
        vueCode={`<template>
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
  <Button size="xl">Extra Large</Button>
  <Button size="icon">
    <Mail class="h-4 w-4" />
  </Button>
</template>`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
          <Button size="icon"><Mail className="h-4 w-4" /></Button>
        </div>
      </ExampleSection>

      {/* With Icon */}
      <ExampleSection
        title="With Icon"
        description="Add icons to buttons for better visual feedback."
        code={`<Button>
  <Mail className="mr-2 h-4 w-4" /> Login with Email
</Button>
<Button variant="secondary">
  Next <ChevronRight className="ml-2 h-4 w-4" />
</Button>`}
        vueCode={`<template>
  <Button>
    <Mail class="mr-2 h-4 w-4" /> Login with Email
  </Button>
  <Button variant="secondary">
    Next <ChevronRight class="ml-2 h-4 w-4" />
  </Button>
</template>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button>
            <Mail className="mr-2 h-4 w-4" /> Login with Email
          </Button>
          <Button variant="secondary">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </ExampleSection>

      {/* Loading */}
      <ExampleSection
        title="Loading"
        description="Show a loading state while an action is in progress."
        code={`<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Please wait
</Button>`}
        vueCode={`<script setup>
import { ref } from 'vue'
const loading = ref(false)
</script>

<template>
  <Button disabled>
    <Loader2 class="mr-2 h-4 w-4 animate-spin" />
    Please wait
  </Button>
</template>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
          <Button
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 2000)
            }}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Loading...' : 'Click me'}
          </Button>
        </div>
      </ExampleSection>

      {/* Animations */}
      <ExampleSection
        title="Animations"
        description="Add attention-grabbing animations to your buttons."
        code={`<Button animation="pulse">Pulse</Button>
<Button animation="bounce">Bounce</Button>
<Button animation="shake">Shake (hover)</Button>
<Button animation="wiggle">Wiggle (hover)</Button>
<Button animation="pop">Pop (hover)</Button>`}
        vueCode={`<template>
  <Button animation="pulse">Pulse</Button>
  <Button animation="bounce">Bounce</Button>
  <Button animation="shake">Shake (hover)</Button>
  <Button animation="wiggle">Wiggle (hover)</Button>
  <Button animation="pop">Pop (hover)</Button>
</template>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button animation="pulse">Pulse</Button>
          <Button animation="bounce" variant="secondary">Bounce</Button>
          <Button animation="shake" variant="accent">Shake (hover)</Button>
          <Button animation="wiggle" variant="destructive">Wiggle (hover)</Button>
          <Button animation="pop" variant="outline">Pop (hover)</Button>
        </div>
      </ExampleSection>

      {/* As Child */}
      <ExampleSection
        title="As Child"
        description="Use the asChild prop to render the button as a different element like a link."
        code={`<Button asChild>
  <a href="#">Link styled as Button</a>
</Button>`}
        vueCode={`<template>
  <!-- In Vue, use the 'as' prop to change the element -->
  <Button as="a" href="#">Link styled as Button</Button>
</template>`}
      >
        <Button asChild>
          <a href="#">Link styled as Button</a>
        </Button>
      </ExampleSection>
    </>
  )
}
