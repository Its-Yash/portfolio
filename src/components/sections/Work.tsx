"use client";

import React, { useState } from "react";
import { PROJECTS, ProjectItem } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

export function Work() {
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id);

  return (
    <section id="work" className="section-padding relative overflow-hidden" aria-label="Selected engineering work">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-tag">
          <span>03</span>
          <span>—</span>
          <span>Selected Work & Systems</span>
        </div>
        <h2 className="section-heading">
          Things I&apos;ve <span className="heading-serif-accent">built.</span>
        </h2>

        {/* Desktop Side-by-Side Expanding Gallery (Fixed uniform height, zero scrollbar) */}
        <div className="hidden lg:flex gap-3 h-[600px] min-h-[600px] mt-12 w-full select-none">
          {PROJECTS.map((project) => {
            const isOpen = activeProjectId === project.id;

            return (
              <div
                key={project.id}
                tabIndex={0}
                role="button"
                aria-expanded={isOpen}
                aria-label={`Project: ${project.title}`}
                onClick={() => setActiveProjectId(project.id)}
                onFocus={() => setActiveProjectId(project.id)}
                className={`relative rounded-3xl border border-[#0d0d0d]/10 bg-[#ffffff] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none ${
                  isOpen ? "flex-[8] shadow-xl" : "flex-[1] min-w-[48px] hover:bg-[#f4f2ee]/50"
                }`}
              >
                {/* Folded Slim Spine View */}
                {!isOpen && (
                  <div className="h-full w-full py-8 px-1.5 flex flex-col justify-between items-center text-center">
                    <span className="font-mono text-[11px] font-semibold text-[#77756f]">
                      {project.index}
                    </span>
                    <div className="[writing-mode:vertical-rl] rotate-180 font-bold text-xs tracking-tight text-[#0d0d0d] whitespace-nowrap overflow-hidden text-ellipsis max-h-[360px]">
                      {project.title}
                    </div>
                    <div className="w-7 h-7 rounded-full border border-[#0d0d0d]/15 flex items-center justify-center font-mono text-xs text-[#0d0d0d] group-hover:rotate-90 transition-transform">
                      +
                    </div>
                  </div>
                )}

                {/* Open Expanded Panel View (Full-sized, identical dimensions, 0 internal scroll) */}
                {isOpen && (
                  <div className="h-full w-full p-7 lg:p-8 grid grid-cols-12 gap-7 xl:gap-8 items-stretch overflow-hidden">
                    {/* Left Side: Metadata, Details & Tech Chips */}
                    <div className="col-span-7 flex flex-col justify-between overflow-hidden h-full pr-2">
                      <div>
                        {/* Kicker + Index */}
                        <div className="flex items-center gap-3 font-mono text-xs text-[#77756f] uppercase tracking-wider mb-2">
                          <span>{project.index}</span>
                          <span>—</span>
                          <span>{project.kicker}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl xl:text-3xl font-bold tracking-tight text-[#0d0d0d] mb-1 leading-tight">
                          {project.title}
                        </h3>

                        {/* Role / Org */}
                        <div className="font-mono text-xs text-[#77756f] mb-3">
                          {project.role} · {project.clientOrOrg}
                        </div>

                        {/* Description verbatim from resume */}
                        <p className="text-xs xl:text-sm text-[#3a3a3a] leading-relaxed mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        {/* 2-Column Feature List (Compact 4 points) */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 text-[11px] text-[#3a3a3a] mb-4">
                          {project.features.slice(0, 4).map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-1.5">
                              <span className="text-[#0d0d0d] font-bold mt-0.5">•</span>
                              <span className="leading-snug line-clamp-2">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Chips + External Link Button */}
                      <div className="pt-3 border-t border-[#0d0d0d]/10 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f4f2ee] font-mono text-[10px] text-[#0d0d0d] border border-[#0d0d0d]/5"
                            >
                              <TechLogo name={t} size={12} />
                              <span>{t}</span>
                            </span>
                          ))}
                        </div>

                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="btn-pill-primary text-xs !py-2 !px-4"
                          >
                            <span>Visit Platform</span>
                            <span>↗</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Side: Full-Sized, Rich System Console (No internal scroll) */}
                    <div className="col-span-5 h-full rounded-2xl bg-[#0d0d0d] text-[#f4f2ee] p-5 flex flex-col justify-between overflow-hidden relative shadow-lg border border-[#0d0d0d]/10">
                      {/* Window Header */}
                      <div className="flex items-center justify-between font-mono text-[9px] text-[#a9a6a0] border-b border-[#ffffff]/10 pb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ffffff]/20" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ffffff]/20" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ffffff]/20" />
                          <span className="ml-2 font-mono text-[10px] text-[#f4f2ee] font-medium tracking-wide">
                            {project.id.toUpperCase()} // SYS-PREVIEW
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ffffff]/10 text-[9px] text-[#f4f2ee]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                          <span>LIVE</span>
                        </div>
                      </div>

                      {/* Render Rich Illustrative Mockup Body */}
                      <div className="my-auto py-3">
                        <ProjectMiniUI type={project.uiMockType} />
                      </div>

                      {/* Window Footer */}
                      <div className="flex items-center justify-between font-mono text-[8.5px] text-[#a9a6a0] pt-2.5 border-t border-[#ffffff]/10">
                        <span className="truncate">{project.clientOrOrg}</span>
                        <span className="text-[#f4f2ee] shrink-0 font-medium">VERIFIED PRODUCTION</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Accordion View */}
        <div className="flex flex-col gap-4 mt-8 lg:hidden">
          {PROJECTS.map((project) => {
            const isOpen = activeProjectId === project.id;

            return (
              <div
                key={project.id}
                className="card-base overflow-hidden border border-[#0d0d0d]/10"
              >
                <button
                  onClick={() => setActiveProjectId(isOpen ? "" : project.id)}
                  className="w-full p-5 text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-[#77756f]">
                      {project.index}
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-[#0d0d0d]">
                        {project.title}
                      </h3>
                      <div className="font-mono text-[10px] text-[#77756f]">
                        {project.kicker}
                      </div>
                    </div>
                  </div>
                  <span className={`font-mono text-sm transition-transform ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 border-t border-[#0d0d0d]/10 mt-2">
                    <p className="text-xs text-[#3a3a3a] leading-relaxed my-3">
                      {project.description}
                    </p>

                    <div className="my-4 p-4 rounded-xl bg-[#0d0d0d] text-[#f4f2ee] border border-[#0d0d0d]/10">
                      <div className="flex items-center justify-between font-mono text-[8.5px] text-[#a9a6a0] pb-2 border-b border-[#ffffff]/10 mb-3">
                        <span>{project.id.toUpperCase()} // SYS-PREVIEW</span>
                        <span className="text-[#10b981] font-bold">● LIVE</span>
                      </div>
                      <ProjectMiniUI type={project.uiMockType} />
                    </div>

                    <div className="space-y-1.5 my-3">
                      {project.features.slice(0, 3).map((f, i) => (
                        <div key={i} className="text-[11px] text-[#3a3a3a] flex items-start gap-1.5">
                          <span>•</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#0d0d0d]/10 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#f4f2ee] border border-[#0d0d0d]/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-pill-primary text-xs !py-1.5 !px-3"
                        >
                          Visit ↗
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Rich, High-Fidelity Grayscale & Ivory System Preview Mockups
function ProjectMiniUI({ type }: { type: ProjectItem["uiMockType"] }) {
  switch (type) {
    case "marketplace":
      return (
        <div className="space-y-3 font-mono text-[10px]">
          {/* Property Card */}
          <div className="bg-[#191919] p-3 rounded-xl border border-[#ffffff]/10 space-y-1">
            <div className="flex items-center justify-between text-[8px] text-[#a9a6a0]">
              <span>COMMUNE: COCODY, ABIDJAN</span>
              <span className="px-1.5 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] font-semibold text-[7.5px]">VERIFIED 100%</span>
            </div>
            <div className="text-xs font-bold text-[#ffffff]">Villa Duplex 5 Pièces · 420 m²</div>
            <div className="text-[11px] text-[#e2dfd5] font-semibold">1,250,000 FCFA / month</div>
          </div>

          {/* 3 Escrow Rails */}
          <div className="grid grid-cols-3 gap-2 text-center text-[9px]">
            <div className="bg-[#191919] p-2 rounded-lg border border-[#ffffff]/10">
              <div className="text-[7.5px] text-[#a9a6a0]">WAVE</div>
              <div className="font-bold text-[#10b981] mt-0.5">LOCKED</div>
              <div className="text-[7px] text-[#77756f]">Escrow Deposit</div>
            </div>
            <div className="bg-[#191919] p-2 rounded-lg border border-[#ffffff]/10">
              <div className="text-[7.5px] text-[#a9a6a0]">ORANGE</div>
              <div className="font-bold text-[#10b981] mt-0.5">ESCROW</div>
              <div className="text-[7px] text-[#77756f]">Key Release</div>
            </div>
            <div className="bg-[#191919] p-2 rounded-lg border border-[#ffffff]/10">
              <div className="text-[7.5px] text-[#a9a6a0]">MTN MOMO</div>
              <div className="font-bold text-[#10b981] mt-0.5">ACTIVE</div>
              <div className="text-[7px] text-[#77756f]">Reconciled</div>
            </div>
          </div>

          {/* Telemetry bar */}
          <div className="bg-[#191919] px-3 py-2 rounded-lg border border-[#ffffff]/10 text-[8px] flex items-center justify-between">
            <span className="text-[#a9a6a0]">3G/4G PAYLOAD OPTIMIZATION</span>
            <span className="font-bold text-[#10b981]">-45% (142 kB)</span>
          </div>
        </div>
      );

    case "security-cli":
      return (
        <div className="bg-[#121212] p-3 rounded-xl border border-[#ffffff]/10 font-mono text-[8.5px] space-y-1.5 leading-relaxed">
          <div className="text-[#a9a6a0] flex items-center gap-1.5">
            <span className="text-[#10b981]">$</span>
            <span>solscan --org &apos;Tedekstra&apos; --audit-all</span>
          </div>
          <div className="text-[#10b981]">✓ Auth Gate: Bearer Org &apos;Tedekstra-UK&apos; [VALID]</div>
          <div className="text-[#f4f2ee] flex justify-between">
            <span>● Semgrep SAST:</span>
            <span className="text-[#10b981]">0 Critical / 0 High (84 rules)</span>
          </div>
          <div className="text-[#f4f2ee] flex justify-between">
            <span>● OSV Scanner SCA:</span>
            <span className="text-[#10b981]">104 pkgs audited [Clean]</span>
          </div>
          <div className="text-[#f4f2ee] flex justify-between">
            <span>● OWASP ZAP DAST:</span>
            <span className="text-[#10b981]">Spider complete (0 vulns)</span>
          </div>
          <div className="text-[#f4f2ee] flex justify-between">
            <span>● Privado GDPR:</span>
            <span className="text-[#10b981]">PII mapping [Compliant]</span>
          </div>
          <div className="pt-1 mt-1 border-t border-[#ffffff]/10 text-[#10b981] font-bold flex justify-between">
            <span>CI/CD PIPELINE GATE:</span>
            <span>[PASS - DEPLOYED]</span>
          </div>
        </div>
      );

    case "health-ai":
      return (
        <div className="space-y-2.5 font-mono text-[9px]">
          <div className="bg-[#191919] p-2.5 rounded-xl border border-[#ffffff]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
              <span className="text-[#a9a6a0]">GAZE ATTENTION RADAR</span>
            </div>
            <span className="font-bold text-[#ffffff]">94.2% [FOCUSED]</span>
          </div>
          <div className="bg-[#191919] p-2.5 rounded-xl border border-[#ffffff]/10 space-y-1">
            <div className="flex justify-between text-[#a9a6a0] text-[8px]">
              <span>ELEVENLABS NEURAL TTS</span>
              <span className="text-[#e2dfd5] font-bold">128ms LATENCY</span>
            </div>
            <div className="flex items-end gap-1 h-5 pt-1">
              {[4, 9, 15, 20, 16, 11, 18, 14, 9, 15, 7, 12, 19, 8, 14, 18, 10].map((h, i) => (
                <div key={i} className="flex-1 bg-[#e2dfd5]/80 rounded-xs" style={{ height: `${h}px` }} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#191919] p-2 rounded-lg border border-[#ffffff]/10 text-center">
              <div className="text-[7.5px] text-[#a9a6a0]">LIP-SYNC ENGINE</div>
              <div className="font-bold text-[#ffffff] mt-0.5">RHUBARB SYNC</div>
            </div>
            <div className="bg-[#191919] p-2 rounded-lg border border-[#ffffff]/10 text-center">
              <div className="text-[7.5px] text-[#a9a6a0]">HL7 FHIR SYNC</div>
              <div className="font-bold text-[#10b981] mt-0.5">ENCRYPTED PASS</div>
            </div>
          </div>
        </div>
      );

    case "ops-dashboard":
      return (
        <div className="space-y-2 font-mono text-[8.5px]">
          <div className="bg-[#191919] p-2.5 rounded-xl border border-[#ffffff]/10 space-y-1">
            <div className="flex justify-between items-center text-[8px] text-[#a9a6a0]">
              <span>PLAYWRIGHT AUTOMATED E2E MATRIX</span>
              <span className="text-[#10b981] font-bold">100% PASS</span>
            </div>
            <div className="space-y-1 pt-1">
              <div className="flex justify-between bg-[#121212] px-2 py-1 rounded">
                <span className="text-[#ffffff]">Chromium (Desktop / Mobile)</span>
                <span className="text-[#10b981]">64 / 64 PASS</span>
              </div>
              <div className="flex justify-between bg-[#121212] px-2 py-1 rounded">
                <span className="text-[#ffffff]">WebKit (iOS / Safari)</span>
                <span className="text-[#10b981]">64 / 64 PASS</span>
              </div>
              <div className="flex justify-between bg-[#121212] px-2 py-1 rounded">
                <span className="text-[#ffffff]">Firefox (Gecko Engine)</span>
                <span className="text-[#10b981]">64 / 64 PASS</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#191919] p-2 rounded-lg border border-[#ffffff]/10">
              <div className="text-[7.5px] text-[#a9a6a0]">RELEASE GATE</div>
              <div className="font-bold text-[#ffffff] mt-0.5">ZERO DOWNTIME</div>
            </div>
            <div className="bg-[#191919] p-2 rounded-lg border border-[#ffffff]/10">
              <div className="text-[7.5px] text-[#a9a6a0]">NORI HR PENTEST</div>
              <div className="font-bold text-[#10b981] mt-0.5">REMEDIATED</div>
            </div>
          </div>
        </div>
      );

    case "b2b-trade":
      return (
        <div className="space-y-2.5 font-mono text-[9px]">
          <div className="bg-[#191919] p-2.5 rounded-xl border border-[#ffffff]/10 space-y-1">
            <div className="flex justify-between text-[7.5px] text-[#a9a6a0]">
              <span>ACTIVE RFQ ORDER #7749</span>
              <span className="text-[#10b981] font-bold">TIER-1 EXPORTER</span>
            </div>
            <div className="text-xs font-bold text-[#ffffff]">Industrial Bulk Parts & Freight</div>
            <div className="text-[10px] text-[#e2dfd5] font-semibold">USD $240,000 · Destination: Abidjan</div>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div className="bg-[#191919] p-2 rounded-lg border border-[#ffffff]/10">
              <div className="text-[7px] text-[#a9a6a0]">CURRENCY</div>
              <div className="font-bold text-[#ffffff] mt-0.5">MULTI-FX</div>
            </div>
            <div className="bg-[#191919] p-2 rounded-lg border border-[#ffffff]/10">
              <div className="text-[7px] text-[#a9a6a0]">INCOTERMS</div>
              <div className="font-bold text-[#ffffff] mt-0.5">CIF 2024</div>
            </div>
            <div className="bg-[#191919] p-2 rounded-lg border border-[#ffffff]/10">
              <div className="text-[7px] text-[#a9a6a0]">SUPPLIER</div>
              <div className="font-bold text-[#10b981] mt-0.5">VERIFIED</div>
            </div>
          </div>
          <div className="bg-[#191919] px-2.5 py-1.5 rounded-lg border border-[#ffffff]/10 flex justify-between text-[8px]">
            <span className="text-[#a9a6a0]">GLOBAL SEO HEALTH</span>
            <span className="text-[#10b981] font-bold">98/100 STRUCTURED DATA</span>
          </div>
        </div>
      );

    case "ecommerce-luxury":
      return (
        <div className="space-y-2.5 font-mono text-[9px]">
          <div className="bg-[#191919] p-2.5 rounded-xl border border-[#ffffff]/10 space-y-1">
            <div className="flex justify-between text-[7.5px] text-[#a9a6a0]">
              <span>FINE JEWELRY COLLECTION</span>
              <span className="text-[#e2dfd5] font-bold">HALLMARK CERTIFIED</span>
            </div>
            <div className="text-xs font-bold text-[#ffffff]">Heritage 22K Kundan Polki Choker</div>
            <div className="text-[9.5px] text-[#a9a6a0]">Purity: 91.6% (22 Karat) · Net Gold: 48.20g</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#191919] p-2 rounded-lg border border-[#ffffff]/10">
              <div className="text-[7.5px] text-[#a9a6a0]">VIP CONCIERGE</div>
              <div className="font-bold text-[#10b981] mt-0.5">WHATSAPP DIRECT</div>
            </div>
            <div className="bg-[#191919] p-2 rounded-lg border border-[#ffffff]/10">
              <div className="text-[7.5px] text-[#a9a6a0]">MEDIA PIPELINE</div>
              <div className="font-bold text-[#ffffff] mt-0.5">WEBP 4K LAZYLOAD</div>
            </div>
          </div>
          <div className="bg-[#191919] px-2.5 py-1.5 rounded-lg border border-[#ffffff]/10 flex justify-between text-[8px]">
            <span className="text-[#a9a6a0]">LAYOUT SHIFT (CLS)</span>
            <span className="text-[#10b981] font-bold">0.000 (ZERO SHIFT)</span>
          </div>
        </div>
      );

    case "ieee-uav":
      return (
        <div className="space-y-2.5 font-mono text-[9px]">
          <div className="bg-[#191919] p-2.5 rounded-xl border border-[#ffffff]/10 space-y-1">
            <div className="flex justify-between text-[7.5px] text-[#a9a6a0]">
              <span>IEEE PEER-REVIEWED RESEARCH</span>
              <span className="text-[#10b981] font-bold">PUBLISHED 2024</span>
            </div>
            <div className="text-xs font-bold text-[#ffffff]">Analyzing Crop Health Using AI & UAV</div>
            <div className="text-[8px] text-[#e2dfd5]">DOI: 10.1109/ICTACS62700.2024.10841199</div>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div className="bg-[#191919] p-2 rounded-lg border border-[#ffffff]/10">
              <div className="text-[7px] text-[#a9a6a0]">ALTITUDE</div>
              <div className="font-bold text-[#ffffff] mt-0.5">45m AGL</div>
            </div>
            <div className="bg-[#191919] p-2 rounded-lg border border-[#ffffff]/10">
              <div className="text-[7px] text-[#a9a6a0]">NDVI INDEX</div>
              <div className="font-bold text-[#10b981] mt-0.5">0.84 NDVI</div>
            </div>
            <div className="bg-[#191919] p-2 rounded-lg border border-[#ffffff]/10">
              <div className="text-[7px] text-[#a9a6a0]">CHLOROPHYLL</div>
              <div className="font-bold text-[#10b981] mt-0.5">OPTIMAL</div>
            </div>
          </div>
          <div className="bg-[#191919] px-2.5 py-1.5 rounded-lg border border-[#ffffff]/10 flex justify-between text-[8px]">
            <span className="text-[#a9a6a0]">DIAGNOSTIC LATENCY</span>
            <span className="text-[#10b981] font-bold">REAL-TIME IN-FLIGHT</span>
          </div>
        </div>
      );

    case "rag-agent":
    default:
      return (
        <div className="space-y-2.5 font-mono text-[9px]">
          <div className="bg-[#191919] p-2.5 rounded-xl border border-[#ffffff]/10 space-y-1">
            <div className="flex justify-between text-[7.5px] text-[#a9a6a0]">
              <span>PINECONE VECTOR RETRIEVAL</span>
              <span className="text-[#10b981] font-bold">38ms LATENCY</span>
            </div>
            <div className="text-xs font-bold text-[#ffffff]">Hybrid Dense Vector + Sparse BM25</div>
            <div className="text-[8px] text-[#e2dfd5]">1536-dim Cohere Embeddings // Serverless Index</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#191919] p-2 rounded-lg border border-[#ffffff]/10">
              <div className="text-[7.5px] text-[#a9a6a0]">CONTEXT WINDOW</div>
              <div className="font-bold text-[#ffffff] mt-0.5">1024-TOKEN CHUNK</div>
            </div>
            <div className="bg-[#191919] p-2 rounded-lg border border-[#ffffff]/10">
              <div className="text-[7.5px] text-[#a9a6a0]">GROUNDED SCORE</div>
              <div className="font-bold text-[#10b981] mt-0.5">0.98 RE-RANK</div>
            </div>
          </div>
          <div className="bg-[#191919] px-2.5 py-1.5 rounded-lg border border-[#ffffff]/10 flex justify-between text-[8px]">
            <span className="text-[#a9a6a0]">FIRST TOKEN LATENCY</span>
            <span className="text-[#10b981] font-bold">140ms STREAM</span>
          </div>
        </div>
      );
  }
}
