<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import XIcon from '@lucide/svelte/icons/x';
	import FileIcon from '@lucide/svelte/icons/file';
	import ImageIcon from '@lucide/svelte/icons/image';
	import FileTextIcon from '@lucide/svelte/icons/file-text';
	import FileCodeIcon from '@lucide/svelte/icons/file-code';
	import FileAudioIcon from '@lucide/svelte/icons/file-audio';
	import FileVideoIcon from '@lucide/svelte/icons/file-video';

	export type FileItem = {
		file: File;
		progress?: number;
		error?: string;
		uploading?: boolean;
	};

	type Props = {
		files: FileItem[];
		class?: string;
		onRemove?: (file: File) => void;
	};

	let { files, class: className, onRemove }: Props = $props();

	function formatBytes(bytes: number) {
		if (bytes === 0) return '0 Bytes';
		const k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	function getFileIcon(mimeType: string) {
		if (mimeType.startsWith('image/')) return ImageIcon;
		if (mimeType.startsWith('video/')) return FileVideoIcon;
		if (mimeType.startsWith('audio/')) return FileAudioIcon;
		if (mimeType.includes('pdf') || mimeType.includes('document')) return FileTextIcon;
		if (mimeType.includes('code') || mimeType.includes('javascript') || mimeType.includes('json')) return FileCodeIcon;
		return FileIcon;
	}
</script>

{#if files.length > 0}
	<div class={cn('space-y-2 mt-4', className)}>
		{#each files as item}
			{@const Icon = getFileIcon(item.file.type)}
			<div
				class={cn(
					'flex items-center gap-3 p-3 border-3 border-foreground bg-background shadow-[3px_3px_0px_hsl(var(--shadow-color))]',
					item.error && 'border-destructive bg-destructive/10 shadow-[3px_3px_0px_hsl(var(--destructive))]'
				)}
			>
				<div class="flex items-center justify-center w-10 h-10 bg-muted border-3 border-foreground">
					<Icon class="h-5 w-5" />
				</div>
				<div class="flex-1 min-w-0">
					<p class="font-bold text-sm truncate">{item.file.name}</p>
					<p class="text-xs text-muted-foreground">{formatBytes(item.file.size)}</p>
					{#if item.error}
						<p class="text-xs text-destructive font-bold">{item.error}</p>
					{/if}
					{#if item.uploading && item.progress !== undefined}
						<Progress value={item.progress} class="h-2 mt-1" />
					{/if}
				</div>
				{#if item.uploading}
					<Spinner class="size-4" />
				{:else}
					<button
						type="button"
						class="flex items-center justify-center w-8 h-8 border-3 border-foreground bg-background hover:bg-destructive hover:text-destructive-foreground hover:shadow-[2px_2px_0px_hsl(var(--foreground))] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
						onclick={() => onRemove?.(item.file)}
					>
						<XIcon class="h-4 w-4" />
					</button>
				{/if}
			</div>
		{/each}
	</div>
{/if}
