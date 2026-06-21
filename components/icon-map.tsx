import {
  Component,
  Network,
  Braces,
  BarChart3,
  BookOpen,
  Beaker,
  Code2,
  Database,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  component: Component,
  network: Network,
  braces: Braces,
  "bar-chart-3": BarChart3,
  "book-open": BookOpen,
  beaker: Beaker,
  code: Code2,
  database: Database,
};

export function resolveIcon(iconName: string): LucideIcon {
  return ICONS[iconName] ?? Sparkles;
}
