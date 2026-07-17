import React from "react";

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        style={{
          width: 44, height: 44, borderRadius: 12,
          background: "var(--color-primary-soft)", color: "var(--color-primary)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: 17 }}>{title}</h3>
      <p style={{ color: "var(--color-text-muted)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{description}</p>
    </div>
  );
}
