<script setup lang="ts">
import { ref, computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Upload } from 'lucide-vue-next'

export interface FileRejection {
  file: File
  errors: Array<{ code: string; message: string }>
}

export interface DropzoneState {
  isDragging: boolean
  isDisabled: boolean
  acceptedFiles: File[]
  rejectedFiles: FileRejection[]
}

const dropzoneVariants = cva(
  'relative flex flex-col items-center justify-center border-3 border-dashed border-foreground transition-all duration-200 cursor-pointer',
  {
    variants: {
      state: {
        idle: 'bg-background hover:bg-muted/30 shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:shadow-[6px_6px_0px_hsl(var(--shadow-color))] hover:translate-x-[-2px] hover:translate-y-[-2px]',
        dragging: 'border-solid border-primary bg-primary/10 scale-[1.02] shadow-[8px_8px_0px_hsl(var(--primary))]',
        disabled: 'opacity-50 cursor-not-allowed shadow-none',
      },
      variant: {
        default: 'p-8',
        compact: 'p-6',
        minimal: 'p-3 border-2',
      },
    },
    defaultVariants: {
      state: 'idle',
      variant: 'default',
    },
  }
)

type DropzoneVariants = VariantProps<typeof dropzoneVariants>

interface DropzoneProps {
  accept?: Record<string, string[]>
  maxSize?: number
  maxFiles?: number
  disabled?: boolean
  variant?: DropzoneVariants['variant']
  class?: string
}

const props = withDefaults(defineProps<DropzoneProps>(), {
  maxSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 10,
  disabled: false,
  variant: 'default',
})

const emit = defineEmits<{
  filesAccepted: [files: File[]]
  filesRejected: [files: FileRejection[]]
}>()

const isDragging = ref(false)
const acceptedFiles = ref<File[]>([])
const rejectedFiles = ref<FileRejection[]>([])
const inputRef = ref<HTMLInputElement | null>(null)

const state = computed<DropzoneState>(() => ({
  isDragging: isDragging.value,
  isDisabled: props.disabled,
  acceptedFiles: acceptedFiles.value,
  rejectedFiles: rejectedFiles.value,
}))

const stateVariant = computed(() => {
  if (props.disabled) return 'disabled'
  if (isDragging.value) return 'dragging'
  return 'idle'
})

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function validateFile(file: File): FileRejection | null {
  const errors: Array<{ code: string; message: string }> = []

  if (file.size > props.maxSize) {
    errors.push({
      code: 'file-too-large',
      message: `File is larger than ${formatBytes(props.maxSize)}`,
    })
  }

  if (props.accept) {
    const acceptedTypes = Object.entries(props.accept).flatMap(([mimeType, extensions]) => {
      return [mimeType, ...extensions]
    })

    const fileType = file.type
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`

    const isAccepted = acceptedTypes.some((type) => {
      if (type.startsWith('.')) {
        return fileExtension === type.toLowerCase()
      }
      if (type.endsWith('/*')) {
        return fileType.startsWith(type.replace('/*', '/'))
      }
      return fileType === type
    })

    if (!isAccepted) {
      errors.push({
        code: 'file-invalid-type',
        message: 'File type not accepted',
      })
    }
  }

  return errors.length > 0 ? { file, errors } : null
}

function processFiles(fileList: FileList | null) {
  if (!fileList || props.disabled) return

  const files = Array.from(fileList).slice(0, props.maxFiles)
  const accepted: File[] = []
  const rejected: FileRejection[] = []

  files.forEach((file) => {
    const rejection = validateFile(file)
    if (rejection) {
      rejected.push(rejection)
    } else {
      accepted.push(file)
    }
  })

  acceptedFiles.value = [...acceptedFiles.value, ...accepted]
  rejectedFiles.value = [...rejectedFiles.value, ...rejected]

  if (accepted.length > 0) {
    emit('filesAccepted', accepted)
  }
  if (rejected.length > 0) {
    emit('filesRejected', rejected)
  }
}

function handleDragEnter(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()
  if (!props.disabled) {
    isDragging.value = true
  }
}

function handleDragLeave(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = false
}

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = false
  processFiles(e.dataTransfer?.files ?? null)
}

function handleClick() {
  if (!props.disabled) {
    inputRef.value?.click()
  }
}

function handleInputChange(e: Event) {
  const target = e.target as HTMLInputElement
  processFiles(target.files)
  target.value = ''
}

const acceptString = computed(() => {
  if (!props.accept) return undefined
  return Object.entries(props.accept)
    .flatMap(([mimeType, extensions]) => [mimeType, ...extensions])
    .join(',')
})
</script>

<template>
  <div
    :class="cn(dropzoneVariants({ state: stateVariant, variant }), props.class)"
    role="button"
    :tabindex="disabled ? -1 : 0"
    :aria-disabled="disabled"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragover="handleDragOver"
    @drop="handleDrop"
    @click="handleClick"
  >
    <input
      ref="inputRef"
      type="file"
      :accept="acceptString"
      :multiple="maxFiles > 1"
      :disabled="disabled"
      class="hidden"
      @change="handleInputChange"
    />

    <slot :state="state">
      <!-- Default content -->
      <div class="flex flex-col items-center gap-3 text-center">
        <div
          :class="cn(
            'flex items-center justify-center w-16 h-16 border-3 border-foreground bg-muted transition-all duration-200',
            isDragging && 'bg-primary border-primary shadow-[4px_4px_0px_hsl(var(--foreground))] -translate-x-1 -translate-y-1'
          )"
        >
          <Upload
            :class="cn(
              'h-8 w-8 transition-all duration-200',
              isDragging ? 'text-primary-foreground animate-bounce' : 'text-foreground'
            )"
          />
        </div>
        <template v-if="variant !== 'minimal'">
          <p class="font-black uppercase tracking-wide text-lg">
            {{ isDragging ? 'Drop files here' : 'Drag & drop files' }}
          </p>
          <p class="text-sm text-muted-foreground font-bold">
            or click to browse
          </p>
        </template>
      </div>
    </slot>
  </div>
</template>
