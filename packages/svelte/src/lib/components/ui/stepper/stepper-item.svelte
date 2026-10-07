<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { getStepperContext, setStepperItemContext } from './context.js';

	type Props = {
		index: number;
		class?: string;
		children?: Snippet;
	};

	let { index, class: className, children }: Props = $props();

	const ctx = getStepperContext();
	// svelte-ignore state_referenced_locally
	setStepperItemContext({ get index() { return index; } });
</script>

<div
	class={cn(
		'flex items-center',
		ctx.orientation === 'horizontal' ? 'flex-row' : 'flex-col',
		className
	)}
>
	{@render children?.()}
</div>
