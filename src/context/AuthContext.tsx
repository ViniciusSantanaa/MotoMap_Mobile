import React, { createContext, useState, useContext, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

type AuthContextData = {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setUser(email);
    await SecureStore.setItemAsync("user", email);
  }

  async function register(email: string, password: string) {
    setUser(email);
    await SecureStore.setItemAsync("user", email);
  }

  async function logout() {
    setUser(null);
    await SecureStore.deleteItemAsync("user");
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
