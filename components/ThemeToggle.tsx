"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { isThemeTransitionActive } from "./scenery/transition";

type Theme = "light" | "dark";

const DEFAULT_THEME: Theme = "dark";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  const storedTheme = window.localStorage.getItem("theme");

  return storedTheme === "light" || storedTheme === "dark" ? storedTheme : DEFAULT_THEME;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  useEffect(() => {
    // Keep the icon in sync when the scenery engine swaps the theme mid-transition
    // (clicking the sun/moon orb directly, rather than this button).
    function onSceneryChange(ev: Event) {
      const detail = (ev as CustomEvent<{ theme: Theme }>).detail;
      if (detail?.theme) setTheme(detail.theme);
    }
    window.addEventListener("scenery:theme-changed", onSceneryChange);
    return () => window.removeEventListener("scenery:theme-changed", onSceneryChange);
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";
  const Icon = theme === "dark" ? Sun : Moon;

  function handleClick() {
    if (isThemeTransitionActive()) return;
    // The scenery engine owns every theme change so the orb and page always
    // use the same animated transition and sprite lifecycle.
    window.dispatchEvent(new CustomEvent("scenery:toggle-theme"));
  }

  return (
    <button
      aria-label={`Switch to ${nextTheme} mode`}
      className="nav-item"
      onClick={handleClick}
      type="button"
    >
      <Icon size={19} />
      <span className="nav-tooltip">{nextTheme}</span>
    </button>
  );
}
