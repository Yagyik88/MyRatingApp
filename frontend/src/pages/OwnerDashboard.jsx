import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OwnerDashboard() {
  const [info, setInfo] = useState({ ratings: [], average: 0 });

  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  // Check if user is store owner
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "store_owner") {
      navigate("/login");
      return;
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API}/ratings/owner`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setInfo(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="h1">Store Owner Dashboard</h1>

        <div className="info-box">
          <h2 className="section-title">Store Rating Summary</h2>
          <p className="avg-rating">
            <strong>Average Rating:</strong> ⭐ {info.average || 0}
          </p>
        </div>

        <h2 className="section-title" style={{ marginTop: "20px" }}>
          Ratings Received
        </h2>

        {info.ratings.length === 0 && (
          <p>No ratings submitted for your store yet.</p>
        )}

        <div className="list-container">
          {info.ratings.map((r) => (
            <div key={r.id} className="list-card">
              <p>
                <strong>User:</strong> {r.user_name}
              </p>
              <p>
                <strong>Rating:</strong> ⭐ {r.rating}
              </p>
              <p>
                <strong>Date:</strong> {new Date(r.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
