import { ditherTest } from "./dither";
import { makeRandom, clamp, lerp } from "./random";
import { TERRAIN_TONES, GRASS_TONES, type ThemeName } from "./palette";

const STEP = 4; // pixel-block size — keeps the chunky, low-res pixel-art feel

type RidgeWave = { wavelength: number; amp: number; phase: number };

// A handful of overlapping sine waves per mountain layer gives an organic-looking
// ridge line without needing real terrain data.
function makeRidgeWaves(rand: () => number, count: number): RidgeWave[] {
  const waves: RidgeWave[] = [];
  for (let i = 0; i < count; i++) {
    waves.push({
      wavelength: 140 + rand() * 260 * (i + 1),
      amp: 1 / (i + 1),
      phase: rand() * Math.PI * 2,
    });
  }
  return waves;
}

function ridgeHeight(x: number, waves: RidgeWave[], scale: number) {
  let h = 0;
  let total = 0;
  for (const w of waves) {
    h += w.amp * Math.sin((x / w.wavelength) * Math.PI * 2 + w.phase);
    total += w.amp;
  }
  return (h / total) * scale;
}

export type Pine = {
  x: number;
  topY: number;
  baseY: number;
  width: number;
  sprite: HTMLCanvasElement; // crown + trunk, drawn per-row-offset by the engine for sway
  rows: number;
  sway: number; // current animated lean, driven by the engine
  swayTarget: number;
  swayVelocity: number;
};

export type GrassBlade = {
  x: number;
  baseY: number;
  height: number;
  lean: number; // current animated lean
  phase: number;
};

export type Terrain = {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  ridgeAt: (x: number) => number; // ground silhouette height at a given x, for foreground props
  pines: Pine[];
  grass: GrassBlade[];
  seed: number;
};

const MOUNTAIN_LAYERS = [
  { heightFrac: 0.5, depth: 0.85, waveCount: 3 },
  { heightFrac: 0.34, depth: 0.55, waveCount: 3 },
  { heightFrac: 0.2, depth: 0.3, waveCount: 2 },
];

export function buildTerrain(
  width: number,
  height: number,
  dpr: number,
  theme: ThemeName,
  seed = 20260921,
): Terrain {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;

  const tones = TERRAIN_TONES[theme];
  const rand = makeRandom(seed);
  const cols = Math.ceil(width / STEP);

  let frontRidge: number[] | null = null;

  MOUNTAIN_LAYERS.forEach((layer, layerIndex) => {
    const waves = makeRidgeWaves(rand, layer.waveCount);
    const baseline = height * (1 - layer.depth * 0.55);
    const amp = height * layer.heightFrac * 0.5;
    const tone = tones[Math.min(layerIndex, tones.length - 1)];
    const ridge: number[] = [];

    for (let cx = 0; cx < cols; cx++) {
      const x = cx * STEP;
      const h = baseline - amp - ridgeHeight(x, waves, amp);
      ridge.push(h);
    }

    ctx.fillStyle = tone;
    for (let cx = 0; cx < cols; cx++) {
      const top = ridge[cx];
      const x = cx * STEP;
      for (let py = Math.floor(top / STEP); py * STEP < height; py++) {
        const y = py * STEP;
        // fade the very top edge of the ridge via dithering for a soft skyline
        const edgeFade = clamp((y - top) / (STEP * 3), 0, 1);
        if (edgeFade < 1 && !ditherTest(cx, py, edgeFade)) continue;
        ctx.fillRect(x, y, STEP, STEP);
      }
    }

    if (layerIndex === MOUNTAIN_LAYERS.length - 1) {
      frontRidge = ridge;
    }
  });

  const ridge = frontRidge ?? new Array(cols).fill(height * 0.7);
  const ridgeAt = (x: number) => {
    const idx = clamp(Math.floor(x / STEP), 0, ridge.length - 1);
    return ridge[idx];
  };

  // Pines scattered along the nearest ridge crest. Each gets its own small sprite
  // (rather than being baked into the static terrain bitmap) so the engine can
  // redraw it row-by-row with a sway offset without touching the mountains.
  const pines: Pine[] = [];
  const pineTone = tones[tones.length - 1];
  let cursor = 20 + rand() * 40;
  while (cursor < width - 20) {
    const treeWidth = 14 + rand() * 10;
    const topOffset = 26 + rand() * 18;
    const baseY = ridgeAt(cursor) + 6;
    const topY = baseY - topOffset;
    const rows = Math.max(3, Math.round((baseY - topY) / STEP)) + 2; // + trunk rows
    const { sprite } = buildPineSprite(dpr, treeWidth, rows, pineTone);
    pines.push({
      x: cursor,
      topY,
      baseY,
      width: treeWidth,
      sprite,
      rows,
      sway: 0,
      swayTarget: 0,
      swayVelocity: 0,
    });
    cursor += treeWidth + 16 + rand() * 34;
  }

  // Grass blade anchors along the very bottom edge (drawn live each frame by the engine).
  const grass: GrassBlade[] = [];
  const grassTones = GRASS_TONES[theme];
  let gx = 0;
  while (gx < width) {
    grass.push({
      x: gx,
      baseY: height - 2,
      height: 10 + rand() * 14,
      lean: 0,
      phase: rand() * Math.PI * 2,
    });
    gx += 5 + rand() * 5;
  }
  void grassTones; // tones are looked up live by theme in the engine draw step

  return { canvas, width, height, ridgeAt, pines, grass, seed };
}

/** Builds a standalone pine sprite (crown rows + trunk), row 0 at the top of the crown. */
function buildPineSprite(dpr: number, width: number, rows: number, tone: string) {
  const trunkRows = 2;
  const canvas = document.createElement("canvas");
  const w = Math.ceil(width) + STEP * 4; // padding so sway offsets don't clip
  const h = rows * STEP;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = tone;

  const crownRows = rows - trunkRows;
  const cx = w / 2;
  for (let r = 0; r < crownRows; r++) {
    const t = r / Math.max(1, crownRows - 1);
    const rowWidth = lerp(2, width, t);
    ctx.fillRect(cx - rowWidth / 2, r * STEP, rowWidth, STEP);
  }
  for (let r = 0; r < trunkRows; r++) {
    ctx.fillRect(cx - STEP / 2, (crownRows + r) * STEP, STEP, STEP);
  }

  return { sprite: canvas, rowHeight: STEP };
}
