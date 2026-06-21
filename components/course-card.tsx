"use client";

import { motion } from "framer-motion";
import type { Course } from "@/lib/types";
import { resolveIcon } from "@/components/icon-map";

export function CourseCard({ course }: { course: Course }) {
  const Icon = resolveIcon(course.icon_name);

  return (
    <motion.article
      className="group grain relative overflow-hidden rounded-tile border border-ink-700 bg-ink-900 p-5"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Border glow reveal — pure opacity, no layout/paint cost beyond the layer itself */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-tile opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 100% at 0% 0%, rgba(255,138,61,0.12), transparent 60%)",
          boxShadow: "inset 0 0 0 1px rgba(255,138,61,0.35)",
        }}
      />

      <div className="relative flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-700 text-ember">
          <Icon className="h-[18px] w-[18px]" />
        </div>
        <span className="font-mono text-xs text-paper-faint">
          {course.progress}%
        </span>
      </div>

      <h3 className="relative mt-4 text-sm font-medium leading-snug text-paper">
        {course.title}
      </h3>

      <div className="relative mt-4 h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
        <motion.div
          className="h-full w-full origin-left rounded-full bg-gradient-to-r from-ember to-violet"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: course.progress / 100 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        />
      </div>
    </motion.article>
  );
}


