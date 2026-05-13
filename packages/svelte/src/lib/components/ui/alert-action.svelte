<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  interface Props extends HTMLButtonAttributes {
    class?: string
    loading?: boolean
    children?: Snippet
  }

  let { class: className, loading = false, disabled = false, children, ...restProps }: Props = $props()
</script>

<button
  data-alert-action=""
  disabled={disabled || loading}
  class={cn(
    'mt-3 inline-flex items-center gap-1.5 max-w-full min-w-0',
    'rounded-none border border-current',
    'px-4 py-1 text-xs font-bold uppercase tracking-wide',
    'transition-all duration-150',
    'hover:opacity-100 hover:bg-current/10',
    'active:scale-95',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1',
    'disabled:cursor-not-allowed disabled:pointer-events-none',
    loading ? 'opacity-80' : disabled ? 'opacity-40' : 'opacity-80',
    className
  )}
  {...restProps}
>
  {#if loading}
    <span
      aria-hidden="true"
      class="h-3 w-3 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
    ></span>
  {/if}
  <span class="inline-flex items-center gap-1.5 whitespace-nowrap overflow-hidden">
    {@render children?.()}
  </span>
</button>
