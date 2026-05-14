<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';
	import UploadIcon from '@lucide/svelte/icons/upload';

	export type FileRejection = {
		file: File;
		errors: Array<{ code: string; message: string }>;
	};

	type Props = {
		accept?: Record<string, string[]>;
		maxSize?: number;
		maxFiles?: number;
		disabled?: boolean;
		variant?: 'default' | 'compact' | 'minimal';
		class?: string;
		children?: Snippet<[{ isDragging: boolean; isDisabled: boolean; acceptedFiles: File[]; rejectedFiles: FileRejection[] }]>;
		onFilesAccepted?: (files: File[]) => void;
		onFilesRejected?: (files: FileRejection[]) => void;
	};

	let {
		accept,
		maxSize = 10 * 1024 * 1024,
		maxFiles = 10,
		disabled = false,
		variant = 'default',
		class: className,
		children,
		onFilesAccepted,
		onFilesRejected,
	}: Props = $props();

	let isDragging = $state(false);
	let acceptedFiles = $state<File[]>([]);
	let rejectedFiles = $state<FileRejection[]>([]);
	let inputRef = $state<HTMLInputElement | null>(null);

	function formatBytes(bytes: number) {
		if (bytes === 0) return '0 Bytes';
		const k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	function validateFile(file: File): FileRejection | null {
		const errors: Array<{ code: string; message: string }> = [];
		if (file.size > maxSize) errors.push({ code: 'file-too-large', message: `File is larger than ${formatBytes(maxSize)}` });
		if (accept) {
			const types = Object.entries(accept).flatMap(([m, exts]) => [m, ...exts]);
			const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
			const accepted = types.some((t) => t.startsWith('.') ? ext === t : t.endsWith('/*') ? file.type.startsWith(t.replace('/*', '/')) : file.type === t);
			if (!accepted) errors.push({ code: 'file-invalid-type', message: 'File type not accepted' });
		}
		return errors.length > 0 ? { file, errors } : null;
	}

	function processFiles(fileList: FileList | null) {
		if (!fileList || disabled) return;
		const all = Array.from(fileList);
		const remaining = maxFiles - acceptedFiles.length;
		const accepted: File[] = [], rejected: FileRejection[] = [];
		all.forEach((file, i) => {
			if (i >= remaining) { rejected.push({ file, errors: [{ code: 'too-many-files', message: 'Too many files' }] }); return; }
			const r = validateFile(file);
			if (r) rejected.push(r); else accepted.push(file);
		});
		acceptedFiles = [...acceptedFiles, ...accepted];
		rejectedFiles = rejected;
		if (accepted.length > 0) onFilesAccepted?.(accepted);
		if (rejected.length > 0) onFilesRejected?.(rejected);
	}

	const stateClasses = {
		idle: 'bg-background hover:bg-muted/30 shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:shadow-[6px_6px_0px_hsl(var(--shadow-color))] hover:translate-x-[-2px] hover:translate-y-[-2px]',
		dragging: 'border-solid border-primary bg-primary/10 scale-[1.02] shadow-[8px_8px_0px_hsl(var(--primary))]',
		disabled: 'opacity-50 cursor-not-allowed shadow-none',
	};

	const variantClasses = { default: 'p-8', compact: 'p-6', minimal: 'p-3 border-2' };
	const currentState = $derived(disabled ? 'disabled' : isDragging ? 'dragging' : 'idle');

	const acceptString = $derived(accept ? Object.entries(accept).flatMap(([m, exts]) => [m, ...exts]).join(',') : undefined);
</script>

<div
	class={cn(
		'relative flex flex-col items-center justify-center border-3 border-dashed border-foreground transition-all duration-200 cursor-pointer',
		stateClasses[currentState],
		variantClasses[variant],
		className
	)}
	role="button"
	tabindex={disabled ? -1 : 0}
	aria-disabled={disabled}
	ondragenter={(e) => { e.preventDefault(); e.stopPropagation(); if (!disabled) isDragging = true; }}
	ondragleave={(e) => { e.preventDefault(); e.stopPropagation(); isDragging = false; }}
	ondragover={(e) => { e.preventDefault(); e.stopPropagation(); }}
	ondrop={(e) => { e.preventDefault(); e.stopPropagation(); isDragging = false; processFiles(e.dataTransfer?.files ?? null); }}
	onclick={() => { if (!disabled) inputRef?.click(); }}
>
	<input
		bind:this={inputRef}
		type="file"
		accept={acceptString}
		multiple={maxFiles > 1}
		{disabled}
		class="hidden"
		onchange={(e) => { processFiles((e.target as HTMLInputElement).files); (e.target as HTMLInputElement).value = ''; }}
	/>
	{#if children}
		{@render children({ isDragging, isDisabled: disabled, acceptedFiles, rejectedFiles })}
	{:else}
		<div class="flex flex-col items-center gap-3 text-center">
			<div class={cn('flex items-center justify-center w-16 h-16 border-3 border-foreground bg-muted transition-all duration-200', isDragging && 'bg-primary border-primary shadow-[4px_4px_0px_hsl(var(--foreground))] -translate-x-1 -translate-y-1')}>
				<UploadIcon class={cn('h-8 w-8 transition-all duration-200', isDragging ? 'text-primary-foreground animate-bounce' : 'text-foreground')} />
			</div>
			{#if variant !== 'minimal'}
				<p class="font-black uppercase tracking-wide text-lg">{isDragging ? 'Drop files here' : 'Drag & drop files'}</p>
				<p class="text-sm text-muted-foreground font-bold">or click to browse</p>
			{/if}
		</div>
	{/if}
</div>
