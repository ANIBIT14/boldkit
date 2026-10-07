<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { setStepperContext } from './context.js';

	type Props = {
		activeStep?: number;
		orientation?: 'horizontal' | 'vertical';
		class?: string;
		children?: Snippet;
		onStepChange?: (step: number) => void;
	};

	let {
		activeStep = $bindable(0),
		orientation = 'horizontal',
		class: className,
		children,
		onStepChange,
	}: Props = $props();

	let internalStep = $state(0);
	const isControlled = $derived(activeStep !== undefined);
	const currentStep = $derived(isControlled ? activeStep : internalStep);

	// svelte-ignore state_referenced_locally
	setStepperContext({
		activeStep: () => currentStep,
		setActiveStep: (step: number) => {
			if (!isControlled) internalStep = step;
			activeStep = step;
			onStepChange?.(step);
		},
		get orientation() { return orientation; },
	});
</script>

<div class={cn('flex', orientation === 'horizontal' ? 'flex-row' : 'flex-col', className)}>
	{@render children?.()}
</div>
