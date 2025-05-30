"use client";

import type { Session, User, AuthError } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import type { User as CRMUser } from "./types";

interface AuthContextType {
  user: User | null;
  crmUser: CRMUser | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [crmUser, setCrmUser] = useState<CRMUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demo purposes, just set loading to false initially
    setLoading(false);
  }, []);

  const fetchCrmUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching CRM user:", error);
      } else {
        setCrmUser(data);
      }
    } catch (error) {
      console.error("Error fetching CRM user:", error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    return new Promise<{ error: AuthError | null }>((resolve) => {
      // Mock authentication for demo purposes
      const validCredentials = [
        { email: "admin@goldengrove.com", password: "password123" },
        { email: "sales@goldengrove.com", password: "password123" }
      ];

      const isValidCredential = validCredentials.some(
        cred => cred.email === email && cred.password === password
      );

      if (isValidCredential) {
        // Create a mock session for demo purposes
        const mockUser = {
          id: email === "admin@goldengrove.com" ? "admin-123" : "sales-123",
          email: email,
          role: email === "admin@goldengrove.com" ? "admin" : "sales_rep"
        };

        // Set mock user data
        setUser(mockUser as User);
        setSession({ user: mockUser } as Session);
        setCrmUser({
          id: mockUser.id,
          email: mockUser.email,
          full_name: email === "admin@goldengrove.com" ? "Admin User" : "Sales Rep",
          role: mockUser.role as "admin" | "sales_rep",
          created_at: new Date().toISOString()
        });
        setLoading(false);

        // Resolve after state is updated
        setTimeout(() => {
          resolve({ error: null });
        }, 50);
      } else {
        resolve({ error: { message: "Invalid email or password" } as AuthError });
      }
    });
  };

  const signOut = async () => {
    // Clear mock session
    setUser(null);
    setSession(null);
    setCrmUser(null);
    setLoading(false);
  };

  const value = {
    user,
    crmUser,
    session,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
