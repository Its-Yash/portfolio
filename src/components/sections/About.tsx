"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PROFILE } from "@/lib/data";

export function About() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [swingAngle, setSwingAngle] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Physics state for pendulum spring swing
  const targetAngleRef = useRef(0);
  const currentAngleRef = useRef(0);
  const velocityRef = useRef(0);
  const lastMouseXRef = useRef<number | null>(null);
  const idleTimeRef = useRef(0);

  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Spring damping physics
      const springK = 25; // stiffness
      const damping = 4.5; // resistance
      const displacement = currentAngleRef.current - targetAngleRef.current;
      const springForce = -springK * displacement;
      const dampingForce = -damping * velocityRef.current;
      const acceleration = springForce + dampingForce;

      velocityRef.current += acceleration * dt;
      currentAngleRef.current += velocityRef.current * dt;

      // Idle natural gentle sway when no mouse movement
      idleTimeRef.current += dt;
      const idleSway = Math.sin(idleTimeRef.current * 1.5) * 1.2;

      setSwingAngle(currentAngleRef.current + idleSway);

      // Decay target back to 0
      targetAngleRef.current *= 0.95;

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (lastMouseXRef.current !== null) {
      const deltaX = e.clientX - lastMouseXRef.current;
      // Convert pointer velocity to angular tilt (clamped)
      const force = Math.max(-14, Math.min(14, deltaX * 0.45));
      targetAngleRef.current = force;
    }
    lastMouseXRef.current = e.clientX;
  };

  const handleMouseLeave = () => {
    lastMouseXRef.current = null;
    targetAngleRef.current = 0;
  };

  return (
    <section id="about" className="section-padding relative overflow-hidden" aria-label="About Yash Pallav Pathak">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-tag">
          <span>01</span>
          <span>—</span>
          <span>Profile & Identity</span>
        </div>
        <h2 className="section-heading">
          Engineered for <span className="heading-serif-accent">clarity.</span>
        </h2>

        {/* Three-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px_minmax(0,1fr)] gap-10 items-stretch mt-12">
          
          {/* Left Column: Summary & Links */}
          <div className="card-base p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-[#77756f] uppercase tracking-wider mb-3">
                Executive Profile
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0d0d0d] mb-6">
                Hi, I&apos;m {PROFILE.name}.
              </h3>
              <p className="text-sm md:text-base text-[#3a3a3a] leading-relaxed mb-6">
                {PROFILE.resumeSummary}
              </p>
              <p className="text-xs md:text-sm font-mono text-[#77756f] border-l-2 border-[#0d0d0d]/30 pl-4 py-1">
                3+ years executing enterprise full-stack delivery, DevSecOps compliance, and production AI/LLM pipelines.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#0d0d0d]/10 flex flex-wrap gap-3">
              <a
                href={PROFILE.resumePdf}
                download="Yash_Pathak_Resume.pdf"
                className="btn-pill-primary text-xs !py-2.5 !px-5"
              >
                Download Résumé
              </a>
              {PROFILE.github && (
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-secondary text-xs !py-2.5 !px-5"
                >
                  GitHub ↗
                </a>
              )}
              {PROFILE.linkedin && (
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-secondary text-xs !py-2.5 !px-5"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>

          {/* Centre Column: Hanging Lanyard ID Card */}
          <div
            className="flex flex-col items-center justify-start relative select-none py-4"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Lanyard Strap with Vertical Scrolling Ticker */}
            <div className="relative w-[32px] h-[64px] bg-[#0d0d0d] rounded-t-sm overflow-hidden flex flex-col items-center justify-start shadow-md py-1">
              <div
                className="flex flex-col gap-3 font-mono text-[7px] font-semibold tracking-widest text-[#ffffff]/80 uppercase [writing-mode:vertical-rl] whitespace-nowrap"
                style={{
                  animation: "ticker-vertical 8s linear infinite",
                }}
              >
                <span>SOLDEVPATH • DEVSECOPS • FULLSTACK • SDP</span>
                <span>SOLDEVPATH • DEVSECOPS • FULLSTACK • SDP</span>
              </div>
            </div>

            {/* Metal Lanyard Clip */}
            <div className="w-[18px] h-[12px] bg-gradient-to-b from-[#d4d4d8] via-[#e4e4e7] to-[#a1a1aa] rounded-sm shadow-sm -mt-0.5 z-20 flex items-center justify-center">
              <div className="w-[8px] h-[3px] bg-[#52525b] rounded-full" />
            </div>

            {/* Pendulum Swing Transform Container */}
            <div
              className="mt-1 transition-transform"
              style={{
                transformOrigin: "top center",
                transform: `rotate(${swingAngle}deg)`,
                willChange: "transform",
              }}
            >
              {/* 3D Flip Card Container */}
              <div
                ref={cardRef}
                tabIndex={0}
                role="button"
                aria-label="Developer ID Card. Press Enter or Space to flip."
                onClick={() => setIsFlipped(!isFlipped)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsFlipped(!isFlipped);
                  }
                }}
                className="w-[300px] h-[410px] relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] rounded-2xl"
                style={{
                  perspective: "1000px",
                }}
              >
                <div
                  className="w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* FRONT FACE */}
                  <div
                    className="absolute inset-0 w-full h-full bg-[#ffffff] rounded-2xl border border-[#0d0d0d]/15 shadow-xl flex flex-col justify-between overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {/* Top Black Header Band */}
                    <div className="bg-[#0d0d0d] text-[#ffffff] px-4 py-2.5 flex items-center justify-between">
                      <span className="font-mono text-[9px] tracking-widest uppercase font-bold text-emerald-400">
                        ● VERIFIED ACCESS
                      </span>
                      <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">
                        DEVELOPER ID
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="px-5 pt-3 pb-2 flex flex-col items-center flex-1 justify-between">
                      {/* Portrait Frame (128×156) with hover zoom and halo */}
                      <div className="relative w-[128px] h-[156px] rounded-xl overflow-hidden border-2 border-[#e4e4e7] p-1 bg-gradient-to-b from-[#f4f2ee] to-[#ffffff] shadow-inner group">
                        <div className="w-full h-full rounded-lg overflow-hidden relative">
                          <Image
                            src="/portrait-bust.png"
                            alt="Yash Pallav Pathak portrait"
                            fill
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            sizes="128px"
                          />
                        </div>
                      </div>

                      {/* Name & Role */}
                      <div className="text-center mt-2">
                        <div className="font-bold text-base text-[#0d0d0d] tracking-tight">
                          {PROFILE.name}
                        </div>
                        <div className="font-mono text-[10px] text-[#77756f] mt-0.5 leading-tight uppercase">
                          Full Stack & DevOps Specialist
                        </div>
                      </div>

                      {/* Metadata Table */}
                      <div className="w-full bg-[#f4f2ee]/80 rounded-lg p-2.5 space-y-1 font-mono text-[9px] text-[#3a3a3a] border border-[#0d0d0d]/5">
                        <div className="flex justify-between">
                          <span className="text-[#77756f]">ID NO:</span>
                          <span className="font-semibold text-[#0d0d0d]">{PROFILE.idNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#77756f]">DEPT:</span>
                          <span className="font-semibold text-[#0d0d0d]">CSE / Cloud Systems</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#77756f]">VALID TILL:</span>
                          <span className="font-semibold text-[#0d0d0d]">{PROFILE.validTill}</span>
                        </div>
                      </div>

                      {/* Bottom Barcode & Hologram */}
                      <div className="w-full pt-2 flex items-center justify-between border-t border-[#0d0d0d]/10">
                        {/* Barcode Lines */}
                        <div className="flex items-center gap-[2px] h-5 opacity-70">
                          {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3].map((w, idx) => (
                            <div
                              key={idx}
                              className="bg-[#0d0d0d] h-full"
                              style={{ width: `${w}px` }}
                            />
                          ))}
                        </div>

                        {/* Holographic Seal (Monochrome) */}
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#d4d4d8] via-[#f4f4f5] to-[#a1a1aa] border border-[#71717a] flex items-center justify-center shadow-xs">
                          <span className="font-mono text-[7px] font-bold text-[#0d0d0d]">
                            GEN
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className="absolute inset-0 w-full h-full bg-[#ffffff] rounded-2xl border border-[#0d0d0d]/15 shadow-xl p-5 flex flex-col justify-between overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div>
                      <div className="font-mono text-[10px] uppercase font-bold text-[#0d0d0d] tracking-wider border-b border-[#0d0d0d]/10 pb-2">
                        WHAT I AM · VERIFIED RECORD
                      </div>
                      <div className="mt-4 space-y-2.5 text-xs text-[#3a3a3a] font-normal leading-relaxed">
                        <p>
                          <strong className="text-[#0d0d0d]">Role:</strong> Co-Founder & Technical Delivery Lead (SolDevPath)
                        </p>
                        <p>
                          <strong className="text-[#0d0d0d]">Degree:</strong> B.Tech CSE (CGPA: {PROFILE.cgpa}, {PROFILE.rank})
                        </p>
                        <p>
                          <strong className="text-[#0d0d0d]">Key Platforms:</strong> SolScan CLI, SolAmi Health, NeZaaka West Africa, Tedekstra MacroTrack
                        </p>
                        <p>
                          <strong className="text-[#0d0d0d]">Research:</strong> Published IEEE Author in AI & UAV Image Processing
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-[#0d0d0d]/10 pt-3">
                      <div className="font-serif italic text-base text-[#0d0d0d]">
                        {PROFILE.name}
                      </div>
                      <div className="font-mono text-[9px] text-[#77756f] mt-1">
                        If found, say hello · {PROFILE.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center font-mono text-[10px] text-[#77756f] mt-3">
                [ Tap or click to flip card ]
              </div>
            </div>
          </div>

          {/* Right Column: Quick Facts & Paraphrased Quote */}
          <div className="card-base p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-[#77756f] uppercase tracking-wider mb-6">
                Quick Facts
              </div>

              <div className="space-y-4">
                <div className="border-b border-[#0d0d0d]/10 pb-3">
                  <div className="font-mono text-[10px] text-[#77756f] uppercase">Base Location</div>
                  <div className="text-sm font-semibold text-[#0d0d0d] mt-0.5">{PROFILE.location}</div>
                </div>

                <div className="border-b border-[#0d0d0d]/10 pb-3">
                  <div className="font-mono text-[10px] text-[#77756f] uppercase">Education</div>
                  <div className="text-sm font-semibold text-[#0d0d0d] mt-0.5">{PROFILE.degree}</div>
                  <div className="font-mono text-xs text-[#77756f]">{PROFILE.university} (CGPA: 9.07)</div>
                </div>

                <div className="border-b border-[#0d0d0d]/10 pb-3">
                  <div className="font-mono text-[10px] text-[#77756f] uppercase">Current Roles</div>
                  <div className="text-sm font-semibold text-[#0d0d0d] mt-0.5">Co-Founder, SolDevPath</div>
                  <div className="font-mono text-xs text-[#77756f]">DevOps Consultant (Tedekstra) & Solutions Architect (NeZaaka)</div>
                </div>

                <div className="pb-1">
                  <div className="font-mono text-[10px] text-[#77756f] uppercase">Direct Dispatch</div>
                  <div className="text-sm font-semibold text-[#0d0d0d] mt-0.5">{PROFILE.email}</div>
                  <div className="font-mono text-xs text-[#77756f]">{PROFILE.phone}</div>
                </div>
              </div>
            </div>

            {/* Resume Paraphrased Quote */}
            <div className="mt-8 pt-6 border-t border-[#0d0d0d]/10">
              <blockquote className="font-serif italic text-base md:text-lg text-[#0d0d0d] leading-snug">
                &ldquo;Engineering software that bridges rigorous security gates with seamless international user experiences.&rdquo;
              </blockquote>
              <div className="font-mono text-[10px] text-[#77756f] uppercase tracking-wider mt-2">
                — Professional Principle
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
