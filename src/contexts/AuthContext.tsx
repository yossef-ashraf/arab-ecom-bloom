import { createContext, useContext, useState, ReactNode } from "react";
import { api } from "@/services/api";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  date_of_birth: string;
  created_at: string;
  updated_at: string;
  email_verified_at?: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: { user: User; token: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async ({ user, token }: { user: User; token: string }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('auth_token', token); // Store token for persistence
  };

  const logout = async () => {
    try {
      await api.auth.logout(token!);
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};