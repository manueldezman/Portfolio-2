import { makeRandom, clamp } from "./random";
import { ORB, STAR_TONES, CLOUD_TONE, type ThemeName } from "./palette";

const STEP = 4;

export type Star = { x: number; y: number; base: number; period: number; phase: number };

export interface CloudLayer {
  zIndex: number;
  color: string;
  circles: Array<{ x: number; y: number; radius: number }>;
}

export type Cloud = {
  layers: CloudLayer[];
  w: number;
  h: number;
  x: number;
  y: number;
  speed: number;
};

export type Orb = {
  canvas: HTMLCanvasElement;
  glowCanvas: HTMLCanvasElement;
  radius: number;
  size: number;
  x: number;
  y: number;
};

export type Plane = {
  canvas: HTMLCanvasElement;
  w: number;
  h: number;
};

export type SkyScene = {
  width: number;
  height: number;
  theme: ThemeName;
  stars: Star[];
  clouds: Cloud[];
  orb: Orb;
  plane: Plane | null;
};

function buildOrb(dpr: number, theme: ThemeName, radius: number): Orb {
  const glowRadius = radius * 3;
  const size = Math.ceil(glowRadius * 2 + 8);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(size * dpr);
  canvas.height = Math.round(size * dpr);
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;

  const cx = size / 2;
  const cy = size / 2;
  const tones = ORB[theme].core;

  for (let py = Math.floor((cy - radius) / STEP); py * STEP < cy + radius; py++) {
    for (let px = Math.floor((cx - radius) / STEP); px * STEP < cx + radius; px++) {
      const x = px * STEP;
      const y = py * STEP;
      const dx = (x + STEP / 2 - cx) / radius;
      const dy = (y + STEP / 2 - cy) / radius;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 1) continue;
      // light comes from upper-left, so shade bands fall off toward lower-right
      const lightDot = clamp(0.6 - dx * 0.35 - dy * 0.45, 0, 1);
      const bandIndex = Math.min(tones.length - 1, Math.floor((1 - lightDot) * tones.length));
      ctx.fillStyle = tones[bandIndex];
      ctx.fillRect(x, y, STEP, STEP);
    }
  }

  // glow, drawn as its own layer so the engine can pulse its opacity independently
  const glowCanvas = document.createElement("canvas");
  glowCanvas.width = canvas.width;
  glowCanvas.height = canvas.height;
  const gctx = glowCanvas.getContext("2d")!;
  gctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const gradient = gctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, glowRadius);
  gradient.addColorStop(0, ORB[theme].glow);
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  gctx.fillStyle = gradient;
  gctx.fillRect(0, 0, size, size);

  return { canvas, glowCanvas, radius, size, x: 0, y: 0 };
}

function buildCloud(theme: ThemeName, rand: () => number): Cloud {
  const scale = 0.9 + rand() * 0.45;
  const profile = [
    [-0.56, 0.2, 0.25],
    [-0.4, 0.16, 0.32],
    [-0.2, 0.18, 0.37],
    [0.02, 0.18, 0.4],
    [0.23, 0.19, 0.35],
    [0.43, 0.2, 0.3],
    [0.58, 0.2, 0.22],
    [-0.38, -0.06, 0.27],
    [-0.13, -0.18, 0.38],
    [0.14, -0.1, 0.34],
    [0.38, -0.02, 0.27],
  ];
  const circles = profile.map(([cx, cy, radius], index) => ({
    cx: cx * 230 * scale + (rand() - 0.5) * 8,
    cy: cy * 100 * scale + (rand() - 0.5) * 5,
    radius: radius * 100 * scale + (index % 2 === 0 ? 2 : -2),
  }));
  const backCircles = circles.slice(0, 7);
  const frontCircles = circles.slice(7);
  const allCircles = [...backCircles, ...frontCircles];
  const maxR = Math.max(...allCircles.map((circle) => circle.radius));
  const pad = maxR * 0.6 + 6; // room for the soft dithered fade beyond each puff's edge
  const minX = Math.min(...allCircles.map((circle) => circle.cx - circle.radius)) - pad;
  const maxX = Math.max(...allCircles.map((circle) => circle.cx + circle.radius)) + pad;
  const minY = Math.min(...allCircles.map((circle) => circle.cy - circle.radius)) - pad;
  const maxY = Math.max(...allCircles.map((circle) => circle.cy + circle.radius)) + pad;
  const w = maxX - minX;
  const h = maxY - minY;

  const offsetCircles = (layerCircles: typeof circles): CloudLayer["circles"] =>
    layerCircles.map((circle) => ({
      x: circle.cx - minX,
      y: circle.cy - minY,
      radius: circle.radius,
    }));

  // Slow enough to feel atmospheric, but visible over a short observation.
  return {
    layers: [
      {
        zIndex: 0,
        color: theme === "light" ? "rgba(190, 195, 190, 0.35)" : "rgba(80, 80, 90, 0.35)",
        circles: offsetCircles(backCircles),
      },
      {
        zIndex: 1,
        color: CLOUD_TONE[theme],
        circles: offsetCircles(frontCircles),
      },
    ],
    w,
    h,
    x: 0,
    y: 0,
    speed: 1.2 + rand() * 1.2,
  };
}

function buildPlane(dpr: number, theme: ThemeName): Plane {
  // A tiny pixel-cluster silhouette — deliberately simple, just enough to read
  // as "plane" at a glance against the sky.
  const cells: Array<[number, number]> = [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
    [3, -1], [3, 1],
    [6, -1], [6, 1],
  ];
  const w = 8 * STEP;
  const h = 4 * STEP;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = theme === "light" ? "#3a3630" : "#c9c3b6";
  for (const [cx, cy] of cells) {
    ctx.fillRect(cx * STEP, (cy + 2) * STEP, STEP, STEP);
  }
  return { canvas, w, h };
}

export function buildSky(
  width: number,
  height: number,
  dpr: number,
  theme: ThemeName,
  seed = 20260921,
): SkyScene {
  const rand = makeRandom(seed);

  const starCount = Math.round((width * height) / 3800);
  const stars: Star[] = Array.from({ length: starCount }, () => ({
    x: Math.round(rand() * width),
    y: Math.round(rand() * height * 0.75),
    base: 0.25 + rand() * 0.35,
    period: 2 + rand() * 6,
    phase: rand() * Math.PI * 2,
  }));

  const cloudCount = Math.max(4, Math.round(width / 260));
  const clouds: Cloud[] = Array.from({ length: cloudCount }, (_, i) => {
    const cloud = buildCloud(theme, rand);
    cloud.x = (i / cloudCount) * (width + cloud.w) - cloud.w / 2 + rand() * 80;
    cloud.y = height * (0.06 + rand() * 0.3);
    return cloud;
  });

  const orbRadius = theme === "light" ? 30 : 22;
  const orb = buildOrb(dpr, theme, orbRadius);
  // Centered horizontally (the reference site keeps the orb in the middle of
  // the band, not off to one side). Vertically it sits a little above center,
  // clamped so its glow ring — which is much bigger than the orb core — never
  // gets clipped by the top or bottom of the sky band.
  orb.x = Math.max(0, Math.round((width - orb.size) / 2));
  orb.y = clamp(
    height * 0.14 - orb.size / 2,
    8,
    Math.max(8, height - orb.size - 8),
  );

  const plane = theme === "light" ? buildPlane(dpr, theme) : null;

  return { width, height, theme, stars, clouds, orb, plane };
}
