"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "./hooks";

interface ScrollContextType {
  scrollToTarget: (targetId: string) => void;
  lenis: Lenis | null;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollToTarget: () => {},
  lenis: null,
});

export const useScroll = () => useContext(ScrollContext);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  const scrollToTarget = (targetId: string) => {
    const cleanId = targetId.replace(/^#/, "");
    const element = document.getElementById(cleanId);
    if (!element) return;

    if (lenisRef.current && !prefersReducedMotion) {
      lenisRef.current.scrollTo(element, {
        offset: -40,
        duration: 1.4,
      });
    } else {
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <ScrollContext.Provider value={{ scrollToTarget, lenis: lenisRef.current }}>
      {children}
    </ScrollContext.Provider>
  );
}
