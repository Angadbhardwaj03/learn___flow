"use client";

import { motion } from "framer-motion";

interface HeroTileProps {
  name: string;
  streakDays: number;
}

// A heartbeat-style path. Each spike corresponds to a day of consistent
// study — the metaphor a "streak" actually deserves, rather than a stat
// block with an up-arrow.
const PULSE_PATH =
  "M0,40 L40,40 L55,40 L65,10 L75,70 L85,20 L95,40 L140,40 L150,40 L160,12 L170,68 L180,22 L190,40 L260,40 L270,40 L280,8 L290,72 L300,18 L310,40 L400,40";

export function HeroTile({ name, streakDays }: HeroTileProps) {
  return (
    <motion.article
      className="group relative col-span-full overflow-hidden rounded-tile border border-ink-700 bg-ink-900 p-6 sm:p-8 md:row-span-1 md:col-span-2"
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-tile opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(139,127,255,0.35)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-ember/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-violet/10 blur-3xl"
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper-faint">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            Welcome back, {name}
          </h1>
          <p className="mt-2 max-w-md text-sm text-paper-dim">
            Pick up where you left off — three courses are waiting for their
            next rep.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start rounded-2xl border border-ink-700 bg-ink-800/80 px-4 py-3 sm:self-end">
          <div className="font-mono text-2xl font-semibold text-ember">
            {streakDays}
          </div>
          <div className="text-xs leading-tight text-paper-dim">
            day
            <br />
            streak
          </div>
        </div>
      </div>

      <div className="relative mt-8 h-16 w-full">
        <svg
          viewBox="0 0 400 80"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <motion.path
            d={PULSE_PATH}
            fill="none"
            stroke="url(#pulse-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
          />
          <defs>
            <linearGradient id="pulse-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF8A3D" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#FF8A3D" stopOpacity="1" />
              <stop offset="100%" stopColor="#8B7FFF" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.article>
  );
}
