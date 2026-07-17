import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

// GET /admin/dashboard - platform-wide KPIs + recent signups.
// Owned by: Team member 1 (admin dashboard + auth/authorization)
export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/admin/dashboard")
      .then(({ data }) => setStats(data))
      .catch((err) => setError(err.response?.data?.message || "Could not load dashboard stats"));
  }, []);

  if (error) return <div className="card" style={{ color: "var(--color-danger)" }}>{error}</div>;
  if (!stats) return <div>Loading…</div>;

  const kpis = [
    ["Students", stats.totalStudents],
    ["Instructors", stats.totalInstructors],
    ["Tutors", stats.totalTutors],
    ["Total courses", stats.totalCourses],
    ["Published courses", stats.publishedCourses],
    ["Draft courses", stats.draftCourses],
    ["Total enrollments", stats.totalEnrollments],
    ["Active enrollments", stats.activeEnrollments],
  ];

  return (
    <div>
      <h1 style={{ fontSize: 26 }}>Overview</h1>
      <p style={{ color: "var(--color-text-muted)", marginTop: 4 }}>
        Platform-wide activity at a glance.
      </p>

      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {kpis.map(([label, value]) => (
          <div key={label} className="card">
            <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "var(--font-display)" }}>{value}</div>
            <div style={{ color: "var(--color-text-muted)", fontSize: 13 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div className="card">
          <div style={{ color: "var(--color-text-muted)", fontSize: 13 }}>Estimated revenue</div>
          <div style={{ fontSize: 30, fontWeight: 800, fontFamily: "var(--font-display)", marginTop: 6 }}>
            ${Number(stats.estimatedRevenue || 0).toLocaleString()}
          </div>
          <div style={{ color: "var(--color-text-muted)", fontSize: 12, marginTop: 6 }}>
            Sum of course price across all enrollments (all-time).
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: 15 }}>Recent signups</h2>
            <Link to="/admin/users" style={{ fontSize: 13 }}>View all users →</Link>
          </div>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
            {stats.recentUsers?.length === 0 && (
              <div style={{ fontSize: 13, color: "var(--color-text-muted)" }}>No signups yet.</div>
            )}
            {stats.recentUsers?.map((u) => (
              <div key={u._id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{u.name}</div>
                  <div style={{ color: "var(--color-text-muted)" }}>{u.email}</div>
                </div>
                <span className="pill">{u.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
