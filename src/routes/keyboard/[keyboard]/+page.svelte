<script lang="ts">
	let { data } = $props();
	const keyboard = $derived(data.keyboard);
	const designer = $derived(data.designer);
</script>

<svelte:head>
	<title>{keyboard?.name + ' - krchv' || 'krchv'}</title>
</svelte:head>

<h1 class="font-daydream text-4xl">{keyboard?.name}</h1>

<table class="mt-4 w-full border-collapse">
	<tbody>
		<tr>
			<td class="py-2 pr-4 font-bold">Designer</td>
			<td>
				{#if designer.url && designer.name}
					<a href={designer?.url}>{designer?.name}</a>
				{:else if designer.name}
					<p>{designer.name}</p>
				{:else}
					<p>&mdash;</p>
				{/if}
			</td>
		</tr>
		<tr>
			<td class="py-2 pr-4 font-bold">Material</td>
			<td class="flex flex-row items-center gap-2 py-2">
				<div class="h-4 w-4 rounded-full" style:background-color={keyboard?.material?.color}></div>
				{keyboard?.material?.finish}
			</td>
		</tr>
		<tr>
			<td class="py-2 pr-4 font-bold">Keycaps</td>
			<td>{keyboard?.keycaps?.name}</td>
		</tr>
		<tr>
			<td class="py-2 pr-4 font-bold">Switches</td>
			<td>{keyboard?.switches?.name}</td>
		</tr>
		<tr>
			<td class="py-2 pr-4 font-bold">Status</td>
			<td>{keyboard?.status}</td>
		</tr>
		<tr>
			<td class="py-2 pr-4 font-bold">Notes</td>
			<td>{@html keyboard?.notes}</td>
		</tr>
	</tbody>
</table>

{#if keyboard?.images && keyboard.images.length > 0}
	<div class="mt-6">
		<h2 class="mb-2 text-2xl">Images</h2>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			{#each keyboard.images as image}
				<img src={image.src} alt={image.alt || keyboard.name} class="w-full" />
			{/each}
		</div>
	</div>
{/if}
