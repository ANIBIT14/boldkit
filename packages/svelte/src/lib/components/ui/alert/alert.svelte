<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const alertVariants = tv({
		base: "relative w-full border-3 border-foreground p-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))] [&>svg~*:not([data-alert-action])]:pl-8 [&>svg~[data-alert-action]]:ml-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
		variants: {
			variant: {
				default: "bg-background text-foreground",
				destructive: "bg-destructive text-destructive-foreground [&>svg]:text-destructive-foreground",
				success: "bg-success text-success-foreground",
				warning: "bg-warning text-warning-foreground",
				info: "bg-info text-info-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type AlertVariant = VariantProps<typeof alertVariants>["variant"];
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: AlertVariant;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="alert"
	role="alert"
	class={cn(alertVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
