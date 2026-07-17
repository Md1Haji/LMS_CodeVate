import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

// Owned by: Team member 4 (student module)
export default function StudentDashboard() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [browse, setBrowse] = useState([]);

  const load = async () => {
    const [{ data: mine }, { data: all }] = await Promise.all([
      api.get("/student/my-courses"),
      api.get("/student/courses/browse"),
    ]);
    setEnrollments(mine.enrollments);
    setBrowse(all.courses);
  };

  useEffect(() => { load(); }, []);

  const enroll = async (courseId) => {
    await api.post(`/student/courses/${courseId}/enroll`);
    load();
  };

  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: "32px 24px 64px" }}>
        <h1 style={{ fontSize: 26 }}>Student dashboard</h1>
        <p style={{ color: "var(--color-text-muted)", marginTop: 4 }}>Welcome back, {user?.name}.</p>

        <h2 style={{ fontSize: 17, marginTop: 32 }}>My courses</h2>
        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {enrollments.length === 0 && <div className="card">You're not enrolled in anything yet — browse below.</div>}
          {enrollments.map((e) => (
            <div key={e._id} className="card">
              <h3>{e.course?.title}</h3>
              <div style={{ marginTop: 8, height: 8, borderRadius: 4, background: "var(--color-surface-alt)" }}>
                <div style={{ width: `${e.progressPercent}%`, height: "100%", borderRadius: 4, background: "var(--color-accent)" }} />
              </div>
              <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 6 }}>{e.progressPercent}% complete</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 17, marginTop: 32 }}>Browse courses</h2>
        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {browse.map((c) => (
            <div key={c._id} className="card">
              <h3>{c.title}</h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: 13 }}>{c.description}</p>
              <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={() => enroll(c._id)}>Enroll</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
