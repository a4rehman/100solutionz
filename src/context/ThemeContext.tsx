"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeToDocument(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  } else {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [, startTransition] = useTransition();

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      let initialTheme: Theme = "dark";
      if (savedTheme === "light" || savedTheme === "dark") {
        initialTheme = savedTheme;
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
        initialTheme = "light";
      }

      startTransition(() => {
        setThemeState(initialTheme);
      });
      applyThemeToDocument(initialTheme);
    } catch {
      // Fallback if localStorage or media queries fail
      applyThemeToDocument("dark");
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    startTransition(() => {
      setThemeState(newTheme);
    });
    try {
      localStorage.setItem("theme", newTheme);
    } catch {}
    applyThemeToDocument(newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
