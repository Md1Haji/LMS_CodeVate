import React, { useEffect, useState } from "react";
import api from "../../services/api";

// Owned by: Team member 1 (admin dashboard + auth/authorization)
export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  const loadReviews = async () => {
    try {
      const { data } = await api.get("/admin/reviews");
      setReviews(data.reviews);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load reviews");
    }
  };

  useEffect(() => { loadReviews(); }, []);

  const removeReview = async (id) => {
    if (!window.confirm("Remove this review?")) return;
    await api.delete(`/admin/reviews/${id}`);
    loadReviews();
  };

  return (
    <div>
      <h1 style={{ fontSize: 26 }}>Reviews</h1>
      <p style={{ color: "var(--color-text-muted)", marginTop: 4 }}>
        Moderate the most recent course reviews left by students.
      </p>

      <div className="card" style={{ marginTop: 24 }}>
        {error && <div style={{ color: "var(--color-danger)", fontSize: 13, marginBottom: 12 }}>{error}</div>}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {reviews.map((r) => (
            <div
              key={r._id}
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                padding: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span className="pill">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{r.course?.title || "Unknown course"}</span>
                </div>
                {r.comment && <div style={{ fontSize: 13, marginTop: 6 }}>{r.comment}</div>}
                <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 6 }}>
                  {r.student?.name} · {r.student?.email}
                </div>
              </div>
              <button
                className="btn"
                style={{ padding: "4px 10px", fontSize: 12, color: "var(--color-danger)", flexShrink: 0 }}
                onClick={() => removeReview(r._id)}
              >
                Remove
              </button>
            </div>
          ))}
          {reviews.length === 0 && (
            <div style={{ fontSize: 13, color: "var(--color-text-muted)" }}>No reviews yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
