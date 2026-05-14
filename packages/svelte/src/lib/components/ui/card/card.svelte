<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		interactive = false,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { interactive?: boolean } = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	class={cn(
		"bg-card text-card-foreground border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 flex flex-col",
		interactive && "cursor-pointer hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
