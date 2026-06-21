"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  BookMarked,
  Flame,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import clsx from "clsx";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "courses", label: "Courses", icon: BookMarked },
  { id: "streaks", label: "Streaks", icon: Flame },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState<string>("overview");

  return (
    <nav
      aria-label="Primary"
      className={clsx(
        "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-ink-700 bg-ink-900/60 backdrop-blur-sm transition-[width] duration-300 ease-out md:flex",
        // Tablet (md–lg, 768–1024px) is always icon-only per spec.
        // Desktop (lg+) respects the manual collapse toggle.
        "w-[76px]",
        !collapsed && "lg:w-[220px]"
      )}
    >
      <div className="flex items-center gap-2 px-5 py-6">
        <div className="h-7 w-7 shrink-0 rounded-md bg-gradient-to-br from-ember to-violet" />
        {!collapsed && (
          <span className="hidden font-mono text-sm tracking-tight text-paper lg:inline">
            learnflow
          </span>
        )}
      </div>

      <ul className="flex flex-1 flex-col gap-1 px-3">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <li key={id} className="relative">
              <button
                type="button"
                onClick={() => setActive(id)}
                aria-current={isActive ? "page" : undefined}
                className={clsx(
                  "relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  isActive ? "text-paper" : "text-paper-dim hover:text-paper"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-ink-700"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 h-4 w-4 shrink-0" />
                {!collapsed && (
                  <span className="relative z-10 hidden lg:inline">{label}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => setCollapsed((v) => !v)}
        className="m-3 hidden items-center justify-center gap-2 rounded-xl border border-ink-700 px-3 py-2 text-xs text-paper-dim transition-colors hover:text-paper lg:flex"
      >
        {collapsed ? (
          <PanelLeftOpen className="h-4 w-4" />
        ) : (
          <>
            <PanelLeftClose className="h-4 w-4" />
            Collapse
          </>
        )}
      </button>
    </nav>
  );
}
