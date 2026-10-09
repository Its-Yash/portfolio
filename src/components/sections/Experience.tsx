"use client";

import React, { useRef, useState, useEffect } from "react";
import { EXPERIENCE_TIMELINE } from "@/lib/data";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [spineHeight, setSpineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress of section in viewport
      const start = rect.top - windowHeight * 0.7;
      const end = rect.height;
      const current = -start;
      const progress = Math.min(1, Math.max(0, current / end));

      setSpineHeight(progress * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      aria-label="Experience and education timeline"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="section-tag">
          <span>05</span>
          <span>—</span>
          <span>Chronological Path</span>
        </div>
        <h2 className="section-heading">
          Education & engineering <span className="heading-serif-accent">journey.</span>
        </h2>

        {/* Timeline Container with dynamic drawing spine */}
        <div className="relative mt-16 max-w-4xl mx-auto">
          {/* Background Pale Spine Line */}
          <div
            className="absolute left-4 sm:left-8 top-3 bottom-12 w-[2px] bg-[#0d0d0d]/10 -translate-x-1/2"
            aria-hidden="true"
          />

          {/* Active Ink Spine Line drawing with scroll */}
          <div
            className="absolute left-4 sm:left-8 top-3 w-[2px] bg-[#0d0d0d] -translate-x-1/2 transition-[height] duration-150 ease-out"
            style={{ height: `${spineHeight}%`, maxHeight: "98%" }}
            aria-hidden="true"
          />

          {/* Timeline Nodes */}
          <div className="space-y-12 relative z-10">
            {EXPERIENCE_TIMELINE.map((item, index) => {
              const nodeThreshold = (index / EXPERIENCE_TIMELINE.length) * 85;
              const isLit = index === 0 ? spineHeight > 5 : spineHeight >= nodeThreshold;

              return (
                <div
                  key={item.id}
                  className="relative pl-12 sm:pl-20 group"
                >
                  {/* Spine Node Marker */}
                  <div
                    className={`absolute left-4 sm:left-8 top-1.5 w-4 h-4 -translate-x-1/2 rounded-full border-2 transition-all duration-300 ${
                      isLit
                        ? "bg-[#0d0d0d] border-[#0d0d0d] scale-110 shadow-sm"
                        : "bg-[#f4f2ee] border-[#0d0d0d]/30 scale-90"
                    }`}
                    aria-hidden="true"
                  />

                  {/* Card Content */}
                  <div className={`card-base p-6 sm:p-8 transition-all duration-400 ${
                    isLit ? "shadow-md bg-[#ffffff]" : "opacity-80 bg-[#ffffff]/70"
                  }`}>
                    {/* Header Row: Year + Type Pill */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-semibold text-[#0d0d0d]">
                        {item.period}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2ee] border border-[#0d0d0d]/10 text-[#77756f]">
                        {item.type}
                      </span>
                    </div>

                    {/* Role Title */}
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d]">
                      {item.role}
                    </h3>

                    {/* Company / Institution & Location */}
                    <div className="font-mono text-xs text-[#77756f] mt-1 mb-4 flex flex-wrap items-center gap-2">
                      <span className="text-[#0d0d0d] font-medium">{item.company}</span>
                      <span>·</span>
                      <span>{item.location}</span>
                      {item.url && (
                        <>
                          <span>·</span>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-[#0d0d0d] hover:text-[#77756f]"
                          >
                            link ↗
                          </a>
                        </>
                      )}
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="space-y-2 text-xs sm:text-sm text-[#3a3a3a] leading-relaxed mb-4">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#0d0d0d] font-bold mt-0.5">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Key Metrics or Impact */}
                    {item.metrics && (
                      <div className="pt-3 border-t border-[#0d0d0d]/10 font-mono text-[10px] text-[#0d0d0d] font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>Key Metric: {item.metrics}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Ending Dashed Card: Next — Your team? */}
            <div className="relative pl-12 sm:pl-20">
              <div
                className="absolute left-4 sm:left-8 top-6 w-4 h-4 -translate-x-1/2 rounded-full border-2 border-dashed border-[#0d0d0d] bg-[#f4f2ee]"
                aria-hidden="true"
              />

              <div className="p-8 rounded-3xl border-2 border-dashed border-[#0d0d0d]/30 bg-[#ffffff]/60 text-center flex flex-col items-center justify-center">
                <span className="font-mono text-xs text-[#77756f] uppercase tracking-wider mb-1">
                  FUTURE HORIZON
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-[#0d0d0d]">
                  Next — Your team?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#3a3a3a] max-w-md leading-relaxed">
                  Available for technical co-founder, staff engineering, devops lead, or solutions architect opportunities worldwide.
                </p>
                <a
                  href="#contact"
                  className="btn-pill-primary text-xs !py-2.5 !px-6 mt-5"
                >
                  Start a conversation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
