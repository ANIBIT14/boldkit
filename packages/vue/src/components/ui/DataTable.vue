<script setup lang="ts" generic="TData, TValue">
import { ref, computed, watch, h } from 'vue'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
} from '@tanstack/vue-table'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  Search,
  Settings2,
} from '@lucide/vue'
import { cn } from '@/lib/utils'
import Table from './Table.vue'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import TableRow from './TableRow.vue'
import TableHead from './TableHead.vue'
import TableCell from './TableCell.vue'
import Input from './Input.vue'
import Button from './Button.vue'
import Checkbox from './Checkbox.vue'
import Select from './Select.vue'
import SelectTrigger from './SelectTrigger.vue'
import SelectValue from './SelectValue.vue'
import SelectContent from './SelectContent.vue'
import SelectItem from './SelectItem.vue'
import DropdownMenu from './DropdownMenu.vue'
import DropdownMenuTrigger from './DropdownMenuTrigger.vue'
import DropdownMenuContent from './DropdownMenuContent.vue'
import DropdownMenuCheckboxItem from './DropdownMenuCheckboxItem.vue'

interface Props {
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
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  enableSorting: true,
  enableFiltering: true,
  enableColumnVisibility: true,
  enableRowSelection: false,
  enablePagination: true,
  pageSize: 10,
  pageSizeOptions: () => [10, 20, 30, 50],
  filterPlaceholder: 'Filter...',
  emptyMessage: 'No results.',
  isLoading: false,
})

const emit = defineEmits<{
  rowSelectionChange: [selectedRows: TData[]]
}>()

// Table state
const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref<RowSelectionState>({})

// Build columns with optional selection column
const tableColumns = computed(() => {
  if (!props.enableRowSelection) return props.columns

  const selectionColumn: ColumnDef<TData, unknown> = {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() ? 'indeterminate' : false),
        'onUpdate:checked': (value: boolean) =>
          table.toggleAllPageRowsSelected(!!value),
        'aria-label': 'Select all',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
        'aria-label': 'Select row',
      }),
    enableSorting: false,
    enableHiding: false,
  }

  return [selectionColumn, ...props.columns]
})

// Initialize table
const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return tableColumns.value
  },
  getCoreRowModel: getCoreRowModel(),
  ...(props.enablePagination && {
    getPaginationRowModel: getPaginationRowModel(),
  }),
  ...(props.enableSorting && { getSortedRowModel: getSortedRowModel() }),
  ...(props.enableFiltering && { getFilteredRowModel: getFilteredRowModel() }),
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue
  },
  onColumnFiltersChange: (updaterOrValue) => {
    columnFilters.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(columnFilters.value)
        : updaterOrValue
  },
  onColumnVisibilityChange: (updaterOrValue) => {
    columnVisibility.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(columnVisibility.value)
        : updaterOrValue
  },
  onRowSelectionChange: (updaterOrValue) => {
    rowSelection.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(rowSelection.value)
        : updaterOrValue
  },
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
  },
  initialState: {
    pagination: {
      pageSize: props.pageSize,
    },
  },
})

// Filter column accessor
const filterColumnInstance = computed(() => {
  if (!props.filterColumn) return null
  return table.getColumn(props.filterColumn)
})

const filterValue = computed({
  get: () => (filterColumnInstance.value?.getFilterValue() as string) ?? '',
  set: (value: string) => filterColumnInstance.value?.setFilterValue(value),
})

// Page size for Select component
const currentPageSize = computed({
  get: () => String(table.getState().pagination.pageSize),
  set: (value: string) => table.setPageSize(Number(value)),
})

// Hideable columns for visibility dropdown
const hideableColumns = computed(() =>
  table.getAllColumns().filter((column) => column.getCanHide())
)

// Selected rows count
const selectedRowsCount = computed(
  () => table.getFilteredSelectedRowModel().rows.length
)
const totalRowsCount = computed(
  () => table.getFilteredRowModel().rows.length
)

// Watch for row selection changes and emit
watch(
  rowSelection,
  () => {
    const selectedRows = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original)
    emit('rowSelectionChange', selectedRows)
  },
  { deep: true }
)

