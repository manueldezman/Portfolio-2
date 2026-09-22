import { TRANSITION_FRAMES, type ThemeName } from "./palette";
import { clamp, lerp } from "./random";

const DURATION_MS = 1500;
let themeTransitionActive = false;

export function tryAcquireThemeTransition(): boolean {
  if (themeTransitionActive) return false;
  themeTransitionActive = true;
  return true;
}

export function releaseThemeTransition() {
  themeTransitionActive = false;
}

export function isThemeTransitionActive() {
  return themeTransitionActive;
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function mixColor(a: string, b: string, t: number) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const r = Math.round(lerp(ca.r, cb.r, t));
  const g = Math.round(lerp(ca.g, cb.g, t));
  const bl = Math.round(lerp(ca.b, cb.b, t));
  return `rgb(${r}, ${g}, ${bl})`;
}

function frameAt(progress: number) {
  const frames = TRANSITION_FRAMES;
  let i = 1;
  while (i < frames.length - 1 && progress > frames[i].at) i++;
  const a = frames[i - 1];
  const b = frames[i];
  const span = b.at === a.at ? 0 : clamp((progress - a.at) / (b.at - a.at), 0, 1);
  return {
    sky: a.sky.map((color, idx) => mixColor(color, b.sky[idx], span)),
    page: mixColor(a.page, b.page, span),
    floor: mixColor(a.floor, b.floor, span),
  };
}

function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

export type TransitionTarget = {
  canvas: HTMLCanvasElement; // orb art
  x: number; // viewport-relative center x
  y: number;
  size: number;
};

/**
 * Runs the full-page day<->night wipe. `onThemeSwap` fires at the arc's midpoint
 * (theme flips under the animation, matching the moment the orb crosses over),
 * and `onDone` fires once the overlay has fully faded out.
 */
export function runTransition(options: {
  next: ThemeName;
  from: TransitionTarget;
  to: TransitionTarget;
  onThemeSwap: () => void;
  onDone: () => void;
}) {
  const { next, from, to, onThemeSwap, onDone } = options;
  const falling = next === "dark"; // day -> night: the "from" (sun) sets, "to" (moon) rises

  const width = Math.max(320, window.innerWidth);
  const height = Math.max(320, window.innerHeight);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const overlay = document.createElement("canvas");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.width = width + "px";
  overlay.style.height = height + "px";
  overlay.style.zIndex = "9999";
  overlay.style.pointerEvents = "none";
  overlay.width = Math.round(width * dpr);
  overlay.height = Math.round(height * dpr);
  overlay.setAttribute("aria-hidden", "true");
  document.body.appendChild(overlay);

  const backdrop = document.createElement("div");
  backdrop.style.position = "fixed";
  backdrop.style.inset = "0";
  backdrop.style.zIndex = "9998";
  backdrop.style.pointerEvents = "none";
  backdrop.setAttribute("aria-hidden", "true");
  document.body.appendChild(backdrop);

  document.body.style.transitionProperty = "background-color, color";

  const ctx = overlay.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;

  const liftY = Math.min(height * 0.34, 260);
  const arcFall = { cx: from.x, cy: from.y + liftY, rx: width * 0.5, ry: liftY };
  const arcRise = { cx: to.x, cy: to.y + liftY, rx: width * 0.5, ry: liftY };

  const pointOnArc = (arc: typeof arcFall, angle: number) => ({
    x: arc.cx + arc.rx * Math.sin(angle),
    y: arc.cy - arc.ry * Math.cos(angle),
  });

  let swapped = false;
  const start = performance.now();

  function frame(now: number) {
    const rawProgress = clamp((now - start) / DURATION_MS, 0, 1);
    const eased = easeInOutSine(rawProgress);
    const skyProgress = falling ? eased : 1 - eased;

    if (!swapped && eased >= 0.5) {
      swapped = true;
      onThemeSwap();
    }

    const stops = frameAt(skyProgress);
    backdrop.style.background = `linear-gradient(180deg, ${stops.sky.join(", ")}, ${stops.page})`;
    document.body.style.backgroundColor = stops.page;
    document.documentElement.style.setProperty("--scenery-floor", stops.floor);

    ctx.clearRect(0, 0, width, height);
    const fallPoint = pointOnArc(arcFall, eased * (Math.PI / 2));
    const risePoint = pointOnArc(arcRise, -Math.PI / 2 + eased * (Math.PI / 2));
    ctx.drawImage(from.canvas, fallPoint.x - from.size / 2, fallPoint.y - from.size / 2, from.size, from.size);
    ctx.drawImage(to.canvas, risePoint.x - to.size / 2, risePoint.y - to.size / 2, to.size, to.size);

    if (rawProgress >= 1) {
      onDone();
      cleanup();
      return;
    }
    requestAnimationFrame(frame);
  }

  function cleanup() {
    overlay.remove();
    backdrop.remove();
    document.body.style.backgroundColor = "";
    document.documentElement.style.removeProperty("--scenery-floor");
    requestAnimationFrame(() => {
      document.body.style.transitionProperty = "";
    });
  }

  requestAnimationFrame(frame);
}
