"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  DESIGN_STYLES,
  DESIGN_CATEGORIES,
  DesignStyle,
  DesignCategory,
} from "@/lib/design-styles";

export function DesignLab() {
  const [selectedStyleId, setSelectedStyleId] = useState<string>("claymorphism");
  const [activeCategory, setActiveCategory] = useState<DesignCategory>("All");
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [toggleActive, setToggleActive] = useState<boolean>(true);
  const [actionCount, setActionCount] = useState<number>(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Filtered styles by category
  const filteredStyles = useMemo(() => {
    if (activeCategory === "All") return DESIGN_STYLES;
    return DESIGN_STYLES.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const activeStyle = useMemo(() => {
    return (
      DESIGN_STYLES.find((s) => s.id === selectedStyleId) || DESIGN_STYLES[0]
    );
  }, [selectedStyleId]);

  const currentIndex = DESIGN_STYLES.findIndex(
    (s) => s.id === selectedStyleId
  );

  // Step next/prev handlers
  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % DESIGN_STYLES.length;
    setSelectedStyleId(DESIGN_STYLES[nextIdx].id);
  };

  const handlePrev = () => {
    const prevIdx =
      (currentIndex - 1 + DESIGN_STYLES.length) % DESIGN_STYLES.length;
    setSelectedStyleId(DESIGN_STYLES[prevIdx].id);
  };

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Auto-tour timer
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        setSelectedStyleId((prevId) => {
          const idx = DESIGN_STYLES.findIndex((s) => s.id === prevId);
          return DESIGN_STYLES[(idx + 1) % DESIGN_STYLES.length].id;
        });
      }, 3500);
    } else {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying]);

  // Copy CSS snippet handler
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(activeStyle.cssSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section
      id="design-lab"
      aria-label="Design System Lab"
      className="relative w-full py-24 sm:py-32 border-t border-[#0d0d0d]/10 bg-[#f4f2ee] overflow-hidden"
    >
      {/* Background architectural grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0d0d0d 1px, transparent 1px), linear-gradient(to bottom, #0d0d0d 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="section-container relative z-10 max-w-[1320px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs tracking-wider text-[#77756f] uppercase">
                // 04 · Interactive Laboratory
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d] animate-pulse" />
              <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-[#0d0d0d]/5 text-[#77756f] border border-[#0d0d0d]/10">
                22 Visual Archetypes
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0d0d0d] leading-[1.05]">
              Aesthetic <span className="font-serif italic font-normal text-[#77756f]">Matrix.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#77756f] leading-relaxed">
              Explore 22 iconic design movements translated into pure,
              mathematical CSS rules. Select any style below to watch the
              system artifact dynamically morph while strictly adhering to our
              monochromatic palette.
            </p>
          </div>

          {/* Quick Controls: Tour, Prev, Next */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full font-mono text-xs font-medium border transition-all cursor-pointer ${
                isAutoPlaying
                  ? "bg-[#0d0d0d] text-[#f4f2ee] border-[#0d0d0d]"
                  : "bg-white text-[#0d0d0d] border-[#0d0d0d]/15 hover:border-[#0d0d0d]/40 shadow-xs"
              }`}
              title="Automatically cycle through all 22 design styles"
            >
              <span>{isAutoPlaying ? "❚❚ Pause Tour" : "▷ Auto Tour"}</span>
              {isAutoPlaying && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
              )}
            </button>

            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Style (or Arrow Left)"
              className="w-9 h-9 rounded-full bg-white border border-[#0d0d0d]/15 flex items-center justify-center text-xs font-mono text-[#0d0d0d] hover:border-[#0d0d0d]/40 transition-colors cursor-pointer shadow-xs"
              title="Previous Style (← ArrowLeft)"
            >
              ←
            </button>

            <div className="font-mono text-xs text-[#77756f] px-1 select-none">
              <span className="text-[#0d0d0d] font-bold">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              {" / "}
              <span>{String(DESIGN_STYLES.length).padStart(2, "0")}</span>
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Style (or Arrow Right)"
              className="w-9 h-9 rounded-full bg-white border border-[#0d0d0d]/15 flex items-center justify-center text-xs font-mono text-[#0d0d0d] hover:border-[#0d0d0d]/40 transition-colors cursor-pointer shadow-xs"
              title="Next Style (→ ArrowRight)"
            >
              →
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
          {DESIGN_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[#0d0d0d] text-white font-medium shadow-xs"
                  : "bg-white/80 text-[#77756f] border border-[#0d0d0d]/10 hover:text-[#0d0d0d] hover:border-[#0d0d0d]/30"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 opacity-60 text-[10px]">
                  ({DESIGN_STYLES.filter((s) => s.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Style Selector Rail / Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 scrollbar-thin scrollbar-thumb-[#0d0d0d]/15">
          {filteredStyles.map((style, i) => {
            const isSelected = style.id === selectedStyleId;
            return (
              <button
                key={style.id}
                data-style-id={style.id}
                type="button"
                onClick={() => {
                  setSelectedStyleId(style.id);
                  if (isAutoPlaying) setIsAutoPlaying(false);
                }}
                className={`group px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer shrink-0 border flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#0d0d0d] text-white border-[#0d0d0d] shadow-md scale-[1.02]"
                    : "bg-white text-[#77756f] border-[#0d0d0d]/10 hover:border-[#0d0d0d]/30 hover:text-[#0d0d0d]"
                }`}
              >
                <span className={`text-[10px] ${isSelected ? "text-white/60" : "text-[#77756f]/60"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-medium whitespace-nowrap">{style.name}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage: 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Cols 1-7): The Live Morphing Artifact Card */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="mb-3 flex items-center justify-between font-mono text-xs text-[#77756f]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span>LIVE SYSTEM ARTIFACT</span>
              </span>
              <span>STATE: {activeStyle.name.toUpperCase()}</span>
            </div>

            {/* The Live Interactive Artifact Box */}
            <div className="relative min-h-[460px] sm:min-h-[500px] flex items-center justify-center p-4 sm:p-8 bg-[#eae7e1]/40 rounded-3xl border border-[#0d0d0d]/10 overflow-hidden">
              {/* Background ambient lighting for surreal/ethereal modes */}
              {activeStyle.id === "ethereal" && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none flex items-center justify-center animate-pulse duration-1000"
                >
                  <div className="w-[360px] h-[360px] rounded-full bg-white/70 blur-3xl" />
                </div>
              )}

              {/* Dynamic Styled Component based on Active Style */}
              <div
                className={`relative w-full max-w-lg transition-all duration-300 p-6 sm:p-8 ${getCardContainerClasses(
                  activeStyle.id
                )}`}
                style={getCardContainerStyles(activeStyle.id)}
              >
                {/* Washi Tape Strip for Scrapbook style */}
                {activeStyle.id === "scrapbook" && (
                  <div
                    aria-hidden="true"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#dedbd4]/80 shadow-xs border border-white/50 transform -rotate-1 pointer-events-none"
                  />
                )}

                {/* Victorian Classical Corner Brackets */}
                {activeStyle.id === "victorian" && (
                  <>
                    <span className="absolute top-2 left-2 text-[#0d0d0d] font-serif text-base select-none pointer-events-none">
                      ⌜
                    </span>
                    <span className="absolute top-2 right-2 text-[#0d0d0d] font-serif text-base select-none pointer-events-none">
                      ⌝
                    </span>
                    <span className="absolute bottom-2 left-2 text-[#0d0d0d] font-serif text-base select-none pointer-events-none">
                      ⌞
                    </span>
                    <span className="absolute bottom-2 right-2 text-[#0d0d0d] font-serif text-base select-none pointer-events-none">
                      ⌟
                    </span>
                  </>
                )}

                {/* Cyberpunk HUD Corner Cuts & Reticles */}
                {(activeStyle.id === "cyberpunk" ||
                  activeStyle.id === "cybercore") && (
                  <div className="absolute top-2 right-3 font-mono text-[9px] text-[#0d0d0d]/50 tracking-widest pointer-events-none">
                    [0x7F · 60FPS · OK]
                  </div>
                )}

                {/* Card Header */}
                <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-[#0d0d0d]/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#77756f]">
                        {activeStyle.eraOrOrigin}
                      </span>
                      {activeStyle.id === "wabi-sabi" && (
                        <span className="font-serif text-xs text-[#0d0d0d] border border-[#0d0d0d]/20 px-1 rounded-sm">
                          侘寂
                        </span>
                      )}
                    </div>
                    <h3 className={`text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] mt-1 ${
                      activeStyle.id === "editorial-design" || activeStyle.id === "luxury-typography"
                        ? "font-serif italic font-normal text-3xl"
                        : activeStyle.id === "cybercore" || activeStyle.id === "pixel-art"
                        ? "font-mono"
                        : "font-sans"
                    }`}>
                      Yash Pallav Pathak
                    </h3>
                    <p className="text-xs text-[#77756f] font-mono mt-0.5">
                      Full Stack · AI/ML · DevSecOps
                    </p>
                  </div>

                  {/* Interactive Toggle Switch */}
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-mono text-[9px] text-[#77756f]">
                      STATE
                    </span>
                    <button
                      type="button"
                      onClick={() => setToggleActive(!toggleActive)}
                      aria-label="Toggle system state"
                      className={`relative w-12 h-6 rounded-full transition-all cursor-pointer p-0.5 ${getToggleClasses(
                        activeStyle.id,
                        toggleActive
                      )}`}
                      style={getToggleStyles(activeStyle.id, toggleActive)}
                    >
                      <div
                        className={`w-5 h-5 rounded-full transition-transform ${
                          toggleActive ? "translate-x-6" : "translate-x-0"
                        } ${getToggleThumbClasses(activeStyle.id, toggleActive)}`}
                        style={getToggleThumbStyles(activeStyle.id, toggleActive)}
                      />
                    </button>
                  </div>
                </div>

                {/* Key Metrics / System Telemetry */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-black/3 border border-[#0d0d0d]/5">
                    <div className="font-mono text-[10px] text-[#77756f]">CGPA</div>
                    <div className="text-base sm:text-lg font-bold font-mono text-[#0d0d0d]">9.07</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/3 border border-[#0d0d0d]/5">
                    <div className="font-mono text-[10px] text-[#77756f]">SKILLS</div>
                    <div className="text-base sm:text-lg font-bold font-mono text-[#0d0d0d]">56</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/3 border border-[#0d0d0d]/5">
                    <div className="font-mono text-[10px] text-[#77756f]">RESEARCH</div>
                    <div className="text-base sm:text-lg font-bold font-mono text-[#0d0d0d]">IEEE</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/3 border border-[#0d0d0d]/5">
                    <div className="font-mono text-[10px] text-[#77756f]">PLATFORMS</div>
                    <div className="text-base sm:text-lg font-bold font-mono text-[#0d0d0d]">9+</div>
                  </div>
                </div>

                {/* Progress Meter / Live Readout */}
                <div className="mb-6 space-y-1.5">
                  <div className="flex justify-between font-mono text-[10px] text-[#77756f]">
                    <span>SYSTEM ARCHITECTURE READY</span>
                    <span className="font-bold text-[#0d0d0d]">100% COMPILED</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#0d0d0d]/10 overflow-hidden">
                    <div
                      className="h-full bg-[#0d0d0d] rounded-full transition-all duration-500"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>

                {/* Interactive Action Button with Style-Specific Tactile Feedback */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActionCount((c) => c + 1)}
                    className={`flex-1 py-3 px-4 font-mono text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${getButtonClasses(
                      activeStyle.id
                    )}`}
                    style={getButtonStyles(activeStyle.id)}
                  >
                    <span>✦ Trigger Action ({actionCount})</span>
                    <span>→</span>
                  </button>

                  <span className="font-mono text-[11px] text-[#77756f] px-2">
                    {activeStyle.subtitle}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Cols 8-12): Style Tokens Inspector & CSS Copy */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Style Details Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#0d0d0d]/10 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-[#77756f] tracking-wider">
                  // Style Specification
                </span>
                <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[#f4f2ee] text-[#0d0d0d] font-semibold border border-[#0d0d0d]/10">
                  {activeStyle.category}
                </span>
              </div>

              <div>
                <h4
                  id="active-style-title"
                  className="text-2xl font-bold tracking-tight text-[#0d0d0d]"
                >
                  {activeStyle.name}
                </h4>
                <div className="font-mono text-xs text-[#77756f] mt-0.5">
                  {activeStyle.subtitle} · {activeStyle.eraOrOrigin}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#77756f] leading-relaxed">
                {activeStyle.description}
              </p>

              {/* Design Tokens Matrix */}
              <div className="pt-3 border-t border-[#0d0d0d]/10 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between items-center py-1 border-b border-[#0d0d0d]/5">
                  <span className="text-[#77756f]">Border Radius:</span>
                  <span className="text-[#0d0d0d] font-semibold">
                    {activeStyle.keyTokens.borderRadius}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#0d0d0d]/5">
                  <span className="text-[#77756f]">Borders:</span>
                  <span className="text-[#0d0d0d] font-semibold">
                    {activeStyle.keyTokens.border}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#0d0d0d]/5">
                  <span className="text-[#77756f]">Typography:</span>
                  <span className="text-[#0d0d0d] font-semibold truncate max-w-[200px]" title={activeStyle.keyTokens.typography}>
                    {activeStyle.keyTokens.typography}
                  </span>
                </div>
              </div>
            </div>

            {/* CSS Tokens Code Snippet Box */}
            <div className="p-6 rounded-3xl bg-[#0d0d0d] text-[#f4f2ee] space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-white/60 tracking-wider">
                  CSS TOKENS (MONOCHROME)
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Copy CSS rules to clipboard"
                >
                  {copiedCode ? (
                    <>
                      <span className="text-[#10b981]">✓</span>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <span>📋</span>
                      <span>Copy CSS</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="font-mono text-xs text-white/85 p-3 rounded-xl bg-white/5 overflow-x-auto leading-relaxed border border-white/10 scrollbar-thin">
                <code>{activeStyle.cssSnippet}</code>
              </pre>

              <div className="flex items-center justify-between text-[11px] font-mono text-white/50 pt-1">
                <span>Palette: #f4f2ee / #0d0d0d</span>
                <span>Keyboard: [←] Prev · [→] Next</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Style Generators for the Live Interactive Artifact
// -------------------------------------------------------------

function getCardContainerClasses(styleId: string): string {
  switch (styleId) {
    case "claymorphism":
      return "rounded-[32px] bg-[#f4f2ee]";
    case "cybercore":
      return "rounded-none bg-white border border-dashed border-[#0d0d0d]/40";
    case "neo-brutalism":
      return "rounded-xl bg-white border-[2.5px] border-[#0d0d0d]";
    case "scrapbook":
      return "rounded-xs bg-white border border-[#0d0d0d]/15 transform -rotate-1";
    case "surrealism":
      return "rounded-3xl bg-gradient-to-br from-white to-[#f4f2ee]";
    case "y2k-aesthetic":
      return "rounded-3xl bg-white border-2 border-[#0d0d0d]/30";
    case "pixel-art":
      return "rounded-none bg-white";
    case "synthwave":
      return "rounded-xl bg-white border border-[#0d0d0d]/30";
    case "glassmorphism":
      return "rounded-3xl bg-white/55 backdrop-blur-xl border border-white/80";
    case "neumorphism":
      return "rounded-3xl bg-[#f4f2ee]";
    case "bento-grid":
      return "rounded-2xl bg-white border border-[#0d0d0d]/10";
    case "editorial-design":
      return "rounded-none bg-white border-t-2 border-b-2 border-[#0d0d0d]";
    case "swiss-design":
      return "rounded-none bg-white border-2 border-[#0d0d0d]";
    case "minimalism":
      return "rounded-none bg-transparent border-0";
    case "maximalism":
      return "rounded-2xl bg-white border-2 border-[#0d0d0d]";
    case "luxury-typography":
      return "rounded-xs bg-white border border-[#0d0d0d]/15";
    case "conceptual-sketch":
      return "rounded-none bg-white border border-[#0d0d0d]/25";
    case "ethereal":
      return "rounded-[32px] bg-white/80 backdrop-blur-2xl border border-white/90";
    case "bohemian":
      return "rounded-[24px_12px_28px_16px] bg-white border-[1.5px] border-[#0d0d0d]/20";
    case "victorian":
      return "rounded-none bg-white border-2 border-[#0d0d0d]";
    case "cyberpunk":
      return "bg-[#0d0d0d] text-[#f4f2ee] border border-white/20";
    case "wabi-sabi":
      return "rounded-[30px_10px_24px_14px] bg-white border border-[#0d0d0d]/15";
    default:
      return "rounded-2xl bg-white border border-[#0d0d0d]/10 shadow-md";
  }
}

function getCardContainerStyles(styleId: string): React.CSSProperties {
  switch (styleId) {
    case "claymorphism":
      return {
        boxShadow:
          "0 18px 36px -6px rgba(13, 13, 13, 0.08), inset 2px 2px 4px rgba(255, 255, 255, 0.95), inset -3px -3px 6px rgba(13, 13, 13, 0.07)",
      };
    case "neo-brutalism":
      return {
        boxShadow: "5px 5px 0px #0d0d0d",
      };
    case "neumorphism":
      return {
        boxShadow: "8px 8px 18px #dedbd4, -8px -8px 18px #ffffff",
      };
    case "glassmorphism":
      return {
        boxShadow: "0 20px 40px rgba(13, 13, 13, 0.07)",
      };
    case "surrealism":
      return {
        boxShadow:
          "0 32px 64px -12px rgba(13, 13, 13, 0.18), 0 12px 24px -6px rgba(13, 13, 13, 0.08)",
      };
    case "pixel-art":
      return {
        boxShadow:
          "3px 0 0 0 #0d0d0d, -3px 0 0 0 #0d0d0d, 0 3px 0 0 #0d0d0d, 0 -3px 0 0 #0d0d0d",
      };
    case "maximalism":
      return {
        boxShadow: "4px 4px 0px #0d0d0d, 8px 8px 0px rgba(13,13,13,0.15)",
      };
    case "victorian":
      return {
        boxShadow:
          "inset 0 0 0 3px #ffffff, inset 0 0 0 4.5px #0d0d0d",
      };
    case "cyberpunk":
      return {
        clipPath:
          "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
        boxShadow: "0 14px 30px rgba(0,0,0,0.3)",
      };
    case "cybercore":
      return {
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(13, 13, 13, 0.03) 20px)",
      };
    case "conceptual-sketch":
      return {
        backgroundImage:
          "radial-gradient(rgba(13, 13, 13, 0.12) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      };
    case "synthwave":
      return {
        backgroundImage:
          "linear-gradient(rgba(13, 13, 13, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(13, 13, 13, 0.08) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      };
    default:
      return {};
  }
}

function getButtonClasses(styleId: string): string {
  switch (styleId) {
    case "claymorphism":
      return "rounded-2xl bg-[#0d0d0d] text-white active:scale-95";
    case "cybercore":
      return "rounded-none bg-white text-[#0d0d0d] border border-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white";
    case "neo-brutalism":
      return "rounded-lg bg-[#0d0d0d] text-white border-2 border-[#0d0d0d] active:translate-x-0.5 active:translate-y-0.5";
    case "y2k-aesthetic":
      return "rounded-full bg-gradient-to-b from-white/90 to-[#dcd8d0] text-[#0d0d0d] border border-[#0d0d0d]/30 shadow-xs";
    case "pixel-art":
      return "rounded-none bg-[#0d0d0d] text-white";
    case "neumorphism":
      return "rounded-xl bg-[#f4f2ee] text-[#0d0d0d] active:shadow-inner";
    case "cyberpunk":
      return "rounded-none bg-white text-[#0d0d0d] font-bold";
    case "minimalism":
      return "rounded-none bg-transparent text-[#0d0d0d] border-b border-[#0d0d0d] px-0";
    default:
      return "rounded-xl bg-[#0d0d0d] text-white hover:bg-[#262626]";
  }
}

function getButtonStyles(styleId: string): React.CSSProperties {
  switch (styleId) {
    case "claymorphism":
      return {
        boxShadow:
          "0 8px 16px -2px rgba(13,13,13,0.25), inset 0 2px 2px rgba(255,255,255,0.4)",
      };
    case "neo-brutalism":
      return {
        boxShadow: "3px 3px 0px #0d0d0d",
      };
    case "neumorphism":
      return {
        boxShadow: "4px 4px 8px #dedbd4, -4px -4px 8px #ffffff",
      };
    case "pixel-art":
      return {
        boxShadow: "2px 2px 0 0 #0d0d0d",
      };
    default:
      return {};
  }
}

function getToggleClasses(styleId: string, active: boolean): string {
  if (styleId === "neo-brutalism") {
    return active
      ? "bg-[#0d0d0d] border-2 border-[#0d0d0d]"
      : "bg-white border-2 border-[#0d0d0d]";
  }
  if (styleId === "cybercore" || styleId === "pixel-art") {
    return active ? "bg-[#0d0d0d] rounded-none" : "bg-white border border-[#0d0d0d] rounded-none";
  }
  return active ? "bg-[#0d0d0d]" : "bg-[#dedbd4]";
}

function getToggleStyles(styleId: string, active: boolean): React.CSSProperties {
  if (styleId === "neumorphism") {
    return {
      boxShadow: active
        ? "inset 2px 2px 4px #000, inset -2px -2px 4px #333"
        : "inset 2px 2px 4px #dedbd4, inset -2px -2px 4px #ffffff",
    };
  }
  return {};
}

function getToggleThumbClasses(styleId: string, active: boolean): string {
  if (styleId === "pixel-art" || styleId === "cybercore") {
    return "rounded-none " + (active ? "bg-white" : "bg-[#0d0d0d]");
  }
  return "bg-white shadow-xs";
}

function getToggleThumbStyles(styleId: string, active: boolean): React.CSSProperties {
  return {};
}
