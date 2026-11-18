"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";

type BeforeAfterSliderProps = {
  afterAlt: string;
  afterSrc: string;
  beforeAlt: string;
  beforeSrc: string;
  className?: string;
};

const MIN = 0;
const MAX = 100;
const KEYBOARD_STEP = 2;

function clamp(value: number) {
  return Math.min(MAX, Math.max(MIN, value));
}

export function BeforeAfterSlider({
  afterAlt,
  afterSrc,
  beforeAlt,
  beforeSrc,
  className,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pendingClientXRef = useRef<number | null>(null);
  const captionId = useId();
  const [split, setSplit] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0) return;

    setSplit(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const scheduleUpdate = useCallback(
    (clientX: number) => {
      pendingClientXRef.current = clientX;

      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        const pendingClientX = pendingClientXRef.current;
        if (pendingClientX === null) return;

        pendingClientXRef.current = null;
        updateFromClientX(pendingClientX);
      });
    },
    [updateFromClientX],
  );

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!dragging) return;

    function handleMouseMove(event: MouseEvent) {
      event.preventDefault();

      if (event.buttons === 0) {
        setDragging(false);
        return;
      }

      scheduleUpdate(event.clientX);
    }

    function handleMouseUp(event: MouseEvent) {
      updateFromClientX(event.clientX);
      setDragging(false);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, scheduleUpdate, updateFromClientX]);

  function handleMouseDown(event: ReactMouseEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    event.preventDefault();
    containerRef.current?.focus({ preventScroll: true });
    setDragging(true);
    updateFromClientX(event.clientX);
  }

  function handleMouseMove(event: ReactMouseEvent<HTMLDivElement>) {
    if (!dragging) return;
    scheduleUpdate(event.clientX);
  }

  function handleMouseUp(event: ReactMouseEvent<HTMLDivElement>) {
    if (!dragging) return;
    updateFromClientX(event.clientX);
    setDragging(false);
  }

  function handleTouchStart(event: ReactTouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    if (!touch) return;

    setDragging(true);
    updateFromClientX(touch.clientX);
  }

  function handleTouchMove(event: ReactTouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    if (!touch) return;

    scheduleUpdate(touch.clientX);
  }

  function handleTouchEnd(event: ReactTouchEvent<HTMLDivElement>) {
    const touch = event.changedTouches[0];
    if (touch) {
      updateFromClientX(touch.clientX);
    }
    setDragging(false);
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setSplit((current) => clamp(current - KEYBOARD_STEP));
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setSplit((current) => clamp(current + KEYBOARD_STEP));
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setSplit(MIN);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setSplit(MAX);
    }
  }

  const roundedSplit = Math.round(split);

  return (
    <figure className={className}>
      <div aria-hidden="true" className="mb-2 flex items-center justify-between">
        <span className="rounded-full bg-[var(--surface-strong)] px-2.5 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[var(--background)]">
          Before
        </span>
        <span className="rounded-full bg-[var(--surface-strong)] px-2.5 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[var(--background)]">
          After
        </span>
      </div>
      <div
        aria-describedby={captionId}
        aria-label="Before and after comparison"
        aria-orientation="horizontal"
        aria-valuemax={MAX}
        aria-valuemin={MIN}
        aria-valuenow={roundedSplit}
        aria-valuetext={`${roundedSplit}% before, ${100 - roundedSplit}% after`}
        className={[
          "relative w-full cursor-ew-resize touch-none select-none rounded-xl",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        ].join(" ")}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchCancel={handleTouchEnd}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        ref={containerRef}
        role="slider"
        tabIndex={0}
      >
        <div className="relative aspect-[640/413] w-full overflow-hidden rounded-xl bg-[var(--surface)] ring-1 ring-[var(--rule-soft)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={afterAlt}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
            decoding="async"
            draggable={false}
            height={413}
            onDragStart={(event) => event.preventDefault()}
            src={afterSrc}
            width={640}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={beforeAlt}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
            decoding="async"
            draggable={false}
            height={413}
            onDragStart={(event) => event.preventDefault()}
            src={beforeSrc}
            style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
            width={640}
          />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-10"
          style={{ left: `${split}%` }}
        >
          <div className="absolute inset-y-0 w-px -translate-x-1/2 bg-white/95 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
          <div className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-0.5 rounded-full bg-white text-neutral-900 shadow-[0_4px_18px_rgba(0,0,0,0.35)] ring-1 ring-black/10">
            <ChevronLeft aria-hidden="true" size={16} strokeWidth={2.5} />
            <ChevronRight aria-hidden="true" size={16} strokeWidth={2.5} />
          </div>
        </div>
      </div>
      <figcaption
        className="mt-2 text-center font-mono text-xs text-[var(--muted)]"
        id={captionId}
      >
        Drag to compare the AFDocs scorecards before and after the fixes.
      </figcaption>
    </figure>
  );
}
