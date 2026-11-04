/**
 * Procedural 360° scene description.
 *
 * Placeholder videos are rendered in the browser from a SceneSpec instead of
 * shipping footage. Replace a video's `source` with a real file to retire it.
 */

export type Sky = "night" | "dusk" | "dawn" | "day";

export type Particles = "lights" | "pigeons" | "motes" | "dust";

/** "lead" is the grey of Ottoman and Jerusalem domes; "white" is marble. */
export type DomeColor = "gold" | "turquoise" | "green" | "white" | "lead";
export type FacadeStyle = "tile" | "stone" | "marble" | "sandstone";
export type MinaretColor = "gold" | "tile" | "stone" | "white" | "sandstone";

export interface ShrineOpts {
  /** Longitude (degrees) of the building centre. 180 = straight ahead. */
  lon: number;
  /** Angular scale; 1 ≈ standing ~80 m away. */
  scale?: number;
  dome: DomeColor;
  /** Two side-by-side domes. */
  twin?: boolean;
  /** Pairs of minarets: 0, 1 or 2. */
  minaretPairs: 0 | 1 | 2;
  minaretColor: MinaretColor;
  facade: FacadeStyle;
  /** Golden iwan (portal) framing the entrance. */
  goldenIwan?: boolean;
}

export interface CourtyardSpec {
  kind: "courtyard";
  sky: Sky;
  seed: number;
  shrines: ShrineOpts[];
  /** Secondary domed halls beside the main building. */
  sideDomes?: { lon: number; scale?: number; color?: DomeColor; facade?: FacadeStyle; minarets?: boolean }[];
  arcade: FacadeStyle;
  /** Small domes along the top of the arcade (Ottoman style). */
  arcadeDomes?: boolean;
  /** Free-standing minarets rising behind the arcade, by longitude. */
  towers?: number[];
  /** The Kaaba at the centre of the courtyard, ringed by pilgrims. */
  kaaba?: boolean;
  inlay: string;
  particles: Particles[];
}

export interface RoadSpec {
  kind: "road";
  sky: Sky;
  seed: number;
  /** Number of pilgrims (in ihram) walking along the road between the tents. */
  crowd: number;
  particles: Particles[];
}

export interface HallSpec {
  kind: "hall";
  seed: number;
  /** Arabic banner texts, one per wall: front, right, back, left. */
  banners: [string, string, string, string];
  particles: Particles[];
}

export interface PlainSpec {
  kind: "plain";
  sky: Sky;
  seed: number;
  /** Rocky hills around the horizon. */
  mountains?: boolean;
  /** A hill straight ahead topped with a white pillar (Jabal al-Rahmah). */
  pillarHill?: boolean;
  /** Pilgrims in ihram standing on the plain. */
  crowd?: number;
  /** A low wall all around, with a gate ahead (a walled cemetery). */
  wall?: boolean;
  /** Simple grave markers scattered over the ground, with a few visitors. */
  graves?: number;
  /** Longitude of a distant green-domed mosque on the skyline (Masjid an-Nabawi). */
  distantMosqueLon?: number;
  particles: Particles[];
}

export type SceneSpec = CourtyardSpec | RoadSpec | HallSpec | PlainSpec;

/** A vertical gradient in degree space, or a flat CSS colour. */
export type Paint = string | { y0: number; y1: number; stops: [number, string][] };

export interface Glow {
  color: string;
  /** Blur radius in degrees. */
  blur: number;
}

/**
 * Drawing primitives in "degree space": x = longitude (0–360),
 * y = −latitude (so negative y is above the horizon).
 */
export type Shape =
  | { kind: "path"; d: string; fill?: Paint; stroke?: string; lineWidth?: number; glow?: Glow; alpha?: number }
  | { kind: "circle"; x: number; y: number; r: number; fill: Paint; glow?: Glow; alpha?: number }
  | { kind: "text"; x: number; y: number; text: string; size: number; fill: string; glow?: Glow };