// Sorting icon helper
function getSortIcon(column: ReturnType<typeof table.getColumn>) {
  if (!column?.getCanSort()) return null
  const sorted = column.getIsSorted()
  if (sorted === 'desc') return ArrowDown
  if (sorted === 'asc') return ArrowUp
  return ArrowUpDown
}
</script>

<template>
  <div :class="cn('space-y-4', props.class)">
    <!-- Toolbar -->
    <div
      v-if="enableFiltering || enableColumnVisibility"
      class="flex items-center justify-between py-4"
    >
      <div class="flex flex-1 items-center space-x-2">
        <!-- Filter Input -->
        <div v-if="filterColumnInstance" class="relative">
          <Search
            class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            v-model="filterValue"
            :placeholder="filterPlaceholder"
            class="h-9 w-[150px] pl-9 lg:w-[250px]"
          />
        </div>
      </div>

      <!-- Column Visibility Dropdown -->
      <DropdownMenu v-if="enableColumnVisibility">
        <DropdownMenuTrigger>
          <Button variant="outline" size="sm" class="ml-auto h-9">
            <Settings2 class="mr-2 h-4 w-4" />
            Columns
            <ChevronDown class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in hideableColumns"
            :key="column.id"
            class="capitalize"
            :checked="column.getIsVisible()"
            @update:checked="(value: boolean) => column.toggleVisibility(!!value)"
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <!-- Table -->
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <template v-if="!header.isPlaceholder">
              <!-- Sortable Header -->
              <Button
                v-if="header.column.getCanSort()"
                variant="ghost"
                size="sm"
                class="-ml-3 h-8 data-[state=open]:bg-accent"
                @click="header.column.toggleSorting(header.column.getIsSorted() === 'asc')"
              >
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
                <component
                  :is="getSortIcon(header.column)"
                  v-if="getSortIcon(header.column)"
                  class="ml-2 h-4 w-4"
                />
              </Button>
              <!-- Non-sortable Header -->
              <FlexRender
                v-else
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </template>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <!-- Loading State -->
        <TableRow v-if="isLoading">
          <TableCell :colspan="tableColumns.length" class="h-24 text-center">
            <div class="flex items-center justify-center">
              <div
                class="h-6 w-6 animate-spin border-3 border-foreground border-t-transparent"
              />
            </div>
          </TableCell>
        </TableRow>

        <!-- Data Rows -->
        <template v-else-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
            :class="
              cn(
                row.getIsSelected() &&
                  'bg-accent shadow-[4px_4px_0px_hsl(var(--shadow-color))]'
              )
            "
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </TableCell>
          </TableRow>
        </template>

        <!-- Empty State -->
        <TableRow v-else>
          <TableCell :colspan="tableColumns.length" class="h-24 text-center">
            {{ emptyMessage }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <!-- Pagination -->
    <div v-if="enablePagination" class="flex items-center justify-between py-4">
      <!-- Selection Info -->
      <div class="flex-1 text-sm text-muted-foreground">
        <template v-if="selectedRowsCount > 0">
          {{ selectedRowsCount }} of {{ totalRowsCount }} row(s) selected.
        </template>
      </div>

      <div class="flex items-center space-x-6 lg:space-x-8">
        <!-- Page Size Selector -->
        <div class="flex items-center space-x-2">
          <p class="text-sm font-medium">Rows per page</p>
          <Select v-model="currentPageSize">
            <SelectTrigger class="h-9 w-[85px]">
              <SelectValue :placeholder="String(table.getState().pagination.pageSize)" />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectItem
                v-for="size in pageSizeOptions"
                :key="size"
                :value="String(size)"
              >
                {{ size }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Page Info -->
        <div class="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {{ table.getState().pagination.pageIndex + 1 }} of
          {{ table.getPageCount() }}
        </div>

        <!-- Navigation Buttons -->
        <div class="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            :disabled="!table.getCanPreviousPage()"
            @click="table.previousPage()"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            :disabled="!table.getCanNextPage()"
            @click="table.nextPage()"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
