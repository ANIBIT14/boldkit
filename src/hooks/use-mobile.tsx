import * as React from 'react'

const MOBILE_BREAKPOINT = 768
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}

const getSnapshot = () => window.matchMedia(QUERY).matches

// Server render has no viewport; assume desktop, matching the previous
// `useState(undefined)` → `!!undefined` initial value.
const getServerSnapshot = () => false

/**
 * True when the viewport is below the mobile breakpoint.
 *
 * Uses `useSyncExternalStore` rather than seeding state from an effect. The
 * old version rendered once with `undefined`, then set state synchronously in
 * an effect — a cascading render, and a frame of desktop layout on a phone.
 */
export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
