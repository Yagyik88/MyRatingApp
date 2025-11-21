import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminUserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  // ADMIN ONLY CHECK
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") navigate("/login");
    // eslint-disable-next-line
  }, []);

  // LOAD USER DETAILS
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!user)
    return (
      <div className="app-container">
        <div className="card">
          <p>Loading user details...</p>
        </div>
      </div>
    );

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="h1">User Details</h1>

        <div className="info-box">
          <h2 className="list-title">{user.name}</h2>

          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>

        {/* STORE OWNER EXTRA INFO */}
        {user.role === "store_owner" && (
          <div className="owner-box">
            <h2 className="section-title">Store Owner Information</h2>

            <p className="avg-rating">
              <strong>Average Rating:</strong> ⭐ {user.average_rating || 0}
            </p>

            <h3 className="sub-heading">Stores:</h3>

            {user.stores?.length > 0 ? (
              <div className="list-container">
                {user.stores.map((store) => (
                  <div key={store.id} className="list-card">
                    <p>
                      <strong>Name:</strong> {store.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {store.email}
                    </p>
                    <p>
                      <strong>Address:</strong> {store.address}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No stores found for this owner.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
