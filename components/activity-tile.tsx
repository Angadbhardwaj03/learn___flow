"use client";

import { motion } from "framer-motion";

// Deterministic mock intensities (0-4) for the last 7 weeks. Generated once
// so the heatmap doesn't reshuffle on every render.
const WEEKS = 7;
const DAYS = 7;
const INTENSITY: number[][] = Array.from({ length: WEEKS }, (_, w) =>
  Array.from({ length: DAYS }, (_, d) => {
    const seed = (w * 7 + d * 3) % 11;
    if (seed < 3) return 0;
    if (seed < 6) return 1;
    if (seed < 8) return 2;
    if (seed < 10) return 3;
    return 4;
  })
);

const INTENSITY_COLOR = [
  "bg-ink-700",
  "bg-ember-dim",
  "bg-ember/50",
  "bg-ember/80",
  "bg-ember",
];

export function ActivityTile() {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-tile border border-ink-700 bg-ink-900 p-5"
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-tile opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,138,61,0.35)" }}
      />
      <div className="relative flex items-center justify-between">
        <h3 className="text-sm font-medium text-paper">Study activity</h3>
        <span className="font-mono text-xs text-paper-faint">49 days</span>
      </div>

      <div className="mt-4 flex gap-1.5">
        {INTENSITY.map((week, w) => (
          <div key={w} className="flex flex-col gap-1.5">
            {week.map((level, d) => (
              <motion.div
                key={d}
                className={`h-2.5 w-2.5 rounded-[3px] ${INTENSITY_COLOR[level]}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: (w * DAYS + d) * 0.006,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-paper-dim">
        Most consistent on weekday evenings — your last gap was 4 days ago.
      </p>
    </motion.article>
  );
}
