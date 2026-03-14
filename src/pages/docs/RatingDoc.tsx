import { useState } from 'react'
import { Rating } from '@/components/ui/rating'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Star, Heart, Circle } from 'lucide-react'

const ratingVariants = cva('flex items-center gap-0.5', {
  variants: {
    size: {
      sm: '[&_svg]:h-4 [&_svg]:w-4',
      md: '[&_svg]:h-5 [&_svg]:w-5',
      lg: '[&_svg]:h-6 [&_svg]:w-6',
      xl: '[&_svg]:h-8 [&_svg]:w-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof ratingVariants> {
  value?: number
  defaultValue?: number
  max?: number
  precision?: 0.5 | 1
  icon?: 'star' | 'heart' | 'circle'
  readOnly?: boolean
  disabled?: boolean
  onChange?: (value: number) => void
  onHoverChange?: (value: number | null) => void
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ value, defaultValue, max = 5, precision = 1, icon = 'star', size, readOnly, disabled, onChange, onHoverChange, className, ...props }, ref) => {
    // Implementation...
  }
)

export { Rating, ratingVariants }`

const usageCode = `import { Rating } from '@/components/ui/rating'

export default function Example() {
  return <Rating defaultValue={3} />
}`

const vueUsageCode = `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '@/components/ui/rating'

const value = ref(3)
</script>

<template>
  <Rating v-model="value" />
</template>`

export function RatingDoc() {
  const [value, setValue] = useState(3)
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  return (
    <>
      <ComponentDoc
        name="Rating"
        description="A rating component with star, heart, or circle icons. Supports half values, keyboard navigation, and hover preview."
        dependencies={['class-variance-authority', 'lucide-react']}
        vueDependencies={['class-variance-authority', 'lucide-vue-next']}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="flex items-center gap-4">
          <Rating defaultValue={3} />
        </div>
      </ComponentDoc>

      {/* Controlled */}
      <ExampleSection
        title="Controlled"
        description="Control the rating value with state."
        code={`const [value, setValue] = useState(3)

<Rating value={value} onChange={setValue} />
<p>Current rating: {value}</p>`}
        vueCode={`<script setup>
const value = ref(3)
</script>

<template>
  <Rating v-model="value" />
  <p>Current rating: {{ value }}</p>
</template>`}
      >
        <div className="space-y-2">
          <Rating value={value} onChange={setValue} />
          <p className="text-sm text-muted-foreground">
            Current rating: {value} {hoverValue !== null && `(hovering: ${hoverValue})`}
          </p>
        </div>
      </ExampleSection>

      {/* Icons */}
      <ExampleSection
        title="Icons"
        description="Choose between star, heart, or circle icons."
        code={`<Rating icon="star" defaultValue={3} />
<Rating icon="heart" defaultValue={4} />
<Rating icon="circle" defaultValue={2} />`}
        vueCode={`<template>
  <Rating icon="star" :default-value="3" />
  <Rating icon="heart" :default-value="4" />
  <Rating icon="circle" :default-value="2" />
</template>`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm w-16">Star:</span>
            <Rating icon="star" defaultValue={3} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm w-16">Heart:</span>
            <Rating icon="heart" defaultValue={4} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm w-16">Circle:</span>
            <Rating icon="circle" defaultValue={2} />
          </div>
        </div>
      </ExampleSection>

      {/* Half Values */}
      <ExampleSection
        title="Half Values"
        description="Enable half-value precision for more granular ratings."
        code={`<Rating precision={0.5} defaultValue={3.5} />`}
        vueCode={`<template>
  <Rating :precision="0.5" :default-value="3.5" />
</template>`}
      >
        <Rating precision={0.5} defaultValue={3.5} />
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection
        title="Sizes"
        description="Rating icons come in multiple sizes."
        code={`<Rating size="sm" defaultValue={4} />
<Rating size="md" defaultValue={4} />
<Rating size="lg" defaultValue={4} />
<Rating size="xl" defaultValue={4} />`}
        vueCode={`<template>
  <Rating size="sm" :default-value="4" />
  <Rating size="md" :default-value="4" />
  <Rating size="lg" :default-value="4" />
  <Rating size="xl" :default-value="4" />
</template>`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm w-8">sm:</span>
            <Rating size="sm" defaultValue={4} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm w-8">md:</span>
            <Rating size="md" defaultValue={4} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm w-8">lg:</span>
            <Rating size="lg" defaultValue={4} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm w-8">xl:</span>
            <Rating size="xl" defaultValue={4} />
          </div>
        </div>
      </ExampleSection>

      {/* Max Rating */}
      <ExampleSection
        title="Max Rating"
        description="Customize the maximum number of icons."
        code={`<Rating max={10} defaultValue={7} />`}
        vueCode={`<template>
  <Rating :max="10" :default-value="7" />
</template>`}
      >
        <Rating max={10} defaultValue={7} />
      </ExampleSection>

      {/* Read Only */}
      <ExampleSection
        title="Read Only"
        description="Display a rating without user interaction."
        code={`<Rating readOnly value={4} />`}
        vueCode={`<template>
  <Rating read-only :value="4" />
</template>`}
      >
        <Rating readOnly value={4} />
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        description="Disable the rating component."
        code={`<Rating disabled defaultValue={3} />`}
        vueCode={`<template>
  <Rating disabled :default-value="3" />
</template>`}
      >
        <Rating disabled defaultValue={3} />
      </ExampleSection>

      {/* Hover Preview */}
      <ExampleSection
        title="Hover Preview"
        description="Get notified when the user hovers over a rating value."
        code={`<Rating
  onHoverChange={(value) => console.log('Hovering:', value)}
/>`}
        vueCode={`<template>
  <Rating @hover-change="(value) => console.log('Hovering:', value)" />
</template>`}
      >
        <div className="space-y-2">
          <Rating
            defaultValue={3}
            onHoverChange={setHoverValue}
          />
          <p className="text-sm text-muted-foreground">
            {hoverValue !== null ? `Hovering: ${hoverValue}` : 'Hover over the stars'}
          </p>
        </div>
      </ExampleSection>
    </>
  )
}
