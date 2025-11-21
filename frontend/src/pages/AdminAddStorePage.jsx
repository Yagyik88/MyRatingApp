import { useState } from "react";
import axios from "axios";

export default function AdminAddStorePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [msg, setMsg] = useState("");
  const API = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Processing...");

    try {
      const token = localStorage.getItem("token");

      await axios.post(`${API}/admin/add-store`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMsg("✅ Store added successfully!");
    } catch (err) {
      const msg = err.response?.data?.message || "Server error";
      setMsg("❌ " + msg);
    }
  };

  return (
    <div className="app-container">
      <div className="card" style={{ maxWidth: "650px", margin: "auto" }}>
        <h1 className="h1">Add New Store</h1>
        <p className="form-note">
          Fill the store details below. The store will appear in the admin stores list.
        </p>

        <form className="form" onSubmit={handleSubmit}>

          <div className="field">
            <label>Store Name</label>
            <input
              type="text"
              className="input"
              name="name"
              placeholder="Ex: Sunrise Bakery"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Store Email</label>
            <input
              type="email"
              className="input"
              name="email"
              placeholder="store@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Address</label>
            <textarea
              className="textarea"
              name="address"
              placeholder="Complete store address"
              value={form.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button className="btn" type="submit">
            Add Store
          </button>
        </form>

        {msg && (
          <div style={{ marginTop: "12px" }} className="form-note">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
