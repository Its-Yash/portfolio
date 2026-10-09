"use client";

import React from "react";

export const BRAND_KEYS = new Set([
  "python", "react", "nextjs", "typescript", "javascript", "tailwind",
  "nodejs", "express", "java", "mongodb", "postgresql", "mysql", "redis",
  "docker", "kubernetes", "aws", "azure", "githubactions", "github",
  "tensorflow", "pytorch", "huggingface", "langchain", "scikitlearn",
  "opencv", "firebase", "supabase", "postman", "figma", "linux", "terraform",
  "redux", "pinecone", "chroma", "ollama", "crewai", "ieee", "tedekstra",
  "nezaaka", "soldevpath", "openai"
]);

export function isBrand(key: string): boolean {
  return BRAND_KEYS.has(key.toLowerCase());
}

export interface TechLogoProps {
  name: string;
  className?: string;
  size?: number;
  glow?: boolean;
}

export function TechLogo({ name, className = "", size = 24, glow = false }: TechLogoProps) {
  const k = name.toLowerCase();

  // Glow color mapping for subtle brand glow
  const glowColors: Record<string, string> = {
    python: "rgba(55, 118, 171, 0.25)",
    react: "rgba(97, 218, 251, 0.25)",
    nextjs: "rgba(0, 0, 0, 0.15)",
    typescript: "rgba(49, 120, 198, 0.25)",
    javascript: "rgba(247, 223, 30, 0.25)",
    tailwind: "rgba(56, 189, 248, 0.25)",
    nodejs: "rgba(83, 158, 67, 0.25)",
    express: "rgba(0, 0, 0, 0.15)",
    java: "rgba(224, 46, 36, 0.25)",
    mongodb: "rgba(71, 162, 72, 0.25)",
    postgresql: "rgba(51, 103, 145, 0.25)",
    mysql: "rgba(0, 117, 143, 0.25)",
    redis: "rgba(220, 56, 45, 0.25)",
    docker: "rgba(36, 150, 237, 0.25)",
    kubernetes: "rgba(50, 108, 229, 0.25)",
    aws: "rgba(255, 153, 0, 0.25)",
    azure: "rgba(0, 137, 214, 0.25)",
    github: "rgba(36, 41, 46, 0.2)",
    githubactions: "rgba(32, 136, 255, 0.25)",
    tensorflow: "rgba(255, 111, 0, 0.25)",
    pytorch: "rgba(238, 76, 44, 0.25)",
    huggingface: "rgba(255, 210, 30, 0.25)",
    langchain: "rgba(20, 160, 120, 0.25)",
    firebase: "rgba(255, 202, 40, 0.25)",
    supabase: "rgba(62, 207, 142, 0.25)",
    postman: "rgba(255, 108, 55, 0.25)",
    figma: "rgba(162, 89, 255, 0.25)",
    linux: "rgba(252, 193, 22, 0.25)",
    terraform: "rgba(123, 66, 255, 0.25)",
    ieee: "rgba(0, 98, 155, 0.25)",
    openai: "rgba(16, 163, 127, 0.25)",
  };

  const glowStyle = glow && glowColors[k] ? {
    filter: `drop-shadow(0 0 16px ${glowColors[k]})`
  } : undefined;

  const renderSvg = () => {
    switch (k) {
      case "python":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <path fill="#387EB8" d="M63.5 10.2c-27 0-25.3 11.7-25.3 11.7l.1 12.1h25.8v3.7H28.2S11.2 36 11.2 63.8c0 27.7 15 26.8 15 26.8h8.9v-12.5s-.5-15 14.7-15h25.4s14.1.2 14.1-13.7V23.9s2.1-13.7-25.8-13.7zm-14 7.6c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5-4.5-2-4.5-4.5 2-4.5 4.5-4.5z"/>
            <path fill="#FFE052" d="M64.5 117.8c27 0 25.3-11.7 25.3-11.7l-.1-12.1H63.9v-3.7h35.9s17 1.7 17-26.1c0-27.7-15-26.8-15-26.8h-8.9v12.5s.5 15-14.7 15H52.8s-14.1-.2-14.1 13.7v24.5s-2.1 13.7 25.8 13.7zm14-7.6c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"/>
          </svg>
        );

      case "react":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <ellipse cx="64" cy="64" rx="20" ry="54" stroke="#61DAFB" strokeWidth="6" transform="rotate(30 64 64)"/>
            <ellipse cx="64" cy="64" rx="20" ry="54" stroke="#61DAFB" strokeWidth="6" transform="rotate(90 64 64)"/>
            <ellipse cx="64" cy="64" rx="20" ry="54" stroke="#61DAFB" strokeWidth="6" transform="rotate(150 64 64)"/>
            <circle cx="64" cy="64" r="10" fill="#61DAFB"/>
          </svg>
        );

      case "nextjs":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <circle cx="64" cy="64" r="56" fill="#000000"/>
            <path d="M44 42v44M84 42v44" stroke="#ffffff" strokeWidth="8" strokeLinecap="round"/>
            <path d="M44 42L86 98" stroke="#ffffff" strokeWidth="8" strokeLinecap="round"/>
          </svg>
        );

      case "typescript":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size}>
            <rect width="128" height="128" rx="16" fill="#3178C6"/>
            <path d="M38 52h24M50 52v44M74 78c4 7 13 8 18 4 6-5 2-12-6-15-12-4-15-10-10-18 4-6 13-9 22-6M74 72" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        );

      case "javascript":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size}>
            <rect width="128" height="128" rx="16" fill="#F7DF1E"/>
            <path d="M38 78c2 8 8 12 16 12 9 0 14-5 14-14V50M82 78c4 7 12 9 18 5 6-4 3-12-5-15-12-4-15-10-10-18 4-6 13-8 21-5" stroke="#000000" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        );

      case "tailwind":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <path d="M34 50c4.5-18 18-27 40.5-27 27 0 31.5 18 40.5 27 9 9 18 13.5 31.5 13.5M13 77c4.5-18 18-27 40.5-27 27 0 31.5 18 40.5 27 9 9 18 13.5 31.5 13.5" stroke="#38BDF8" strokeWidth="12" strokeLinecap="round"/>
          </svg>
        );

      case "nodejs":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <path d="M64 16l42 24v48L64 112 22 88V40l42-24z" fill="#539E43"/>
            <path d="M64 42v44M44 54l20-12 20 12" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );

      case "express":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <circle cx="64" cy="64" r="54" stroke="#000000" strokeWidth="6"/>
            <text x="64" y="74" textAnchor="middle" fill="#000000" fontSize="32" fontWeight="bold" fontFamily="sans-serif">ex</text>
          </svg>
        );

      case "java":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <path d="M42 94c16 4 36 4 50-2M38 104c20 6 46 6 62-2" stroke="#E02E24" strokeWidth="5" strokeLinecap="round"/>
            <path d="M54 30c8 10-6 24 6 36M68 24c10 12-8 30 6 42" stroke="#5382A1" strokeWidth="5" strokeLinecap="round"/>
          </svg>
        );

      case "docker":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <path d="M22 68h84c0 24-20 40-42 40-22 0-42-16-42-40z" fill="#2496ED"/>
            <rect x="42" y="52" width="12" height="12" fill="#2496ED"/>
            <rect x="58" y="52" width="12" height="12" fill="#2496ED"/>
            <rect x="74" y="52" width="12" height="12" fill="#2496ED"/>
            <rect x="58" y="36" width="12" height="12" fill="#2496ED"/>
            <rect x="74" y="36" width="12" height="12" fill="#2496ED"/>
          </svg>
        );

      case "kubernetes":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <polygon points="64,16 106,38 106,90 64,112 22,90 22,38" stroke="#326CE5" strokeWidth="8" fill="#F0F5FF"/>
            <circle cx="64" cy="64" r="16" fill="#326CE5"/>
            <line x1="64" y1="48" x2="64" y2="24" stroke="#326CE5" strokeWidth="6"/>
            <line x1="78" y1="72" x2="98" y2="84" stroke="#326CE5" strokeWidth="6"/>
            <line x1="50" y1="72" x2="30" y2="84" stroke="#326CE5" strokeWidth="6"/>
          </svg>
        );

      case "aws":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <path d="M38 52l-8 24h8l2-6h12l2 6h8l-8-24H38zm6 12l4-12 4 12H44zM72 52l5 18 5-18h8l5 18 5-18h8l-8 24H86l-6-16-6 16H66l-8-24h14z" fill="#232F3E"/>
            <path d="M28 88c24 14 56 14 74-2" stroke="#FF9900" strokeWidth="6" strokeLinecap="round"/>
          </svg>
        );

      case "azure":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <path d="M26 94l28-66h22L48 94H26z" fill="#0078D4"/>
            <path d="M62 48l16-20h26l-28 66H50l12-46z" fill="#50E6FF" opacity="0.8"/>
            <path d="M72 94h36L78 54H60l12 40z" fill="#0089D6"/>
          </svg>
        );

      case "mongodb":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <path d="M64 12c-4 12-24 40-24 64 0 24 16 38 24 40 8-2 24-16 24-40 0-24-20-52-24-64z" fill="#47A248"/>
            <path d="M64 12v104" stroke="#3FA037" strokeWidth="4"/>
          </svg>
        );

      case "postgresql":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <path d="M64 24c-22 0-40 18-40 40 0 20 14 36 34 39v12l14-12c18-3 32-19 32-39 0-22-18-40-40-40z" fill="#336791"/>
            <circle cx="50" cy="54" r="6" fill="#ffffff"/>
            <path d="M74 48c8 4 12 14 10 24" stroke="#ffffff" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        );

      case "redis":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <polygon points="64,22 106,44 64,66 22,44" fill="#DC382D"/>
            <polygon points="64,66 106,44 106,66 64,88" fill="#A41E11"/>
            <polygon points="64,66 22,44 22,66 64,88" fill="#B82618"/>
            <polygon points="64,88 106,66 106,88 64,110" fill="#88150B"/>
            <polygon points="64,88 22,66 22,88 64,110" fill="#A41E11"/>
          </svg>
        );

      case "github":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M64 16C37.5 16 16 37.5 16 64c0 21.2 13.8 39.2 32.8 45.5 2.4.4 3.3-1 3.3-2.3v-8.1c-13.4 2.9-16.2-6.5-16.2-6.5-2.2-5.6-5.4-7.1-5.4-7.1-4.4-3 .3-3 .3-3 4.8.3 7.4 5 7.4 5 4.3 7.4 11.3 5.3 14 4 0.4-3.1 1.7-5.3 3.1-6.5-10.7-1.2-22-5.4-22-23.9 0-5.3 1.9-9.6 5-13-.5-1.2-2.2-6.2.5-12.8 0 0 4.1-1.3 13.4 5 3.9-1.1 8-1.6 12.2-1.6 4.1 0 8.3.5 12.2 1.6 9.3-6.3 13.4-5 13.4-5 2.7 6.6 1 11.6.5 12.8 3.1 3.4 5 7.7 5 13 0 18.6-11.3 22.6-22.1 23.8 1.7 1.5 3.3 4.5 3.3 9v13.4c0 1.3.9 2.8 3.3 2.3C98.2 103.2 112 85.2 112 64c0-26.5-21.5-48-48-48z" fill="#181717"/>
          </svg>
        );

      case "tensorflow":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <polygon points="64,18 98,38 98,78 64,58" fill="#FF6F00"/>
            <polygon points="64,18 30,38 30,78 64,58" fill="#E65100"/>
            <polygon points="64,58 98,78 64,98" fill="#FFA000"/>
            <polygon points="64,58 30,78 64,98" fill="#FF8F00"/>
            <polygon points="64,98 98,78 98,110 64,118" fill="#FFB300"/>
            <polygon points="64,98 30,78 30,110 64,118" fill="#FF8F00"/>
          </svg>
        );

      case "pytorch":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <path d="M64 24l-32 32h18v48h28V56h18L64 24z" fill="#EE4C2C"/>
            <circle cx="88" cy="40" r="6" fill="#EE4C2C"/>
          </svg>
        );

      case "openai":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <circle cx="64" cy="64" r="54" stroke="#10A37F" strokeWidth="6"/>
            <path d="M64 36c12 0 20 8 20 18v20c0 10-8 18-20 18s-20-8-20-18V54c0-10 8-18 20-18z" stroke="#10A37F" strokeWidth="6"/>
            <circle cx="64" cy="64" r="6" fill="#10A37F"/>
          </svg>
        );

      case "ieee":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <polygon points="64,16 112,64 64,112 16,64" stroke="#00629B" strokeWidth="8" fill="#F4F8FA"/>
            <circle cx="64" cy="64" r="20" stroke="#00629B" strokeWidth="6"/>
            <line x1="64" y1="28" x2="64" y2="100" stroke="#00629B" strokeWidth="5"/>
          </svg>
        );

      // Concept Icons & Platforms (Clean line style)
      case "agent":
      case "autonomous agents":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <circle cx="64" cy="64" r="44" stroke="currentColor" strokeWidth="6" strokeDasharray="6 6"/>
            <circle cx="64" cy="64" r="22" stroke="currentColor" strokeWidth="6"/>
            <circle cx="64" cy="64" r="8" fill="currentColor"/>
            <path d="M64 20v16M64 92v16M20 64h16M92 64h16" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
          </svg>
        );

      case "security":
      case "devsecops":
      case "gdpr":
      case "vapt":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <path d="M64 20L32 34v34c0 28 32 40 32 40s32-12 32-40V34L64 20z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round"/>
            <path d="M52 64l8 8 16-16" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );

      case "rag":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <rect x="28" y="24" width="48" height="60" rx="6" stroke="currentColor" strokeWidth="6"/>
            <rect x="52" y="44" width="48" height="60" rx="6" stroke="currentColor" strokeWidth="6"/>
            <path d="M40 44h24M40 56h16M64 74h24M64 86h16" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
          </svg>
        );

      case "restapi":
      case "websocket":
      case "graphql":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <circle cx="36" cy="64" r="14" stroke="currentColor" strokeWidth="6"/>
            <circle cx="92" cy="64" r="14" stroke="currentColor" strokeWidth="6"/>
            <path d="M50 56l28-14M50 64h28M50 72l28 14" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
          </svg>
        );

      case "education":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <polygon points="64,28 112,52 64,76 16,52" stroke="currentColor" strokeWidth="6" strokeLinejoin="round"/>
            <path d="M34 62v28c0 14 30 18 30 18s30-4 30-18V62" stroke="currentColor" strokeWidth="6"/>
          </svg>
        );

      case "tedekstra":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <circle cx="64" cy="64" r="48" stroke="#18181B" strokeWidth="6"/>
            <path d="M42 46h44M64 46v44" stroke="#18181B" strokeWidth="7" strokeLinecap="round"/>
          </svg>
        );

      case "nezaaka":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <rect x="28" y="36" width="72" height="64" rx="8" stroke="#059669" strokeWidth="6"/>
            <polygon points="20,44 64,16 108,44" stroke="#059669" strokeWidth="6" strokeLinejoin="round"/>
            <circle cx="64" cy="68" r="12" fill="#059669"/>
          </svg>
        );

      case "soldevpath":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <circle cx="64" cy="64" r="50" stroke="#0D0D0D" strokeWidth="6"/>
            <path d="M40 76c8 10 20 14 34 8 12-6 16-18 6-28-12-12 4-22 18-12" stroke="#0D0D0D" strokeWidth="6" strokeLinecap="round"/>
          </svg>
        );

      case "playwright":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <circle cx="48" cy="64" r="28" fill="#2EAD33" opacity="0.9"/>
            <circle cx="80" cy="64" r="28" fill="#E24424" opacity="0.9"/>
            <path d="M48 48c8 0 16 8 16 16s-8 16-16 16M80 48c-8 0-16 8-16 16s8 16 16 16" stroke="#ffffff" strokeWidth="4"/>
          </svg>
        );

      case "privado":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <path d="M64 20L28 36v32c0 26 28 42 36 44 8-2 36-18 36-44V36L64 20z" stroke="#6366F1" strokeWidth="6" fill="#EEF2FF"/>
            <circle cx="64" cy="58" r="8" fill="#6366F1"/>
            <path d="M64 66v14" stroke="#6366F1" strokeWidth="5" strokeLinecap="round"/>
          </svg>
        );

      case "osv":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <polygon points="64,22 104,44 104,86 64,108 24,86 24,44" stroke="#0284C7" strokeWidth="6" fill="#F0F9FF"/>
            <path d="M64 22v86M24 44l80 42M24 86l80-42" stroke="#0284C7" strokeWidth="4"/>
          </svg>
        );

      case "streamlit":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <polygon points="64,24 108,104 20,104" stroke="#FF4B4B" strokeWidth="7" fill="#FFF1F1"/>
            <polygon points="64,52 90,104 38,104" fill="#FF4B4B"/>
          </svg>
        );

      case "seo":
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <circle cx="56" cy="56" r="32" stroke="#0D0D0D" strokeWidth="6"/>
            <line x1="80" y1="80" x2="108" y2="108" stroke="#0D0D0D" strokeWidth="8" strokeLinecap="round"/>
            <path d="M40 56h32M56 40v32" stroke="#0D0D0D" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        );

      default:
        // Generic elegant node icon
        return (
          <svg viewBox="0 0 128 128" width={size} height={size} fill="none">
            <rect x="32" y="32" width="64" height="64" rx="14" stroke="currentColor" strokeWidth="6"/>
            <circle cx="64" cy="64" r="12" fill="currentColor"/>
          </svg>
        );
    }
  };

  return (
    <div
      className={`inline-flex items-center justify-center transition-transform duration-300 ${className}`}
      style={glowStyle}
      aria-hidden="true"
    >
      {renderSvg()}
    </div>
  );
}
