"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function AdminThemeToggle({ className }: { className: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem("admin-theme");
    const next: Theme = saved === "light" ? "light" : "dark";
    document.querySelector(".admin-root")?.setAttribute("data-theme", next);
    setTheme(next);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.querySelector(".admin-root")?.setAttribute("data-theme", next);
    window.localStorage.setItem("admin-theme", next);
    setTheme(next);
  };

  const nextLabel = theme === "dark" ? "Гэрэлтэй горимд шилжих" : "Харанхуй горимд шилжих";

  return (
    <button
      type="button"
      onClick={toggle}
      className={className}
      aria-label={nextLabel}
      title={nextLabel}
    >
      <span className="material-symbols-outlined" aria-hidden="true">
        {theme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
