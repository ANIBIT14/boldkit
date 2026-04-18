import * as React from 'react'
import { ChevronRight, Folder, File } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

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

// Context
interface TreeViewContextValue {
  expandedIds: Set<string>
  toggleExpanded: (id: string) => void
  selectedIds: Set<string>
  toggleSelected: (id: string) => void
  selectionMode: 'none' | 'single' | 'multiple'
  showCheckboxes: boolean
  showIcons: boolean
}

const TreeViewContext = React.createContext<TreeViewContextValue | null>(null)

function useTreeView() {
  const context = React.useContext(TreeViewContext)
  if (!context) {
    throw new Error('TreeView components must be used within a <TreeView />')
  }
  return context
}

const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      data,
      expandedIds: controlledExpandedIds,
      onExpandedChange,
      selectedIds: controlledSelectedIds,
      onSelectedChange,
      selectionMode = 'none',
      showCheckboxes = false,
      showIcons = true,
      defaultExpandedIds = [],
      defaultSelectedIds = [],
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledExpandedIds, setUncontrolledExpandedIds] = React.useState<Set<string>>(
      new Set(defaultExpandedIds)
    )
    const [uncontrolledSelectedIds, setUncontrolledSelectedIds] = React.useState<Set<string>>(
      new Set(defaultSelectedIds)
    )

    const isExpandedControlled = controlledExpandedIds !== undefined
    const isSelectedControlled = controlledSelectedIds !== undefined

    const expandedIds = isExpandedControlled
      ? new Set(controlledExpandedIds)
      : uncontrolledExpandedIds

    const selectedIds = isSelectedControlled
      ? new Set(controlledSelectedIds)
      : uncontrolledSelectedIds

    const toggleExpanded = React.useCallback(
      (id: string) => {
        const newExpandedIds = new Set(expandedIds)
        if (newExpandedIds.has(id)) {
          newExpandedIds.delete(id)
        } else {
          newExpandedIds.add(id)
        }

        if (!isExpandedControlled) {
          setUncontrolledExpandedIds(newExpandedIds)
        }
        onExpandedChange?.(Array.from(newExpandedIds))
      },
      [expandedIds, isExpandedControlled, onExpandedChange]
    )

    const toggleSelected = React.useCallback(
      (id: string) => {
        if (selectionMode === 'none') return

        let newSelectedIds: Set<string>

        if (selectionMode === 'single') {
          newSelectedIds = selectedIds.has(id) ? new Set() : new Set([id])
        } else {
          newSelectedIds = new Set(selectedIds)
          if (newSelectedIds.has(id)) {
            newSelectedIds.delete(id)
          } else {
            newSelectedIds.add(id)
          }
        }

        if (!isSelectedControlled) {
          setUncontrolledSelectedIds(newSelectedIds)
        }
        onSelectedChange?.(Array.from(newSelectedIds))
      },
      [selectedIds, selectionMode, isSelectedControlled, onSelectedChange]
    )

    return (
      <TreeViewContext.Provider
        value={{
          expandedIds,
          toggleExpanded,
          selectedIds,
          toggleSelected,
          selectionMode,
          showCheckboxes,
          showIcons,
        }}
      >
        <div
          ref={ref}
          role="tree"
          className={cn(
            'border-3 border-foreground bg-background p-2',
            'shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
            className
          )}
          {...props}
        >
          {data.map((node) => (
            <TreeNodeItem key={node.id} node={node} level={0} />
          ))}
        </div>
      </TreeViewContext.Provider>
    )
  }
)
TreeView.displayName = 'TreeView'

// Tree Node Component
interface TreeNodeProps {
  node: TreeNode
  level: number
}

function TreeNodeItem({ node, level }: TreeNodeProps) {
  const {
    expandedIds,
    toggleExpanded,
    selectedIds,
    toggleSelected,
    selectionMode,
    showCheckboxes,
    showIcons,
  } = useTreeView()

  const hasChildren = node.children && node.children.length > 0
  const isExpanded = expandedIds.has(node.id)
  const isSelected = selectedIds.has(node.id)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (selectionMode !== 'none') {
          toggleSelected(node.id)
        } else if (hasChildren) {
          toggleExpanded(node.id)
        }
        break
      case 'ArrowRight':
        if (hasChildren && !isExpanded) {
          e.preventDefault()
          toggleExpanded(node.id)
        }
        break
      case 'ArrowLeft':
        if (hasChildren && isExpanded) {
          e.preventDefault()
          toggleExpanded(node.id)
        }
        break
    }
  }

  const content = (
    <div
      role="treeitem"
      aria-selected={isSelected}
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-disabled={node.disabled}
      tabIndex={node.disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      onClick={() => {
        if (node.disabled) return
        if (selectionMode !== 'none') {
          toggleSelected(node.id)
        }
      }}
      className={cn(
        'flex items-center gap-2 px-2 py-1.5 cursor-pointer transition-colors',
        'hover:bg-muted focus:outline-none focus:bg-muted',
        isSelected && 'bg-accent',
        node.disabled && 'opacity-50 cursor-not-allowed'
      )}
      style={{ paddingLeft: `${level * 16 + 8}px` }}
    >
      {/* Expand/collapse button */}
      {hasChildren ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            toggleExpanded(node.id)
          }}
          className="p-0.5 hover:bg-muted-foreground/20 transition-colors"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          <ChevronRight
            className={cn(
              'h-4 w-4 stroke-[3] transition-transform duration-200',
              isExpanded && 'rotate-90'
            )}
          />
        </button>
      ) : (
        <span className="w-5" />
      )}

      {/* Checkbox */}
      {showCheckboxes && selectionMode !== 'none' && (
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => toggleSelected(node.id)}
          onClick={(e) => e.stopPropagation()}
          disabled={node.disabled}
          className="h-5 w-5 border-2 border-foreground data-[state=checked]:bg-primary data-[state=checked]:shadow-[2px_2px_0px_hsl(var(--shadow-color))]"
        />
      )}

      {/* Icon */}
      {showIcons && (
        <span className="shrink-0">
          {node.icon || (hasChildren ? (
            <Folder className="h-4 w-4" />
          ) : (
            <File className="h-4 w-4" />
          ))}
        </span>
      )}

      {/* Label */}
      <span className="text-sm truncate">{node.label}</span>
    </div>
  )

  if (!hasChildren) {
    return content
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(node.id)}>
      <CollapsibleTrigger asChild className="w-full">
        {content}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div role="group">
          {node.children!.map((child) => (
            <TreeNodeItem key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export { TreeView, useTreeView }
