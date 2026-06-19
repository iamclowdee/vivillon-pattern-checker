"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/auth";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

type AuthContextProps = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load any persisted session on mount
    (async () => {
      try {
        const sess = await auth.getSession();
        setSession(sess);
        setUser(sess?.user ?? null);
      } catch {
        // no session – user stays unauthenticated
      } finally {
        setLoading(false);
      }
    })();

    // Listen for auth state changes (e.g. tab focus, token refresh)
    if (supabase) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, sess) => {
        setSession(sess);
        setUser(sess?.user ?? null);
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    const data = await auth.signIn(email, password);
    setSession(data.session);
    setUser(data.session?.user ?? null);
  };

  const signUp = async (email: string, password: string) => {
    const data = await auth.signUp(email, password);
    setSession(data.session);
    setUser(data.session?.user ?? null);
  };

  const signOut = async () => {
    await auth.signOut();
    setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
