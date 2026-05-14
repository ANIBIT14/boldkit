<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { getStepperContext, getStepperItemContext } from './context.js';

	type Props = { class?: string };
	let { class: className }: Props = $props();

	const stepperCtx = getStepperContext();
	const itemCtx = getStepperItemContext();

	const isCompleted = $derived(itemCtx.index < stepperCtx.activeStep());
</script>

<div
	class={cn(
		'transition-all duration-200',
		stepperCtx.orientation === 'horizontal'
			? 'h-[3px] flex-1 min-w-8 mx-2'
			: 'w-[3px] min-h-8 my-2 ml-5',
		isCompleted ? 'bg-foreground' : 'bg-foreground/30 border-dashed border-2 border-foreground/30 bg-transparent',
		className
	)}
></div>
