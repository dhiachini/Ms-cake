import { createContext, useContext, useState, type ReactNode } from "react";

export type AuthStatus = "guest" | "user" | "admin";

interface AuthContextType {
  status: AuthStatus;
  login: (role: AuthStatus) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<AuthStatus>("admin");

  const login = (role: AuthStatus) => setStatus(role);
  const logout = () => setStatus("guest");

  return (
    <AuthContext.Provider value={{ status, login, logout }}>  
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
