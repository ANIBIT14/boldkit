<script lang="ts">
	import XIcon from '@lucide/svelte/icons/x';
	import { cn } from '$lib/utils.js';

	export type TourStep = {
		target?: string | HTMLElement;
		title: string;
		description: string;
		placement?: 'top' | 'right' | 'bottom' | 'left' | 'center';
		spotlightPadding?: number;
	};

	type Props = {
		steps?: TourStep[];
		open?: boolean;
		showSkipButton?: boolean;
		showProgress?: boolean;
		class?: string;
		onOpenChange?: (open: boolean) => void;
		onComplete?: () => void;
		onSkip?: () => void;
	};

	let {
		steps = [],
		open = $bindable(false),
		showSkipButton = true,
		showProgress = true,
		class: className,
		onOpenChange,
		onComplete,
		onSkip,
	}: Props = $props();

	let currentStep = $state(0);
	const step = $derived(steps[currentStep]);
	const isLast = $derived(currentStep === steps.length - 1);

	function close() {
		open = false;
		onOpenChange?.(false);
	}

	function next() {
		if (isLast) {
			onComplete?.();
			close();
			return;
		}
		currentStep += 1;
	}

	function prev() {
		currentStep = Math.max(0, currentStep - 1);
	}

	function skip() {
		onSkip?.();
		close();
	}
</script>

{#if open && step}
	<div class="fixed inset-0 z-[9998] bg-black/70" aria-hidden="true"></div>
	<div
		role="dialog"
		aria-modal="true"
		aria-labelledby="tour-title"
		class={cn(
			'fixed left-1/2 top-1/2 z-[9999] w-[min(420px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 border-3 border-foreground bg-background p-5 shadow-[8px_8px_0px_hsl(var(--shadow-color))]',
			className
		)}
	>
		<div class="mb-4 flex items-start justify-between gap-3">
			<div>
				{#if showProgress}
					<p class="mb-2 text-xs font-black uppercase tracking-wide text-muted-foreground">Step {currentStep + 1} of {steps.length}</p>
				{/if}
				<h2 id="tour-title" class="text-xl font-black uppercase tracking-tight">{step.title}</h2>
			</div>
			<button type="button" class="border-2 border-foreground p-1 hover:bg-muted" aria-label="Close tour" onclick={close}>
				<XIcon class="h-4 w-4" />
			</button>
		</div>
		<p class="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
		<div class="mt-5 flex items-center justify-between gap-3">
			<div class="flex gap-2">
				<button type="button" class="border-2 border-foreground px-3 py-1.5 text-xs font-black uppercase disabled:opacity-40" disabled={currentStep === 0} onclick={prev}>Back</button>
				{#if showSkipButton}
					<button type="button" class="border-2 border-foreground px-3 py-1.5 text-xs font-black uppercase" onclick={skip}>Skip</button>
				{/if}
			</div>
			<button type="button" class="border-2 border-foreground bg-primary px-3 py-1.5 text-xs font-black uppercase text-primary-foreground" onclick={next}>
				{isLast ? 'Finish' : 'Next'}
			</button>
		</div>
	</div>
{/if}
