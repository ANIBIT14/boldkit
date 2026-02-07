import { Marquee, MarqueeItem, MarqueeSeparator } from '@/components/ui/marquee'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import { Star, Zap, Heart, Rocket } from 'lucide-react'

const sourceCode = `import * as React from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  direction?: 'left' | 'right'
  speed?: 'slow' | 'normal' | 'fast'
  pauseOnHover?: boolean
  bordered?: boolean
  repeat?: number
}

const speedClasses = {
  slow: 'animate-marquee-slow',
  normal: 'animate-marquee',
  fast: 'animate-marquee-fast',
}

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  ({ className, children, direction = 'left', speed = 'normal', pauseOnHover = true, bordered = true, repeat = 4, ...props }, ref) => {
    const animationClass = direction === 'right' ? 'animate-marquee-reverse' : speedClasses[speed]

    return (
      <div
        ref={ref}
        className={cn(
          'flex overflow-hidden',
          bordered && 'border-3 border-foreground bg-background',
          className
        )}
        {...props}
      >
        <div className={cn('marquee-content flex shrink-0 items-center gap-8 py-3', animationClass)}>
          {Array.from({ length: repeat }).map((_, i) => (
            <React.Fragment key={i}>{children}</React.Fragment>
          ))}
        </div>
        <div className={cn('marquee-content flex shrink-0 items-center gap-8 py-3', animationClass)} aria-hidden="true">
          {Array.from({ length: repeat }).map((_, i) => (
            <React.Fragment key={i}>{children}</React.Fragment>
          ))}
        </div>
      </div>
    )
  }
)
Marquee.displayName = 'Marquee'

const MarqueeItem = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, children, ...props }, ref) => (
    <span ref={ref} className={cn('inline-flex items-center gap-2 whitespace-nowrap px-4 text-lg font-bold uppercase tracking-wide', className)} {...props}>
      {children}
    </span>
  )
)
MarqueeItem.displayName = 'MarqueeItem'

const MarqueeSeparator = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, children = '/', ...props }, ref) => (
    <span ref={ref} className={cn('text-2xl font-black text-muted-foreground', className)} {...props}>
      {children}
    </span>
  )
)
MarqueeSeparator.displayName = 'MarqueeSeparator'

export { Marquee, MarqueeItem, MarqueeSeparator }`

const usageCode = `import { Marquee, MarqueeItem, MarqueeSeparator } from '@/components/ui/marquee'

export default function Example() {
  return (
    <Marquee>
      <MarqueeItem>Welcome to BoldKit</MarqueeItem>
      <MarqueeSeparator />
      <MarqueeItem>Neubrutalism UI</MarqueeItem>
      <MarqueeSeparator />
      <MarqueeItem>Bold & Beautiful</MarqueeItem>
      <MarqueeSeparator />
    </Marquee>
  )
}`

const vueSourceCode = `<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
  direction?: 'left' | 'right'
  speed?: 'slow' | 'normal' | 'fast'
  pauseOnHover?: boolean
  bordered?: boolean
  repeat?: number
}>()

const speedClasses = {
  slow: 'animate-marquee-slow',
  normal: 'animate-marquee',
  fast: 'animate-marquee-fast',
}
</script>

<!-- Marquee -->
<template>
  <div
    :class="cn(
      'flex overflow-hidden',
      bordered !== false && 'border-3 border-foreground bg-background',
      props.class
    )"
  >
    <div :class="cn('marquee-content flex shrink-0 items-center gap-8 py-3', direction === 'right' ? 'animate-marquee-reverse' : speedClasses[speed ?? 'normal'])">
      <template v-for="i in (repeat ?? 4)" :key="i">
        <slot />
      </template>
    </div>
    <div :class="cn('marquee-content flex shrink-0 items-center gap-8 py-3', direction === 'right' ? 'animate-marquee-reverse' : speedClasses[speed ?? 'normal'])" aria-hidden="true">
      <template v-for="i in (repeat ?? 4)" :key="i">
        <slot />
      </template>
    </div>
  </div>
</template>

<!-- MarqueeItem -->
<template>
  <span :class="cn('inline-flex items-center gap-2 whitespace-nowrap px-4 text-lg font-bold uppercase tracking-wide', props.class)">
    <slot />
  </span>
</template>

<!-- MarqueeSeparator -->
<template>
  <span :class="cn('text-2xl font-black text-muted-foreground', props.class)">
    <slot>/</slot>
  </span>
</template>`

const vueUsageCode = `<script setup lang="ts">
import { Marquee, MarqueeItem, MarqueeSeparator } from '@/components/ui'
</script>

<template>
  <Marquee>
    <MarqueeItem>Welcome to BoldKit</MarqueeItem>
    <MarqueeSeparator />
    <MarqueeItem>Neubrutalism UI</MarqueeItem>
    <MarqueeSeparator />
    <MarqueeItem>Bold & Beautiful</MarqueeItem>
    <MarqueeSeparator />
  </Marquee>
</template>`

