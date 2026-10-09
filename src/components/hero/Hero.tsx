"use client";

import React, { useRef, useState, useEffect } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

export function Hero() {
  const { scrollToTarget } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Video initialization and autoplay handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try playing with sound initially
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlayingSound(true);
          setAutoplayBlocked(false);
        })
        .catch(() => {
          // Browser blocked unmuted autoplay: fall back to muted
          video.muted = true;
          video.play().catch(() => {});
          setIsPlayingSound(false);
          setAutoplayBlocked(true);
        });
    }

    // Unlock sound on first user gesture anywhere
    const unlockSound = () => {
      if (video && video.muted) {
        video.muted = false;
        video
          .play()
          .then(() => {
            setIsPlayingSound(true);
            setAutoplayBlocked(false);
          })
          .catch(() => {});
      }
      removeUnlockListeners();
    };

    const removeUnlockListeners = () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };

    window.addEventListener("pointerdown", unlockSound, { once: true });
    window.addEventListener("keydown", unlockSound, { once: true });
    window.addEventListener("touchend", unlockSound, { once: true });

    return () => {
      removeUnlockListeners();
    };
  }, []);

  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // IntersectionObserver: pauses video when < 35% visible, resumes when scrolling back
  useEffect(() => {
    const heroEl = heroRef.current;
    const video = videoRef.current;
    if (!heroEl || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio < 0.35) {
            video.pause();
            setIsHeroVisible(false);
          } else {
            video.play().catch(() => {});
            setIsHeroVisible(true);
          }
        });
      },
      {
        threshold: [0, 0.35, 0.5, 1],
      }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  // Toggle sound manually
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted || video.volume === 0) {
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {});
      setIsPlayingSound(true);
      setAutoplayBlocked(false);
    } else {
      video.muted = true;
      setIsPlayingSound(false);
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden pt-24 pb-12 bg-[#f4f2ee]"
      style={{ isolation: "isolate" }}
      aria-label="Introduction hero"
    >
      {/* Giant outlined ghost word behind the person */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-bold tracking-tighter text-transparent uppercase opacity-[0.06] text-[24vw] md:text-[20vw] leading-none"
          style={{
            WebkitTextStroke: "2px #0d0d0d",
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* Video Container (Centred, large, mix-blend-multiply without stacking context trap) */}
      <div className="absolute inset-0 flex items-start md:items-center justify-center pt-20 md:pt-10 pointer-events-none">
        <div className="relative w-auto h-[52svh] md:h-[min(88svh,880px)] aspect-[768/960] max-w-full">
          <video
            ref={videoRef}
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center mix-blend-multiply pointer-events-auto"
            aria-label="Yash introducing himself and speaking to camera"
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
            Your browser does not support video playback.
          </video>
        </div>
      </div>

      {/* Hero Top Tag / Subtitle */}
      <div className="section-container relative z-20 pt-4 md:pt-6">
        <div className="flex items-center justify-between">
          <div className="section-tag !mb-0">
            <span>00</span>
            <span>—</span>
            <span>Personal Portfolio</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[#77756f]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for Global Engagements</span>
          </div>
        </div>
      </div>

      {/* Hero Bottom Content & CTAs */}
      <div className="section-container relative z-20 mt-auto pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          {/* Main Role Heading */}
          <div className="md:col-span-8 lg:col-span-7 xl:col-span-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-[#0d0d0d] leading-[0.95]">
              Full Stack{" "}
              <span className="font-serif italic font-normal text-[#77756f]">
                Developer.
              </span>
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-[#3a3a3a] max-w-lg font-normal leading-relaxed">
              Architecting resilient cloud architectures, local-first DevSecOps pipelines, and production multimodal AI systems across international enterprises.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="md:col-span-4 lg:col-span-5 xl:col-span-6 flex flex-wrap md:flex-col items-start md:items-end gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => scrollToTarget("work")}
                className="btn-pill-primary text-xs sm:text-sm !py-3 !px-5"
              >
                Explore work
              </button>
              <button
                onClick={() => scrollToTarget("contact")}
                className="btn-pill-secondary text-xs sm:text-sm !py-3 !px-5"
              >
                Let&apos;s talk
              </button>
            </div>
            <a
              href={PROFILE.resumePdf}
              download="Yash_Pathak_Resume.pdf"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#0d0d0d] hover:text-[#77756f] transition-colors py-1 px-2 border-b border-[#0d0d0d]/30"
            >
              <span>Résumé</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Sound Control Button (responsive 42px on mobile / 46px on desktop) */}
      <div className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 transition-opacity duration-300 ${isHeroVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="relative">
          {autoplayBlocked && (
            <span
              className="absolute -inset-1 rounded-full bg-[#0d0d0d]/15 animate-ping pointer-events-none"
              aria-hidden="true"
            />
          )}
          <button
            onClick={toggleSound}
            className="w-10 h-10 sm:w-[46px] sm:h-[46px] rounded-full bg-[#0d0d0d] text-[#ffffff] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d0d0d]"
            aria-label={isPlayingSound ? "Mute introduction video audio" : "Unmute introduction video audio"}
          >
            {isPlayingSound ? (
              // ❚❚ Pause / Mute icon
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="5" y="4" width="4" height="16" rx="1" />
                <rect x="15" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              // ▶ Play / Unmute icon
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
