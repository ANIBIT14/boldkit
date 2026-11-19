import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

/*
 * CodeBlock — code, terminal output, logs and diffs. A bordered slab with a
 * hard shadow; `size="sm"` drops to a 2px border and 2px shadow for tool
 * output nested inside a Trace.
 *
 * Highlighting is out of scope: pass plain text (split into numbered lines
 * when `lineNumbers` is on) or your own highlighter's markup.
 */

const codeBlockVariants = cva(
  'group/code-block relative flex w-full min-w-0 flex-col overflow-hidden border-foreground bg-background text-foreground',
  {
    variants: {
      variant: {
        default: '',
        destructive:
          '[&_[data-slot=code-block-header]]:bg-destructive [&_[data-slot=code-block-header]]:text-destructive-foreground',
      },
      size: {
        default: 'border-3 text-sm shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        sm: 'border-2 text-xs shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface CodeBlockProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof codeBlockVariants> {}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => (
    <div
      ref={ref}
      data-slot="code-block"
      data-variant={variant}
      data-size={size}
      className={cn(codeBlockVariants({ variant, size }), className)}
      {...props}
    />
  )
)
CodeBlock.displayName = 'CodeBlock'

const CodeBlockHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="code-block-header"
      className={cn(
        'flex min-w-0 shrink-0 items-center gap-2 border-b-3 border-foreground bg-muted px-3 py-1.5 group-data-[size=sm]/code-block:border-b-2 group-data-[size=sm]/code-block:px-2 group-data-[size=sm]/code-block:py-1',
        className
      )}
      {...props}
    />
  )
)
CodeBlockHeader.displayName = 'CodeBlockHeader'

const CodeBlockTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="code-block-title"
      className={cn(
        'flex min-w-0 items-center gap-2 truncate text-xs font-bold uppercase tracking-wider [&_svg]:size-3.5 [&_svg]:shrink-0',
        className
      )}
      {...props}
    />
  )
)
CodeBlockTitle.displayName = 'CodeBlockTitle'

/**
 * Inside a header: sits at the end of the row. Placed directly in the
 * CodeBlock: floats over the top-right corner and appears on hover/focus
 * (always visible on touch screens).
 */
const CodeBlockActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="code-block-actions"
      className={cn(
        'ms-auto flex shrink-0 items-center gap-1.5',
        '[[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:right-2 [[data-slot=code-block]>&]:top-2 [[data-slot=code-block]>&]:z-10 [[data-slot=code-block]>&]:opacity-0 [[data-slot=code-block]>&]:transition-opacity [[data-slot=code-block]>&]:group-hover/code-block:opacity-100 [[data-slot=code-block]>&]:group-focus-within/code-block:opacity-100 [[data-slot=code-block]>&]:pointer-coarse:opacity-100',
        className
      )}
      {...props}
    />
  )
)
CodeBlockActions.displayName = 'CodeBlockActions'

export interface CodeBlockCopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The text written to the clipboard. */
  value: string
}

const CodeBlockCopyButton = React.forwardRef<HTMLButtonElement, CodeBlockCopyButtonProps>(
  ({ value, className, onClick, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    React.useEffect(() => {
      if (!copied) return
      const timeout = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timeout)
    }, [copied])

    return (
      <>
        <button
          ref={ref}
          type="button"
          data-slot="code-block-copy-button"
          data-copied={copied || undefined}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className={cn(
            'inline-flex size-7 shrink-0 items-center justify-center border-2 border-foreground bg-background text-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] bk-interactive hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[copied]:bg-success data-[copied]:text-success-foreground [&_svg]:size-3.5',
            className
          )}
          onClick={(event) => {
            onClick?.(event)
            if (event.defaultPrevented || !navigator.clipboard) return
            navigator.clipboard
              .writeText(value)
              .then(() => setCopied(true))
              .catch(() => {})
          }}
          {...props}
        >
          {copied ? (
            <Check key="check" aria-hidden="true" className="animate-pop" strokeWidth={3} />
          ) : (
            <Copy key="copy" aria-hidden="true" strokeWidth={2.5} />
          )}
        </button>
        <span aria-live="polite" className="sr-only">
          {copied ? 'Copied' : ''}
        </span>
      </>
    )
  }
)
CodeBlockCopyButton.displayName = 'CodeBlockCopyButton'

