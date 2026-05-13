<script lang="ts">
  // In bits-ui v1, the Select trigger displays the selected value automatically.
  // This component is a passthrough placeholder for API parity with shadcn-svelte patterns.
  import type { Snippet } from 'svelte'

  interface Props {
    placeholder?: string
    children?: Snippet
  }

  let { placeholder, children }: Props = $props()
</script>

{#if children}
  {@render children()}
{:else if placeholder}
  <span class="text-muted-foreground">{placeholder}</span>
{/if}
