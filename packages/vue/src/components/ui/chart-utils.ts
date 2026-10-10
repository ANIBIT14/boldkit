import { computed, onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import type { Component } from 'vue'

// Neubrutalism color palettes for charts
export const CHART_PALETTES = {
  bold: [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))',
    'hsl(var(--success))',
    'hsl(var(--warning))',
    'hsl(var(--info))',
  ],
  vibrant: [
    'hsl(0 84% 60%)',      // Coral red
    'hsl(174 62% 50%)',    // Teal
    'hsl(49 100% 60%)',    // Yellow
    'hsl(280 65% 60%)',    // Purple
    'hsl(145 63% 49%)',    // Green
    'hsl(212 100% 60%)',   // Blue
  ],
  pastel: [
    'hsl(0 84% 75%)',      // Light coral
    'hsl(174 62% 70%)',    // Light teal
    'hsl(49 100% 75%)',    // Light yellow
    'hsl(280 65% 75%)',    // Light purple
    'hsl(145 63% 70%)',    // Light green
    'hsl(212 100% 75%)',   // Light blue
  ],
  monochrome: [
    'hsl(var(--foreground))',
    'hsl(var(--foreground) / 0.8)',
    'hsl(var(--foreground) / 0.6)',
    'hsl(var(--foreground) / 0.4)',
    'hsl(var(--foreground) / 0.2)',
    'hsl(var(--foreground) / 0.1)',
  ],
} as const

export type ChartPalette = keyof typeof CHART_PALETTES

// Helper to get colors from a palette
export function getChartColor(palette: ChartPalette, index: number): string {
  const colors = CHART_PALETTES[palette]
  return colors[index % colors.length]
}

// Chart config type
export type ChartConfig = {
  [k in string]: {
    label?: string
    icon?: Component
    color?: string
  }
}

// Generate ChartConfig from palette
export function createChartConfig(
  keys: string[],
  labels: string[],
  palette: ChartPalette = 'bold'
): ChartConfig {
  const config: ChartConfig = {}
  keys.forEach((key, index) => {
    config[key] = {
      label: labels[index] || key,
      color: getChartColor(palette, index),
    }
  })
  return config
}

// Neubrutalism ECharts theme
export const neubrutalismTheme = {
  color: CHART_PALETTES.bold,
  backgroundColor: 'transparent',
  textStyle: {
    fontFamily: 'inherit',
    fontWeight: 'bold',
  },
  title: {
    textStyle: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  },
  legend: {
    textStyle: {
      fontWeight: 'bold',
      fontSize: 12,
    },
  },
  tooltip: {
    backgroundColor: 'hsl(var(--background))',
    borderColor: 'hsl(var(--foreground))',
    borderWidth: 3,
    textStyle: {
      fontWeight: 'bold',
      color: 'hsl(var(--foreground))',
    },
    extraCssText: 'box-shadow: 4px 4px 0px hsl(var(--shadow-color));',
  },
  xAxis: {
    axisLine: {
      lineStyle: {
        color: 'hsl(var(--foreground))',
        width: 3,
      },
    },
    axisTick: {
      lineStyle: {
        color: 'hsl(var(--foreground))',
        width: 2,
      },
    },
    axisLabel: {
      fontWeight: 'bold',
      color: 'hsl(var(--foreground))',
    },
    splitLine: {
      lineStyle: {
        color: 'hsl(var(--muted-foreground) / 0.3)',
      },
    },
  },
  yAxis: {
    axisLine: {
      lineStyle: {
        color: 'hsl(var(--foreground))',
        width: 3,
      },
    },
    axisTick: {
      lineStyle: {
        color: 'hsl(var(--foreground))',
        width: 2,
      },
    },
    axisLabel: {
      fontWeight: 'bold',
      color: 'hsl(var(--foreground))',
    },
    splitLine: {
      lineStyle: {
        color: 'hsl(var(--muted-foreground) / 0.3)',
      },
    },
  },
  series: {
    bar: {
      itemStyle: {
        borderColor: 'hsl(var(--foreground))',
        borderWidth: 3,
      },
    },
    line: {
      lineStyle: {
        width: 3,
      },
      itemStyle: {
        borderColor: 'hsl(var(--foreground))',
        borderWidth: 2,
      },
    },
    pie: {
      itemStyle: {
        borderColor: 'hsl(var(--foreground))',
        borderWidth: 3,
      },
    },
  },
}

