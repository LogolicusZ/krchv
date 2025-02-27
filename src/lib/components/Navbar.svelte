<script lang="ts">
	import Search from './Search.svelte';
	import { ChevronDown, Menu, X } from 'lucide-svelte';

	let { data } = $props();
	const keyboards = data.keyboards;

	// Add state to track if sidebar is open
	let sidebarOpen = $state(false);

	// Toggle sidebar function
	const toggleSidebar = () => {
		sidebarOpen = !sidebarOpen;
	};
</script>

<button
	onclick={toggleSidebar}
	class="bg-base-100 absolute top-12 left-0 z-40 cursor-pointer rounded-r-full rounded-br-full border-[1px] border-l-0 border-gray-300 p-2 pl-3 md:hidden lg:hidden"
	><Menu /></button
>

<div
	class="bg-base-100 fixed top-0 left-0 z-50 flex h-full w-64 flex-col gap-6 overflow-x-visible overflow-y-clip p-12 shadow-lg transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:shadow-none lg:static lg:translate-x-0 lg:shadow-none {sidebarOpen
		? 'translate-x-0'
		: '-translate-x-full'}"
>
	<button
		onclick={toggleSidebar}
		class="absolute top-12 left-2 cursor-pointer p-1 md:hidden lg:hidden"><X /></button
	>
	<a href="/">
		<img class="w-34" alt="krchv" src="/assets/svg/logo.svg" />
	</a>
	<Search />
	<div>
		<p class="text-sm uppercase opacity-50">Keyboards</p>
		<ul>
			{#each keyboards as k}
				<li><a class="unset-link" href="/keyboard/{k.id}">{k.name}</a></li>
			{/each}
			<li>
				<a
					class="unset-link flex items-center gap-1 opacity-65 hover:opacity-85"
					href="/table/keyboards"><ChevronDown size="18" /> more...</a
				>
			</li>
		</ul>
	</div>
	<div>
		<p class="text-sm uppercase opacity-50">Database</p>
		<ul>
			<li>Keyboards</li>
			<li>Keycaps</li>
			<li>Switches</li>
			<li>Accessories</li>
			<li>&rarr; more...</li>
		</ul>
	</div>
	<div class="mt-auto flex flex-col">
		<p class="text-sm uppercase opacity-50">Legal</p>
		<!-- <a class="text-base-content unset-link no-underline hover:opacity-80" href="/">Home</a> -->
		<a class="text-base-content unset-link no-underline hover:opacity-80" href="/">Impressum</a>
		<a class="text-base-content unset-link mb-6 no-underline hover:opacity-80" href="/"
			>Datenschutzerklärung</a
		>
		<p>&copy; 2025 LogolicusZ</p>
		<a href="//logolicusz.com">&larr; logolicusz.com</a>
	</div>
</div>
