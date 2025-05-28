import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(!!token);

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
    setUser({ username, loggedIn: true });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(false);
  };

  const authFetch = (url, options = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return <AuthContext.Provider value={{ user, login, logout, authFetch, register }}>{children}</AuthContext.Provider>;
}
