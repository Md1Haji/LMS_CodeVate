import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import FeatureCard from "../components/FeatureCard.jsx";
import ComparisonTable from "../components/ComparisonTable.jsx";

const features = [
  { icon: "🛡️", title: "Role-based access", description: "Admins, instructors, tutors, and students each see only what their role permits — enforced on both the API and the UI." },
  { icon: "📊", title: "Admin control center", description: "Provision accounts, monitor platform-wide stats, and manage every course from one dashboard." },
  { icon: "🎓", title: "Instructor course builder", description: "Design modules, assign tutors, publish courses, and grade assignments end to end." },
  { icon: "🤝", title: "Tutor support layer", description: "Tutors help with grading and feedback on assigned courses without full instructor permissions." },
  { icon: "📚", title: "Student learning hub", description: "Browse courses, track progress, submit assignments, and leave reviews." },
  { icon: "🏆", title: "Achievements & impact", description: "Platform milestones and learner outcomes, visible to everyone before they sign up." },
];

const achievements = [
  { metric: "12,400+", label: "Active learners" },
  { metric: "860+", label: "Published courses" },
  { metric: "4.7 / 5", label: "Average course rating" },
  { metric: "94%", label: "Assignment completion rate" },
];

export default function LandingPage() {
  return (
    <div>
      <Navbar />

      {/* Hero */}
      <section className="container" style={{ padding: "72px 24px 48px", textAlign: "center" }}>
        <span className="pill">Role-based learning platform</span>
        <h1 style={{ fontSize: 44, marginTop: 18, lineHeight: 1.15 }}>
          One platform. Four roles.<br />Everyone gets the right dashboard.
        </h1>
        <p style={{ maxWidth: 560, margin: "18px auto 0", color: "var(--color-text-muted)", fontSize: 16, lineHeight: 1.6 }}>
          LearnSphere gives admins, instructors, tutors, and students a single sign-in — and
          a workspace built specifically for what each of them needs to do.
        </p>
        <div style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center" }}>
          <Link to="/register" className="btn btn-primary" style={{ padding: "12px 24px" }}>Create free account</Link>
          <Link to="/login" className="btn btn-outline" style={{ padding: "12px 24px" }}>Log in</Link>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="container" style={{ padding: "32px 24px" }}>
        <div className="card" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, background: "var(--color-primary-dark)", border: "none" }}>
          {achievements.map((a) => (
            <div key={a.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 800, color: "#fff" }}>{a.metric}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>{a.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container" style={{ padding: "56px 24px" }}>
        <h2 style={{ fontSize: 28, textAlign: "center" }}>Built for every role on your team</h2>
        <p style={{ textAlign: "center", color: "var(--color-text-muted)", marginTop: 8 }}>
          The same authentication, four purpose-built experiences.
        </p>
        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {features.map((f) => <FeatureCard key={f.title} {...f} />)}
        </div>
      </section>

      {/* Comparison */}
      <section className="container" style={{ padding: "24px 24px 80px" }}>
        <h2 style={{ fontSize: 28, textAlign: "center" }}>How we compare to a typical LMS today</h2>
        <p style={{ textAlign: "center", color: "var(--color-text-muted)", marginTop: 8, marginBottom: 28 }}>
          A quick, honest look at what's usually missing from off-the-shelf course platforms.
        </p>
        <ComparisonTable />
      </section>
    </div>
  );
}
