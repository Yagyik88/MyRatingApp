import { useState, useEffect } from "react";
import { loginUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "store_owner") navigate("/owner/dashboard");
    else if (role === "normal") navigate("/user/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Processing...");

    try {
      const res = await loginUser(form);
      const { token, user } = res.data;

      const role = user.role;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setMsg("✅ Login successful!");

      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "store_owner") navigate("/owner/dashboard");
      else navigate("/user/dashboard");
    } catch (err) {
      setMsg(
        err.response?.data?.message
          ? `❌ ${err.response.data.message}`
          : "❌ Server error"
      );
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} style={{ textAlign: "left" }}>
      
      <div className="field">
        <label>Email</label>
        <input
          className="input"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div className="field">
        <label>Password</label>
        <input
          className="input"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
        <button className="btn" type="submit" style={styles.button}>
          Login
        </button>
        <button
          type="button"
          className="btn ghost"
          onClick={() => {
            setForm({ email: "", password: "" });
            setMsg("");
          }}
        >
          Reset
        </button>
      </div>

      {msg && <p style={{ marginTop: 12, color: "#444" }}>{msg}</p>}
    </form>
  );
}

const styles = {
  input: {
    background: "white",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "8px",
  },
  button: {
    background: "#007bff",
    color: "white",
    fontWeight: "600",
    borderRadius: "8px",
    padding: "10px 16px",
    border: "none",
  },
};
