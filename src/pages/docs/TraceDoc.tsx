import { useEffect, useState } from 'react'
import { Brain, FileSearch, Globe, ListChecks, Terminal, Wrench } from 'lucide-react'
import {
  Trace,
  TraceLine,
  TraceIcon,
  TraceTitle,
  TraceDescription,
  TraceCollapsible,
  TraceCollapsibleTrigger,
  TraceCollapsibleContent,
  type TraceStatus,
} from '@/components/ui/trace'
import { CodeBlock, CodeBlockContent } from '@/components/ui/code-block'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/trace.tsx?raw'
import vueContextSource from '@vue-ui/trace-context.ts?raw'
import vueRootSource from '@vue-ui/Trace.vue?raw'
import vueLineSource from '@vue-ui/TraceLine.vue?raw'
import vueIconSource from '@vue-ui/TraceIcon.vue?raw'
import vueTitleSource from '@vue-ui/TraceTitle.vue?raw'
import vueDescriptionSource from '@vue-ui/TraceDescription.vue?raw'
import vueCollapsibleSource from '@vue-ui/TraceCollapsible.vue?raw'
import vueTriggerSource from '@vue-ui/TraceCollapsibleTrigger.vue?raw'
import vueContentSource from '@vue-ui/TraceCollapsibleContent.vue?raw'

const vueSourceCode = [
  ['trace-context.ts', vueContextSource],
  ['Trace.vue', vueRootSource],
  ['TraceLine.vue', vueLineSource],
  ['TraceIcon.vue', vueIconSource],
  ['TraceTitle.vue', vueTitleSource],
  ['TraceDescription.vue', vueDescriptionSource],
  ['TraceCollapsible.vue', vueCollapsibleSource],
  ['TraceCollapsibleTrigger.vue', vueTriggerSource],
  ['TraceCollapsibleContent.vue', vueContentSource],
]
  .map(([file, source]) => `<!-- ${file} -->\n${source}`)
  .join('\n')

const usageCode = `import { Terminal } from 'lucide-react'
import { CodeBlock, CodeBlockContent } from '@/components/ui/code-block'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/components/ui/trace'

export default function Example() {
  return (
    <Trace>
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon><Terminal /></TraceIcon>
            <TraceTitle>Ran node --version</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent>v24.18.0</CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import { Terminal } from '@lucide/vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'
import CodeBlockContent from '@/components/ui/CodeBlockContent.vue'
import Trace from '@/components/ui/Trace.vue'
import TraceCollapsible from '@/components/ui/TraceCollapsible.vue'
import TraceCollapsibleContent from '@/components/ui/TraceCollapsibleContent.vue'
import TraceCollapsibleTrigger from '@/components/ui/TraceCollapsibleTrigger.vue'
import TraceIcon from '@/components/ui/TraceIcon.vue'
import TraceLine from '@/components/ui/TraceLine.vue'
import TraceTitle from '@/components/ui/TraceTitle.vue'
</script>

<template>
  <Trace>
    <TraceCollapsible default-open>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon><Terminal /></TraceIcon>
          <TraceTitle>Ran node --version</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <CodeBlock size="sm">
          <CodeBlockContent code="v24.18.0" />
        </CodeBlock>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>`

const steps = [
  { icon: Brain, title: 'Thought for 4s', running: 'Thinking…' },
  { icon: Globe, title: 'Searched the web', running: 'Searching the web…', description: '6 results' },
  { icon: FileSearch, title: 'Read registry.json', running: 'Reading registry.json…', description: '2.1 kB' },
  { icon: Wrench, title: 'Ran the registry build', running: 'Running the registry build…' },
]

/** Walks the steps from pending → running → done on a loop. */
function LiveTrace() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % (steps.length + 2)), 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <Trace className="max-w-md">
      {steps.map(({ icon: Icon, title, running, description }, i) => {
        const status: TraceStatus | undefined =
          i === active ? 'running' : i > active ? 'pending' : undefined
        return (
          <TraceLine key={title} status={status}>
            <TraceIcon>
              <Icon />
            </TraceIcon>
            <TraceTitle>{status === 'running' ? running : title}</TraceTitle>
            {description && !status && <TraceDescription>{description}</TraceDescription>}
          </TraceLine>
        )
      })}
    </Trace>
  )
}

