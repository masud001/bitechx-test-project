"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') as "light" | "dark" | null : null;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const initial = saved ?? (mediaQuery.matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", initial);
    setTheme(initial);

    const handleChange = () => {
      // Respect user override in localStorage; only change if no saved theme
      const hasOverride = localStorage.getItem('theme');
      if (!hasOverride) {
        const newTheme = mediaQuery.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        setTheme(newTheme);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    // Persist to cookie for SSR to pick up
    document.cookie = `theme=${newTheme}; Path=/; Max-Age=31536000`;
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-foreground px-3 py-2 rounded-lg transition"
      aria-label="Toggle theme"
      title={theme === "light" ? "Switch to dark" : "Switch to light"}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}