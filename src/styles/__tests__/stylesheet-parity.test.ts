/**
 * Stylesheet parity.
 *
 * There is no CSS sync script — `scripts/sync-registry-from-src.js` copies
 * `.tsx`/`.ts` only. The motion/shape layer therefore lives by hand in five
 * files, and every gate in the repo (tsc, vue-tsc, vitest, registry:audit) is
 * blind to CSS. That has shipped real breakage three times:
 *
 *   1. the React registry globals once carried zero `.shape-animate-*` rules;
 *   2. two globals carried 2 of 15 `--bk-*` tokens;
 *   3. `registry/default/styles/globals.css` animated `bk-stamp-in` with no
 *      matching `@keyframes`, and shipped none of the L2 recipes.
 *
 * These assertions are the missing gate.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'

const root = join(__dirname, '../../..')

const GLOBALS = {
  app: 'src/styles/globals.css',
  registry: 'registry/default/styles/globals.css',
  vue: 'packages/vue/src/styles/globals.css',
} as const

const MOTION = {
  'registry motion.css': 'registry/default/styles/motion.css',
  'vue motion.css': 'packages/vue/src/styles/motion.css',
} as const

// Keys must not collide with GLOBALS', or the spread below silently drops a
// file from every check that iterates both.
const ALL_SHEETS = { ...GLOBALS, ...MOTION } as const

const read = (rel: string) => readFileSync(join(root, rel), 'utf-8')

/** `--bk-name: value;` declarations, normalized to `name:value`. */
function bkTokens(css: string): string[] {
  return [...css.matchAll(/(--bk-[\w-]+)\s*:\s*([^;]+);/g)]
    .map((m) => `${m[1]}:${m[2].trim().replace(/\s+/g, ' ')}`)
    .sort()
}

/** `.shape-animate-x { … }` rule bodies, normalized. */
function shapeAnimateRules(css: string): string[] {
  return [...css.matchAll(/(\.shape-animate-[\w-]+)\s*\{([^}]*)\}/g)]
    .map((m) => `${m[1]}{${m[2].trim().replace(/\s+/g, ' ')}}`)
    .sort()
}

function keyframeNames(css: string): Set<string> {
  return new Set([...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]))
}

/** Animation names referenced by `animation:` / `animation-name:` shorthand. */
function referencedAnimations(css: string): Set<string> {
  const names = new Set<string>()
  for (const m of css.matchAll(/animation(?:-name)?\s*:\s*([^;]+);/g)) {
    for (const token of m[1].split(',')) {
      // First token of the shorthand that isn't a time, keyword, or function.
      for (const word of token.trim().split(/\s+/)) {
        if (
          /^[a-zA-Z][\w-]*$/.test(word) &&
          !/^(none|inherit|initial|unset|infinite|alternate|reverse|forwards|backwards|both|running|paused|normal|linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end)$/.test(word)
        ) {
          names.add(word)
          break
        }
      }
    }
  }
  return names
}

/** Resolve relative `@import`s so a rule defined in motion.css counts. */
function withImports(rel: string, seen = new Set<string>()): string {
  if (seen.has(rel)) return ''
  seen.add(rel)
  const css = read(rel)
  let out = css
  for (const m of css.matchAll(/@import\s+['"](\.[^'"]+)['"]/g)) {
    out += '\n' + withImports(join(dirname(rel), m[1]), seen)
  }
  return out
}

describe('--bk-* motion tokens', () => {
  it('are identical across all three globals.css', () => {
    const app = bkTokens(read(GLOBALS.app))
    expect(app.length).toBeGreaterThan(10)
    expect(bkTokens(read(GLOBALS.registry))).toEqual(app)
    expect(bkTokens(read(GLOBALS.vue))).toEqual(app)
  })
})

describe('.shape-animate-* rules', () => {
  it('are identical across all three globals.css', () => {
    const app = shapeAnimateRules(read(GLOBALS.app))
    expect(app.length).toBeGreaterThan(20)
    expect(shapeAnimateRules(read(GLOBALS.registry))).toEqual(app)
    expect(shapeAnimateRules(read(GLOBALS.vue))).toEqual(app)
  })
})

describe('motion.css copies', () => {
  it('are byte-identical', () => {
    expect(read(MOTION['vue motion.css'])).toBe(read(MOTION['registry motion.css']))
  })
})

describe('animation references', () => {
  it.each(Object.entries(ALL_SHEETS))(
    '%s resolves every animation name to a @keyframes it can see',
    (_label, rel) => {
      const resolved = withImports(rel)
      const defined = keyframeNames(resolved)
      const dangling = [...referencedAnimations(resolved)].filter((n) => !defined.has(n))
      expect(dangling).toEqual([])
    }
  )
})

describe('custom properties', () => {
  it.each(Object.entries(ALL_SHEETS))(
    '%s declares no self-referential custom property',
    (_label, rel) => {
      // `--x: var(--x, fallback)` is invalid at computed-value time: the cycle
      // is detected before the fallback is considered, so the property — and
      // every declaration using it — resolves to nothing.
      const selfRefs = [...read(rel).matchAll(/(--[\w-]+)\s*:\s*var\(\s*(--[\w-]+)/g)]
        .filter((m) => m[1] === m[2])
        .map((m) => m[1])
      expect(selfRefs).toEqual([])
    }
  )
})

describe('reduced motion', () => {
  it.each(Object.entries(GLOBALS))(
    '%s neutralizes animation for prefers-reduced-motion',
    (_label, rel) => {
      const css = read(rel)
      // A universal `*` reset inside a reduced-motion query covers every
      // animated class at once — including the 18 smooth shape presets and
      // .animate-marquee, which no targeted block matches.
      const blocks = [...css.matchAll(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{/g)]
      expect(blocks.length).toBeGreaterThan(0)
      const hasUniversalReset =
        /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{\s*\*\s*,\s*::before\s*,\s*::after\s*\{[^}]*animation-duration/.test(
          css
        )
      expect(hasUniversalReset).toBe(true)
    }
  )
})

describe('v3.6 utilities block', () => {
  // Hand-copied into all three globals like the motion layer; one block, one
  // pair of markers, so "same everywhere" is a byte comparison.
  const block = (css: string) => {
    const m = css.match(/\/\* ===== BoldKit v3\.6 utilities[\s\S]*?\/\* ===== end BoldKit v3\.6 utilities ===== \*\//)
    return m?.[0] ?? null
  }

  it('is present and byte-identical in every globals.css', () => {
    const blocks = Object.values(GLOBALS).map((rel) => block(read(rel)))
    expect(blocks.every(Boolean)).toBe(true)
    expect(new Set(blocks).size).toBe(1)
  })
})