export function TraceDoc() {
  return (
    <>
      <ComponentDoc
        name="Trace"
        registryName="trace"
        description="The steps an agent takes inside a turn — reasoning, tool calls, sources, plans, subagent runs — as one list of lines. Each line has an icon, a title and an optional description and status, and can expand into detail (a Code Block, a nested Trace) through Collapsible. Pairs with the Chat kit."
        dependencies={['radix-ui', 'lucide-react']}
        vueDependencies={['reka-ui', '@lucide/vue']}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueSourceCode={vueSourceCode}
        vueUsageCode={vueUsageCode}
      >
        <Trace className="max-w-md">
          <TraceCollapsible defaultOpen>
            <TraceCollapsibleTrigger>
              <TraceLine>
                <TraceIcon>
                  <Terminal />
                </TraceIcon>
                <TraceTitle>Ran node --version</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <CodeBlock size="sm">
                <CodeBlockContent>{'$ node --version\nv24.18.0'}</CodeBlockContent>
              </CodeBlock>
            </TraceCollapsibleContent>
          </TraceCollapsible>
          <TraceCollapsible defaultOpen>
            <TraceCollapsibleTrigger>
              <TraceLine status="error">
                <TraceIcon>
                  <Terminal />
                </TraceIcon>
                <TraceTitle>Failed to run bun dev</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <CodeBlock size="sm" variant="destructive">
                <CodeBlockContent wrap className="max-h-64">
                  {'$ bun dev\nerror: listen EADDRINUSE: address already in use :::5173'}
                </CodeBlockContent>
              </CodeBlock>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        </Trace>
      </ComponentDoc>

      <ExampleSection
        title="Status"
        description="running fills the icon with accent and shimmers the title (and sets aria-busy); pending dashes and fades the line; error turns it destructive. Under reduced motion the shimmer is a plain label."
        code={`<Trace>
  <TraceLine>
    <TraceIcon><Brain /></TraceIcon>
    <TraceTitle>Thought for 4s</TraceTitle>
  </TraceLine>
  <TraceLine status="running">
    <TraceIcon><Globe /></TraceIcon>
    <TraceTitle>Searching the web…</TraceTitle>
  </TraceLine>
  <TraceLine status="pending">
    <TraceIcon><Wrench /></TraceIcon>
    <TraceTitle>Ran the registry build</TraceTitle>
  </TraceLine>
</Trace>`}
        vueCode={`<template>
  <Trace>
    <TraceLine>
      <TraceIcon><Brain /></TraceIcon>
      <TraceTitle>Thought for 4s</TraceTitle>
    </TraceLine>
    <TraceLine status="running">
      <TraceIcon><Globe /></TraceIcon>
      <TraceTitle>Searching the web…</TraceTitle>
    </TraceLine>
    <TraceLine status="pending">
      <TraceIcon><Wrench /></TraceIcon>
      <TraceTitle>Ran the registry build</TraceTitle>
    </TraceLine>
  </Trace>
</template>`}
      >
        <LiveTrace />
      </ExampleSection>

      <ExampleSection
        title="Nested plan"
        description="Content can hold another Trace — a summary expands into steps, a step into its output. The rail under each level lines up with the icon above it."
        code={`<TraceCollapsible defaultOpen>
  <TraceCollapsibleTrigger>
    <TraceLine>
      <TraceIcon><ListChecks /></TraceIcon>
      <TraceTitle>Plan</TraceTitle>
      <TraceDescription>3 steps</TraceDescription>
    </TraceLine>
  </TraceCollapsibleTrigger>
  <TraceCollapsibleContent>
    <Trace>
      <TraceLine><TraceTitle>Read the registry</TraceTitle></TraceLine>
      <TraceLine status="running"><TraceTitle>Add the component</TraceTitle></TraceLine>
      <TraceLine status="pending"><TraceTitle>Run the tests</TraceTitle></TraceLine>
    </Trace>
  </TraceCollapsibleContent>
</TraceCollapsible>`}
        vueCode={`<template>
  <TraceCollapsible default-open>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon><ListChecks /></TraceIcon>
        <TraceTitle>Plan</TraceTitle>
        <TraceDescription>3 steps</TraceDescription>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <Trace>
        <TraceLine><TraceTitle>Read the registry</TraceTitle></TraceLine>
        <TraceLine status="running"><TraceTitle>Add the component</TraceTitle></TraceLine>
        <TraceLine status="pending"><TraceTitle>Run the tests</TraceTitle></TraceLine>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</template>`}
      >
        <Trace className="max-w-md">
          <TraceCollapsible defaultOpen>
            <TraceCollapsibleTrigger>
              <TraceLine>
                <TraceIcon>
                  <ListChecks />
                </TraceIcon>
                <TraceTitle>Plan</TraceTitle>
                <TraceDescription>3 steps</TraceDescription>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <Trace>
                <TraceLine>
                  <TraceTitle>Read the registry</TraceTitle>
                </TraceLine>
                <TraceLine status="running">
                  <TraceTitle>Add the component</TraceTitle>
                </TraceLine>
                <TraceLine status="pending">
                  <TraceTitle>Run the tests</TraceTitle>
                </TraceLine>
              </Trace>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        </Trace>
      </ExampleSection>
    </>
  )
}
