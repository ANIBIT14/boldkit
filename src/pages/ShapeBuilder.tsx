import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Layout } from '@/components/layout'
import { SEO } from '@/components/SEO'
import { Copy, Check, ChevronLeft, Wand2 } from 'lucide-react'
import { toast } from 'sonner'
import { useFramework, FrameworkToggle, ReactIcon, VueIcon } from '@/hooks/use-framework'
import {
  TriangleShape, DiamondBadge, PentagonShape, HexagonShape, OctagonShape, CrossShape,
  TrapezoidShape, ParallelogramShape,
  Star4Shape, Star5Shape, Star6Shape, BurstShape, ExplosionShape, SplatShape, LightningShape,
  BlobShape, WaveShape, CloudShape, HeartShape, AppleShape,
  SunShape, CrescentShape, RainbowShape, PlanetShape, UmbrellaShape,
  ArrowBadge, ZigzagBanner, RibbonShape, ShieldShape, TagShape, PriceTagShape,
  TicketShape, CouponShape, BookmarkShape, FlagShape, PillShape, SealShape, WavyRectangleShape,
  SpeechBubble, CursorShape, EyeShape,
  ScribbleCircle, ScribbleUnderline, PaperTearShape,
  GearShape,
} from '@/components/ui/shapes'

type ShapeAnimation = 'none' | 'spin' | 'pulse' | 'float' | 'wiggle' | 'bounce' | 'glitch'
type ShapeSpeed = 'slow' | 'normal' | 'fast'

const ALL_SHAPES = [
  // Geometric
  { id: 'triangle', name: 'Triangle', component: TriangleShape, category: 'Geometric' },
  { id: 'diamond', name: 'Diamond', component: DiamondBadge, category: 'Geometric' },
  { id: 'pentagon', name: 'Pentagon', component: PentagonShape, category: 'Geometric' },
  { id: 'hexagon', name: 'Hexagon', component: HexagonShape, category: 'Geometric' },
  { id: 'octagon', name: 'Octagon', component: OctagonShape, category: 'Geometric' },
  { id: 'cross', name: 'Cross', component: CrossShape, category: 'Geometric' },
  { id: 'trapezoid', name: 'Trapezoid', component: TrapezoidShape, category: 'Geometric' },
  { id: 'parallelogram', name: 'Parallelogram', component: ParallelogramShape, category: 'Geometric' },
  // Stars & Bursts
  { id: 'star4', name: 'Star 4-Point', component: Star4Shape, category: 'Stars & Bursts' },
  { id: 'star5', name: 'Star 5-Point', component: Star5Shape, category: 'Stars & Bursts' },
  { id: 'star6', name: 'Star 6-Point', component: Star6Shape, category: 'Stars & Bursts' },
  { id: 'burst', name: 'Burst', component: BurstShape, category: 'Stars & Bursts' },
  { id: 'explosion', name: 'Explosion', component: ExplosionShape, category: 'Stars & Bursts' },
  { id: 'splat', name: 'Splat', component: SplatShape, category: 'Stars & Bursts' },
  { id: 'lightning', name: 'Lightning', component: LightningShape, category: 'Stars & Bursts' },
  // Organic
  { id: 'blob', name: 'Blob', component: BlobShape, category: 'Organic' },
  { id: 'wave', name: 'Wave', component: WaveShape, category: 'Organic' },
  { id: 'cloud', name: 'Cloud', component: CloudShape, category: 'Organic' },
  { id: 'heart', name: 'Heart', component: HeartShape, category: 'Organic' },
  { id: 'apple', name: 'Apple', component: AppleShape, category: 'Organic' },
  // Celestial
  { id: 'sun', name: 'Sun', component: SunShape, category: 'Celestial' },
  { id: 'crescent', name: 'Crescent', component: CrescentShape, category: 'Celestial' },
  { id: 'rainbow', name: 'Rainbow', component: RainbowShape, category: 'Celestial' },
  { id: 'planet', name: 'Planet', component: PlanetShape, category: 'Celestial' },
  { id: 'umbrella', name: 'Umbrella', component: UmbrellaShape, category: 'Celestial' },
  // Badges & UI
  { id: 'arrow-badge', name: 'Arrow Badge', component: ArrowBadge, category: 'Badges & UI' },
  { id: 'zigzag', name: 'Zigzag Banner', component: ZigzagBanner, category: 'Badges & UI' },
  { id: 'ribbon', name: 'Ribbon', component: RibbonShape, category: 'Badges & UI' },
  { id: 'shield', name: 'Shield', component: ShieldShape, category: 'Badges & UI' },
  { id: 'tag', name: 'Tag', component: TagShape, category: 'Badges & UI' },
  { id: 'price-tag', name: 'Price Tag', component: PriceTagShape, category: 'Badges & UI' },
  { id: 'ticket', name: 'Ticket', component: TicketShape, category: 'Badges & UI' },
  { id: 'coupon', name: 'Coupon', component: CouponShape, category: 'Badges & UI' },
  { id: 'bookmark', name: 'Bookmark', component: BookmarkShape, category: 'Badges & UI' },
  { id: 'flag', name: 'Flag', component: FlagShape, category: 'Badges & UI' },
  { id: 'pill', name: 'Pill', component: PillShape, category: 'Badges & UI' },
  { id: 'seal', name: 'Seal', component: SealShape, category: 'Badges & UI' },
  { id: 'wavy-rect', name: 'Wavy Rect', component: WavyRectangleShape, category: 'Badges & UI' },
  // Communication
  { id: 'speech-bubble', name: 'Speech Bubble', component: SpeechBubble, category: 'Communication' },
  { id: 'cursor', name: 'Cursor', component: CursorShape, category: 'Communication' },
  { id: 'eye', name: 'Eye', component: EyeShape, category: 'Communication' },
  // Decorative
  { id: 'scribble-circle', name: 'Scribble Circle', component: ScribbleCircle, category: 'Decorative' },
  { id: 'scribble-underline', name: 'Scribble Underline', component: ScribbleUnderline, category: 'Decorative' },
  { id: 'paper-tear', name: 'Paper Tear', component: PaperTearShape, category: 'Decorative' },
  // Mechanical
  { id: 'gear', name: 'Gear', component: GearShape, category: 'Mechanical' },
]

