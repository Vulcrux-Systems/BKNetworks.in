"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-all duration-300 border border-accent/20"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 animate-fade-in" />
      ) : (
        <Moon className="w-5 h-5 animate-fade-in" />
      )}
    </button>
  );
}
