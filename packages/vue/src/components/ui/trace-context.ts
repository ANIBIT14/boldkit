import type { ComputedRef, InjectionKey } from 'vue'

export type TraceStatus = 'running' | 'error' | 'pending'

// `.bk-shimmer` is plain CSS, not a Tailwind utility, so TraceTitle can't
// pick it up through a group variant — it reads the line's status instead.
export const TRACE_LINE_STATUS_KEY: InjectionKey<ComputedRef<TraceStatus | undefined>> =
  Symbol('TraceLineStatus')
