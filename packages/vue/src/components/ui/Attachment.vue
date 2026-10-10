<script setup lang="ts">
/*
 * Attachment — a file or image card inside a message.
 *
 * When the card opens something (`href` or `@open`) it uses the
 * stretched-link pattern: the file name is the one real link/button and its
 * ::after covers the card, while the action buttons sit above it (z-10) as
 * siblings — never nested inside another interactive element.
 * Extra actions go in the default slot.
 */
import { computed } from 'vue'
import { Download, File, FileAudio, FileCode, FileText, FileVideo, Image, X } from '@lucide/vue'
import { cn } from '@/lib/utils'
import Progress from './Progress.vue'

interface AttachmentProps {
  /** File name — also the accessible name of the open link and actions. */
  name: string
  /** Size in bytes. */
  size?: number
  /** MIME type, picks the file icon. */
  type?: string
  /** Image preview URL. When set, the card renders as an image card. */
  src?: string
  /** Alt text for the preview. The file name is shown beside it, so it defaults to "". */
  alt?: string
  /** Preview aspect ratio (width / height). */
  aspectRatio?: number
  /** Makes the whole card a link. */
  href?: string
  /** Bound by `@open`; makes the whole card a button (ignored when `href` is set). */
  onOpen?: () => void
  state?: 'uploading' | 'done' | 'error'
  /** Upload progress 0–100. Omit while uploading for an indeterminate bar. */
  progress?: number
  /** Error message for `state="error"`. */
  error?: string
  /** Bound by `@download`. */
  onDownload?: () => void
  /** Bound by `@remove`. */
  onRemove?: () => void
  class?: string
}

const props = withDefaults(defineProps<AttachmentProps>(), {
  alt: '',
  aspectRatio: 4 / 3,
  state: 'done',
})

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1)
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function getFileIcon(mimeType = '') {
  if (mimeType.startsWith('image/')) return Image
  if (mimeType.startsWith('video/')) return FileVideo
  if (mimeType.startsWith('audio/')) return FileAudio
  if (mimeType.includes('pdf') || mimeType.includes('document')) return FileText
  if (mimeType.includes('code') || mimeType.includes('javascript') || mimeType.includes('json')) return FileCode
  return File
}

const uploading = computed(() => props.state === 'uploading')
const failed = computed(() => props.state === 'error')
// An in-flight upload has nothing to open yet.
const opens = computed(() => !uploading.value && (props.href != null || props.onOpen != null))
const isImage = computed(() => props.src != null)
const fileIcon = computed(() => getFileIcon(props.type))

const meta = computed(() => {
  if (failed.value) return props.error ?? 'Upload failed'
  if (uploading.value)
    return props.progress != null ? `Uploading · ${Math.round(props.progress)}%` : 'Uploading…'
  return props.size != null ? formatBytes(props.size) : null
})

const nameClass = 'block truncate text-sm font-bold'
const stretched =
  'after:absolute after:inset-0 after:content-[""] focus-visible:outline-none focus-visible:after:ring-3 focus-visible:after:ring-ring focus-visible:after:ring-offset-2'
const actionClass =
  'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center border-2 border-foreground bg-background text-foreground transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_hsl(var(--shadow-color))] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring'
</script>

<template>
  <div
    data-slot="attachment"
    :data-state="props.state"
    :class="
      cn(
        'relative flex w-72 max-w-full flex-col border-3 border-foreground bg-card text-card-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition duration-200',
        opens && 'hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
        failed && 'border-destructive shadow-[4px_4px_0px_hsl(var(--destructive))]',
        props.class
      )
    "
  >
    <div v-if="isImage" class="overflow-hidden border-b-3 border-inherit" :style="{ aspectRatio: props.aspectRatio }">
      <img
        :src="props.src"
        :alt="props.alt"
        :class="cn('h-full w-full object-cover', uploading && 'opacity-60')"
      >
    </div>

    <div class="flex items-center gap-3 p-3">
      <div
        v-if="!isImage"
        class="flex h-10 w-10 shrink-0 items-center justify-center border-3 border-foreground bg-muted"
      >
        <component :is="fileIcon" class="h-5 w-5" aria-hidden="true" />
      </div>
      <div class="min-w-0 flex-1">
        <a
          v-if="opens && props.href != null"
          :href="props.href"
          :class="cn(nameClass, stretched, 'hover:underline')"
        >{{ props.name }}</a>
        <button
          v-else-if="opens"
          type="button"
          :class="cn(nameClass, stretched, 'max-w-full text-left hover:underline')"
          @click="props.onOpen?.()"
        >
          {{ props.name }}
        </button>
        <span v-else :class="nameClass">{{ props.name }}</span>
        <p
          v-if="meta != null"
          :class="cn('text-xs font-bold uppercase tracking-wide', failed ? 'text-destructive' : 'text-muted-foreground')"
        >
          {{ meta }}
        </p>
      </div>
      <div
        v-if="props.onDownload || props.onRemove || $slots.default"
        class="relative z-10 flex shrink-0 items-center gap-1.5"
      >
        <slot />
        <button
          v-if="props.onDownload && !uploading && !failed"
          type="button"
          :aria-label="`Download ${props.name}`"
          :class="cn(actionClass, 'hover:bg-primary hover:text-primary-foreground')"
          @click="props.onDownload()"
        >
          <Download class="h-4 w-4" :stroke-width="2.5" aria-hidden="true" />
        </button>
        <button
          v-if="props.onRemove"
          type="button"
          :aria-label="uploading ? `Cancel upload of ${props.name}` : `Remove ${props.name}`"
          :class="cn(actionClass, 'hover:bg-destructive hover:text-destructive-foreground')"
          @click="props.onRemove()"
        >
          <X class="h-4 w-4" :stroke-width="2.5" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div v-if="uploading" class="px-3 pb-3">
      <Progress
        :model-value="props.progress"
        :variant="props.progress == null ? 'marquee' : 'smooth'"
        :aria-label="`Uploading ${props.name}`"
        class="h-3 border-2 shadow-none"
      />
    </div>
  </div>
</template>
