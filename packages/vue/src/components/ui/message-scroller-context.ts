import { inject, type InjectionKey, type Ref } from 'vue'

/*
 * Shared plumbing for MessageScroller / MessageScrollerContent /
 * MessageScrollerJumpButton (see MessageScroller.vue for the behaviour).
 */

export interface MessageScrollerScrollOptions {
  behavior?: ScrollBehavior
}

export interface MessageScrollerScrollToMessageOptions extends MessageScrollerScrollOptions {
  block?: 'start' | 'center' | 'end'
}

/** What `defineExpose` hands to a template ref on <MessageScroller>. */
export interface MessageScrollerExposed {
  scrollToBottom: (options?: MessageScrollerScrollOptions) => void
  scrollToMessage: (id: string, options?: MessageScrollerScrollToMessageOptions) => boolean
  isAtBottom: () => boolean
}

export interface MessageScrollerContext {
  setViewport: (el: HTMLElement | null) => void
  setContent: (el: HTMLElement | null) => void
  handleScroll: () => void
  jumpToLatest: () => void
  /** Move focus to the log (preventScroll) — used when the jump button unmounts under focus. */
  focusViewport: () => void
  /** +1 when a consumer-placed jump button mounts, -1 when it unmounts. */
  registerJumpButton: (delta: number) => void
  atBottom: Readonly<Ref<boolean>>
  unread: Readonly<Ref<number>>
  streaming: Readonly<Ref<boolean>>
}

export const MESSAGE_SCROLLER_KEY: InjectionKey<MessageScrollerContext> = Symbol('MessageScroller')

/** Provided only around the root's own auto-placed jump button. */
export const MESSAGE_SCROLLER_AUTO_JUMP_KEY: InjectionKey<boolean> = Symbol('MessageScrollerAutoJump')

export function useMessageScrollerContext(part: string): MessageScrollerContext {
  const ctx = inject(MESSAGE_SCROLLER_KEY, null)
  if (!ctx) throw new Error(`<${part}> must be used within <MessageScroller>`)
  return ctx
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function scrollViewport(viewport: HTMLElement, top: number, behavior: ScrollBehavior): void {
  if (behavior === 'smooth' && !prefersReducedMotion() && typeof viewport.scrollTo === 'function') {
    viewport.scrollTo({ top, behavior: 'smooth' })
  } else {
    viewport.scrollTop = top
  }
}

export function distanceFromBottom(el: HTMLElement): number {
  return el.scrollHeight - el.scrollTop - el.clientHeight
}

export function messageIds(content: HTMLElement): (string | null)[] {
  return Array.from(content.querySelectorAll('[data-message-id]'), (node) =>
    node.getAttribute('data-message-id')
  )
}
