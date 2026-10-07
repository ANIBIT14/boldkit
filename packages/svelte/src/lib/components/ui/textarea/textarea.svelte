<script lang="ts">
	import { cn, type WithElementRef, type WithoutChildren } from "$lib/utils.js";
	import type { HTMLTextareaAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		"data-slot": dataSlot = "textarea",
		...restProps
	}: WithoutChildren<WithElementRef<HTMLTextareaAttributes>> = $props();
</script>

<textarea
	bind:this={ref}
	data-slot={dataSlot}
	class={cn(
		"flex min-h-[120px] w-full border-3 border-input bg-background px-4 py-2 text-base shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:translate-x-[4px] focus-visible:translate-y-[4px] focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-y",
		className
	)}
	bind:value
	{...restProps}
></textarea>
