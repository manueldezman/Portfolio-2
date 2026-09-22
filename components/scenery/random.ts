// mulberry32 — public-domain PRNG by Tommy Ettinger. Deterministic given a seed,
// so re-mounting the scenery (or resizing) reproduces the same layout instead of
// jumping to a new random arrangement every time.
export function makeRandom(seed: number) {
  let a = seed >>> 0;
  return function rand() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

export function smoothstep(edge: number) {
  return edge * edge * (3 - 2 * edge);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
