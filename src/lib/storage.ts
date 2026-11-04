/*
 * Per-viewer watch progress, kept in localStorage so a video resumes where it
 * was left. Every access is guarded: storage can be unavailable in private
 * windows or embedded contexts, and the site must still work.
 */

export interface Progress {
  /** Seconds watched. */
  t: number;
  /** Total duration. */
  d: number;
  /** Last watched (epoch ms). */
  at: number;
}

const PROGRESS = "zvr:progress";

function readAll(): Record<string, Progress> {
  try {
    return JSON.parse(window.localStorage.getItem(PROGRESS) ?? "{}") as Record<string, Progress>;
  } catch {
    return {};
  }
}

export function saveProgress(slug: string, t: number, d: number) {
  const next = readAll();
  // Finished (or barely started) videos are not resumed.
  if (t < 5 || t > d - 5) delete next[slug];
  else next[slug] = { t, d, at: Date.now() };
  try {
    window.localStorage.setItem(PROGRESS, JSON.stringify(next));
  } catch {
    /* storage full or blocked */
  }
}

export function getProgress(slug: string): Progress | undefined {
  if (typeof window === "undefined") return undefined;
  return readAll()[slug];
}
