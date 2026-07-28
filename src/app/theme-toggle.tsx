"use client";

import { useState } from "react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);
  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
  };
  return <button className="theme-toggle" onClick={toggle} aria-label="Өнгөний горим солих">{light ? "☾" : "☀"}</button>;
}
