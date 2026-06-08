import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

export default function Example() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[12rem] w-full max-w-md border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6 text-sm font-bold uppercase tracking-wide">
          One
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6 text-sm font-bold uppercase tracking-wide">
              Two
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6 text-sm font-bold uppercase tracking-wide">
              Three
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
