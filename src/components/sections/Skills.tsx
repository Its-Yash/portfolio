"use client";

import React, { useState } from "react";
import { SKILL_ITEMS, SkillItem } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

const FAMILIES = [
  "All",
  "AI & ML",
  "Agents & SLM",
  "Frontend",
  "Backend",
  "Database",
  "Cloud & DevOps",
  "Security",
  "Tools",
] as const;

export function Skills() {
  const [selectedFamily, setSelectedFamily] = useState<string>("All");
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILL_ITEMS[0]);

  return (
    <section id="skills" className="section-padding relative overflow-hidden" aria-label="Technical skills periodic table">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-tag">
          <span>02</span>
          <span>—</span>
          <span>The Periodic Table of My Stack</span>
        </div>
        <h2 className="section-heading">
          Elements of modern <span className="heading-serif-accent">systems.</span>
        </h2>

        {/* Family Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-8 mb-10" role="tablist" aria-label="Filter skills by family">
          {FAMILIES.map((family) => {
            const isSelected = selectedFamily === family;
            return (
              <button
                key={family}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedFamily(family)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0d0d0d] text-[#ffffff] shadow-sm"
                    : "bg-[#ffffff] text-[#77756f] border border-[#0d0d0d]/10 hover:border-[#0d0d0d]/30 hover:text-[#0d0d0d]"
                }`}
              >
                {family}
              </button>
            );
          })}
        </div>

        {/* Main Layout: Periodic Grid (left) + Sticky Inspector Panel (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
          
          {/* Periodic Elements Grid (8 cols desktop, 4 cols mobile) */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5">
            {SKILL_ITEMS.map((item, index) => {
              const row = Math.floor(index / 8);
              const col = index % 8;
              const delayMs = (row + col) * 40;
              const matchesFilter = selectedFamily === "All" || item.family === selectedFamily;
              const isInspected = activeSkill.atomicNumber === item.atomicNumber;

              return (
                <button
                  key={item.atomicNumber}
                  onClick={() => setActiveSkill(item)}
                  onMouseEnter={() => setActiveSkill(item)}
                  onFocus={() => setActiveSkill(item)}
                  style={{
                    transitionDelay: `${delayMs}ms`,
                  }}
                  className={`group relative p-2.5 rounded-xl border text-left flex flex-col justify-between aspect-square transition-all duration-300 cursor-pointer ${
                    matchesFilter
                      ? isInspected
                        ? "bg-[#ffffff] border-[#0d0d0d] shadow-md scale-[1.03] z-10"
                        : "bg-[#ffffff]/90 border-[#0d0d0d]/10 hover:border-[#0d0d0d]/40 hover:bg-[#ffffff] hover:scale-[1.02]"
                      : "opacity-25 bg-[#ffffff]/40 border-transparent hover:opacity-75"
                  }`}
                  aria-label={`${item.name}, atomic number ${item.atomicNumber}, family ${item.family}`}
                >
                  {/* Top Bar: Atomic Number + Mini Family Indicator */}
                  <div className="flex items-center justify-between w-full font-mono text-[9px] text-[#77756f]">
                    <span>{item.atomicNumber.toString().padStart(2, "0")}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]/20 group-hover:bg-[#0d0d0d]" />
                  </div>

                  {/* Centre: 2-Letter Symbol */}
                  <div className="text-center my-auto">
                    <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] block">
                      {item.symbol}
                    </span>
                  </div>

                  {/* Bottom: Skill Name */}
                  <div className="w-full font-mono text-[8px] sm:text-[8.5px] leading-tight font-medium text-[#3a3a3a] group-hover:text-[#0d0d0d] line-clamp-2 break-words min-h-[20px] flex items-end">
                    {item.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky Inspector Panel (320px wide) */}
          <aside
            className="sticky top-28 card-base p-6 md:p-8 flex flex-col items-center text-center shadow-lg w-full"
            aria-label="Skill inspector"
          >
            <div className="w-full flex items-center justify-between font-mono text-[10px] text-[#77756f] border-b border-[#0d0d0d]/10 pb-3 mb-6">
              <span>INSPECTOR</span>
              <span className="uppercase font-semibold text-[#0d0d0d]">
                № {activeSkill.atomicNumber.toString().padStart(2, "0")} / {activeSkill.symbol}
              </span>
            </div>

            {/* 150px Logo with Pop Animation */}
            <div className="relative w-[150px] h-[150px] rounded-2xl bg-[#f4f2ee] flex items-center justify-center p-6 border border-[#0d0d0d]/10 shadow-inner group">
              <div
                key={activeSkill.name}
                className="transform transition-all duration-300 animate-[pop_0.35s_cubic-bezier(0.16,1,0.3,1)]"
              >
                <TechLogo name={activeSkill.logoKey} size={84} glow={true} />
              </div>
            </div>

            {/* Skill Details */}
            <div className="mt-5 w-full">
              <h3 className="text-xl font-bold tracking-tight text-[#0d0d0d]">
                {activeSkill.name}
              </h3>
              <div className="inline-block mt-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider bg-[#0d0d0d]/5 text-[#77756f]">
                {activeSkill.family}
              </div>

              <p className="mt-4 text-xs text-[#3a3a3a] leading-relaxed text-left border-t border-[#0d0d0d]/10 pt-4">
                {activeSkill.description}
              </p>

              {/* Projects Utilizing this Skill */}
              <div className="mt-5 pt-4 border-t border-[#0d0d0d]/10 text-left w-full">
                <div className="font-mono text-[9px] uppercase tracking-wider text-[#77756f] mb-2">
                  Implemented In:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeSkill.usedInProjects.map((p) => (
                    <span
                      key={p}
                      className="px-2 py-0.5 rounded-md bg-[#ffffff] border border-[#0d0d0d]/10 font-mono text-[10px] text-[#0d0d0d]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}
