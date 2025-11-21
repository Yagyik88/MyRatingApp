import React, { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Processing...");

    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMsg("✅ User registered successfully!");
      } else {
        setMsg("❌ " + data.message);
      }
    } catch (error) {
      setMsg("❌ Server error, try again later");
      console.error(error);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create an Account</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name (20-60 chars)"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <textarea
            name="address"
            placeholder="Address (max 400 chars)"
            value={form.address}
            onChange={handleChange}
            style={styles.textarea}
          />

          <input
            type="password"
            name="password"
            placeholder="Password (8-16 chars, 1 uppercase, 1 special char)"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          <button style={styles.button} type="submit">
            Sign Up
          </button>
        </form>

        {msg && <p style={styles.message}>{msg}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "60px",
    paddingBottom: "60px",
    background: "#f5f7fa",
    minHeight: "100vh",
  },

  card: {
    width: "380px",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  title: {
    fontSize: "26px",
    marginBottom: "20px",
    fontWeight: "700",
    color: "#222",
  },

  form: { display: "flex", flexDirection: "column", gap: "14px" },

  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#fff",
  },

  textarea: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "90px",
    resize: "none",
    background: "#fff",
  },

  button: {
    padding: "12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    fontWeight: "600",
  },

  message: {
    marginTop: "18px",
    fontSize: "16px",
    fontWeight: "bold",
  },
};
