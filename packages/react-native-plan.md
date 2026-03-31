# BoldKit React Native — v0.0.1 Implementation Plan

## Context

BoldKit has React (root) and Vue (`packages/vue/`) variants. This plan adds `packages/react-native/` — a first-class neubrutalism mobile UI library that maintains 1:1 visual fidelity with the web components. The branch `feat/boldkit-react-native` is already checked out.

---

## Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Styling | StyleSheet + JS theme object | NativeWind v4 has friction with RN 0.79 new arch; CSS vars / arbitrary Tailwind values don't map to RN shadows |
| Shadows | Dual-layer View (+ opt-in Skia) | `elevation` on Android = Gaussian blur (wrong); offset View sibling = pixel-perfect neubrutalism |
| Animations | Reanimated 3 | Spring/timing API replaces CSS transitions; shapes need `useSharedValue` |
| SVG shapes | react-native-svg | Direct port of web SVG paths; zero re-authoring |
| Skia | @shopify/react-native-skia (optional peer) | Spinner "brutal" variant; opt-in shadow layer |
| Audio | @software-mansion/react-native-audio-api (optional peer) | Click/toggle sounds on Button/Checkbox/Switch |
| Select | @gorhom/bottom-sheet v5 | Native bottom sheet, first-class Reanimated 3 integration |
| Build | tsup (cjs + esm + .d.ts) | Matches tooling pattern; `jsx: 'preserve'` for Metro |
| Tests (unit) | Jest + @testing-library/react-native | Mirrors existing test structure in `src/test/` |
| Tests (E2E) | Maestro | YAML flows; simpler than Detox; runs on iOS/Android simulators |
| Example app | Expo SDK 52 (dev client) | Faster setup, OTA updates, Expo Go for quick iteration, still supports all native modules via dev build |

---

## Directory Structure

```
packages/react-native/
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── tsup.config.ts
├── babel.config.js
├── jest.config.js
├── jest.setup.ts
├── src/
│   ├── index.ts
│   ├── theme/
│   │   ├── colors.ts          # HSL → hex for all CSS vars (light + dark)
│   │   ├── typography.ts      # Outfit font, sizes, weights
│   │   ├── spacing.ts         # Scale + borderWidth:3 + shadowOffset:4
│   │   ├── shadows.ts         # getBKShadow() + BKShadowWrapper component
│   │   ├── ThemeProvider.tsx  # Context + useTheme() hook
│   │   └── index.ts
│   ├── lib/
│   │   ├── tv.ts              # StyleSheet-based variant factory (CVA equivalent)
│   │   ├── audio.ts           # playClickSound(), playToggleSound() wrappers
│   │   └── skia.ts            # SkiaAvailable detection (try/require)
│   ├── components/
│   │   ├── Button/            # Pressable + Reanimated press animation + BKShadow
│   │   ├── Badge/             # View + Text, 8 variants
│   │   ├── Card/              # Card + CardHeader + CardTitle + CardContent + CardFooter
│   │   ├── Input/             # TextInput + label + error state + focus animation
│   │   ├── Checkbox/          # Pressable + SVG checkmark + sound
│   │   ├── Switch/            # Square thumb (not pill!) + spring animation + sound
│   │   ├── Progress/          # Animated fill bar, borderWidth:3
│   │   ├── Avatar/            # Image + AvatarFallback (initials)
│   │   ├── Alert/             # Alert + AlertTitle + AlertDescription, 4 variants
│   │   ├── Spinner/           # 5 variants: default/dots/bars/blocks/brutal(Skia)
│   │   └── Select/            # Trigger + @gorhom/bottom-sheet + FlatList items
│   └── shapes/
│       ├── types.ts           # ShapeProps, ShapeAnimation, ShapeSpeed
│       ├── useShapeAnimation.ts  # Reanimated hook replacing CSS class system
│       ├── TriangleShape.tsx
│       ├── DiamondBadge.tsx
│       ├── HexagonShape.tsx
│       ├── Star5Shape.tsx
│       ├── BurstShape.tsx
│       ├── BlobShape.tsx
│       ├── LightningShape.tsx
│       ├── SpeechBubble.tsx
│       ├── GearShape.tsx
│       ├── SealShape.tsx
│       └── index.ts
├── __mocks__/                 # Mocks for all native peer deps
│   ├── skia.ts
│   ├── audio-api.ts
│   ├── svg.ts
│   ├── bottom-sheet.ts
│   └── gesture-handler.ts
└── example/                   # Expo SDK 52 app for visual testing on simulators
    ├── package.json
    ├── app.json               # Expo config (name, slug, plugins for native modules)
    ├── expo-plugins/          # Custom Expo config plugins if needed
    ├── metro.config.js        # extends Expo metro; watchFolders: ['../src']
    ├── App.tsx
    ├── android/               # Expo prebuild output (gitignored until needed)
    ├── ios/                   # Expo prebuild output (gitignored until needed)
    └── src/screens/           # HomeScreen + 7 component screens
```

