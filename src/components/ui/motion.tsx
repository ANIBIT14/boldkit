/* eslint-disable react-refresh/only-export-components */
/**
 * BoldKit Motion — React adapter (L3).
 *
 * Thin wrapper around @boldkit/motion-core. Adds React lifecycle wiring
 * to the framework-agnostic primitives. The Vue adapter mirrors this
 * surface 1:1 so apps can switch frameworks without re-learning the API.
 *
 * Requires `motion.css` (L2 recipes) to be loaded. If you're using
 * BoldKit's globals.css, the recipes are already included.
 */
import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  observeReveal,
  staggerChildren,
  triggerAnimation,
  startViewTransition,
  prefersReducedMotion,
  type RevealOptions,
  type StaggerOptions,
  type PageTransition,
} from '@/lib/motion-core'

// ──────────────────────────────────────────────────────────────────
// <Reveal> — scroll-triggered entrance
// ──────────────────────────────────────────────────────────────────

export type RevealDirection = 'up' | 'down' | 'left' | 'right'

export interface RevealProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<RevealOptions, 'rootMargin'> {
  /** Direction to slide in from. Default 'up'. */
  direction?: RevealDirection
  /** Custom IntersectionObserver rootMargin. */
  rootMargin?: string
  /** Element tag to render. Default 'div'. */
  as?: keyof React.JSX.IntrinsicElements
}

export const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(
  ({ direction = 'up', rootMargin, threshold, once, delay, as, className, children, ...rest }, ref) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null)
    React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement)

    React.useEffect(() => {
      const el = innerRef.current
      if (!el) return
      return observeReveal(el, { rootMargin, threshold, once, delay })
    }, [rootMargin, threshold, once, delay])

    const Tag = (as ?? 'div') as React.ElementType
    return (
      <Tag
        ref={innerRef}
        className={cn('bk-reveal', `bk-reveal-${direction}`, className)}
        {...rest}
      >
        {children}
      </Tag>
    )
  }
)
Reveal.displayName = 'Reveal'

// ──────────────────────────────────────────────────────────────────
// <Motion> — declarative recipe composition
// ──────────────────────────────────────────────────────────────────

export interface MotionProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof React.JSX.IntrinsicElements
  /** Apply .bk-press for interactive shadow choreography. */
  press?: boolean
  /** Apply .bk-stamp-in entrance. */
  stamp?: boolean
  /** Apply .bk-pulse-shadow. */
  pulse?: boolean
}

export const Motion = React.forwardRef<HTMLElement, MotionProps>(
  ({ as, press, stamp, pulse, className, children, ...rest }, ref) => {
    const Tag = (as ?? 'div') as React.ElementType
    return (
      <Tag
        ref={ref}
        className={cn(
          press && 'bk-press',
          stamp && 'bk-stamp-in',
          pulse && 'bk-pulse-shadow',
          className
        )}
        {...rest}
      >
        {children}
      </Tag>
    )
  }
)
Motion.displayName = 'Motion'

// ──────────────────────────────────────────────────────────────────
// <Stagger> — sequence children entrance
// ──────────────────────────────────────────────────────────────────

export interface StaggerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    StaggerOptions {
  as?: keyof React.JSX.IntrinsicElements
}

export const Stagger = React.forwardRef<HTMLDivElement, StaggerProps>(
  ({ delay, initialDelay, selector, as, className, children, ...rest }, ref) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null)
    React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement)

    React.useEffect(() => {
      const el = innerRef.current
      if (!el) return
      return staggerChildren(el, { delay, initialDelay, selector })
    }, [delay, initialDelay, selector])

    const Tag = (as ?? 'div') as React.ElementType
    return (
      <Tag ref={innerRef} className={className} {...rest}>
        {children}
      </Tag>
    )
  }
)
Stagger.displayName = 'Stagger'

// ──────────────────────────────────────────────────────────────────
// useShake — imperative shake-on-error
// ──────────────────────────────────────────────────────────────────

/**
 * Returns a function that shakes a given element (e.g. an invalid input).
 *
 *   const shake = useShake()
 *   shake(inputRef.current)
 */
export function useShake() {
  return React.useCallback(async (el: Element | null) => {
    if (!el) return
    await triggerAnimation(el, 'bk-shake-x')
  }, [])
}

// ──────────────────────────────────────────────────────────────────
// useViewTransition — wraps document.startViewTransition
// ──────────────────────────────────────────────────────────────────

/**
 * Returns a function that runs `callback` inside a view transition where
 * supported. Falls back to invoking the callback directly. Always safe to call.
 */
export function useViewTransition() {
  return React.useCallback(
    (callback: () => void | Promise<void>, recipe?: PageTransition, options?: { types?: string[] }) => {
      return startViewTransition(callback, recipe, options)
    },
    []
  )
}

// ──────────────────────────────────────────────────────────────────
// React 19.3 <ViewTransition> / addTransitionType
// ──────────────────────────────────────────────────────────────────

type ViewTransitionClass = string | Record<string, string>
export interface ViewTransitionProps {
  children?: React.ReactNode
  name?: string
  default?: ViewTransitionClass
  enter?: ViewTransitionClass
  exit?: ViewTransitionClass
  update?: ViewTransitionClass
  share?: ViewTransitionClass
}

const ReactVT = React as unknown as {
  ViewTransition?: React.ComponentType<ViewTransitionProps>
  addTransitionType?: (type: string) => void
}

/**
 * React's `<ViewTransition>` (stable in 19.3). On older React it renders its
 * children untouched, so a component can adopt it without raising the React
 * floor. BoldKit's recipes are available as classes: `enter="bk-stamp"`,
 * `"bk-hard-wipe"`, `"bk-color-block"`.
 */
export const ViewTransition: React.ComponentType<ViewTransitionProps> =
  ReactVT.ViewTransition ?? (({ children }: ViewTransitionProps) => <>{children}</>)

/** `addTransitionType` on React 19.3+, a no-op before it. Call inside startTransition. */
export const addTransitionType: (type: string) => void = ReactVT.addTransitionType ?? (() => {})

// Re-export the core helper so consumers don't need a second import
export { prefersReducedMotion }
