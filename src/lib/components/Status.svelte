<script lang="ts">
  let { status }: { status?: string | null } = $props();

  /**
   * Map a freeform status string onto a small set of visual categories so the
   * same value ("SOLD", "Sold", "Traded for X", "collection"…) always reads the
   * same at a glance. Unknown values fall through to a neutral badge that keeps
   * the original text.
   */
  const meta = $derived.by(() => {
    const raw = (status ?? "").trim();
    const s = raw.toLowerCase();

    if (!raw) return null;

    if (s === "collection" || s === "owned") {
      return { label: "Collection", tone: "emerald" };
    }
    if (s === "sold") {
      return { label: "Sold", tone: "rose" };
    }
    if (s.startsWith("traded")) {
      // Keep the "…for X" detail, but normalize the leading word's casing.
      return { label: "Traded" + raw.slice("traded".length), tone: "amber" };
    }
    if (s.includes("content")) {
      return { label: "Out for content", tone: "sky" };
    }
    return { label: raw, tone: "gray" };
  });

  const tones: Record<string, { badge: string; dot: string }> = {
    emerald: { badge: "bg-emerald-100 text-emerald-800 ring-emerald-600/20", dot: "bg-emerald-500" },
    rose: { badge: "bg-rose-100 text-rose-800 ring-rose-600/20", dot: "bg-rose-500" },
    amber: { badge: "bg-amber-100 text-amber-800 ring-amber-600/20", dot: "bg-amber-500" },
    sky: { badge: "bg-sky-100 text-sky-800 ring-sky-600/20", dot: "bg-sky-500" },
    gray: { badge: "bg-gray-100 text-gray-700 ring-gray-500/20", dot: "bg-gray-400" },
  };
</script>

{#if meta}
  <span
    class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset {tones[
      meta.tone
    ].badge}">
    <span class="h-1.5 w-1.5 rounded-full {tones[meta.tone].dot}"></span>
    {meta.label}
  </span>
{:else}
  <span class="opacity-50">&mdash;</span>
{/if}