export function MarqueeDoc() {
  return (
    <>
      <ComponentDoc
        name="Marquee"
        description="Auto-scrolling text ticker with neubrutalism styling - a common brutalist design element for announcements and emphasis."
        dependencies={[]}
        vueDependencies={[]}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <Marquee>
          <MarqueeItem>Welcome to BoldKit</MarqueeItem>
          <MarqueeSeparator />
          <MarqueeItem>Neubrutalism UI</MarqueeItem>
          <MarqueeSeparator />
          <MarqueeItem>Bold & Beautiful</MarqueeItem>
          <MarqueeSeparator />
        </Marquee>
      </ComponentDoc>

      {/* With Icons */}
      <ExampleSection
        title="With Icons"
        description="Add icons to marquee items for visual interest."
        code={`<Marquee>
  <MarqueeItem>
    <Star className="h-5 w-5" /> Featured
  </MarqueeItem>
  <MarqueeSeparator>•</MarqueeSeparator>
  <MarqueeItem>
    <Zap className="h-5 w-5" /> Fast
  </MarqueeItem>
  <MarqueeSeparator>•</MarqueeSeparator>
  <MarqueeItem>
    <Heart className="h-5 w-5" /> Beautiful
  </MarqueeItem>
  <MarqueeSeparator>•</MarqueeSeparator>
</Marquee>`}
      >
        <Marquee>
          <MarqueeItem>
            <Star className="h-5 w-5" /> Featured
          </MarqueeItem>
          <MarqueeSeparator>•</MarqueeSeparator>
          <MarqueeItem>
            <Zap className="h-5 w-5" /> Fast
          </MarqueeItem>
          <MarqueeSeparator>•</MarqueeSeparator>
          <MarqueeItem>
            <Heart className="h-5 w-5" /> Beautiful
          </MarqueeItem>
          <MarqueeSeparator>•</MarqueeSeparator>
        </Marquee>
      </ExampleSection>

      {/* Speed Variants */}
      <ExampleSection
        title="Speed Variants"
        description="Control the scrolling speed with slow, normal, or fast options."
        code={`<Marquee speed="slow">
  <MarqueeItem>Slow Scrolling</MarqueeItem>
  <MarqueeSeparator />
</Marquee>

<Marquee speed="normal">
  <MarqueeItem>Normal Speed</MarqueeItem>
  <MarqueeSeparator />
</Marquee>

<Marquee speed="fast">
  <MarqueeItem>Fast Scrolling</MarqueeItem>
  <MarqueeSeparator />
</Marquee>`}
      >
        <div className="space-y-4">
          <Marquee speed="slow">
            <MarqueeItem>Slow Scrolling</MarqueeItem>
            <MarqueeSeparator />
          </Marquee>
          <Marquee speed="normal">
            <MarqueeItem>Normal Speed</MarqueeItem>
            <MarqueeSeparator />
          </Marquee>
          <Marquee speed="fast">
            <MarqueeItem>Fast Scrolling</MarqueeItem>
            <MarqueeSeparator />
          </Marquee>
        </div>
      </ExampleSection>

      {/* Reverse Direction */}
      <ExampleSection
        title="Reverse Direction"
        description="Scroll content in the opposite direction."
        code={`<Marquee direction="right">
  <MarqueeItem>
    <Rocket className="h-5 w-5" /> Scrolling Right
  </MarqueeItem>
  <MarqueeSeparator />
</Marquee>`}
      >
        <Marquee direction="right">
          <MarqueeItem>
            <Rocket className="h-5 w-5" /> Scrolling Right
          </MarqueeItem>
          <MarqueeSeparator />
        </Marquee>
      </ExampleSection>

      {/* Without Border */}
      <ExampleSection
        title="Without Border"
        description="Remove the border for a cleaner look."
        code={`<Marquee bordered={false} className="bg-primary text-primary-foreground">
  <MarqueeItem>Sale Ends Soon</MarqueeItem>
  <MarqueeSeparator className="text-primary-foreground/50">★</MarqueeSeparator>
  <MarqueeItem>50% Off Everything</MarqueeItem>
  <MarqueeSeparator className="text-primary-foreground/50">★</MarqueeSeparator>
</Marquee>`}
      >
        <Marquee bordered={false} className="bg-primary text-primary-foreground">
          <MarqueeItem>Sale Ends Soon</MarqueeItem>
          <MarqueeSeparator className="text-primary-foreground/50">★</MarqueeSeparator>
          <MarqueeItem>50% Off Everything</MarqueeItem>
          <MarqueeSeparator className="text-primary-foreground/50">★</MarqueeSeparator>
        </Marquee>
      </ExampleSection>

      {/* Announcement Banner */}
      <ExampleSection
        title="Announcement Banner"
        description="Use as an announcement banner with accent colors."
        code={`<Marquee bordered={false} className="bg-accent text-accent-foreground border-y-3 border-foreground">
  <MarqueeItem>New Feature Released</MarqueeItem>
  <MarqueeSeparator>→</MarqueeSeparator>
  <MarqueeItem>Check out the docs</MarqueeItem>
  <MarqueeSeparator>→</MarqueeSeparator>
</Marquee>`}
      >
        <Marquee bordered={false} className="bg-accent text-accent-foreground border-y-3 border-foreground">
          <MarqueeItem>New Feature Released</MarqueeItem>
          <MarqueeSeparator>→</MarqueeSeparator>
          <MarqueeItem>Check out the docs</MarqueeItem>
          <MarqueeSeparator>→</MarqueeSeparator>
        </Marquee>
      </ExampleSection>
    </>
  )
}
