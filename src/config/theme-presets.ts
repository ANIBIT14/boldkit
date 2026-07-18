// Shared source of truth for BoldKit theme presets.
//
// Consumed by two surfaces:
//   1. src/pages/ThemeBuilder.tsx — the interactive builder's preset grid.
//   2. scripts/generate-theme-presets.ts — emits public/themes/<slug>.css at
//      build time so each preset ships as a copy-paste, CSS-vars-only swap.
//
// Keep this framework-free (no React/DOM) so the Node build script can import it.

export interface ThemePreset {
  name: string
  slug: string
  tag: string
  /** HSL channel triples, e.g. "0 84% 71%". */
  primary: string
  secondary: string
  accent: string
}

export const themePresets: ThemePreset[] = [
  { name: 'Coral',     slug: 'coral',     tag: 'warm & bold',        primary: '0 84% 71%',    secondary: '174 62% 56%',  accent: '49 100% 71%' },
  { name: 'Purple',    slug: 'purple',    tag: 'vivid & dramatic',   primary: '271 76% 53%',  secondary: '326 78% 60%',  accent: '199 89% 48%' },
  { name: 'Forest',    slug: 'forest',    tag: 'earthy & fresh',     primary: '152 69% 45%',  secondary: '82 68% 55%',   accent: '49 100% 60%' },
  { name: 'Ocean',     slug: 'ocean',     tag: 'cool & serene',      primary: '199 89% 48%',  secondary: '174 62% 56%',  accent: '152 69% 69%' },
  { name: 'Sunset',    slug: 'sunset',    tag: 'fiery & expressive', primary: '14 100% 57%',  secondary: '326 78% 60%',  accent: '49 100% 60%' },
  { name: 'Mono',      slug: 'mono',      tag: 'clean & minimal',    primary: '0 0% 90%',     secondary: '0 0% 75%',     accent: '49 100% 65%' },
  { name: 'Neon',      slug: 'neon',      tag: 'electric & raw',     primary: '318 100% 50%', secondary: '180 100% 50%', accent: '60 100% 50%' },
  { name: 'Electric',  slug: 'electric',  tag: 'punchy & vibrant',   primary: '258 100% 65%', secondary: '166 100% 50%', accent: '45 100% 55%' },
  { name: 'Candy',     slug: 'candy',     tag: 'sweet & playful',    primary: '340 82% 65%',  secondary: '280 70% 60%',  accent: '190 100% 60%' },
  { name: 'Cyberpunk', slug: 'cyberpunk', tag: 'toxic & dystopian',  primary: '112 100% 54%', secondary: '342 100% 59%', accent: '193 100% 50%' },
  { name: 'Retro',     slug: 'retro',     tag: 'vintage & gritty',   primary: '22 91% 48%',   secondary: '173 43% 51%',  accent: '45 90% 61%' },
  { name: 'Pastel',    slug: 'pastel',    tag: 'soft & kawaii',      primary: '344 100% 82%', secondary: '154 56% 78%',  accent: '260 53% 80%' },
  { name: 'Gold',      slug: 'gold',      tag: 'luxury & refined',   primary: '45 87% 55%',   secondary: '221 42% 30%',  accent: '38 82% 52%' },
  { name: 'Cherry',    slug: 'cherry',    tag: 'bold & japanese',    primary: '5 66% 46%',    secondary: '151 37% 22%',  accent: '37 90% 51%' },
]

// --- contrast-aware foreground picking (pure; mirrors ThemeBuilder) ---

function parseHsl(hsl: string): { h: number; s: number; l: number } {
  const [h, s, l] = hsl.split(' ').map((p) => parseFloat(p.replace('%', '')))
  return { h: h || 0, s: s || 0, l: l || 0 }
}

// WCAG relative luminance — hue-aware so foreground contrast is correct.
function relativeLuminance(hsl: string): number {
  const { h, s: sRaw, l: lRaw } = parseHsl(hsl)
  const s = sRaw / 100
  const l = lRaw / 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * f(0) + 0.7152 * f(8) + 0.0722 * f(4)
}

// 0.179 = crossover where black and white text have equal contrast ratio.
function foregroundFor(bg: string): string {
  return relativeLuminance(bg) > 0.179 ? '240 10% 10%' : '0 0% 100%'
}

/**
 * Produce a full, drop-in theme stylesheet for a preset: the Tailwind v4
 * `@theme` bridge plus `:root` (light) and `.dark` blocks. Only the primary /
 * secondary / accent hues vary per preset; the neutral scale is BoldKit's
 * default so every preset stays legible.
 */
export function buildThemeCss(preset: ThemePreset): string {
  const primaryFg = foregroundFor(preset.primary)
  const secondaryFg = foregroundFor(preset.secondary)
  const accentFg = foregroundFor(preset.accent)

  return `/* BoldKit theme preset: ${preset.name} — ${preset.tag} */
/* CSS-vars-only swap. Drop into your globals.css (Tailwind v4 + shadcn). */

@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --background: 60 9% 98%;
  --foreground: 240 10% 10%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 10%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 10%;
  --primary: ${preset.primary};
  --primary-foreground: ${primaryFg};
  --secondary: ${preset.secondary};
  --secondary-foreground: ${secondaryFg};
  --accent: ${preset.accent};
  --accent-foreground: ${accentFg};
  --muted: 60 5% 90%;
  --muted-foreground: 240 4% 46%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --border: 240 10% 10%;
  --input: 240 10% 10%;
  --ring: 240 10% 10%;
  --radius: 0rem;
  --shadow-color: 240 10% 10%;
  --shadow-offset: 4px;
  --border-width: 3px;
}

.dark {
  --background: 240 10% 10%;
  --foreground: 60 9% 98%;
  --card: 240 10% 14%;
  --card-foreground: 60 9% 98%;
  --popover: 240 10% 14%;
  --popover-foreground: 60 9% 98%;
  --primary: ${preset.primary};
  --primary-foreground: ${primaryFg};
  --secondary: ${preset.secondary};
  --secondary-foreground: ${secondaryFg};
  --accent: ${preset.accent};
  --accent-foreground: ${accentFg};
  --muted: 240 10% 20%;
  --muted-foreground: 60 5% 65%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --border: 60 9% 98%;
  --input: 60 9% 98%;
  --ring: 60 9% 98%;
  --shadow-color: 0 0% 0%;
}
`
}
