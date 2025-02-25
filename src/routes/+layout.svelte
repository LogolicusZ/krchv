<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<link href="/assets/fonts/geist/geist-variable.ttf" rel="stylesheet" />
	<link href="/assets/fonts/geist-mono/geist-mono-variable.ttf" rel="stylesheet" />
	<link href="/assets/fonts/daydream/Daydream.ttf" rel="stylesheet" />
</svelte:head>

<main class="flex h-dvh w-full gap-12 p-12">
	<Navbar />
	{@render children()}
</main>
