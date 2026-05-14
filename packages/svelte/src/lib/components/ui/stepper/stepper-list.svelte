<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { getStepperContext } from './context.js';

	type Props = { class?: string; children?: Snippet };
	let { class: className, children }: Props = $props();

	const ctx = getStepperContext();
</script>

<div
	role="tablist"
	class={cn(
		'flex items-center',
		ctx.orientation === 'horizontal' ? 'flex-row' : 'flex-col items-start',
		className
	)}
>
	{@render children?.()}
</div>
