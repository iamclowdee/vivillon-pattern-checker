"use client";

import { useState } from "react";
import { auth } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await auth.signIn(email, password);
      setMessage("Successfully signed in! Redirecting...");
      // Redirect after short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (err: any) {
      setError(err.message ?? "Sign‑in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await auth.signUp(email, password);
      setMessage("Account created! Please check your email for confirmation.");
    } catch (err: any) {
      setError(err.message ?? "Sign‑up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-900 p-4">
      <section className="glass-panel w-full max-w-md rounded-xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-gradient">Sign In / Sign Up</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-md bg-white/10 px-3 py-2 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-md bg-white/10 px-3 py-2 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm text-center" role="alert">{error}</p>
          )}
          {message && (
            <p className="text-green-400 text-sm text-center" role="status">{message}</p>
          )}
          <div className="flex items-center space-x-4 justify-center">
            <button
              type="submit"
              onClick={handleSignIn}
              disabled={loading}
              className="flex-1 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : "Sign In"}
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              disabled={loading}
              className="flex-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : "Sign Up"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
