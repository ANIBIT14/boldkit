import { cva, type VariantProps } from 'class-variance-authority'

export const chartContainerVariants = cva(
  'flex aspect-video justify-center text-xs overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border-3 border-foreground bg-background p-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        elevated: 'border-3 border-foreground bg-background p-4 shadow-[6px_6px_0px_hsl(var(--shadow-color))] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] hover:translate-x-[-2px] hover:translate-y-[-2px] transition',
        flat: 'border-3 border-foreground bg-background p-4',
        filled: 'border-3 border-foreground bg-muted/30 p-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        minimal: 'bg-background p-4',
        accent: 'border-3 border-foreground bg-accent/10 p-4 shadow-[4px_4px_0px_hsl(var(--accent))]',
        primary: 'border-3 border-foreground bg-primary/10 p-4 shadow-[4px_4px_0px_hsl(var(--primary))]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export type ChartContainerVariant = NonNullable<VariantProps<typeof chartContainerVariants>['variant']>

const CONTAINER_ONLY = new Set<string>(['elevated', 'flat', 'filled', 'minimal', 'accent', 'primary'])

/**
 * `variant` on Donut/Radar/RadialBar means chart *geometry*, as in React.
 * Before v3.6 the Vue charts used it for the container border/shadow instead,
 * which now lives on `containerVariant`. A container-only value passed to
 * `variant` is still honoured as the container style so old code keeps
 * rendering.
 */
export function splitChartVariant<G extends string>(
  variant: string | undefined,
  containerVariant: ChartContainerVariant | undefined,
  geometries: readonly G[],
): { geometry: G | 'default'; container: ChartContainerVariant } {
  if (variant && !geometries.includes(variant as G) && CONTAINER_ONLY.has(variant)) {
    return { geometry: 'default', container: containerVariant ?? (variant as ChartContainerVariant) }
  }
  // `filled` names both a Radar geometry and a container style. Before v3.6 it
  // meant the container, and Radar's `filled` geometry renders like `default`,
  // so honour both rather than silently dropping the old background.
  const legacyContainer = variant && CONTAINER_ONLY.has(variant) ? (variant as ChartContainerVariant) : 'default'
  return { geometry: (variant as G) ?? 'default', container: containerVariant ?? legacyContainer }
}
