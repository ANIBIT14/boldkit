<script lang="ts">
	import CanvasEffect from './canvas-effect.svelte';
	let props = $props();
</script>

<CanvasEffect effect="particle-web" {...props} />
