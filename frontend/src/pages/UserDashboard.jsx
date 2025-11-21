import { useEffect, useState } from "react";
import axios from "axios";
import RatingForm from "../components/RatingForm";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [query, setQuery] = useState("");

  const API = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  // Normal User Access Check
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "normal") {
      navigate("/login");
      return;
    }
    // eslint-disable-next-line
  }, []);

  const loadStores = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API}/stores`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStores(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadStores();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="h1">Browse Stores</h1>

        {/* Search Bar */}
        <input
          className="input full"
          placeholder="Search by name or address"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Store List */}
        <div className="list-container">
          {stores
            .filter(
              (s) =>
                s.name.toLowerCase().includes(query.toLowerCase()) ||
                s.address.toLowerCase().includes(query.toLowerCase())
            )
            .map((store) => (
              <div key={store.id} className="list-card">
                <h2 className="list-title">{store.name}</h2>
                <p>
                  <strong>Address:</strong> {store.address}
                </p>

                <p>
                  <strong>Overall Rating:</strong> ⭐ {store.avg_rating || 0}
                </p>

                <p>
                  <strong>Your Rating:</strong> ⭐ {store.user_rating || 0}
                </p>

                <RatingForm
                  storeId={store.id}
                  userRating={store.user_rating}
                  onDone={loadStores}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
