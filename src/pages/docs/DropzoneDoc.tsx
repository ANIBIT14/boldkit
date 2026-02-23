import { useState } from 'react'
import { Dropzone, FileList } from '@/components/ui/dropzone'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import { Spinner } from '@/components/ui/spinner'
import { Upload, X, File, Image } from 'lucide-react'

const dropzoneVariants = cva(
  'relative flex flex-col items-center justify-center border-3 border-dashed border-foreground transition-all duration-200 cursor-pointer',
  {
    variants: {
      state: {
        idle: 'bg-background hover:bg-muted/50',
        dragging: 'border-solid border-primary bg-primary/10 scale-[1.02] shadow-[4px_4px_0px_hsl(var(--primary))]',
        disabled: 'opacity-50 cursor-not-allowed',
      },
      variant: {
        default: 'p-8',
        compact: 'p-4',
        minimal: 'p-2 border-none',
      },
    },
    defaultVariants: { state: 'idle', variant: 'default' },
  }
)

export interface DropzoneProps {
  onFilesAccepted: (files: File[]) => void
  onFilesRejected?: (files: FileRejection[]) => void
  accept?: Record<string, string[]>
  maxSize?: number
  maxFiles?: number
  disabled?: boolean
  variant?: 'default' | 'compact' | 'minimal'
  children?: React.ReactNode | ((state: DropzoneState) => React.ReactNode)
}

