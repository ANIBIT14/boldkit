<script lang="ts">
	import CanvasEffect from './canvas-effect.svelte';
	let props = $props();
</script>

<CanvasEffect effect="matrix-rain" {...props} />