const ANIMATIONS: { value: ShapeAnimation; label: string; emoji: string }[] = [
  { value: 'none', label: 'None', emoji: '—' },
  { value: 'spin', label: 'Spin', emoji: '🔄' },
  { value: 'pulse', label: 'Pulse', emoji: '💓' },
  { value: 'float', label: 'Float', emoji: '🪁' },
  { value: 'wiggle', label: 'Wiggle', emoji: '〰️' },
  { value: 'bounce', label: 'Bounce', emoji: '🏀' },
  { value: 'glitch', label: 'Glitch', emoji: '⚡' },
]

const SPEEDS: { value: ShapeSpeed; label: string }[] = [
  { value: 'slow', label: 'Slow' },
  { value: 'normal', label: 'Normal' },
  { value: 'fast', label: 'Fast' },
]

const COLOR_PRESETS = [
  { label: 'Default', value: '', tailwind: 'text-primary' },
  { label: 'Primary', value: 'hsl(var(--primary))', tailwind: 'text-primary' },
  { label: 'Secondary', value: 'hsl(var(--secondary))', tailwind: 'text-secondary' },
  { label: 'Accent', value: 'hsl(var(--accent))', tailwind: 'text-accent' },
  { label: 'Warning', value: 'hsl(var(--warning))', tailwind: 'text-warning' },
  { label: 'Success', value: 'hsl(var(--success))', tailwind: 'text-success' },
  { label: 'Info', value: 'hsl(var(--info))', tailwind: 'text-info' },
  { label: 'Destructive', value: 'hsl(var(--destructive))', tailwind: 'text-destructive' },
  { label: 'Custom', value: 'custom', tailwind: '' },
]

