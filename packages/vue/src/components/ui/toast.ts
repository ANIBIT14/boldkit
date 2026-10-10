import { createToastManager, type ToastAddOptions, type ToastUpdateOptions } from 'reka-ui'

/**
 * Imperative toast API (same signature as the React `toast`). Backed by Reka UI's
 * global toast manager — mount `<Toaster />` ONCE, at the app root, and call `toast()` from anywhere.
 *
 * Calls made while no `<Toaster />` is mounted are queued by the manager and replayed, in order,
 * when one mounts (so a `dismiss()` before mount still cancels its toast). Mounting more than one
 * `<Toaster />` at a time is unsupported: every one receives every toast.
 *
 * Updating a toast (re-adding its `id`, or a settled `toast.promise`) REPLACES its content —
 * fields you leave out are cleared — and re-adding an open `id` restarts its dismiss timer.
 */

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading'

export type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'

export interface ToastActionOptions {
  label: string
  onClick: () => void
  /** Screen-reader description of an alternate way to do the action. Defaults to `label`. */
  altText?: string
}

export interface ToastOptions {
  /** Reuse an id to update an open toast in place. */
  id?: string
  title?: string
  description?: string
  variant?: ToastVariant
  action?: ToastActionOptions
  /** Milliseconds before auto-dismiss. `Infinity` keeps it open. Defaults to the Toaster's duration. */
  duration?: number
}

export interface ToastData {
  variant: ToastVariant
}

type ToastPromiseState<T> = string | ToastOptions | ((value: T) => string | ToastOptions)

export interface ToastPromiseOptions<T> {
  loading: string | ToastOptions
  success: ToastPromiseState<T>
  error: ToastPromiseState<unknown>
}

/** Pass to `ToastProvider`'s `toast-manager` prop (`<Toaster />` does this for you). */
export const toastManager = createToastManager<ToastData>()

function toManagerOptions({ id, title, description, variant = 'default', action, duration }: ToastOptions) {
  return {
    id,
    title,
    description,
    duration,
    // `status: 'loading'` keeps the toast open until it is updated.
    status: variant,
    // errors interrupt (aria-live="assertive"); everything else is polite
    type: variant === 'error' ? 'foreground' : 'background',
    data: { variant },
    actionProps: action
      ? { label: action.label, altText: action.altText ?? action.label, onClick: () => action.onClick() }
      : undefined,
  } satisfies ToastAddOptions<ToastData>
}

function update(id: string, options: ToastOptions) {
  // drop `id`; reset `duration` so a finished promise toast auto-dismisses again
  const { id: _id, ...patch } = toManagerOptions(options)
  toastManager.update(id, patch as ToastUpdateOptions<ToastData>)
}

function resolveState<T>(state: ToastPromiseState<T>, value: T): ToastOptions {
  const resolved = typeof state === 'function' ? state(value) : state
  return typeof resolved === 'string' ? { title: resolved } : resolved
}

const variantHelper =
  (variant: ToastVariant) =>
  (title: string, options?: Omit<ToastOptions, 'title' | 'variant'>): string =>
    toastManager.add(toManagerOptions({ ...options, title, variant }))

/**
 * Show a toast. Returns its id.
 *
 * @example toast({ title: 'Saved', description: 'Your changes are live.', variant: 'success' })
 */
export const toast = Object.assign((options: ToastOptions): string => toastManager.add(toManagerOptions(options)), {
  success: variantHelper('success'),
  error: variantHelper('error'),
  warning: variantHelper('warning'),
  info: variantHelper('info'),
  /** Dismiss one toast, or every toast when called without an id. */
  dismiss: (id?: string) => toastManager.close(id),
  /** Shows a loading toast that turns into a success or error toast, in place, when the promise settles. */
  promise<T>(promise: Promise<T>, options: ToastPromiseOptions<T>): string {
    const loading = typeof options.loading === 'string' ? { title: options.loading } : options.loading
    const id = toastManager.add(toManagerOptions({ ...loading, variant: 'loading' }))
    promise.then(
      (value) => update(id, { ...resolveState(options.success, value), variant: 'success' }),
      (error: unknown) => update(id, { ...resolveState(options.error, error), variant: 'error' })
    )
    return id
  },
})
