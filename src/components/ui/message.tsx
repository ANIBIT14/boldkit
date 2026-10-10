import * as React from 'react'
import { cn } from '@/lib/utils'

/*
 * Message — one conversation row. Layout is a two-column grid (avatar | body);
 * the parts read `from` / `grouped` off the row's data attributes through
 * `group/message` variants, so they need no context and compose in any order.
 *
 *   user      → avatar on the right, body right-aligned
 *   assistant → avatar on the left, body left-aligned
 *   system    → centred, no avatar
 *
 * `grouped` marks a follow-up from the same author: the header is dropped and
 * the avatar keeps its column width but collapses, so bubbles stay aligned.
 */

export type MessageFrom = 'user' | 'assistant' | 'system'

// Body parts sit in the column opposite the avatar.
const bodyColumn =
  'group-data-[from=user]/message:col-start-1 group-data-[from=assistant]/message:col-start-2'

export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  from?: MessageFrom
  /** Consecutive message from the same author: hide header, collapse avatar. */
  grouped?: boolean
}

const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ className, from = 'assistant', grouped = false, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="message"
      data-from={from}
      data-grouped={grouped}
      className={cn(
        'group/message grid w-full gap-x-3 gap-y-1.5',
        from === 'user' && 'grid-cols-[minmax(0,1fr)_auto] justify-items-end',
        from === 'assistant' && 'grid-cols-[auto_minmax(0,1fr)] justify-items-start',
        from === 'system' && 'grid-cols-1 justify-items-center',
        grouped && '-mt-2',
        className
      )}
      {...props}
    />
  )
)
Message.displayName = 'Message'

const MessageAvatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="message-avatar"
      className={cn(
        'row-span-3 row-start-1 shrink-0 self-start',
        'group-data-[from=user]/message:col-start-2 group-data-[from=assistant]/message:col-start-1 group-data-[from=system]/message:hidden',
        // Grouped: keep the column width (bubbles stay aligned) but take no height.
        'group-data-[grouped=true]/message:invisible group-data-[grouped=true]/message:h-0 group-data-[grouped=true]/message:overflow-hidden',
        className
      )}
      {...props}
    />
  )
)
MessageAvatar.displayName = 'MessageAvatar'

export interface MessageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Author name, rendered bold and uppercase. */
  name?: React.ReactNode
  /** Display timestamp, e.g. "10:42". */
  timestamp?: React.ReactNode
  /** Machine-readable value for the `<time>` element, e.g. an ISO string. */
  dateTime?: string
}

const MessageHeader = React.forwardRef<HTMLDivElement, MessageHeaderProps>(
  ({ className, name, timestamp, dateTime, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="message-header"
      className={cn(
        'flex items-baseline gap-2 text-xs',
        bodyColumn,
        'group-data-[from=user]/message:flex-row-reverse group-data-[grouped=true]/message:hidden',
        className
      )}
      {...props}
    >
      {name != null && <span className="font-bold uppercase tracking-wide">{name}</span>}
      {timestamp != null && (
        <time dateTime={dateTime} className="font-mono text-muted-foreground">
          {timestamp}
        </time>
      )}
      {children}
    </div>
  )
)
MessageHeader.displayName = 'MessageHeader'

const MessageContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="message-content"
      className={cn(
        'flex min-w-0 max-w-[min(85%,42rem)] flex-col items-start gap-2',
        bodyColumn,
        'group-data-[from=user]/message:items-end group-data-[from=system]/message:items-center',
        className
      )}
      {...props}
    />
  )
)
MessageContent.displayName = 'MessageContent'

const MessageFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="message-footer"
      className={cn(
        'flex items-center gap-1.5 pt-1 text-xs',
        bodyColumn,
        'group-data-[from=user]/message:flex-row-reverse',
        className
      )}
      {...props}
    />
  )
)
MessageFooter.displayName = 'MessageFooter'

export { Message, MessageAvatar, MessageHeader, MessageContent, MessageFooter }
