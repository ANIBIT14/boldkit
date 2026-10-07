<script lang="ts">
	import { Progress as ProgressPrimitive } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		max = 100,
		value,
		...restProps
	}: WithoutChildrenOrChild<ProgressPrimitive.RootProps> = $props();
</script>

<ProgressPrimitive.Root
	bind:ref
	data-slot="progress"
	class={cn("relative h-5 w-full overflow-hidden border-3 border-foreground bg-muted shadow-[4px_4px_0px_hsl(var(--shadow-color))]", className)}
	{value}
	{max}
	{...restProps}
>
	<div
		data-slot="progress-indicator"
		class="bg-primary size-full flex-1 transition-all"
		style="transform: translateX(-{100 - (100 * (value ?? 0)) / (max ?? 1)}%)"
	></div>
</ProgressPrimitive.Root>
