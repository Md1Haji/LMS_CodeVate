import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

// Owned by: Team member 2 (instructor module)
export default function InstructorDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/instructor/courses").then(({ data }) => setCourses(data.courses));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: "32px 24px 64px" }}>
        <h1 style={{ fontSize: 26 }}>Instructor dashboard</h1>
        <p style={{ color: "var(--color-text-muted)", marginTop: 4 }}>Welcome back, {user?.name}.</p>

        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {courses.length === 0 && (
            <div className="card">No courses yet. Create your first course to get started.</div>
          )}
          {courses.map((c) => (
            <div key={c._id} className="card">
              <span className="pill">{c.status}</span>
              <h3 style={{ marginTop: 10 }}>{c.title}</h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: 13 }}>{c.description}</p>
              <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 8 }}>
                {c.tutors?.length || 0} tutor(s) assigned
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
