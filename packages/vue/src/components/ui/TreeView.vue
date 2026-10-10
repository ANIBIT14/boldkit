<script lang="ts">
import { type Component, defineComponent, computed, h, ref, watch, type PropType, type VNode } from 'vue'
import { ChevronRight, Folder, File, Check } from '@lucide/vue'
import Collapsible from './Collapsible.vue'
import CollapsibleContent from './CollapsibleContent.vue'
import { cn } from '@/lib/utils'

export interface TreeNode {
  id: string
  label: string
  icon?: Component
  children?: TreeNode[]
  disabled?: boolean
}

// Recursive TreeViewNode component defined using defineComponent for self-referencing
const TreeViewNode = defineComponent({
  name: 'TreeViewNode',
  props: {
    node: {
      type: Object as PropType<TreeNode>,
      required: true,
    },
    depth: {
      type: Number,
      required: true,
    },
    isExpanded: {
      type: Function as PropType<(id: string) => boolean>,
      required: true,
    },
    isSelected: {
      type: Function as PropType<(id: string) => boolean>,
      required: true,
    },
    toggleExpanded: {
      type: Function as PropType<(id: string) => void>,
      required: true,
    },
    toggleSelected: {
      type: Function as PropType<(id: string, node: TreeNode) => void>,
      required: true,
    },
    handleKeyDown: {
      type: Function as PropType<(event: KeyboardEvent, node: TreeNode) => void>,
      required: true,
    },
    selectionMode: {
      type: String as PropType<'none' | 'single' | 'multiple'>,
      required: true,
    },
    showCheckboxes: {
      type: Boolean,
      required: true,
    },
    showIcons: {
      type: Boolean,
      required: true,
    },
    focusedId: {
      type: String as PropType<string | null>,
      default: null,
    },
    setFocusedId: {
      type: Function as PropType<(id: string) => void>,
      required: true,
    },
  },
  setup(props): () => VNode {
    const hasChildren = computed(
      () => props.node.children && props.node.children.length > 0
    )
    const expanded = computed(() => props.isExpanded(props.node.id))
    const selected = computed(() => props.isSelected(props.node.id))

    const IconComponent = computed(() => {
      if (props.node.icon) return props.node.icon
      return hasChildren.value ? Folder : File
    })

    const handleNodeClick = (e: MouseEvent) => {
      if (props.node.disabled) return
      // A treeitem contains its descendants' group, so a click inside a child
      // must not also activate this node.
      e.stopPropagation()
      props.setFocusedId(props.node.id)
      if (hasChildren.value) {
        props.toggleExpanded(props.node.id)
      }
      if (props.selectionMode !== 'none') {
        props.toggleSelected(props.node.id, props.node)
      }
    }

    const itemEl = ref<HTMLElement | null>(null)
    const isFocused = computed(() => props.focusedId === props.node.id)

    // Move DOM focus to whichever node holds the roving tabindex, otherwise
    // the focus ring stops tracking arrow-key navigation.
    watch(isFocused, (focused) => {
      if (!focused || !itemEl.value) return
      const tree = itemEl.value.closest('[role="tree"]')
      if (tree?.contains(document.activeElement) && document.activeElement !== itemEl.value) {
        itemEl.value.focus()
      }
    })

    return () => {
      const row = h(
        'div',
        {
          class: cn(
            'flex items-center gap-2 px-2 py-1.5 cursor-pointer select-none transition-colors duration-150',
            'hover:bg-muted',
            isFocused.value && 'bg-muted',
            selected.value && 'bg-accent',
            props.node.disabled && 'opacity-50 cursor-not-allowed'
          ),
          style: { paddingLeft: `${props.depth * 16 + 8}px` },
        },
        [
          // Expand/collapse affordance. Presentational, not a button: the row
          // already toggles on click and ArrowLeft/ArrowRight do it from the
          // keyboard, and a real button here would be interactive content
          // nested inside the treeitem.
          hasChildren.value
            ? h(ChevronRight, {
                'aria-hidden': 'true',
                class: cn(
                  'w-4 h-4 flex-shrink-0 stroke-[3] transition-transform duration-200',
                  expanded.value && 'rotate-90'
                ),
              })
            : h('span', { class: 'w-4 h-5 flex-shrink-0' }),

          // Checkbox — drawn, not a real control. `aria-selected` on the
          // treeitem already conveys the state, and a focusable checkbox
          // inside a treeitem is an axe `nested-interactive` violation.
          props.showCheckboxes && props.selectionMode !== 'none'
            ? h(
                'span',
                {
                  'aria-hidden': 'true',
                  class: cn(
                    'flex h-5 w-5 flex-shrink-0 items-center justify-center border-2 border-foreground',
                    selected.value && 'bg-primary shadow-[2px_2px_0px_hsl(var(--shadow-color))]'
                  ),
                },
                selected.value ? [h(Check, { class: 'h-3.5 w-3.5 stroke-[4]' })] : []
              )
            : null,

          // Icon
          props.showIcons
            ? h(IconComponent.value, {
                'aria-hidden': 'true',
                class: 'w-5 h-5 flex-shrink-0 stroke-[2.5]',
              })
            : null,

          // Label
          h('span', { class: 'font-medium text-sm truncate' }, props.node.label),
        ]
      )

      // The treeitem owns its own group, so every treeitem's nearest
      // role-bearing ancestor is `tree` or `group` (axe aria-required-parent).
      // It used to be wrapped in a CollapsibleTrigger, which broke that and
      // made the row a button containing other buttons.
      return h(
        'div',
        {
          ref: itemEl,
          role: 'treeitem',
          // Pin the name to the label — the descendants' group lives inside
          // this element and would otherwise be folded into its name.
          'aria-label': props.node.label,
          'aria-expanded': hasChildren.value ? expanded.value : undefined,
          // Only advertise selection where selection is actually possible.
          'aria-selected': props.selectionMode === 'none' ? undefined : selected.value,
          'aria-disabled': props.node.disabled,
          tabindex: isFocused.value && !props.node.disabled ? 0 : -1,
          class: 'focus:outline-none',
          onKeydown: (e: KeyboardEvent) => props.handleKeyDown(e, props.node),
          onFocus: (e: FocusEvent) => {
            if (e.target === e.currentTarget) props.setFocusedId(props.node.id)
          },
          onClick: handleNodeClick,
        },
        [
          row,
          hasChildren.value
            ? h(Collapsible, { open: expanded.value }, () =>
                h(CollapsibleContent, null, () =>
                  h(
                    'div',
                    { role: 'group' },
                    props.node.children!.map((child) =>
                      h(TreeViewNode, {
                        key: child.id,
                        node: child,
                        depth: props.depth + 1,
                        isExpanded: props.isExpanded,
                        isSelected: props.isSelected,
                        toggleExpanded: props.toggleExpanded,
                        toggleSelected: props.toggleSelected,
                        handleKeyDown: props.handleKeyDown,
                        selectionMode: props.selectionMode,
                        showCheckboxes: props.showCheckboxes,
                        showIcons: props.showIcons,
                        focusedId: props.focusedId,
                        setFocusedId: props.setFocusedId,
                      })
                    )
                  )
                )
              )
            : null,
        ]
      )
    }
  },
})

