"use client";

import { useEffect, useRef } from "react";
import { mountSky, mountGround } from "./scenery/engine";

export function SkyScenery({ height = 350 }: { height?: number }) {
  const skyRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const sky = skyRef.current;
    if (!sky) return;
    return mountSky(sky);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="full-bleed-breakout sky-scenery"
      style={{ height, overflow: "hidden" }}
    >
      <canvas
        data-scenery=""
        data-sky=""
        ref={skyRef}
        style={{
          position: "absolute",
          inset: 0,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "fill", // Maps the internal pixel grid to the container bounds
          display: "block",
        }}
      />
    </div>
  );
}

export function GroundScenery({ height = 220 }: { height?: number }) {
  const groundRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ground = groundRef.current;
    if (!ground) return;
    return mountGround(ground);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="full-bleed-breakout ground-scenery"
      style={{ height, overflow: "hidden" }}
    >
      <canvas
        data-ground=""
        ref={groundRef}
        style={{
          position: "absolute",
          inset: 0,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "fill",
          display: "block",
        }}
      />
    </div>
  );
}
