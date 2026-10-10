/**
 * Toast — first-party brutalist toast stack (Reka UI Toast + global toast manager).
 * Parity with the React suite (src/components/ui/__tests__/toast.test.tsx).
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import axe from 'axe-core'
import Toaster from '@/components/ui/Toaster.vue'
import { toast } from '@/components/ui/toast'

let wrapper: VueWrapper | undefined

async function mountToaster(props: Record<string, unknown> = {}) {
  wrapper = mount(Toaster, { props, attachTo: document.body })
  await settle()
  return wrapper
}

async function settle() {
  await flushPromises()
  await nextTick()
  await nextTick()
}

const toasts = () => Array.from(document.querySelectorAll<HTMLElement>('[data-slot="toast"]'))
const toastEl = (text: string) =>
  toasts().find((el) => el.querySelector('[data-slot="toast-title"]')?.textContent?.trim() === text)

afterEach(async () => {
  toast.dismiss()
  await settle()
  wrapper?.unmount()
  wrapper = undefined
})

describe('Toast (Vue)', () => {
  it('renders a toast from the imperative API and returns its id', async () => {
    await mountToaster()
    const id = toast({ title: 'Event created', description: 'Tomorrow at 3pm' })
    await settle()
    expect(typeof id).toBe('string')
    const el = toastEl('Event created')!
    expect(el).toBeTruthy()
    expect(el.textContent).toContain('Tomorrow at 3pm')
    expect(el.getAttribute('data-variant')).toBe('default')
  })

  it('applies variants and colours the icon block', async () => {
    await mountToaster()
    toast.success('Saved')
    toast.error('Failed')
    toast.warning('Careful')
    await settle()
    const icon = (text: string) => toastEl(text)!.querySelector('[data-slot="toast-icon"]')!
    expect(toastEl('Saved')!.getAttribute('data-variant')).toBe('success')
    expect(icon('Saved').classList).toContain('bg-success')
    expect(icon('Failed').classList).toContain('bg-destructive')
    expect(icon('Careful').classList).toContain('bg-warning')
  })

  it('announces errors assertively and everything else politely', async () => {
    await mountToaster()
    toast.info('FYI')
    toast.error('Broken')
    await settle()
    await new Promise((r) => setTimeout(r, 50))
    const live = Array.from(document.querySelectorAll('[aria-live]')).map((n) => n.getAttribute('aria-live'))
    expect(live).toContain('polite')
    expect(live).toContain('assertive')
  })

  it('dismisses by id, and all at once', async () => {
    await mountToaster()
    const first = toast({ title: 'First' })
    toast({ title: 'Second' })
    await settle()
    toast.dismiss(first)
    await settle()
    expect(toastEl('First')).toBeUndefined()
    expect(toastEl('Second')).toBeTruthy()
    toast.dismiss()
    await settle()
    expect(toasts()).toHaveLength(0)
  })

  it('closes from the close button', async () => {
    await mountToaster()
    toast({ title: 'Closable' })
    await settle()
    toastEl('Closable')!.querySelector<HTMLButtonElement>('[data-slot="toast-close"]')!.click()
    await settle()
    expect(toastEl('Closable')).toBeUndefined()
  })

  it('runs the action and closes the toast', async () => {
    const onClick = vi.fn()
    await mountToaster()
    toast({ title: 'Deleted', action: { label: 'Undo', onClick } })
    await settle()
    const action = toastEl('Deleted')!.querySelector<HTMLButtonElement>('[data-slot="toast-action"]')!
    expect(action.textContent?.trim()).toBe('Undo')
    action.click()
    await settle()
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(toastEl('Deleted')).toBeUndefined()
  })

  it('promise() updates one toast in place: loading → success', async () => {
    await mountToaster()
    let resolve!: (v: string) => void
    const promise = new Promise<string>((r) => (resolve = r))
    toast.promise(promise, { loading: 'Uploading…', success: (v) => `Uploaded ${v}`, error: 'Upload failed' })
    await settle()
    const loading = toastEl('Uploading…')!
    expect(loading.getAttribute('data-variant')).toBe('loading')

    resolve('a.png')
    await settle()
    const done = toastEl('Uploaded a.png')!
    expect(done).toBe(loading)
    expect(done.getAttribute('data-variant')).toBe('success')
    expect(toasts()).toHaveLength(1)
  })

  it('promise() turns into an error toast on rejection', async () => {
    await mountToaster()
    const promise = Promise.reject(new Error('nope'))
    toast.promise(promise, { loading: 'Saving…', success: 'Saved', error: (e) => `Error: ${(e as Error).message}` })
    await settle()
    expect(toastEl('Error: nope')!.getAttribute('data-variant')).toBe('error')
  })

  it('keeps at most `max` toasts, dropping the oldest', async () => {
    await mountToaster({ max: 3 })
    for (let i = 1; i <= 5; i++) toast({ title: `Toast ${i}` })
    await settle()
    expect(toasts()).toHaveLength(3)
    expect(toastEl('Toast 1')).toBeUndefined()
    expect(toastEl('Toast 2')).toBeUndefined()
    expect(toastEl('Toast 5')!.getAttribute('data-index')).toBe('0')
    expect(toastEl('Toast 5')!.hasAttribute('data-behind')).toBe(false)
    expect(toastEl('Toast 3')!.getAttribute('data-index')).toBe('2')
    expect(toastEl('Toast 3')!.hasAttribute('data-behind')).toBe(true)
  })

  it('positions the viewport and sets the swipe direction', async () => {
    await mountToaster({ position: 'top-left' })
    toast({ title: 'Top left' })
    await settle()
    const viewport = document.querySelector('[data-slot="toast-viewport"]')!
    expect(viewport.getAttribute('data-position')).toBe('top-left')
    expect(viewport.classList).toContain('top-4')
    expect(viewport.classList).toContain('left-4')
    expect(toastEl('Top left')!.getAttribute('data-swipe-direction')).toBe('left')
  })

  it('re-adding an id replaces its content (no merge)', async () => {
    await mountToaster()
    toast({ id: 'job', title: 'Queued', description: 'Waiting for a runner', action: { label: 'Cancel', onClick: () => {} } })
    await settle()
    expect(toastEl('Queued')!.querySelector('[data-slot="toast-action"]')).toBeTruthy()
    toast({ id: 'job', title: 'Running', variant: 'info' })
    await settle()
    expect(toasts()).toHaveLength(1)
    const el = toastEl('Running')!
    expect(el.getAttribute('data-variant')).toBe('info')
    expect(el.textContent).not.toContain('Waiting for a runner')
    expect(el.querySelector('[data-slot="toast-action"]')).toBeNull()
  })

  it('promise() result replaces the loading content', async () => {
    await mountToaster()
    let resolve!: () => void
    const promise = new Promise<void>((r) => (resolve = r))
    toast.promise(promise, { loading: { title: 'Saving…', description: 'Hold on' }, success: 'Saved', error: 'Failed' })
    await settle()
    expect(toastEl('Saving…')!.textContent).toContain('Hold on')
    resolve()
    await settle()
    expect(toastEl('Saved')!.textContent).not.toContain('Hold on')
  })

  it('re-adding an open id restarts its auto-dismiss timer', async () => {
    await mountToaster()
    toast({ id: 'timer', title: 'First', duration: 300 })
    await settle()
    await new Promise((r) => setTimeout(r, 200))
    toast({ id: 'timer', title: 'Again', duration: 300 })
    await new Promise((r) => setTimeout(r, 200))
    await settle()
    expect(toastEl('Again')).toBeTruthy()
    await new Promise((r) => setTimeout(r, 250))
    await settle()
    expect(toastEl('Again')).toBeUndefined()
  })

  it('expands the pile when a toast is hovered or focused', async () => {
    await mountToaster()
    toast({ title: 'One' })
    toast({ title: 'Two' })
    await settle()
    const viewport = document.querySelector<HTMLElement>('[data-slot="toast-viewport"]')!
    expect(viewport.hasAttribute('data-expanded')).toBe(false)
    expect(toastEl('One')!.hasAttribute('data-expanded')).toBe(false)

    toastEl('Two')!.dispatchEvent(new Event('pointermove', { bubbles: true }))
    await settle()
    expect(viewport.hasAttribute('data-expanded')).toBe(true)
    expect(toastEl('One')!.hasAttribute('data-expanded')).toBe(true)

    viewport.dispatchEvent(new Event('pointerleave'))
    await settle()
    expect(viewport.hasAttribute('data-expanded')).toBe(false)

    toastEl('One')!.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
    await settle()
    expect(viewport.hasAttribute('data-expanded')).toBe(true)
  })

  it('forwards non-prop attrs to the viewport', async () => {
    await mountToaster({ 'aria-describedby': 'hint', 'data-testid': 'toaster' })
    const viewport = document.querySelector('[data-slot="toast-viewport"]')!
    expect(viewport.getAttribute('data-testid')).toBe('toaster')
    expect(viewport.getAttribute('aria-describedby')).toBe('hint')
  })

  it('replays calls made before the Toaster mounts (dismiss included)', async () => {
    const gone = toast({ title: 'Cancelled early' })
    toast({ title: 'Queued early' })
    toast.dismiss(gone)
    await mountToaster()
    expect(toastEl('Queued early')).toBeTruthy()
    expect(toastEl('Cancelled early')).toBeUndefined()
  })

  it('has no axe violations', async () => {
    await mountToaster()
    toast({ title: 'Saved', description: 'All good', action: { label: 'View', onClick: () => {} } })
    toast.error('Oops')
    await settle()
    const results = await axe.run(document.body, { rules: { 'color-contrast': { enabled: false } } })
    expect(results.violations.map((v) => v.id)).toEqual([])
  })
})
