<script lang="ts">
	import { getEmblaContext } from './context.js';
	import { cn } from '$lib/utils.js';

	let { class: className }: { class?: string } = $props();

	const emblaCtx = getEmblaContext('<Carousel.Dots/>');
</script>

{#if emblaCtx.scrollSnaps.length > 1}
	<div class={cn('flex items-center justify-center gap-2 mt-4', className)}>
		{#each emblaCtx.scrollSnaps as _, index}
			<button
				type="button"
				class={cn(
					'h-3 w-3 border-2 border-foreground transition-all duration-200',
					index === emblaCtx.selectedIndex
						? 'bg-primary scale-110 shadow-[2px_2px_0px_hsl(var(--shadow-color))]'
						: 'bg-muted hover:bg-muted/80'
				)}
				aria-label="Go to slide {index + 1}"
				onclick={() => emblaCtx.scrollTo(index)}
			></button>
		{/each}
	</div>
{/if}
