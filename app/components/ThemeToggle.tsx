"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  // Prevent hydration mismatch
  if (!resolvedTheme) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-full border dark:border-zinc-700"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
