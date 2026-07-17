import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const NAV_ITEMS = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/courses", label: "Courses" },
  { to: "/admin/achievements", label: "Achievements" },
  { to: "/admin/reviews", label: "Reviews" },
];

// Shared shell for every admin page: top navbar + left sidebar + content outlet.
// Owned by: Team member 1 (admin dashboard + auth/authorization)
export default function AdminLayout() {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: "32px 24px 64px", display: "flex", gap: 28 }}>
        <aside style={{ width: 200, flexShrink: 0 }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, color: "var(--color-text-muted)" }}>Signed in as</div>
            <div style={{ fontWeight: 700 }}>{user?.name}</div>
            <span className="pill" style={{ marginTop: 6, display: "inline-block" }}>admin</span>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                style={({ isActive }) => ({
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: isActive ? "var(--color-primary-dark)" : "var(--color-text-muted)",
                  background: isActive ? "var(--color-primary-soft)" : "transparent",
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main style={{ flex: 1, minWidth: 0 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
