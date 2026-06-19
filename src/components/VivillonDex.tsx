"use client";

import React, { useState, useEffect } from "react";
import { VIVILLON_PATTERNS } from "../data/vivillonData";
import { Check, ShieldCheck, Trophy, Sparkles } from "lucide-react";

interface VivillonDexProps {
  activePattern: string | null;
  hoveredPattern: string | null;
  onSelectPattern: (patternName: string) => void;
}

export default function VivillonDex({
  activePattern,
  hoveredPattern,
  onSelectPattern
}: VivillonDexProps) {
  const [caughtList, setCaughtList] = useState<string[]>([]);
  const [isShinyMode, setIsShinyMode] = useState(false);
  const patternsArray = Object.values(VIVILLON_PATTERNS);

  // Load caught status from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("vivillon_caught_list");
      if (stored) {
        setCaughtList(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load caught list", e);
    }
  }, []);

  // Save caught status to LocalStorage
  const toggleCaught = (patternName: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid selecting the card when checking/unchecking
    const updated = caughtList.includes(patternName)
      ? caughtList.filter((name) => name !== patternName)
      : [...caughtList, patternName];

    setCaughtList(updated);
    try {
      localStorage.setItem("vivillon_caught_list", JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save caught list", err);
    }
  };

  // 3D Card Parallax Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Scale down the rotation angle for a elegant subtle tilt
    const rotateX = -((y - centerY) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
    card.style.boxShadow = `0 12px 24px rgba(0, 0, 0, 0.4)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>, primaryColor: string) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    card.style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.25)`;
  };

  // Calculate completion percentage
  const caughtCount = caughtList.length;
  const totalCount = patternsArray.length;
  const progressPercent = Math.round((caughtCount / totalCount) * 100);

  // SVG Progress Ring calculations
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
      
      {/* Completion Dashboard Panel */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: "20px", 
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          background: "linear-gradient(135deg, rgba(30, 20, 70, 0.4) 0%, rgba(10, 8, 25, 0.65) 100%)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Progress Ring */}
          <div style={{ position: "relative", width: "70px", height: "70px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg width="70" height="70" style={{ transform: "rotate(-90deg)" }}>
              {/* Outer Track Ring */}
              <circle
                cx="35"
                cy="35"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="5.5"
              />
              {/* Animated Progress Ring */}
              <circle
                cx="35"
                cy="35"
                r={radius}
                fill="none"
                stroke="url(#progress-gradient)"
                strokeWidth="5.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  transition: "stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              />
              <defs>
                <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-purple)" />
                  <stop offset="100%" stopColor="var(--accent-blue)" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: "absolute", fontSize: "13px", fontWeight: "800", color: "#fff" }}>
              {progressPercent}%
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "16px", color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}>
              <Trophy style={{ width: "16px", height: "16px", color: "var(--accent-purple)" }} />
              Collector Progress
            </h4>
            <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
              Caught <strong style={{ color: "#fff" }}>{caughtCount}</strong> of {totalCount} Vivillon regional patterns.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Shiny Toggle Control */}
          <button
            onClick={() => setIsShinyMode(!isShinyMode)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "1.5px solid " + (isShinyMode ? "var(--accent-pink)" : "rgba(255, 255, 255, 0.15)"),
              background: isShinyMode ? "rgba(237, 100, 166, 0.15)" : "rgba(255, 255, 255, 0.03)",
              color: isShinyMode ? "var(--accent-pink)" : "var(--text-secondary)",
              fontWeight: "700",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "var(--transition-smooth)",
              boxShadow: isShinyMode ? "0 0 12px rgba(237, 100, 166, 0.25)" : "none"
            }}
          >
            <Sparkles style={{ width: "14px", height: "14px", color: isShinyMode ? "var(--accent-pink)" : "var(--text-muted)" }} />
            {isShinyMode ? "Shiny Mode Active" : "View Shiny Forms"}
          </button>

          {/* Milestone badge */}
          {progressPercent === 100 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(159, 122, 234, 0.15)", border: "1px solid rgba(159, 122, 234, 0.3)", padding: "6px 12px", borderRadius: "20px" }}>
              <Sparkles style={{ width: "16px", height: "16px", color: "gold" }} />
              <span style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", color: "gold", marginTop: "2px" }}>Master Collector</span>
            </div>
          ) : caughtCount >= 5 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(66, 153, 225, 0.12)", border: "1px solid rgba(66, 153, 225, 0.25)", padding: "6px 12px", borderRadius: "20px" }}>
              <ShieldCheck style={{ width: "16px", height: "16px", color: "var(--accent-blue)" }} />
              <span style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accent-blue)", marginTop: "2px" }}>Expert Badge</span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Grid of Cards */}
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", 
          gap: "16px",
          width: "100%" 
        }}
      >
        {patternsArray.map((pattern) => {
          const isSelected = activePattern === pattern.name;
          const isHovered = hoveredPattern === pattern.name;
          const isCaught = caughtList.includes(pattern.name);
          const shinyActiveBorder = isShinyMode 
            ? (isSelected ? "2px solid var(--accent-pink)" : isHovered ? "1.5px solid rgba(237, 100, 166, 0.8)" : "1px solid rgba(237, 100, 166, 0.25)")
            : (isSelected ? `2px solid ${pattern.primaryColor}` : isHovered ? `1.5px solid ${pattern.primaryColor}80` : "1px solid var(--glass-border)");

          return (
            <div
              key={pattern.name}
              className={`glass-panel ${isShinyMode ? "holographic-glow" : ""}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={(e) => handleMouseLeave(e, pattern.primaryColor)}
              onClick={() => onSelectPattern(pattern.name)}
              style={{
                position: "relative",
                borderRadius: "14px",
                padding: "16px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: isSelected 
                  ? (isShinyMode ? "linear-gradient(135deg, rgba(50, 20, 60, 0.85) 0%, rgba(10, 8, 25, 0.95) 100%)" : `linear-gradient(135deg, rgba(30, 20, 60, 0.8) 0%, rgba(10, 8, 25, 0.9) 100%)`)
                  : `rgba(20, 16, 45, 0.55)`,
                border: shinyActiveBorder,
                boxShadow: isSelected 
                  ? (isShinyMode ? "0 8px 24px rgba(237, 100, 166, 0.35)" : `0 8px 24px ${pattern.primaryColor}25`)
                  : `0 4px 12px rgba(0, 0, 0, 0.25)`,
                transition: "border 0.25s, background 0.25s, box-shadow 0.25s",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Captured checkbox indicator */}
              <button
                onClick={(e) => toggleCaught(pattern.name, e)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  border: isCaught ? "none" : "1.5px solid rgba(255, 255, 255, 0.2)",
                  background: isCaught ? (isShinyMode ? "var(--accent-pink)" : pattern.primaryColor) : "transparent",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  boxShadow: isCaught ? (isShinyMode ? "0 0 8px rgba(237, 100, 166, 0.8)" : `0 0 8px ${pattern.primaryColor}80`) : "none",
                  transition: "var(--transition-smooth)",
                  zIndex: 5
                }}
              >
                {isCaught && <Check style={{ width: "14px", height: "14px", color: "#fff", strokeWidth: "3px" }} />}
              </button>

              {/* Pattern Wing Art */}
              <div 
                style={{ 
                  width: "100%", 
                  height: "90px", 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center",
                  transform: "translateZ(30px)",
                  transition: "transform 0.2s ease"
                }}
              >
                <img
                  src={pattern.image}
                  alt={pattern.name}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                    borderRadius: "6px",
                    filter: isCaught 
                      ? (isShinyMode ? "hue-rotate(150deg) saturate(1.4) brightness(1.1) drop-shadow(0 0 8px rgba(237,100,166,0.5))" : "none")
                      : (isShinyMode ? "grayscale(30%) brightness(85%) hue-rotate(150deg)" : "grayscale(30%) brightness(85%)"),
                    transition: "var(--transition-smooth)"
                  }}
                />
              </div>

              {/* Pattern Title */}
              <div 
                style={{ 
                  marginTop: "12px", 
                  textAlign: "center",
                  transform: "translateZ(20px)",
                  transition: "transform 0.2s ease"
                }}
              >
                <h5 style={{ fontSize: "15px", fontWeight: "700", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                  {pattern.name} {isShinyMode && <span style={{ color: "var(--accent-pink)" }}>✨</span>}
                </h5>
                <span 
                  style={{ 
                    fontSize: "10px", 
                    color: isShinyMode ? "var(--accent-pink)" : pattern.primaryColor,
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    display: "inline-block",
                    marginTop: "2px",
                    textShadow: isShinyMode ? "0 0 6px rgba(237, 100, 166, 0.4)" : `0 0 6px ${pattern.primaryColor}30`
                  }}
                >
                  {isShinyMode ? "Shiny Specimen" : "Regional Specimen"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
