<script lang="ts" module>
	export type Side = "top" | "right" | "bottom" | "left";
</script>

<script lang="ts">
	import { Dialog as SheetPrimitive } from "bits-ui";
	import type { Snippet } from "svelte";
	import SheetPortal from "./sheet-portal.svelte";
	import SheetOverlay from "./sheet-overlay.svelte";
	import XIcon from '@lucide/svelte/icons/x';
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		side = "right",
		showCloseButton = true,
		portalProps,
		children,
		...restProps
	}: WithoutChildrenOrChild<SheetPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof SheetPortal>>;
		side?: Side;
		showCloseButton?: boolean;
		children: Snippet;
	} = $props();
</script>

<SheetPortal {...portalProps}>
	<SheetOverlay />
	<SheetPrimitive.Content
		bind:ref
		data-slot="sheet-content"
		data-side={side}
		class={cn(
			"fixed z-50 flex flex-col gap-4 bg-background text-foreground border-3 border-foreground shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t-3 data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r-3 data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l-3 data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b-3 data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-[side=bottom]:data-[state=closed]:slide-out-to-bottom data-[side=left]:data-[state=closed]:slide-out-to-left data-[side=right]:data-[state=closed]:slide-out-to-right data-[side=top]:data-[state=closed]:slide-out-to-top data-[side=bottom]:data-[state=open]:slide-in-from-bottom data-[side=left]:data-[state=open]:slide-in-from-left data-[side=right]:data-[state=open]:slide-in-from-right data-[side=top]:data-[state=open]:slide-in-from-top p-6",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		{#if showCloseButton}
			<SheetPrimitive.Close
				data-slot="sheet-close"
				class="absolute right-4 top-4 border-2 border-foreground bg-background p-1 shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none"
			>
				<XIcon class="h-4 w-4 stroke-[3]" />
				<span class="sr-only">Close</span>
			</SheetPrimitive.Close>
		{/if}
	</SheetPrimitive.Content>
</SheetPortal>
