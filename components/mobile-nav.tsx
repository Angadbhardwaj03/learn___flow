"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, BookMarked, Flame, Settings } from "lucide-react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "courses", label: "Courses", icon: BookMarked },
  { id: "streaks", label: "Streaks", icon: Flame },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

export function MobileNav() {
  const [active, setActive] = useState<string>("overview");

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-around border-t border-ink-700 bg-ink-900/90 px-2 py-2 backdrop-blur-md md:hidden"
    >
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setActive(id)}
            aria-current={isActive ? "page" : undefined}
            className="relative flex flex-col items-center gap-1 px-3 py-1.5"
          >
            {isActive && (
              <motion.span
                layoutId="mobile-nav-active"
                className="absolute -top-2 h-1 w-6 rounded-full bg-ember"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <Icon
              className={`h-5 w-5 ${isActive ? "text-paper" : "text-paper-dim"}`}
            />
            <span
              className={`text-[10px] ${isActive ? "text-paper" : "text-paper-dim"}`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
