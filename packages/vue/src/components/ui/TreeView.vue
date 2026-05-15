<script lang="ts">
import { type Component, defineComponent, computed, h, type PropType, type VNode } from 'vue'
import { ChevronRight, Folder, File } from 'lucide-vue-next'
import Collapsible from './Collapsible.vue'
import CollapsibleContent from './CollapsibleContent.vue'
import CollapsibleTrigger from './CollapsibleTrigger.vue'
import Checkbox from './Checkbox.vue'
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

    const handleNodeClick = () => {
      if (props.node.disabled) return
      if (props.selectionMode !== 'none') {
        props.toggleSelected(props.node.id, props.node)
      }
    }

    const handleChevronClick = (e: MouseEvent) => {
      e.stopPropagation()
      props.toggleExpanded(props.node.id)
    }

    const handleCheckboxClick = (e: MouseEvent) => {
      e.stopPropagation()
    }

    const handleCheckboxChange = () => {
      if (!props.node.disabled) {
        props.toggleSelected(props.node.id, props.node)
      }
    }

    return () => {
      const nodeContent = h(
        'div',
        {
          class: cn(
            'flex items-center gap-2 px-2 py-1.5 cursor-pointer select-none transition-colors duration-150',
            'hover:bg-muted focus:outline-none focus:bg-muted',
            selected.value && 'bg-accent',
            props.node.disabled && 'opacity-50 cursor-not-allowed'
          ),
          style: { paddingLeft: `${props.depth * 16 + 8}px` },
          tabindex: props.node.disabled ? -1 : 0,
          role: 'treeitem',
          'aria-expanded': hasChildren.value ? expanded.value : undefined,
          'aria-selected': selected.value,
          'aria-disabled': props.node.disabled,
          onKeydown: (e: KeyboardEvent) => props.handleKeyDown(e, props.node),
          onClick: handleNodeClick,
        },
        [
          // Expand/collapse chevron
          hasChildren.value
            ? h(
                'button',
                {
                  type: 'button',
                  class: cn(
                    'flex items-center justify-center w-5 h-5 transition-transform duration-200 flex-shrink-0',
                    expanded.value && 'rotate-90'
                  ),
                  onClick: handleChevronClick,
                  'aria-label': expanded.value ? 'Collapse' : 'Expand',
                },
                h(ChevronRight, { class: 'w-4 h-4 stroke-[3]' })
              )
            : h('span', { class: 'w-5 h-5 flex-shrink-0' }),

          // Checkbox
          props.showCheckboxes && props.selectionMode !== 'none'
            ? h(Checkbox, {
                checked: selected.value,
                disabled: props.node.disabled,
                class:
                  'h-5 w-5 border-2 border-foreground data-[state=checked]:bg-primary data-[state=checked]:shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
                'onUpdate:checked': handleCheckboxChange,
                onClick: handleCheckboxClick,
              })
            : null,

          // Icon
          props.showIcons
            ? h(IconComponent.value, {
                class: 'w-5 h-5 flex-shrink-0 stroke-[2.5]',
              })
            : null,

          // Label
          h(
            'span',
            { class: 'font-medium text-sm truncate' },
            props.node.label
          ),
        ]
      )

      if (hasChildren.value) {
        return h(
          Collapsible,
          {
            open: expanded.value,
            'onUpdate:open': () => props.toggleExpanded(props.node.id),
          },
          () => [
            h(CollapsibleTrigger, { asChild: true }, () => nodeContent),
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
                  })
                )
              )
            ),
          ]
        )
      }

      return nodeContent
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
import { ref, watch } from 'vue'

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

const handleKeyDown = (event: KeyboardEvent, node: TreeNode) => {
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
    case 'ArrowRight':
      event.preventDefault()
      if (hasChildren && !isExpanded(node.id)) {
        toggleExpanded(node.id)
      }
      break
    case 'ArrowLeft':
      event.preventDefault()
      if (hasChildren && isExpanded(node.id)) {
        toggleExpanded(node.id)
      }
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
      v-for="node in data"
      :key="node.id"
      :node="node"
      :depth="0"
      :is-expanded="isExpanded"
      :is-selected="isSelected"
      :toggle-expanded="toggleExpanded"
      :toggle-selected="toggleSelected"
      :handle-key-down="handleKeyDown"
      :selection-mode="selectionMode"
      :show-checkboxes="showCheckboxes"
      :show-icons="showIcons"
    />
  </div>
</template>
