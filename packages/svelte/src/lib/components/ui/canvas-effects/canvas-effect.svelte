<script lang="ts">
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils.js';

	type EffectKind =
		| 'aurora'
		| 'dot-blob'
		| 'dot-wave'
		| 'flow-field'
		| 'lissajous-grid'
		| 'matrix-rain'
		| 'metaballs'
		| 'mouse-ripple'
		| 'particle-web'
		| 'plasma';

	type Props = {
		effect?: EffectKind;
		speed?: number;
		opacity?: number;
		colors?: string[];
		palette?: string[];
		backgroundColor?: string;
		class?: string;
	};

	let {
		effect = 'aurora',
		speed = 1,
		opacity = 0.9,
		colors,
		palette,
		backgroundColor = '#070707',
		class: className,
	}: Props = $props();

	let canvas: HTMLCanvasElement;
	let pointer = $state({ x: 0.5, y: 0.5 });
	const resolvedColors = $derived(colors ?? palette ?? ['#ff5050', '#3cb9ff', '#ffc32d', '#aa4bff', '#37ff96']);

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const context = ctx;

		let frame = 0;
		let raf = 0;

		function resize() {
			const rect = canvas.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.max(1, Math.floor(rect.width * dpr));
			canvas.height = Math.max(1, Math.floor(rect.height * dpr));
			context.setTransform(dpr, 0, 0, dpr, 0, 0);
		}

		function color(i: number) {
			return resolvedColors[i % resolvedColors.length] ?? '#ffffff';
		}

		function draw() {
			const w = canvas.clientWidth;
			const h = canvas.clientHeight;
			const t = frame * 0.016 * speed;

			context.globalAlpha = 1;
			context.fillStyle = backgroundColor;
			context.fillRect(0, 0, w, h);
			context.globalAlpha = opacity;

			if (effect === 'matrix-rain') {
				context.font = '14px ui-monospace, SFMono-Regular, Menlo, monospace';
				for (let x = 0; x < w; x += 18) {
					const y = (t * 120 + x * 7) % (h + 80);
					context.fillStyle = color(x);
					context.fillText(String.fromCharCode(0x30a0 + ((x + frame) % 96)), x, y);
					context.fillStyle = color(x + 1);
					context.fillText(String.fromCharCode(0x30a0 + ((x + frame * 2) % 96)), x, y - 24);
				}
			} else if (effect === 'dot-wave' || effect === 'lissajous-grid') {
				for (let y = 20; y < h; y += 24) {
					for (let x = 20; x < w; x += 24) {
						const wave = Math.sin(x * 0.04 + t * 2) + Math.cos(y * 0.05 + t);
						const r = effect === 'dot-wave' ? 2.5 + wave * 1.5 : 2 + Math.abs(Math.sin(t + x * 0.03) * Math.cos(t + y * 0.03)) * 4;
						context.beginPath();
						context.fillStyle = color(Math.floor((x + y) / 24));
						context.arc(x, y + wave * 6, Math.max(1, r), 0, Math.PI * 2);
						context.fill();
					}
				}
			} else if (effect === 'flow-field' || effect === 'particle-web') {
				context.strokeStyle = color(1);
				context.lineWidth = 1;
				for (let i = 0; i < 80; i++) {
					const x = (Math.sin(i * 12.989 + t) * 0.5 + 0.5) * w;
					const y = (Math.cos(i * 78.233 + t * 0.7) * 0.5 + 0.5) * h;
					const x2 = x + Math.cos(t + i) * 34;
					const y2 = y + Math.sin(t * 1.2 + i) * 34;
					context.beginPath();
					context.moveTo(x, y);
					context.lineTo(x2, y2);
					context.stroke();
				}
			} else {
				for (let i = 0; i < 7; i++) {
					const cx = (Math.sin(t * (0.5 + i * 0.08) + i) * 0.34 + 0.5) * w;
					const cy = (Math.cos(t * (0.7 + i * 0.05) + i * 2) * 0.34 + 0.5) * h;
					const radius = effect === 'mouse-ripple'
						? 32 + Math.abs(Math.sin(t * 2 + i)) * 56
						: effect === 'plasma' || effect === 'aurora'
							? Math.max(w, h) * (0.22 + i * 0.035)
							: 42 + i * 12;
					const gradient = context.createRadialGradient(
						effect === 'mouse-ripple' ? pointer.x * w : cx,
						effect === 'mouse-ripple' ? pointer.y * h : cy,
						0,
						cx,
						cy,
						radius
					);
					gradient.addColorStop(0, color(i));
					gradient.addColorStop(1, 'transparent');
					context.fillStyle = gradient;
					context.fillRect(0, 0, w, h);
				}
			}

			frame += 1;
			raf = requestAnimationFrame(draw);
		}

		resize();
		draw();
		window.addEventListener('resize', resize);

		return () => {
			window.removeEventListener('resize', resize);
			cancelAnimationFrame(raf);
		};
	});
</script>

<canvas
	bind:this={canvas}
	class={cn('block h-full min-h-[240px] w-full bg-black', className)}
	onpointermove={(e) => {
		const rect = canvas.getBoundingClientRect();
		pointer = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
	}}
></canvas>
