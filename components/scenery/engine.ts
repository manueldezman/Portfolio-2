import { buildTerrain, type Terrain, type Pine } from "./terrain";
import { buildSky, type SkyScene } from "./sky";
import { spawnBirdBurst, drawBirds, type Bird } from "./birds";
import {
  isThemeTransitionActive,
  releaseThemeTransition,
  runTransition,
  tryAcquireThemeTransition,
} from "./transition";
import { GRASS_TONES, STAR_TONES, SKY_GRADIENT, type ThemeName } from "./palette";
import { clamp } from "./random";
import { ditherTest, getBayerDither } from "./dither";
import { enableAudio, playBirdFlightSound, playPlaneSound, playTransitionSound } from "./audio";

const STEP = 4;
const REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Pebble = { x: number; y: number; vx: number; vy: number; t0: number; life: number; tone: string };
type PointerState = { x: number; y: number; on: boolean; vx: number; at: number };

function readTheme(): ThemeName {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

/** Turns a hex color into an rgba() string at the given alpha, for gradient fades. */
function withAlpha(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ---------------------------------------------------------------------------
// SKY: gradient, stars, drifting clouds, the sun/moon orb (click to toggle
// theme), and the daytime plane. Meant to be mounted full-bleed at the very
// top of the page, on its own — no mountains/trees live here.
// ---------------------------------------------------------------------------

export function mountSky(skyCanvas: HTMLCanvasElement) {
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let theme = readTheme();
  let width = 0;
  let height = 0;
  let sky: SkyScene = null as unknown as SkyScene;

  const skyCtx = skyCanvas.getContext("2d")!;
  let plane: { t0: number; from: number; dir: 1 | -1; speed: number; y: number } | null = null;
  let planeSoundPlayed = false;
  let planeNextAt = 4 + Math.random() * 6;

  let running = false;
  let raf = 0;
  let inTransition = false;

  function rebuildScene() {
    sky = buildSky(width, height, dpr, theme);
    planeNextAt = performance.now() / 1000 + 4 + Math.random() * 6;
    plane = null;
  }

  function resize() {
    const rect = skyCanvas.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (!w || !h) return;
    if (w === width && h === height) return;
    width = w;
    height = h;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    skyCanvas.width = Math.round(w * dpr);
    skyCanvas.height = Math.round(h * dpr);
    rebuildScene();
  }

  function localPoint(ev: PointerEvent) {
    const rect = skyCanvas.getBoundingClientRect();
    return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
  }

  function hitOrb(x: number, y: number) {
    const cx = sky.orb.x + sky.orb.size / 2;
    const cy = sky.orb.y + sky.orb.size / 2;
    const r = sky.orb.radius + 8;
    const dx = x - cx;
    const dy = y - cy;
    return dx * dx + dy * dy <= (r + 10) * (r + 10);
  }

  async function onSkyClick(ev: PointerEvent) {
    if (inTransition) return;
    const { x, y } = localPoint(ev);
    if (hitOrb(x, y)) {
      await enableAudio();
      toggleTheme();
    }
  }

  function toggleTheme() {
    if (inTransition || !sky || !tryAcquireThemeTransition()) return;
    inTransition = true;
    playTransitionSound();
    const next: ThemeName = theme === "dark" ? "light" : "dark";
    const fromCanvas = sky.orb.canvas;
    const fromSize = sky.orb.size;
    const rect = skyCanvas.getBoundingClientRect();
    const fromX = rect.left + sky.orb.x + fromSize / 2;
    const fromY = rect.top + sky.orb.y + fromSize / 2;

    const nextSky = buildSky(width, height, dpr, next);
    const toX = rect.left + nextSky.orb.x + nextSky.orb.size / 2;
    const toY = rect.top + nextSky.orb.y + nextSky.orb.size / 2;

    runTransition({
      next,
      from: { canvas: fromCanvas, x: fromX, y: fromY, size: fromSize },
      to: { canvas: nextSky.orb.canvas, x: toX, y: toY, size: nextSky.orb.size },
      onThemeSwap: () => {
        theme = next;
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {
          // ignore storage failures (private browsing, etc.)
        }
        sky = nextSky;
        plane = null;
        // Ground band (and header ThemeToggle) stay in sync via this event.
        window.dispatchEvent(new CustomEvent("scenery:theme-changed", { detail: { theme: next } }));
      },
      onDone: () => {
        inTransition = false;
        last = performance.now();
        frame(last);
        releaseThemeTransition();
      },
    });
  }

  function drawPlane(now: number) {
    if (theme !== "light" || !sky.plane) return;
    if (!plane) {
      if (now < planeNextAt) return;
      const dir: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
      plane = {
        t0: now,
        from: dir === 1 ? -sky.plane.w : width,
        dir,
        speed: 60 + Math.random() * 40,
        y: sky.orb.y + sky.orb.size * (0.35 + Math.random() * 0.35),
      };
      planeSoundPlayed = false;
    }
    const t = now - plane.t0;
    const x = plane.from + plane.dir * plane.speed * t;
    const planeCenter = x + sky.plane.w / 2;
    const orbCenter = sky.orb.x + sky.orb.size / 2;
    if (!planeSoundPlayed && Math.abs(planeCenter - orbCenter) <= sky.orb.size * 1.25) {
      planeSoundPlayed = true;
      playPlaneSound();
    }
    if (x < -sky.plane.w - 10 || x > width + 10) {
      plane = null;
      planeNextAt = now + 6 + Math.random() * 10;
      return;
    }
    const bob = Math.sin(t * 0.8) * 3;
    skyCtx.save();
    skyCtx.translate(x + sky.plane.w / 2, plane.y + bob + sky.plane.h / 2);
    // Base sprite noses toward -x (left). Flip it so it noses the way it's travelling.
    if (plane.dir > 0) skyCtx.scale(-1, 1);
    skyCtx.drawImage(sky.plane.canvas, -sky.plane.w / 2, -sky.plane.h / 2, sky.plane.w, sky.plane.h);
    skyCtx.restore();
  }

  let last = performance.now();

  function frame(now: number) {
    const dt = clamp((now - last) / 1000, 0, 0.25);
    last = now;
    const t = now / 1000;

    if (!inTransition) {
      skyCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      skyCtx.clearRect(0, 0, width, height);
      const gradientStops = skyGradientStops(theme);
      const gradient = skyCtx.createLinearGradient(0, 0, 0, height);
      gradientStops.forEach(([offset, color]: [number, string]) => gradient.addColorStop(offset, color));
      skyCtx.fillStyle = gradient;
      skyCtx.fillRect(0, 0, width, height);

      if (theme === "dark") {
        for (const star of sky.stars) {
          const twinkle = 0.5 + 0.5 * Math.sin((t / star.period + star.phase) * Math.PI * 2);
          const brightness = star.base + (1 - star.base) * Math.pow(twinkle, 6);
          const tone = STAR_TONES[Math.min(STAR_TONES.length - 1, Math.floor(brightness * STAR_TONES.length))];
          skyCtx.fillStyle = tone;
          skyCtx.fillRect(star.x, star.y, 2, 2);
        }
      }

      const pulse = 0.85 + 0.15 * Math.sin(t * 1.4);
      skyCtx.save();
      skyCtx.globalAlpha = pulse;
      skyCtx.drawImage(sky.orb.glowCanvas, sky.orb.x, sky.orb.y);
      skyCtx.restore();
      skyCtx.drawImage(sky.orb.canvas, sky.orb.x, sky.orb.y);

      for (const cloud of sky.clouds) {
        if (cloud.speed !== 0) {
          const span = width + cloud.w;
          cloud.x =
            ((cloud.x + cloud.speed * dt + cloud.w / 2 + span) % span) - cloud.w / 2;
        }
        for (const layer of cloud.layers.sort((a, b) => a.zIndex - b.zIndex)) {
          skyCtx.fillStyle = layer.color;
          for (let y = 0; y < cloud.h; y++) {
            for (let x = 0; x < cloud.w; x++) {
              let maxIntensity = 0;
              for (const circle of layer.circles) {
                const dx = x - circle.x;
                const dy = (y - circle.y) * 1.25;
                const distance = Math.sqrt(dx * dx + dy * dy) / circle.radius;
                maxIntensity = Math.max(maxIntensity, clamp(1.25 - distance, 0, 1));
              }
              if (maxIntensity <= 0) continue;

              const globalX = Math.floor(cloud.x + x);
              const globalY = Math.floor(cloud.y + y);
              if (globalX < 0 || globalX >= width || globalY < 0 || globalY >= height) continue;
              if (getBayerDither(globalX, globalY, Math.pow(maxIntensity, 1.35))) {
                skyCtx.fillRect(globalX, globalY, 1, 1);
              }
            }
          }
        }
      }

      drawPlane(t);
    }

    if (running) raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
  }
  function onVisibility() {
    if (document.hidden) stop();
    else start();
  }
  function onExternalToggle() {
    if (isThemeTransitionActive()) return;
    toggleTheme();
  }
  function onPointerMove(ev: PointerEvent) {
    const { x, y } = localPoint(ev);
    skyCanvas.style.cursor = hitOrb(x, y) ? "pointer" : "";
  }

  resize();
  const skyResizeObserver = new ResizeObserver(() => resize());
  skyResizeObserver.observe(skyCanvas);
  window.addEventListener("resize", resize);
  window.addEventListener("orientationchange", resize);
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("scenery:toggle-theme", onExternalToggle);
  skyCanvas.addEventListener("click", onSkyClick);
  skyCanvas.addEventListener("pointermove", onPointerMove);

  if (!REDUCED_MOTION) start();
  else frame(performance.now());

  return function destroy() {
    stop();
    skyResizeObserver.disconnect();
    window.removeEventListener("resize", resize);
    window.removeEventListener("orientationchange", resize);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("scenery:toggle-theme", onExternalToggle);
    skyCanvas.removeEventListener("click", onSkyClick);
    skyCanvas.removeEventListener("pointermove", onPointerMove);
  };
}

// Sky gradient stops, top -> horizon, fading to fully transparent at the very
// bottom so the canvas blends into the page background instead of ending in a
// hard rectangle edge.
function skyGradientStops(theme: ThemeName): Array<[number, string]> {
  const colors = SKY_GRADIENT[theme];
  const stops: Array<[number, string]> = colors.map((color, i) => [i / colors.length, color]);
  const last = colors[colors.length - 1];
  stops.push([1, withAlpha(last, 0)]);
  return stops;
}

// ---------------------------------------------------------------------------
// GROUND: dithered mountains, clickable pine trees (scatter birds), wind- and
// cursor-reactive grass. Meant to be mounted as its own full-bleed band near
// the footer — no sky/orb/clouds here, it just listens for theme changes.
// ---------------------------------------------------------------------------

export function mountGround(groundCanvas: HTMLCanvasElement) {
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let theme = readTheme();
  let width = 0;
  let height = 0;
  let terrain: Terrain = null as unknown as Terrain;
  let snowOverlay: HTMLCanvasElement | null = null;

  const groundCtx = groundCanvas.getContext("2d")!;
  const birds: Bird[] = [];
  const pebbles: Pebble[] = [];
  const pointer: PointerState = { x: 0, y: 0, on: false, vx: 0, at: 0 };

  let running = false;
  let raf = 0;

  function buildSnow(t: Terrain, currentTheme: ThemeName): HTMLCanvasElement | null {
    if (currentTheme !== "dark") return null;
    const canvas = document.createElement("canvas");
    canvas.width = t.canvas.width;
    canvas.height = t.canvas.height;
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#e9e6df";
    const cols = Math.ceil(width / STEP);
    for (let cx = 0; cx < cols; cx++) {
      const top = t.ridgeAt(cx * STEP);
      for (let row = 0; row < 3; row++) {
        const y = top + row * STEP;
        const coverage = 0.85 - row * 0.3;
        if (ditherTest(cx, row, coverage)) ctx.fillRect(cx * STEP, y, STEP, STEP);
      }
    }
    return canvas;
  }

  function rebuildScene() {
    terrain = buildTerrain(width, height, dpr, theme);
    snowOverlay = buildSnow(terrain, theme);
  }

  function resize() {
    const w = groundCanvas.clientWidth;
    const h = groundCanvas.clientHeight;
    if (!w || !h) return;
    if (w === width && h === height) return;
    width = w;
    height = h;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    groundCanvas.width = Math.round(w * dpr);
    groundCanvas.height = Math.round(h * dpr);
    rebuildScene();
  }

  function localPoint(ev: PointerEvent) {
    const rect = groundCanvas.getBoundingClientRect();
    return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
  }

  function hitPine(x: number, y: number): Pine | null {
    for (const pine of terrain.pines) {
      if (x >= pine.x - pine.width && x <= pine.x + pine.width && y >= pine.topY - 8 && y <= pine.baseY + 4) {
        return pine;
      }
    }
    return null;
  }

  function onGroundClick(ev: PointerEvent) {
    const { x, y } = localPoint(ev);
    const pine = hitPine(x, y);
    if (pine) {
      pine.swayVelocity += 2.4;
      birds.push(...spawnBirdBurst({ x: pine.x, y: pine.topY, w: pine.width }, performance.now() / 1000, Date.now()));
      playBirdFlightSound();
      return;
    }
    if (snowOverlay) {
      const ctx = snowOverlay.getContext("2d")!;
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      for (let i = 0; i < 5; i++) {
        pebbles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 60,
          vy: -Math.random() * 40,
          t0: performance.now() / 1000,
          life: 0.8 + Math.random() * 0.6,
          tone: GRASS_TONES.dark[2],
        });
      }
    }
  }

  function onPointerMove(ev: PointerEvent) {
    const { x, y } = localPoint(ev);
    const now = performance.now();
    if (pointer.on) {
      const dt = now - pointer.at;
      if (dt > 0) {
        const instantVx = ((x - pointer.x) / dt) * 1000;
        pointer.vx = pointer.vx * 0.4 + instantVx * 0.6;
      }
    }
    pointer.x = x;
    pointer.y = y;
    pointer.at = now;
    pointer.on = true;
  }
  function onPointerLeave() {
    pointer.on = false;
    pointer.vx = 0;
  }

  function onThemeChanged(ev: Event) {
    const detail = (ev as CustomEvent<{ theme: ThemeName }>).detail;
    if (!detail?.theme || detail.theme === theme) return;
    theme = detail.theme;
    rebuildScene();
  }

  function updatePines(dt: number) {
    for (const pine of terrain.pines) {
      pine.swayVelocity += (pine.swayTarget - pine.sway) * 40 * dt;
      pine.swayVelocity *= Math.exp(-dt * 3);
      pine.sway += pine.swayVelocity * dt;
    }
  }

  function drawPines() {
    for (const pine of terrain.pines) {
      const spriteW = pine.sprite.width / dpr;
      const rowH = STEP;
      for (let r = 0; r < pine.rows; r++) {
        const t = 1 - r / (pine.rows - 1);
        const offset = Math.round(pine.sway * t * t);
        groundCtx.drawImage(
          pine.sprite,
          0,
          r * rowH * dpr,
          pine.sprite.width,
          rowH * dpr,
          pine.x - spriteW / 2 + offset,
          pine.topY + r * rowH,
          spriteW,
          rowH,
        );
      }
    }
  }

  function drawGrass(now: number) {
    const tones = GRASS_TONES[theme];
    for (const blade of terrain.grass) {
      let target = Math.sin(now * 0.6 + blade.phase) * 1.2;
      if (pointer.on) {
        const dx = blade.x - pointer.x;
        const dy = blade.baseY - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 90;
        if (dist < radius) {
          const influence = 1 - dist / radius;
          target += clamp(pointer.vx / 240, -3, 3) * influence * influence;
        }
      }
      blade.lean += (target - blade.lean) * 0.08;
      const tone = tones[Math.floor((blade.x / 7) % tones.length)];
      groundCtx.fillStyle = tone;
      const segments = Math.max(2, Math.round(blade.height / STEP));
      for (let s = 0; s < segments; s++) {
        const t = s / (segments - 1);
        const lean = Math.round(blade.lean * t * t);
        groundCtx.fillRect(blade.x + lean, blade.baseY - s * STEP, STEP, STEP);
      }
    }
  }

  function drawPebbles(now: number) {
    for (let i = pebbles.length - 1; i >= 0; i--) {
      const p = pebbles[i];
      const t = now - p.t0;
      if (t > p.life) {
        pebbles.splice(i, 1);
        continue;
      }
      const x = p.x + p.vx * t;
      const y = p.y + p.vy * t + 160 * t * t;
      groundCtx.fillStyle = p.tone;
      groundCtx.fillRect(Math.round(x / STEP) * STEP, Math.round(y / STEP) * STEP, STEP, STEP);
    }
  }

  let last = performance.now();

  function frame(now: number) {
    const dt = clamp((now - last) / 1000, 0, 0.25);
    last = now;
    const t = now / 1000;

    updatePines(dt);
    groundCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    groundCtx.clearRect(0, 0, width, height);
    groundCtx.drawImage(terrain.canvas, 0, 0, width, height);
    if (snowOverlay) groundCtx.drawImage(snowOverlay, 0, 0, width, height);
    drawPines();
    drawGrass(t);
    drawPebbles(t);
    drawBirds(groundCtx, birds, t, STEP, theme === "light" ? "#3a3630" : "#c9c3b6");

    if (running) raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
  }
  function onVisibility() {
    if (document.hidden) stop();
    else start();
  }

  resize();
  const groundResizeObserver = new ResizeObserver(() => resize());
  groundResizeObserver.observe(groundCanvas);
  window.addEventListener("resize", resize);
  window.addEventListener("orientationchange", resize);
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("scenery:theme-changed", onThemeChanged);
  groundCanvas.addEventListener("pointermove", onPointerMove);
  groundCanvas.addEventListener("pointerleave", onPointerLeave);
  groundCanvas.addEventListener("click", onGroundClick);

  if (!REDUCED_MOTION) start();
  else frame(performance.now());

  return function destroy() {
    stop();
    groundResizeObserver.disconnect();
    window.removeEventListener("resize", resize);
    window.removeEventListener("orientationchange", resize);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("scenery:theme-changed", onThemeChanged);
    groundCanvas.removeEventListener("pointermove", onPointerMove);
    groundCanvas.removeEventListener("pointerleave", onPointerLeave);
    groundCanvas.removeEventListener("click", onGroundClick);
  };
}
