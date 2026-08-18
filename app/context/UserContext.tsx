"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  role: "admin" | "student" | "trainer";
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ SAFE INIT
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      // 🔥 IMPORTANT: check BOTH
      if (storedUser && token && token !== "undefined" && token !== "null") {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData: User, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("selectedCourse"); // 🔥 extra safety
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
};
