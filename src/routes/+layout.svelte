<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	let { children, data } = $props();
</script>

<main class="flex h-dvh w-full overflow-hidden">
	<Navbar {data} />
	<div class="h-full w-full overflow-auto p-12 pl-0">
		{@render children()}
	</div>
</main>
