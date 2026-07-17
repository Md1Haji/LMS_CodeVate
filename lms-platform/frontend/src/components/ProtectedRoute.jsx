import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Wraps role-specific dashboards. `allowedRoles` mirrors the backend's authorize() middleware
// so a student can never even render the admin/tutor/instructor UI.
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="container" style={{ padding: 60 }}>Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
