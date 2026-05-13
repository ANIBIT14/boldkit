<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils.js'

  type Props = {
    class?: string
    direction?: 'left' | 'right'
    speed?: 'slow' | 'normal' | 'fast'
    pauseOnHover?: boolean
    bordered?: boolean
    repeat?: number
    children?: Snippet
  }

  let {
    class: className,
    direction = 'left',
    speed = 'normal',
    pauseOnHover = true,
    bordered = true,
    repeat = 4,
    children,
  }: Props = $props()

  const speedClasses: Record<string, string> = {
    slow: 'animate-marquee-slow',
    normal: 'animate-marquee',
    fast: 'animate-marquee-fast',
  }

  const animationClass = $derived(
    direction === 'right' ? 'animate-marquee-reverse' : speedClasses[speed]
  )
  const animationDirection = $derived(direction === 'right' ? 'reverse' : 'normal')
</script>

<div
  class={cn(
    'flex overflow-hidden',
    bordered && 'border-3 border-foreground bg-background',
    className
  )}
>
  {#each [0, 1] as _, groupIdx}
    <div
      class={cn(
        'marquee-content flex shrink-0 items-center gap-8 py-3',
        animationClass,
        pauseOnHover && 'hover:[animation-play-state:paused]'
      )}
      style="animation-direction: {animationDirection}"
      aria-hidden={groupIdx === 1 ? 'true' : undefined}
    >
      {#each { length: repeat } as _}
        {@render children?.()}
      {/each}
    </div>
  {/each}
</div>
