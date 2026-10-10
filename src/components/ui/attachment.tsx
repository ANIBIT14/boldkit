import * as React from 'react'
import { Download, File, FileAudio, FileCode, FileText, FileVideo, Image, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'

/*
 * Attachment — a file or image card inside a message.
 *
 * When the card opens something (`href` or `onOpen`) it uses the
 * stretched-link pattern: the file name is the one real link/button and its
 * ::after covers the card, while the action buttons sit above it (z-10) as
 * siblings — never nested inside another interactive element.
 */

export type AttachmentState = 'uploading' | 'done' | 'error'

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
  if (mimeType.includes('code') || mimeType.includes('javascript') || mimeType.includes('json'))
    return FileCode
  return File
}

export interface AttachmentProps extends React.HTMLAttributes<HTMLDivElement> {
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
  /** Makes the whole card a button (ignored when `href` is set). */
  onOpen?: () => void
  state?: AttachmentState
  /** Upload progress 0–100. Omit while uploading for an indeterminate bar. */
  progress?: number
  /** Error message for `state="error"`. */
  error?: string
  onDownload?: () => void
  onRemove?: () => void
}

const actionClass =
  'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center border-2 border-foreground bg-background text-foreground transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_hsl(var(--shadow-color))] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring'

const Attachment = React.forwardRef<HTMLDivElement, AttachmentProps>(
  (
    {
      className,
      name,
      size,
      type,
      src,
      alt = '',
      aspectRatio = 4 / 3,
      href,
      onOpen,
      state = 'done',
      progress,
      error,
      onDownload,
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    const uploading = state === 'uploading'
    const failed = state === 'error'
    // An in-flight upload has nothing to open yet.
    const opens = !uploading && (href != null || onOpen != null)
    const isImage = src != null

    const stretched =
      'after:absolute after:inset-0 after:content-[""] focus-visible:outline-none focus-visible:after:ring-3 focus-visible:after:ring-ring focus-visible:after:ring-offset-2'
    const nameClass = 'block truncate text-sm font-bold'
    const title = opens ? (
      href != null ? (
        <a href={href} className={cn(nameClass, stretched, 'hover:underline')}>
          {name}
        </a>
      ) : (
        <button
          type="button"
          onClick={onOpen}
          className={cn(nameClass, stretched, 'max-w-full text-left hover:underline')}
        >
          {name}
        </button>
      )
    ) : (
      <span className={nameClass}>{name}</span>
    )

    let meta: React.ReactNode = size != null ? formatBytes(size) : null
    if (uploading) meta = progress != null ? `Uploading · ${Math.round(progress)}%` : 'Uploading…'
    if (failed) meta = error ?? 'Upload failed'

    return (
      <div
        ref={ref}
        data-slot="attachment"
        data-state={state}
        className={cn(
          'relative flex w-72 max-w-full flex-col border-3 border-foreground bg-card text-card-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition duration-200',
          opens && 'hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
          failed && 'border-destructive shadow-[4px_4px_0px_hsl(var(--destructive))]',
          className
        )}
        {...props}
      >
        {isImage && (
          <div className="overflow-hidden border-b-3 border-inherit" style={{ aspectRatio }}>
            <img
              src={src}
              alt={alt}
              className={cn('h-full w-full object-cover', uploading && 'opacity-60')}
            />
          </div>
        )}

        <div className="flex items-center gap-3 p-3">
          {!isImage && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border-3 border-foreground bg-muted">
              {/* A lookup of module-level icons, not a component created during render. */}
              {React.createElement(getFileIcon(type), { className: 'h-5 w-5', 'aria-hidden': true })}
            </div>
          )}
          <div className="min-w-0 flex-1">
            {title}
            {meta != null && (
              <p
                className={cn(
                  'text-xs font-bold uppercase tracking-wide',
                  failed ? 'text-destructive' : 'text-muted-foreground'
                )}
              >
                {meta}
              </p>
            )}
          </div>
          {(onDownload || onRemove || children) && (
            <div className="relative z-10 flex shrink-0 items-center gap-1.5">
              {children}
              {onDownload && !uploading && !failed && (
                <button
                  type="button"
                  aria-label={`Download ${name}`}
                  onClick={onDownload}
                  className={cn(actionClass, 'hover:bg-primary hover:text-primary-foreground')}
                >
                  <Download className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                </button>
              )}
              {onRemove && (
                <button
                  type="button"
                  aria-label={uploading ? `Cancel upload of ${name}` : `Remove ${name}`}
                  onClick={onRemove}
                  className={cn(actionClass, 'hover:bg-destructive hover:text-destructive-foreground')}
                >
                  <X className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                </button>
              )}
            </div>
          )}
        </div>

        {uploading && (
          <div className="px-3 pb-3">
            <Progress
              value={progress}
              variant={progress == null ? 'marquee' : 'smooth'}
              aria-label={`Uploading ${name}`}
              className="h-3 border-2 shadow-none"
            />
          </div>
        )}
      </div>
    )
  }
)
Attachment.displayName = 'Attachment'

export { Attachment }
