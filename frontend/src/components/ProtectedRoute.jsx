import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (user === null) {
    return (
      <div
        data-testid="auth-loading"
        className="min-h-screen flex items-center justify-center bg-brand-bg text-brand-muted"
      >
        <div className="font-heading text-sm tracking-widest uppercase animate-pulse">
          Cargando…
        </div>
      </div>
    );
  }

  if (user === false) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
