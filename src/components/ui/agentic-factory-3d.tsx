"use client";

import React, { useEffect, useRef } from "react";
import { initMachineScene } from "./agentic-factory/machine-scene";
import "./agentic-factory/machine.css";

export interface AgenticFactory3DProps {
  height?: string;
  className?: string;
  theme?: "monochrome" | "dark";
  autoStart?: boolean;
  backHref?: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

export default function AgenticFactory3D({
  height = "100vh",
  className = "",
  onBack,
  showBackButton = false,
}: AgenticFactory3DProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const dispose = initMachineScene(rootRef.current, "var(--font-inter)");
    return () => {
      dispose();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`machine ${className}`}
      style={{ height, width: "100%", position: "relative" }}
    >
      <div id="scene" />
      <div className="vignette" />
      <div id="labels" />

      {/* Topbar */}
      <div className="topbar">
        <div className="identity">
          <div className="mark">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <strong>AGENTIC FACTORY</strong>
            <small>Autonomous Synthesis Pipeline</small>
          </div>
        </div>

        <div className="status" id="status">
          <i />
          <span id="status-text">Machine running</span>
        </div>
      </div>

      <div className="scene-heading">
        <span>Autonomous Agent Engine</span>
        <span className="index">SYS-01 // PRODUCTION</span>
      </div>

      <div className="coordinates">
        37.7749° N, 122.4194° W // 60 FPS
      </div>

      {/* Journey step (visible during 'order' mode) */}
      <div id="journey">
        <div className="journey-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" />
          </svg>
        </div>
        <div>
          <strong id="journey-title">Initializing</strong>
          <small id="journey-detail">Routing request to intake agent...</small>
        </div>
        <div className="track">
          <i id="journey-progress" />
        </div>
      </div>

      {/* Interactive Tooltip */}
      <div id="tooltip">
        <strong><span>01</span>Station</strong>
        <p>Station description</p>
      </div>

      {/* Controls: Mode Bar and Camera presets */}
      <div className="controls">
        <div className="mode-bar">
          <button data-mode="assembled" aria-pressed="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Assembled
          </button>
          <button data-mode="cutaway" aria-pressed="false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l16 16M4 20L20 4"/></svg>
            Cutaway
          </button>
          <button data-mode="stations" aria-pressed="false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="12" r="2"/></svg>
            5 Stations
          </button>
          <button data-mode="order" aria-pressed="false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            One Order
          </button>
        </div>

        <div className="camera-row">
          <span className="caption">CAM</span>
          <button data-camera="overview" aria-pressed="true">Overview</button>
          <button data-camera="side" aria-pressed="false">Side</button>
          <button data-camera="top" aria-pressed="false">Top</button>
          <button data-camera="flight" aria-pressed="false">Flight</button>
          <span className="divider" />
          <button id="play" aria-label="Pause the animation">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <rect x="2" y="1" width="2.5" height="10" rx=".5" />
              <rect x="7.5" y="1" width="2.5" height="10" rx=".5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="hint">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>Drag to rotate · Scroll to zoom · Click any station</span>
        </div>
        <div className="footer-center">PROCEDURAL THREE.JS ENGINE // 0 EXTERNAL ASSETS</div>
        {showBackButton && onBack && (
          <button
            onClick={onBack}
            className="wordmark"
            style={{ pointerEvents: 'auto', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ← <span>Return</span>
          </button>
        )}
      </div>

      {/* Loading state */}
      <div id="loading">
        <i />
        <span>Synthesizing 3D Machine...</span>
      </div>

      {/* Error state */}
      <div id="error">
        <strong>WebGL Not Available</strong>
        <p>Your graphics context could not initialize hardware acceleration.</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    </div>
  );
}
