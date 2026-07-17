import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const dashboardPath = {
  admin: "/admin",
  instructor: "/instructor",
  tutor: "/tutor",
  student: "/student",
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <Link to="/" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--color-text)" }}>
          LearnSphere
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link to="/#features" style={{ color: "var(--color-text-muted)", fontSize: 14 }}>Features</Link>
          <Link to="/#achievements" style={{ color: "var(--color-text-muted)", fontSize: 14 }}>Achievements</Link>
          {user ? (
            <>
              <Link to={dashboardPath[user.role] || "/"} className="btn btn-outline">Dashboard</Link>
              <button
                className="btn btn-primary"
                onClick={async () => { await logout(); navigate("/"); }}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Log in</Link>
              <Link to="/register" className="btn btn-primary">Get started</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
