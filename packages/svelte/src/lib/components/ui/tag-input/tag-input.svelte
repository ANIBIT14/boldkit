<script lang="ts">
	import { cn } from '$lib/utils.js';
	import XIcon from '@lucide/svelte/icons/x';

	type Props = {
		value?: string[];
		defaultValue?: string[];
		suggestions?: string[];
		maxTags?: number;
		allowDuplicates?: boolean;
		delimiter?: string | RegExp;
		validateTag?: (tag: string) => boolean | string;
		placeholder?: string;
		disabled?: boolean;
		class?: string;
		onchange?: (value: string[]) => void;
	};

	let {
		value = $bindable(undefined),
		defaultValue = [],
		suggestions = [],
		maxTags,
		allowDuplicates = false,
		delimiter = ',',
		placeholder = 'Add tag...',
		disabled = false,
		validateTag,
		class: className,
		onchange,
	}: Props = $props();

	// svelte-ignore state_referenced_locally
	let internalTags = $state<string[]>([...defaultValue]);
	let inputValue = $state('');
	let showSuggestions = $state(false);
	let error = $state<string | null>(null);
	let selectedSuggestionIndex = $state(-1);
	let inputRef = $state<HTMLInputElement | null>(null);
	let containerRef = $state<HTMLDivElement | null>(null);

	const isControlled = $derived(value !== undefined);
	const tags = $derived(isControlled ? value! : internalTags);

	const filteredSuggestions = $derived.by(() => {
		if (!inputValue.trim() || suggestions.length === 0) return [];
		const lower = inputValue.toLowerCase();
		return suggestions.filter(
			(s) => s.toLowerCase().includes(lower) && (allowDuplicates || !tags.includes(s))
		);
	});

	function updateTags(newTags: string[]) {
		if (!isControlled) internalTags = newTags;
		value = newTags;
		onchange?.(newTags);
	}

	function addTag(tagValue: string): boolean {
		const trimmed = tagValue.trim();
		if (!trimmed) return false;
		if (maxTags && tags.length >= maxTags) { error = `Maximum ${maxTags} tags allowed`; return false; }
		if (!allowDuplicates && tags.includes(trimmed)) { error = 'Tag already exists'; return false; }
		if (validateTag) {
			const result = validateTag(trimmed);
			if (result !== true) { error = typeof result === 'string' ? result : 'Invalid tag'; return false; }
		}
		error = null;
		updateTags([...tags, trimmed]);
		return true;
	}

	function removeTag(index: number) {
		if (disabled) return;
		updateTags(tags.filter((_, i) => i !== index));
		error = null;
	}

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		const val = target.value;
		inputValue = val;
		showSuggestions = true;
		selectedSuggestionIndex = -1;
		error = null;

		const delimiterRe = delimiter instanceof RegExp ? delimiter : new RegExp(delimiter as string);
		const parts = val.split(delimiterRe);
		if (parts.length > 1) {
			parts.slice(0, -1).filter((p) => p.trim()).forEach((t) => addTag(t));
			inputValue = parts[parts.length - 1];
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		switch (e.key) {
			case 'Enter':
				e.preventDefault();
				if (selectedSuggestionIndex >= 0 && filteredSuggestions[selectedSuggestionIndex]) {
					if (addTag(filteredSuggestions[selectedSuggestionIndex])) {
						inputValue = '';
						showSuggestions = false;
						selectedSuggestionIndex = -1;
					}
				} else if (inputValue.trim()) {
					if (addTag(inputValue)) inputValue = '';
				}
				break;
			case 'Backspace':
				if (!inputValue && tags.length > 0) removeTag(tags.length - 1);
				break;
			case 'ArrowDown':
				if (filteredSuggestions.length > 0) {
					e.preventDefault();
					selectedSuggestionIndex = selectedSuggestionIndex < filteredSuggestions.length - 1
						? selectedSuggestionIndex + 1 : 0;
				}
				break;
			case 'ArrowUp':
				if (filteredSuggestions.length > 0) {
					e.preventDefault();
					selectedSuggestionIndex = selectedSuggestionIndex > 0
						? selectedSuggestionIndex - 1 : filteredSuggestions.length - 1;
				}
				break;
			case 'Escape':
				showSuggestions = false;
				selectedSuggestionIndex = -1;
				break;
		}
	}

	function handleClickOutside(e: MouseEvent) {
		if (containerRef && !containerRef.contains(e.target as Node)) {
			showSuggestions = false;
		}
	}
</script>

<svelte:document onmousedown={handleClickOutside} />

<div bind:this={containerRef} class="relative">
	<label
		role="group"
		aria-label="Tag input"
		class={cn(
			'flex flex-wrap items-center gap-2 min-h-11 w-full border-3 border-input bg-background px-3 py-2',
			'shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200',
			'focus-within:translate-x-[4px] focus-within:translate-y-[4px] focus-within:shadow-none',
			disabled && 'opacity-50 cursor-not-allowed',
			error && 'border-destructive',
			className
		)}
	>
		{#each tags as tag, i}
			<span class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold uppercase tracking-wide border-2 border-foreground bg-primary text-primary-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))]">
				{tag}
				{#if !disabled}
					<button type="button" onclick={() => removeTag(i)} class="hover:bg-primary-foreground/20 rounded-sm p-0.5 transition-colors" aria-label="Remove {tag}">
						<XIcon class="h-3 w-3" />
					</button>
				{/if}
			</span>
		{/each}
		<input
			bind:this={inputRef}
			type="text"
			value={inputValue}
			oninput={handleInput}
			onkeydown={handleKeyDown}
			onfocus={() => (showSuggestions = true)}
			placeholder={tags.length === 0 ? placeholder : ''}
			{disabled}
			class="flex-1 min-w-[120px] bg-transparent outline-none text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed"
		/>
	</label>
	{#if error}
		<p role="alert" class="mt-1 text-xs font-medium text-destructive">{error}</p>
	{/if}
	{#if showSuggestions && filteredSuggestions.length > 0}
		<div class="absolute z-50 mt-1 w-full border-3 border-foreground bg-popover shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
			{#each filteredSuggestions as suggestion, i}
				<button
					type="button"
					onclick={() => { if (addTag(suggestion)) { inputValue = ''; showSuggestions = false; inputRef?.focus(); } }}
					class={cn('w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted', i === selectedSuggestionIndex && 'bg-accent')}
				>
					{suggestion}
				</button>
			{/each}
		</div>
	{/if}
</div>
