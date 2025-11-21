import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminAddUserPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "normal",
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Processing...");

    try {
      const token = localStorage.getItem("token");

      await axios.post(`${API}/admin/add-user`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMsg("✅ User added successfully!");
    } catch (err) {
      const msg = err.response?.data?.message || "Server error";
      setMsg("❌ " + msg);
    }
  };

  return (
    <div className="app-container">
      <div className="card" style={{ maxWidth: "650px", margin: "auto" }}>
        <h1 className="h1">Add New User</h1>
        <p className="form-note">Fill all required details to create a new user</p>

        <form className="form" onSubmit={handleSubmit}>
          
          <div className="field">
            <label>Full Name (20–60 chars)</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="email@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Address (optional)</label>
            <textarea
              name="address"
              className="textarea"
              placeholder="Complete address"
              value={form.address}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password (8–16 chars, uppercase + special char)"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Role</label>
            <select
              name="role"
              className="select"
              value={form.role}
              onChange={handleChange}
            >
              <option value="normal">Normal User</option>
              <option value="store_owner">Store Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn">Add User</button>
        </form>

        {msg && (
          <div className="form-note" style={{ marginTop: "12px" }}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
