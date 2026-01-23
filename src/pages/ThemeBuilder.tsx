import { useState, useEffect } from 'react'
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
    primary: '0 84% 71%',
    secondary: '174 62% 56%',
    accent: '49 100% 71%',
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
    })
  }

  const generateCSS = () => {
    return `:root {
  --primary: ${colors.primary};
  --secondary: ${colors.secondary};
  --accent: ${colors.accent};
  --shadow-offset: ${colors.shadowOffset}px;
  --border-width: ${colors.borderWidth}px;
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
            <span className="text-3xl font-black">◼</span>
            <span className="text-xl font-black uppercase tracking-wider">BoldKit</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/docs">
              <Button variant="ghost">Docs</Button>
            </Link>
            <Link to="/components">
              <Button variant="ghost">Components</Button>
            </Link>
            <a href="https://github.com/boldkit/boldkit" target="_blank" rel="noopener noreferrer">
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
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label className="mb-2 block">Primary (HSL)</Label>
                  <Input
                    value={colors.primary}
                    onChange={(e) => setColors({ ...colors, primary: e.target.value })}
                    placeholder="0 84% 71%"
                  />
                  <div
                    className="mt-2 h-8 border-3 border-foreground"
                    style={{ backgroundColor: `hsl(${colors.primary})` }}
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Secondary (HSL)</Label>
                  <Input
                    value={colors.secondary}
                    onChange={(e) => setColors({ ...colors, secondary: e.target.value })}
                    placeholder="174 62% 56%"
                  />
                  <div
                    className="mt-2 h-8 border-3 border-foreground"
                    style={{ backgroundColor: `hsl(${colors.secondary})` }}
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Accent (HSL)</Label>
                  <Input
                    value={colors.accent}
                    onChange={(e) => setColors({ ...colors, accent: e.target.value })}
                    placeholder="49 100% 71%"
                  />
                  <div
                    className="mt-2 h-8 border-3 border-foreground"
                    style={{ backgroundColor: `hsl(${colors.accent})` }}
                  />
                </div>
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
                    onValueChange={([value]) => setColors({ ...colors, shadowOffset: value })}
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
                    onValueChange={([value]) => setColors({ ...colors, borderWidth: value })}
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
