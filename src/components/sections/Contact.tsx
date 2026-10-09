"use client";

import React, { useState } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

export function Contact() {
  const { scrollToTarget } = useScroll();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(PROFILE.email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = PROFILE.email;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = PROFILE.email;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
      } catch {
        // clipboard unavailable
      }
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const line1 = "Let's build";
  const line2 = "something together.";

  return (
    <footer
      id="contact"
      className="section-padding bg-[#f4f2ee] border-t border-[#0d0d0d]/10 relative overflow-hidden"
      aria-label="Contact and footer"
    >
      <div className="section-container">
        {/* Section Header Tag */}
        <div className="section-tag">
          <span>07</span>
          <span>—</span>
          <span>Direct Dispatch</span>
        </div>

        {/* Huge Interactive Heading with bouncing letters */}
        <div className="mt-8 mb-16 select-none">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#0d0d0d] leading-[1.05]">
            <div className="flex flex-wrap">
              {line1.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block transition-transform duration-200 hover:-translate-y-4 hover:text-[#77756f] cursor-default"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap mt-1">
              {line2.split("").map((char, i) => (
                <span
                  key={i}
                  className={`inline-block transition-transform duration-200 hover:-translate-y-4 cursor-default ${
                    i >= 10 ? "font-serif italic font-normal text-[#77756f]" : ""
                  }`}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </h2>
        </div>

        {/* Contact Links & Circular Spinning Badge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-20 border-b border-[#0d0d0d]/10">
          
          {/* Left: Email, Phone, Socials */}
          <div className="lg:col-span-8 space-y-8">
            {/* Email with Copy Chip */}
            <div>
              <div className="font-mono text-xs text-[#77756f] uppercase tracking-wider mb-2">
                Primary Inquiry Inbox
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0d0d0d] border-b-2 border-[#0d0d0d]/20 pb-1.5 hover:border-[#0d0d0d] transition-colors"
                >
                  {PROFILE.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="font-mono text-xs px-3.5 py-1.5 rounded-full border border-[#0d0d0d]/20 bg-[#ffffff] text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-[#ffffff] transition-all cursor-pointer"
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
              <div aria-live="polite" className="sr-only">
                {copied ? "Email copied to clipboard" : ""}
              </div>
            </div>

            {/* Direct Channels */}
            <div className="flex flex-wrap items-center gap-6 pt-4 font-mono text-xs sm:text-sm">
              <a
                href={PROFILE.phoneHref}
                className="text-[#0d0d0d] hover:text-[#77756f] transition-colors"
              >
                📞 {PROFILE.phone}
              </a>
              <span className="text-[#0d0d0d]/20">/</span>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0d0d0d] hover:text-[#77756f] transition-colors"
              >
                GitHub ↗
              </a>
              <span className="text-[#0d0d0d]/20">/</span>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0d0d0d] hover:text-[#77756f] transition-colors"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Right: Circular 'Say Hello' Spinning Text Badge */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Spinning SVG Text Circle */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full spin-slow"
                aria-hidden="true"
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="font-mono text-[9px] uppercase tracking-[0.22em] fill-[#0d0d0d]">
                  <textPath href="#circlePath">
                    ✦ SAY HELLO ✦ GET IN TOUCH ✦
                  </textPath>
                </text>
              </svg>

              {/* Centre Dot */}
              <div className="w-4 h-4 rounded-full bg-[#0d0d0d] flex items-center justify-center text-[8px] text-[#ffffff] font-mono">
                ✦
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#77756f]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Built with Next.js 15 & Tailwind 4</span>
            <button
              onClick={() => scrollToTarget("hero")}
              className="text-[#0d0d0d] hover:text-[#77756f] underline cursor-pointer"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
