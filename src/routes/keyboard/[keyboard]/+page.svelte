<script lang="ts">
	export let data;
	const keyboard = data.keyboard;
</script>

<h1 class="font-daydream text-4xl">{keyboard?.name}</h1>

<table></table>
{keyboard?.keycaps}
