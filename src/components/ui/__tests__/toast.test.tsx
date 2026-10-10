/**
 * Toast — first-party brutalist toast stack (Radix Toast + module-level store).
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { act, render, screen, waitFor } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Toaster, toast, useToasts } from '../toast'

const toastEl = (text: string) => screen.getByText(text).closest('[data-slot="toast"]') as HTMLElement

afterEach(() => {
  // Close everything; unmounting the Toaster (cleanup) then drops closed records.
  act(() => toast.dismiss())
})

describe('Toast', () => {
  it('renders a toast from the imperative API and returns its id', () => {
    render(<Toaster />)
    let id = ''
    act(() => {
      id = toast({ title: 'Event created', description: 'Tomorrow at 3pm' })
    })
    expect(id).toMatch(/^bk-toast-/)
    expect(screen.getByText('Event created')).toBeInTheDocument()
    expect(screen.getByText('Tomorrow at 3pm')).toBeInTheDocument()
    expect(toastEl('Event created')).toHaveAttribute('data-variant', 'default')
  })

  it('applies variants and colours the icon block', () => {
    render(<Toaster />)
    act(() => {
      toast.success('Saved')
      toast.error('Failed')
      toast.warning('Careful')
    })
    const success = toastEl('Saved')
    expect(success).toHaveAttribute('data-variant', 'success')
    expect(success.querySelector('[data-slot="toast-icon"]')).toHaveClass('bg-success')
    expect(toastEl('Failed').querySelector('[data-slot="toast-icon"]')).toHaveClass('bg-destructive')
    expect(toastEl('Careful').querySelector('[data-slot="toast-icon"]')).toHaveClass('bg-warning')
  })

  it('announces errors assertively and everything else politely', () => {
    render(<Toaster />)
    act(() => {
      toast.info('FYI')
      toast.error('Broken')
    })
    const live = Array.from(document.querySelectorAll('[role="status"][aria-live]')).map((n) =>
      n.getAttribute('aria-live')
    )
    expect(live).toContain('polite')
    expect(live).toContain('assertive')
  })

  it('dismisses by id, and all at once', () => {
    render(<Toaster />)
    let first = ''
    act(() => {
      first = toast({ title: 'First' })
      toast({ title: 'Second' })
    })
    act(() => toast.dismiss(first))
    expect(screen.queryByText('First')).not.toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
    act(() => toast.dismiss())
    expect(screen.queryByText('Second')).not.toBeInTheDocument()
  })

  it('closes from the close button', async () => {
    const user = userEvent.setup()
    render(<Toaster />)
    act(() => {
      toast({ title: 'Closable' })
    })
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByText('Closable')).not.toBeInTheDocument()
  })

  it('runs the action and closes the toast', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Toaster />)
    act(() => {
      toast({ title: 'Deleted', action: { label: 'Undo', onClick } })
    })
    await user.click(screen.getByRole('button', { name: 'Undo' }))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(screen.queryByText('Deleted')).not.toBeInTheDocument()
  })

  it('auto-dismisses after its duration', async () => {
    render(<Toaster />)
    act(() => {
      toast({ title: 'Brief', duration: 50 })
    })
    expect(screen.getByText('Brief')).toBeInTheDocument()
    await waitFor(() => expect(screen.queryByText('Brief')).not.toBeInTheDocument())
  })

  it('promise() updates one toast in place: loading → success', async () => {
    render(<Toaster />)
    let resolve!: (v: string) => void
    const promise = new Promise<string>((r) => (resolve = r))
    act(() => {
      toast.promise(promise, { loading: 'Uploading…', success: (v) => `Uploaded ${v}`, error: 'Upload failed' })
    })
    const loading = toastEl('Uploading…')
    expect(loading).toHaveAttribute('data-variant', 'loading')

    await act(async () => {
      resolve('a.png')
      await promise
    })
    const done = toastEl('Uploaded a.png')
    expect(done).toBe(loading)
    expect(done).toHaveAttribute('data-variant', 'success')
    expect(document.querySelectorAll('[data-slot="toast"]')).toHaveLength(1)
  })

  it('promise() turns into an error toast on rejection', async () => {
    render(<Toaster />)
    const promise = Promise.reject(new Error('nope'))
    act(() => {
      toast.promise(promise, { loading: 'Saving…', success: 'Saved', error: (e) => `Error: ${(e as Error).message}` })
    })
    await waitFor(() => expect(screen.getByText('Error: nope')).toBeInTheDocument())
    expect(toastEl('Error: nope')).toHaveAttribute('data-variant', 'error')
  })

  it('keeps at most `max` toasts, dropping the oldest', async () => {
    render(<Toaster max={3} />)
    act(() => {
      for (let i = 1; i <= 5; i++) toast({ title: `Toast ${i}` })
    })
    await waitFor(() => expect(document.querySelectorAll('[data-slot="toast"]')).toHaveLength(3))
    expect(screen.queryByText('Toast 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Toast 2')).not.toBeInTheDocument()
    expect(screen.getByText('Toast 5')).toBeInTheDocument()
    // newest is in front; older ones sit behind it in the pile
    expect(toastEl('Toast 5')).toHaveAttribute('data-index', '0')
    expect(toastEl('Toast 5')).not.toHaveAttribute('data-behind')
    expect(toastEl('Toast 3')).toHaveAttribute('data-index', '2')
    expect(toastEl('Toast 3')).toHaveAttribute('data-behind')
  })

  it('positions the viewport and sets the swipe direction', () => {
    render(<Toaster position="top-left" />)
    act(() => {
      toast({ title: 'Top left' })
    })
    const viewport = document.querySelector('[data-slot="toast-viewport"]')!
    expect(viewport).toHaveAttribute('data-position', 'top-left')
    expect(viewport).toHaveClass('top-4', 'left-4')
    expect(toastEl('Top left')).toHaveAttribute('data-swipe-direction', 'left')
  })

  it('expands the pile when a toast is hovered or focused', () => {
    render(<Toaster />)
    act(() => {
      toast({ title: 'One' })
      toast({ title: 'Two' })
    })
    const viewport = document.querySelector('[data-position]') as HTMLElement
    expect(viewport).not.toHaveAttribute('data-expanded')
    // Toasts are portaled into the viewport: only native (DOM) bubbling reaches it.
    act(() => {
      toastEl('Two').dispatchEvent(new Event('pointermove', { bubbles: true }))
    })
    expect(viewport).toHaveAttribute('data-expanded')
    act(() => {
      viewport.dispatchEvent(new Event('pointerleave'))
    })
    expect(viewport).not.toHaveAttribute('data-expanded')
    act(() => {
      toastEl('One').dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
    })
    expect(viewport).toHaveAttribute('data-expanded')
  })

  it('re-adding an id replaces its content (no merge)', () => {
    render(<Toaster />)
    act(() => {
      toast({ id: 'job', title: 'Queued', description: 'Waiting for a runner', action: { label: 'Cancel', onClick: () => {} } })
    })
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    act(() => {
      toast({ id: 'job', title: 'Running', variant: 'info' })
    })
    expect(document.querySelectorAll('[data-slot="toast"]')).toHaveLength(1)
    expect(toastEl('Running')).toHaveAttribute('data-variant', 'info')
    expect(screen.queryByText('Waiting for a runner')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument()
  })

  it('promise() result replaces the loading content', async () => {
    render(<Toaster />)
    let resolve!: () => void
    const promise = new Promise<void>((r) => (resolve = r))
    act(() => {
      toast.promise(promise, { loading: { title: 'Saving…', description: 'Hold on' }, success: 'Saved', error: 'Failed' })
    })
    expect(screen.getByText('Hold on')).toBeInTheDocument()
    await act(async () => {
      resolve()
      await promise
    })
    expect(screen.getByText('Saved')).toBeInTheDocument()
    expect(screen.queryByText('Hold on')).not.toBeInTheDocument()
  })

  it('re-adding an open id restarts its auto-dismiss timer', async () => {
    render(<Toaster />)
    act(() => {
      toast({ id: 'timer', title: 'First', duration: 300 })
    })
    await act(() => new Promise((r) => setTimeout(r, 200)))
    act(() => {
      toast({ id: 'timer', title: 'Again', duration: 300 })
    })
    // past the original 300ms deadline, but within the restarted one
    await act(() => new Promise((r) => setTimeout(r, 200)))
    expect(screen.getByText('Again')).toBeInTheDocument()
    await waitFor(() => expect(screen.queryByText('Again')).not.toBeInTheDocument())
  })

  it('announces in-place updates, with error updates assertive', async () => {
    render(<Toaster />)
    expect(document.querySelector('[data-slot="toast-announcer"]')).toBeNull()
    const promise = Promise.reject(new Error('disk full'))
    act(() => {
      toast.promise(promise, { loading: 'Saving…', success: 'Saved', error: (e) => `Failed: ${(e as Error).message}` })
    })
    // the initial content is announced by Radix, not by the update announcer
    expect(document.querySelector('[data-slot="toast-announcer"]')).toBeNull()
    await waitFor(() =>
      expect(document.querySelector('[data-slot="toast-announcer"]')).toHaveTextContent('Notification Failed: disk full')
    )
    expect(document.querySelector('[data-slot="toast-announcer"]')).toHaveAttribute('aria-live', 'assertive')

    act(() => {
      toast({ id: 'sync', title: 'Syncing' })
    })
    act(() => {
      toast({ id: 'sync', title: 'Synced' })
    })
    await waitFor(() => {
      const polite = Array.from(document.querySelectorAll('[data-slot="toast-announcer"]')).find((n) =>
        n.textContent?.includes('Synced')
      )
      expect(polite).toHaveAttribute('aria-live', 'polite')
    })
  })

  it('drops toasts dismissed before they ever rendered', () => {
    let records: unknown[] = []
    function Probe() {
      records = useToasts()
      return null
    }
    render(
      <>
        <Toaster />
        <Probe />
      </>
    )
    act(() => {
      const id = toast({ title: 'Blink' })
      toast.dismiss(id)
    })
    expect(records).toHaveLength(0)
  })

  it('without a Toaster, dismiss() removes records and the store stays bounded', () => {
    let records: unknown[] = []
    function Probe() {
      records = useToasts()
      return null
    }
    render(<Probe />)
    act(() => {
      for (let i = 0; i < 30; i++) toast({ title: `Queued ${i}` })
    })
    expect(records.length).toBeLessThanOrEqual(20)
    act(() => toast.dismiss())
    expect(records).toHaveLength(0)
  })

  it('has no axe violations', async () => {
    render(<Toaster />)
    act(() => {
      toast({ title: 'Saved', description: 'All good', action: { label: 'View', onClick: () => {} } })
      toast.error('Oops')
    })
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
