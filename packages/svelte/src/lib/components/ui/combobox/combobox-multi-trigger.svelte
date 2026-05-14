<script lang="ts">
	import { Popover as PopoverPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import XIcon from '@lucide/svelte/icons/x';

	type Props = PopoverPrimitive.TriggerProps & {
		placeholder?: string;
		values?: { value: string; label: string }[];
		open?: boolean;
		onRemove?: (value: string) => void;
	};

	let { class: className, placeholder = 'Select...', values = [], open, onRemove, ...restProps }: Props = $props();
</script>

<PopoverPrimitive.Trigger
	role="combobox"
	aria-expanded={open}
	class={cn(
		'flex min-h-11 w-full flex-wrap items-center gap-1.5 border-3 border-input bg-background px-3 py-2 text-sm font-medium',
		'shadow-[4px_4px_0px_hsl(var(--shadow-color))] focus:outline-none focus:translate-x-[4px] focus:translate-y-[4px] focus:shadow-none',
		'disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
		className
	)}
	{...restProps}
>
	<span class="flex flex-1 flex-wrap items-center gap-1">
		{#if values && values.length > 0}
			{#each values as item}
				<span class="flex items-center gap-1 border-2 border-foreground bg-accent px-1.5 py-0.5 text-xs font-bold">
					{item.label}
					<XIcon
						class="h-3 w-3 cursor-pointer hover:opacity-70"
						onclick={(e: MouseEvent) => { e.stopPropagation(); onRemove?.(item.value); }}
					/>
				</span>
			{/each}
		{:else}
			<span class="text-muted-foreground">{placeholder}</span>
		{/if}
	</span>
	<ChevronsUpDownIcon class="ml-auto h-4 w-4 shrink-0 opacity-50" />
</PopoverPrimitive.Trigger>
