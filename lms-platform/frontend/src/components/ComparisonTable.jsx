import React from "react";

// Feature-vs-market comparison. Rows are generic capability names so this
// stays factual and doesn't reference any specific competitor by name.
const rows = [
  { feature: "Role-based dashboards for admin, instructor, tutor, and student", us: true, market: "partial" },
  { feature: "Unified login with granular, role-based authorization", us: true, market: "partial" },
  { feature: "Built-in tutor layer for supporting-staff grading & feedback", us: true, market: false },
  { feature: "Live progress tracking per enrollment", us: true, market: true },
  { feature: "Assignment submission + rubric-based grading workflow", us: true, market: true },
  { feature: "Platform-wide achievement/impact metrics on the public site", us: true, market: false },
];

function Cell({ value }) {
  if (value === true) return <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>✓</span>;
  if (value === false) return <span style={{ color: "var(--color-text-muted)" }}>—</span>;
  return <span className="pill" style={{ background: "#FDF3E3", color: "var(--color-warning)" }}>Varies</span>;
}

export default function ComparisonTable() {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ background: "var(--color-surface-alt)", textAlign: "left" }}>
            <th style={{ padding: "14px 20px" }}>Capability</th>
            <th style={{ padding: "14px 20px", width: 140 }}>LearnSphere</th>
            <th style={{ padding: "14px 20px", width: 160 }}>Typical LMS today</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderTop: "1px solid var(--color-border)" }}>
              <td style={{ padding: "14px 20px", color: "var(--color-text)" }}>{r.feature}</td>
              <td style={{ padding: "14px 20px" }}><Cell value={r.us} /></td>
              <td style={{ padding: "14px 20px" }}><Cell value={r.market} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
