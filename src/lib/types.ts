import type { SceneSpec } from "./scene/types";

export type Category = "mosque" | "hajj" | "interior" | "site";

export type VideoFormat = "360-mono" | "360-stereo-tb" | "180-stereo-sbs";

export type VideoSource =
  /** A real equirectangular video file (mp4/webm/HLS-compatible URL). */
  | { type: "file"; src: string }
  /** A YouTube 360° video, embedded with YouTube's own player. */
  | { type: "youtube"; id: string }
  /** Placeholder: a procedurally generated 360° scene rendered in the browser. */
  | { type: "generated"; scene: SceneSpec };

export interface Video {
  slug: string;
  title: string;
  /** Short line for cards. */
  summary: string;
  description: string;
  category: Category;
  /** Place name shown on cards, e.g. "Makkah, Saudi Arabia". */
  location: string;
  format: VideoFormat;
  source: VideoSource;
  /** Poster image path (16:9), used for large views and the player. */
  poster: string;
  /** Smaller (~800px) version of the poster for cards and lists. */
  thumb?: string;
  /** Duration in seconds. */
  duration: number;
  publishedAt: string;
  views: number;
  tags: string[];
  credits?: string;
}