const CATEGORIES = ['All', ...Array.from(new Set(ALL_SHAPES.map(s => s.category)))]

export function ShapeBuilder() {
  const { framework } = useFramework()
  const [selectedId, setSelectedId] = useState('star5')
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [size, setSize] = useState(120)
  const [strokeWidth, setStrokeWidth] = useState(3)
  const [filled, setFilled] = useState(true)
  const [colorPreset, setColorPreset] = useState('')
  const [customColor, setCustomColor] = useState('#ff0000')
  const [animation, setAnimation] = useState<ShapeAnimation>('none')
  const [speed, setSpeed] = useState<ShapeSpeed>('normal')
  const [copied, setCopied] = useState(false)

  const selected = ALL_SHAPES.find(s => s.id === selectedId) ?? ALL_SHAPES[0]

  const filteredShapes = useMemo(() => {
    return ALL_SHAPES.filter(s => {
      const matchesCat = activeCategory === 'All' || s.category === activeCategory
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase())
      return matchesCat && matchesSearch
    })
  }, [activeCategory, search])

  const effectiveColor = colorPreset === 'custom' ? customColor : colorPreset || undefined

  // Build the component name from the shape's component function
  const componentName = selected.component.displayName ?? selected.component.name

  const buildReactCode = () => {
    const props: string[] = [`size={${size}}`]
    if (!filled) props.push(`filled={false}`)
    if (strokeWidth !== 3) props.push(`strokeWidth={${strokeWidth}}`)
    if (effectiveColor) props.push(`color="${effectiveColor}"`)
    if (animation !== 'none') {
      props.push(`animation="${animation}"`)
      if (speed !== 'normal') props.push(`speed="${speed}"`)
    }
    const propsStr = props.length ? ' ' + props.join(' ') : ''
    return `import { ${componentName} } from '@/components/ui/shapes'\n\n<${componentName}${propsStr} />`
  }

  const buildVueCode = () => {
    const props: string[] = [`:size="${size}"`]
    if (!filled) props.push(`:filled="false"`)
    if (strokeWidth !== 3) props.push(`:stroke-width="${strokeWidth}"`)
    if (effectiveColor) props.push(`color="${effectiveColor}"`)
    if (animation !== 'none') {
      props.push(`animation="${animation}"`)
      if (speed !== 'normal') props.push(`speed="${speed}"`)
    }
    const propsStr = props.length ? ' ' + props.join(' ') : ''
    return `<script setup lang="ts">\nimport { ${componentName} } from '@/components/ui/shapes'\n</script>\n\n<template>\n  <${componentName}${propsStr} />\n</template>`
  }

  const code = framework === 'react' ? buildReactCode() : buildVueCode()

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    toast.success('Code copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const ShapeComponent = selected.component

  return (
    <>
      <SEO
        title="Shape Builder — Customize & Export Neubrutalism Shapes"
        description="Interactive shape builder for BoldKit. Customize size, color, animation, fill, and stroke for all 42 neubrutalism SVG shapes. Export React or Vue code instantly."
        keywords="shape builder, SVG shape customizer, neubrutalism shapes, animated shapes, React shape component, Vue shape component"
        canonical="https://boldkit.dev/shapes/builder"
        breadcrumbs={[
          { name: 'Home', url: 'https://boldkit.dev/' },
          { name: 'Shapes', url: 'https://boldkit.dev/shapes' },
          { name: 'Shape Builder' },
        ]}
      />
      <Layout>
        {/* Header strip */}
        <div className="h-[3px] bg-primary w-full" />

        {/* Page header */}
        <div className="border-b-3 border-foreground bg-muted/20 px-4 py-5 md:px-6 md:py-6">
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
            <div className="flex items-center gap-3">
              <Link to="/shapes">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Shapes
                </Button>
              </Link>
              <div className="h-6 w-px bg-foreground/20" />
              <div className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary" />
                <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight">Shape Builder</h1>
              </div>
            </div>
            <div className="md:ml-auto">
              <FrameworkToggle />
            </div>
          </div>
        </div>

        {/* Main layout: left picker + right builder */}
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-160px)] overflow-hidden mb-8 lg:mb-0">

          {/* LEFT: Shape Picker */}
          <div className="w-full lg:w-72 xl:w-80 border-b-3 lg:border-b-0 lg:border-r-3 border-foreground flex flex-col shrink-0">
            <div className="p-3 border-b-3 border-foreground bg-muted/30">
              <Input
                placeholder="Search shapes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="h-8 text-sm"
              />
            </div>

            {/* Category filter */}
            <div className="flex gap-1.5 flex-wrap p-2 border-b-3 border-foreground bg-muted/10">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border-2 border-foreground transition-all ${
                    activeCategory === cat
                      ? 'bg-foreground text-background shadow-[2px_2px_0px_hsl(var(--primary))]'
                      : 'bg-background hover:bg-muted'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Shape grid */}
            <div className="flex-1 overflow-y-auto p-2 grid grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 auto-rows-min gap-1.5">
              {filteredShapes.map(shape => {
                const Comp = shape.component
                const isSelected = shape.id === selectedId
                return (
                  <button
                    key={shape.id}
                    onClick={() => setSelectedId(shape.id)}
                    className={`flex flex-col items-center justify-center gap-1 p-2 border-2 border-foreground transition-all ${
                      isSelected
                        ? 'bg-primary text-primary-foreground shadow-[3px_3px_0px_hsl(var(--foreground))] translate-x-[-1px] translate-y-[-1px]'
                        : 'bg-background hover:bg-muted hover:shadow-[2px_2px_0px_hsl(var(--foreground))] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                    }`}
                    title={shape.name}
                  >
                    <Comp
                      size={32}
                      color={isSelected ? 'hsl(var(--primary-foreground))' : undefined}
                      filled={filled}
                      animation={animation}
                      speed={speed}
                    />
                    <span className={`text-[8px] font-bold uppercase tracking-wide leading-tight text-center truncate w-full ${isSelected ? 'text-primary-foreground' : ''}`}>
                      {shape.name}
                    </span>
                  </button>
                )
              })}
              {filteredShapes.length === 0 && (
                <div className="col-span-4 lg:col-span-3 xl:col-span-4 py-8 text-center text-sm text-muted-foreground">
                  No shapes found
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Builder panel */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

            {/* Preview */}
            <div className="lg:flex-1 flex items-center justify-center bg-[repeating-linear-gradient(45deg,hsl(var(--muted))_0px,hsl(var(--muted))_1px,transparent_1px,transparent_12px)] border-b-3 lg:border-b-0 lg:border-r-3 border-foreground min-h-[220px] lg:min-h-0">
              <div className="flex flex-col items-center gap-4">
                <div className="p-8 bg-background border-3 border-foreground shadow-[6px_6px_0px_hsl(var(--foreground))]">
                  <ShapeComponent
                    size={size}
                    strokeWidth={strokeWidth}
                    filled={filled}
                    color={effectiveColor}
                    animation={animation}
                    speed={speed}
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{selected.name}</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-0.5">{selected.category}</p>
                </div>
              </div>
            </div>

            {/* Controls + Code */}
            <div className="w-full lg:w-72 xl:w-80 overflow-y-auto flex flex-col">

              {/* Controls */}
              <div className="p-4 space-y-5 border-b-3 border-foreground">
                <p className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground">Customize</p>

                {/* Size */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold uppercase tracking-wide">Size</Label>
                    <span className="text-xs font-mono bg-muted border-2 border-foreground px-1.5 py-0.5">{size}px</span>
                  </div>
                  <Slider
                    min={24}
                    max={200}
                    step={4}
                    value={[size]}
                    onValueChange={([v]) => setSize(v)}
                  />
                </div>

                {/* Stroke width */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold uppercase tracking-wide">Stroke Width</Label>
                    <span className="text-xs font-mono bg-muted border-2 border-foreground px-1.5 py-0.5">{strokeWidth}px</span>
                  </div>
                  <Slider
                    min={1}
                    max={8}
                    step={0.5}
                    value={[strokeWidth]}
                    onValueChange={([v]) => setStrokeWidth(v)}
                  />
                </div>

                {/* Filled */}
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold uppercase tracking-wide">Filled</Label>
                  <Switch checked={filled} onCheckedChange={setFilled} />
                </div>

                {/* Color */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wide">Color</Label>
                  <div className="grid grid-cols-4 gap-1">
                    {COLOR_PRESETS.map(preset => (
                      <button
                        key={preset.label}
                        onClick={() => setColorPreset(preset.value)}
                        className={`h-7 border-2 border-foreground text-[9px] font-bold uppercase tracking-wide transition-all ${
                          colorPreset === preset.value
                            ? 'shadow-[2px_2px_0px_hsl(var(--foreground))] translate-x-[-1px] translate-y-[-1px]'
                            : 'hover:shadow-[1px_1px_0px_hsl(var(--foreground))]'
                        }`}
                        style={preset.value && preset.value !== 'custom' ? { backgroundColor: preset.value, color: '#fff' } : {}}
                        title={preset.label}
                      >
                        {preset.value === '' ? 'DEF' : preset.value === 'custom' ? 'HEX' : preset.label.slice(0, 3).toUpperCase()}
                      </button>
                    ))}
                  </div>
                  {colorPreset === 'custom' && (
                    <div className="flex gap-2 mt-1">
                      <input
                        type="color"
                        value={customColor}
                        onChange={e => setCustomColor(e.target.value)}
                        className="h-8 w-12 border-2 border-foreground cursor-pointer"
                      />
                      <Input
                        value={customColor}
                        onChange={e => setCustomColor(e.target.value)}
                        className="flex-1 h-8 text-xs font-mono"
                        placeholder="#ff0000"
                      />
                    </div>
                  )}
                </div>

                {/* Animation */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wide">Animation</Label>
                  <div className="grid grid-cols-4 gap-1">
                    {ANIMATIONS.map(anim => (
                      <button
                        key={anim.value}
                        onClick={() => setAnimation(anim.value)}
                        className={`h-8 border-2 border-foreground text-[9px] font-bold uppercase tracking-wide transition-all flex flex-col items-center justify-center gap-0.5 ${
                          animation === anim.value
                            ? 'bg-foreground text-background shadow-[2px_2px_0px_hsl(var(--primary))] translate-x-[-1px] translate-y-[-1px]'
                            : 'bg-background hover:bg-muted'
                        }`}
                      >
                        <span className="text-[10px] leading-none">{anim.emoji === '—' ? '—' : anim.emoji}</span>
                        <span>{anim.label.slice(0, 3)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Speed (only when animation is set) */}
                {animation !== 'none' && (
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wide">Speed</Label>
                    <div className="flex gap-1">
                      {SPEEDS.map(s => (
                        <button
                          key={s.value}
                          onClick={() => setSpeed(s.value)}
                          className={`flex-1 h-7 border-2 border-foreground text-[10px] font-bold uppercase tracking-wide transition-all ${
                            speed === s.value
                              ? 'bg-foreground text-background'
                              : 'bg-background hover:bg-muted'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Code output */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground">Code</p>
                    <div className="flex items-center gap-1">
                      {framework === 'react' ? <ReactIcon className="h-3.5 w-3.5 text-sky-500" /> : <VueIcon className="h-3.5 w-3.5 text-emerald-500" />}
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">{framework}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-6 px-2 text-xs gap-1" onClick={copyCode}>
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                </div>
                <pre className="flex-1 bg-foreground text-background text-[11px] font-mono p-3 overflow-auto leading-relaxed border-2 border-foreground whitespace-pre-wrap break-all min-h-[120px]">
                  {code}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
