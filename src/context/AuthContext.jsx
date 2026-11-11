// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getAllUsers, saveAllUsers, updateUserProfile } from "../services/storageService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("loggedInUser");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem("userRole") || null;
  });

  // Sync session across tabs
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem("loggedInUser");
        const savedRole = localStorage.getItem("userRole");
        setUser(saved ? JSON.parse(saved) : null);
        setRole(savedRole || null);
      } catch {
        setUser(null);
        setRole(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = useCallback((email, password) => {
    const users = getAllUsers();
    const cleanEmail = email.trim().toLowerCase();
    const foundUser = users.find(
      u => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Invalid email or password. Please check your credentials." };
    }

    const sessionUser = { ...foundUser };
    delete sessionUser.password;

    localStorage.setItem("userRole", sessionUser.role);
    localStorage.setItem("loggedInUser", JSON.stringify(sessionUser));

    setUser(sessionUser);
    setRole(sessionUser.role);
    window.dispatchEvent(new Event("storage"));

    return { success: true, message: `Welcome back, ${sessionUser.name}!`, user: sessionUser };
  }, []);

  const signup = useCallback((formData) => {
    const users = getAllUsers();
    const cleanEmail = formData.email.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: "An account with this email address already exists." };
    }

    const isWorker = formData.role === "worker";

    // Generate clean initials avatar SVG if no photo uploaded
    const initials = formData.name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";
    const defaultAvatarSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="%23e11d48" rx="60"/><text x="50%" y="54%" font-family="Arial,sans-serif" font-size="44" font-weight="bold" fill="%23ffffff" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;

    const newUser = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      name: formData.name.trim(),
      email: cleanEmail,
      password: formData.password,
      role: formData.role || "customer",
      phone: formData.phone || "",
      location: formData.location || "Local Area",
      about: formData.about || (isWorker ? "Experienced professional available for hire." : "HelpUp customer."),
      img: formData.img || defaultAvatarSvg,
      createdAt: new Date().toISOString(),
      ...(isWorker && {
        title: formData.title || `${formData.service || "Service"} Professional`,
        service: formData.service || "Home Cleaning",
        rate: Number(formData.rate) || 250,
        rating: 0,
        reviewCount: 0,
        experience: formData.experience || "1+ year"
      })
    };

    saveAllUsers([...users, newUser]);

    const sessionUser = { ...newUser };
    delete sessionUser.password;

    localStorage.setItem("userRole", sessionUser.role);
    localStorage.setItem("loggedInUser", JSON.stringify(sessionUser));

    setUser(sessionUser);
    setRole(sessionUser.role);
    window.dispatchEvent(new Event("storage"));

    return { success: true, message: "Account created successfully! Welcome to HelpUp.", user: sessionUser };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setRole(null);
    window.dispatchEvent(new Event("storage"));
  }, []);

  const updateProfile = useCallback((updates) => {
    if (!user) return null;

    const updatedUser = { ...user, ...updates };
    updateUserProfile(updatedUser);

    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    window.dispatchEvent(new Event("storage"));

    return updatedUser;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
