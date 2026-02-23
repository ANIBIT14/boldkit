<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import Progress from './Progress.vue'
import Spinner from './Spinner.vue'
import { X, File, Image, FileText, FileCode, FileAudio, FileVideo } from 'lucide-vue-next'

interface FileItem {
  file: File
  progress?: number
  error?: string
  uploading?: boolean
}

interface FileListProps {
  files: FileItem[]
  class?: string
}

const props = defineProps<FileListProps>()

const emit = defineEmits<{
  remove: [file: File]
}>()

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith('image/')) return Image
  if (mimeType.startsWith('video/')) return FileVideo
  if (mimeType.startsWith('audio/')) return FileAudio
  if (mimeType.includes('pdf') || mimeType.includes('document')) return FileText
  if (mimeType.includes('code') || mimeType.includes('javascript') || mimeType.includes('json')) return FileCode
  return File
}

function handleRemove(file: File) {
  emit('remove', file)
}
</script>

<template>
  <div v-if="files.length > 0" :class="cn('space-y-2 mt-4', props.class)">
    <div
      v-for="(item, index) in files"
      :key="`${item.file.name}-${index}`"
      :class="cn(
        'flex items-center gap-3 p-3 border-3 border-foreground bg-background shadow-[3px_3px_0px_hsl(var(--shadow-color))]',
        item.error && 'border-destructive bg-destructive/10 shadow-[3px_3px_0px_hsl(var(--destructive))]'
      )"
    >
      <div class="flex items-center justify-center w-10 h-10 bg-muted border-3 border-foreground">
        <component :is="getFileIcon(item.file.type)" class="h-5 w-5" />
      </div>

      <div class="flex-1 min-w-0">
        <p class="font-bold text-sm truncate">{{ item.file.name }}</p>
        <p class="text-xs text-muted-foreground">{{ formatBytes(item.file.size) }}</p>
        <p v-if="item.error" class="text-xs text-destructive font-bold">{{ item.error }}</p>
        <Progress
          v-if="item.uploading && item.progress !== undefined"
          :model-value="item.progress"
          class="h-2 mt-1"
        />
      </div>

      <Spinner v-if="item.uploading" size="sm" />
      <button
        v-else
        type="button"
        class="flex items-center justify-center w-8 h-8 border-3 border-foreground bg-background hover:bg-destructive hover:text-destructive-foreground hover:shadow-[2px_2px_0px_hsl(var(--foreground))] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
        @click.stop="handleRemove(item.file)"
      >
        <X class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>
