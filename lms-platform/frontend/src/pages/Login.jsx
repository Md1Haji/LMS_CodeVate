import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";

const dashboardPath = { admin: "/admin", instructor: "/instructor", tutor: "/tutor", student: "/student" };

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const user = await login(form.email, form.password);
      navigate(dashboardPath[user.role] || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container" style={{ maxWidth: 420, padding: "64px 24px" }}>
        <div className="card">
          <h1 style={{ fontSize: 24, marginBottom: 6 }}>Welcome back</h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: 14, marginBottom: 24 }}>
            One login for every role — we'll route you to the right dashboard.
          </p>
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Email</label>
              <input type="email" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ marginTop: 6 }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Password</label>
              <input type="password" required value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ marginTop: 6 }} />
            </div>
            {error && <div style={{ color: "var(--color-danger)", fontSize: 13 }}>{error}</div>}
            <button className="btn btn-primary" disabled={busy} style={{ justifyContent: "center", marginTop: 6 }}>
              {busy ? "Signing in…" : "Log in"}
            </button>
          </form>
          <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 18, textAlign: "center" }}>
            New here? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
