<script lang="ts">
	import CanvasEffect from './canvas-effect.svelte';
	let props = $props();
</script>

<CanvasEffect effect="dot-wave" {...props} />
