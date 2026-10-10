// scripts/generate-theme-presets.ts
// Emits one CSS-vars-only swap file per theme preset into public/themes/.
// Consumers drop a file into their globals.css to reskin BoldKit. Runs at
// build time (see the `themes` npm script) so the files never drift from the
// shared preset list in src/config/theme-presets.ts.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { themePresets, buildThemeCss, themeVars } from '../src/config/theme-presets.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT = join(ROOT, 'public', 'themes')

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

// Each preset also ships as an installable `theme-<slug>` registry item, so
// `shadcn add @boldkit/theme-ocean` (React) / `shadcn-vue add …/vue/theme-ocean.json`
// merges the variables into an existing BoldKit stylesheet. The React items live
// in registry.json (shadcn build emits public/r/); the Vue registry has no build
// step for themes, so its items are written straight to public/r/vue/.
const themeCss = (v: ReturnType<typeof themeVars>) => ({
  ':root': Object.fromEntries(Object.entries(v.light).map(([k, x]) => [`--${k}`, x])),
  '.dark': Object.fromEntries(Object.entries(v.dark).map(([k, x]) => [`--${k}`, x])),
})

const themeItem = (p: (typeof themePresets)[number]) => ({
  name: `theme-${p.slug}`,
  type: 'registry:theme',
  title: `Theme: ${p.name}`,
  description: `BoldKit ${p.name} preset (${p.tag}). Swaps brand colours and the tinted neutral palette; needs BoldKit's base styles already installed.`,
  // `css`, not `cssVars`: on Tailwind v4 the shadcn CLI wraps every channel-
  // triple cssVar as `hsl(…)`, and BoldKit's `hsl(var(--x))` then resolves to
  // hsl(hsl(…)) — invalid. `css` values are written verbatim.
  css: themeCss(themeVars(p)),
})

const registryPath = join(ROOT, 'registry.json')
const registry = JSON.parse(readFileSync(registryPath, 'utf8'))
const kept = registry.items.filter((i: { name: string }) => !i.name.startsWith('theme-'))
const at = kept.findIndex((i: { name: string }) => i.name === 'theme') + 1
registry.items = [...kept.slice(0, at), ...themePresets.map(themeItem), ...kept.slice(at)]
writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n')

const VUE_OUT = join(ROOT, 'public', 'r', 'vue')
mkdirSync(VUE_OUT, { recursive: true })
for (const p of themePresets) {
  writeFileSync(
    join(VUE_OUT, `theme-${p.slug}.json`),
    JSON.stringify({ $schema: 'https://ui.shadcn.com/schema/registry-item.json', ...themeItem(p), files: [] }, null, 2),
  )
}

console.log(`Wrote ${themePresets.length} theme-<slug> registry items (registry.json + public/r/vue/)`)
