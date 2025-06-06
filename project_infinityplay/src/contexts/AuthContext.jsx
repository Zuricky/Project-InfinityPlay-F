import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(!!token);

  const authFetch = (url, options = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await authFetch("/api/auth/current-user");
      if (!res.ok) {
        logout();
        return;
      }
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Errore nel fetch current-user:", err);
      logout();
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    } else {
      setLoadingUser(false);
    }
  }, [token]);

  const register = async (email, username, password) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });
    if (!res.ok) throw new Error("Registration failed");
    return res.text();
  };

  const login = async (username, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Login failed");
    }
    const { token: newToken } = await res.json();
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout, register, authFetch, loadingUser }}>{children}</AuthContext.Provider>;
}
