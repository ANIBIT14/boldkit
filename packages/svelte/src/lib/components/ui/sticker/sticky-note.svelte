<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { stickyNoteVariants } from './sticker-variants.js';

	type Props = {
		class?: string;
		variant?: 'yellow' | 'pink' | 'blue' | 'green' | 'purple';
		size?: 'sm' | 'default' | 'lg';
		rotation?: 'none' | 'left' | 'right' | 'tilt-left' | 'tilt-right';
		pin?: boolean;
		folded?: boolean;
		children?: Snippet;
	};

	let {
		class: className,
		variant = 'yellow',
		size = 'default',
		rotation = 'left',
		pin = false,
		folded = true,
		children,
	}: Props = $props();
</script>

<div
	class={cn(
		stickyNoteVariants({ variant, size, rotation }),
		folded &&
			'before:absolute before:bottom-0 before:right-0 before:w-0 before:h-0 before:border-l-[20px] before:border-l-transparent before:border-b-[20px] before:border-b-foreground/20',
		className
	)}
>
	{#if pin}
		<div class="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-destructive border-2 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))]"></div>
	{/if}
	{@render children?.()}
</div>