---

## Theme System

**`theme/colors.ts`** — converts every HSL var from `src/styles/globals.css` to hex:
```typescript
export const lightColors = {
  background: '#fafaf5', foreground: '#16161f',
  primary: '#f27878',    secondary: '#3dcfbb',
  accent: '#ffd966',     success: '#6ddc9e',
  warning: '#ffcc00',    info: '#66b3ff',
  destructive: '#f24242', shadowColor: '#16161f',
  // ... etc
}
export const darkColors = { /* inverted */ }
export type ColorTokens = typeof lightColors
```

**`theme/shadows.ts`** — cross-platform neubrutalism shadow:
- **iOS**: `shadowRadius:0, shadowOpacity:1, shadowOffset:{width:4,height:4}` (zero-blur)
- **Android**: `BKShadowWrapper` renders an absolutely-positioned sibling `View` offset 4px right+down, then the main component on top
- Optional `skiaEffect` prop swaps in Skia-rendered shadow for precise color control

**`lib/tv.ts`** — StyleSheet-based variant factory (CVA equivalent for RN):
```typescript
tv({ base: ViewStyle, variants: {...}, defaultVariants: {...} })(selected)
// → StyleSheet.flatten([base, ...selectedVariantStyles])
```

---

## Component Patterns

### Button (reference implementation for all components)
- `Pressable` + `useSharedValue` for press translate(4,4) animation
- On press: `translate(4px, 4px)` + hide shadow (mirroring `active:translate-x-[4px]` from web)
- Wrapped in `BKShadowWrapper` for offset shadow
- Variants: `default`(primary), `secondary`, `accent`, `outline`, `ghost`, `destructive`
- Optional `soundOnPress` → `playClickSound()` from `lib/audio.ts`

### Switch
- Square thumb (NOT pill/circle) — neubrutalism requires sharp corners
- Horizontal spring animation via Reanimated `withSpring`
- Track `borderWidth:3`, thumb fills with `primary` color when on

### Spinner — 5 variants
1. `default` — SVG arc with animated `strokeDashoffset` (Reanimated + react-native-svg)
2. `dots` — 3 square Views with staggered `withDelay` scale animation
3. `bars` — 3 rect Views with staggered height pulse
4. `blocks` — 4 squares rotating as group
5. `brutal` — Skia `Canvas`: rotating square + colored offset shadow; graceful fallback to `default` if Skia unavailable

### Select
- Trigger: `Pressable` styled as Input (height:44, border:3)
- Content: `@gorhom/bottom-sheet` with `FlatList` of `Pressable` items
- Checkmark on selected item via react-native-svg

---

## Shapes System

SVG paths copied verbatim from `src/components/ui/shapes.tsx` → wrapped in `react-native-svg` `<Path>`.

**`shapes/useShapeAnimation.ts`** — replaces CSS class system:
```typescript
// Returns Reanimated animatedStyle for: spin/pulse/float/wiggle/bounce/glitch × slow/normal/fast
useShapeAnimation(animation: ShapeAnimation, speed: ShapeSpeed) → animatedStyle
```

Each shape:
```typescript
const AnimatedSvg = Animated.createAnimatedComponent(Svg)

export const TriangleShape = ({ size=100, strokeWidth=3, filled=true, color, animation='none', speed='normal' }) => {
  const { colors } = useTheme()
  const animStyle = useShapeAnimation(animation, speed)
  return (
    <Animated.View style={[{width:size, height:size}, animStyle]}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Path d="M50 5 L95 90 L5 90 Z" fill={filled ? color ?? colors.accent : 'none'}
              stroke={colors.foreground} strokeWidth={strokeWidth} />
      </Svg>
    </Animated.View>
  )
}
```

---

## Audio Integration

**`lib/audio.ts`** — wraps `react-native-audio-api` AudioContext:
- `playClickSound()`: 50ms sine burst @ 800Hz (Button press)
- `playToggleSound(on: boolean)`: 80ms sweep, 600Hz=off / 900Hz=on (Checkbox/Switch)
- Both detect AudioContext availability with try/catch; fire-and-forget (no error propagation)

---

## Testing Infrastructure

