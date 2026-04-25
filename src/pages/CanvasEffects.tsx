import { useState } from 'react'
import { Layout } from '@/components/layout'
import { SEO, pageSEO } from '@/components/SEO'
import { Copy, Check, Code2, Terminal } from 'lucide-react'
import { toast } from 'sonner'
import { useFramework, FrameworkToggle } from '@/hooks/use-framework'
import {
  DotBlob, Aurora, DotWave, MatrixRain, ParticleWeb,
  MouseRipple, FlowField, Metaballs, LissajousGrid, Plasma,
} from '@/components/CanvasEffects/react'

const DISPLAY: React.CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" }
const MONO: React.CSSProperties    = { fontFamily: "'DM Mono', monospace" }

// ─── Effect catalogue ─────────────────────────────────────────────────────────
interface EffectDef {
  id:        string
  name:      string
  category:  string
  accent:    string
  desc:      string
  reactCode: string
  vueCode:   string
  node:      React.ReactNode
  featured?: boolean
}

const EFFECTS: EffectDef[] = [
  {
    id: 'dot-blob', name: 'Dot Blob', category: 'Halftone', accent: '#c9ba4c',
    desc: 'Gaussian envelope × crossing waves drive halftone pixel sizes',
    reactCode: `<DotBlob color="#c9ba4c" dotSize={4} gap={9} speed={1} threshold={0.28} />`,
    vueCode:   `<DotBlob color="#c9ba4c" :dot-size="4" :gap="9" :speed="1" :threshold="0.28" />`,
    node: <DotBlob color="#c9ba4c" dotSize={4} gap={9} speed={1} threshold={0.28} />,
    featured: true,
  },
  {
    id: 'aurora', name: 'Aurora', category: 'Atmosphere', accent: '#00ffaa',
    desc: 'Curtains of light ripple across a star-filled sky',
    reactCode: `<Aurora colors={['#00ffaa','#00beff','#78ff64','#be50ff']} starCount={160} speed={1} />`,
    vueCode:   `<Aurora :colors="['#00ffaa','#00beff','#78ff64','#be50ff']" :star-count="160" :speed="1" />`,
    node: <Aurora colors={['#00ffaa', '#00beff', '#78ff64', '#be50ff', '#00dceb']} starCount={160} speed={1} />,
    featured: true,
  },
  {
    id: 'dot-wave', name: 'Dot Wave', category: 'Sine field', accent: '#ef4444',
    desc: 'Dual crossing sine waves modulate dot size and opacity',
    reactCode: `<DotWave color="#ef4444" gap={22} speed={1} />`,
    vueCode:   `<DotWave color="#ef4444" :gap="22" :speed="1" />`,
    node: <DotWave color="#ef4444" gap={22} speed={1} />,
  },
  {
    id: 'matrix-rain', name: 'Matrix Rain', category: 'Column sim', accent: '#22c55e',
    desc: 'Columns of glowing heads and fading square trails',
    reactCode: `<MatrixRain headColor="#fff" trailHue={120} gap={16} speed={1} tailLength={10} />`,
    vueCode:   `<MatrixRain head-color="#fff" :trail-hue="120" :gap="16" :speed="1" :tail-length="10" />`,
    node: <MatrixRain headColor="#ffffff" trailHue={120} gap={16} speed={1} tailLength={10} />,
  },
  {
    id: 'particle-web', name: 'Particle Web', category: 'Graph', accent: '#818cf8',
    desc: '60 particles connected by proximity-faded lines',
    reactCode: `<ParticleWeb count={60} particleColor="#818cf8" lineColor="#6366f1" maxDistance={110} speed={1} />`,
    vueCode:   `<ParticleWeb :count="60" particle-color="#818cf8" line-color="#6366f1" :max-distance="110" :speed="1" />`,
    node: <ParticleWeb count={60} particleColor="#818cf8" lineColor="#6366f1" maxDistance={110} speed={1} />,
  },
  {
    id: 'mouse-ripple', name: 'Mouse Ripple', category: 'Interactive', accent: '#f59e0b',
    desc: 'Move the cursor to send sine ripples through the dot grid',
    reactCode: `<MouseRipple color="#f59e0b" gap={24} rippleRadius={130} speed={1} />`,
    vueCode:   `<MouseRipple color="#f59e0b" :gap="24" :ripple-radius="130" :speed="1" />`,
    node: <MouseRipple color="#f59e0b" gap={24} rippleRadius={130} speed={1} />,
  },
  {
    id: 'flow-field', name: 'Flow Field', category: 'Noise', accent: '#22d3ee',
    desc: '200 particles follow a smooth value-noise angle field',
    reactCode: `<FlowField count={200} hueStart={170} hueRange={120} speed={1} decay={0.028} />`,
    vueCode:   `<FlowField :count="200" :hue-start="170" :hue-range="120" :speed="1" :decay="0.028" />`,
    node: <FlowField count={200} hueStart={170} hueRange={120} speed={1} decay={0.028} />,
  },
  {
    id: 'metaballs', name: 'Metaballs', category: 'Field', accent: '#f472b6',
    desc: 'Colored blobs merge via r²/d² scalar field threshold',
    reactCode: `<Metaballs colors={['#ff5050','#3cb9ff','#ffc32d','#aa4bff','#37ff96']} blobRadius={70} speed={1} />`,
    vueCode:   `<Metaballs :colors="['#ff5050','#3cb9ff','#ffc32d','#aa4bff','#37ff96']" :blob-radius="70" :speed="1" />`,
    node: <Metaballs colors={['#ff5050', '#3cb9ff', '#ffc32d', '#aa4bff', '#37ff96']} blobRadius={70} speed={1} />,
  },
  {
    id: 'lissajous-grid', name: 'Lissajous Grid', category: 'Parametric', accent: '#a78bfa',
    desc: '4×3 table of parametric curves morph together via phase drift',
    reactCode: `<LissajousGrid cols={4} rows={3} speed={1} hueStart={30} opacity={0.72} />`,
    vueCode:   `<LissajousGrid :cols="4" :rows="3" :speed="1" :hue-start="30" :opacity="0.72" />`,
    node: <LissajousGrid cols={4} rows={3} speed={1} hueStart={30} opacity={0.72} />,
  },
  {
    id: 'plasma', name: 'Plasma Waves', category: 'Interference', accent: '#fb923c',
    desc: '4 drifting wave sources create shifting color interference',
    reactCode: `<Plasma palette={['#0a1450','#1e64c8','#00d2dc','#5affa6','#ffc832','#ff4b82','#a01ec8']} speed={1} />`,
    vueCode:   `<Plasma :palette="['#0a1450','#1e64c8','#00d2dc','#5affa6','#ffc832','#ff4b82','#a01ec8']" :speed="1" />`,
    node: <Plasma palette={['#0a1450', '#1e64c8', '#00d2dc', '#5affa6', '#ffc832', '#ff4b82', '#a01ec8']} speed={1} />,
  },
]

