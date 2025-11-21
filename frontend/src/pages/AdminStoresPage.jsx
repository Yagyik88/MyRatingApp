import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminStoresPage() {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", address: "" });
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  // ADMIN ONLY CHECK
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") navigate("/login");
    // eslint-disable-next-line
  }, []);

  const loadStores = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API}/admin/stores`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          ...filters,
          sortBy,
          order,
        },
      })
      .then((res) => setStores(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadStores();
    // eslint-disable-next-line
  }, [sortBy, order]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadStores();
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="h1">Stores List</h1>

        {/* FILTERS */}
        <form className="filter-grid" onSubmit={handleSearch}>
          <div className="field">
            <label>Name</label>
            <input
              className="input"
              placeholder="Search Name"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              className="input"
              placeholder="Search Email"
              value={filters.email}
              onChange={(e) =>
                setFilters({ ...filters, email: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label>Address</label>
            <input
              className="input"
              placeholder="Search Address"
              value={filters.address}
              onChange={(e) =>
                setFilters({ ...filters, address: e.target.value })
              }
            />
          </div>

          <button className="btn" style={{ marginTop: "26px" }}>
            Search
          </button>
        </form>

        {/* SORTING */}
        <div className="sort-bar">
          <label>Sort By:</label>
          <select
            className="select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="address">Address</option>
          </select>

          <select
            className="select"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </div>

        {/* STORES LIST */}
        <div className="list-container">
          {stores.map((store) => (
            <div key={store.id} className="list-card">
              <h2 className="list-title">{store.name}</h2>
              <p><strong>Email:</strong> {store.email}</p>
              <p><strong>Address:</strong> {store.address}</p>
              <p><strong>Avg Rating:</strong> ⭐ {store.avg_rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