### Jest (unit tests)
- `jest.config.js` uses `preset: 'react-native'`
- Mocks for all native peers: `react-native-reanimated/mock` (official) + custom mocks for Skia, audio-api, svg, bottom-sheet, gesture-handler
- `transformIgnorePatterns` includes react-native-svg and reanimated
- Coverage threshold: 70% branches, 80% functions/lines
- Tests per component match pattern in `src/test/button.test.tsx`: Rendering → Variants → States → Interactions describe blocks

### Maestro (E2E on simulators)
```
packages/react-native/.maestro/
├── flows/button.yaml
├── flows/checkbox.yaml
├── flows/switch.yaml
├── flows/input.yaml
├── flows/select.yaml
└── flows/progress.yaml
```

Runs against example app on iOS Simulator (macOS CI) and Android emulator.

### Example App (Expo SDK 52)
- Expo app at `example/` initialized via `npx create-expo-app`
- Uses **Expo dev client** (not Expo Go) so all native modules (Skia, audio-api, bottom-sheet) work
- Metro config extends Expo's and adds `watchFolders: [path.resolve(__dirname, '../src')]` for live library reload
- `app.json` plugins for: `react-native-reanimated`, `react-native-gesture-handler`, `expo-av` (or audio-api)
- `expo prebuild` generates `android/` and `ios/` native dirs; these are gitignored (regenerated on CI)
- 8 screens: Home, Button, Card, Forms (Input/Checkbox/Switch/Select), Feedback (Alert/Progress/Spinner), Avatar+Badge, Shapes
- Dark/light toggle in header via `BoldKitProvider`
- Run with `npx expo run:ios` / `npx expo run:android`

### GitHub Actions (`.github/workflows/test-rn.yml`)
```yaml
jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps: [checkout, node setup, npm ci, jest]

  e2e-ios:
    runs-on: macos-latest
    steps: [checkout, node setup, Xcode setup, expo prebuild,
            pod install, npx expo run:ios (simulator),
            boot iOS simulator, maestro flows]
```

---

## Build Configuration

**`tsup.config.ts`**:
```typescript
defineConfig({
  entry: { index: 'src/index.ts', 'theme/index': 'src/theme/index.ts' },
  format: ['cjs', 'esm'],
  dts: true,
  jsx: 'preserve',   // critical: Metro handles JSX transform
  external: ['react', 'react-native', 'react-native-reanimated', ...all peers],
  clean: true,
})
```

**`package.json`** name: `@boldkit/react-native`, version `0.0.1`, peerDeps for all RN-specific libs (Skia + audio marked optional).

---

## Implementation Order

| Phase | Tasks |
|---|---|
| **1 — Foundation** | package.json, tsconfig, tsup, theme (colors/typography/spacing/shadows), ThemeProvider, tv(), BKShadowWrapper, Jest setup |
| **2 — Core Components** | Button, Badge, Card, Input + tests |
| **3 — Controls** | Checkbox, Switch, Progress + tests |
| **4 — Feedback** | Alert, Avatar, Spinner (5 variants) + tests |
| **5 — Select** | Select with bottom-sheet + tests |
| **6 — Shapes** | types, useShapeAnimation, all 10 shapes |
| **7 — Audio** | lib/audio.ts, wire into Button/Checkbox/Switch |
| **8 — Skia** | SpinnerSkia variant, optional BKShadowWrapperSkia, skiaEffect prop |
| **9 — Example App** | Init bare RN app, 8 screens, nav, dark mode toggle |
| **10 — E2E & CI** | Maestro flows, GitHub Actions workflow |
| **11 — Build & Tag** | Verify tsup output, README, tag v0.0.1 |

---

## Critical Reference Files

- `src/styles/globals.css` — all HSL color values + shadow/border tokens to port to `theme/colors.ts`
- `src/components/ui/button.tsx` — canonical variant names, size tokens, animation names, press interaction model
- `src/components/ui/shapes.tsx` — all 10 SVG path strings to copy verbatim
- `src/components/ui/spinner.tsx` — 5 animation variant names to port
- `src/test/button.test.tsx` — test structure to mirror
- `packages/vue/package.json` — template for package metadata structure

---

## Verification

1. `npm run typecheck` in `packages/react-native/` passes with zero errors
2. `npm test` — all unit tests pass with ≥80% coverage
3. `npm run build` — tsup produces `dist/index.js`, `dist/index.esm.js`, `dist/index.d.ts`
4. Example app builds and launches on iOS Simulator: all 8 screens render, no crashes
5. Example app builds and launches on Android Emulator: shadows render correctly (no blur)
6. Maestro flows pass: 6 interaction flows complete without assertion failures
7. GitHub Actions CI passes on both `ubuntu-latest` (unit) and `macos-latest` (E2E)
