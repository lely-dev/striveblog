import React, { createContext } from "react";
import { useState, useEffect } from "react";

export const AuthUser = createContext(null);

const getUrl = "http://localhost:3010/blogPosts";

export default function AuthUserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("userToken") || "");
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setAuthenticated(token !== "");
  }, [token]);

  const value = {
    token,
    setToken,
    authenticated,
    userId,
    setUserId,
  };

  return <AuthUser.Provider value={value}>{children}</AuthUser.Provider>;
}
