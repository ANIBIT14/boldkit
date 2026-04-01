<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'
import { X } from 'lucide-vue-next'

export interface TagInputProps {
  modelValue?: string[]
  defaultValue?: string[]
  suggestions?: string[]
  maxTags?: number
  allowDuplicates?: boolean
  delimiter?: string | RegExp
  validateTag?: (tag: string) => boolean | string
  placeholder?: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<TagInputProps>(), {
  defaultValue: () => [],
  suggestions: () => [],
  allowDuplicates: false,
  delimiter: ',' as string | RegExp,
  placeholder: 'Add tag...',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)

const internalTags = ref<string[]>([...props.defaultValue])
const inputValue = ref('')
const showSuggestions = ref(false)
const error = ref<string | null>(null)
const selectedSuggestionIndex = ref(-1)

const isControlled = computed(() => props.modelValue !== undefined)

const tags = computed(() => {
  return isControlled.value ? props.modelValue! : internalTags.value
})

const filteredSuggestions = computed(() => {
  if (!inputValue.value.trim() || props.suggestions.length === 0) return []
  const lowerInput = inputValue.value.toLowerCase()
  return props.suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(lowerInput) &&
      (props.allowDuplicates || !tags.value.includes(suggestion))
  )
})

// Sync internal tags with modelValue when controlled
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== undefined) {
      internalTags.value = [...newValue]
    }
  },
  { immediate: true }
)

function updateTags(newTags: string[]) {
  if (!isControlled.value) {
    internalTags.value = newTags
  }
  emit('update:modelValue', newTags)
}

function addTag(tagValue: string): boolean {
  const trimmedTag = tagValue.trim()
  if (!trimmedTag) return false

  // Check max tags
  if (props.maxTags && tags.value.length >= props.maxTags) {
    error.value = `Maximum ${props.maxTags} tags allowed`
    return false
  }

  // Check duplicates
  if (!props.allowDuplicates && tags.value.includes(trimmedTag)) {
    error.value = 'Tag already exists'
    return false
  }

  // Validate tag
  if (props.validateTag) {
    const validationResult = props.validateTag(trimmedTag)
    if (validationResult !== true) {
      error.value = typeof validationResult === 'string' ? validationResult : 'Invalid tag'
      return false
    }
  }

  error.value = null
  updateTags([...tags.value, trimmedTag])
  return true
}

function removeTag(index: number) {
  if (props.disabled) return
  const newTags = tags.value.filter((_, i) => i !== index)
  updateTags(newTags)
  error.value = null
}

function handleInputChange(e: Event) {
  const target = e.target as HTMLInputElement
  const value = target.value
  inputValue.value = value
  showSuggestions.value = true
  selectedSuggestionIndex.value = -1
  error.value = null

  // Check for delimiter
  if (props.delimiter) {
    const parts = value.split(props.delimiter instanceof RegExp ? props.delimiter : new RegExp(props.delimiter))

    if (parts.length > 1) {
      const newTags = parts.slice(0, -1).filter((part) => part.trim())
      newTags.forEach((tag) => addTag(tag))
      inputValue.value = parts[parts.length - 1]
    }
  }
}

function handleKeyDown(e: KeyboardEvent) {
  switch (e.key) {
    case 'Enter':
      e.preventDefault()
      if (selectedSuggestionIndex.value >= 0 && filteredSuggestions.value[selectedSuggestionIndex.value]) {
        if (addTag(filteredSuggestions.value[selectedSuggestionIndex.value])) {
          inputValue.value = ''
          showSuggestions.value = false
          selectedSuggestionIndex.value = -1
        }
      } else if (inputValue.value.trim()) {
        if (addTag(inputValue.value)) {
          inputValue.value = ''
        }
      }
      break
    case 'Backspace':
      if (!inputValue.value && tags.value.length > 0) {
        removeTag(tags.value.length - 1)
      }
      break
    case 'ArrowDown':
      if (filteredSuggestions.value.length > 0) {
        e.preventDefault()
        selectedSuggestionIndex.value =
          selectedSuggestionIndex.value < filteredSuggestions.value.length - 1
            ? selectedSuggestionIndex.value + 1
            : 0
      }
      break
    case 'ArrowUp':
      if (filteredSuggestions.value.length > 0) {
        e.preventDefault()
        selectedSuggestionIndex.value =
          selectedSuggestionIndex.value > 0
            ? selectedSuggestionIndex.value - 1
            : filteredSuggestions.value.length - 1
      }
      break
    case 'Escape':
      showSuggestions.value = false
      selectedSuggestionIndex.value = -1
      break
  }
}

