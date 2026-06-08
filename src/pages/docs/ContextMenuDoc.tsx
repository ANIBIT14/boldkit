import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
  ContextMenuCheckboxItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from '@/components/ui/context-menu'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/context-menu.tsx?raw'
import vueSourceCode from '@vue-ui/ContextMenu.vue?raw'

const usageCode = `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'

export default function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui'
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>Right click</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Back</ContextMenuItem>
      <ContextMenuItem>Reload</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>`

const triggerClass =
  'flex h-32 w-full max-w-sm items-center justify-center border-3 border-dashed border-foreground text-sm font-bold uppercase tracking-wide'

export function ContextMenuDoc() {
  return (
    <>
      <ComponentDoc
        name="Context Menu"
        description="Displays a menu of actions or options triggered by a right-click, with thick borders and hard shadows."
        registryName="context-menu"
        dependencies={['@radix-ui/react-context-menu']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <ContextMenu>
          <ContextMenuTrigger className={triggerClass}>
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent className="w-52">
            <ContextMenuLabel>Actions</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuItem>
              Back
              <ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Forward
              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Reload
              <ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </ComponentDoc>

      <ExampleSection
        title="With Submenu"
        description="Nest a submenu for grouped, secondary actions."
        code={`<ContextMenu>
  <ContextMenuTrigger>Right click</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Cut</ContextMenuItem>
    <ContextMenuSub>
      <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Email</ContextMenuItem>
        <ContextMenuItem>Message</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  </ContextMenuContent>
</ContextMenu>`}
      >
        <ContextMenu>
          <ContextMenuTrigger className={triggerClass}>
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent className="w-52">
            <ContextMenuItem>Cut</ContextMenuItem>
            <ContextMenuItem>Copy</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-44">
                <ContextMenuItem>Email</ContextMenuItem>
                <ContextMenuItem>Message</ContextMenuItem>
                <ContextMenuItem>Copy link</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        </ContextMenu>
      </ExampleSection>

      <ExampleSection
        title="With Checkbox Items"
        description="Toggle options directly from the context menu."
        code={`<ContextMenuContent>
  <ContextMenuCheckboxItem checked>
    Show Bookmarks
  </ContextMenuCheckboxItem>
  <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
</ContextMenuContent>`}
      >
        <ContextMenu>
          <ContextMenuTrigger className={triggerClass}>
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent className="w-56">
            <ContextMenuLabel>Appearance</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem checked>
              Show Bookmarks
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          </ContextMenuContent>
        </ContextMenu>
      </ExampleSection>
    </>
  )
}