export interface TreeViewProps {
  data: TreeNode[]
  expandedIds?: string[]
  selectedIds?: string[]
  selectionMode?: 'none' | 'single' | 'multiple'
  showCheckboxes?: boolean
  showIcons?: boolean
  defaultExpandedIds?: string[]
  defaultSelectedIds?: string[]
  class?: string
}

export { TreeViewNode }
</script>

<script setup lang="ts">

const props = withDefaults(defineProps<TreeViewProps>(), {
  expandedIds: undefined,
  selectedIds: undefined,
  selectionMode: 'none',
  showCheckboxes: false,
  showIcons: true,
  defaultExpandedIds: () => [],
  defaultSelectedIds: () => [],
})

const emit = defineEmits<{
  'update:expandedIds': [ids: string[]]
  'update:selectedIds': [ids: string[]]
}>()

// Internal state for uncontrolled mode
const internalExpandedIds = ref<string[]>([...props.defaultExpandedIds])
const internalSelectedIds = ref<string[]>([...props.defaultSelectedIds])

// Computed values for controlled/uncontrolled mode
const isExpandedControlled = computed(() => props.expandedIds !== undefined)
const isSelectedControlled = computed(() => props.selectedIds !== undefined)

const currentExpandedIds = computed(() =>
  isExpandedControlled.value ? props.expandedIds! : internalExpandedIds.value
)
const currentSelectedIds = computed(() =>
  isSelectedControlled.value ? props.selectedIds! : internalSelectedIds.value
)

// Sync internal state with controlled props when they change
watch(
  () => props.expandedIds,
  (newVal) => {
    if (newVal !== undefined) {
      internalExpandedIds.value = [...newVal]
    }
  }
)

watch(
  () => props.selectedIds,
  (newVal) => {
    if (newVal !== undefined) {
      internalSelectedIds.value = [...newVal]
    }
  }
)

