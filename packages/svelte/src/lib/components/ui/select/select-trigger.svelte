<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn, type WithoutChild } from "$lib/utils.js";
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<SelectPrimitive.TriggerProps> = $props();
</script>

<SelectPrimitive.Trigger
	bind:ref
	data-slot="select-trigger"
	class={cn(
		"flex h-11 w-full items-center justify-between border-3 border-input bg-background px-4 py-2 text-sm font-medium shadow-[4px_4px_0px_hsl(var(--shadow-color))] placeholder:text-muted-foreground focus:outline-none focus:translate-x-[4px] focus:translate-y-[4px] focus:shadow-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-all duration-200",
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<ChevronDownIcon class="h-5 w-5 stroke-[3] shrink-0" />
</SelectPrimitive.Trigger>
