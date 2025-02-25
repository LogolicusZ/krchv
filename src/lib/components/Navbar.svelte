<script>
	import Search from './Search.svelte';
</script>

<div class="flex h-full flex-col gap-6 p-12">
	<a href="/">
		<img class="w-34" alt="krchv" src="/assets/svg/logo.svg" />
	</a>
	<Search />
	<div>
		<p class="text-sm uppercase opacity-50">Keyboards</p>
		<ul>
			<li>Noodle.zip</li>
			<li>Juna</li>
			<li>Cycle7</li>
			<li>&rarr; more...</li>
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
		<!-- <a class="!text-base-content !no-underline hover:opacity-80" href="/">Home</a> -->
		<a class="!text-base-content !no-underline hover:opacity-80" href="/">Impressum</a>
		<a class="!text-base-content mb-6 !no-underline hover:opacity-80" href="/"
			>Datenschutzerklärung</a
		>
		<p>&copy; 2025 LogolicusZ</p>
		<a href="//logolicusz.com">&larr; logolicusz.com</a>
	</div>
</div>