const isExpanded = (id: string) => currentExpandedIds.value.includes(id)
const isSelected = (id: string) => currentSelectedIds.value.includes(id)

const toggleExpanded = (id: string) => {
  const newExpandedIds = isExpanded(id)
    ? currentExpandedIds.value.filter((i) => i !== id)
    : [...currentExpandedIds.value, id]

  if (!isExpandedControlled.value) {
    internalExpandedIds.value = newExpandedIds
  }
  emit('update:expandedIds', newExpandedIds)
}

const toggleSelected = (id: string, node: TreeNode) => {
  if (node.disabled || props.selectionMode === 'none') return

  let newSelectedIds: string[]

  if (props.selectionMode === 'single') {
    newSelectedIds = isSelected(id) ? [] : [id]
  } else {
    newSelectedIds = isSelected(id)
      ? currentSelectedIds.value.filter((i) => i !== id)
      : [...currentSelectedIds.value, id]
  }

  if (!isSelectedControlled.value) {
    internalSelectedIds.value = newSelectedIds
  }
  emit('update:selectedIds', newSelectedIds)
}

// Flattened visible order — what ArrowUp/ArrowDown/Home/End walk.
const visibleIds = computed(() => {
  const out: string[] = []
  const walk = (nodes: TreeNode[]) => {
    for (const item of nodes) {
      out.push(item.id)
      if (item.children?.length && isExpanded(item.id)) walk(item.children)
    }
  }
  walk(props.data)
  return out
})

// An ARIA tree is a single tab stop: exactly one node carries tabindex=0 and
// the arrow keys move between nodes. Every node being tabbable made a
// 200-node tree cost 200 Tab presses to get past.
const focusedIdRef = ref<string | null>(null)
const activeId = computed(() =>
  focusedIdRef.value && visibleIds.value.includes(focusedIdRef.value)
    ? focusedIdRef.value
    : (visibleIds.value[0] ?? null)
)
const setFocusedId = (id: string) => {
  focusedIdRef.value = id
}

const moveFocus = (from: string, delta: number | 'first' | 'last') => {
  const ids = visibleIds.value
  if (!ids.length) return
  const current = Math.max(0, ids.indexOf(from))
  const next =
    delta === 'first'
      ? 0
      : delta === 'last'
        ? ids.length - 1
        : Math.min(ids.length - 1, Math.max(0, current + delta))
  setFocusedId(ids[next])
}

const handleKeyDown = (event: KeyboardEvent, node: TreeNode) => {
  // A treeitem contains its descendants' group, so a key pressed on a child
  // also bubbles to every ancestor treeitem. Without this, the outermost
  // handler runs last and overwrites the focus the child just moved.
  if (event.target !== event.currentTarget) return

  const hasChildren = node.children && node.children.length > 0

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (props.selectionMode !== 'none') {
        toggleSelected(node.id, node)
      } else if (hasChildren) {
        toggleExpanded(node.id)
      }
      break
    case 'ArrowDown':
      event.preventDefault()
      moveFocus(node.id, 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      moveFocus(node.id, -1)
      break
    case 'Home':
      event.preventDefault()
      moveFocus(node.id, 'first')
      break
    case 'End':
      event.preventDefault()
      moveFocus(node.id, 'last')
      break
    case 'ArrowRight':
      event.preventDefault()
      // APG: expand a collapsed parent, else move into it.
      if (hasChildren && !isExpanded(node.id)) toggleExpanded(node.id)
      else if (hasChildren) moveFocus(node.id, 1)
      break
    case 'ArrowLeft':
      event.preventDefault()
      // APG: collapse an expanded parent, else move out to the parent.
      if (hasChildren && isExpanded(node.id)) toggleExpanded(node.id)
      else moveFocus(node.id, -1)
      break
  }
}
</script>

<template>
  <div
    :class="cn('border-3 border-foreground bg-background p-2', props.class)"
    role="tree"
  >
    <TreeViewNode
      v-for="rootNode in data"
      :key="rootNode.id"
      :node="rootNode"
      :depth="0"
      :is-expanded="isExpanded"
      :is-selected="isSelected"
      :toggle-expanded="toggleExpanded"
      :toggle-selected="toggleSelected"
      :handle-key-down="handleKeyDown"
      :selection-mode="selectionMode"
      :show-checkboxes="showCheckboxes"
      :show-icons="showIcons"
      :focused-id="activeId"
      :set-focused-id="setFocusedId"
    />
  </div>
</template>
