"use client";

import React, { useState, useEffect, useRef } from "react";
import { NAV_ITEMS, PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";
import { useScrollProgress } from "@/lib/hooks";

export function Navigation() {
  const { scrollToTarget } = useScroll();
  const scrollProgress = useScrollProgress();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Scroll detection for initial mark & frosted pill
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for tracking active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
      }
    );

    const sectionIds = ["hero", ...NAV_ITEMS.map((item) => item.id)];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Keyboard escape for mobile menu & body lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (id: string) => {
    scrollToTarget(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 2px ink scroll-progress bar along the very top */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#0d0d0d] z-50 pointer-events-none transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
        aria-hidden="true"
      />

      <header
        className="fixed top-0 left-0 w-full z-40 transition-all duration-300 pointer-events-none py-4 md:py-6"
        role="banner"
      >
        <div className="section-container flex items-center justify-between pointer-events-auto">
          {/* Left: Round initials mark + full name */}
          <button
            onClick={() => scrollToTarget("hero")}
            className="group flex items-center gap-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0d0d0d] rounded-full p-1"
            aria-label="Scroll to top"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-semibold tracking-wider transition-all duration-500 transform group-hover:rotate-360 ${
                hasScrolled
                  ? "bg-[#0d0d0d] text-[#ffffff] shadow-md border border-[#0d0d0d]"
                  : "border border-[#0d0d0d] text-[#0d0d0d] bg-[#ffffff]/60 backdrop-blur-sm"
              }`}
            >
              YP
            </div>
            <span
              className={`font-semibold tracking-tight text-sm text-[#0d0d0d] transition-all duration-300 ${
                hasScrolled ? "opacity-0 -translate-x-2 pointer-events-none" : "opacity-100 translate-x-0"
              }`}
            >
              {PROFILE.name}
            </span>
          </button>

          {/* Desktop Nav Pill */}
          <nav
            ref={navContainerRef}
            className="hidden md:flex items-center gap-1 p-1.5 rounded-full transition-all duration-500 relative bg-[#ffffff]/85 backdrop-blur-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#0d0d0d]/10"
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative z-10 px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-[#ffffff]"
                      : "text-[#3a3a3a] hover:text-[#0d0d0d]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute inset-0 bg-[#0d0d0d] rounded-full -z-10 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        boxShadow: "0 2px 10px rgba(13,13,13,0.2)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="px-4 py-2 rounded-full border border-[#0d0d0d]/20 bg-[#ffffff]/90 backdrop-blur-md text-xs uppercase tracking-wider font-medium text-[#0d0d0d] shadow-sm hover:border-[#0d0d0d]"
              aria-expanded={mobileMenuOpen}
              aria-label="Open mobile navigation menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-[#f4f2ee] transition-all duration-500 flex flex-col justify-between p-8 pb-12 md:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto [clip-path:circle(150%_at_top_right)]"
            : "opacity-0 pointer-events-none [clip-path:circle(0%_at_top_right)]"
        }`}
        style={{
          transition: "clip-path 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
          paddingBottom: "max(3rem, env(safe-area-inset-bottom, 2.5rem))",
          paddingTop: "max(2rem, env(safe-area-inset-top, 2rem))",
        }}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-full bg-[#0d0d0d] text-[#ffffff] flex items-center justify-center font-mono text-xs font-semibold">
            YP
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[#0d0d0d]/20 flex items-center justify-center text-sm font-mono hover:bg-[#0d0d0d] hover:text-[#ffffff] transition-colors"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-6 my-auto" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className="flex items-baseline gap-4 text-left group"
              style={{
                transitionDelay: `${idx * 50}ms`,
              }}
            >
              <span className="font-mono text-xs text-[#77756f]">
                {item.index}
              </span>
              <span className="text-3xl font-bold tracking-tight text-[#0d0d0d] group-hover:translate-x-2 transition-transform">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="border-t border-[#0d0d0d]/10 pt-6 flex flex-col gap-2 font-mono text-xs text-[#77756f]">
          <span>{PROFILE.email}</span>
          <span>{PROFILE.location}</span>
        </div>
      </div>
    </>
  );
}