/**
 * Min/max in a single pass.
 *
 * `Math.min(...values)` passes every element as a separate function argument
 * and throws `RangeError: Maximum call stack size exceeded` somewhere north of
 * ~100k points — which is exactly the size heatmaps and sparklines get fed.
 * The React charts already avoid the spread for this reason.
 */
export function extent(values: readonly number[]): { min: number; max: number } {
  if (values.length === 0) return { min: 0, max: 0 }
  let min = values[0]
  let max = values[0]
  for (const v of values) {
    if (v < min) min = v
    if (v > max) max = v
  }
  return { min, max }
}

// Matches `var(--name)` and `var(--name, fallback)`. Nested var() inside a
// fallback is not supported — BoldKit's tokens are flat HSL triplets.
const CSS_VAR_PATTERN = /var\(\s*(--[\w-]+)\s*(?:,\s*([^)]*))?\)/g

/**
 * Replace every `var(--token)` in a chart option/theme with its computed value.
 *
 * ECharts renders to a **canvas**, and `ctx.fillStyle = 'hsl(var(--primary))'`
 * is silently ignored — canvas has no CSS cascade, so the assignment is a no-op
 * and the previous colour stays. Without this pass the entire neubrutalism
 * theme and every palette colour are inert. Resolving against the chart's own
 * container also means the values follow light/dark and any scoped theme.
 *
 * Returns `value` untouched when there's no element to measure against (SSR).
 */
export function resolveCssVars<T>(value: T, el: Element | null): T {
  if (typeof window === 'undefined' || typeof document === 'undefined') return value
  // Fall back to :root so the very first render — before the container ref is
  // attached — already paints the right colours instead of flashing defaults.
  const scope = el ?? document.documentElement
  const root = document.documentElement
  if (!scope) return value
  const scopeStyles = getComputedStyle(scope)
  const rootStyles = scope === root ? scopeStyles : getComputedStyle(root)
  const cache = new Map<string, string>()
  const lookup = (name: string, fallback?: string) => {
    if (!cache.has(name)) {
      // Scope first (supports a locally themed container), then :root — some
      // environments don't inherit custom properties into getComputedStyle.
      cache.set(name, scopeStyles.getPropertyValue(name).trim() || rootStyles.getPropertyValue(name).trim())
    }
    return cache.get(name) || fallback?.trim() || ''
  }
  const walk = (v: unknown): unknown => {
    if (typeof v === 'string') {
      return v.includes('var(') ? v.replace(CSS_VAR_PATTERN, (_m, n: string, f?: string) => lookup(n, f)) : v
    }
    if (Array.isArray(v)) return v.map(walk)
    // Functions (formatters) and class instances pass through untouched.
    if (v && typeof v === 'object' && Object.getPrototypeOf(v) === Object.prototype) {
      const out: Record<string, unknown> = {}
      for (const [k, x] of Object.entries(v)) out[k] = walk(x)
      return out
    }
    return v
  }
  return walk(value) as T
}

/**
 * Reactive CSS-variable resolution for a chart.
 *
 * Most chart components render `<VChart>` directly rather than going through
 * `ChartContainer`, so they each need this — otherwise their palette and theme
 * reach the canvas as unresolvable `hsl(var(--token))` strings and are dropped
 * silently. Re-resolves when the document theme changes.
 *
 * @param el the chart's root element, resolved against for scoped themes.
 */
export function useResolvedChart(el: Ref<HTMLElement | null>) {
  const version = ref(0)
  let observer: MutationObserver | null = null

  onMounted(() => {
    version.value++
    observer = new MutationObserver(() => {
      version.value++
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style', 'data-theme'],
    })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  const theme = computed(() => {
    void version.value
    return resolveCssVars(neubrutalismTheme, el.value)
  })

  /** Call inside a `computed` so it re-runs on theme change. */
  const resolve = <T>(value: T): T => {
    void version.value
    return resolveCssVars(value, el.value)
  }

  return { theme, resolve }
}

/** Chart `height`: a number is pixels (as in React); a string is any CSS length. */
export function toCssSize(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value
}
