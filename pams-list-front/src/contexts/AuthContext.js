import React, { createContext, useState, useCallback } from "react";
import { login, refreshToken, logout } from "../services/AuthAPI";

const AuthContext = createContext();
const TIMEOUT_MILLISECONDS = 14 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLoggedIn = async (email, password) => {
    try {
      const user = await login({ email, password });
      setUser(user);
      setTimeout(refreshUser, TIMEOUT_MILLISECONDS);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const refreshUser = useCallback(async () => {
    try {
      const user = await refreshToken();
      setUser(user);
      setTimeout(refreshUser, TIMEOUT_MILLISECONDS);
    } catch (error) {
      console.error("Token refresh failed:", error);
      setUser(null);
      logout();
    }
  }, []);

  const hasAuthority = (authority) => {
    if (!user) {
      console.log("No user logged in, cannot check authority.");
      return false;
    }
    return user.authorities.includes(authority.toLowerCase());
  };

  const handleLogout = () => {
    setUser(null);
    logout();
  };

  return (
    <AuthContext.Provider value={{ user, handleLoggedIn, refreshUser, hasAuthority, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