function handleSuggestionClick(suggestion: string) {
  if (addTag(suggestion)) {
    inputValue.value = ''
    showSuggestions.value = false
    inputRef.value?.focus()
  }
}

function handleContainerClick() {
  inputRef.value?.focus()
}

function handleFocus() {
  showSuggestions.value = true
}

function handleClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    showSuggestions.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

const placeholderText = computed(() => {
  return tags.value.length === 0 ? props.placeholder : ''
})

const errorId = computed(() => error.value ? 'tag-input-error' : undefined)
</script>

<template>
  <div ref="containerRef" class="relative">
    <div
      role="group"
      aria-label="Tag input"
      :aria-describedby="errorId"
      @click="handleContainerClick"
      :class="
        cn(
          'flex flex-wrap items-center gap-2 min-h-11 w-full border-3 border-input bg-background px-3 py-2',
          'shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200',
          'focus-within:translate-x-[4px] focus-within:translate-y-[4px] focus-within:shadow-none',
          disabled && 'opacity-50 cursor-not-allowed',
          error && 'border-destructive',
          props.class
        )
      "
    >
      <!-- Tags -->
      <span
        v-for="(tag, index) in tags"
        :key="`${tag}-${index}`"
        :class="
          cn(
            'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold uppercase tracking-wide',
            'border-2 border-foreground bg-primary text-primary-foreground',
            'shadow-[2px_2px_0px_hsl(var(--shadow-color))]'
          )
        "
      >
        {{ tag }}
        <button
          v-if="!disabled"
          type="button"
          @click.stop="removeTag(index)"
          class="hover:bg-primary-foreground/20 rounded-sm p-0.5 transition-colors"
          :aria-label="`Remove ${tag}`"
        >
          <X class="h-3 w-3" />
        </button>
      </span>

      <!-- Input -->
      <input
        ref="inputRef"
        type="text"
        :value="inputValue"
        @input="handleInputChange"
        @keydown="handleKeyDown"
        @focus="handleFocus"
        :placeholder="placeholderText"
        :disabled="disabled"
        :class="
          cn(
            'flex-1 min-w-[120px] bg-transparent outline-none text-sm',
            'placeholder:text-muted-foreground disabled:cursor-not-allowed'
          )
        "
      />
    </div>

    <!-- Error message -->
    <p v-if="error" id="tag-input-error" role="alert" class="mt-1 text-xs font-medium text-destructive">{{ error }}</p>

    <!-- Suggestions dropdown -->
    <div
      v-if="showSuggestions && filteredSuggestions.length > 0"
      :class="
        cn(
          'absolute z-50 mt-1 w-full',
          'border-3 border-foreground bg-popover',
          'shadow-[4px_4px_0px_hsl(var(--shadow-color))]'
        )
      "
    >
      <button
        v-for="(suggestion, index) in filteredSuggestions"
        :key="suggestion"
        type="button"
        @click="handleSuggestionClick(suggestion)"
        :class="
          cn(
            'w-full px-3 py-2 text-left text-sm transition-colors',
            'hover:bg-muted',
            index === selectedSuggestionIndex && 'bg-accent'
          )
        "
      >
        {{ suggestion }}
      </button>
    </div>
  </div>
</template>
