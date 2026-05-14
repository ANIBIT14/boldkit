<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount, onDestroy } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { buildPath, getPoint, getAngle, getDetailScale, getCurvePulseDuration } from '$lib/math-curves.js';
	import type { BackgroundCurveKey } from '$lib/math-curves.js';

	type Props = {
		curve?: BackgroundCurveKey;
		speed?: 'slow' | 'normal' | 'fast';
		opacity?: number;
		trackColor?: string;
		headColor?: string;
		strokeWidth?: number;
		class?: string;
		children?: Snippet;
	};

	let {
		curve = 'rose',
		speed = 'slow',
		opacity = 0.15,
		trackColor,
		headColor,
		strokeWidth = 2,
		class: className,
		children,
	}: Props = $props();

	const speedMap = { slow: 9000, normal: 5500, fast: 3000 };
	const HEAD_SIZE = 8;

	let svgPath = $state<SVGPathElement | null>(null);
	let svgHead = $state<SVGRectElement | null>(null);
	let rafId = 0;
	let startTime = 0;

	function startLoop() {
		cancelAnimationFrame(rafId);
		startTime = performance.now();
		function frame(now: number) {
			const elapsed = now - startTime;
			const duration = speedMap[speed];
			const progress = (elapsed % duration) / duration;
			const detailScale = getDetailScale(elapsed, getCurvePulseDuration(curve));
			if (svgPath) svgPath.setAttribute('d', buildPath(curve, detailScale));
			if (svgHead) {
				const { x, y } = getPoint(curve, progress, detailScale);
				const angle = getAngle(curve, progress, detailScale);
				svgHead.setAttribute('x', String(x - HEAD_SIZE / 2));
				svgHead.setAttribute('y', String(y - HEAD_SIZE / 2));
				svgHead.setAttribute('transform', `rotate(${angle} ${x} ${y})`);
			}
			rafId = requestAnimationFrame(frame);
		}
		rafId = requestAnimationFrame(frame);
	}

	onMount(() => { startLoop(); });
	onDestroy(() => { cancelAnimationFrame(rafId); });
	$effect(() => { curve; speed; startLoop(); });
</script>

<div class={cn('relative', className)}>
	<svg
		aria-hidden="true"
		class="absolute inset-0 w-full h-full pointer-events-none"
		style="z-index: 0"
		viewBox="0 0 100 100"
		preserveAspectRatio="xMidYMid slice"
		{opacity}
	>
		<path bind:this={svgPath} stroke={trackColor ?? 'currentColor'} stroke-width={strokeWidth} stroke-linecap="square" stroke-linejoin="miter" stroke-opacity="0.15" fill="none" />
		<rect bind:this={svgHead} width={HEAD_SIZE} height={HEAD_SIZE} fill={headColor ?? 'hsl(var(--primary))'} stroke="currentColor" stroke-width="1.5" x="0" y="0" />
	</svg>
	<div class="relative" style="z-index: 10">
		{@render children?.()}
	</div>
</div>
