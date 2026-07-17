import React, { useEffect, useState } from "react";
import api from "../../services/api";

const STATUSES = ["draft", "published", "archived"];

// Owned by: Team member 1 (admin dashboard + auth/authorization)
export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const loadCourses = async () => {
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (search) params.search = search;
      const { data } = await api.get("/admin/courses", { params });
      setCourses(data.courses);
      setTotal(data.total);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load courses");
    }
  };

  useEffect(() => { loadCourses(); }, [statusFilter, search]);

  const changeStatus = async (id, status) => {
    await api.patch(`/admin/courses/${id}`, { status });
    loadCourses();
  };

  const removeCourse = async (id) => {
    if (!window.confirm("Delete this course and all its enrollments? This cannot be undone.")) return;
    await api.delete(`/admin/courses/${id}`);
    loadCourses();
  };

  return (
    <div>
      <h1 style={{ fontSize: 26 }}>Courses</h1>
      <p style={{ color: "var(--color-text-muted)", marginTop: 4 }}>{total} courses across every instructor.</p>

      <div className="card" style={{ marginTop: 24 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <input placeholder="Search title…" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ maxWidth: 180 }}>
            <option value="">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {error && <div style={{ color: "var(--color-danger)", fontSize: 13, marginBottom: 12 }}>{error}</div>}

        <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", color: "var(--color-text-muted)" }}>
              <th style={{ padding: "8px 0" }}>Title</th>
              <th>Instructor</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c._id} style={{ borderTop: "1px solid var(--color-border)" }}>
                <td style={{ padding: "8px 0", fontWeight: 600 }}>{c.title}</td>
                <td>{c.instructor?.name || "—"}</td>
                <td>{c.category}</td>
                <td>${c.price}</td>
                <td>{c.ratingAverage ? `${c.ratingAverage.toFixed(1)} (${c.ratingCount})` : "—"}</td>
                <td>
                  <select
                    value={c.status}
                    onChange={(e) => changeStatus(c._id, e.target.value)}
                    style={{ fontSize: 12, padding: "4px 6px" }}
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td>
                  <button
                    className="btn"
                    style={{ padding: "4px 10px", fontSize: 12, color: "var(--color-danger)" }}
                    onClick={() => removeCourse(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr><td colSpan={7} style={{ padding: "16px 0", color: "var(--color-text-muted)" }}>No courses match this filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
