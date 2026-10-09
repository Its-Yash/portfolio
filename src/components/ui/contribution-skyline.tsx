"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionSkylineProps {
  endDate?: string;
  className?: string;
  initialPalette?: string;
}

type PaletteKey = "monochrome" | "emerald" | "graphite" | "amber" | "indigo" | "crimson";

interface Palette {
  name: string;
  label: string;
  bg: string;
  surface: string;
  text: string;
  levels: [string, string, string, string, string]; // level 0, 1, 2, 3, 4
  accent: string;
}

const PALETTES: Record<PaletteKey, Palette> = {
  monochrome: {
    name: "monochrome",
    label: "Ink & Paper",
    bg: "#f4f2ee",
    surface: "#ffffff",
    text: "#0d0d0d",
    levels: ["#e9e6e0", "#c8c5be", "#8e8c86", "#454440", "#0d0d0d"],
    accent: "#0d0d0d",
  },
  emerald: {
    name: "emerald",
    label: "GitHub Classic",
    bg: "#0d1117",
    surface: "#161b22",
    text: "#f0f6fc",
    levels: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
    accent: "#39d353",
  },
  graphite: {
    name: "graphite",
    label: "Slate Metal",
    bg: "#0f172a",
    surface: "#1e293b",
    text: "#f8fafc",
    levels: ["#1e293b", "#334155", "#475569", "#64748b", "#94a3b8"],
    accent: "#94a3b8",
  },
  amber: {
    name: "amber",
    label: "Solar Bronze",
    bg: "#1c1917",
    surface: "#292524",
    text: "#fafaf9",
    levels: ["#292524", "#78350f", "#b45309", "#d97706", "#f59e0b"],
    accent: "#f59e0b",
  },
  indigo: {
    name: "indigo",
    label: "Deep Cyber",
    bg: "#09090b",
    surface: "#18181b",
    text: "#fafafa",
    levels: ["#18181b", "#3730a3", "#4f46e5", "#6366f1", "#818cf8"],
    accent: "#818cf8",
  },
  crimson: {
    name: "crimson",
    label: "Hyper Red",
    bg: "#180c10",
    surface: "#261219",
    text: "#fff1f2",
    levels: ["#261219", "#881337", "#be123c", "#e11d48", "#fb7185"],
    accent: "#fb7185",
  },
};

// Seeded pseudorandom function to produce consistent, realistic GitHub contribution graph
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function generateContributionData(endDateStr?: string): {
  weeks: ContributionDay[][];
  stats: { total: number; busiestDay: { date: string; count: number }; longestStreak: number; currentStreak: number };
} {
  const end = endDateStr ? new Date(endDateStr) : new Date();
  if (isNaN(end.getTime())) {
    // fallback if invalid date string
    end.setTime(Date.now());
  }

  // Ensure end day is end of week or target date
  const days: ContributionDay[] = [];
  const TOTAL_DAYS = 52 * 7; // 52 weeks

  // Calculate start date
  const start = new Date(end);
  start.setDate(end.getDate() - TOTAL_DAYS + 1);

  let total = 0;
  let busiest = { date: "", count: 0 };
  let longestStreak = 0;
  let currentStreak = 0;
  let tempStreak = 0;

  for (let i = 0; i < TOTAL_DAYS; i++) {
    const cur = new Date(start);
    cur.setDate(start.getDate() + i);
    const dateStr = cur.toISOString().split("T")[0];

    // Seed based on day index and year
    const seed = cur.getFullYear() * 1000 + (cur.getMonth() + 1) * 50 + cur.getDate();
    const rand = pseudoRandom(seed);
    const dayOfWeek = cur.getDay(); // 0 is Sunday, 6 is Saturday

    // Generate higher activity on weekdays, realistic sprints & Hacktoberfest bump in October
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isOctober = cur.getMonth() === 9; // Hacktoberfest
    const probActive = isOctober ? 0.85 : isWeekend ? 0.35 : 0.72;

    let count = 0;
    if (rand < probActive) {
      const intensityRand = pseudoRandom(seed + 13);
      if (intensityRand > 0.88) {
        count = Math.floor(12 + pseudoRandom(seed + 7) * 16); // peak day 12-28
      } else if (intensityRand > 0.6) {
        count = Math.floor(6 + pseudoRandom(seed + 5) * 6); // 6-12
      } else if (intensityRand > 0.3) {
        count = Math.floor(3 + pseudoRandom(seed + 3) * 3); // 3-6
      } else {
        count = Math.floor(1 + pseudoRandom(seed + 1) * 2); // 1-2
      }
    }

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 10) level = 4;
    else if (count >= 6) level = 3;
    else if (count >= 3) level = 2;
    else if (count >= 1) level = 1;

    total += count;
    if (count > busiest.count) {
      busiest = { date: dateStr, count };
    }

    if (count > 0) {
      tempStreak++;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }

    if (i === TOTAL_DAYS - 1) {
      currentStreak = tempStreak;
    }

    days.push({ date: dateStr, count, level });
  }

  // Group into 52 columns of 7 days
  const weeks: ContributionDay[][] = [];
  for (let w = 0; w < 52; w++) {
    weeks.push(days.slice(w * 7, (w + 1) * 7));
  }

  return {
    weeks,
    stats: { total, busiestDay: busiest, longestStreak, currentStreak },
  };
}

