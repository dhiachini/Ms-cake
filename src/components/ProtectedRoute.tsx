import type { JSX } from "react";
import { useAuth } from "../AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: "user" | "admin";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { status } = useAuth();

  if (requiredRole === "admin" && status !== "admin") {
    return <Navigate to="/" replace />;
  }
  if (requiredRole === "user" && status === "guest") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
