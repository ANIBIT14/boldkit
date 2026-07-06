// vitest-axe 0.1.0 ships its matcher augmentation against the legacy `Vi`
// global namespace, which Vitest v4 no longer uses for the fluent `expect`
// API. Re-attach the matcher types to v4's `'vitest'` module `Assertion`
// interface so `expect(results).toHaveNoViolations()` typechecks under tsc.
import 'vitest'
import type { AxeMatchers } from 'vitest-axe/matchers'

declare module 'vitest' {
  interface Assertion extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
