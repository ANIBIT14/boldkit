<script lang="ts">
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import FileIcon from '@lucide/svelte/icons/file';
	import FolderIcon from '@lucide/svelte/icons/folder';
	import { cn } from '$lib/utils.js';

	export type TreeNode = {
		id: string;
		label: string;
		children?: TreeNode[];
		disabled?: boolean;
	};

	type Props = {
		data?: TreeNode[];
		defaultExpandedIds?: string[];
		defaultSelectedIds?: string[];
		selectionMode?: 'none' | 'single' | 'multiple';
		showIcons?: boolean;
		class?: string;
		onExpandedChange?: (ids: string[]) => void;
		onSelectedChange?: (ids: string[]) => void;
	};

	let {
		data = [],
		defaultExpandedIds = [],
		defaultSelectedIds = [],
		selectionMode = 'none',
		showIcons = true,
		class: className,
		onExpandedChange,
		onSelectedChange,
	}: Props = $props();

	let expandedIds = $state<Set<string> | undefined>(undefined);
	let selectedIds = $state<Set<string> | undefined>(undefined);
	const currentExpandedIds = $derived(expandedIds ?? new Set(defaultExpandedIds));
	const currentSelectedIds = $derived(selectedIds ?? new Set(defaultSelectedIds));

	function toggleExpanded(id: string) {
		expandedIds = new Set(currentExpandedIds);
		expandedIds.has(id) ? expandedIds.delete(id) : expandedIds.add(id);
		onExpandedChange?.([...expandedIds]);
	}

	function toggleSelected(id: string) {
		if (selectionMode === 'none') return;
		if (selectionMode === 'single') {
			selectedIds = currentSelectedIds.has(id) ? new Set() : new Set([id]);
		} else {
			selectedIds = new Set(currentSelectedIds);
			selectedIds.has(id) ? selectedIds.delete(id) : selectedIds.add(id);
		}
		onSelectedChange?.([...selectedIds]);
	}
</script>

{#snippet NodeItem(node: TreeNode, level: number)}
	{@const hasChildren = Boolean(node.children?.length)}
	{@const isExpanded = currentExpandedIds.has(node.id)}
	{@const isSelected = currentSelectedIds.has(node.id)}
	<div>
		<button
			type="button"
			role="treeitem"
			aria-selected={isSelected}
			aria-expanded={hasChildren ? isExpanded : undefined}
			disabled={node.disabled}
			class={cn(
				'flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm font-bold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50',
				isSelected && 'bg-primary text-primary-foreground'
			)}
			style={`padding-left: ${level * 18 + 8}px`}
			onclick={() => hasChildren ? toggleExpanded(node.id) : toggleSelected(node.id)}
			ondblclick={() => toggleSelected(node.id)}
		>
			{#if hasChildren}
				<ChevronRightIcon class={cn('h-4 w-4 transition-transform', isExpanded && 'rotate-90')} />
			{:else}
				<span class="h-4 w-4"></span>
			{/if}
			{#if showIcons}
				{#if hasChildren}
					<FolderIcon class="h-4 w-4" />
				{:else}
					<FileIcon class="h-4 w-4" />
				{/if}
			{/if}
			<span>{node.label}</span>
		</button>
		{#if hasChildren && isExpanded}
			{#each node.children ?? [] as child (child.id)}
				{@render NodeItem(child, level + 1)}
			{/each}
		{/if}
	</div>
{/snippet}

<div role="tree" class={cn('border-3 border-foreground bg-background p-2 shadow-[4px_4px_0px_hsl(var(--shadow-color))]', className)}>
	{#each data as node (node.id)}
		{@render NodeItem(node, 0)}
	{/each}
</div>
