"use client";

import { useState } from "react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);
  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
  };
  return <button className="size-[38px] cursor-pointer rounded-full border border-[#263452] bg-transparent text-lg text-inherit in-data-[theme=light]:border-[#ccd5e2]" onClick={toggle} aria-label="Өнгөний горим солих">{light ? "☾" : "☀"}</button>;
}
