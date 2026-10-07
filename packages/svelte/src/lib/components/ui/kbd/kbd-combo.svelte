<script lang="ts">
	import { cn } from '$lib/utils.js';

	type Props = {
		keys: string[];
		separator?: string;
		variant?: 'default' | 'outline' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	};

	let {
		keys,
		separator = '+',
		variant = 'default',
		size = 'md',
		class: className,
	}: Props = $props();

	const variantClasses = {
		default: 'bg-muted shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
		outline: 'bg-background',
		ghost: 'bg-transparent border-transparent text-muted-foreground',
	};

	const sizeClasses = {
		sm: 'min-w-5 h-5 px-1 text-[10px]',
		md: 'min-w-6 h-6 px-1.5 text-xs',
		lg: 'min-w-8 h-8 px-2 text-sm',
	};
</script>

<div class={cn('inline-flex items-center gap-1', className)}>
	{#each keys as key, i}
		{#if i > 0}
			<span class="text-muted-foreground text-xs font-bold">{separator}</span>
		{/if}
		<kbd class={cn(
			'inline-flex items-center justify-center font-mono font-bold uppercase border-3 border-foreground',
			variantClasses[variant],
			sizeClasses[size]
		)}>{key}</kbd>
	{/each}
</div>
