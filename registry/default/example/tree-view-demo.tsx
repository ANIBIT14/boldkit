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

export default function Example() {
  return <TreeView data={data} />
}