import * as React from 'react'
import { cn } from '@/lib/utils'

/*
 * Bubble — the hard-edged message surface. No tail: the offset shadow does the
 * pointing, falling towards the author's side (right for assistant/start,
 * left for user/end). With `align="auto"` it reads the side from an enclosing
 * <Message> via `group/message`.
 */

export type BubbleVariant = 'default' | 'primary' | 'muted' | 'outline'
export type BubbleAlign = 'auto' | 'start' | 'end'

export interface BubbleReaction {
  emoji: string
  count: number
  /** Accessible name for the emoji, e.g. "thumbs up". Defaults to the emoji. */
  label?: string
  /** The current user reacted with this emoji. */
  active?: boolean
}

const variantClasses: Record<BubbleVariant, string> = {
  default: 'bg-card text-card-foreground',
  primary: 'bg-primary text-primary-foreground',
  muted: 'bg-muted text-foreground',
  outline: 'bg-transparent text-foreground',
}

const shadowStart = 'shadow-[4px_4px_0px_hsl(var(--shadow-color))]'
const shadowEnd = 'shadow-[-4px_4px_0px_hsl(var(--shadow-color))]'
const alignClasses: Record<BubbleAlign, string> = {
  start: shadowStart,
  end: shadowEnd,
  auto: `${shadowStart} group-data-[from=user]/message:shadow-[-4px_4px_0px_hsl(var(--shadow-color))]`,
}

export interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BubbleVariant
  /** Which side the shadow falls towards. `auto` follows the enclosing Message. */
  align?: BubbleAlign
  /** Clamp the content to this many lines with a "Show more" toggle when it overflows. */
  collapsedLines?: number
  reactions?: BubbleReaction[]
  /** Makes reaction chips toggle buttons. */
  onReactionClick?: (reaction: BubbleReaction, index: number) => void
}

const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(
  (
    {
      className,
      variant = 'default',
      align = 'auto',
      collapsedLines,
      reactions,
      onReactionClick,
      children,
      ...props
    },
    ref
  ) => {
    const contentId = React.useId()
    const contentRef = React.useRef<HTMLDivElement>(null)
    const [expanded, setExpanded] = React.useState(false)
    const [overflowing, setOverflowing] = React.useState(false)
    const collapsible = collapsedLines != null && collapsedLines > 0
    const clamped = collapsible && !expanded

    // Only measurable while clamped; once expanded, the toggle must stay so
    // the reader can collapse again.
    React.useEffect(() => {
      const el = contentRef.current
      if (!el || !clamped) return
      const measure = () => setOverflowing(el.scrollHeight > el.clientHeight + 1)
      measure()
      if (typeof ResizeObserver === 'undefined') return
      const observer = new ResizeObserver(measure)
      observer.observe(el)
      return () => observer.disconnect()
    }, [clamped, collapsedLines, children])

    return (
      <div
        ref={ref}
        data-slot="bubble"
        data-variant={variant}
        className={cn(
          'w-fit max-w-full border-3 border-foreground px-4 py-3 text-sm leading-relaxed break-words',
          // Links and inline code inside message text.
          '[&_a]:font-bold [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-2 [&_a:hover]:decoration-4',
          '[&_code]:border-2 [&_code]:border-current [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.9em]',
          variantClasses[variant],
          variant === 'outline' ? 'shadow-none' : alignClasses[align],
          className
        )}
        {...props}
      >
        <div
          ref={contentRef}
          id={contentId}
          data-slot="bubble-content"
          data-state={collapsible ? (expanded ? 'expanded' : 'collapsed') : undefined}
          className={cn('space-y-2', clamped && 'overflow-hidden')}
          style={
            clamped
              ? { display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: collapsedLines }
              : undefined
          }
        >
          {children}
        </div>

        {collapsible && (overflowing || expanded) && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 text-xs font-bold uppercase tracking-wide underline decoration-2 underline-offset-4 hover:decoration-4 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}

        {reactions && reactions.length > 0 && (
          <ul aria-label="Reactions" className="mt-3 flex flex-wrap gap-1.5">
            {reactions.map((reaction, index) => {
              const chip = cn(
                'inline-flex items-center gap-1 border-2 border-foreground px-1.5 py-0.5 text-xs font-bold',
                reaction.active
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-background text-foreground'
              )
              const label = `${reaction.label ?? reaction.emoji}: ${reaction.count}`
              return (
                <li key={`${reaction.emoji}-${index}`}>
                  {onReactionClick ? (
                    <button
                      type="button"
                      aria-pressed={!!reaction.active}
                      aria-label={label}
                      onClick={() => onReactionClick(reaction, index)}
                      className={cn(
                        chip,
                        'shadow-[2px_2px_0px_hsl(var(--shadow-color))] transition duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring'
                      )}
                    >
                      <span aria-hidden="true">{reaction.emoji}</span>
                      <span aria-hidden="true">{reaction.count}</span>
                    </button>
                  ) : (
                    <span className={chip}>
                      <span aria-hidden="true">{reaction.emoji}</span>
                      <span aria-hidden="true">{reaction.count}</span>
                      <span className="sr-only">{label}</span>
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
)
Bubble.displayName = 'Bubble'

export { Bubble }
