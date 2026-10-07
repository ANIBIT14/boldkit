<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: TabsPrimitive.ListProps = $props();
</script>

<TabsPrimitive.List
	bind:ref
	data-slot="tabs-list"
	class={cn(
		"inline-flex h-12 items-center justify-center border-3 border-foreground bg-background p-1 text-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]",
		className
	)}
	{...restProps}
/>
