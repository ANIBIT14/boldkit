<script lang="ts">
	import { buildPath, getPoint, getAngle } from '$lib/math-curves.js';
	import type { ProgressCurveKey } from '$lib/math-curves.js';

	type Props = {
		value: number;
		curve?: ProgressCurveKey;
		size?: 'sm' | 'md' | 'lg';
		showValue?: boolean;
		trackColor?: string;
		fillColor?: string;
		strokeWidth?: number;
		ariaLabel?: string;
		class?: string;
	};

	let {
		value,
		curve = 'spiral',
		size = 'md',
		showValue = false,
		trackColor,
		fillColor,
		strokeWidth = 4,
		ariaLabel,
		class: className,
	}: Props = $props();

	const sizeMap = { sm: 48, md: 64, lg: 96 };
	const HEAD_SIZE = 8;

	const pixelSize = $derived(sizeMap[size]);
	const clamped = $derived(Math.min(100, Math.max(0, value ?? 0)));
	const trackPath = $derived(buildPath(curve));
	const headPoint = $derived(getPoint(curve, clamped / 100));
	const headAngle = $derived(getAngle(curve, clamped / 100));
</script>

<svg
	width={pixelSize}
	height={pixelSize}
	viewBox="0 0 100 100"
	role="progressbar"
	aria-valuenow={clamped}
	aria-valuemin={0}
	aria-valuemax={100}
	aria-label={ariaLabel ?? `${clamped}% progress`}
	class={className}
	style="overflow: visible; display: block"
>
	<path d={trackPath} stroke={trackColor ?? 'currentColor'} stroke-width={strokeWidth} stroke-opacity="0.2" stroke-linecap="square" stroke-linejoin="miter" fill="none" />
	<rect
		width={HEAD_SIZE}
		height={HEAD_SIZE}
		x={headPoint.x - HEAD_SIZE / 2}
		y={headPoint.y - HEAD_SIZE / 2}
		fill={fillColor ?? 'hsl(var(--primary))'}
		stroke="currentColor"
		stroke-width="1.5"
		transform="rotate({headAngle} {headPoint.x} {headPoint.y})"
		style="transition: transform 300ms ease"
	/>
	{#if showValue}
		<text x="50" y="50" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="700" fill="currentColor" letter-spacing="0.05em" style="user-select: none; font-family: inherit">
			{Math.round(clamped)}%
		</text>
	{/if}
</svg>
