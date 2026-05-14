import { useState } from 'react'
import { Dropzone, FileList } from '@/components/ui/dropzone'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/dropzone.tsx?raw'
import vueSourceCode from '@vue-ui/Dropzone.vue?raw'



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
