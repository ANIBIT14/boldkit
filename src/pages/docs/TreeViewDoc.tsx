import { useState } from 'react'
import { Folder, File, Image, Code, FileText } from 'lucide-react'
import { TreeView, type TreeNode } from '@/components/ui/tree-view'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const fileSystemData: TreeNode[] = [
  {
    id: '1',
    label: 'src',
    icon: <Folder className="h-4 w-4 text-yellow-500" />,
    children: [
      {
        id: '1-1',
        label: 'components',
        icon: <Folder className="h-4 w-4 text-yellow-500" />,
        children: [
          { id: '1-1-1', label: 'Button.tsx', icon: <Code className="h-4 w-4 text-blue-500" /> },
          { id: '1-1-2', label: 'Card.tsx', icon: <Code className="h-4 w-4 text-blue-500" /> },
          { id: '1-1-3', label: 'Input.tsx', icon: <Code className="h-4 w-4 text-blue-500" /> },
        ],
      },
      {
        id: '1-2',
        label: 'hooks',
        icon: <Folder className="h-4 w-4 text-yellow-500" />,
        children: [
          { id: '1-2-1', label: 'use-theme.ts', icon: <Code className="h-4 w-4 text-blue-500" /> },
          { id: '1-2-2', label: 'use-toast.ts', icon: <Code className="h-4 w-4 text-blue-500" /> },
        ],
      },
      { id: '1-3', label: 'App.tsx', icon: <Code className="h-4 w-4 text-blue-500" /> },
      { id: '1-4', label: 'index.css', icon: <FileText className="h-4 w-4 text-pink-500" /> },
    ],
  },
  {
    id: '2',
    label: 'public',
    icon: <Folder className="h-4 w-4 text-yellow-500" />,
    children: [
      { id: '2-1', label: 'logo.svg', icon: <Image className="h-4 w-4 text-green-500" /> },
      { id: '2-2', label: 'favicon.ico', icon: <Image className="h-4 w-4 text-green-500" /> },
    ],
  },
  { id: '3', label: 'package.json', icon: <File className="h-4 w-4 text-gray-500" /> },
  { id: '4', label: 'README.md', icon: <FileText className="h-4 w-4 text-gray-500" /> },
]

const simpleData: TreeNode[] = [
  {
    id: 'root',
    label: 'My Documents',
    children: [
      { id: 'doc1', label: 'Resume.pdf' },
      { id: 'doc2', label: 'Cover Letter.docx' },
      {
        id: 'projects',
        label: 'Projects',
        children: [
          { id: 'proj1', label: 'Project A' },
          { id: 'proj2', label: 'Project B' },
        ],
      },
    ],
  },
]

const sourceCode = `import * as React from 'react'
import { ChevronRight, Folder, File } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

export interface TreeNode {
  id: string
  label: string
  icon?: React.ReactNode
  children?: TreeNode[]
  disabled?: boolean
}

export interface TreeViewProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TreeNode[]
  expandedIds?: string[]
  onExpandedChange?: (ids: string[]) => void
  selectedIds?: string[]
  onSelectedChange?: (ids: string[]) => void
  selectionMode?: 'none' | 'single' | 'multiple'
  showCheckboxes?: boolean
  showIcons?: boolean
  defaultExpandedIds?: string[]
  defaultSelectedIds?: string[]
}

const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  ({ data, expandedIds, onExpandedChange, selectedIds, onSelectedChange, selectionMode, showCheckboxes, showIcons, ... }, ref) => {
    // Implementation using Collapsible
  }
)

export { TreeView }`

const usageCode = `import { TreeView } from '@/components/ui/tree-view'

const data = [
  {
    id: 'root',
    label: 'Documents',
    children: [
      { id: 'doc1', label: 'File 1.txt' },
      { id: 'doc2', label: 'File 2.txt' },
    ],
  },
]

export default function Example() {
  return <TreeView data={data} />
}`

const vueUsageCode = `<script setup lang="ts">
import { TreeView } from '@/components/ui/tree-view'

const data = [
  {
    id: 'root',
    label: 'Documents',
    children: [
      { id: 'doc1', label: 'File 1.txt' },
      { id: 'doc2', label: 'File 2.txt' },
    ],
  },
]
</script>

<template>
  <TreeView :data="data" />
</template>`

