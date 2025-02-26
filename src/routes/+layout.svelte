<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<main class="flex h-dvh w-full">
	<Navbar />
	<div class="p-12 pl-0">
		{@render children()}
	</div>
</main>
