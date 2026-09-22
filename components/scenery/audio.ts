const audioPath = (filename: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/sounds/${filename}`;

const birdFlightUrl = audioPath("bird-flapping-wings.mp3");
const planeUrl = audioPath("aeroplane-passing-close.mp3");
const transitionUrl = audioPath("woosh-transition.mp3");
const windUrl = audioPath("soft-wind.mp3");

let ambientAudio: HTMLAudioElement | null = null;
let enabled = false;
let audioRequestId = 0;

function playClip(source: string, volume: number, maxDurationMs?: number) {
  if (!enabled || typeof window === "undefined") return;
  const clip = new Audio(source);
  clip.volume = volume;
  void clip.play().catch(() => undefined);
  if (maxDurationMs !== undefined) {
    window.setTimeout(() => {
      clip.pause();
      clip.currentTime = 0;
    }, maxDurationMs);
  }
}

export async function enableAudio() {
  if (typeof window === "undefined") return false;
  const requestId = ++audioRequestId;
  enabled = true;
  if (!ambientAudio) {
    ambientAudio = new Audio(windUrl);
    ambientAudio.loop = true;
    ambientAudio.volume = 0.16;
  }
  await ambientAudio.play().catch(() => undefined);
  if (!enabled || requestId !== audioRequestId) {
    ambientAudio.pause();
    return false;
  }
  window.dispatchEvent(new CustomEvent("audio:state-changed"));
  return true;
}

export function disableAudio() {
  audioRequestId += 1;
  enabled = false;
  ambientAudio?.pause();
  if (ambientAudio) ambientAudio.currentTime = 0;
  window.dispatchEvent(new CustomEvent("audio:state-changed"));
}

export function isAudioEnabled() {
  return enabled;
}

export function playTransitionSound() {
  playClip(transitionUrl, 0.35);
}

export function playBirdFlightSound() {
  playClip(birdFlightUrl, 0.55, 2000);
}

export function playPlaneSound() {
  playClip(planeUrl, 0.12);
}
