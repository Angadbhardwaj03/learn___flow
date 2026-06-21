import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A0A0E",
          900: "#0F0F14",
          800: "#15151C",
          700: "#1C1C25",
          600: "#26262F",
        },
        paper: {
          DEFAULT: "#F2F1ED",
          dim: "#A8A8B3",
          faint: "#6B6B76",
        },
        ember: {
          DEFAULT: "#FF8A3D",
          soft: "#FFB37A",
          dim: "#7A4420",
        },
        violet: {
          DEFAULT: "#8B7FFF",
          soft: "#B3ABFF",
          dim: "#403A7A",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        tile: "20px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,138,61,0.15), 0 8px 30px -8px rgba(255,138,61,0.25)",
        "glow-violet": "0 0 0 1px rgba(139,127,255,0.15), 0 8px 30px -8px rgba(139,127,255,0.25)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        shimmer: "shimmer 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
