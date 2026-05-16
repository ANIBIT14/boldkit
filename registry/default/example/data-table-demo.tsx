import { DataTable, DataTableColumnHeader } from '@/components/ui/data-table'

const columns = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  // ... more columns
]

export default function Example() {
  return <DataTable columns={columns} data={data} />
}