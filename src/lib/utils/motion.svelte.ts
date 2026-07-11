import { prefersReducedMotion } from "svelte/motion";

/**
 * Wrap Svelte transition params so they collapse to an instant (0ms) transition
 * when the user has requested reduced motion. Svelte's JS-driven transitions
 * (fly/fade/etc.) do not honor `prefers-reduced-motion` on their own.
 */
export function motionSafe<T extends Record<string, unknown>>(params: T): T {
  if (prefersReducedMotion.current) {
    return { ...params, duration: 0, delay: 0 };
  }
  return params;
}
