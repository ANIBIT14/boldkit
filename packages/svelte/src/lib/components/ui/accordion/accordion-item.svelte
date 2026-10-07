<script lang="ts">
	import { Accordion as AccordionPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AccordionPrimitive.ItemProps = $props();
</script>

<AccordionPrimitive.Item
	bind:ref
	data-slot="accordion-item"
	class={cn("border-3 border-foreground border-b-0 last:border-b-3 shadow-[4px_4px_0px_hsl(var(--shadow-color))]", className)}
	{...restProps}
/>
