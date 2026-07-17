import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

// Owned by: Team member 3 (tutor module)
export default function TutorDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/tutor/courses").then(({ data }) => setCourses(data.courses));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: "32px 24px 64px" }}>
        <h1 style={{ fontSize: 26 }}>Tutor dashboard</h1>
        <p style={{ color: "var(--color-text-muted)", marginTop: 4 }}>Welcome back, {user?.name}.</p>

        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {courses.length === 0 && (
            <div className="card">You haven't been assigned to any courses yet.</div>
          )}
          {courses.map((c) => (
            <div key={c._id} className="card">
              <h3>{c.title}</h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: 13 }}>
                Instructor: {c.instructor?.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
