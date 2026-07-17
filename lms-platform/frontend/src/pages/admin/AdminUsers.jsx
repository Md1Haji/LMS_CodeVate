import React, { useEffect, useState } from "react";
import api from "../../services/api";

const ROLES = ["admin", "instructor", "tutor", "student"];

// Owned by: Team member 1 (admin dashboard + auth/authorization)
export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [roleFilter, setRoleFilter] = useState("");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "instructor" });
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const loadUsers = async () => {
    try {
      const params = {};
      if (roleFilter) params.role = roleFilter;
      if (search) params.search = search;
      const { data } = await api.get("/admin/users", { params });
      setUsers(data.users);
      setTotal(data.total);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load users");
    }
  };

  useEffect(() => { loadUsers(); }, [roleFilter, search]);

  const createUser = async (e) => {
    e.preventDefault();
    setFormError("");
    try {
      await api.post("/admin/users", form);
      setForm({ name: "", email: "", password: "", role: "instructor" });
      loadUsers();
    } catch (err) {
      setFormError(err.response?.data?.message || "Could not create user");
    }
  };

  const changeRole = async (id, role) => {
    await api.patch(`/admin/users/${id}`, { role });
    loadUsers();
  };

  const toggleActive = async (u) => {
    await api.patch(`/admin/users/${u._id}`, { isActive: !u.isActive });
    loadUsers();
  };

  const removeUser = async (id) => {
    if (!window.confirm("Permanently delete this user?")) return;
    await api.delete(`/admin/users/${id}`);
    loadUsers();
  };

  return (
    <div>
      <h1 style={{ fontSize: 26 }}>Users</h1>
      <p style={{ color: "var(--color-text-muted)", marginTop: 4 }}>{total} total accounts.</p>

      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
        <div className="card">
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <input
              placeholder="Search name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} style={{ maxWidth: 160 }}>
              <option value="">All roles</option>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {error && <div style={{ color: "var(--color-danger)", fontSize: 13, marginBottom: 12 }}>{error}</div>}

          <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", color: "var(--color-text-muted)" }}>
                <th style={{ padding: "8px 0" }}>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={{ borderTop: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "8px 0" }}>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <select
                      value={u.role}
                      onChange={(e) => changeRole(u._id, e.target.value)}
                      style={{ fontSize: 12, padding: "4px 6px" }}
                    >
                      {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline"
                      style={{ padding: "4px 10px", fontSize: 12 }}
                      onClick={() => toggleActive(u)}
                    >
                      {u.isActive ? "Active" : "Deactivated"}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn"
                      style={{ padding: "4px 10px", fontSize: 12, color: "var(--color-danger)" }}
                      onClick={() => removeUser(u._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={5} style={{ padding: "16px 0", color: "var(--color-text-muted)" }}>No users match this filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2 style={{ fontSize: 17, marginBottom: 14 }}>Provision an account</h2>
          <form onSubmit={createUser} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input placeholder="Full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Temporary password" type="password" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            {formError && <div style={{ color: "var(--color-danger)", fontSize: 13 }}>{formError}</div>}
            <button className="btn btn-primary" style={{ justifyContent: "center" }}>Create account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
