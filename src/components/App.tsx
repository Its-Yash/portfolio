"use client";

import React, { useEffect } from "react";
import { SmoothScrollProvider } from "@/lib/scroll";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { Certifications } from "@/components/sections/Certifications";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";

export function App() {
  // Global RevealObserver for .rv and .rv-mask elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const elements = document.querySelectorAll(".rv, .rv-mask");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#f4f2ee] text-[#0d0d0d] selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
        {/* Fixed Navigation */}
        <Navigation />

        {/* Main Content Flow: Hero → About → Skills → Work → Certifications → Experience → Achievements → Contact */}
        <main id="main-content" role="main" className="relative">
          <Hero />
          <About />
          <Skills />
          <Work />
          <Certifications />
          <Experience />
          <Achievements />
        </main>

        {/* Footer & Contact */}
        <Contact />
      </div>
    </SmoothScrollProvider>
  );
}
