import * as React from 'react'
import { ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/*
 * MessageScroller — the scroll container for a conversation.
 *
 * It owns scroll behaviour only (never message rendering):
 *  - auto-follow: while the reader is within `threshold` px of the bottom, new
 *    messages and streamed growth of the last one keep the log pinned there.
 *    Growth is observed with a ResizeObserver on the content, not timers.
 *  - any upward scroll by the reader stops following (even inside `threshold`)
 *    and reveals the jump-to-latest button, which counts messages appended
 *    while the reader was away. Following resumes on reaching the bottom, or
 *    on a downward move back inside `threshold`.
 *  - `onReachTop` fires on scrolling into the top `threshold`, and also when
 *    the history doesn't overflow the viewport at all (no scroll can happen) —
 *    once per first message, so a page that loads nothing can't loop.
 *  - prepend preservation: when older history is inserted above the first
 *    message, scrollTop is shifted by the scrollHeight delta so the viewport
 *    stays on the same message. `overflow-anchor: none` turns off the browser's
 *    own scroll anchoring so the two never double-apply.
 *
 * Messages are found by their `data-message-id` attribute.
 */

export interface MessageScrollerScrollOptions {
  behavior?: ScrollBehavior
}

export interface MessageScrollerScrollToMessageOptions
  extends MessageScrollerScrollOptions {
  block?: 'start' | 'center' | 'end'
}

export interface MessageScrollerHandle {
  /** Scroll to the newest content and resume auto-follow. */
  scrollToBottom: (options?: MessageScrollerScrollOptions) => void
  /** Scroll a `[data-message-id]` element into view. Returns false when not found. */
  scrollToMessage: (id: string, options?: MessageScrollerScrollToMessageOptions) => boolean
  /** Whether the viewport is currently within `threshold` of the bottom. */
  isAtBottom: () => boolean
}

interface MessageScrollerContextValue {
  setViewport: (node: HTMLDivElement | null) => void
  setContent: (node: HTMLDivElement | null) => void
  handleScroll: () => void
  jumpToLatest: () => void
  focusViewport: () => void
  /** +1 when a consumer-placed jump button mounts, -1 when it unmounts. */
  registerJumpButton: (delta: number) => void
  atBottom: boolean
  unread: number
  streaming: boolean
}

const MessageScrollerContext = React.createContext<MessageScrollerContextValue | null>(null)

// True only around the root's own auto-placed jump button, so it doesn't
// count as a consumer-placed one.
const AutoJumpButtonContext = React.createContext(false)

function useMessageScrollerContext(part: string) {
  const ctx = React.useContext(MessageScrollerContext)
  if (!ctx) throw new Error(`<${part}> must be used within <MessageScroller>`)
  return ctx
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function scrollViewport(viewport: HTMLElement, top: number, behavior: ScrollBehavior) {
  if (behavior === 'smooth' && !prefersReducedMotion() && typeof viewport.scrollTo === 'function') {
    viewport.scrollTo({ top, behavior: 'smooth' })
  } else {
    viewport.scrollTop = top
  }
}

function distanceFromBottom(el: HTMLElement) {
  return el.scrollHeight - el.scrollTop - el.clientHeight
}

function messageIds(content: HTMLElement) {
  return Array.from(content.querySelectorAll('[data-message-id]'), (node) =>
    node.getAttribute('data-message-id')
  )
}

export interface MessageScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Marks the log `aria-busy` while a response is streaming. */
  streaming?: boolean
  /** Distance in px from the bottom (and top) that still counts as "at" it. */
  threshold?: number
  /** Called once each time the reader scrolls into the top `threshold` — load older history here. */
  onReachTop?: () => void
}

const MessageScroller = React.forwardRef<MessageScrollerHandle, MessageScrollerProps>(
  ({ className, children, streaming = false, threshold = 48, onReachTop, ...props }, ref) => {
    // Elements live in refs (they're mutated — scrollTop). `attached` bumps
    // only when a *new* element mounts, so the observer effect re-runs then —
    // and an unstable consumer ref (null → same node each render) can't loop.
    const viewportRef = React.useRef<HTMLDivElement | null>(null)
    const contentRef = React.useRef<HTMLDivElement | null>(null)
    const seenRef = React.useRef(new WeakSet<HTMLDivElement>())
    const [attached, setAttached] = React.useState(0)
    const attach = React.useCallback(
      (target: React.MutableRefObject<HTMLDivElement | null>, node: HTMLDivElement | null) => {
        target.current = node
        if (node && !seenRef.current.has(node)) {
          seenRef.current.add(node)
          setAttached((n) => n + 1)
        }
      },
      []
    )
    const setViewport = React.useCallback(
      (node: HTMLDivElement | null) => attach(viewportRef, node),
      [attach]
    )
    const setContent = React.useCallback(
      (node: HTMLDivElement | null) => attach(contentRef, node),
      [attach]
    )
    // `atBottom` mirrors "following": false is what shows the jump button.
    const [atBottom, setAtBottom] = React.useState(true)
    const [unread, setUnread] = React.useState(0)
    const [customJumpButtons, setCustomJumpButtons] = React.useState(0)

    const followingRef = React.useRef(true)
    // Last measured geometry + boundary ids. scrollHeight is only recorded by
    // `sync` (the ResizeObserver), never by the scroll handler, so a scroll
    // event landing between a prepend and its observation can't hide the delta.
    const snapshotRef = React.useRef({
      scrollTop: 0,
      scrollHeight: 0,
      firstId: null as string | null,
      lastId: null as string | null,
      nearTop: true,
      // First message id when onReachTop last fired for non-overflowing content.
      reachTopFiredFor: undefined as string | null | undefined,
    })
    const onReachTopRef = React.useRef(onReachTop)
    React.useEffect(() => {
      onReachTopRef.current = onReachTop
    }, [onReachTop])

    const sync = React.useCallback(() => {
      const viewport = viewportRef.current
      const content = contentRef.current
      if (!viewport || !content) return
      const snap = snapshotRef.current
      const ids = messageIds(content)
      const firstId = ids[0] ?? null
      const lastId = ids[ids.length - 1] ?? null

      // Messages appended after the previously-last one (for the unread badge).
      let appended = 0
      if (snap.lastId !== null && lastId !== snap.lastId) {
        const index = ids.lastIndexOf(snap.lastId)
        if (index !== -1) appended = ids.length - 1 - index
      }
      // History inserted above the previously-first message.
      const prepended =
        snap.firstId !== null && firstId !== snap.firstId && ids.includes(snap.firstId)

      if (followingRef.current) {
        viewport.scrollTop = viewport.scrollHeight
      } else if (prepended) {
        viewport.scrollTop = snap.scrollTop + (viewport.scrollHeight - snap.scrollHeight)
      }

      if (distanceFromBottom(viewport) <= 1) followingRef.current = true
      if (followingRef.current) setUnread(0)
      else if (appended > 0) setUnread((n) => n + appended)
      setAtBottom(followingRef.current)

      snap.scrollTop = viewport.scrollTop
      snap.scrollHeight = viewport.scrollHeight
      snap.firstId = firstId
      snap.lastId = lastId

      // Nothing to scroll means no top-zone transition will ever happen, so ask
      // for more history directly — again only once the first message changed.
      const fits = viewport.scrollHeight - viewport.clientHeight <= threshold
      if (fits && snap.reachTopFiredFor !== firstId) {
        snap.reachTopFiredFor = firstId
        onReachTopRef.current?.()
      }
    }, [threshold])

    React.useEffect(() => {
      const viewport = viewportRef.current
      const content = contentRef.current
      if (!viewport || !content) return
      sync()
      if (typeof ResizeObserver === 'undefined') return
      const observer = new ResizeObserver(() => sync())
      observer.observe(content)
      observer.observe(viewport)
      return () => observer.disconnect()
    }, [attached, sync])

    const handleScroll = React.useCallback(() => {
      const viewport = viewportRef.current
      if (!viewport) return
      const snap = snapshotRef.current
      const top = viewport.scrollTop
      const distance = distanceFromBottom(viewport)
      // Our own scrolls never read as upward: sync/prepend anchoring/
      // scrollToBottom only move down and record snap.scrollTop afterwards, and
      // a clamp from shrinking content lands exactly at the bottom.
      if (distance <= 1) followingRef.current = true
      else if (top < snap.scrollTop - 1) followingRef.current = false
      else if (distance <= threshold) followingRef.current = true
      if (followingRef.current) setUnread(0)
      setAtBottom(followingRef.current)
      snap.scrollTop = top

      const nearTop = top <= threshold
      if (nearTop && !snap.nearTop) onReachTopRef.current?.()
      snap.nearTop = nearTop
    }, [threshold])

    const scrollToBottom = React.useCallback(
      ({ behavior = 'smooth' }: MessageScrollerScrollOptions = {}) => {
        const viewport = viewportRef.current
        if (!viewport) return
        followingRef.current = true
        setUnread(0)
        setAtBottom(true)
        scrollViewport(viewport, viewport.scrollHeight, behavior)
        snapshotRef.current.scrollTop = viewport.scrollTop
      },
      []
    )

    const scrollToMessage = React.useCallback(
      (id: string, { behavior = 'smooth', block = 'start' }: MessageScrollerScrollToMessageOptions = {}) => {
        const viewport = viewportRef.current
        const content = contentRef.current
        if (!viewport || !content) return false
        const target = Array.from(content.querySelectorAll<HTMLElement>('[data-message-id]')).find(
          (node) => node.getAttribute('data-message-id') === id
        )
        if (!target) return false
        const rect = target.getBoundingClientRect()
        let top = rect.top - viewport.getBoundingClientRect().top + viewport.scrollTop
        if (block === 'center') top -= (viewport.clientHeight - rect.height) / 2
        if (block === 'end') top -= viewport.clientHeight - rect.height
        const maxTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight)
        top = Math.min(maxTop, Math.max(0, top))
        followingRef.current = maxTop - top <= threshold
        setAtBottom(followingRef.current)
        scrollViewport(viewport, top, behavior)
        snapshotRef.current.scrollTop = viewport.scrollTop
        return true
      },
      [threshold]
    )

    React.useImperativeHandle(
      ref,
      () => ({
        scrollToBottom,
        scrollToMessage,
        isAtBottom: () =>
          viewportRef.current ? distanceFromBottom(viewportRef.current) <= threshold : true,
      }),
      [scrollToBottom, scrollToMessage, threshold]
    )

    const focusViewport = React.useCallback(
      () => viewportRef.current?.focus({ preventScroll: true }),
      []
    )
    // Stable, so a consumer jump button's register effect runs once per mount.
    const registerJumpButton = React.useCallback(
      (delta: number) => setCustomJumpButtons((n) => n + delta),
      []
    )

    const contextValue = React.useMemo<MessageScrollerContextValue>(
      () => ({
        setViewport,
        setContent,
        handleScroll,
        jumpToLatest: () => scrollToBottom({ behavior: 'smooth' }),
        focusViewport,
        registerJumpButton,
        atBottom,
        unread,
        streaming,
      }),
      [
        setViewport,
        setContent,
        handleScroll,
        scrollToBottom,
        focusViewport,
        registerJumpButton,
        atBottom,
        unread,
        streaming,
      ]
    )

    return (
      <MessageScrollerContext.Provider value={contextValue}>
        <div
          data-slot="message-scroller"
          data-at-bottom={atBottom}
          className={cn('relative flex min-h-0 flex-col', className)}
          {...props}
        >
          {children}
          {/* Auto-placed unless a consumer's jump button is mounted anywhere inside. */}
          {customJumpButtons === 0 && (
            <AutoJumpButtonContext.Provider value={true}>
              <MessageScrollerJumpButton />
            </AutoJumpButtonContext.Provider>
          )}
        </div>
      </MessageScrollerContext.Provider>
    )
  }
)
MessageScroller.displayName = 'MessageScroller'

const MessageScrollerContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, onScroll, ...props }, ref) => {
  const { setViewport, setContent, handleScroll, streaming } =
    useMessageScrollerContext('MessageScrollerContent')
  const viewportRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      setViewport(node)
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [setViewport, ref]
  )

  return (
    <div
      ref={viewportRef}
      role="log"
      aria-live="polite"
      aria-label="Conversation"
      // A keyboard user must be able to focus the region to scroll it.
      tabIndex={0}
      data-slot="message-scroller-content"
      {...props}
      aria-busy={streaming || undefined}
      onScroll={(event) => {
        onScroll?.(event)
        handleScroll()
      }}
      className={cn(
        'bk-scroll-fade min-h-0 flex-1 overflow-y-auto overscroll-contain [overflow-anchor:none] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring',
        className
      )}
    >
      <div
        ref={setContent}
        data-slot="message-scroller-list"
        className="flex min-h-full flex-col justify-end gap-4 p-4"
      >
        {children}
      </div>
    </div>
  )
})
MessageScrollerContent.displayName = 'MessageScrollerContent'

const MessageScrollerJumpButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, ...props }, ref) => {
  const ctx = useMessageScrollerContext('MessageScrollerJumpButton')
  const isAuto = React.useContext(AutoJumpButtonContext)
  const { registerJumpButton } = ctx
  React.useEffect(() => {
    if (isAuto) return
    registerJumpButton(1)
    return () => registerJumpButton(-1)
  }, [isAuto, registerJumpButton])

  if (ctx.atBottom) return null
  const count = ctx.unread > 99 ? '99+' : String(ctx.unread)

  return (
    <button
      ref={ref}
      type="button"
      data-slot="message-scroller-jump-button"
      aria-label={
        ctx.unread > 0
          ? `Jump to latest message, ${ctx.unread} new`
          : 'Jump to latest message'
      }
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        // The button unmounts once following resumes; hand keyboard focus to
        // the log instead of letting it fall to <body>.
        if (document.activeElement === event.currentTarget) ctx.focusViewport()
        ctx.jumpToLatest()
      }}
      className={cn(
        'absolute bottom-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center border-3 border-foreground bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition duration-200 animate-in fade-in-0 slide-in-from-bottom-2 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
    >
      {children ?? <ArrowDown className="h-5 w-5" strokeWidth={3} aria-hidden="true" />}
      {ctx.unread > 0 && (
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-3 flex h-6 min-w-6 items-center justify-center border-2 border-foreground bg-accent px-1 text-xs font-bold text-accent-foreground"
        >
          {count}
        </span>
      )}
    </button>
  )
})
MessageScrollerJumpButton.displayName = 'MessageScrollerJumpButton'

export { MessageScroller, MessageScrollerContent, MessageScrollerJumpButton }
