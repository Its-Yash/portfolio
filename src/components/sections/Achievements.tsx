"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ACHIEVEMENTS, AchievementItem } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

import ContributionSkyline from "@/components/ui/contribution-skyline";

const AgenticFactory3D = dynamic(
  () => import("@/components/ui/agentic-factory-3d"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 flex items-center justify-center font-mono text-xs text-[#77756f] animate-pulse">
        Booting Autonomous Agent Engine...
      </div>
    ),
  }
);

export function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openDemo, setOpenDemo] = useState<"skyline" | "agentic-factory" | null>(null);
  const [hasStartedCount, setHasStartedCount] = useState<boolean[]>(
    new Array(ACHIEVEMENTS.length).fill(false)
  );

  // Lock body scroll and register escape key when modal is open
  useEffect(() => {
    if (openDemo) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpenDemo(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [openDemo]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollable));
      setScrollProgress(progress);

      // Trigger counter for visible cards
      ACHIEVEMENTS.forEach((_, idx) => {
        const triggerPoint = idx / (ACHIEVEMENTS.length + 1);
        if (progress >= triggerPoint * 0.7) {
          setHasStartedCount((prev) => {
            if (prev[idx]) return prev;
            const next = [...prev];
            next[idx] = true;
            return next;
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [maxScrollDistance, setMaxScrollDistance] = useState(0);

  useEffect(() => {
    const updateDistance = () => {
      const track = trackRef.current;
      if (!track) return;
      const distance = Math.max(0, track.scrollWidth - window.innerWidth + 120);
      setMaxScrollDistance(distance);
    };

    updateDistance();
    const t1 = setTimeout(updateDistance, 150);
    const t2 = setTimeout(updateDistance, 600);
    window.addEventListener("resize", updateDistance);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", updateDistance);
    };
  }, []);

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative w-full"
      style={{
        // Viewport height + horizontal travel distance
        height: "460vh",
      }}
      aria-label="Achievements pinned gallery"
    >
      {/* Sticky Viewport Container with proper clearance for fixed header */}
      <div className="sticky top-0 h-[100svh] w-full flex flex-col justify-between overflow-hidden pt-24 pb-8 md:pt-28 md:pb-10">
        
        {/* Header Bar */}
        <div className="section-container w-full">
          <div className="flex items-center justify-between">
            <div>
              <div className="section-tag !mb-1">
                <span>06</span>
                <span>—</span>
                <span>Milestones & Impact</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0d0d0d]">
                Verified <span className="heading-serif-accent">achievements.</span>
              </h2>
            </div>

            {/* Thin Horizontal Scroll Progress Bar */}
            <div className="hidden sm:block w-36 h-[2px] bg-[#0d0d0d]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0d0d0d] transition-all duration-75"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Pinned Horizontal Track */}
        <div className="w-full overflow-hidden my-auto py-8">
          <div
            ref={trackRef}
            className="flex items-center gap-8 px-8 sm:px-16 transition-transform duration-75 ease-out will-change-transform"
            style={{
              transform:
                maxScrollDistance > 0
                  ? `translate3d(-${scrollProgress * maxScrollDistance}px, 0, 0)`
                  : `translateX(-${scrollProgress * 78}%)`,
            }}
          >
            {ACHIEVEMENTS.map((item, index) => {
              return (
                <AchievementCard
                  key={item.index}
                  item={item}
                  shouldCount={hasStartedCount[index]}
                  onOpenDemo={(demo) => setOpenDemo(demo)}
                />
              );
            })}

            {/* Ending Track Card */}
            <div className="shrink-0 w-[300px] sm:w-[340px] min-h-[330px] h-[clamp(320px,44vh,380px)] rounded-[28px] border border-dashed border-[#0d0d0d]/20 bg-[#ffffff]/60 p-8 flex flex-col justify-between">
              <span className="font-mono text-xs text-[#77756f]">FUTURE MILESTONES</span>
              <div>
                <div className="font-serif italic text-2xl text-[#0d0d0d]">
                  and counting →
                </div>
                <p className="mt-2 text-xs text-[#77756f] font-mono leading-relaxed">
                  Continual open source contributions, enterprise architecture deployments, and applied GenAI innovation.
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#0d0d0d] text-[#ffffff] flex items-center justify-center font-mono text-xs">
                ✦
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Hint */}
        <div className="section-container w-full flex items-center justify-between text-xs font-mono text-[#77756f]">
          <span>[ Scroll vertically to navigate gallery ]</span>
          <span>{Math.round(scrollProgress * 100)}% COMPLETE</span>
        </div>

      </div>

      {/* Interactive Modal: 3D Contribution Skyline */}
      {openDemo === "skyline" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="skyline-dialog-title"
          className="fixed inset-0 z-100 bg-[#0d0d0d]/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setOpenDemo(null)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-[28px] bg-[#f4f2ee] border border-[#0d0d0d]/15 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-[#0d0d0d]/10 flex items-center justify-between bg-white/70 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#77756f]">05 / 07</span>
                <h3 id="skyline-dialog-title" className="text-sm font-bold text-[#0d0d0d]">
                  GitHub Contribution Skyline 3D Heatmap
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/demo/skyline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-[#77756f] hover:text-[#0d0d0d] px-3 py-1 rounded-full border border-[#0d0d0d]/10 bg-white"
                >
                  Standalone Page ↗
                </a>
                <button
                  type="button"
                  onClick={() => setOpenDemo(null)}
                  className="w-8 h-8 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center hover:bg-[#3a3a3a] transition-colors cursor-pointer text-xs"
                  aria-label="Close Skyline Dialog"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="overflow-y-auto p-4 sm:p-8 flex-1">
              <ContributionSkyline endDate="2017-11-08" />
            </div>
          </div>
        </div>
      )}

      {/* Interactive Modal: Agentic Factory 3D Pipeline */}
      {openDemo === "agentic-factory" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="factory-dialog-title"
          className="fixed inset-0 z-100 bg-[#0d0d0d]/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setOpenDemo(null)}
        >
          <div
            className="relative w-full max-w-6xl h-[88vh] overflow-hidden rounded-[28px] bg-[#f4f2ee] border border-[#0d0d0d]/15 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-3 border-b border-[#0d0d0d]/10 flex items-center justify-between bg-white/70 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#77756f]">02 / 07</span>
                <h3 id="factory-dialog-title" className="text-sm font-bold text-[#0d0d0d]">
                  Autonomous Agentic Factory 3D Pipeline
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/demo/agentic-factory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-[#77756f] hover:text-[#0d0d0d] px-3 py-1 rounded-full border border-[#0d0d0d]/10 bg-white"
                >
                  Standalone Page ↗
                </a>
                <button
                  type="button"
                  onClick={() => setOpenDemo(null)}
                  className="w-8 h-8 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center hover:bg-[#3a3a3a] transition-colors cursor-pointer text-xs"
                  aria-label="Close Factory Dialog"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="relative w-full flex-1 overflow-hidden">
              <AgenticFactory3D height="100%" showBackButton={false} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function AchievementCard({
  item,
  shouldCount,
  onOpenDemo,
}: {
  item: AchievementItem;
  shouldCount: boolean;
  onOpenDemo: (demo: "skyline" | "agentic-factory") => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (shouldCount) {
      setHasTriggered(true);
      return;
    }

    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldCount]);

  useEffect(() => {
    if (!hasTriggered) return;

    let startTime: number | null = null;
    const duration = 1400; // 1.4s easeOutQuart

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);

      // easeOutQuart: 1 - (1 - t)^4
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(ease * item.numberValue);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(item.numberValue);
      }
    };

    requestAnimationFrame(step);
  }, [hasTriggered, item.numberValue]);

  // Clean suffix rendering: avoid awkward "0nd" or intermediate "1nd" before reaching target
  const isOrdinal = ["st", "nd", "rd", "th"].includes(item.numberSuffix || "");
  const suffixToDisplay = isOrdinal && displayValue !== item.numberValue ? "" : item.numberSuffix || "";

  const isAgenticCard = item.index === "02 / 07";
  const isOpenSourceCard = item.index === "05 / 07";

  return (
    <div
      ref={cardRef}
      className="shrink-0 w-[clamp(360px,42vw,560px)] min-h-[330px] h-[clamp(320px,44vh,380px)] rounded-[28px] bg-[#ffffff] p-6 sm:p-8 flex flex-col justify-between relative shadow-[0_12px_40px_rgba(13,13,13,0.06)] hover:-translate-y-3 transition-all duration-400 select-none"
    >
      {/* Top Row: 72px Logo Tile with Brand Glow + Index */}
      <div className="flex items-center justify-between">
        <div className="w-[72px] h-[72px] rounded-2xl bg-[#f4f2ee] border border-[#0d0d0d]/10 flex items-center justify-center shadow-xs">
          <TechLogo name={item.logoKey} size={36} glow={true} />
        </div>
        <span className="font-mono text-xs font-semibold text-[#77756f]">
          {item.index}
        </span>
      </div>

      {/* Bottom Content Split */}
      <div className="flex items-end justify-between gap-4 mt-auto">
        {/* Bottom Left: Label, Caption, Detail & Interactive triggers */}
        <div className="max-w-[62%]">
          <div className="font-bold text-lg sm:text-xl tracking-tight text-[#0d0d0d] leading-snug">
            {item.label}
          </div>
          <div className="font-mono text-xs text-[#77756f] mt-1 font-medium">
            {item.caption}
          </div>
          <p className="text-[11px] text-[#3a3a3a] mt-2 line-clamp-2 leading-relaxed">
            {item.detail}
          </p>

          {/* Interactive Component Triggers with High Emphasis & Visual Previews */}
          {isAgenticCard && (
            <div className="mt-4 pt-2.5 border-t border-[#0d0d0d]/10 flex flex-col gap-2">
              <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-[#f4f2ee] border border-[#0d0d0d]/5 font-mono text-[9px] text-[#77756f]">
                <span className="flex items-center gap-1.5 text-[#0d0d0d] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d] animate-pulse" />
                  3D Procedural Machine
                </span>
                <span>5 Stations // WebGL</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenDemo("agentic-factory")}
                  className="flex-1 inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0d0d0d] text-[#ffffff] text-xs font-mono font-medium hover:bg-[#262626] transition-all shadow-md hover:shadow-lg cursor-pointer group/btn"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#f4f2ee] animate-ping" />
                    <span>✦ Launch 3D Machine</span>
                  </span>
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>
                <a
                  href="/demo/agentic-factory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 rounded-xl border border-[#0d0d0d]/15 text-[#77756f] text-xs font-mono hover:text-[#0d0d0d] hover:border-[#0d0d0d]/40 transition-colors"
                  title="Open full page in new tab"
                >
                  Full ↗
                </a>
              </div>
            </div>
          )}

          {isOpenSourceCard && (
            <div className="mt-4 pt-2.5 border-t border-[#0d0d0d]/10 flex flex-col gap-2">
              {/* Mini 3D Isometric Contribution Grid Preview */}
              <div className="flex items-end gap-1 h-6 px-2.5 py-1 rounded-lg bg-[#f4f2ee] border border-[#0d0d0d]/5">
                <div className="w-1.5 h-2 bg-[#0d0d0d]/20 rounded-xs" />
                <div className="w-1.5 h-3 bg-[#0d0d0d]/40 rounded-xs" />
                <div className="w-1.5 h-5 bg-[#10b981] rounded-xs shadow-xs" />
                <div className="w-1.5 h-4 bg-[#0d0d0d]/50 rounded-xs" />
                <div className="w-1.5 h-2.5 bg-[#0d0d0d]/20 rounded-xs" />
                <div className="w-1.5 h-5.5 bg-[#10b981] rounded-xs shadow-xs" />
                <div className="w-1.5 h-3.5 bg-[#0d0d0d]/30 rounded-xs" />
                <span className="ml-auto font-mono text-[9px] text-[#77756f]">3D Skyline Heatmap</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenDemo("skyline")}
                  className="flex-1 inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0d0d0d] text-[#ffffff] text-xs font-mono font-medium hover:bg-[#262626] transition-all shadow-md hover:shadow-lg cursor-pointer group/btn"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                    <span>✦ Launch 3D Skyline</span>
                  </span>
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>
                <a
                  href="/demo/skyline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 rounded-xl border border-[#0d0d0d]/15 text-[#77756f] text-xs font-mono hover:text-[#0d0d0d] hover:border-[#0d0d0d]/40 transition-colors"
                  title="Open full page in new tab"
                >
                  Full ↗
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Right: Huge Counter Number */}
        <div className="text-right shrink-0">
          <div className="font-mono text-4xl sm:text-6xl font-bold tracking-tighter text-[#0d0d0d] leading-none">
            {item.numberPrefix}
            {hasTriggered ? displayValue : item.numberValue}
            {hasTriggered ? suffixToDisplay : item.numberSuffix}
          </div>
          <div className="font-mono text-[9px] uppercase tracking-wider text-[#77756f] mt-1">
            {item.platformOrOrg}
          </div>
        </div>
      </div>
    </div>
  );
}
