"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis: import("lenis").default | undefined;
    let frame = 0;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);
  return null;
}
