"use client";

import React from "react";
import { CERTIFICATIONS } from "@/lib/data";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="section-padding relative overflow-hidden"
      aria-label="Certifications and academic honours"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Sticky Heading + Count Line */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="section-tag">
              <span>04</span>
              <span>—</span>
              <span>Accreditations & Talks</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0d0d0d] leading-[1.05]">
              Always <span className="heading-serif-accent">learning.</span>
            </h2>
            <p className="mt-4 font-mono text-xs text-[#77756f]">
              {CERTIFICATIONS.length.toString().padStart(2, "0")} VERIFIED CREDENTIALS & SPEAKING KEYNOTES
            </p>
            <p className="mt-2 text-xs text-[#3a3a3a] leading-relaxed max-w-sm">
              Academic honors, peer-reviewed IEEE publications, developer conference keynotes, and collegiate hackathon lead host accreditations.
            </p>
          </div>

          {/* Right Column: Numbered List with Ink-Flood Rows */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-[#0d0d0d]/10 bg-[#ffffff] rounded-3xl border border-[#0d0d0d]/10 overflow-hidden shadow-sm">
            {CERTIFICATIONS.map((cert) => {
              const Tag = cert.link ? "a" : "div";
              const extraProps = cert.link
                ? {
                    href: cert.link,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : {};

              return (
                <Tag
                  key={cert.index}
                  {...extraProps}
                  className="group relative p-6 sm:p-8 cursor-pointer overflow-hidden transition-colors duration-300 block"
                >
                  {/* Ink-Flood background transition (scaleX 0 -> 1) */}
                  <div
                    className="absolute inset-0 bg-[#0d0d0d] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 -z-0"
                    aria-hidden="true"
                  />

                  {/* Row Content */}
                  <div className="relative z-10 flex items-start justify-between gap-6">
                    <div className="flex items-start gap-6 sm:gap-8">
                      <span className="font-mono text-sm sm:text-base font-semibold text-[#77756f] group-hover:text-[#ffffff]/60 transition-colors pt-0.5">
                        {cert.index}
                      </span>
                      <div>
                        <div className="font-mono text-[10px] text-[#77756f] group-hover:text-[#ffffff]/70 uppercase tracking-wider mb-1 transition-colors">
                          {cert.issuer} · {cert.category}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#0d0d0d] group-hover:text-[#ffffff] transition-colors">
                          {cert.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-[#3a3a3a] group-hover:text-[#ffffff]/80 transition-colors leading-relaxed">
                          {cert.detail}
                        </p>
                      </div>
                    </div>

                    {/* Arrow slides in on hover */}
                    <div className="font-mono text-lg text-[#0d0d0d] group-hover:text-[#ffffff] transition-all duration-300 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 pt-1 shrink-0">
                      ↗
                    </div>
                  </div>
                </Tag>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
