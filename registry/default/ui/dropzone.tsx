import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import { Spinner } from '@/components/ui/spinner'
import { Upload, X, File, Image, FileText, FileCode, FileAudio, FileVideo } from 'lucide-react'

// Types
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

// Variants
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

// Dropzone Props
export interface DropzoneProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof dropzoneVariants> {
  onFilesAccepted: (files: File[]) => void
  onFilesRejected?: (files: FileRejection[]) => void
  accept?: Record<string, string[]>
  maxSize?: number
  maxFiles?: number
  disabled?: boolean
  children?: React.ReactNode | ((state: DropzoneState) => React.ReactNode)
}

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  (
    {
      onFilesAccepted,
      onFilesRejected,
      accept,
      maxSize = 10 * 1024 * 1024, // 10MB default
      maxFiles = 10,
      disabled = false,
      variant,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = React.useState(false)
    const [acceptedFiles, setAcceptedFiles] = React.useState<File[]>([])
    const [rejectedFiles, setRejectedFiles] = React.useState<FileRejection[]>([])
    const inputRef = React.useRef<HTMLInputElement>(null)

    const state: DropzoneState = {
      isDragging,
      isDisabled: disabled,
      acceptedFiles,
      rejectedFiles,
    }

    const stateVariant = disabled ? 'disabled' : isDragging ? 'dragging' : 'idle'

    // Validate file
    const validateFile = (file: File): FileRejection | null => {
      const errors: Array<{ code: string; message: string }> = []

      // Check file size
      if (file.size > maxSize) {
        errors.push({
          code: 'file-too-large',
          message: `File is larger than ${formatBytes(maxSize)}`,
        })
      }

      // Check file type
      if (accept) {
        const acceptedTypes = Object.entries(accept).flatMap(([mimeType, extensions]) => {
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

    // Process files
    const processFiles = (fileList: FileList | null) => {
      if (!fileList || disabled) return

      const files = Array.from(fileList).slice(0, maxFiles)
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

      setAcceptedFiles((prev) => [...prev, ...accepted])
      setRejectedFiles((prev) => [...prev, ...rejected])

      if (accepted.length > 0) {
        onFilesAccepted(accepted)
      }
      if (rejected.length > 0) {
        onFilesRejected?.(rejected)
      }
    }

    // Event handlers
    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) {
        setIsDragging(true)
      }
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      processFiles(e.dataTransfer.files)
    }

    const handleClick = () => {
      if (!disabled) {
        inputRef.current?.click()
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(e.target.files)
      e.target.value = ''
    }

    // Build accept string for input
    const acceptString = accept
      ? Object.entries(accept)
          .flatMap(([mimeType, extensions]) => [mimeType, ...extensions])
          .join(',')
      : undefined

    return (
      <div
        ref={ref}
        className={cn(dropzoneVariants({ state: stateVariant, variant }), className)}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        {...props}
      >
        <input
          ref={inputRef}
          type="file"
          accept={acceptString}
          multiple={maxFiles > 1}
          disabled={disabled}
          onChange={handleInputChange}
          className="hidden"
        />

        {typeof children === 'function' ? (
          children(state)
        ) : children ? (
          children
        ) : (
          <DefaultDropzoneContent isDragging={isDragging} variant={variant} />
        )}
      </div>
    )
  }
)
Dropzone.displayName = 'Dropzone'

// Default content
function DefaultDropzoneContent({
  isDragging,
  variant,
}: {
  isDragging: boolean
  variant: DropzoneProps['variant']
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div
        className={cn(
          'flex items-center justify-center w-16 h-16 border-3 border-foreground bg-muted transition-all duration-200',
          isDragging && 'bg-primary border-primary shadow-[4px_4px_0px_hsl(var(--foreground))] -translate-x-1 -translate-y-1'
        )}
      >
        <Upload
          className={cn(
            'h-8 w-8 transition-all duration-200',
            isDragging ? 'text-primary-foreground animate-bounce' : 'text-foreground'
          )}
        />
      </div>
      {variant !== 'minimal' && (
        <>
          <p className="font-black uppercase tracking-wide text-lg">
            {isDragging ? 'Drop files here' : 'Drag & drop files'}
          </p>
          <p className="text-sm text-muted-foreground font-bold">
            or click to browse
          </p>
        </>
      )}
    </div>
  )
}

// File List Component
export interface FileListProps extends React.HTMLAttributes<HTMLDivElement> {
  files: Array<{
    file: File
    progress?: number
    error?: string
    uploading?: boolean
  }>
  onRemove?: (file: File) => void
}

const FileList = React.forwardRef<HTMLDivElement, FileListProps>(
  ({ files, onRemove, className, ...props }, ref) => {
    if (files.length === 0) return null

    return (
      <div
        ref={ref}
        className={cn('space-y-2 mt-4', className)}
        {...props}
      >
        {files.map((item, index) => (
          <FileListItem
            key={`${item.file.name}-${index}`}
            file={item.file}
            progress={item.progress}
            error={item.error}
            uploading={item.uploading}
            onRemove={onRemove ? () => onRemove(item.file) : undefined}
          />
        ))}
      </div>
    )
  }
)
FileList.displayName = 'FileList'

// File List Item
interface FileListItemProps {
  file: File
  progress?: number
  error?: string
  uploading?: boolean
  onRemove?: () => void
}

function FileListItem({ file, progress, error, uploading, onRemove }: FileListItemProps) {
  const Icon = getFileIcon(file.type)

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 border-3 border-foreground bg-background shadow-[3px_3px_0px_hsl(var(--shadow-color))]',
        error && 'border-destructive bg-destructive/10 shadow-[3px_3px_0px_hsl(var(--destructive))]'
      )}
    >
      <div className="flex items-center justify-center w-10 h-10 bg-muted border-3 border-foreground">
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm truncate">{file.name}</p>
        <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
        {error && <p className="text-xs text-destructive font-bold">{error}</p>}
        {uploading && progress !== undefined && (
          <Progress value={progress} className="h-2 mt-1" />
        )}
      </div>

      {uploading ? (
        <Spinner size="sm" />
      ) : onRemove ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="flex items-center justify-center w-8 h-8 border-3 border-foreground bg-background hover:bg-destructive hover:text-destructive-foreground hover:shadow-[2px_2px_0px_hsl(var(--foreground))] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  )
}

// Helpers
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
  if (mimeType.includes('code') || mimeType.includes('javascript') || mimeType.includes('json'))
    return FileCode
  return File
}

export { Dropzone, FileList, dropzoneVariants }
