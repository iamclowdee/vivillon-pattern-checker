"use client";

import React, { useState } from "react";
import { VIVILLON_PATTERNS } from "../data/vivillonData";
import { MapPin, Globe } from "lucide-react";

interface WorldMapProps {
  activePattern: string | null;
  onSelectPattern: (patternName: string) => void;
  onHoverPattern: (patternName: string | null) => void;
}

// Stylized premium paths for the map regions (simplified representation of major coordinates)
const MAP_REGIONS = [
  {
    id: "North_America_Polar",
    name: "North America (North) - Polar",
    pattern: "Polar",
    color: VIVILLON_PATTERNS.Polar.primaryColor,
    path: "M 100,50 L 180,35 L 220,40 L 260,30 L 300,50 L 320,80 L 250,95 L 200,90 L 140,80 Z",
    pin: { x: 200, y: 65, city: "Nunavut, Canada" }
  },
  {
    id: "North_America_Modern",
    name: "United States & Central America - Modern",
    pattern: "Modern",
    color: VIVILLON_PATTERNS.Modern.primaryColor,
    path: "M 120,85 L 200,92 L 250,97 L 270,110 L 290,140 L 250,150 L 220,180 L 190,150 L 160,110 Z",
    pin: { x: 220, y: 120, city: "New York, USA" }
  },
  {
    id: "South_America_Savanna",
    name: "South America - Savanna",
    pattern: "Savanna",
    color: VIVILLON_PATTERNS.Savanna.primaryColor,
    path: "M 230,200 L 250,190 L 285,210 L 330,240 L 340,280 L 310,360 L 280,380 L 270,300 L 240,250 Z",
    pin: { x: 295, y: 270, city: "São Paulo, Brazil" }
  },
  {
    id: "Europe_Tundra",
    name: "Northern Europe - Tundra",
    pattern: "Tundra",
    color: VIVILLON_PATTERNS.Tundra.primaryColor,
    path: "M 420,30 L 460,25 L 500,20 L 530,30 L 520,60 L 480,55 L 430,45 Z",
    pin: { x: 470, y: 40, city: "Oslo, Norway" }
  },
  {
    id: "Europe_Continental",
    name: "Central Europe - Continental",
    pattern: "Continental",
    color: VIVILLON_PATTERNS.Continental.primaryColor,
    path: "M 440,75 L 480,60 L 515,62 L 530,85 L 500,105 L 460,95 Z",
    pin: { x: 485, y: 80, city: "Berlin, Germany" }
  },
  {
    id: "Europe_Meadow",
    name: "Western Europe - Meadow",
    pattern: "Meadow",
    color: VIVILLON_PATTERNS.Meadow.primaryColor,
    path: "M 410,80 L 438,76 L 458,96 L 478,115 L 440,120 L 420,100 Z",
    pin: { x: 435, y: 98, city: "Paris, France" }
  },
  {
    id: "Europe_Garden",
    name: "British Isles - Garden",
    pattern: "Garden",
    color: VIVILLON_PATTERNS.Garden.primaryColor,
    path: "M 390,65 L 420,60 L 425,75 L 405,85 L 392,80 Z",
    pin: { x: 410, y: 70, city: "London, UK" }
  },
  {
    id: "Europe_Marine",
    name: "Mediterranean & Iberia - Marine",
    pattern: "Marine",
    color: VIVILLON_PATTERNS.Marine.primaryColor,
    path: "M 390,125 L 435,122 L 470,125 L 510,135 L 490,165 L 430,160 M 275,370 L 290,360 L 295,385 L 275,395 Z", // Dual paths including Chile representation
    pin: { x: 420, y: 140, city: "Madrid, Spain" }
  },
  {
    id: "Asia_Monsoon",
    name: "South & Southeast Asia - Monsoon",
    pattern: "Monsoon",
    color: VIVILLON_PATTERNS.Monsoon.primaryColor,
    path: "M 590,130 L 650,110 L 690,120 L 730,150 L 710,190 L 670,210 L 630,180 L 595,160 Z",
    pin: { x: 650, y: 155, city: "Mumbai, India" }
  },
  {
    id: "Asia_Elegant",
    name: "Japan - Elegant",
    pattern: "Elegant",
    color: VIVILLON_PATTERNS.Elegant.primaryColor,
    path: "M 740,95 L 775,90 L 795,115 L 770,140 Z",
    pin: { x: 770, y: 110, city: "Tokyo, Japan" }
  }
];

