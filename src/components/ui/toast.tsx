/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { Toast as ToastPrimitive } from 'radix-ui'
import { CircleCheck, CircleX, Info, LoaderCircle, TriangleAlert, X } from 'lucide-react'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------------------------------
 * Store — a tiny module-level store so `toast()` can be called from anywhere (event handlers,
 * effects, plain modules). `<Toaster />` subscribes with useSyncExternalStore. Mount ONE
 * `<Toaster />`, at the app root: every mounted Toaster renders every toast.
 *
 * Updating a toast (re-adding its `id`, or a settled `toast.promise`) REPLACES its content —
 * fields you leave out are cleared — and re-adding an open `id` restarts its dismiss timer.
 * -----------------------------------------------------------------------------------------------*/

type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading'

type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'

interface ToastActionOptions {
  label: string
  onClick: () => void
  /** Screen-reader description of an alternate way to do the action. Defaults to `label`. */
  altText?: string
}

interface ToastOptions {
  /** Reuse an id to update an open toast in place. */
  id?: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: ToastVariant
  action?: ToastActionOptions
  /** Milliseconds before auto-dismiss. `Infinity` keeps it open. Defaults to the Toaster's duration. */
  duration?: number
}

interface ToastRecord extends Omit<ToastOptions, 'id'> {
  id: string
  open: boolean
  /** Increments on every in-place update (re-measures height, re-announces). */
  updateKey: number
  /** Increments when an open toast is added again with the same id (restarts its timer). */
  restartKey: number
}

type ToastPromiseState<T> = string | ToastOptions | ((value: T) => string | ToastOptions)

interface ToastPromiseOptions<T> {
  loading: string | ToastOptions
  success: ToastPromiseState<T>
  error: ToastPromiseState<unknown>
}

const EMPTY: ToastRecord[] = []
let toasts: ToastRecord[] = EMPTY
let count = 0
const listeners = new Set<() => void>()
/** Number of mounted <Toaster />s. Without one, nothing can animate a toast out. */
let toasterCount = 0
/** Toasts kept while no <Toaster /> is mounted (oldest dropped first). */
const UNMOUNTED_LIMIT = 20

function setToasts(next: ToastRecord[]) {
  toasts = next
  listeners.forEach((listener) => listener())
}

const toastStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  getSnapshot: () => toasts,
  getServerSnapshot: () => EMPTY,
  add({ id: idOption, ...options }: ToastOptions): string {
    const id = idOption ?? `bk-toast-${++count}`
    const existing = toasts.find((t) => t.id === id)
    if (existing?.open) {
      toastStore.update(id, options, true)
      return id
    }
    const next = [{ ...options, id, open: true, updateKey: 0, restartKey: 0 }, ...toasts.filter((t) => t.id !== id)]
    setToasts(toasterCount === 0 ? next.slice(0, UNMOUNTED_LIMIT) : next)
    return id
  },
  /** Replaces an open toast's content in place (fields not given are cleared). */
  update(id: string, content: Omit<ToastOptions, 'id'>, restart = false) {
    setToasts(
      toasts.map((t) =>
        t.id === id && t.open
          ? {
              ...content,
              id,
              open: true,
              updateKey: t.updateKey + 1,
              restartKey: t.restartKey + (restart ? 1 : 0),
            }
          : t
      )
    )
  },
  dismiss(id?: string) {
    if (!toasts.some((t) => t.open && (id === undefined || t.id === id))) return
    const matches = (t: ToastRecord) => id === undefined || t.id === id
    // No Toaster → no exit animation will ever finish, so drop the records outright.
    if (toasterCount === 0) setToasts(toasts.filter((t) => !matches(t)))
    else setToasts(toasts.map((t) => (matches(t) ? { ...t, open: false } : t)))
  },
  /** Drops a closed toast once its exit animation has finished. */
  remove(id: string) {
    if (toasts.some((t) => t.id === id && !t.open)) setToasts(toasts.filter((t) => t.id !== id))
  },
}

