<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { stampVariants } from './sticker-variants.js';

	type Props = {
		class?: string;
		variant?: 'default' | 'secondary' | 'accent' | 'destructive' | 'outline';
		size?: 'sm' | 'default' | 'lg' | 'xl';
		rotation?: 'none' | 'slight' | 'medium' | 'heavy';
		doubleRing?: boolean;
		children?: Snippet;
	};

	let {
		class: className,
		variant = 'default',
		size = 'default',
		rotation = 'slight',
		doubleRing = false,
		children,
	}: Props = $props();
</script>

<div
	class={cn(
		stampVariants({ variant, size, rotation }),
		'shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
		doubleRing && 'ring-2 ring-foreground ring-offset-2 ring-offset-background',
		className
	)}
>
	<span class="text-center leading-tight">
		{@render children?.()}
	</span>
</div>
