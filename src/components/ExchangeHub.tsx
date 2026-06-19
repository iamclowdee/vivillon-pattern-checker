"use client";

import React, { useState, useEffect } from "react";
import { VIVILLON_PATTERNS } from "../data/vivillonData";
import { Copy, Check, Users, ShieldAlert, Wifi, WifiOff, AlertTriangle, QrCode } from "lucide-react";
import QRCode from "qrcode";

interface Trainer {
  id: string;
  name: string;
  friend_code: string;
  region: string;
  note: string;
  created_at: string;
}

interface ExchangeHubProps {
  selectedRegion: string | null;
  onSelectRegion: (region: string) => void;
}

export default function ExchangeHub({
  selectedRegion,
  onSelectRegion
}: ExchangeHubProps) {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMock, setIsMock] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // QR Code Modal State
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [qrTrainerName, setQrTrainerName] = useState<string>("");
  const [qrFriendCode, setQrFriendCode] = useState<string>("");

  const handleShowQrCode = async (trainerName: string, friendCode: string) => {
    try {
      const cleanCode = friendCode.replace(/\s/g, "");
      const url = await QRCode.toDataURL(cleanCode, {
        margin: 2,
        width: 300,
        color: {
          dark: "#0a0819",
          light: "#ffffff"
        }
      });
      setQrCodeUrl(url);
      setQrTrainerName(trainerName);
      setQrFriendCode(friendCode);
      setShowQrModal(true);
    } catch (err) {
      console.error("Failed to generate QR code", err);
    }
  };

  // Form State
  const [formName, setFormName] = useState("");
  const [formCode, setFormCode] = useState("");
  const [formRegion, setFormRegion] = useState("");
  const [formNote, setFormNote] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch trainers
  const fetchTrainers = async (region: string | null) => {
    setLoading(true);
    try {
      const url = region ? `/api/trainers?region=${region}` : "/api/trainers";
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setTrainers(data.trainers || []);
        setIsMock(!!data.isMock);
      }
    } catch (err) {
      console.error("Failed to load trainers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers(selectedRegion);
  }, [selectedRegion]);

  // Copy Clipboard Handler
  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code.replace(/\s/g, ""));
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setSubmitting(true);

    if (!formName || !formCode || !formRegion) {
      setErrorMsg("Please fill out all required fields.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/trainers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          friend_code: formCode,
          region: formRegion,
          note: formNote
        })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg("Success! You are now in the active directory.");
        setFormName("");
        setFormCode("");
        setFormNote("");
        fetchTrainers(selectedRegion);
      } else {
        setErrorMsg(data.error || "An error occurred during submission.");
      }
    } catch (err) {
      setErrorMsg("Unable to connect to the registry server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
      
      {/* Database Connection Status Header */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: "12px 18px", 
          borderRadius: "12px", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          borderColor: isMock ? "rgba(229, 193, 88, 0.3)" : "rgba(49, 151, 149, 0.4)",
          background: isMock ? "rgba(229, 193, 88, 0.03)" : "rgba(49, 151, 149, 0.03)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {isMock ? (
            <>
              <WifiOff style={{ width: "16px", height: "16px", color: "#E5C158" }} />
              <span style={{ fontSize: "11px", fontWeight: "600", color: "#E5C158", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Offline Demo Mode
              </span>
            </>
          ) : (
            <>
              <Wifi style={{ width: "16px", height: "16px", color: "teal" }} />
              <span style={{ fontSize: "11px", fontWeight: "600", color: "teal", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Supabase Live Database Connected
              </span>
            </>
          )}
        </div>
        
        {isMock && (
          <span style={{ fontSize: "10px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
            <AlertTriangle style={{ width: "12px", height: "12px" }} /> Add keys in .env.local to go live
          </span>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
        
        {/* Registration Form Panel */}
        <div 
          className="glass-panel" 
          style={{ 
            padding: "24px", 
            borderRadius: "16px",
            background: "linear-gradient(135deg, rgba(20, 16, 45, 0.7) 0%, rgba(10, 8, 25, 0.8) 100%)"
          }}
        >
          <h4 style={{ fontSize: "18px", color: "#fff", display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-title)" }}>
            <Users style={{ width: "18px", height: "18px", color: "var(--accent-purple)" }} />
            Register as a Vivillon Trainer
          </h4>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px", marginBottom: "20px" }}>
            Share your Friend Code so global trainers looking for **{formRegion || "your region"}** can add you and exchange postcards!
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-secondary)" }}>Trainer Name *</label>
                <input
                  type="text"
                  placeholder="e.g. AshKetchum"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  style={{
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid var(--glass-border)",
                    background: "rgba(255, 255, 255, 0.04)",
                    color: "#fff",
                    fontSize: "13px",
                    outline: "none"
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-secondary)" }}>Friend Code *</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012"
                  value={formCode}
                  onChange={(e) => setFormCode(e.target.value)}
                  required
                  style={{
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid var(--glass-border)",
                    background: "rgba(255, 255, 255, 0.04)",
                    color: "#fff",
                    fontSize: "13px",
                    outline: "none"
                  }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "14px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-secondary)" }}>Vivillon Pattern Region *</label>
                <select
                  value={formRegion}
                  onChange={(e) => setFormRegion(e.target.value)}
                  required
                  style={{
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid var(--glass-border)",
                    background: "rgba(255, 255, 255, 0.04)",
                    color: "#fff",
                    fontSize: "13px",
                    outline: "none",
                    cursor: "pointer"
                  }}
                >
                  <option value="" style={{ background: "#0f0c24" }}>-- Select your Pattern --</option>
                  {Object.keys(VIVILLON_PATTERNS).map((name) => (
                    <option key={name} value={name} style={{ background: "#0f0c24" }}>{name} Pattern</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-secondary)" }}>Trainer Note (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Daily player, sending Tundra postcards!"
                  value={formNote}
                  onChange={(e) => setFormNote(e.target.value)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid var(--glass-border)",
                    background: "rgba(255, 255, 255, 0.04)",
                    color: "#fff",
                    fontSize: "13px",
                    outline: "none"
                  }}
                />
              </div>
            </div>

            {errorMsg && (
              <span style={{ fontSize: "12px", color: "#e53e3e", background: "rgba(229, 62, 62, 0.1)", padding: "8px 12px", borderRadius: "6px" }}>
                {errorMsg}
              </span>
            )}
            
            {successMsg && (
              <span style={{ fontSize: "12px", color: "teal", background: "rgba(49, 151, 149, 0.1)", padding: "8px 12px", borderRadius: "6px" }}>
                {successMsg}
              </span>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                marginTop: "6px",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-blue) 100%)",
                color: "#fff",
                fontWeight: "700",
                fontSize: "14px",
                cursor: submitting ? "not-allowed" : "pointer",
                boxShadow: "0 4px 14px rgba(159, 122, 234, 0.3)",
                transition: "var(--transition-smooth)"
              }}
            >
              {submitting ? "Registering..." : "Submit to Registry"}
            </button>
          </form>
        </div>

        {/* Directory Listing Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h4 style={{ fontSize: "16px", color: "#fff", display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-title)" }}>
              Active Postcard Exchange Directory
            </h4>
            {selectedRegion && selectedRegion !== "All" && (
              <button 
                onClick={() => onSelectRegion("All")}
                style={{ 
                  fontSize: "11px", 
                  color: "var(--accent-purple)", 
                  background: "transparent", 
                  border: "none", 
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                Clear filter ({selectedRegion})
              </button>
            )}
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              Retrieving active trainers...
            </div>
          ) : trainers.length === 0 ? (
            <div 
              className="glass-panel" 
              style={{ 
                padding: "30px", 
                textAlign: "center", 
                color: "var(--text-muted)",
                fontSize: "13px",
                borderStyle: "dashed"
              }}
            >
              No active trainers registered for {selectedRegion ? `the ${selectedRegion} region` : "any region"} yet. Be the first to register!
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px", maxHeight: "400px", overflowY: "auto", paddingRight: "4px" }}>
              {trainers.map((trainer) => {
                const patInfo = VIVILLON_PATTERNS[trainer.region];
                const badgeColor = patInfo ? patInfo.primaryColor : "var(--accent-purple)";
                const isCopied = copiedId === trainer.id;

                return (
                  <div
                    key={trainer.id}
                    className="glass-panel"
                    style={{
                      padding: "16px",
                      borderRadius: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "14px",
                      background: "rgba(255, 255, 255, 0.02)",
                      transition: "var(--transition-smooth)"
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <strong style={{ fontSize: "14px", color: "#fff" }}>{trainer.name}</strong>
                        
                        {/* Region Badge */}
                        <span
                          style={{
                            fontSize: "9px",
                            fontWeight: "700",
                            padding: "2px 8px",
                            borderRadius: "10px",
                            backgroundColor: `${badgeColor}20`,
                            color: badgeColor,
                            border: `1px solid ${badgeColor}40`,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                          }}
                        >
                          {trainer.region}
                        </span>
                      </div>
                      
                      {/* Friend Code */}
                      <code style={{ fontSize: "15px", color: "var(--accent-blue)", fontWeight: "700", fontFamily: "var(--font-title)", letterSpacing: "0.5px" }}>
                        {trainer.friend_code}
                      </code>

                      {trainer.note && (
                        <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px", fontStyle: "italic" }}>
                          "{trainer.note}"
                        </p>
                      )}
                    </div>

                    {/* Actions container */}
                    <div style={{ display: "flex", gap: "8px" }}>
                      {/* QR Code Button */}
                      <button
                        onClick={() => handleShowQrCode(trainer.name, trainer.friend_code)}
                        title="Show QR Code"
                        style={{
                          padding: "10px",
                          borderRadius: "10px",
                          border: "1px solid var(--glass-border)",
                          background: "rgba(255, 255, 255, 0.04)",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          transition: "var(--transition-smooth)"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                          e.currentTarget.style.borderColor = "var(--accent-purple)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                          e.currentTarget.style.borderColor = "var(--glass-border)";
                        }}
                      >
                        <QrCode style={{ width: "16px", height: "16px", color: "var(--text-secondary)" }} />
                      </button>

                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopyCode(trainer.id, trainer.friend_code)}
                        title="Copy Friend Code"
                        style={{
                          padding: "10px",
                          borderRadius: "10px",
                          border: "1px solid var(--glass-border)",
                          background: isCopied ? "rgba(49, 151, 149, 0.15)" : "rgba(255, 255, 255, 0.04)",
                          borderColor: isCopied ? "teal" : "var(--glass-border)",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          transition: "var(--transition-smooth)",
                          boxShadow: isCopied ? "0 0 10px rgba(49, 151, 149, 0.3)" : "none"
                        }}
                        onMouseEnter={(e) => {
                          if (!isCopied) {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                            e.currentTarget.style.borderColor = "var(--accent-blue)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isCopied) {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                            e.currentTarget.style.borderColor = "var(--glass-border)";
                          }
                        }}
                      >
                        {isCopied ? (
                          <Check style={{ width: "16px", height: "16px", color: "teal" }} />
                        ) : (
                          <Copy style={{ width: "16px", height: "16px", color: "var(--text-secondary)" }} />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* QR Code Modal Overlay */}
      {showQrModal && (
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
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="glass-panel"
            style={{
              width: "90%",
              maxWidth: "400px",
              padding: "24px",
              background: "rgba(10, 8, 25, 0.95)",
              borderColor: "var(--accent-purple)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              textAlign: "center"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}>
              Trainer QR Code
            </h3>
            <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              Scan code with your phone to add <strong>{qrTrainerName}</strong> as a friend!
            </p>

            <div
              style={{
                background: "#fff",
                padding: "16px",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(159, 122, 234, 0.2)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {qrCodeUrl && (
                <img
                  src={qrCodeUrl}
                  alt={`QR Code for ${qrTrainerName}`}
                  style={{ width: "200px", height: "200px" }}
                />
              )}
            </div>

            <code style={{ fontSize: "16px", color: "var(--accent-blue)", fontWeight: "700", letterSpacing: "1px" }}>
              {qrFriendCode}
            </code>

            <button
              onClick={() => setShowQrModal(false)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-blue) 100%)",
                color: "#fff",
                fontWeight: "700",
                cursor: "pointer",
                fontSize: "12px"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
