import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      // Public sign-up always creates a student account.
      // Instructor / tutor / admin accounts are provisioned from the admin dashboard.
      await register(form.name, form.email, form.password);
      navigate("/student");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container" style={{ maxWidth: 420, padding: "64px 24px" }}>
        <div className="card">
          <h1 style={{ fontSize: 24, marginBottom: 6 }}>Create your account</h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: 14, marginBottom: 24 }}>
            Sign up as a student. Teaching accounts are set up by an admin.
          </p>
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Full name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ marginTop: 6 }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Email</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ marginTop: 6 }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Password</label>
              <input type="password" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ marginTop: 6 }} />
            </div>
            {error && <div style={{ color: "var(--color-danger)", fontSize: 13 }}>{error}</div>}
            <button className="btn btn-primary" disabled={busy} style={{ justifyContent: "center", marginTop: 6 }}>
              {busy ? "Creating account…" : "Create account"}
            </button>
          </form>
          <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 18, textAlign: "center" }}>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