export { Dropzone, FileList, dropzoneVariants }`

const vueSourceCode = `<script setup lang="ts">
import { ref, computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import { Spinner } from '@/components/ui/spinner'
import { Upload, X, File, Image } from 'lucide-vue-next'

const dropzoneVariants = cva(
  'relative flex flex-col items-center justify-center border-3 border-dashed border-foreground transition-all duration-200 cursor-pointer',
  {
    variants: {
      state: {
        idle: 'bg-background hover:bg-muted/50',
        dragging: 'border-solid border-primary bg-primary/10 scale-[1.02] shadow-[4px_4px_0px_hsl(var(--primary))]',
        disabled: 'opacity-50 cursor-not-allowed',
      },
      variant: {
        default: 'p-8',
        compact: 'p-4',
        minimal: 'p-2 border-none',
      },
    },
    defaultVariants: { state: 'idle', variant: 'default' },
  }
)

interface Props {
  accept?: Record<string, string[]>
  maxSize?: number
  maxFiles?: number
  disabled?: boolean
  variant?: 'default' | 'compact' | 'minimal'
}

const emit = defineEmits<{
  filesAccepted: [files: File[]]
  filesRejected: [files: FileRejection[]]
}>()
</script>

<template>
  <div
    :class="dropzoneVariants({ state, variant })"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragover="handleDragOver"
    @drop="handleDrop"
    @click="handleClick"
  >
    <slot :state="state">
      <!-- Default content -->
    </slot>
  </div>
</template>`

const usageCode = `import { Dropzone, FileList } from '@/components/ui/dropzone'

export default function Example() {
  const [files, setFiles] = useState([])

  return (
    <>
      <Dropzone
        onFilesAccepted={(accepted) => setFiles(prev => [...prev, ...accepted])}
        accept={{ 'image/*': ['.png', '.jpg', '.gif'] }}
        maxSize={5 * 1024 * 1024}
      />
      <FileList
        files={files.map(f => ({ file: f }))}
        onRemove={(file) => setFiles(prev => prev.filter(f => f !== file))}
      />
    </>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import { ref } from 'vue'
import { Dropzone, FileList } from '@/components/ui'

const files = ref([])

function handleFilesAccepted(accepted) {
  files.value.push(...accepted)
}

function handleRemove(file) {
  files.value = files.value.filter(f => f !== file)
}
</script>

<template>
  <Dropzone
    @files-accepted="handleFilesAccepted"
    :accept="{ 'image/*': ['.png', '.jpg', '.gif'] }"
    :max-size="5 * 1024 * 1024"
  />
  <FileList
    :files="files.map(f => ({ file: f }))"
    @remove="handleRemove"
  />
</template>`

export function DropzoneDoc() {
  const [files, setFiles] = useState<File[]>([])
  const [uploadingFiles, setUploadingFiles] = useState<Array<{ file: File; progress: number }>>([])

  const handleFilesAccepted = (acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
  }

  const handleRemove = (file: File) => {
    setFiles((prev) => prev.filter((f) => f !== file))
  }

  const simulateUpload = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({ file, progress: 0 }))
    setUploadingFiles(newFiles)

    newFiles.forEach((item, index) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadingFiles((prev) =>
          prev.map((f, i) => (i === index ? { ...f, progress } : f))
        )
        if (progress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setUploadingFiles((prev) => prev.filter((_, i) => i !== index))
            setFiles((prev) => [...prev, item.file])
          }, 500)
        }
      }, 200)
    })
  }

  return (
    <>
      <ComponentDoc
        name="Dropzone"
        description="Drag-and-drop file upload with validation and progress tracking."
        dependencies={['class-variance-authority', 'lucide-react']}
        vueDependencies={['class-variance-authority', 'lucide-vue-next']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="space-y-4">
          <Dropzone onFilesAccepted={handleFilesAccepted} />
          {files.length > 0 && (
            <FileList
              files={files.map((f) => ({ file: f }))}
              onRemove={handleRemove}
            />
          )}
        </div>
      </ComponentDoc>

      <ExampleSection
        title="Variants"
        description="Different visual styles for various contexts."
        code={`<Dropzone variant="default" onFilesAccepted={handleFiles} />
<Dropzone variant="compact" onFilesAccepted={handleFiles} />
<Dropzone variant="minimal" onFilesAccepted={handleFiles} />`}
        vueCode={`<template>
  <Dropzone variant="default" @files-accepted="handleFiles" />
  <Dropzone variant="compact" @files-accepted="handleFiles" />
  <Dropzone variant="minimal" @files-accepted="handleFiles" />
</template>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs font-bold uppercase mb-2">Default</p>
            <Dropzone variant="default" onFilesAccepted={() => {}} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase mb-2">Compact</p>
            <Dropzone variant="compact" onFilesAccepted={() => {}} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase mb-2">Minimal</p>
            <Dropzone variant="minimal" onFilesAccepted={() => {}} />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="File Type Restrictions"
        description="Accept only specific file types."
        code={`<Dropzone
  onFilesAccepted={handleFiles}
  accept={{
    'image/*': ['.png', '.jpg', '.gif', '.webp'],
  }}
/>`}
        vueCode={`<template>
  <Dropzone
    @files-accepted="handleFiles"
    :accept="{ 'image/*': ['.png', '.jpg', '.gif', '.webp'] }"
  />
</template>`}
      >
        <Dropzone
          onFilesAccepted={() => {}}
          accept={{
            'image/*': ['.png', '.jpg', '.gif', '.webp'],
          }}
        >
          {({ isDragging }) => (
            <div className="flex flex-col items-center gap-2 text-center">
              <div
                className={`h-8 w-8 text-muted-foreground transition-all ${
                  isDragging ? 'text-primary animate-bounce' : ''
                }`}
              >
                📷
              </div>
              <p className="font-bold uppercase">
                {isDragging ? 'Drop images here' : 'Images only'}
              </p>
              <p className="text-sm text-muted-foreground">PNG, JPG, GIF, WebP</p>
            </div>
          )}
        </Dropzone>
      </ExampleSection>

      <ExampleSection
        title="With Upload Progress"
        description="Show upload progress for each file."
        code={`<FileList
  files={files.map(f => ({
    file: f.file,
    progress: f.progress,
    uploading: f.progress < 100
  }))}
/>`}
        vueCode={`<template>
  <FileList
    :files="files.map(f => ({
      file: f.file,
      progress: f.progress,
      uploading: f.progress < 100
    }))"
  />
</template>`}
      >
        <div className="space-y-4">
          <Dropzone onFilesAccepted={simulateUpload} />
          {uploadingFiles.length > 0 && (
            <FileList
              files={uploadingFiles.map((f) => ({
                file: f.file,
                progress: f.progress,
                uploading: true,
              }))}
            />
          )}
        </div>
      </ExampleSection>

      <ExampleSection
        title="Disabled State"
        description="Prevent file uploads when disabled."
        code={`<Dropzone disabled onFilesAccepted={handleFiles} />`}
        vueCode={`<template>
  <Dropzone disabled @files-accepted="handleFiles" />
</template>`}
      >
        <Dropzone disabled onFilesAccepted={() => {}} />
      </ExampleSection>
    </>
  )
}
