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
