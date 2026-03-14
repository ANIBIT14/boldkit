import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CarouselProps {
  opts?: Parameters<typeof useEmblaCarousel>[0]
  plugins?: Parameters<typeof useEmblaCarousel>[1]
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: ReturnType<typeof useEmblaCarousel>[1]) => void
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ orientation = 'horizontal', opts, setApi, plugins, className, children, ...props }, ref) => {
    // Implementation using embla-carousel-react
  }
)

// Sub-components: CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots }`

const usageCode = `import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'

export default function Example() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
</script>

<template>
  <Carousel>
    <CarouselContent>
      <CarouselItem>Slide 1</CarouselItem>
      <CarouselItem>Slide 2</CarouselItem>
      <CarouselItem>Slide 3</CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>`

export function CarouselDoc() {
  const items = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <>
      <ComponentDoc
        name="Carousel"
        description="A carousel component built on Embla Carousel with keyboard navigation, touch support, and customizable navigation controls."
        dependencies={['embla-carousel-react', 'lucide-react']}
        vueDependencies={['embla-carousel-vue', 'lucide-vue-next']}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="w-full max-w-xs mx-auto">
          <Carousel>
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem key={item}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-bold">{item}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </ComponentDoc>

      {/* With Dots */}
      <ExampleSection
        title="With Dots"
        description="Add dot indicators for navigation."
        code={`<Carousel>
  <CarouselContent>
    {items.map((item) => (
      <CarouselItem key={item}>...</CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
  <CarouselDots />
</Carousel>`}
        vueCode={`<template>
  <Carousel>
    <CarouselContent>
      <CarouselItem v-for="item in items" :key="item">...</CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
    <CarouselDots />
  </Carousel>
</template>`}
      >
        <div className="w-full max-w-xs mx-auto">
          <Carousel>
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem key={item}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-bold">{item}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselDots />
          </Carousel>
        </div>
      </ExampleSection>

      {/* Multiple Items */}
      <ExampleSection
        title="Multiple Items"
        description="Show multiple items at once using CSS basis classes."
        code={`<Carousel>
  <CarouselContent>
    {items.map((item) => (
      <CarouselItem key={item} className="basis-1/3">
        ...
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>`}
        vueCode={`<template>
  <Carousel>
    <CarouselContent>
      <CarouselItem v-for="item in items" :key="item" class="basis-1/3">
        ...
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>`}
      >
        <div className="w-full max-w-lg mx-auto">
          <Carousel>
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem key={item} className="basis-1/3">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-4">
                      <span className="text-2xl font-bold">{item}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </ExampleSection>

      {/* Loop */}
      <ExampleSection
        title="Loop"
        description="Enable infinite looping through slides."
        code={`<Carousel opts={{ loop: true }}>
  <CarouselContent>
    {items.map((item) => (
      <CarouselItem key={item}>...</CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
        vueCode={`<template>
  <Carousel :opts="{ loop: true }">
    <CarouselContent>
      <CarouselItem v-for="item in items" :key="item">...</CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>`}
      >
        <div className="w-full max-w-xs mx-auto">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem key={item}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-bold">{item}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </ExampleSection>

      {/* Vertical */}
      <ExampleSection
        title="Vertical"
        description="Display slides in a vertical orientation."
        code={`<Carousel orientation="vertical" className="h-[300px]">
  <CarouselContent className="h-[300px]">
    {items.map((item) => (
      <CarouselItem key={item}>...</CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
        vueCode={`<template>
  <Carousel orientation="vertical" class="h-[300px]">
    <CarouselContent class="h-[300px]">
      <CarouselItem v-for="item in items" :key="item">...</CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>`}
      >
        <div className="w-full max-w-xs mx-auto">
          <Carousel orientation="vertical" className="h-[300px]">
            <CarouselContent className="h-[300px]">
              {items.map((item) => (
                <CarouselItem key={item}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-bold">{item}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </ExampleSection>

      {/* Without Navigation */}
      <ExampleSection
        title="Without Navigation"
        description="Hide navigation buttons for a cleaner look."
        code={`<Carousel>
  <CarouselContent>
    {items.map((item) => (
      <CarouselItem key={item}>...</CarouselItem>
    ))}
  </CarouselContent>
  <CarouselDots />
</Carousel>`}
        vueCode={`<template>
  <Carousel>
    <CarouselContent>
      <CarouselItem v-for="item in items" :key="item">...</CarouselItem>
    </CarouselContent>
    <CarouselDots />
  </Carousel>
</template>`}
      >
        <div className="w-full max-w-xs mx-auto">
          <Carousel>
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem key={item}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-bold">{item}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots />
          </Carousel>
        </div>
      </ExampleSection>
    </>
  )
}