function resolveState<T>(state: ToastPromiseState<T>, value: T): ToastOptions {
  const resolved = typeof state === 'function' ? state(value) : state
  return typeof resolved === 'string' ? { title: resolved } : resolved
}

type VariantHelper = (title: React.ReactNode, options?: Omit<ToastOptions, 'title' | 'variant'>) => string

const variantHelper =
  (variant: ToastVariant): VariantHelper =>
  (title, options) =>
    toastStore.add({ ...options, title, variant })

/**
 * Show a toast. Returns its id.
 *
 * @example toast({ title: 'Saved', description: 'Your changes are live.', variant: 'success' })
 */
const toast = Object.assign((options: ToastOptions) => toastStore.add(options), {
  success: variantHelper('success'),
  error: variantHelper('error'),
  warning: variantHelper('warning'),
  info: variantHelper('info'),
  /** Dismiss one toast, or every toast when called without an id. */
  dismiss: (id?: string) => toastStore.dismiss(id),
  /** Shows a loading toast that turns into a success or error toast, in place, when the promise settles. */
  promise<T>(promise: Promise<T>, options: ToastPromiseOptions<T>): string {
    const loading = typeof options.loading === 'string' ? { title: options.loading } : options.loading
    const id = toastStore.add({ ...loading, variant: 'loading', duration: Infinity })
    promise.then(
      (value) => toastStore.update(id, { ...resolveState(options.success, value), variant: 'success' }),
      (error: unknown) => toastStore.update(id, { ...resolveState(options.error, error), variant: 'error' })
    )
    return id
  },
})

/** The current toasts (newest first), including ones still animating out. */
function useToasts() {
  return React.useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot, toastStore.getServerSnapshot)
}

/* -------------------------------------------------------------------------------------------------
 * Parts — styled Radix Toast primitives. Use these directly for fully controlled toasts, or use
 * `<Toaster />` + `toast()` for the imperative API.
 * -----------------------------------------------------------------------------------------------*/

