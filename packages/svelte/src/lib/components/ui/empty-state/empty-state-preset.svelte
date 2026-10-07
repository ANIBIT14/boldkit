<script lang="ts">
	import type { Snippet } from 'svelte';
	import Root from './empty-state.svelte';
	import Icon from './empty-state-icon.svelte';
	import Illustration from './empty-state-illustration.svelte';
	import Title from './empty-state-title.svelte';
	import Description from './empty-state-description.svelte';
	import Actions from './empty-state-actions.svelte';
	import SearchIcon from '@lucide/svelte/icons/search';
	import FileQuestionIcon from '@lucide/svelte/icons/file-question';
	import InboxIcon from '@lucide/svelte/icons/inbox';
	import FolderOpenIcon from '@lucide/svelte/icons/folder-open';
	import UsersIcon from '@lucide/svelte/icons/users';
	import ShoppingCartIcon from '@lucide/svelte/icons/shopping-cart';
	import BellIcon from '@lucide/svelte/icons/bell';
	import ImageIcon from '@lucide/svelte/icons/image';
	import AlertTriangleIcon from '@lucide/svelte/icons/alert-triangle';
	import WifiOffIcon from '@lucide/svelte/icons/wifi-off';
	import ShieldXIcon from '@lucide/svelte/icons/shield-x';
	import ClockIcon from '@lucide/svelte/icons/clock';
	import WrenchIcon from '@lucide/svelte/icons/wrench';
	import UploadIcon from '@lucide/svelte/icons/upload';

	export type PresetType =
		| 'no-results' | 'no-data' | 'empty-inbox' | 'empty-folder' | 'no-users'
		| 'empty-cart' | 'no-notifications' | 'no-images' | 'error' | 'offline'
		| 'permission-denied' | 'coming-soon' | 'maintenance' | 'upload';

	type Props = {
		preset: PresetType;
		size?: 'sm' | 'default' | 'lg';
		customTitle?: string;
		customDescription?: string;
		class?: string;
		action?: Snippet;
		illustration?: Snippet;
	};

	let { preset, size = 'default', customTitle, customDescription, class: className, action, illustration }: Props = $props();

	type PresetConfig = { icon: typeof SearchIcon; title: string; description: string; iconColor?: string };

	const presets: Record<PresetType, PresetConfig> = {
		'no-results': { icon: SearchIcon, title: 'No results found', description: "Try adjusting your search or filter to find what you're looking for." },
		'no-data': { icon: FileQuestionIcon, title: 'No data available', description: "There's nothing to display here yet. Data will appear once available." },
		'empty-inbox': { icon: InboxIcon, title: 'Inbox is empty', description: "You're all caught up! New messages will appear here." },
		'empty-folder': { icon: FolderOpenIcon, title: 'Folder is empty', description: "This folder doesn't contain any files yet." },
		'no-users': { icon: UsersIcon, title: 'No users found', description: 'There are no users matching your criteria.' },
		'empty-cart': { icon: ShoppingCartIcon, title: 'Your cart is empty', description: "Looks like you haven't added anything to your cart yet." },
		'no-notifications': { icon: BellIcon, title: 'No notifications', description: "You're all caught up! Check back later for updates." },
		'no-images': { icon: ImageIcon, title: 'No images', description: 'There are no images to display. Upload some to get started.' },
		'error': { icon: AlertTriangleIcon, title: 'Something went wrong', description: 'An error occurred. Please try again or contact support if the problem persists.', iconColor: 'destructive' },
		'offline': { icon: WifiOffIcon, title: "You're offline", description: 'Please check your internet connection and try again.', iconColor: 'warning' },
		'permission-denied': { icon: ShieldXIcon, title: 'Access denied', description: "You don't have permission to view this content.", iconColor: 'destructive' },
		'coming-soon': { icon: ClockIcon, title: 'Coming soon', description: 'This feature is under development. Stay tuned for updates!', iconColor: 'accent' },
		'maintenance': { icon: WrenchIcon, title: 'Under maintenance', description: "We're performing scheduled maintenance. Please check back soon.", iconColor: 'warning' },
		'upload': { icon: UploadIcon, title: 'Upload files', description: 'Drag and drop files here, or click to browse.', iconColor: 'primary' },
	};

	const config = $derived(presets[preset]);
	const iconSizeClass = $derived(size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-10 w-10' : 'h-8 w-8');
</script>

<Root {size} class={className}>
	{#if illustration}
		<Illustration>{@render illustration()}</Illustration>
	{:else}
		<Icon>
			<config.icon class={iconSizeClass} />
		</Icon>
	{/if}
	<div>
		<Title>{customTitle ?? config.title}</Title>
		<Description>{customDescription ?? config.description}</Description>
		{#if action}
			<Actions>{@render action()}</Actions>
		{/if}
	</div>
</Root>
