import React, { useEffect, useState } from "react";
import api from "../../services/api";

const CATEGORIES = ["platform", "student", "instructor", "tutor"];
const EMPTY_FORM = { title: "", description: "", metricValue: "", category: "platform", displayOnLanding: true, displayOrder: 0 };

// Manages the achievements shown on the public landing page and role badges.
// Owned by: Team member 1 (admin dashboard + auth/authorization)
export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const loadAchievements = async () => {
    try {
      const { data } = await api.get("/admin/achievements");
      setAchievements(data.achievements);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load achievements");
    }
  };

  useEffect(() => { loadAchievements(); }, []);

  const createAchievement = async (e) => {
    e.preventDefault();
    setFormError("");
    try {
      await api.post("/admin/achievements", form);
      setForm(EMPTY_FORM);
      loadAchievements();
    } catch (err) {
      setFormError(err.response?.data?.message || "Could not create achievement");
    }
  };

  const toggleLanding = async (a) => {
    await api.patch(`/admin/achievements/${a._id}`, { displayOnLanding: !a.displayOnLanding });
    loadAchievements();
  };

  const removeAchievement = async (id) => {
    if (!window.confirm("Delete this achievement?")) return;
    await api.delete(`/admin/achievements/${id}`);
    loadAchievements();
  };

  return (
    <div>
      <h1 style={{ fontSize: 26 }}>Achievements</h1>
      <p style={{ color: "var(--color-text-muted)", marginTop: 4 }}>
        Badges and stats shown on the landing page and role dashboards.
      </p>

      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
        <div className="card">
          {error && <div style={{ color: "var(--color-danger)", fontSize: 13, marginBottom: 12 }}>{error}</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {achievements.map((a) => (
              <div
                key={a._id}
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  padding: 14,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{a.title}</div>
                  <div style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 2 }}>{a.description}</div>
                  <div style={{ marginTop: 6, display: "flex", gap: 8 }}>
                    <span className="pill">{a.category}</span>
                    {a.metricValue && <span className="pill">{a.metricValue}</span>}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                  <button
                    className="btn btn-outline"
                    style={{ padding: "4px 10px", fontSize: 12 }}
                    onClick={() => toggleLanding(a)}
                  >
                    {a.displayOnLanding ? "On landing page" : "Hidden"}
                  </button>
                  <button
                    className="btn"
                    style={{ padding: "4px 10px", fontSize: 12, color: "var(--color-danger)" }}
                    onClick={() => removeAchievement(a._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {achievements.length === 0 && (
              <div style={{ fontSize: 13, color: "var(--color-text-muted)" }}>No achievements yet — add one to feature it on the landing page.</div>
            )}
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: 17, marginBottom: 14 }}>Add achievement</h2>
          <form onSubmit={createAchievement} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input placeholder="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <textarea placeholder="Description" required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <input placeholder="Metric (e.g. 50,000+ learners)" value={form.metricValue} onChange={(e) => setForm({ ...form, metricValue: e.target.value })} />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <input
                type="checkbox"
                style={{ width: "auto" }}
                checked={form.displayOnLanding}
                onChange={(e) => setForm({ ...form, displayOnLanding: e.target.checked })}
              />
              Show on landing page
            </label>
            {formError && <div style={{ color: "var(--color-danger)", fontSize: 13 }}>{formError}</div>}
            <button className="btn btn-primary" style={{ justifyContent: "center" }}>Add achievement</button>
          </form>
        </div>
      </div>
    </div>
  );
}
