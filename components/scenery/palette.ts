// Pulled from app/globals.css. Keep these in sync if the site's palette changes.
export const BRAND = {
  light: {
    background: "#eee8dd",
    surfaceStrong: "#171512",
    text: "#171512",
    muted: "#77716a",
    accent: "#e73512",
    teal: "#168f86",
  },
  dark: {
    background: "#12110f",
    surfaceStrong: "#eee8dd",
    text: "#eee8dd",
    muted: "#a39b91",
    accent: "#ff5a36",
    teal: "#3fd5cc",
  },
};

export type ThemeName = "light" | "dark";

// Sky gradient stops, top -> horizon. Day leans warm cream with a faint accent
// blush near the horizon; night leans near-black with a cool-shadow lift so the
// dithered stars/moon have something to sit against.
export const SKY_GRADIENT: Record<ThemeName, string[]> = {
  light: ["#b8d3d6", "#d7e2d4", "#eadfc4", "#f2e2c0", "#f7ead2"],
  dark: ["#08090c", "#0d0f14", "#14141b", "#1b1a22", "#221d24"],
};

// Silhouette tones for mountains/trees, far -> near (nearer layers are darker/bolder).
export const TERRAIN_TONES: Record<ThemeName, string[]> = {
  light: ["#a9b6a2", "#8a9a84", "#69796a", "#4c5c4f"],
  dark: ["#1c1b22", "#232128", "#2b2830", "#332f38"],
};

export const GRASS_TONES: Record<ThemeName, string[]> = {
  light: ["#5c7a52", "#4d6a45", "#3d5738"],
  dark: ["#20261f", "#262d24", "#2d3529"],
};

export const ORB = {
  light: {
    core: ["#fff8ea", "#fff0cf", "#ffe4a8", "#ffd583", BRAND.light.accent],
    glow: "rgba(255, 213, 131, 0.55)",
  },
  dark: {
    core: ["#ffffff", "#f4f1ea", "#e4dfd2", "#cfc8b6", BRAND.dark.muted],
    glow: "rgba(238, 232, 221, 0.28)",
  },
};

export const STAR_TONES = ["#2a2830", "#4a4650", "#726c78", "#a49fae", BRAND.dark.text];

export const CLOUD_TONE = {
  light: "rgba(255, 252, 244, 0.9)",
  dark: "rgba(150, 146, 158, 0.5)",
};

// Transition keyframes for the click-triggered day<->night wipe. `at` runs 0 (day)
// -> 1 (night); the engine interpolates between whichever pair straddles the
// current progress. The middle stop pulls in the accent color for a brief
// "sunset" beat instead of a flat linear blend.
export type TransitionFrame = {
  at: number;
  sky: string[];
  page: string;
  floor: string;
};

export const TRANSITION_FRAMES: TransitionFrame[] = [
  {
    at: 0,
    sky: SKY_GRADIENT.light,
    page: BRAND.light.background,
    floor: GRASS_TONES.light[0],
  },
  {
    at: 0.45,
    sky: ["#8d7a86", "#a9838a", "#d98f6a", "#e8a06b", "#f0b678"],
    page: "#e7cdb0",
    floor: "#8a7a5c",
  },
  {
    at: 0.62,
    sky: ["#2c2438", "#3d2c46", "#7a3a4a", "#c14e3a", BRAND.dark.accent],
    page: "#3a2a2c",
    floor: "#3a2e28",
  },
  {
    at: 1,
    sky: SKY_GRADIENT.dark,
    page: BRAND.dark.background,
    floor: GRASS_TONES.dark[0],
  },
];
