<script lang="ts">
	import { cn } from '$lib/utils.js';

	type ShapeAnimation = 'none' | 'spin' | 'pulse' | 'float' | 'wiggle' | 'bounce' | 'glitch';
	type ShapeSpeed = 'slow' | 'normal' | 'fast';

	type Props = {
		size?: number;
		strokeWidth?: number;
		filled?: boolean;
		color?: string;
		animation?: ShapeAnimation;
		speed?: ShapeSpeed;
		class?: string;
	};

	let {
		size = 100,
		strokeWidth = 3,
		filled = true,
		color,
		animation = 'none',
		speed = 'normal',
		class: className,
	}: Props = $props();

	const animationClass = $derived(animation === 'none' ? '' : `shape-animate-${animation}${speed !== 'normal' ? `-${speed}` : ''}`);
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 100 100"
	class={cn('text-primary', animationClass, className)}
	aria-hidden="true"
>
	<path
		d="M50 5 L61 36 L95 36 L68 56 L79 90 L50 70 L21 90 L32 56 L5 36 L39 36 Z"
		fill={filled ? (color ?? 'currentColor') : 'none'}
		stroke="hsl(var(--foreground))"
		stroke-width={strokeWidth}
	/>
</svg>
