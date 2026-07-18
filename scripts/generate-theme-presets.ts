// scripts/generate-theme-presets.ts
// Emits one CSS-vars-only swap file per theme preset into public/themes/.
// Consumers drop a file into their globals.css to reskin BoldKit. Runs at
// build time (see the `themes` npm script) so the files never drift from the
// shared preset list in src/config/theme-presets.ts.

import { mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { themePresets, buildThemeCss } from '../src/config/theme-presets.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'themes')

mkdirSync(OUT, { recursive: true })

for (const preset of themePresets) {
  writeFileSync(join(OUT, `${preset.slug}.css`), buildThemeCss(preset))
}

// A small manifest so the docs site / tooling can enumerate presets.
writeFileSync(
  join(OUT, 'index.json'),
  JSON.stringify(
    themePresets.map((p) => ({ name: p.name, slug: p.slug, tag: p.tag })),
    null,
    2,
  ) + '\n',
)

console.log(`Generated ${themePresets.length} theme presets → public/themes/`)
