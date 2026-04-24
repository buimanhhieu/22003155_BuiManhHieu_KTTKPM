import React, { createContext, useContext, useState, useCallback } from "react";
import apiService from "../services/api";
import type { LoginRequest } from "../types";

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    apiService.isAuthenticated(),
  );
  const [userId, setUserId] = useState<string | null>(() =>
    localStorage.getItem("userId"),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (credentials: LoginRequest): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiService.login(credentials);
        if (response.token || response.userId || response.status === "success") {
          setIsAuthenticated(true);
          setUserId(response.userId || "");
          return true;
        } else {
          setError(response.message || "Login failed");
          return false;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Login failed";
        setError(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    apiService.logout();
    setIsAuthenticated(false);
    setUserId(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userId,
        loading,
        error,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
