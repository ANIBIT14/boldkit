import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Plus, Info, Settings } from 'lucide-react'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/tooltip.tsx?raw'
import vueSourceCode from '@vue-ui/Tooltip.vue?raw'


const usageCode = `import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function Example() {
  return (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>
        <p>Tooltip content</p>
      </TooltipContent>
    </Tooltip>
  )
}`


const vueUsageCode = `<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui'
import { Button } from '@/components/ui'
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Tooltip content</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>`

export function TooltipDoc() {
  return (
    <>
      <ComponentDoc
        name="Tooltip"
        description="A popup that displays information related to an element when it receives keyboard focus or the mouse hovers over it."
        dependencies={['@radix-ui/react-tooltip']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </ComponentDoc>

      {/* Positions */}
      <ExampleSection
        title="Positions"
        description="Tooltips can appear in different positions relative to the trigger."
        code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Top</Button>
  </TooltipTrigger>
  <TooltipContent side="top">
    <p>Tooltip on top</p>
  </TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Bottom</Button>
  </TooltipTrigger>
  <TooltipContent side="bottom">
    <p>Tooltip on bottom</p>
  </TooltipContent>
</Tooltip>`}
        vueCode={`<template>
  <TooltipProvider>
    <div class="flex gap-4">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Tooltip on top</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Tooltip on right</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Tooltip on bottom</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Tooltip on left</p>
        </TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
</template>`}
      >
        <div className="flex gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Top</Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Tooltip on top</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Right</Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Tooltip on right</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Bottom</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Tooltip on bottom</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Left</Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Tooltip on left</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </ExampleSection>

      {/* With Icon Buttons */}
      <ExampleSection
        title="Icon Buttons"
        description="Tooltips work great with icon-only buttons to provide context."
        code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline" size="icon">
      <Info className="h-4 w-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>More information</p>
  </TooltipContent>
</Tooltip>`}
        vueCode={`<script setup>
import { Info, Settings, Plus } from 'lucide-vue-next'
</script>

<template>
  <TooltipProvider>
    <div class="flex gap-4">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline" size="icon">
            <Info class="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>More information</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline" size="icon">
            <Settings class="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline" size="icon">
            <Plus class="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add new item</p>
        </TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
</template>`}
      >
        <div className="flex gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>More information</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add new item</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </ExampleSection>

      {/* With Delay */}
      <ExampleSection
        title="Custom Delay"
        description="Control when the tooltip appears with delayDuration."
        code={`<Tooltip delayDuration={0}>
  <TooltipTrigger asChild>
    <Button variant="outline">No delay</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Shows immediately</p>
  </TooltipContent>
</Tooltip>

<Tooltip delayDuration={1000}>
  <TooltipTrigger asChild>
    <Button variant="outline">1s delay</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Shows after 1 second</p>
  </TooltipContent>
</Tooltip>`}
        vueCode={`<template>
  <TooltipProvider>
    <div class="flex gap-4">
      <Tooltip :delay-duration="0">
        <TooltipTrigger as-child>
          <Button variant="outline">No delay</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Shows immediately</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip :delay-duration="1000">
        <TooltipTrigger as-child>
          <Button variant="outline">1s delay</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Shows after 1 second</p>
        </TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
</template>`}
      >
        <div className="flex gap-4">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button variant="outline">No delay</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Shows immediately</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={1000}>
            <TooltipTrigger asChild>
              <Button variant="outline">1s delay</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Shows after 1 second</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </ExampleSection>
    </>
  )
}
