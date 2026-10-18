export interface DesignStyle {
  id: string;
  name: string;
  category: 'Modernist' | 'Cyber' | 'Tactile' | 'Artistic';
  subtitle: string;
  description: string;
  eraOrOrigin: string;
  keyTokens: {
    borderRadius: string;
    shadow: string;
    border: string;
    typography: string;
  };
  cssSnippet: string;
}

export const DESIGN_CATEGORIES = [
  'All',
  'Modernist',
  'Cyber',
  'Tactile',
  'Artistic',
] as const;

export type DesignCategory = typeof DESIGN_CATEGORIES[number];

export const DESIGN_STYLES: DesignStyle[] = [
  {
    id: 'claymorphism',
    name: 'Claymorphism',
    category: 'Tactile',
    subtitle: 'Inflated 3D Matte Surfaces',
    description: 'Soft, tactile, and pillowy. Utilizes rounded geometric volumes with dual inner highlights and floating diffuse drop shadows in warm paper tones.',
    eraOrOrigin: 'Modern UI Evolution (2021)',
    keyTokens: {
      borderRadius: '28px – 36px',
      shadow: '0 16px 32px rgba(13,13,13,.08), inset 2px 2px 4px #fff, inset -3px -3px 6px rgba(13,13,13,.07)',
      border: 'none',
      typography: 'Inter Tight rounded geometry',
    },
    cssSnippet: `/* Claymorphism (Monochrome) */
border-radius: 32px;
background: #f4f2ee;
box-shadow: 
  0 18px 36px -6px rgba(13, 13, 13, 0.08),
  inset 2px 2px 4px rgba(255, 255, 255, 0.95),
  inset -3px -3px 6px rgba(13, 13, 13, 0.07);`,
  },
  {
    id: 'cybercore',
    name: 'Cybercore',
    category: 'Cyber',
    subtitle: 'Technical Monospace HUD Blueprint',
    description: 'High-density computational aesthetic. Features monospace telemetry, crosshair registration marks, hairline grid division rules, and system diagnostic readouts.',
    eraOrOrigin: 'Digital Brutalism & Terminal Interfaces',
    keyTokens: {
      borderRadius: '0px (Sharp Right Angles)',
      shadow: 'none',
      border: '1px dashed rgba(13,13,13,.35)',
      typography: 'JetBrains Mono uppercase tracking',
    },
    cssSnippet: `/* Cybercore Technical HUD */
border-radius: 0px;
border: 1px dashed rgba(13, 13, 13, 0.35);
font-family: 'JetBrains Mono', monospace;
background: repeating-linear-gradient(
  0deg, transparent, transparent 19px,
  rgba(13, 13, 13, 0.04) 20px
);`,
  },
  {
    id: 'neo-brutalism',
    name: 'Neo-Brutalism',
    category: 'Tactile',
    subtitle: 'High-Contrast Solid Offset Shadows',
    description: 'Unapologetic, playful geometry. Heavy solid black borders with zero-blur offset drop shadows and physical tactile button depression on interaction.',
    eraOrOrigin: 'Figma & Gumroad Web Renaissance',
    keyTokens: {
      borderRadius: '6px – 12px',
      shadow: '5px 5px 0px #0d0d0d',
      border: '2.5px solid #0d0d0d',
      typography: 'Inter Tight 800 with tight tracking',
    },
    cssSnippet: `/* Neo-Brutalism */
border: 2.5px solid #0d0d0d;
border-radius: 10px;
box-shadow: 5px 5px 0px #0d0d0d;
transition: transform 0.1s ease, box-shadow 0.1s ease;
&:active {
  transform: translate(2px, 2px);
  box-shadow: 3px 3px 0px #0d0d0d;
}`,
  },
  {
    id: 'scrapbook',
    name: 'Scrapbook',
    category: 'Artistic',
    subtitle: 'Physical Collage & Paper Texture',
    description: 'Crafted, organic tactile nostalgia. Subtle rotational skews, translucent washi-tape tape strips, paper-clipped headers, and typewriter field notes.',
    eraOrOrigin: 'Handcrafted Editorial & Zine Culture',
    keyTokens: {
      borderRadius: '2px (Subtle Raw Cut)',
      shadow: '0 8px 18px rgba(13,13,13,.06)',
      border: '1px solid rgba(13,13,13,.12)',
      typography: 'Hand-set type with rotational offsets',
    },
    cssSnippet: `/* Scrapbook / Collage */
transform: rotate(-1.4deg);
border-radius: 2px;
background: #ffffff;
box-shadow: 0 10px 22px rgba(13, 13, 13, 0.07);
/* Washi tape anchor */
&::before {
  content: '';
  position: absolute;
  top: -10px; left: 50%; transform: translateX(-50%);
  width: 70px; height: 18px;
  background: rgba(220, 216, 208, 0.75);
}`,
  },
  {
    id: 'surrealism',
    name: 'Surrealism',
    category: 'Artistic',
    subtitle: 'Dreamlike Floating Spatial Elevations',
    description: 'Defying conventional UI gravity. Features unexpected floating spatial planes, ultra-deep multi-stage atmospheric shadows, and ethereal cloud silhouettes.',
    eraOrOrigin: '20th Century Avant-Garde',
    keyTokens: {
      borderRadius: '24px',
      shadow: '0 32px 64px -12px rgba(13,13,13,.18)',
      border: '1px solid rgba(255,255,255,.8)',
      typography: 'Inter Tight + Instrument Serif',
    },
    cssSnippet: `/* Surrealist Floating Elevation */
border-radius: 24px;
background: linear-gradient(135deg, #ffffff 0%, #f4f2ee 100%);
box-shadow: 
  0 30px 60px -12px rgba(13, 13, 13, 0.18),
  0 12px 24px -6px rgba(13, 13, 13, 0.08);`,
  },
  {
    id: 'y2k-aesthetic',
    name: 'Y2K Aesthetic',
    category: 'Cyber',
    subtitle: 'Cyber Chrome & Glossy Capsules',
    description: 'Late 90s cyber-optimism. Glossy capsule pills, specular metallic light bounce, star burst glyphs (✦ ✧), and liquid bubble geometry translated to monochrome.',
    eraOrOrigin: 'Turn-of-the-Millennium Digital Boom',
    keyTokens: {
      borderRadius: '9999px (Capsule Pill)',
      shadow: 'inset 0 1px 2px #fff, 0 8px 16px rgba(13,13,13,.1)',
      border: '1.5px solid rgba(13,13,13,.2)',
      typography: 'Bold rounded sans-serif + Cyber Stars',
    },
    cssSnippet: `/* Y2K Chrome Specular Capsule */
border-radius: 9999px;
background: linear-gradient(
  180deg, 
  rgba(255, 255, 255, 0.95) 0%, 
  rgba(235, 232, 226, 0.6) 48%, 
  rgba(215, 210, 203, 0.9) 52%, 
  rgba(244, 242, 238, 1) 100%
);
border: 1.5px solid rgba(13, 13, 13, 0.25);`,
  },
  {
    id: 'pixel-art',
    name: 'Pixel Art',
    category: 'Cyber',
    subtitle: '8-Bit Stepped Raster Geometry',
    description: 'Retro computing nostalgia. Stepped box-shadow borders that simulate low-resolution CRT displays, pixelated status icons, and modular retro gaming stat bars.',
    eraOrOrigin: '1980s Arcade & Microcomputer Era',
    keyTokens: {
      borderRadius: '0px (Stepped Pixel Edges)',
      shadow: '3px 0 0 #0d0d0d, -3px 0 0 #0d0d0d, 0 3px 0 #0d0d0d, 0 -3px 0 #0d0d0d',
      border: 'none',
      typography: 'JetBrains Mono pixel block tracking',
    },
    cssSnippet: `/* 8-Bit Pixel Art Border */
border-radius: 0px;
box-shadow: 
  3px 0 0 0 #0d0d0d,
  -3px 0 0 0 #0d0d0d,
  0 3px 0 0 #0d0d0d,
  0 -3px 0 0 #0d0d0d;
image-rendering: pixelated;`,
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    category: 'Cyber',
    subtitle: 'Perspective Grid & Horizon Lines',
    description: '80s retro-futuristic virtual space. Features an isometric 3D perspective floor wireframe, infinite horizon dividing rules, and dynamic vector vector grids in monochrome ink.',
    eraOrOrigin: 'Outrun & 1980s Neon Futurism',
    keyTokens: {
      borderRadius: '8px',
      shadow: '0 12px 28px rgba(13,13,13,.12)',
      border: '1px solid rgba(13,13,13,.3)',
      typography: 'All-caps tracking + speedline dividers',
    },
    cssSnippet: `/* Monochrome Synthwave Perspective Grid */
background-image: 
  linear-gradient(rgba(13, 13, 13, 0.12) 1px, transparent 1px),
  linear-gradient(90deg, rgba(13, 13, 13, 0.12) 1px, transparent 1px);
background-size: 20px 20px;
perspective: 600px;`,
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    category: 'Tactile',
    subtitle: 'Frosted Translucent Optical Blur',
    description: 'Multi-layer depth with frosted glass. Employs high-order backdrop blur, translucent white surfaces, and crisp 1px specular border highlights.',
    eraOrOrigin: 'macOS Big Sur & Modern Spatial UI',
    keyTokens: {
      borderRadius: '24px',
      shadow: '0 20px 40px rgba(13,13,13,.07)',
      border: '1px solid rgba(255,255,255,.65)',
      typography: 'Clean Inter Tight with soft text shadow',
    },
    cssSnippet: `/* Frosted Glassmorphism */
background: rgba(255, 255, 255, 0.55);
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.7);
box-shadow: 0 20px 40px rgba(13, 13, 13, 0.08);`,
  },
  {
    id: 'neumorphism',
    name: 'Neumorphism',
    category: 'Tactile',
    subtitle: 'Soft Embossed Canvas Extrusions',
    description: 'Soft UI sculpted from the background. Shapes emerge directly from the #f4f2ee canvas using twin light and dark shadows for a smooth, extruded surface.',
    eraOrOrigin: 'Soft UI Design Wave (2020)',
    keyTokens: {
      borderRadius: '24px',
      shadow: '9px 9px 18px #dedbd4, -9px -9px 18px #ffffff',
      border: 'none',
      typography: 'Subtle debossed & embossed labels',
    },
    cssSnippet: `/* Neumorphic Extrusion (Extruded & Inset) */
background: #f4f2ee;
border-radius: 24px;
box-shadow: 
  8px 8px 18px #dedbd4,
  -8px -8px 18px #ffffff;
/* Inset state on click: */
/* box-shadow: inset 5px 5px 10px #dedbd4, inset -5px -5px 10px #ffffff; */`,
  },
  {
    id: 'bento-grid',
    name: 'Bento Grid',
    category: 'Modernist',
    subtitle: 'Modular Asymmetric Compartments',
    description: 'Inspired by Japanese bento boxes and contemporary Apple hardware pages. Segmented content compartments with varied column spans and unified rounded corners.',
    eraOrOrigin: 'Modern Product Hardware & Apple UI',
    keyTokens: {
      borderRadius: '20px',
      shadow: '0 4px 12px rgba(13,13,13,.04)',
      border: '1px solid rgba(13,13,13,.08)',
      typography: 'Structured modular typography headers',
    },
    cssSnippet: `/* Bento Grid Architecture */
display: grid;
grid-template-columns: repeat(12, 1fr);
gap: 16px;
border-radius: 20px;
background: #ffffff;
border: 1px solid rgba(13, 13, 13, 0.08);`,
  },
  {
    id: 'editorial-design',
    name: 'Editorial Design',
    category: 'Modernist',
    subtitle: 'High-Fashion Magazine Layouts',
    description: 'Literary elegance and dramatic scale contrasts. Oversized Instrument Serif italic headlines paired with disciplined multi-column body text and column rules.',
    eraOrOrigin: 'Print Publishing & Vogue Art Direction',
    keyTokens: {
      borderRadius: '0px (Pure Clean Edges)',
      shadow: 'none',
      border: 'none (Hairline Dividers Only)',
      typography: 'Instrument Serif Italic 72px + Inter Tight',
    },
    cssSnippet: `/* Editorial Typography & Layout */
font-family: 'Instrument Serif', serif;
font-style: italic;
font-size: clamp(38px, 6vw, 64px);
line-height: 0.95;
border-bottom: 1px solid rgba(13, 13, 13, 0.15);
padding-bottom: 24px;`,
  },
  {
    id: 'swiss-design',
    name: 'Swiss Design',
    category: 'Modernist',
    subtitle: 'International Typographic Style',
    description: 'Objective, mathematical clarity. Strict asymmetric grid alignment, bold grotesque sans-serif headers, structured metadata numbering, and stark contrast.',
    eraOrOrigin: '1950s Basel & Zürich Typography',
    keyTokens: {
      borderRadius: '0px',
      shadow: 'none',
      border: '2px solid #0d0d0d',
      typography: 'Inter Tight Bold with asymmetric grid offset',
    },
    cssSnippet: `/* Swiss International Typographic Style */
display: grid;
grid-template-columns: 80px 1fr;
border: 2px solid #0d0d0d;
font-family: 'Inter Tight', sans-serif;
font-weight: 800;
letter-spacing: -0.04em;`,
  },
  {
    id: 'minimalism',
    name: 'Minimalism',
    category: 'Modernist',
    subtitle: 'Radical Reduction to Essentials',
    description: 'Less, but better. Zero superfluous borders, zero decorative drop shadows, and zero fluff. Every pixel is justified purely by negative space and typographic proportion.',
    eraOrOrigin: 'Dieter Rams & Bauhaus Principles',
    keyTokens: {
      borderRadius: '0px',
      shadow: 'none',
      border: 'none',
      typography: 'Generous whitespace with strict scale',
    },
    cssSnippet: `/* Radical Minimalism */
background: transparent;
border: none;
box-shadow: none;
padding: 48px;
letter-spacing: -0.025em;`,
  },
  {
    id: 'maximalism',
    name: 'Maximalism',
    category: 'Artistic',
    subtitle: 'High-Density Layered Collage',
    description: 'More is more. Rich collage of layered diagnostic badges, overlapping sticker tags, dense system telemetry readouts, and vibrant typographic counterpoint.',
    eraOrOrigin: 'Post-Digital Graphic Maximalism',
    keyTokens: {
      borderRadius: '14px',
      shadow: '0 8px 24px rgba(13,13,13,.12)',
      border: '1.5px solid #0d0d0d',
      typography: 'Layered multi-font density',
    },
    cssSnippet: `/* Maximalist Layering */
position: relative;
display: flex;
flex-wrap: wrap;
gap: 10px;
border: 1.5px solid #0d0d0d;
background: #ffffff;
box-shadow: 4px 4px 0 #0d0d0d, 8px 8px 0 rgba(13,13,13,0.15);`,
  },
  {
    id: 'luxury-typography',
    name: 'Luxury Typography',
    category: 'Modernist',
    subtitle: 'High-Fashion Haute Horlogerie',
    description: 'Understated luxury. Roman numeral indices, delicate hairline rules, generous tracking on small caps, high-contrast serif ligatures, and quiet sophistication.',
    eraOrOrigin: 'High-End Horology & Parisian Fashion',
    keyTokens: {
      borderRadius: '2px',
      shadow: '0 2px 8px rgba(13,13,13,.03)',
      border: '1px solid rgba(13,13,13,.1)',
      typography: 'Instrument Serif + JetBrains Mono tracking',
    },
    cssSnippet: `/* Luxury Haute Horlogerie */
letter-spacing: 0.18em;
text-transform: uppercase;
font-family: 'Instrument Serif', serif;
border: 1px solid rgba(13, 13, 13, 0.12);
background: #ffffff;`,
  },
  {
    id: 'conceptual-sketch',
    name: 'Conceptual Sketch',
    category: 'Artistic',
    subtitle: 'Architectural Drafting & Dimension Lines',
    description: 'The engineer\'s drafting board. Graph paper background grids, dimension measurement indicators (|← 320px →|), construction guide marks, and blueprint crosshairs.',
    eraOrOrigin: 'Architectural Technical Drafting',
    keyTokens: {
      borderRadius: '0px',
      shadow: 'none',
      border: '1px solid rgba(13,13,13,.2)',
      typography: 'Technical monospace with dimension markers',
    },
    cssSnippet: `/* Architectural Drafting Sketch */
background-image: 
  radial-gradient(rgba(13, 13, 13, 0.15) 1px, transparent 1px);
background-size: 16px 16px;
border: 1px solid rgba(13, 13, 13, 0.25);
position: relative;`,
  },
  {
    id: 'ethereal',
    name: 'Ethereal',
    category: 'Artistic',
    subtitle: 'Atmospheric Luminous Diffusion',
    description: 'Soft, glowing spatial presence. Gentle radial light halos behind floating translucent panels, subtle gradient diffusion, and meditative calm.',
    eraOrOrigin: 'Ambient & Meditative Interface Design',
    keyTokens: {
      borderRadius: '32px',
      shadow: '0 24px 60px rgba(13,13,13,.08)',
      border: '1px solid rgba(255,255,255,.9)',
      typography: 'Inter Tight light with soft tracking',
    },
    cssSnippet: `/* Ethereal Luminous Diffusion */
border-radius: 32px;
background: rgba(255, 255, 255, 0.85);
backdrop-filter: blur(24px);
box-shadow: 
  0 20px 50px rgba(13, 13, 13, 0.06),
  0 0 80px rgba(255, 255, 255, 0.8);`,
  },
  {
    id: 'bohemian',
    name: 'Bohemian',
    category: 'Artistic',
    subtitle: 'Organic Deckled Warmth & Artisanal Flow',
    description: 'Handcrafted individuality. Organic softened borders, natural hand-drawn dividing motifs, warm relaxed spacing, and artisanal typographic cadence.',
    eraOrOrigin: 'Art & Craft Movement',
    keyTokens: {
      borderRadius: '24px 14px 28px 16px',
      shadow: '0 8px 20px rgba(13,13,13,.04)',
      border: '1.5px solid rgba(13,13,13,.15)',
      typography: 'Instrument Serif with warm conversational tone',
    },
    cssSnippet: `/* Bohemian Artisanal Organic */
border-radius: 24px 14px 28px 16px;
border: 1.5px solid rgba(13, 13, 13, 0.16);
background: #ffffff;
box-shadow: 0 8px 22px rgba(13, 13, 13, 0.05);`,
  },
  {
    id: 'victorian',
    name: 'Victorian',
    category: 'Artistic',
    subtitle: 'Ornate Classical Framing & Corner Filigree',
    description: '19th-century typographical craftsmanship. Engraved classical corner brackets (⌜ ⌝ ⌞ ⌟), decorative borders, and monogram crest styling in rich monochrome.',
    eraOrOrigin: '19th Century British Print Typography',
    keyTokens: {
      borderRadius: '0px',
      shadow: 'inset 0 0 0 4px #ffffff, inset 0 0 0 5px #0d0d0d',
      border: '2px solid #0d0d0d',
      typography: 'Instrument Serif with classical roman markers',
    },
    cssSnippet: `/* Victorian Classical Framing */
border: 2px solid #0d0d0d;
box-shadow: 
  inset 0 0 0 3px #ffffff,
  inset 0 0 0 4.5px #0d0d0d;
font-family: 'Instrument Serif', serif;
position: relative;`,
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    category: 'Cyber',
    subtitle: 'High-Tech Low-Life HUD Telemetry',
    description: 'Industrial combat-deck telemetry. Chamfered 45° corner cutouts, diagnostic targeting crosshairs, military status readouts, and sharp vector reticles.',
    eraOrOrigin: 'Cyberpunk Sci-Fi & Ghost in the Shell UI',
    keyTokens: {
      borderRadius: 'Chamfered 45° Polygon Cut',
      shadow: '0 8px 24px rgba(13,13,13,.1)',
      border: '1.5px solid #0d0d0d',
      typography: 'JetBrains Mono with hex code parameters',
    },
    cssSnippet: `/* Cyberpunk Chamfered HUD */
clip-path: polygon(
  16px 0, 100% 0, 100% calc(100% - 16px), 
  calc(100% - 16px) 100%, 0 100%, 0 16px
);
border: 1.5px solid #0d0d0d;
background: #0d0d0d;
color: #f4f2ee;`,
  },
  {
    id: 'wabi-sabi',
    name: 'Wabi-Sabi',
    category: 'Artistic',
    subtitle: 'Japanese Philosophy of Imperfection',
    description: 'Finding beauty in impermanence and natural asymmetry. Deliberate organic asymmetric corner radii, sumi ink stamp emblem (侘寂), and unvarnished simplicity.',
    eraOrOrigin: 'Traditional Japanese Zen Philosophy',
    keyTokens: {
      borderRadius: '30px 10px 24px 14px',
      shadow: '0 6px 18px rgba(13,13,13,.04)',
      border: '1px solid rgba(13,13,13,.12)',
      typography: 'Asymmetric layout + Kanji seal mark [ 侘寂 ]',
    },
    cssSnippet: `/* Wabi-Sabi Organic Imperfection */
border-radius: 30px 10px 24px 14px;
background: #ffffff;
border: 1px solid rgba(13, 13, 13, 0.12);
box-shadow: 0 6px 20px rgba(13, 13, 13, 0.04);
letter-spacing: -0.01em;`,
  },
];
