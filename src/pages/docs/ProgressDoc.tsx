import { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/progress'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import { Button } from '@/components/ui/button'

const sourceCode = `import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-5 w-full overflow-hidden border-3 border-foreground bg-muted bk-shadow-sm',
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: \`translateX(-\${100 - (value || 0)}%)\` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }`

const usageCode = `import { Progress } from '@/components/ui/progress'

export default function Example() {
  return <Progress value={60} />
}`

const vueSourceCode = `<script setup lang="ts">
import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<ProgressRootProps & { class?: string }>()
</script>

<template>
  <ProgressRoot
    v-bind="props"
    :class="
      cn(
        'relative h-5 w-full overflow-hidden border-3 border-foreground bg-muted bk-shadow-sm',
        props.class
      )
    "
  >
    <ProgressIndicator
      class="h-full w-full flex-1 bg-primary transition-all"
      :style="{ transform: \`translateX(-\${100 - (props.modelValue || 0)}%)\` }"
    />
  </ProgressRoot>
</template>`

const vueUsageCode = `<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '@/components/ui'

const progress = ref(60)
</script>

<template>
  <Progress :model-value="progress" class="w-[60%]" />
</template>`

export function ProgressDoc() {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <ComponentDoc
        name="Progress"
        description="Displays an indicator showing the completion progress of a task with bold neubrutalism styling."
        dependencies={['@radix-ui/react-progress']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <Progress value={progress} className="w-full max-w-md" />
      </ComponentDoc>

      {/* Basic */}
      <ExampleSection
        title="Basic"
        description="A simple progress bar showing completion percentage."
        code={`<Progress value={60} />`}
      >
        <Progress value={60} className="w-full max-w-md" />
      </ExampleSection>

      {/* Different Values */}
      <ExampleSection
        title="Different Values"
        description="Progress bars at various completion levels."
        code={`<Progress value={0} />
<Progress value={25} />
<Progress value={50} />
<Progress value={75} />
<Progress value={100} />`}
      >
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-1">
            <span className="text-sm font-medium">0%</span>
            <Progress value={0} />
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium">25%</span>
            <Progress value={25} />
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium">50%</span>
            <Progress value={50} />
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium">75%</span>
            <Progress value={75} />
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium">100%</span>
            <Progress value={100} />
          </div>
        </div>
      </ExampleSection>

      {/* Animated */}
      <ExampleSection
        title="Animated"
        description="Progress bar with animated value changes."
        code={`const [progress, setProgress] = useState(0)

useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prev) => (prev >= 100 ? 0 : prev + 10))
  }, 1000)
  return () => clearInterval(timer)
}, [])

<Progress value={progress} />`}
      >
        <AnimatedProgress />
      </ExampleSection>

      {/* With Label */}
      <ExampleSection
        title="With Label"
        description="Display progress value alongside the bar."
        code={`<div className="flex items-center gap-4">
  <Progress value={66} className="flex-1" />
  <span className="text-sm font-bold">66%</span>
</div>`}
      >
        <div className="w-full max-w-md flex items-center gap-4">
          <Progress value={66} className="flex-1" />
          <span className="text-sm font-bold">66%</span>
        </div>
      </ExampleSection>

      {/* Custom Height */}
      <ExampleSection
        title="Custom Height"
        description="Adjust the height of the progress bar."
        code={`<Progress value={50} className="h-2" />
<Progress value={50} className="h-5" />
<Progress value={50} className="h-8" />`}
      >
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-1">
            <span className="text-sm font-medium">Small (h-2)</span>
            <Progress value={50} className="h-2" />
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium">Default (h-5)</span>
            <Progress value={50} className="h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium">Large (h-8)</span>
            <Progress value={50} className="h-8" />
          </div>
        </div>
      </ExampleSection>

      {/* Indeterminate State */}
      <ExampleSection
        title="Loading State"
        description="Show loading progress without a specific value."
        code={`<Progress className="animate-pulse" />`}
      >
        <Progress className="w-full max-w-md animate-pulse" value={100} />
      </ExampleSection>
    </>
  )
}

function AnimatedProgress() {
  const [progress, setProgress] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsRunning(false)
          return 100
        }
        return prev + 10
      })
    }, 500)

    return () => clearInterval(timer)
  }, [isRunning])

  const handleStart = () => {
    setProgress(0)
    setIsRunning(true)
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <Progress value={progress} />
      <div className="flex items-center gap-4">
        <Button onClick={handleStart} disabled={isRunning}>
          {isRunning ? 'Loading...' : 'Start Progress'}
        </Button>
        <span className="text-sm font-bold">{progress}%</span>
      </div>
    </div>
  )
}
