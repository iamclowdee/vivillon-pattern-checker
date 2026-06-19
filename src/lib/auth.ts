import { supabase } from './supabaseClient';
import type { Session, User } from '@supabase/supabase-js';

/**
 * Wrapper utilities for Supabase authentication.
 * These functions can be used on both client and server side.
 */
export const auth = {
  /** Sign up with email and password */
  async signUp(email: string, password: string) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },

  /** Sign in with email and password */
  async signIn(email: string, password: string) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  /** Sign out current session */
  async signOut() {
    if (!supabase) throw new Error('Supabase not configured');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /** Get current session (client‑side) */
  async getSession(): Promise<Session | null> {
    if (!supabase) return null;
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  /** Get current user (client‑side) */
  async getUser(): Promise<User | null> {
    const session = await auth.getSession();
    return session?.user ?? null;
  },
};
