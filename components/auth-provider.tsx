"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AuthToken,
  AuthUser,
  getStoredTokens,
  storeTokens,
  verifyToken,
  logout as logoutAuth,
} from "@/lib/auth";

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  setToken: (tokens: AuthToken) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const tokens = getStoredTokens();
        if (tokens && tokens.access_token) {
          const { success, user: verifiedUser } = await verifyToken(
            tokens.access_token
          );
          if (success && verifiedUser) {
            setTokenState(tokens.access_token);
            setUser(verifiedUser);
          } else {
            logoutAuth();
          }
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        logoutAuth();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleSetToken = async (tokens: AuthToken) => {
    try {
      setTokenState(tokens.access_token);
      storeTokens(tokens);

      const { success, user: verifiedUser } = await verifyToken(
        tokens.access_token
      );
      if (success && verifiedUser) {
        setUser(verifiedUser);
      } else {
        logoutAuth();
        setUser(null);
        setTokenState(null);
      }
    } catch (error) {
      console.error("Failed to set auth token:", error);
      logoutAuth();
      setUser(null);
      setTokenState(null);
    }
  };

  const handleLogout = () => {
    logoutAuth();
    setUser(null);
    setTokenState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        logout: handleLogout,
        setToken: handleSetToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
