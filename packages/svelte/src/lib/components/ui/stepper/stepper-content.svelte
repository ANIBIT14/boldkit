<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { getStepperContext } from './context.js';

	type Props = { index: number; class?: string; children?: Snippet };
	let { index, class: className, children }: Props = $props();

	const ctx = getStepperContext();
	const isActive = $derived(index === ctx.activeStep());
</script>

{#if isActive}
	<div role="tabpanel" class={cn('mt-4', className)}>
		{@render children?.()}
	</div>
{/if}
