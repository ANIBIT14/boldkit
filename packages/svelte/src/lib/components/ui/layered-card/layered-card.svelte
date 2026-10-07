<script lang="ts">
  import type { Snippet } from 'svelte'
  import { type VariantProps } from 'class-variance-authority'
  import { cn } from '$lib/utils.js'
  import { layeredCardVariants } from './layered-card-variants.js'

  type LayeredCardVariants = VariantProps<typeof layeredCardVariants>

  type Props = {
    class?: string
    layers?: LayeredCardVariants['layers']
    offset?: LayeredCardVariants['offset']
    layerColor?: LayeredCardVariants['layerColor']
    interactive?: boolean
    children?: Snippet
  }

  let {
    class: className,
    layers = 'double',
    offset = 'default',
    layerColor = 'default',
    interactive = false,
    children,
  }: Props = $props()

  const offsetSizes: Record<string, number> = { sm: 6, default: 8, lg: 12 }
  const colorClasses: Record<string, string> = {
    default: 'bg-muted',
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    muted: 'bg-muted',
  }

  const offsetPx = $derived(offsetSizes[offset ?? 'default'])
  const layerCount = $derived(layers === 'single' ? 1 : layers === 'triple' ? 3 : 2)
  const layerBg = $derived(colorClasses[layerColor ?? 'default'])
</script>

<div class={cn(layeredCardVariants({ layers, offset, layerColor }), className)}>
  {#if layerCount >= 3}
    <div
      class={cn('absolute inset-0 border-3 border-foreground', layerBg, 'opacity-50')}
      style="transform: translate({offsetPx * 3}px, {offsetPx * 3}px)"
    ></div>
  {/if}
  {#if layerCount >= 2}
    <div
      class={cn('absolute inset-0 border-3 border-foreground', layerBg, 'opacity-70')}
      style="transform: translate({offsetPx * 2}px, {offsetPx * 2}px)"
    ></div>
  {/if}
  <div
    class={cn('absolute inset-0 border-3 border-foreground', layerBg)}
    style="transform: translate({offsetPx}px, {offsetPx}px)"
  ></div>
  <div
    class={cn(
      'relative border-3 border-foreground bg-card text-card-foreground',
      interactive && 'cursor-pointer transition-transform duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px]'
    )}
  >
    {@render children?.()}
  </div>
</div>
