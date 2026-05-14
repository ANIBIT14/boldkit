<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';
	import CheckIcon from '@lucide/svelte/icons/check';
	import { getStepperContext, getStepperItemContext } from './context.js';

	type StepState = 'completed' | 'active' | 'upcoming';
	type Props = {
		size?: 'sm' | 'md' | 'lg';
		showStepNumber?: boolean;
		class?: string;
		children?: Snippet;
	};

	let { size = 'md', showStepNumber = true, class: className, children }: Props = $props();

	const stepperCtx = getStepperContext();
	const itemCtx = getStepperItemContext();

	const state = $derived.by<StepState>(() => {
		const active = stepperCtx.activeStep();
		if (itemCtx.index < active) return 'completed';
		if (itemCtx.index === active) return 'active';
		return 'upcoming';
	});

	const stateClasses: Record<StepState, string> = {
		completed: 'bg-success text-success-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
		active: 'bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] scale-110',
		upcoming: 'bg-muted text-muted-foreground',
	};

	const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
		sm: 'h-8 w-8 text-sm',
		md: 'h-10 w-10',
		lg: 'h-12 w-12 text-lg',
	};
</script>

<button
	type="button"
	role="tab"
	aria-selected={state === 'active'}
	class={cn(
		'flex items-center justify-center border-3 border-foreground font-bold transition-all duration-200',
		stateClasses[state],
		sizeClasses[size],
		className
	)}
	onclick={() => stepperCtx.setActiveStep(itemCtx.index)}
>
	{#if state === 'completed'}
		<CheckIcon class="h-5 w-5" />
	{:else if showStepNumber}
		{itemCtx.index + 1}
	{:else}
		{@render children?.()}
	{/if}
</button>