export function TreeViewDoc() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [expandedIds, setExpandedIds] = useState<string[]>(['1', '1-1'])

  return (
    <>
      <ComponentDoc
        name="Tree View"
        description="A hierarchical tree view component with expand/collapse, selection, checkboxes, and keyboard navigation."
        dependencies={['@radix-ui/react-collapsible', 'lucide-react']}
        vueDependencies={['reka-ui', 'lucide-vue-next']}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="max-w-sm">
          <TreeView data={simpleData} />
        </div>
      </ComponentDoc>

      {/* File Explorer */}
      <ExampleSection
        title="File Explorer"
        description="A file explorer with custom icons for different file types."
        code={`const data = [
  {
    id: '1',
    label: 'src',
    icon: <Folder className="h-4 w-4 text-yellow-500" />,
    children: [
      { id: '1-1', label: 'Button.tsx', icon: <Code className="h-4 w-4 text-blue-500" /> },
      // ...
    ],
  },
]

<TreeView data={data} defaultExpandedIds={['1', '1-1']} />`}
        vueCode={`<script setup>
const data = [
  {
    id: '1',
    label: 'src',
    children: [...]
  }
]
</script>

<template>
  <TreeView :data="data" :default-expanded-ids="['1', '1-1']" />
</template>`}
      >
        <div className="max-w-sm">
          <TreeView
            data={fileSystemData}
            defaultExpandedIds={['1', '1-1']}
          />
        </div>
      </ExampleSection>

      {/* Single Selection */}
      <ExampleSection
        title="Single Selection"
        description="Allow selecting a single item."
        code={`const [selectedIds, setSelectedIds] = useState<string[]>([])

<TreeView
  data={data}
  selectionMode="single"
  selectedIds={selectedIds}
  onSelectedChange={setSelectedIds}
/>`}
        vueCode={`<script setup>
const selectedIds = ref([])
</script>

<template>
  <TreeView
    :data="data"
    selection-mode="single"
    v-model:selected-ids="selectedIds"
  />
</template>`}
      >
        <div className="space-y-4 max-w-sm">
          <TreeView
            data={simpleData}
            selectionMode="single"
            selectedIds={selectedIds}
            onSelectedChange={setSelectedIds}
            defaultExpandedIds={['root', 'projects']}
          />
          {selectedIds.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Selected: {selectedIds.join(', ')}
            </p>
          )}
        </div>
      </ExampleSection>

      {/* Multiple Selection with Checkboxes */}
      <ExampleSection
        title="Multiple Selection"
        description="Allow selecting multiple items with checkboxes."
        code={`<TreeView
  data={data}
  selectionMode="multiple"
  showCheckboxes
/>`}
        vueCode={`<template>
  <TreeView
    :data="data"
    selection-mode="multiple"
    show-checkboxes
  />
</template>`}
      >
        <div className="max-w-sm">
          <TreeView
            data={simpleData}
            selectionMode="multiple"
            showCheckboxes
            defaultExpandedIds={['root', 'projects']}
          />
        </div>
      </ExampleSection>

      {/* Controlled Expansion */}
      <ExampleSection
        title="Controlled Expansion"
        description="Control which nodes are expanded."
        code={`const [expandedIds, setExpandedIds] = useState(['1', '1-1'])

<TreeView
  data={data}
  expandedIds={expandedIds}
  onExpandedChange={setExpandedIds}
/>`}
        vueCode={`<script setup>
const expandedIds = ref(['1', '1-1'])
</script>

<template>
  <TreeView
    :data="data"
    v-model:expanded-ids="expandedIds"
  />
</template>`}
      >
        <div className="space-y-4 max-w-sm">
          <TreeView
            data={fileSystemData}
            expandedIds={expandedIds}
            onExpandedChange={setExpandedIds}
          />
          <p className="text-sm text-muted-foreground">
            Expanded: {expandedIds.join(', ') || 'None'}
          </p>
        </div>
      </ExampleSection>

      {/* Without Icons */}
      <ExampleSection
        title="Without Icons"
        description="Hide icons for a simpler look."
        code={`<TreeView data={data} showIcons={false} />`}
        vueCode={`<template>
  <TreeView :data="data" :show-icons="false" />
</template>`}
      >
        <div className="max-w-sm">
          <TreeView
            data={simpleData}
            showIcons={false}
            defaultExpandedIds={['root']}
          />
        </div>
      </ExampleSection>

      {/* Disabled Items */}
      <ExampleSection
        title="Disabled Items"
        description="Disable specific items in the tree."
        code={`const data = [
  {
    id: '1',
    label: 'Available',
    children: [
      { id: '1-1', label: 'Option A' },
      { id: '1-2', label: 'Option B (disabled)', disabled: true },
    ],
  },
]

<TreeView data={data} selectionMode="single" />`}
        vueCode={`<script setup>
const data = [
  {
    id: '1',
    label: 'Available',
    children: [
      { id: '1-1', label: 'Option A' },
      { id: '1-2', label: 'Option B (disabled)', disabled: true },
    ],
  },
]
</script>

<template>
  <TreeView :data="data" selection-mode="single" />
</template>`}
      >
        <div className="max-w-sm">
          <TreeView
            data={[
              {
                id: '1',
                label: 'Options',
                children: [
                  { id: '1-1', label: 'Option A' },
                  { id: '1-2', label: 'Option B (disabled)', disabled: true },
                  { id: '1-3', label: 'Option C' },
                ],
              },
            ]}
            selectionMode="single"
            defaultExpandedIds={['1']}
          />
        </div>
      </ExampleSection>
    </>
  )
}
