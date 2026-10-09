# Yash Pallav Pathak — Personal Portfolio

> A minimal, editorial personal portfolio built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, and Lenis.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-black?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-black?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-black?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

---

## 1. Quick Start

### Prerequisites
- Node.js 18.17+ or 20+
- Python 3.9+ with FFmpeg (for video pipeline rebuilding)

### Installation & Run

```bash
# Clone or navigate to the repository
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the live site.

### Production Build

```bash
# Generate static optimized export in out/
npm run build
```

---

## 2. Sections Table

| Index | Section | Component | Description & Key Interaction |
| :---: | :--- | :--- | :--- |
| **00** | **Hero** | `src/components/hero/Hero.tsx` | Centered video blended with `mix-blend-multiply`, looping audio with graceful autoplay fallback, IntersectionObserver audio pause on scroll, sound button with ping ring. |
| **01** | **About** | `src/components/sections/About.tsx` | 3-column grid with a physics-based pendulum swinging ID card on a scrolling lanyard strap, 3D flip on hover/tap/keyboard. |
| **02** | **Skills** | `src/components/sections/Skills.tsx` | Periodic Table of 56 skills across 8 columns, diagonal wave delay reveal, family filters, and a 320 px sticky inspector with pop-in brand logos. |
| **03** | **Work** | `src/components/sections/Work.tsx` | Expanding accordion gallery with `flex: 8` active panel, folding spines, illustrative mini-UIs in CSS/JSX, and mobile accordion. |
| **04** | **Certifications** | `src/components/sections/Certifications.tsx` | Ink-flood numbered index with `scaleX(0 → 1)` hover transitions, slide-in arrows, and IEEE paper link. |
| **05** | **Experience** | `src/components/sections/Experience.tsx` | Unified chronological path combining education and enterprise work, with a dynamically drawn spine that illuminates nodes on scroll. |
| **06** | **Achievements** | `src/components/sections/Achievements.tsx` | Pinned horizontal gallery (`100svh`, sticky) driven by vertical scroll, featuring 72 px brand glow logo tiles and 1.4s `easeOutQuart` number counters. |
| **07** | **Contact** | `src/components/sections/Contact.tsx` | Bouncing interactive letter heading, quick-copy email chip with `aria-live`, spinning badge, and back-to-top trigger. |

---

## 3. How to Rebuild Hero Assets

The video pipeline script `scripts/build-hero-assets.py` converts any raw 16:9 introduction video into a seamless looping clip with a whitened background and portrait stills:

```bash
python scripts/build-hero-assets.py path/to/intro.mp4
```

### Pipeline Steps:
1. **Centering & Cropping:** Crops person tightly from head to toe (default 600×700 region, scaled to 768w).
2. **Backdrop Whitening:** Applies `colorlevels=rimax=0.98:gimax=0.98:bimax=0.98` so off-white backgrounds match pure white and blend invisibly with `--paper` using `mix-blend-mode: multiply`.
3. **Seamless Crossfade:** Video and audio are crossfaded across a 0.5s boundary so the video loops endlessly without audible jumps or visual popping.
4. **Dual Format Export:** Exports `hero.webm` (VP9 + Opus) and `hero.mp4` (H.264 + AAC, `+faststart`).
5. **Stills:** Exports `portrait-bust.webp` (480×600) and `og.jpg` (1200×630).

---

## 4. Brand Logos & Licenses

- All brand SVG logos (Python, React, TypeScript, Tailwind, Docker, Kubernetes, AWS, Azure, MongoDB, PostgreSQL, etc.) are based on open-source vector sets from **Simple Icons** and **Devicon**, licensed under the **MIT License**.
- Concept icons (Agents, DevSecOps, REST, RAG, WebSockets) and custom badges are bespoke minimalist vector paths released under the project's MIT License.
- Detailed licensing notes are kept in `public/logos/LICENSE.txt`.

---

## 5. Design Principles

- **Zero Fabrication:** Every metric, role, publication, and technology is strictly sourced from Yash Pallav Pathak's verified curriculum vitae and authenticated project portfolios.
- **Pure Monochromatic Palette:** Off-white (`#f4f2ee`), crisp card backgrounds (`#ffffff`), and deep ink (`#0d0d0d`) typography. Brand logos maintain authentic colors with subtle brand-tint glows.
- **Accessibility & Motion:** Full support for `prefers-reduced-motion`, semantic heading hierarchy, keyboard navigable cards and modals, and zero horizontal scroll overflow across viewports from 360 px to 1920 px.
