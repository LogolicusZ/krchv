<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import "../app.css";
  let { children, data } = $props();
</script>

<svelte:head>
  <title>krchv</title>
  <meta property="og:type" content="website" />
  <meta property="og:image" content="/assets/img/Preview.png" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:image" content="/assets/img/Preview.png" />
</svelte:head>

<main class="flex h-dvh w-full overflow-hidden">
  <Navbar {data} />
  <div class="h-full w-full overflow-auto p-12 pl-12 md:pl-0 lg:pl-0">
    {@render children()}
  </div>
</main>
