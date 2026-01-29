import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useTheme } from '@/hooks/use-theme'
import { Copy, Check, Moon, Sun, Github, AlertCircle, Palette } from 'lucide-react'

// Helper functions for color conversion
function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return { h: 0, s: 0, l: 0 }

  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function parseHsl(hslString: string): { h: number; s: number; l: number } {
  const parts = hslString.split(' ').map(p => parseFloat(p.replace('%', '')))
  return { h: parts[0] || 0, s: parts[1] || 0, l: parts[2] || 0 }
}

function formatHsl(h: number, s: number, l: number): string {
  return `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%`
}

// Color Picker Component
function ColorPicker({
  label,
  value,
  onChange
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  const { h, s, l } = parseHsl(value)
  const hexValue = hslToHex(h, s, l)

  const handleHexChange = (hex: string) => {
    const { h, s, l } = hexToHsl(hex)
    onChange(formatHsl(h, s, l))
  }

  return (
    <div className="space-y-3">
      <Label className="block font-bold">{label}</Label>
      <div className="flex gap-3">
        <div className="relative">
          <input
            type="color"
            value={hexValue}
            onChange={(e) => handleHexChange(e.target.value)}
            className="h-12 w-12 cursor-pointer border-3 border-foreground bg-transparent p-0"
            style={{ colorScheme: 'normal' }}
          />
        </div>
        <div className="flex-1 space-y-2">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="0 84% 71%"
            className="font-mono text-sm"
          />
          <div className="flex gap-2 text-xs text-muted-foreground">
            <span>H: {Math.round(h)}°</span>
            <span>S: {Math.round(s)}%</span>
            <span>L: {Math.round(l)}%</span>
          </div>
        </div>
      </div>
      <div
        className="h-8 border-3 border-foreground"
        style={{ backgroundColor: `hsl(${value})` }}
      />
    </div>
  )
}

const presetThemes = [
  {
    name: 'Coral',
    primary: '0 84% 71%',
    secondary: '174 62% 56%',
    accent: '49 100% 71%',
  },
  {
    name: 'Purple Dream',
    primary: '271 76% 53%',
    secondary: '326 78% 60%',
    accent: '199 89% 48%',
  },
  {
    name: 'Forest',
    primary: '152 69% 45%',
    secondary: '82 68% 55%',
    accent: '49 100% 60%',
  },
  {
    name: 'Ocean',
    primary: '199 89% 48%',
    secondary: '174 62% 56%',
    accent: '152 69% 69%',
  },
  {
    name: 'Sunset',
    primary: '14 100% 57%',
    secondary: '326 78% 60%',
    accent: '49 100% 60%',
  },
  {
    name: 'Monochrome',
    primary: '0 0% 20%',
    secondary: '0 0% 40%',
    accent: '49 100% 71%',
  },
]

export function ThemeBuilder() {
  const { resolvedTheme, setTheme } = useTheme()
  const [copied, setCopied] = useState(false)
  const [colors, setColors] = useState({
    // Light mode colors
    primary: '0 84% 71%',
    secondary: '174 62% 56%',
    accent: '49 100% 71%',
    background: '60 9% 98%',
    foreground: '240 10% 10%',
    muted: '60 5% 90%',
    mutedForeground: '240 4% 46%',
    // Dark mode colors
    darkPrimary: '0 84% 71%',
    darkSecondary: '174 62% 56%',
    darkAccent: '49 100% 71%',
    darkBackground: '240 10% 10%',
    darkForeground: '60 9% 98%',
    darkMuted: '240 10% 20%',
    darkMutedForeground: '60 5% 65%',
    // Effects
    shadowOffset: 4,
    borderWidth: 3,
  })

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', colors.primary)
    document.documentElement.style.setProperty('--secondary', colors.secondary)
    document.documentElement.style.setProperty('--accent', colors.accent)
    document.documentElement.style.setProperty('--shadow-offset', `${colors.shadowOffset}px`)
    document.documentElement.style.setProperty('--border-width', `${colors.borderWidth}px`)
  }, [colors])

  const applyPreset = (preset: typeof presetThemes[0]) => {
    setColors({
      ...colors,
      primary: preset.primary,
      secondary: preset.secondary,
      accent: preset.accent,
      darkPrimary: preset.primary,
      darkSecondary: preset.secondary,
      darkAccent: preset.accent,
    })
  }

  const updateColor = useCallback((key: keyof typeof colors, value: string | number) => {
    setColors(prev => ({ ...prev, [key]: value }))
  }, [])

  const generateCSS = () => {
    return `/* BoldKit Theme - Light & Dark Mode */
:root {
  /* Base Colors */
  --background: ${colors.background};
  --foreground: ${colors.foreground};

  /* Primary */
  --primary: ${colors.primary};
  --primary-foreground: ${colors.foreground};

  /* Secondary */
  --secondary: ${colors.secondary};
  --secondary-foreground: ${colors.foreground};

  /* Accent */
  --accent: ${colors.accent};
  --accent-foreground: ${colors.foreground};

  /* Muted */
  --muted: ${colors.muted};
  --muted-foreground: ${colors.mutedForeground};

  /* Card & Popover */
  --card: 0 0% 100%;
  --card-foreground: ${colors.foreground};
  --popover: 0 0% 100%;
  --popover-foreground: ${colors.foreground};

  /* Destructive */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;

  /* Border & Input */
  --border: ${colors.foreground};
  --input: ${colors.foreground};
  --ring: ${colors.foreground};

  /* Radius - Minimal for neubrutalism */
  --radius: 0rem;

  /* BoldKit specific */
  --shadow-color: ${colors.foreground};
  --shadow-offset: ${colors.shadowOffset}px;
  --border-width: ${colors.borderWidth}px;
}

.dark {
  /* Base Colors */
  --background: ${colors.darkBackground};
  --foreground: ${colors.darkForeground};

  /* Primary */
  --primary: ${colors.darkPrimary};
  --primary-foreground: ${colors.darkBackground};

  /* Secondary */
  --secondary: ${colors.darkSecondary};
  --secondary-foreground: ${colors.darkBackground};

  /* Accent */
  --accent: ${colors.darkAccent};
  --accent-foreground: ${colors.darkBackground};

  /* Muted */
  --muted: ${colors.darkMuted};
  --muted-foreground: ${colors.darkMutedForeground};

  /* Card & Popover */
  --card: 240 10% 14%;
  --card-foreground: ${colors.darkForeground};
  --popover: 240 10% 14%;
  --popover-foreground: ${colors.darkForeground};

  /* Destructive */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;

  /* Border & Input */
  --border: ${colors.darkForeground};
  --input: ${colors.darkForeground};
  --ring: ${colors.darkForeground};

  /* Shadow */
  --shadow-color: 0 0% 0%;
}`
  }

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b-3 border-foreground bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://ik.imagekit.io/fincalfy/304a4c07-8de1-41af-813e-e7556234b973.png" alt="BoldKit" className="h-8 w-8" />
            <span className="text-xl font-black uppercase tracking-wider">BoldKit</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/docs">
              <Button variant="ghost">Docs</Button>
            </Link>
            <Link to="/components">
              <Button variant="ghost">Components</Button>
            </Link>
            <a href="https://github.com/ANIBIT14/boldkit" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
            >
              {resolvedTheme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Badge variant="accent" className="mb-4">
            <Palette className="mr-1 h-3 w-3" /> Theme Builder
          </Badge>
          <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Customize Your Theme
          </h1>
          <p className="mt-2 text-muted-foreground">
            Adjust colors, shadows, and borders to match your brand.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="bg-muted">
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Buttons */}
                <div>
                  <Label className="mb-3 block">Buttons</Label>
                  <div className="flex flex-wrap gap-3">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="accent">Accent</Button>
                    <Button variant="outline">Outline</Button>
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <Label className="mb-3 block">Badges</Label>
                  <div className="flex flex-wrap gap-3">
                    <Badge>Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="accent">Accent</Badge>
                    <Badge variant="success">Success</Badge>
                  </div>
                </div>

                {/* Form Elements */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="mb-2 block">Input</Label>
                    <Input placeholder="Enter text..." />
                  </div>
                  <div>
                    <Label className="mb-2 block">Progress</Label>
                    <Progress value={66} className="mt-3" />
                  </div>
                </div>

                {/* Checkboxes & Switches */}
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Checkbox id="check1" defaultChecked />
                    <Label htmlFor="check1">Checkbox</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="switch1" defaultChecked />
                    <Label htmlFor="switch1">Switch</Label>
                  </div>
                </div>

                {/* Tabs */}
                <div>
                  <Label className="mb-3 block">Tabs</Label>
                  <Tabs defaultValue="tab1">
                    <TabsList>
                      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                      <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content for tab 1</TabsContent>
                    <TabsContent value="tab2">Content for tab 2</TabsContent>
                    <TabsContent value="tab3">Content for tab 3</TabsContent>
                  </Tabs>
                </div>

                {/* Alert */}
                <Alert variant="info">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Info Alert</AlertTitle>
                  <AlertDescription>
                    This is how alerts look with your current theme.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Generated CSS */}
            <Card>
              <CardHeader className="bg-muted">
                <CardTitle>Generated CSS</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <pre className="overflow-x-auto border-3 border-foreground bg-muted p-4 text-sm">
                  <code>{generateCSS()}</code>
                </pre>
              </CardContent>
              <CardFooter>
                <Button onClick={copyCSS} className="gap-2">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy CSS'}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Presets */}
            <Card>
              <CardHeader className="bg-accent">
                <CardTitle>Presets</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-2">
                  {presetThemes.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      size="sm"
                      onClick={() => applyPreset(preset)}
                      className="justify-start"
                    >
                      <span
                        className="mr-2 h-4 w-4 border-2 border-foreground"
                        style={{ backgroundColor: `hsl(${preset.primary})` }}
                      />
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Colors */}
            <Card>
              <CardHeader className="bg-secondary">
                <CardTitle>Colors</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="light">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="light" className="flex-1 gap-2">
                      <Sun className="h-4 w-4" /> Light
                    </TabsTrigger>
                    <TabsTrigger value="dark" className="flex-1 gap-2">
                      <Moon className="h-4 w-4" /> Dark
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="light" className="space-y-4">
                    <ColorPicker
                      label="Primary"
                      value={colors.primary}
                      onChange={(v) => updateColor('primary', v)}
                    />
                    <ColorPicker
                      label="Secondary"
                      value={colors.secondary}
                      onChange={(v) => updateColor('secondary', v)}
                    />
                    <ColorPicker
                      label="Accent"
                      value={colors.accent}
                      onChange={(v) => updateColor('accent', v)}
                    />
                    <ColorPicker
                      label="Background"
                      value={colors.background}
                      onChange={(v) => updateColor('background', v)}
                    />
                    <ColorPicker
                      label="Foreground"
                      value={colors.foreground}
                      onChange={(v) => updateColor('foreground', v)}
                    />
                    <ColorPicker
                      label="Muted"
                      value={colors.muted}
                      onChange={(v) => updateColor('muted', v)}
                    />
                  </TabsContent>

                  <TabsContent value="dark" className="space-y-4">
                    <ColorPicker
                      label="Primary"
                      value={colors.darkPrimary}
                      onChange={(v) => updateColor('darkPrimary', v)}
                    />
                    <ColorPicker
                      label="Secondary"
                      value={colors.darkSecondary}
                      onChange={(v) => updateColor('darkSecondary', v)}
                    />
                    <ColorPicker
                      label="Accent"
                      value={colors.darkAccent}
                      onChange={(v) => updateColor('darkAccent', v)}
                    />
                    <ColorPicker
                      label="Background"
                      value={colors.darkBackground}
                      onChange={(v) => updateColor('darkBackground', v)}
                    />
                    <ColorPicker
                      label="Foreground"
                      value={colors.darkForeground}
                      onChange={(v) => updateColor('darkForeground', v)}
                    />
                    <ColorPicker
                      label="Muted"
                      value={colors.darkMuted}
                      onChange={(v) => updateColor('darkMuted', v)}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Effects */}
            <Card>
              <CardHeader className="bg-primary">
                <CardTitle>Effects</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label>Shadow Offset</Label>
                    <span className="text-sm text-muted-foreground">{colors.shadowOffset}px</span>
                  </div>
                  <Slider
                    value={[colors.shadowOffset]}
                    onValueChange={(values: number[]) => updateColor('shadowOffset', values[0])}
                    max={12}
                    min={0}
                    step={1}
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label>Border Width</Label>
                    <span className="text-sm text-muted-foreground">{colors.borderWidth}px</span>
                  </div>
                  <Slider
                    value={[colors.borderWidth]}
                    onValueChange={(values: number[]) => updateColor('borderWidth', values[0])}
                    max={6}
                    min={1}
                    step={1}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
