<script lang="ts">
	import ClockIcon from '@lucide/svelte/icons/clock';
	import { cn } from '$lib/utils.js';

	type Props = {
		value?: Date;
		defaultValue?: Date;
		format?: '12h' | '24h';
		minuteStep?: 1 | 5 | 10 | 15 | 30;
		showSeconds?: boolean;
		disabled?: boolean;
		placeholder?: string;
		class?: string;
		onChange?: (date: Date | undefined) => void;
	};

	let {
		value = $bindable(undefined),
		defaultValue,
		format = '12h',
		minuteStep = 1,
		showSeconds = false,
		disabled = false,
		placeholder = 'Select time',
		class: className,
		onChange,
	}: Props = $props();

	let internalValue = $state<Date | undefined>(undefined);
	const selectedTime = $derived(value ?? internalValue ?? defaultValue);

	const hours = $derived(format === '12h' ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 24 }, (_, i) => i));
	const minutes = $derived(Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep));
	const periods = ['AM', 'PM'] as const;

	function getHour(date: Date) {
		const hour = date.getHours();
		if (format === '24h') return hour;
		if (hour === 0) return 12;
		return hour > 12 ? hour - 12 : hour;
	}

	function getPeriod(date: Date) {
		return date.getHours() >= 12 ? 'PM' : 'AM';
	}

	function formatDisplayTime(date: Date) {
		const hour = format === '12h' ? getHour(date).toString() : getHour(date).toString().padStart(2, '0');
		const minute = date.getMinutes().toString().padStart(2, '0');
		const second = date.getSeconds().toString().padStart(2, '0');
		const period = format === '12h' ? ` ${getPeriod(date)}` : '';
		return `${hour}:${minute}${showSeconds ? `:${second}` : ''}${period}`;
	}

	function commit(next: Date) {
		internalValue = next;
		value = next;
		onChange?.(next);
	}

	function update(part: 'hour' | 'minute' | 'second' | 'period', nextValue: number | 'AM' | 'PM') {
		const next = new Date(selectedTime ?? new Date());
		if (part === 'hour' && typeof nextValue === 'number') {
			let hour = nextValue;
			if (format === '12h') {
				const period = getPeriod(next);
				if (period === 'PM' && hour !== 12) hour += 12;
				if (period === 'AM' && hour === 12) hour = 0;
			}
			next.setHours(hour);
		}
		if (part === 'minute' && typeof nextValue === 'number') next.setMinutes(nextValue);
		if (part === 'second' && typeof nextValue === 'number') next.setSeconds(nextValue);
		if (part === 'period' && typeof nextValue === 'string') {
			const hour = next.getHours();
			if (nextValue === 'PM' && hour < 12) next.setHours(hour + 12);
			if (nextValue === 'AM' && hour >= 12) next.setHours(hour - 12);
		}
		commit(next);
	}
</script>

<div class={cn('inline-flex flex-col border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))]', className)}>
	<button
		type="button"
		{disabled}
		class="inline-flex min-w-[180px] items-center gap-2 border-b-3 border-foreground px-3 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
	>
		<ClockIcon class="h-4 w-4" />
		<span>{selectedTime ? formatDisplayTime(selectedTime) : placeholder}</span>
	</button>
	<div class="grid max-h-[260px] grid-flow-col auto-cols-[64px] overflow-auto">
		<div class="border-r-3 border-foreground">
			<div class="border-b-3 border-foreground bg-muted/30 p-2 text-center text-xs font-black uppercase">Hour</div>
			{#each hours as hour (hour)}
				<button type="button" class="block w-full px-2 py-1.5 text-sm hover:bg-muted" onclick={() => update('hour', hour)}>{format === '24h' ? hour.toString().padStart(2, '0') : hour}</button>
			{/each}
		</div>
		<div class="border-r-3 border-foreground">
			<div class="border-b-3 border-foreground bg-muted/30 p-2 text-center text-xs font-black uppercase">Min</div>
			{#each minutes as minute (minute)}
				<button type="button" class="block w-full px-2 py-1.5 text-sm hover:bg-muted" onclick={() => update('minute', minute)}>{minute.toString().padStart(2, '0')}</button>
			{/each}
		</div>
		{#if showSeconds}
			<div class="border-r-3 border-foreground">
				<div class="border-b-3 border-foreground bg-muted/30 p-2 text-center text-xs font-black uppercase">Sec</div>
				{#each Array.from({ length: 60 }, (_, i) => i) as second (second)}
					<button type="button" class="block w-full px-2 py-1.5 text-sm hover:bg-muted" onclick={() => update('second', second)}>{second.toString().padStart(2, '0')}</button>
				{/each}
			</div>
		{/if}
		{#if format === '12h'}
			<div>
				<div class="border-b-3 border-foreground bg-muted/30 p-2 text-center text-xs font-black uppercase">AM/PM</div>
				{#each periods as period (period)}
					<button type="button" class="block w-full px-2 py-1.5 text-sm hover:bg-muted" onclick={() => update('period', period)}>{period}</button>
				{/each}
			</div>
		{/if}
	</div>
</div>
