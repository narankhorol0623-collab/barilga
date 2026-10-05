"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const THEME_CHANGE_EVENT = "admin-theme-change";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, callback);
}

function getSnapshot(): Theme {
  return window.localStorage.getItem("admin-theme") === "light"
    ? "light"
    : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export default function AdminThemeToggle({ className }: { className: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document
      .querySelector(".admin-root")
      ?.setAttribute("data-theme", getSnapshot());
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.querySelector(".admin-root")?.setAttribute("data-theme", next);
    window.localStorage.setItem("admin-theme", next);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  const nextLabel =
    theme === "dark" ? "Гэрэлтэй горимд шилжих" : "Харанхуй горимд шилжих";

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