export interface CodeBlockContentProps extends React.HTMLAttributes<HTMLPreElement> {
  /** Wrap long lines instead of scrolling horizontally. */
  wrap?: boolean
  /** Number each line. A string child is split into lines for you. */
  lineNumbers?: boolean
  /** Number of the first line. */
  startLine?: number
}

const CodeBlockContent = React.forwardRef<HTMLPreElement, CodeBlockContentProps>(
  (
    { className, children, style, wrap = false, lineNumbers = false, startLine = 1, ...props },
    ref
  ) => (
    <pre
      ref={ref}
      data-slot="code-block-content"
      data-wrap={wrap || undefined}
      data-numbered={lineNumbers || undefined}
      dir="ltr"
      tabIndex={0}
      style={{ counterReset: `line ${startLine - 1}`, ...style }}
      className={cn(
        'bk-scrollbar min-h-0 min-w-0 overflow-auto p-4 text-start font-mono leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring group-data-[size=sm]/code-block:p-2.5 data-[wrap]:whitespace-pre-wrap data-[wrap]:break-words',
        className
      )}
      {...props}
    >
      <code
        data-slot="code-block-code"
        className="grid min-w-max content-start [[data-numbered]>&]:grid-cols-[auto_1fr] [[data-wrap]>&]:min-w-0"
      >
        {lineNumbers && typeof children === 'string'
          ? children
              .replace(/\n$/, '')
              .split('\n')
              .map((line, index) => <CodeBlockLine key={index}>{line}</CodeBlockLine>)
          : children}
      </code>
    </pre>
  )
)
CodeBlockContent.displayName = 'CodeBlockContent'

const codeBlockLineVariants = cva(
  // The negative margin + padding lets the diff bar and tint run edge to edge.
  'relative -mx-4 block border-l-4 border-transparent px-4 group-data-[size=sm]/code-block:-mx-2.5 group-data-[size=sm]/code-block:px-2.5 [[data-numbered]_&]:col-span-2 [[data-numbered]_&]:grid [[data-numbered]_&]:grid-cols-subgrid [[data-numbered]_&]:[counter-increment:line] [[data-numbered]_&]:before:mr-4 [[data-numbered]_&]:before:select-none [[data-numbered]_&]:before:text-right [[data-numbered]_&]:before:font-bold [[data-numbered]_&]:before:text-muted-foreground [[data-numbered]_&]:before:content-[counter(line)]',
  {
    variants: {
      variant: {
        default: '',
        added: 'border-success bg-success/20',
        removed: 'border-destructive bg-destructive/15',
        highlighted: 'border-accent bg-accent/25',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface CodeBlockLineProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof codeBlockLineVariants> {}

const CodeBlockLine = React.forwardRef<HTMLSpanElement, CodeBlockLineProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    // An empty line holds a newline so a copied selection keeps blank lines.
    const empty =
      children === undefined ||
      children === null ||
      children === '' ||
      (Array.isArray(children) && children.length === 0)

    return (
      <span
        ref={ref}
        data-slot="code-block-line"
        data-variant={variant}
        className={cn(codeBlockLineVariants({ variant }), className)}
        {...props}
      >
        {(variant === 'added' || variant === 'removed') && (
          <span className="sr-only select-none">
            {variant === 'added' ? 'Added: ' : 'Removed: '}
          </span>
        )}
        <span data-slot="code-block-line-content" className="min-w-0">
          {empty ? '\n' : children}
        </span>
      </span>
    )
  }
)
CodeBlockLine.displayName = 'CodeBlockLine'

const CodeBlockFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="code-block-footer"
      className={cn(
        'flex min-w-0 shrink-0 items-center gap-2 border-t-3 border-foreground bg-muted px-3 py-1.5 text-xs font-bold uppercase tracking-wider group-data-[size=sm]/code-block:border-t-2',
        className
      )}
      {...props}
    />
  )
)
CodeBlockFooter.displayName = 'CodeBlockFooter'

export {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockContent,
  CodeBlockLine,
  CodeBlockFooter,
}
