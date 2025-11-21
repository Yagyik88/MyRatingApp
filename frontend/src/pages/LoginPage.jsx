import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to continue</p>

        <LoginForm />

        <div style={styles.footer}>
          <p style={styles.text}>
            Don’t have an account?{" "}
            <Link to="/signup" style={styles.link}>
              Sign up
            </Link>
          </p>

          <Link to="/" style={styles.backBtn}>
            ← Back to Home
          </Link>
        </div>
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
    padding: "35px",
    borderRadius: "12px",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  title: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#222",
  },

  subtitle: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "22px",
  },

  footer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  text: {
    fontSize: "14px",
    color: "#444",
  },

  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "600",
  },

  backBtn: {
    marginTop: "6px",
    fontSize: "14px",
    color: "#007bff",
    textDecoration: "none",
  },
};
