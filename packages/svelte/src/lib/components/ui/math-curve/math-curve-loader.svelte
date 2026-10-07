<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { buildPath, getPoint, getAngle, getDetailScale, getCurvePulseDuration } from '$lib/math-curves.js';
	import type { LoaderCurveKey } from '$lib/math-curves.js';

	type Props = {
		curve?: LoaderCurveKey;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		speed?: 'slow' | 'normal' | 'fast';
		trackColor?: string;
		headColor?: string;
		strokeWidth?: number;
		headSize?: number;
		ariaLabel?: string;
		class?: string;
	};

	let {
		curve = 'rose',
		size = 'md',
		speed = 'normal',
		trackColor,
		headColor,
		strokeWidth = 4,
		headSize = 8,
		ariaLabel = 'Loading',
		class: className,
	}: Props = $props();

	const sizeMap = { xs: 24, sm: 32, md: 48, lg: 64, xl: 96 };
	const speedMap = { slow: 9000, normal: 5500, fast: 3000 };

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
				const half = headSize / 2;
				svgHead.setAttribute('x', String(x - half));
				svgHead.setAttribute('y', String(y - half));
				svgHead.setAttribute('transform', `rotate(${angle} ${x} ${y})`);
			}
			rafId = requestAnimationFrame(frame);
		}
		rafId = requestAnimationFrame(frame);
	}

	onMount(() => { startLoop(); });
	onDestroy(() => { cancelAnimationFrame(rafId); });

	$effect(() => { curve; speed; startLoop(); });

	const pixelSize = $derived(sizeMap[size]);
</script>

<svg
	width={pixelSize}
	height={pixelSize}
	viewBox="0 0 100 100"
	role="status"
	aria-label={ariaLabel}
	class={className}
	style="overflow: visible; display: block"
>
	<path bind:this={svgPath} stroke={trackColor ?? 'currentColor'} stroke-width={strokeWidth} stroke-opacity="0.2" stroke-linecap="square" stroke-linejoin="miter" fill="none" />
	<rect bind:this={svgHead} width={headSize} height={headSize} fill={headColor ?? 'hsl(var(--primary))'} stroke="currentColor" stroke-width="1.5" x="0" y="0" />
</svg>
