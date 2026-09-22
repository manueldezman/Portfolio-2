import { makeRandom } from "./random";

const WING_FRAMES: Array<Array<[number, number]>> = [
  [[-3, -2], [-2, -1], [-1, 0], [0, 0], [1, 0], [2, -1], [3, -2]],
  [[-3, 0], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [3, 0]],
  [[-3, 2], [-2, 1], [-1, 0], [0, 0], [1, 0], [2, 1], [3, 2]],
];
const WING_CYCLE = [0, 1, 2, 1];

export type Bird = {
  t0: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  sag: number;
  phase: number;
  life: number;
};

const LIFE = 5.5;

export function spawnBirdBurst(origin: { x: number; y: number; w: number }, now: number, seed: number): Bird[] {
  const rand = makeRandom(seed);
  const count = 3 + Math.floor(rand() * 3);
  const birds: Bird[] = [];
  for (let i = 0; i < count; i++) {
    const speed = 70 + rand() * 90;
    const climb = 0.5 + rand() * 0.4;
    const dir = rand() < 0.5 ? -1 : 1;
    birds.push({
      t0: now + i * 0.05,
      x: origin.x + (rand() - 0.5) * origin.w,
      y: origin.y,
      vx: dir * speed * (1 - climb),
      vy: speed * climb,
      sag: 1.5 + rand() * 3,
      phase: rand(),
      life: LIFE,
    });
  }
  return birds;
}

export function drawBirds(
  ctx: CanvasRenderingContext2D,
  birds: Bird[],
  now: number,
  step: number,
  tone: string,
) {
  ctx.fillStyle = tone;
  for (let i = birds.length - 1; i >= 0; i--) {
    const b = birds[i];
    const t = now - b.t0;
    if (t < 0) continue;
    if (t > b.life) {
      birds.splice(i, 1);
      continue;
    }
    const x = b.x + b.vx * t;
    const y = b.y - b.vy * t + b.sag * t * t;
    const frameIndex = WING_CYCLE[Math.floor((t + b.phase) * 8) % WING_CYCLE.length];
    const frame = WING_FRAMES[frameIndex];
    for (const [dx, dy] of frame) {
      ctx.fillRect(
        Math.round((x + dx * step) / step) * step,
        Math.round((y + dy * step) / step) * step,
        step,
        step,
      );
    }
  }
}