const ToastProvider = ToastPrimitive.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    data-slot="toast-viewport"
    className={cn(
      'fixed z-[100] m-0 w-[calc(100%-2rem)] list-none p-0 outline-none sm:w-[380px]',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitive.Viewport.displayName

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    data-slot="toast"
    className={cn(
      'group/toast pointer-events-auto relative flex w-full items-stretch border-3 border-foreground bg-background text-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      // enter / exit + swipe (Radix exposes the drag offset as CSS vars)
      'duration-200 ease-out data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      'data-[swipe=move]:[transform:translateX(var(--radix-toast-swipe-move-x))] data-[swipe=cancel]:[transform:translateX(0)] data-[swipe=cancel]:transition-[transform] data-[swipe=end]:[transform:translateX(var(--radix-toast-swipe-end-x))]',
      'motion-reduce:transition-none',
      className
    )}
    {...props}
  />
))
Toast.displayName = ToastPrimitive.Root.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    data-slot="toast-title"
    className={cn('text-sm font-black uppercase leading-tight tracking-wide', className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitive.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    data-slot="toast-description"
    className={cn('text-sm font-medium text-muted-foreground', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitive.Description.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    data-slot="toast-action"
    className={cn(
      'inline-flex shrink-0 items-center self-center border-2 border-foreground bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] transition duration-150 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitive.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    data-slot="toast-close"
    aria-label="Close"
    className={cn(
      'absolute right-2 top-2 border-2 border-foreground bg-background p-0.5 text-foreground transition duration-150 ease-out hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none',
      className
    )}
    {...props}
  >
    <X className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
  </ToastPrimitive.Close>
))
ToastClose.displayName = ToastPrimitive.Close.displayName

/* -------------------------------------------------------------------------------------------------
 * Toaster — renders the store as a brutalist pile: collapsed, older toasts peek out behind the
 * newest as offset hard-edged cards; on hover/focus the pile fans out into a list.
 * -----------------------------------------------------------------------------------------------*/

const variantBlock: Record<Exclude<ToastVariant, 'default'>, { className: string; Icon: typeof Info }> = {
  success: { className: 'bg-success text-success-foreground', Icon: CircleCheck },
  error: { className: 'bg-destructive text-destructive-foreground', Icon: CircleX },
  warning: { className: 'bg-warning text-warning-foreground', Icon: TriangleAlert },
  info: { className: 'bg-info text-info-foreground', Icon: Info },
  loading: { className: 'bg-muted text-foreground', Icon: LoaderCircle },
}

const positionClasses: Record<ToastPosition, { viewport: string; toast: string }> = {
  'top-left': {
    viewport: 'left-4 top-4',
    toast: 'top-0 after:top-full data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-left-full',
  },
  'top-right': {
    viewport: 'right-4 top-4',
    toast: 'top-0 after:top-full data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-right-full',
  },
  'top-center': {
    viewport: 'left-1/2 top-4 -translate-x-1/2',
    toast: 'top-0 after:top-full data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-right-full',
  },
  'bottom-left': {
    viewport: 'bottom-4 left-4',
    toast: 'bottom-0 after:bottom-full data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-left-full',
  },
  'bottom-right': {
    viewport: 'bottom-4 right-4',
    toast: 'bottom-0 after:bottom-full data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full',
  },
  'bottom-center': {
    viewport: 'bottom-4 left-1/2 -translate-x-1/2',
    toast: 'bottom-0 after:bottom-full data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full',
  },
}

/** Pixel offsets of the collapsed pile and the gap of the expanded list. */
const PILE_X = 6
const PILE_Y = 10
const LIST_GAP = 12

/**
 * Rendered inside the Radix toast: marks it as mounted, and removes the record once Radix unmounts
 * it (after its exit animation).
 */
function ExitTracker({ id, onMount }: { id: string; onMount: () => void }) {
  React.useEffect(() => {
    onMount()
    return () => toastStore.remove(id)
  }, [id, onMount])
  return null
}

/**
 * Radix computes a toast's announcement once, on mount, so in-place updates (toast.promise,
 * re-adding an id) would be silent. This live region announces each update: it mounts empty and
 * fills a frame later (so screen readers notice the change), then clears itself.
 */
function UpdateAnnouncer({ label, assertive, children }: { label: string; assertive: boolean; children: React.ReactNode }) {
  const [phase, setPhase] = React.useState<'empty' | 'announce' | 'done'>('empty')
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setPhase('announce'))
    const timer = window.setTimeout(() => setPhase('done'), 1000)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [])
  if (phase === 'done') return null
  return (
    <div
      data-slot="toast-announcer"
      role="status"
      aria-live={assertive ? 'assertive' : 'polite'}
      aria-atomic="true"
      className="sr-only"
    >
      {phase === 'announce' && (
        <>
          {label} {children}
        </>
      )}
    </div>
  )
}

interface ToasterItemProps {
  toast: ToastRecord
  index: number
  offsetY: number
  expanded: boolean
  position: ToastPosition
  /** The Toaster's default duration (Radix falls back to it for `0`/`undefined`). */
  defaultDuration: number
  label: string
  /** Reports the toast's natural height; `null` when it unmounts. */
  onHeight: (id: string, height: number | null) => void
}

function ToasterItem({
  toast: t,
  index,
  offsetY,
  expanded,
  position,
  defaultDuration,
  label,
  onHeight,
}: ToasterItemProps) {
  // Callback-ref state: Radix renders the toast only once the viewport has mounted.
  const [content, setContent] = React.useState<HTMLDivElement | null>(null)
  const variant = t.variant ?? 'default'
  const block = variant === 'default' ? null : variantBlock[variant]
  const yDir = position.startsWith('top') ? 1 : -1
  const xDir = position.endsWith('left') ? 1 : -1

  // Natural height = content (never stretched: `self-start`) + the card's borders. Measured on the
  // content because behind-cards are clamped to the front card's height.
  const measure = React.useCallback(() => {
    const card = content?.parentElement
    if (!content || !card) return
    onHeight(t.id, content.offsetHeight + card.offsetHeight - card.clientHeight)
  }, [content, onHeight, t.id])

  React.useLayoutEffect(measure, [measure, t.updateKey])
  React.useEffect(() => {
    if (!content || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(content)
    return () => observer.disconnect()
  }, [content, measure])
  React.useEffect(() => () => onHeight(t.id, null), [onHeight, t.id])

  // Closed before Radix ever mounted it (e.g. toast() + dismiss() in one tick): there is no exit
  // animation to wait for, so drop the record now.
  const mounted = React.useRef(false)
  const markMounted = React.useCallback(() => {
    mounted.current = true
  }, [])
  React.useEffect(() => {
    if (!t.open && !mounted.current) toastStore.remove(t.id)
  }, [t.open, t.id])

  // Radix restarts the dismiss timer only when `open` or `duration` changes, so a re-add with the
  // same id nudges the duration by an imperceptible 1µs to restart it.
  const duration = (t.duration || defaultDuration) + (t.restartKey % 2 ? 0.001 : 0)

  return (
    <>
      <Toast
        open={t.open}
        onOpenChange={(open) => {
          if (!open) toastStore.dismiss(t.id)
        }}
        duration={duration}
        type={variant === 'error' ? 'foreground' : 'background'}
        data-variant={variant}
        data-index={index}
        data-behind={index > 0 ? '' : undefined}
        data-expanded={expanded ? '' : undefined}
        className={cn(
          'absolute inset-x-0',
          // stack geometry: collapsed pile ⇄ expanded list
          'transition-[translate,height] [translate:var(--toast-pile-x)_var(--toast-pile-y)] data-[expanded]:[translate:0_var(--toast-list-y)]',
          '[&[data-behind]:not([data-expanded])]:h-[var(--toast-front-height)] [&[data-behind]:not([data-expanded])]:overflow-hidden',
          // bridges the gap between expanded toasts so hovering it doesn't collapse the list
          'after:absolute after:inset-x-0 after:h-3',
          positionClasses[position].toast
        )}
        style={
          {
            zIndex: 100 - index,
            '--toast-pile-x': `${index * PILE_X * xDir}px`,
            '--toast-pile-y': `${index * PILE_Y * yDir}px`,
            '--toast-list-y': `${(offsetY + index * LIST_GAP) * yDir}px`,
          } as React.CSSProperties
        }
      >
        {block && (
          <div
            data-slot="toast-icon"
            className={cn('flex w-11 shrink-0 items-center justify-center border-r-3 border-foreground', block.className)}
          >
            <block.Icon
              aria-hidden="true"
              className={cn('h-5 w-5 stroke-[2.5]', variant === 'loading' && 'animate-spin motion-reduce:animate-none')}
            />
          </div>
        )}
        <div
          ref={setContent}
          className="flex min-w-0 flex-1 items-start gap-3 self-start p-3 pr-10 transition-opacity duration-200 [[data-behind]:not([data-expanded])>&]:pointer-events-none [[data-behind]:not([data-expanded])>&]:opacity-0 motion-reduce:transition-none">
          <div className="grid min-w-0 flex-1 gap-1">
            {t.title && <ToastTitle>{t.title}</ToastTitle>}
            {t.description && <ToastDescription>{t.description}</ToastDescription>}
          </div>
          {t.action && (
            <ToastAction altText={t.action.altText ?? t.action.label} onClick={t.action.onClick}>
              {t.action.label}
            </ToastAction>
          )}
          <ToastClose />
        </div>
        <ExitTracker id={t.id} onMount={markMounted} />
      </Toast>
      {t.open && t.updateKey > 0 && (
        <UpdateAnnouncer key={t.updateKey} label={label} assertive={variant === 'error'}>
          {t.title} {t.description}
        </UpdateAnnouncer>
      )}
    </>
  )
}

interface ToasterProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>, 'children'> {
  /** Where the stack sits on screen. */
  position?: ToastPosition
  /** Maximum number of toasts kept open; older ones are dismissed. */
  max?: number
  /** Default auto-dismiss time in ms. */
  duration?: number
  /** Screen-reader label prefixed to every announcement. */
  label?: string
}

/** Mount once, near the root of your app. */
function Toaster({
  position = 'bottom-right',
  max = 3,
  duration = 5000,
  label = 'Notification',
  className,
  style,
  ...props
}: ToasterProps) {
  const toasts = useToasts()
  const [heights, setHeights] = React.useState<Record<string, number>>({})
  const [hovering, setHovering] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const hasOpen = toasts.some((t) => t.open)
  const expanded = hasOpen && (hovering || focused)

  // Radix portals each toast into the viewport, so React's synthetic events
  // from a toast never reach the viewport's handlers (they follow the component
  // tree, where toasts aren't the viewport's children). Native events follow
  // the DOM, where they are.
  const viewportRef = React.useRef<HTMLOListElement>(null)
  React.useEffect(() => {
    toasterCount++
    return () => {
      toasterCount--
    }
  }, [])
  React.useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const enter = () => setHovering(true)
    const leave = () => setHovering(false)
    const focusIn = () => setFocused(true)
    const focusOut = (e: FocusEvent) => {
      if (!el.contains(e.relatedTarget as Node | null)) setFocused(false)
    }
    el.addEventListener('pointermove', enter)
    el.addEventListener('pointerleave', leave)
    el.addEventListener('focusin', focusIn)
    el.addEventListener('focusout', focusOut)
    return () => {
      el.removeEventListener('pointermove', enter)
      el.removeEventListener('pointerleave', leave)
      el.removeEventListener('focusin', focusIn)
      el.removeEventListener('focusout', focusOut)
    }
  }, [])

  const onHeight = React.useCallback((id: string, height: number | null) => {
    setHeights((prev) => {
      if (height === null) {
        if (!(id in prev)) return prev
        const { [id]: _removed, ...rest } = prev
        return rest
      }
      return prev[id] === height ? prev : { ...prev, [id]: height }
    })
  }, [])

  // Keep at most `max` toasts open — older ones are dismissed (and animate out).
  React.useEffect(() => {
    toasts
      .filter((t) => t.open)
      .slice(max)
      .forEach((t) => toastStore.dismiss(t.id))
  }, [toasts, max])

  // Collapse again once the stack empties (adjusting state during render, not in an effect).
  const [hadOpen, setHadOpen] = React.useState(hasOpen)
  if (hadOpen !== hasOpen) {
    setHadOpen(hasOpen)
    if (!hasOpen) {
      setHovering(false)
      setFocused(false)
    }
  }

  // Stack layout (newest first): open toasts get consecutive indexes and stacked offsets;
  // closing toasts keep their place so they animate out where they were.
  const layout: { toast: ToastRecord; index: number; offsetY: number }[] = []
  let visibleIndex = 0
  let offsetY = 0
  for (const [i, t] of toasts.entries()) {
    layout.push({ toast: t, index: t.open ? visibleIndex : i, offsetY })
    if (t.open) {
      offsetY += heights[t.id] ?? 0
      visibleIndex++
    }
  }
  const front = toasts.find((t) => t.open)
  const frontHeight = front ? heights[front.id] ?? 0 : 0

  return (
    <ToastProvider
      duration={duration}
      label={label}
      swipeDirection={position.endsWith('left') ? 'left' : 'right'}
    >
      {layout.map(({ toast: t, index, offsetY: y }) => (
        <ToasterItem
          key={t.id}
          toast={t}
          index={index}
          offsetY={y}
          expanded={expanded}
          position={position}
          defaultDuration={duration}
          label={label}
          onHeight={onHeight}
        />
      ))}
      <ToastViewport
        data-position={position}
        data-expanded={expanded ? '' : undefined}
        className={cn('h-[var(--toast-front-height)]', positionClasses[position].viewport, className)}
        style={{ '--toast-front-height': `${frontHeight}px`, ...style } as React.CSSProperties}
        {...props}
        ref={viewportRef}
      />
    </ToastProvider>
  )
}
Toaster.displayName = 'Toaster'

export {
  Toaster,
  toast,
  useToasts,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  type ToasterProps,
  type ToastOptions,
  type ToastVariant,
  type ToastPosition,
  type ToastActionOptions,
  type ToastPromiseOptions,
  type ToastRecord,
}
