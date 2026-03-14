import { useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable, DataTableColumnHeader } from '@/components/ui/data-table'
import { Badge } from '@/components/ui/badge'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

// Sample data
interface User {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive' | 'pending'
  role: string
}

const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'active', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'inactive', role: 'User' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', status: 'pending', role: 'Editor' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', status: 'active', role: 'User' },
  { id: '6', name: 'Diana Ross', email: 'diana@example.com', status: 'active', role: 'Admin' },
  { id: '7', name: 'Eve Davis', email: 'eve@example.com', status: 'inactive', role: 'User' },
  { id: '8', name: 'Frank Miller', email: 'frank@example.com', status: 'pending', role: 'Editor' },
  { id: '9', name: 'Grace Lee', email: 'grace@example.com', status: 'active', role: 'User' },
  { id: '10', name: 'Henry Taylor', email: 'henry@example.com', status: 'active', role: 'User' },
  { id: '11', name: 'Ivy Chen', email: 'ivy@example.com', status: 'inactive', role: 'Admin' },
  { id: '12', name: 'Jack White', email: 'jack@example.com', status: 'active', role: 'User' },
]

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge variant={status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'secondary'}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
]

const sourceCode = `import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  enableSorting?: boolean
  enableFiltering?: boolean
  enableColumnVisibility?: boolean
  enableRowSelection?: boolean
  enablePagination?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  filterColumn?: string
  filterPlaceholder?: string
  emptyMessage?: string
  isLoading?: boolean
  onRowSelectionChange?: (selectedRows: TData[]) => void
}

function DataTable<TData, TValue>({ columns, data, ... }: DataTableProps<TData, TValue>) {
  // Implementation using @tanstack/react-table
}

export { DataTable, DataTableColumnHeader, DataTableToolbar, DataTablePagination }`

const usageCode = `import { DataTable, DataTableColumnHeader } from '@/components/ui/data-table'

const columns = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  // ... more columns
]

export default function Example() {
  return <DataTable columns={columns} data={data} />
}`

const vueUsageCode = `<script setup lang="ts">
import { DataTable } from '@/components/ui/data-table'

const columns = [
  { accessorKey: 'name', header: 'Name' },
  // ... more columns
]
</script>

<template>
  <DataTable :columns="columns" :data="data" />
</template>`

export function DataTableDoc() {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

  return (
    <>
      <ComponentDoc
        name="Data Table"
        description="A powerful data table built on TanStack Table with sorting, filtering, pagination, row selection, and column visibility."
        dependencies={['@tanstack/react-table', 'lucide-react']}
        vueDependencies={['@tanstack/vue-table', 'lucide-vue-next']}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <DataTable columns={columns} data={users.slice(0, 5)} />
      </ComponentDoc>

      {/* Full Features */}
      <ExampleSection
        title="Full Features"
        description="Data table with all features enabled: sorting, filtering, pagination, and column visibility."
        code={`<DataTable
  columns={columns}
  data={users}
  filterColumn="email"
  filterPlaceholder="Filter emails..."
  enableRowSelection
  enableColumnVisibility
  enablePagination
  pageSize={5}
/>`}
        vueCode={`<template>
  <DataTable
    :columns="columns"
    :data="users"
    filter-column="email"
    filter-placeholder="Filter emails..."
    enable-row-selection
    enable-column-visibility
    enable-pagination
    :page-size="5"
  />
</template>`}
      >
        <DataTable
          columns={columns}
          data={users}
          filterColumn="email"
          filterPlaceholder="Filter emails..."
          enableColumnVisibility
          enablePagination
          pageSize={5}
        />
      </ExampleSection>

      {/* Row Selection */}
      <ExampleSection
        title="Row Selection"
        description="Enable row selection with checkboxes."
        code={`<DataTable
  columns={columns}
  data={users}
  enableRowSelection
  onRowSelectionChange={setSelectedUsers}
/>
<p>Selected: {selectedUsers.length} users</p>`}
        vueCode={`<script setup>
const selectedUsers = ref([])
</script>

<template>
  <DataTable
    :columns="columns"
    :data="users"
    enable-row-selection
    @row-selection-change="selectedUsers = $event"
  />
  <p>Selected: {{ selectedUsers.length }} users</p>
</template>`}
      >
        <div className="space-y-4">
          <DataTable
            columns={columns}
            data={users.slice(0, 5)}
            enableRowSelection
            enablePagination={false}
            onRowSelectionChange={setSelectedUsers}
          />
          {selectedUsers.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Selected: {selectedUsers.map(u => u.name).join(', ')}
            </p>
          )}
        </div>
      </ExampleSection>

      {/* Without Pagination */}
      <ExampleSection
        title="Without Pagination"
        description="Display all data without pagination."
        code={`<DataTable
  columns={columns}
  data={users}
  enablePagination={false}
/>`}
        vueCode={`<template>
  <DataTable
    :columns="columns"
    :data="users"
    :enable-pagination="false"
  />
</template>`}
      >
        <DataTable
          columns={columns}
          data={users.slice(0, 5)}
          enablePagination={false}
        />
      </ExampleSection>

      {/* Loading State */}
      <ExampleSection
        title="Loading State"
        description="Show a loading spinner while data is being fetched."
        code={`<DataTable
  columns={columns}
  data={[]}
  isLoading
/>`}
        vueCode={`<template>
  <DataTable
    :columns="columns"
    :data="[]"
    is-loading
  />
</template>`}
      >
        <DataTable
          columns={columns}
          data={[]}
          isLoading
          enablePagination={false}
        />
      </ExampleSection>

      {/* Empty State */}
      <ExampleSection
        title="Empty State"
        description="Custom message when no data is available."
        code={`<DataTable
  columns={columns}
  data={[]}
  emptyMessage="No users found. Try a different search."
/>`}
        vueCode={`<template>
  <DataTable
    :columns="columns"
    :data="[]"
    empty-message="No users found. Try a different search."
  />
</template>`}
      >
        <DataTable
          columns={columns}
          data={[]}
          emptyMessage="No users found. Try a different search."
          enablePagination={false}
        />
      </ExampleSection>

      {/* Custom Page Sizes */}
      <ExampleSection
        title="Custom Page Sizes"
        description="Customize the available page size options."
        code={`<DataTable
  columns={columns}
  data={users}
  pageSize={5}
  pageSizeOptions={[5, 10, 25, 50, 100]}
/>`}
        vueCode={`<template>
  <DataTable
    :columns="columns"
    :data="users"
    :page-size="5"
    :page-size-options="[5, 10, 25, 50, 100]"
  />
</template>`}
      >
        <DataTable
          columns={columns}
          data={users}
          pageSize={5}
          pageSizeOptions={[5, 10, 25, 50, 100]}
        />
      </ExampleSection>
    </>
  )
}
