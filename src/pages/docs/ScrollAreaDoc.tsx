import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { cn } from '@/lib/utils'

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' &&
        'h-full w-3 border-l-3 border-l-transparent p-[1px]',
      orientation === 'horizontal' &&
        'h-3 flex-col border-t-3 border-t-transparent p-[1px]',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 bg-foreground" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }`

const usageCode = `import { ScrollArea } from '@/components/ui/scroll-area'

export default function Example() {
  return (
    <ScrollArea className="h-[200px] w-[350px] border-3 border-foreground p-4">
      <div>
        {/* Long content here */}
      </div>
    </ScrollArea>
  )
}`

const vueSourceCode = `<script setup lang="ts">
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaCorner } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
  orientation?: 'vertical' | 'horizontal'
}>()
</script>

<template>
  <ScrollAreaRoot :class="cn('relative overflow-hidden', props.class)">
    <ScrollAreaViewport class="h-full w-full rounded-[inherit]">
      <slot />
    </ScrollAreaViewport>
    <ScrollAreaScrollbar
      :orientation="orientation ?? 'vertical'"
      :class="cn(
        'flex touch-none select-none transition-colors',
        orientation === 'horizontal'
          ? 'h-3 flex-col border-t-3 border-t-transparent p-[1px]'
          : 'h-full w-3 border-l-3 border-l-transparent p-[1px]'
      )"
    >
      <ScrollAreaThumb class="relative flex-1 bg-foreground" />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>`

const vueUsageCode = `<script setup lang="ts">
import { ScrollArea } from '@/components/ui'
</script>

<template>
  <ScrollArea class="h-[200px] w-[350px] border-3 border-foreground p-4">
    <div>
      <!-- Long content here -->
    </div>
  </ScrollArea>
</template>`

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `Tag ${a.length - i}`
)

const artworks = [
  { artist: 'Pablo Picasso', art: 'Guernica' },
  { artist: 'Vincent van Gogh', art: 'Starry Night' },
  { artist: 'Leonardo da Vinci', art: 'Mona Lisa' },
  { artist: 'Edvard Munch', art: 'The Scream' },
  { artist: 'Claude Monet', art: 'Water Lilies' },
  { artist: 'Salvador Dali', art: 'The Persistence of Memory' },
  { artist: 'Michelangelo', art: 'The Creation of Adam' },
  { artist: 'Johannes Vermeer', art: 'Girl with a Pearl Earring' },
  { artist: 'Rembrandt', art: 'The Night Watch' },
  { artist: 'Frida Kahlo', art: 'The Two Fridas' },
]

export function ScrollAreaDoc() {
  return (
    <>
      <ComponentDoc
        name="Scroll Area"
        description="Augments native scroll functionality for custom, cross-browser styling with bold scrollbar design."
        registryName="scroll-area"
        dependencies={['@radix-ui/react-scroll-area']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <ScrollArea className="h-72 w-48 border-3 border-foreground bk-shadow">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide leading-none">Tags</h4>
            {tags.slice(0, 15).map((tag) => (
              <div key={tag}>
                <div className="text-sm">{tag}</div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </ComponentDoc>

      {/* Vertical Scroll */}
      <ExampleSection
        title="Vertical Scroll"
        description="A vertically scrollable area for long content."
        code={`<ScrollArea className="h-72 w-48 border-3 border-foreground">
  <div className="p-4">
    <h4 className="mb-4 font-bold uppercase">Tags</h4>
    {tags.map((tag) => (
      <div key={tag}>
        <div className="text-sm">{tag}</div>
        <Separator className="my-2" />
      </div>
    ))}
  </div>
</ScrollArea>`}
      >
        <ScrollArea className="h-72 w-48 border-3 border-foreground bk-shadow">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide leading-none">Tags</h4>
            {tags.slice(0, 20).map((tag) => (
              <div key={tag}>
                <div className="text-sm">{tag}</div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </ExampleSection>

      {/* Horizontal Scroll */}
      <ExampleSection
        title="Horizontal Scroll"
        description="A horizontally scrollable area for wide content."
        code={`<ScrollArea className="w-96 whitespace-nowrap border-3 border-foreground">
  <div className="flex w-max space-x-4 p-4">
    {artworks.map((artwork) => (
      <figure key={artwork.artist} className="shrink-0">
        <div className="overflow-hidden border-3 border-foreground">
          <div className="h-32 w-32 bg-muted flex items-center justify-center">
            <span className="text-2xl">Art</span>
          </div>
        </div>
        <figcaption className="pt-2 text-xs">
          <span className="font-bold">{artwork.artist}</span>
          <br />
          <span className="text-muted-foreground">{artwork.art}</span>
        </figcaption>
      </figure>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}
      >
        <ScrollArea className="w-96 whitespace-nowrap border-3 border-foreground bk-shadow">
          <div className="flex w-max space-x-4 p-4">
            {artworks.map((artwork) => (
              <figure key={artwork.artist} className="shrink-0">
                <div className="overflow-hidden border-3 border-foreground bk-shadow-sm">
                  <div className="h-32 w-32 bg-muted flex items-center justify-center">
                    <span className="text-2xl font-bold">Art</span>
                  </div>
                </div>
                <figcaption className="pt-2 text-xs">
                  <span className="font-bold uppercase">{artwork.artist}</span>
                  <br />
                  <span className="text-muted-foreground">{artwork.art}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </ExampleSection>

      {/* Both Directions */}
      <ExampleSection
        title="Both Directions"
        description="A scroll area that supports both vertical and horizontal scrolling."
        code={`<ScrollArea className="h-72 w-72 border-3 border-foreground">
  <div className="p-4" style={{ width: '500px' }}>
    <h4 className="mb-4 font-bold uppercase">Content</h4>
    <p className="text-sm whitespace-nowrap">
      This content is wider and taller than the container...
    </p>
    {/* More content */}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}
      >
        <ScrollArea className="h-72 w-72 border-3 border-foreground bk-shadow">
          <div className="p-4" style={{ width: '500px' }}>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide leading-none">Content</h4>
            <p className="text-sm whitespace-nowrap mb-4">
              This content is wider and taller than the container, so you can scroll both ways.
            </p>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} className="text-sm mb-2 whitespace-nowrap">
                Line {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
              </p>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </ExampleSection>

      {/* In a Card */}
      <ExampleSection
        title="In a Card"
        description="Use scroll areas within cards for contained scrollable content."
        code={`<div className="border-3 border-foreground bg-background bk-shadow">
  <div className="border-b-3 border-foreground p-4 bg-muted">
    <h3 className="font-bold uppercase">Messages</h3>
  </div>
  <ScrollArea className="h-48">
    <div className="p-4 space-y-4">
      {messages.map((msg, i) => (
        <div key={i} className="border-3 border-foreground p-3">
          <p className="text-sm">{msg}</p>
        </div>
      ))}
    </div>
  </ScrollArea>
</div>`}
      >
        <div className="border-3 border-foreground bg-background bk-shadow w-80">
          <div className="border-b-3 border-foreground p-4 bg-muted">
            <h3 className="font-bold uppercase tracking-wide">Messages</h3>
          </div>
          <ScrollArea className="h-48">
            <div className="p-4 space-y-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="border-3 border-foreground p-3 bk-shadow-sm">
                  <p className="text-sm font-medium">Message {i + 1}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This is the content of message {i + 1}.
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </ExampleSection>
    </>
  )
}
