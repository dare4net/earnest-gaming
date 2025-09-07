"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/lib/auth-api';

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: any;
  token?: string;
}

interface AuthContextType {
  user: any | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (username: string, email: string, password: string, selectedGames: string[]) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored token and validate it
    const token = localStorage.getItem('token');
    if (token) {
      auth.getCurrentUser()
        .then(data => setUser(data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setError(null);
      const { user, token } = await auth.login({ email, password });
      localStorage.setItem('token', token);
      setUser(user);
      return { success: true, user, token };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      return { success: false, message };
    }
  };

  const register = async (
    username: string, 
    email: string, 
    password: string, 
    selectedGames: string[]
  ): Promise<AuthResponse> => {
    try {
      setError(null);
      const { user, token } = await auth.register({ 
        username, 
        email, 
        password,
        selectedGames 
      });
      localStorage.setItem('token', token);
      setUser(user);
      return { success: true, user, token };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await auth.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
