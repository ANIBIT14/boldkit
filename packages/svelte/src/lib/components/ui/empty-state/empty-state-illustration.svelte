<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';

	type Props = {
		maxWidth?: string | number;
		class?: string;
		children?: Snippet;
	};

	let { maxWidth = '200px', class: className, children }: Props = $props();
	const maxWidthStyle = $derived(typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth);
</script>

<div class={cn('flex items-center justify-center', className)} style="max-width: {maxWidthStyle}">
	{@render children?.()}
</div>
