<script lang="ts">
	import { Search } from 'lucide-svelte';
</script>

<div>
	<div class="flex items-center justify-center">
		<div class="relative">
			<input
				id="search"
				name="search"
				type="search"
				placeholder=""
				class="peer focus:border-primary border-b border-gray-300 bg-inherit py-1 transition-colors focus:outline-none"
			/>
			<label
				for="search"
				class="peer-focus:text-primary absolute -top-4 left-0 cursor-text text-xs transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm peer-focus:text-xs peer-focus:opacity-0"
			>
				<span class="flex items-center gap-2"><Search size="18" /> Search the universe...</span>
			</label>
		</div>
	</div>
</div>
