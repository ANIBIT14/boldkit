import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import type { Framework } from './catalog.js'

/**
 * Detect whether a project is Vue or React by walking up from `cwd` to the
 * nearest package.json and inspecting its dependencies. Defaults to react.
 */
export function detectFramework(cwd: string): { framework: Framework; reason: string } {
  let dir = cwd
  for (;;) {
    const pkgPath = join(dir, 'package.json')
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as Record<string, unknown>
        const deps = {
          ...(pkg.dependencies as Record<string, string> | undefined),
          ...(pkg.devDependencies as Record<string, string> | undefined),
        }
        for (const dep of ['nuxt', 'vue', 'reka-ui']) {
          if (deps[dep]) return { framework: 'vue', reason: `found "${dep}" in ${pkgPath}` }
        }
        for (const dep of ['next', 'react']) {
          if (deps[dep]) return { framework: 'react', reason: `found "${dep}" in ${pkgPath}` }
        }
      } catch {
        // unreadable package.json — keep walking up
      }
    }
    const parent = dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  return { framework: 'react', reason: 'no framework dependency found, defaulting to react' }
}
