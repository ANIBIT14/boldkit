<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLThAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLThAttributes> = $props();
</script>

<th bind:this={ref} data-slot="table-head" class={cn("h-12 px-4 text-left align-middle font-bold uppercase tracking-wide text-xs border-b-3 border-foreground bg-muted [&:has([role=checkbox])]:pr-0", className)} {...restProps}>
	{@render children?.()}
</th>
