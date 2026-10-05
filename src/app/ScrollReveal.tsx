"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      "[data-scroll-reveal]",
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.setAttribute("data-revealed", "true"));
      return;
    }

    document.documentElement.dataset.scrollMotion = "ready";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-revealed", "true");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return null;
}