export default function WorldMap({
  activePattern,
  onSelectPattern,
  onHoverPattern
}: WorldMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<typeof MAP_REGIONS[0] | null>(null);

  const handleMouseEnter = (region: typeof MAP_REGIONS[0]) => {
    setHoveredRegion(region);
    onHoverPattern(region.pattern);
  };

  const handleMouseLeave = () => {
    setHoveredRegion(null);
    onHoverPattern(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <Globe style={{ color: "var(--accent-purple)", width: "20px", height: "20px" }} />
        <h3 style={{ fontSize: "16px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-primary)" }}>
          Interactive Regional Radar Map
        </h3>
      </div>

      <div
        className="glass-panel"
        style={{
          position: "relative",
          width: "100%",
          height: "400px",
          overflow: "hidden",
          borderRadius: "16px",
          background: "rgba(10, 8, 25, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px"
        }}
      >
        {/* Futuristic Map Grid Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "radial-gradient(circle, rgba(159, 122, 234, 0.08) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            pointerEvents: "none"
          }}
        />

        {/* Vector SVG Map Container */}
        <svg
          viewBox="0 0 850 420"
          width="100%"
          height="100%"
          style={{
            zIndex: 2,
            transition: "all 0.5s ease"
          }}
        >
          {/* Aesthetic background ocean currents */}
          <path
            d="M 50,210 Q 200,260 400,210 T 800,210"
            fill="none"
            stroke="rgba(66, 153, 225, 0.08)"
            strokeWidth="2"
            strokeDasharray="5,15"
          />
          <path
            d="M 50,110 Q 250,50 450,110 T 850,110"
            fill="none"
            stroke="rgba(159, 122, 234, 0.06)"
            strokeWidth="1.5"
            strokeDasharray="4,8"
          />

          {/* Interactive Continent Paths */}
          {MAP_REGIONS.map((region) => {
            const isHovered = hoveredRegion?.id === region.id;
            const isActive = activePattern === region.pattern;

            return (
              <path
                key={region.id}
                d={region.path}
                fill={isActive ? `${region.color}35` : isHovered ? `${region.color}25` : "rgba(255, 255, 255, 0.04)"}
                stroke={isActive ? region.color : isHovered ? region.color : "rgba(255, 255, 255, 0.15)"}
                strokeWidth={isActive ? "2.5" : isHovered ? "2" : "1"}
                style={{
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  filter: isHovered || isActive ? `drop-shadow(0 0 8px ${region.color}60)` : "none"
                }}
                onMouseEnter={() => handleMouseEnter(region)}
                onMouseLeave={handleMouseLeave}
                onClick={() => onSelectPattern(region.pattern)}
              />
            );
          })}

          {/* Glowing City Nodes for geographic precision */}
          {MAP_REGIONS.map((region) => {
            const isHovered = hoveredRegion?.id === region.id;
            const isActive = activePattern === region.pattern;

            return (
              <g
                key={`node-${region.id}`}
                style={{
                  cursor: "pointer",
                  transition: "all 0.3s"
                }}
                onMouseEnter={() => handleMouseEnter(region)}
                onMouseLeave={handleMouseLeave}
                onClick={() => onSelectPattern(region.pattern)}
              >
                {/* Outermost pulsing ring */}
                <circle
                  cx={region.pin.x}
                  cy={region.pin.y}
                  r={isHovered || isActive ? "12" : "6"}
                  fill="none"
                  stroke={region.color}
                  strokeWidth="1.5"
                  style={{
                    opacity: isHovered || isActive ? "0.6" : "0.2",
                    animation: isHovered || isActive ? "pulse-glow 2s infinite" : "none",
                    transition: "all 0.3s"
                  }}
                />
                {/* Node Core */}
                <circle
                  cx={region.pin.x}
                  cy={region.pin.y}
                  r="3.5"
                  fill={region.color}
                  style={{
                    filter: `drop-shadow(0 0 4px ${region.color})`
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Dynamic Glass Tooltip floating over map */}
        {hoveredRegion && (
          <div
            className="glass-panel"
            style={{
              position: "absolute",
              bottom: "16px",
              left: "16px",
              padding: "10px 16px",
              pointerEvents: "none",
              zIndex: 10,
              background: "rgba(10, 8, 25, 0.85)",
              borderColor: hoveredRegion.color,
              boxShadow: `0 4px 20px ${hoveredRegion.color}20`,
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              animation: "float 4s infinite"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: hoveredRegion.color,
                  display: "inline-block",
                  boxShadow: `0 0 6px ${hoveredRegion.color}`
                }}
              />
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#fff", fontFamily: "var(--font-title)" }}>
                {hoveredRegion.pattern} Pattern
              </span>
            </div>
            <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
              {hoveredRegion.name}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
              <MapPin style={{ width: "10px", height: "10px", color: "var(--text-muted)" }} />
              <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                Key Node: {hoveredRegion.pin.city}
              </span>
            </div>
          </div>
        )}

        {/* Small Hint Overlay */}
        {!hoveredRegion && (
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
              fontSize: "11px",
              color: "var(--text-muted)",
              background: "rgba(0, 0, 0, 0.4)",
              padding: "4px 8px",
              borderRadius: "6px",
              pointerEvents: "none",
              zIndex: 3
            }}
          >
            Hover or click radar zones to discover patterns
          </div>
        )}
      </div>
    </div>
  );
}