const FEATURED = EFFECTS.filter(e => e.featured)
const GRID     = EFFECTS.filter(e => !e.featured)

// ─── Card component ────────────────────────────────────────────────────────────
function EffectCard({ effect, featured = false, framework }: {
  effect:    EffectDef
  featured?: boolean
  framework: string
}) {
  const [copied, setCopied]         = useState(false)
  const [copiedInstall, setCopiedInstall] = useState(false)
  const code = framework === 'react' ? effect.reactCode : effect.vueCode

  const installCmd = framework === 'react'
    ? `npx shadcn@latest add "https://boldkit.dev/r/${effect.id}.json"`
    : `npx shadcn-vue@latest add "https://boldkit.dev/r/vue/${effect.id}.json"`

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    toast.success('Copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const copyInstall = () => {
    navigator.clipboard.writeText(installCmd)
    setCopiedInstall(true)
    toast.success('Install command copied!')
    setTimeout(() => setCopiedInstall(false), 2000)
  }

  const canvasClass = featured
    ? 'h-[260px] sm:h-[320px] md:h-[380px] lg:h-[440px]'
    : 'h-[190px] sm:h-[230px] lg:h-[270px]'

  return (
    <div
      className="group flex flex-col border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_hsl(var(--shadow-color))] overflow-hidden"
      style={{ borderLeftColor: effect.accent }}
    >
      {/* Canvas — dominant, full bleed. Overlay carries the labels. */}
      <div
        className={`relative overflow-hidden shrink-0 ${canvasClass}`}
        style={{ background: '#070707' }}
      >
        {effect.node}

        {/* Bottom gradient overlay: category pill + name + copy button */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/92 via-black/55 to-transparent pt-14 px-3 pb-3">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0 flex-1">
              <span
                className="text-[8px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5 inline-block mb-1.5 leading-tight"
                style={{ background: effect.accent, color: '#0a0a0a' }}
              >
                {effect.category}
              </span>
              <div
                className="text-sm sm:text-base font-black uppercase leading-tight text-white truncate"
                style={DISPLAY}
              >
                {effect.name}
              </div>
              {featured && (
                <div className="text-[10px] text-white/40 mt-0.5 leading-tight line-clamp-1" style={MONO}>
                  {effect.desc}
                </div>
              )}
            </div>

            {/* Copy — sits inside overlay, always accessible */}
            <button
              onClick={copy}
              className="shrink-0 flex items-center justify-center gap-1.5 min-w-[40px] min-h-[34px] px-2 border border-white/20 bg-black/50 text-white/70 text-[10px] font-bold uppercase tracking-wide transition-all hover:border-white/55 hover:bg-black/70 hover:text-white active:scale-95 backdrop-blur-sm"
              title={`Copy ${framework} code`}
              aria-label={`Copy ${effect.name} code`}
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              <span className="hidden sm:inline">{copied ? 'Done' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Code footer — compact mono snippet */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-t-3 border-foreground bg-muted shrink-0 overflow-hidden min-h-[40px]">
        <Code2 size={11} className="shrink-0 text-muted-foreground" aria-hidden />
        <code
          className="text-[10px] sm:text-[11px] text-muted-foreground truncate flex-1 min-w-0 leading-tight"
          style={MONO}
          title={code}
        >
          {code}
        </code>
      </div>

      {/* Install footer — shadcn CLI command */}
      <div className="flex items-center gap-2 px-3 py-2 border-t border-foreground/15 bg-background shrink-0 overflow-hidden">
        <Terminal size={10} className="shrink-0 text-muted-foreground/60" aria-hidden />
        <code
          className="text-[9px] sm:text-[10px] text-muted-foreground/60 truncate flex-1 min-w-0 leading-tight"
          style={MONO}
          title={installCmd}
        >
          {installCmd}
        </code>
        <button
          onClick={copyInstall}
          className="shrink-0 flex items-center justify-center gap-1 h-6 px-1.5 border border-foreground/20 bg-muted text-muted-foreground text-[9px] font-bold uppercase tracking-wide transition-all hover:border-foreground/50 hover:text-foreground active:scale-95"
          title="Copy install command"
          aria-label={`Copy install command for ${effect.name}`}
        >
          {copiedInstall ? <Check size={9} /> : <Copy size={9} />}
          <span className="hidden sm:inline">{copiedInstall ? 'Done' : 'Install'}</span>
        </button>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function CanvasEffects() {
  const { framework } = useFramework()

  const installLine = framework === 'react'
    ? 'npx shadcn@latest add "https://boldkit.dev/r/aurora.json"'
    : 'npx shadcn-vue@latest add "https://boldkit.dev/r/vue/aurora.json"'

  const importLine = framework === 'react'
    ? "import { Aurora } from '@/components/ui/canvas-effects/Aurora'"
    : "import Aurora from '@/components/ui/canvas-effects/Aurora.vue'"

  return (
    <Layout>
      <SEO {...pageSEO.canvasEffects} />

      {/* ── Hero — live canvas behind the title ── */}
      <section
        className="relative border-b-3 border-foreground overflow-hidden"
        style={{ background: '#040404', minHeight: '400px' }}
      >
        {/* Aurora as full-bleed animated backdrop — muted cinematic palette */}
        <div className="absolute inset-0 pointer-events-none">
          <Aurora
            colors={['#003d2e', '#004d5c', '#1a0035', '#002d4a', '#003322']}
            starCount={90}
            speed={0.55}
          />
        </div>
        {/* Dark gradient overlay keeps text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/88 pointer-events-none" />

        <div className="relative container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">

            {/* Eyebrow rule */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10 bg-white/30" />
              <span className="text-[9px] font-black uppercase tracking-[0.35em] text-white/65" style={MONO}>
                BoldKit / Canvas
              </span>
              <div className="h-px w-10 bg-white/30" />
            </div>

            {/* Title — solid fill + hollow stroke on second line */}
            <h1
              className="font-black uppercase leading-none mb-4 text-white"
              style={{ ...DISPLAY, fontSize: 'clamp(3.5rem, 12vw, 7.5rem)' }}
            >
              Canvas
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.45)' }}
              >
                Effects
              </span>
            </h1>

            <p className="text-sm text-white/70 mb-7 max-w-xs mx-auto leading-relaxed" style={MONO}>
              10 animated canvas components.
              <br />Zero dependencies · React · Vue 3 · Nuxt 3
            </p>

            {/* Tag pills */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6 flex-wrap">
              {['10 Effects', 'React', 'Vue 3', 'Nuxt 3', 'TypeScript', 'Zero Deps'].map(tag => (
                <span
                  key={tag}
                  className="text-[9px] font-black uppercase tracking-[0.18em] px-2 py-1 border border-white/25 text-white/65"
                  style={MONO}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Framework toggle */}
            <div className="flex justify-center mb-5">
              <FrameworkToggle />
            </div>

            {/* Install strip — primary CLI command */}
            <div className="flex items-center gap-2 border border-white/25 bg-black/50 backdrop-blur-sm px-3 md:px-4 py-2.5 w-full max-w-xl mx-auto mb-2">
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white/40 shrink-0" style={MONO}>$</span>
              <code
                className="text-[11px] sm:text-xs text-white/70 truncate flex-1 min-w-0"
                style={MONO}
                title={installLine}
              >
                {installLine}
              </code>
              <CopyInstall framework={framework} />
            </div>

            {/* Import strip — post-install import path */}
            <div className="flex items-center gap-2 border border-white/15 bg-black/30 backdrop-blur-sm px-3 md:px-4 py-2.5 w-full max-w-xl mx-auto">
              <code
                className="text-[11px] sm:text-xs text-white/45 truncate flex-1 min-w-0"
                style={MONO}
                title={importLine}
              >
                {importLine}
              </code>
              <CopyImport framework={framework} />
            </div>

          </div>
        </div>
      </section>

      {/* ── Effects ── */}
      <section className="container mx-auto px-3 sm:px-4 py-8 sm:py-10 md:py-14">

        {/* Featured 2-up */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-5 sm:mb-6">
          {FEATURED.map(e => (
            <EffectCard key={e.id} effect={e} featured framework={framework} />
          ))}
        </div>

        {/* Editorial divider — "track number" style */}
        <div className="flex items-center gap-4 my-5 sm:my-7">
          <div className="flex-1 h-px bg-foreground/10" />
          <div className="flex items-center gap-2.5 border-3 border-foreground px-3 py-1.5 bg-card shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
            <span className="text-lg font-black leading-none" style={DISPLAY}>08</span>
            <div className="w-px h-4 bg-foreground/20" />
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground" style={MONO}>
              More Effects
            </span>
          </div>
          <div className="flex-1 h-px bg-foreground/10" />
        </div>

        {/* Main grid — 2-col sm, 3-col xl */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {GRID.map(e => (
            <EffectCard key={e.id} effect={e} framework={framework} />
          ))}
        </div>

        {/* ── Usage notes ── */}
        <div className="mt-10 md:mt-14 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          <UsageNote
            step="01"
            title="Install via CLI"
            body='Run npx shadcn@latest add "https://boldkit.dev/r/{component}.json" (Vue: /r/vue/{component}.json). Or copy the file directly — each effect is self-contained with zero external dependencies.'
            accent="#c9ba4c"
          />
          <UsageNote
            step="02"
            title="Give it a sized parent"
            body="The canvas fills its parent 100%. Wrap in any div with explicit dimensions; ResizeObserver handles the rest automatically."
            accent="#00ffaa"
          />
          <UsageNote
            step="03"
            title="Tweak the props"
            body="Every effect exposes color, speed, count, and effect-specific props. Changes animate in real-time without restarting."
            accent="#818cf8"
          />
        </div>

        {/* Nuxt 3 SSR note */}
        <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 border-3 border-foreground shadow-[3px_3px_0px_hsl(var(--shadow-color))] px-4 py-3 bg-card">
          <span
            className="text-[9px] font-black uppercase tracking-[0.2em] shrink-0 px-1.5 py-0.5 border sm:mt-0.5"
            style={{ borderColor: '#a78bfa', color: '#a78bfa' }}
          >
            Nuxt 3
          </span>
          <p className="text-xs text-muted-foreground leading-relaxed" style={MONO}>
            Canvas operations run in{' '}
            <code className="text-foreground">onMounted</code>{' '}
            — SSR-safe by default. Wrap in{' '}
            <code className="text-foreground">&lt;ClientOnly&gt;</code>{' '}
            if you encounter hydration warnings.
          </p>
        </div>

      </section>
    </Layout>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function CopyInstall({ framework }: { framework: string }) {
  const [copied, setCopied] = useState(false)
  const text = framework === 'react'
    ? 'npx shadcn@latest add "https://boldkit.dev/r/aurora.json"'
    : 'npx shadcn-vue@latest add "https://boldkit.dev/r/vue/aurora.json"'

  return (
    <button
      className="h-8 w-8 p-0 flex items-center justify-center border border-white/25 bg-white/8 text-white/65 hover:bg-white/15 hover:text-white/90 hover:border-white/50 transition-colors shrink-0"
      aria-label="Copy install command"
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        toast.success('Install command copied!')
        setTimeout(() => setCopied(false), 2000)
      }}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
    </button>
  )
}

function CopyImport({ framework }: { framework: string }) {
  const [copied, setCopied] = useState(false)
  const text = framework === 'react'
    ? "import { Aurora } from '@/components/ui/canvas-effects/Aurora'"
    : "import Aurora from '@/components/ui/canvas-effects/Aurora.vue'"

  return (
    <button
      className="h-8 w-8 p-0 flex items-center justify-center border border-white/15 bg-white/5 text-white/45 hover:bg-white/10 hover:text-white/70 hover:border-white/35 transition-colors shrink-0"
      aria-label="Copy import statement"
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        toast.success('Import copied!')
        setTimeout(() => setCopied(false), 2000)
      }}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
    </button>
  )
}

function UsageNote({
  step, title, body, accent,
}: {
  step:   string
  title:  string
  body:   string
  accent?: string
}) {
  return (
    <div
      className="relative border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] bg-card p-4 md:p-5 overflow-hidden"
      style={accent ? { borderLeftColor: accent } : undefined}
    >
      {/* Huge ghost step number — decorative background element */}
      <div
        className="absolute -right-2 -top-4 font-black leading-none select-none pointer-events-none"
        style={{ ...DISPLAY, fontSize: '6rem', color: accent ?? 'currentColor', opacity: 0.07 }}
      >
        {step}
      </div>

      <div className="relative">
        <div
          className="text-[9px] font-black uppercase tracking-[0.2em] mb-3 px-1.5 py-0.5 inline-block border"
          style={accent ? { borderColor: accent, color: accent } : {}}
        >
          Step {step}
        </div>
        <p className="text-xs sm:text-sm font-black uppercase tracking-wide mb-2 leading-tight">
          {title}
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
      </div>
    </div>
  )
}
