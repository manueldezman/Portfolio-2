import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--background)",
        accent: "var(--accent)",
        cream: "var(--text)",
        sand: "var(--muted)",
        cyan: "var(--teal)",
        coal: "var(--surface)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Consolas", "Liberation Mono", "monospace"],
      },
      boxShadow: {
        glow:
          "0 0 0 1px rgba(34, 211, 238, 0.16), 0 24px 80px rgba(0, 0, 0, 0.34)",
      },
    },
  },
  plugins: [],
};

export default config;
