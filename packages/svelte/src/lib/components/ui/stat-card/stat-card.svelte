<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { Card, CardContent } from '$lib/components/ui/card/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import TrendingDownIcon from '@lucide/svelte/icons/trending-down';
	import MinusIcon from '@lucide/svelte/icons/minus';

	type ColorScheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'destructive';
	type Variant = 'default' | 'compact' | 'large';
	type Trend = 'up' | 'down' | 'neutral';

	type Props = {
		title: string;
		value: string | number;
		change?: string;
		trend?: Trend;
		progress?: { value: number; label?: string };
		comparison?: string;
		variant?: Variant;
		colorScheme?: ColorScheme;
		class?: string;
		icon?: Snippet;
	};

	let {
		title,
		value,
		change,
		trend = 'neutral',
		progress,
		comparison = 'vs last month',
		variant = 'default',
		colorScheme = 'primary',
		class: className,
		icon,
	}: Props = $props();

	const TrendIcon = $derived(trend === 'up' ? TrendingUpIcon : trend === 'down' ? TrendingDownIcon : MinusIcon);
	const trendColor = $derived(
		trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
	);

	const colorClasses: Record<ColorScheme, string> = {
		primary: '[&_.stat-icon]:bg-primary [&_.stat-bg]:bg-primary',
		secondary: '[&_.stat-icon]:bg-secondary [&_.stat-bg]:bg-secondary',
		accent: '[&_.stat-icon]:bg-accent [&_.stat-bg]:bg-accent',
		success: '[&_.stat-icon]:bg-success [&_.stat-bg]:bg-success',
		warning: '[&_.stat-icon]:bg-warning [&_.stat-bg]:bg-warning',
		info: '[&_.stat-icon]:bg-info [&_.stat-bg]:bg-info',
		destructive: '[&_.stat-icon]:bg-destructive [&_.stat-bg]:bg-destructive',
	};

	const variantClasses: Record<Variant, string> = {
		default: '',
		compact: '[&_.stat-content]:p-4',
		large: 'md:col-span-2',
	};
</script>

<Card class={cn('relative overflow-hidden', variantClasses[variant], colorClasses[colorScheme], className)}>
	<div class="stat-bg absolute top-0 right-0 w-24 h-24 opacity-20 -translate-y-8 translate-x-8 rotate-12"></div>
	<CardContent class="stat-content p-6">
		<div class="flex items-start justify-between">
			<div>
				<p class="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-1">{title}</p>
				<p class="text-3xl font-black">{value}</p>
				{#if change}
					<div class={cn('flex items-center gap-1 mt-2', trendColor)}>
						<TrendIcon class="h-4 w-4" />
						<span class="text-sm font-bold">{change}</span>
						<span class="text-sm text-muted-foreground">{comparison}</span>
					</div>
				{/if}
			</div>
			{#if icon}
				<div class="stat-icon w-12 h-12 border-3 border-foreground flex items-center justify-center shadow-[3px_3px_0px_hsl(var(--shadow-color))] text-foreground">
					{@render icon()}
				</div>
			{/if}
		</div>
		{#if progress}
			<div class="mt-4 pt-4 border-t-2 border-foreground/10">
				<div class="flex items-center justify-between text-sm mb-2">
					<span class="text-muted-foreground">{progress.label ?? 'Progress'}</span>
					<span class="font-bold">{progress.value}%</span>
				</div>
				<Progress value={progress.value} class="h-3" />
			</div>
		{/if}
	</CardContent>
</Card>
