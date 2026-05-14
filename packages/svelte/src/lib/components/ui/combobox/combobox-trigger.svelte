<script lang="ts">
	import { Popover as PopoverPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';

	type Props = PopoverPrimitive.TriggerProps & {
		placeholder?: string;
		value?: string;
		open?: boolean;
	};

	let { class: className, placeholder = 'Select...', value, open, ...restProps }: Props = $props();
</script>

<PopoverPrimitive.Trigger
	role="combobox"
	aria-expanded={open}
	class={cn(
		'flex h-11 w-full items-center justify-between border-3 border-input bg-background px-4 py-2 text-sm font-medium',
		'shadow-[4px_4px_0px_hsl(var(--shadow-color))] focus:outline-none focus:translate-x-[4px] focus:translate-y-[4px] focus:shadow-none',
		'disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
		className
	)}
	{...restProps}
>
	<span class={cn('truncate', !value && 'text-muted-foreground')}>
		{value || placeholder}
	</span>
	<ChevronsUpDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
</PopoverPrimitive.Trigger>
