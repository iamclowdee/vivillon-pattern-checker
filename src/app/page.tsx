"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, MapPin, Globe, HelpCircle, Shield } from "lucide-react";
import WorldMap from "../components/WorldMap";
import VivillonDex from "../components/VivillonDex";
import ExchangeHub from "../components/ExchangeHub";
import { VIVILLON_PATTERNS, COUNTRY_MAPPINGS } from "../data/vivillonData";
import { Header } from "@/components/Header";

export default function Home() {
  const [activePatternName, setActivePatternName] = useState<string | null>("Monsoon"); // Default start
  const [hoveredPatternName, setHoveredPatternName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // Filter Exchange Hub based on selected pattern
  const [exchangeRegion, setExchangeRegion] = useState<string>("All");

  useEffect(() => {
    if (activePatternName) {
      setExchangeRegion(activePatternName);
    }
  }, [activePatternName]);

  // Country Search Autocomplete Logic
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 1) {
      const matches = Object.keys(COUNTRY_MAPPINGS).filter((country) =>
        country.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(matches);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectCountry = (country: string) => {
    const pattern = COUNTRY_MAPPINGS[country];
    if (pattern) {
      setActivePatternName(pattern);
      setSearchQuery(country);
      setSearchResults([]);
    }
  };

  const activePattern = activePatternName ? VIVILLON_PATTERNS[activePatternName] : null;

  return (
    <main className="container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", gap: "30px" }}>

      <Header />

      {/* Main Grid: Map and Selected Card Details */}
      <section style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px" }} className="dashboard-grid">

        {/* Left Side: Map Dashboard */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <WorldMap
            activePattern={activePatternName}
            onSelectPattern={(name) => setActivePatternName(name)}
            onHoverPattern={(name) => setHoveredPatternName(name)}
          />
        </div>

        {/* Right Side: Detailed Focus Card */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {activePattern ? (
            <div
              className="glass-panel"
              style={{
                padding: "24px",
                borderRadius: "16px",
                background: `linear-gradient(135deg, rgba(20, 16, 45, 0.8) 0%, rgba(10, 8, 25, 0.95) 100%)`,
                border: `2px solid ${activePattern.primaryColor}`,
                boxShadow: `0 8px 32px ${activePattern.primaryColor}20`,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                flex: 1
              }}
            >
              {/* Card Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h2 style={{ fontSize: "28px", color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
                    {activePattern.name}
                  </h2>
                  <span
                    style={{
                      fontSize: "11px",
                      color: activePattern.primaryColor,
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "1px"
                    }}
                  >
                    Scatterbug Specimen
                  </span>
                </div>
                <div
                  style={{
                    padding: "6px 12px",
                    borderRadius: "14px",
                    backgroundColor: `${activePattern.primaryColor}20`,
                    border: `1.5px solid ${activePattern.primaryColor}40`,
                    color: activePattern.primaryColor,
                    fontSize: "11px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  <Sparkles style={{ width: "12px", height: "12px" }} /> Regional Match
                </div>
              </div>

              {/* Wing Artwork Showcase */}
              <div
                style={{
                  width: "100%",
                  height: "170px",
                  background: "rgba(0, 0, 0, 0.3)",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid rgba(255,255,255,0.03)",
                  boxShadow: "inset 0 4px 20px rgba(0, 0, 0, 0.5)"
                }}
              >
                <img
                  src={activePattern.image}
                  alt={activePattern.name}
                  className="float-animation"
                  style={{
                    maxHeight: "90%",
                    maxWidth: "90%",
                    objectFit: "contain",
                    filter: `drop-shadow(0 0 12px ${activePattern.primaryColor}60)`
                  }}
                />
              </div>

              {/* Pattern description */}
              <div>
                <h4 style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "4px" }}>Pattern Description</h4>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                  {activePattern.description}
                </p>
              </div>

              {/* Native Country Regions */}
              <div>
                <h4 style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <MapPin style={{ width: "14px", height: "14px", color: activePattern.primaryColor }} />
                  Native Countries / Territories
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {activePattern.countries.map((c) => (
                    <span
                      key={c}
                      style={{
                        padding: "6px 12px",
                        fontSize: "11px",
                        fontWeight: "600",
                        borderRadius: "8px",
                        backgroundColor: "rgba(255,255,255,0.03)",
                        border: "1px solid var(--glass-border)",
                        color: "#fff"
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div
              className="glass-panel"
              style={{
                padding: "40px 20px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
                flex: 1
              }}
            >
              <Globe style={{ width: "40px", height: "40px", color: "var(--accent-purple)", animation: "pulse-glow 2s infinite" }} />
              <h4 style={{ fontSize: "16px", color: "#fff" }}>Explore the Globe</h4>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", maxWidth: "250px" }}>
                Hover over radar map paths or click any card in the Vivillon Dex below to inspect pattern origins!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Collectible Vivillon Dex Grid */}
      <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Sparkles style={{ color: "var(--accent-purple)", width: "20px", height: "20px" }} />
          <h3 style={{ fontSize: "16px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>
            The Collector's Vivillon Dex
          </h3>
        </div>
        <VivillonDex
          activePattern={activePatternName}
          hoveredPattern={hoveredPatternName}
          onSelectPattern={(name) => setActivePatternName(name)}
        />
      </section>

      {/* Exchange Directory */}
      <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Globe style={{ color: "var(--accent-purple)", width: "20px", height: "20px" }} />
          <h3 style={{ fontSize: "16px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>
            Trainer Exchange Hub
          </h3>
        </div>
        <ExchangeHub
          selectedRegion={exchangeRegion}
          onSelectRegion={(reg) => setExchangeRegion(reg)}
        />
      </section>

      {/* Footer Legal & Disclaimers */}
      <footer
        className="glass-panel"
        style={{
          padding: "20px 30px",
          borderRadius: "14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          fontSize: "11px",
          color: "var(--text-muted)",
          border: "1px solid var(--glass-border)",
          background: "rgba(10, 8, 25, 0.4)"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <p>© 2026 Vivillon Region Finder. Fan-made informational project.</p>
          <p>Pokémon GO, Scatterbug, Spewpa, Vivillon, and related names are Niantic, Nintendo, and Game Freak trademarks.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => setShowDisclaimer(!showDisclaimer)}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--accent-blue)",
              cursor: "pointer",
              fontSize: "11px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <HelpCircle style={{ width: "12px", height: "12px" }} /> Legal Disclaimer
          </button>
        </div>

        {/* Disclaimer Modal */}
        {showDisclaimer && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(5, 4, 12, 0.8)",
              backdropFilter: "blur(8px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000
            }}
            onClick={() => setShowDisclaimer(false)}
          >
            <div
              className="glass-panel"
              style={{
                width: "90%",
                maxWidth: "500px",
                padding: "24px",
                background: "rgba(10, 8, 25, 0.95)",
                borderColor: "rgba(229, 62, 62, 0.4)",
                display: "flex",
                flexDirection: "column",
                gap: "14px"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}>
                <Shield style={{ color: "var(--accent-purple)", width: "18px", height: "18px" }} />
                Legal & Disclaimer
              </h3>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                This is an unofficial, fan-made helper utility designed strictly for educational and in-game coordination purposes in Pokémon GO.
              </p>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Pokémon GO, Scatterbug, Spewpa, Vivillon, and related Pokémon character names, assets, and graphics are intellectual property of Niantic, Inc., Game Freak, Nintendo, and The Pokémon Company. This project has no commercial affiliation with, nor endorsement from, Niantic or Nintendo.
              </p>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                All user submissions (Trainer Names and Friend Codes) are contributed voluntarily by players to coordinate in-game postcard trades and are stored securely in memory or database clouds.
              </p>
              <button
                onClick={() => setShowDisclaimer(false)}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  background: "linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-blue) 100%)",
                  color: "#fff",
                  fontWeight: "700",
                  cursor: "pointer",
                  fontSize: "12px"
                }}
              >
                Understood & Close
              </button>
            </div>
          </div>
        )}
      </footer>
    </main>
  );
}
