<script lang="ts">
	import { cn } from '$lib/utils.js';
	import StarIcon from '@lucide/svelte/icons/star';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import CircleIcon from '@lucide/svelte/icons/circle';

	type RatingSize = 'sm' | 'md' | 'lg' | 'xl';
	type RatingIcon = 'star' | 'heart' | 'circle';

	type Props = {
		value?: number;
		defaultValue?: number;
		max?: number;
		precision?: 0.5 | 1;
		icon?: RatingIcon;
		size?: RatingSize;
		readOnly?: boolean;
		disabled?: boolean;
		class?: string;
		onchange?: (value: number) => void;
	};

	let {
		value = $bindable(undefined),
		defaultValue = 0,
		max = 5,
		precision = 1,
		icon = 'star',
		size = 'md',
		readOnly = false,
		disabled = false,
		class: className,
		onchange,
	}: Props = $props();

	const sizeClasses: Record<RatingSize, string> = {
		sm: '[&_svg]:h-4 [&_svg]:w-4',
		md: '[&_svg]:h-5 [&_svg]:w-5',
		lg: '[&_svg]:h-6 [&_svg]:w-6',
		xl: '[&_svg]:h-8 [&_svg]:w-8',
	};

	const iconComponents: Record<RatingIcon, typeof StarIcon> = {
		star: StarIcon,
		heart: HeartIcon,
		circle: CircleIcon,
	};

	let internalValue = $state(defaultValue);
	let hoverValue = $state<number | null>(null);

	const isControlled = $derived(value !== undefined);
	const currentValue = $derived(isControlled ? value! : internalValue);
	const displayValue = $derived(hoverValue ?? currentValue);
	const IconComponent = $derived(iconComponents[icon]);

	function handleClick(index: number, isHalf: boolean) {
		if (readOnly || disabled) return;
		const newValue = isHalf && precision === 0.5 ? index + 0.5 : index + 1;
		if (!isControlled) internalValue = newValue;
		value = newValue;
		onchange?.(newValue);
	}

	function handleMouseMove(e: MouseEvent, index: number) {
		if (readOnly || disabled) return;
		const button = (e.target as Element)?.closest('button') as HTMLButtonElement | null;
		if (!button) return;
		const rect = button.getBoundingClientRect();
		const isHalf = e.clientX - rect.left < rect.width / 2;
		hoverValue = isHalf && precision === 0.5 ? index + 0.5 : index + 1;
	}

	function handleMouseLeave() {
		if (readOnly || disabled) return;
		hoverValue = null;
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (readOnly || disabled) return;
		let newValue = currentValue;
		switch (e.key) {
			case 'ArrowRight':
			case 'ArrowUp':
				e.preventDefault();
				newValue = Math.min(currentValue + precision, max);
				break;
			case 'ArrowLeft':
			case 'ArrowDown':
				e.preventDefault();
				newValue = Math.max(currentValue - precision, 0);
				break;
			case 'Home':
				e.preventDefault();
				newValue = 0;
				break;
			case 'End':
				e.preventDefault();
				newValue = max;
				break;
			default:
				return;
		}
		if (!isControlled) internalValue = newValue;
		value = newValue;
		onchange?.(newValue);
	}

	function handleIconClick(e: MouseEvent, index: number) {
		const button = (e.target as Element)?.closest('button') as HTMLButtonElement | null;
		if (!button) return;
		const rect = button.getBoundingClientRect();
		const isHalf = e.clientX - rect.left < rect.width / 2;
		handleClick(index, isHalf);
	}

	function getFillState(index: number) {
		const fillValue = displayValue - index;
		return { isFilled: fillValue >= 1, isHalfFilled: fillValue > 0 && fillValue < 1 };
	}
</script>

<div
	role="radiogroup"
	aria-label="Rating: {currentValue} out of {max}"
	tabindex={readOnly || disabled ? -1 : 0}
	class={cn(
		'flex items-center gap-0.5',
		sizeClasses[size],
		disabled && 'opacity-50 pointer-events-none',
		!readOnly && !disabled && 'cursor-pointer',
		className
	)}
	onkeydown={handleKeyDown}
	onmouseleave={handleMouseLeave}
>
	{#each { length: max } as _, i}
		{@const { isFilled, isHalfFilled } = getFillState(i)}
		<button
			type="button"
			role="radio"
			aria-checked={i < currentValue}
			tabindex={-1}
			disabled={disabled || readOnly}
			class={cn(
				'relative transition-transform duration-150 focus:outline-none',
				!readOnly && !disabled && 'hover:scale-110'
			)}
			onclick={(e) => handleIconClick(e, i)}
			onmousemove={(e) => handleMouseMove(e, i)}
		>
			<IconComponent class="stroke-foreground stroke-2 fill-muted transition-colors duration-150" />
			{#if isFilled || isHalfFilled}
				<IconComponent
					class="absolute inset-0 stroke-foreground stroke-2 fill-primary transition-colors duration-150"
					style={isHalfFilled ? 'clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%)' : undefined}
				/>
			{/if}
		</button>
	{/each}
</div>
