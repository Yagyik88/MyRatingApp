import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;


  // Redirect if wrong role
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/login");
      return;
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStats(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load dashboard");
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.cardBox}>
        <div style={styles.card}>
          <h2>Total Users</h2>
          <p>{stats.users}</p>
        </div>

        <div style={styles.card}>
          <h2>Total Stores</h2>
          <p>{stats.stores}</p>
        </div>

        <div style={styles.card}>
          <h2>Total Ratings</h2>
          <p>{stats.ratings}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px", color: "white" },
  error: {
    background: "#811",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px",
  },
  cardBox: { display: "flex", gap: "20px", marginTop: "20px" },
  card: {
    background: "#222",
    padding: "20px",
    borderRadius: "8px",
    flex: 1,
    textAlign: "center",
  },
};
