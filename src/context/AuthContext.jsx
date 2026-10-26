"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import * as authService from "@/services/authService";
import { STORAGE_KEYS, readStorage, removeStorage, writeStorage } from "@/utils/storage";

const AuthContext = createContext(null);

// DEMO AUTH ONLY 

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // Restore session on page load: 
  useEffect(() => {
    const saved =
      readStorage(STORAGE_KEYS.user, null, "local") ||
      readStorage(STORAGE_KEYS.user, null, "session");
    const valid = saved && typeof saved === "object" && typeof saved.id === "string" && typeof saved.name === "string";
    setUser(valid ? saved : null);
    setHydrated(true);
  }, []);

  const setSession = useCallback((nextUser, remember) => {
    removeStorage(STORAGE_KEYS.user, "local");
    removeStorage(STORAGE_KEYS.user, "session");
    writeStorage(STORAGE_KEYS.user, nextUser, remember ? "local" : "session");
    writeStorage(STORAGE_KEYS.rememberMe, !!remember, "local");
    setUser(nextUser);
  }, []);

  const login = useCallback(
    async ({ email, password, remember = false }) => {
      const loggedIn = await authService.login({ email, password });
      setSession(loggedIn, remember);
      toast.success("Login successful", { description: `Welcome back, ${loggedIn.name.split(" ")[0]}.` });
      return loggedIn;
    },
    [setSession]
  );

  const register = useCallback(
    async (data) => {
      const created = await authService.register(data);
      setSession(created, false);
      toast.success("Account created", { description: `Welcome to Urban Bite, ${created.name.split(" ")[0]}.` });
      return created;
    },
    [setSession]
  );

  const logout = useCallback(() => {
    removeStorage(STORAGE_KEYS.user, "local");
    removeStorage(STORAGE_KEYS.user, "session");
    removeStorage(STORAGE_KEYS.rememberMe, "local");
    setUser(null);
    toast.success("Logout successful");
  }, []);

  // Keep the saved session in the same storage 
  const updateSessionUser = useCallback((patch) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      const remembered = readStorage(STORAGE_KEYS.user, null, "local");
      writeStorage(STORAGE_KEYS.user, next, remembered ? "local" : "session");
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ user, isLoggedIn: !!user, hydrated, login, register, logout, updateSessionUser }),
    [user, hydrated, login, register, logout, updateSessionUser]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
