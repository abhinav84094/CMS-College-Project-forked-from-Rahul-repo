import React, { createContext, useContext, useState } from "react";
import { api } from "../utils/api";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(false);

  // LOGIN (BACKEND)
  const login = async (username, password) => {
    try {
      setLoading(true);

      const res = await api.login({
        name: username,   // 🔑 mapping username → backend "name"
        password,
      });

      setUser(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Invalid credentials",
      };
    } finally {
      setLoading(false);
    }
  };

  //  SIGNUP (BACKEND)
  const signUp = async (username, password) => {
    try {
      setLoading(true);

      const res = await api.register({
        name: username,
        password,
      });

      return { success: true, message: res.message };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Signup failed",
      };
    } finally {
      setLoading(false);
    }
  };

  //  LOGOUT
  const logOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
