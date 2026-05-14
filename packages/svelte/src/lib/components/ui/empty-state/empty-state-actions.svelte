<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';

	type Props = { class?: string; children?: Snippet };
	let { class: className, children }: Props = $props();
</script>

<div class={cn('mt-4 flex flex-wrap gap-2 justify-center', className)}>
	{@render children?.()}
</div>