export default function ContributionSkyline({
  endDate,
  className = "",
  initialPalette = "monochrome",
}: ContributionSkylineProps) {
  const [activePalette, setActivePalette] = useState<PaletteKey>(
    (initialPalette in PALETTES ? initialPalette : "monochrome") as PaletteKey
  );
  const [is3D, setIs3D] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  // 3D rotation angles (yaw & pitch)
  const [rotation, setRotation] = useState({ yaw: -22, pitch: 42 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; yaw: number; pitch: number }>({ x: 0, y: 0, yaw: -22, pitch: 42 });
  const containerRef = useRef<HTMLDivElement>(null);

  const { weeks, stats } = useMemo(() => generateContributionData(endDate), [endDate]);
  const palette = PALETTES[activePalette];

  // Mouse / Touch drag to orbit
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!is3D) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      yaw: rotation.yaw,
      pitch: rotation.pitch,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !is3D) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    const newYaw = Math.max(-55, Math.min(30, dragStartRef.current.yaw + dx * 0.35));
    const newPitch = Math.max(15, Math.min(75, dragStartRef.current.pitch - dy * 0.35));

    setRotation({ yaw: newYaw, pitch: newPitch });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  const resetCamera = () => {
    setRotation({ yaw: -22, pitch: 42 });
  };

  // Keyboard navigation for rotation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!is3D) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setRotation((r) => ({ ...r, yaw: Math.max(-55, r.yaw - 5) }));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setRotation((r) => ({ ...r, yaw: Math.min(30, r.yaw + 5) }));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setRotation((r) => ({ ...r, pitch: Math.min(75, r.pitch + 5) }));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setRotation((r) => ({ ...r, pitch: Math.max(15, r.pitch - 5) }));
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl border border-[#0d0d0d]/10 p-5 sm:p-7 transition-colors duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.04)] select-none ${className}`}
      style={{
        backgroundColor: palette.surface,
        color: palette.text,
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="GitHub Contribution Graph 3D Heatmap. Use mouse drag or arrow keys to orbit view."
    >
      {/* Top Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-current/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">
              GitHub Contribution Heatmap
            </span>
            <span
              className="inline-block w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: palette.accent }}
            />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5">
            Contribution Skyline
          </h3>
          <p className="text-xs opacity-65 font-mono mt-0.5">
            {stats.total.toLocaleString()} contributions across 52 weeks · {endDate ? `Ending ${endDate}` : "Latest Cycle"}
          </p>
        </div>

        {/* View Mode & Reset Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 2D / 3D Mode Toggle */}
          <div className="flex items-center p-0.5 rounded-full border border-current/15 bg-current/5">
            <button
              onClick={() => setIs3D(false)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                !is3D
                  ? "bg-current text-white shadow-sm"
                  : "opacity-70 hover:opacity-100"
              }`}
              style={{
                backgroundColor: !is3D ? palette.text : "transparent",
                color: !is3D ? palette.bg : palette.text,
              }}
            >
              2D Flat
            </button>
            <button
              onClick={() => setIs3D(true)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                is3D
                  ? "bg-current text-white shadow-sm"
                  : "opacity-70 hover:opacity-100"
              }`}
              style={{
                backgroundColor: is3D ? palette.text : "transparent",
                color: is3D ? palette.bg : palette.text,
              }}
            >
              3D Skyline
            </button>
          </div>

          {/* Reset Camera (Only in 3D) */}
          {is3D && (
            <button
              onClick={resetCamera}
              className="px-2.5 py-1 rounded-full border border-current/15 text-[11px] font-mono opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              title="Reset isometric angle"
            >
              Reset ⟲
            </button>
          )}

          {/* Palette Selector */}
          <div className="flex items-center gap-1 border border-current/15 rounded-full p-1 bg-current/5">
            {(Object.keys(PALETTES) as PaletteKey[]).map((pKey) => {
              const p = PALETTES[pKey];
              const isSelected = activePalette === pKey;
              return (
                <button
                  key={pKey}
                  onClick={() => setActivePalette(pKey)}
                  className={`w-5 h-5 rounded-full transition-transform cursor-pointer relative ${
                    isSelected ? "scale-110 ring-2 ring-current" : "opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: p.levels[3] }}
                  title={p.label}
                  aria-label={`Switch palette to ${p.label}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Metric Counters Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-current/10 font-mono text-xs">
        <div>
          <div className="text-[10px] uppercase opacity-55">Total Activity</div>
          <div className="text-base font-bold mt-0.5">{stats.total} commits</div>
        </div>
        <div>
          <div className="text-[10px] uppercase opacity-55">Busiest Day</div>
          <div className="text-base font-bold mt-0.5">{stats.busiestDay.count} on {stats.busiestDay.date ? stats.busiestDay.date.slice(5) : "—"}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase opacity-55">Longest Streak</div>
          <div className="text-base font-bold mt-0.5">{stats.longestStreak} days</div>
        </div>
        <div>
          <div className="text-[10px] uppercase opacity-55">Current Streak</div>
          <div className="text-base font-bold mt-0.5">{stats.currentStreak} days</div>
        </div>
      </div>

      {/* Main Skyline Canvas / Isometric Viewport */}
      <div
        className={`relative w-full my-4 overflow-hidden rounded-2xl flex items-center justify-center ${
          is3D ? "cursor-grab active:cursor-grabbing min-h-[360px] sm:min-h-[420px]" : "overflow-x-auto py-6"
        }`}
        style={{
          perspective: is3D ? "1200px" : "none",
          background: is3D ? `${palette.bg}80` : "transparent",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {is3D ? (
          /* 3D ISOMETRIC SKYLINE GRAPH */
          <div
            className="transition-transform duration-75 will-change-transform flex items-center justify-center p-8 sm:p-14"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotation.pitch}deg) rotateZ(${rotation.yaw}deg)`,
            }}
          >
            <div
              className="grid gap-1 sm:gap-1.5"
              style={{
                gridTemplateColumns: `repeat(52, minmax(0, 1fr))`,
                transformStyle: "preserve-3d",
              }}
            >
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1 sm:gap-1.5" style={{ transformStyle: "preserve-3d" }}>
                  {week.map((day, dIdx) => {
                    const isHovered = hoveredDay?.date === day.date;
                    // Calculate 3D pillar height based on contribution count
                    const heightPx = day.count === 0 ? 3 : Math.min(54, 4 + day.count * 2.4);
                    const color = palette.levels[day.level];

                    return (
                      <div
                        key={dIdx}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className="relative w-2.5 h-2.5 sm:w-3 sm:h-3 transition-all duration-300 cursor-pointer group"
                        style={{
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {/* 3D Pillar Cube */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-[1px] transition-transform duration-300"
                          style={{
                            transformStyle: "preserve-3d",
                            transform: `translateZ(${heightPx}px)`,
                            backgroundColor: color,
                            boxShadow: isHovered
                              ? `0 0 12px ${palette.accent}`
                              : day.level > 2
                              ? `0 4px 10px rgba(0,0,0,0.15)`
                              : "none",
                          }}
                        >
                          {/* Front Side Wall */}
                          {heightPx > 3 && (
                            <div
                              className="absolute top-full left-0 w-full"
                              style={{
                                height: `${heightPx}px`,
                                backgroundColor: color,
                                filter: "brightness(0.7)",
                                transformOrigin: "top",
                                transform: "rotateX(-90deg)",
                              }}
                            />
                          )}
                          {/* Left Side Wall */}
                          {heightPx > 3 && (
                            <div
                              className="absolute top-0 right-full h-full"
                              style={{
                                width: `${heightPx}px`,
                                backgroundColor: color,
                                filter: "brightness(0.85)",
                                transformOrigin: "right",
                                transform: "rotateY(-90deg)",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* 2D FLAT GITHUB HEATMAP */
          <div className="w-full min-w-[720px] px-2 flex flex-col items-center">
            <div
              className="grid gap-1 sm:gap-1.5 w-full"
              style={{
                gridTemplateColumns: `repeat(52, minmax(0, 1fr))`,
              }}
            >
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1 sm:gap-1.5">
                  {week.map((day, dIdx) => {
                    const isHovered = hoveredDay?.date === day.date;
                    const color = palette.levels[day.level];
                    return (
                      <div
                        key={dIdx}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-xs transition-transform duration-150 cursor-pointer ${
                          isHovered ? "scale-135 ring-1 ring-current z-10" : ""
                        }`}
                        style={{
                          backgroundColor: color,
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Months Header Indicator */}
            <div className="flex justify-between w-full mt-3 font-mono text-[9px] opacity-50 uppercase tracking-wider">
              <span>Nov</span>
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Nov</span>
            </div>
          </div>
        )}

        {/* Floating Tooltip Indicator */}
        {hoveredDay && (
          <div
            className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-lg border border-current/20 bg-black/85 text-white backdrop-blur-md font-mono text-xs shadow-xl pointer-events-none transition-all duration-150"
          >
            <div className="font-semibold text-[11px]">
              {hoveredDay.count === 0 ? "No contributions" : `${hoveredDay.count} contribution${hoveredDay.count > 1 ? "s" : ""}`}
            </div>
            <div className="text-[10px] opacity-75">{formatDate(hoveredDay.date)}</div>
          </div>
        )}
      </div>

      {/* Footer Navigation Hints & Legend */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-current/10 font-mono text-[10px] opacity-70">
        <div>
          {is3D ? (
            <span>[ Drag with pointer or use arrow keys to rotate isometric skyline ]</span>
          ) : (
            <span>[ Hover over any day for timestamp & contribution volume ]</span>
          )}
        </div>

        {/* Activity Level Legend */}
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {palette.levels.map((lvlColor, idx) => (
            <span
              key={idx}
              className="w-2.5 h-2.5 rounded-xs inline-block"
              style={{ backgroundColor: lvlColor }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
