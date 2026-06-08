import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/resizable.tsx?raw'
import vueSourceCode from '@vue-ui/ResizablePanelGroup.vue?raw'

const usageCode = `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

export default function Example() {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-[12rem] border-3 border-foreground">
      <ResizablePanel defaultSize={50}>One</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>Two</ResizablePanel>
    </ResizablePanelGroup>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui'
</script>

<template>
  <ResizablePanelGroup direction="horizontal" class="min-h-[12rem] border-3 border-foreground">
    <ResizablePanel :default-size="50">One</ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel :default-size="50">Two</ResizablePanel>
  </ResizablePanelGroup>
</template>`

const panelText = 'flex h-full items-center justify-center p-6 text-sm font-bold uppercase tracking-wide'

export function ResizableDoc() {
  return (
    <>
      <ComponentDoc
        name="Resizable"
        description="Resizable panel groups with draggable handles for split layouts and dashboards."
        registryName="resizable"
        dependencies={['react-resizable-panels']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[12rem] w-full max-w-md border-3 border-foreground bk-shadow"
        >
          <ResizablePanel defaultSize={50}>
            <div className={panelText}>One</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50}>
                <div className={panelText}>Two</div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                <div className={panelText}>Three</div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ComponentDoc>

      <ExampleSection
        title="Vertical"
        description="Stack panels vertically with a horizontal handle."
        code={`<ResizablePanelGroup direction="vertical" className="min-h-[12rem] border-3 border-foreground">
  <ResizablePanel defaultSize={40}>Header</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={60}>Content</ResizablePanel>
</ResizablePanelGroup>`}
      >
        <ResizablePanelGroup
          direction="vertical"
          className="min-h-[12rem] w-full max-w-md border-3 border-foreground bk-shadow"
        >
          <ResizablePanel defaultSize={40}>
            <div className={panelText}>Header</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60}>
            <div className={panelText}>Content</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ExampleSection>

      <ExampleSection
        title="Without Handle"
        description="Omit the grip for a minimal divider that is still draggable."
        code={`<ResizablePanelGroup direction="horizontal" className="min-h-[12rem] border-3 border-foreground">
  <ResizablePanel defaultSize={50}>Left</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>Right</ResizablePanel>
</ResizablePanelGroup>`}
      >
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[12rem] w-full max-w-md border-3 border-foreground bk-shadow"
        >
          <ResizablePanel defaultSize={50}>
            <div className={panelText}>Left</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className={panelText}>Right</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ExampleSection>
    </>
  )
}
