"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/app/auth/AuthProvider";

export const Header = () => {
  const { user, loading, signOut } = useAuth();

  return (
    <header
      className="glass-panel"
      style={{
        padding: "24px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background:
          "linear-gradient(135deg, rgba(20,16,45,0.7) 0%, rgba(10,8,25,0.9) 100%)",
        borderBottom: "1.5px solid rgba(159,122,234,0.25)",
      }}
    >
      {/* Logo / Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background:
              "linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-blue) 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 20px rgba(159, 122, 234, 0.4)",
            fontSize: "24px",
          }}
          className="float-animation"
        >
          🦋
        </div>
        <h1 className="text-gradient" style={{ fontSize: "24px", fontWeight: 800 }}>
          Vivillon Region Finder
        </h1>
      </div>

      {/* Auth controls */}
      <div>
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : user ? (
          <>
            <span style={{ color: "var(--text-muted)", marginRight: "8px" }}>
              {user.email}
            </span>
            <Link
              href="/profile"
              className="glass-btn"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid var(--glass-border)",
                padding: "6px 12px",
                borderRadius: "8px",
                color: "#fff",
                marginRight: "8px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              My Profile
            </Link>
            <button
              onClick={signOut}
              className="glass-btn"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid var(--glass-border)",
                padding: "6px 12px",
                borderRadius: "8px",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Sign out
            </button>
          </>
        ) : (
          <a
            href="/login"
            className="glass-btn"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid var(--glass-border)",
              padding: "6px 12px",
              borderRadius: "8px",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Sign in / Sign up
          </a>
        )}
      </div>
    </header>
  );
};
