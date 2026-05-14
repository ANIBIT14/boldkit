import { Marquee, MarqueeItem, MarqueeSeparator } from '@/components/ui/marquee'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import { Star, Zap, Heart, Rocket } from 'lucide-react'
import sourceCode from '@/components/ui/marquee.tsx?raw'
import vueSourceCode from '@vue-ui/Marquee.vue?raw'


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
        vueCode={`<script setup lang="ts">
import { Star, Zap, Heart } from 'lucide-vue-next'
import { Marquee, MarqueeItem, MarqueeSeparator } from '@/components/ui'
</script>

<template>
  <Marquee>
    <MarqueeItem>
      <Star class="h-5 w-5" /> Featured
    </MarqueeItem>
    <MarqueeSeparator>•</MarqueeSeparator>
    <MarqueeItem>
      <Zap class="h-5 w-5" /> Fast
    </MarqueeItem>
    <MarqueeSeparator>•</MarqueeSeparator>
    <MarqueeItem>
      <Heart class="h-5 w-5" /> Beautiful
    </MarqueeItem>
    <MarqueeSeparator>•</MarqueeSeparator>
  </Marquee>
</template>`}
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
        vueCode={`<template>
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
</template>`}
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
        vueCode={`<script setup lang="ts">
import { Rocket } from 'lucide-vue-next'
import { Marquee, MarqueeItem, MarqueeSeparator } from '@/components/ui'
</script>

<template>
  <Marquee direction="right">
    <MarqueeItem>
      <Rocket class="h-5 w-5" /> Scrolling Right
    </MarqueeItem>
    <MarqueeSeparator />
  </Marquee>
</template>`}
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
        vueCode={`<template>
  <Marquee :bordered="false" class="bg-primary text-primary-foreground">
    <MarqueeItem>Sale Ends Soon</MarqueeItem>
    <MarqueeSeparator class="text-primary-foreground/50">★</MarqueeSeparator>
    <MarqueeItem>50% Off Everything</MarqueeItem>
    <MarqueeSeparator class="text-primary-foreground/50">★</MarqueeSeparator>
  </Marquee>
</template>`}
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
        vueCode={`<template>
  <Marquee :bordered="false" class="bg-accent text-accent-foreground border-y-3 border-foreground">
    <MarqueeItem>New Feature Released</MarqueeItem>
    <MarqueeSeparator>→</MarqueeSeparator>
    <MarqueeItem>Check out the docs</MarqueeItem>
    <MarqueeSeparator>→</MarqueeSeparator>
  </Marquee>
</template>`}
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
