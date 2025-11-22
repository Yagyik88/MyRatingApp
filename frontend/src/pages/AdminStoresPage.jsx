import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function AdminStoresPage() {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", address: "" });
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  // ADMIN ONLY CHECK
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") navigate("/login");
  }, [navigate]);

  const loadStores = () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    axios
      .get(`${API}/admin/stores`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          ...filters,
          sortBy,
          order,
        },
      })
      .then((res) => {
        setStores(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadStores();
  }, [sortBy, order]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadStores();
  };

  const handleReset = () => {
    setFilters({ name: "", email: "", address: "" });
    setSortBy("name");
    setOrder("asc");
  };

  // ⭐ SAFE RATING COLOR
  const getRatingColor = (rating) => {
    const r = Number(rating || 0);
    if (r >= 4) return "var(--success)";
    if (r >= 3) return "var(--warning)";
    return "var(--danger)";
  };

  // ⭐ SAFE STAR DISPLAY
  const getStarRating = (rating) => {
    const r = Number(rating || 0);
    return "⭐".repeat(Math.round(r));
  };

  return (
    <div className="dashboard-page">
      <div className="app-container">

        {/* HEADER */}
        <div className="page-header">
          <div className="page-header-content">
            <Link to="/admin/dashboard" className="breadcrumb-link">
              <svg width="16" height="16" strokeWidth="2" fill="none" stroke="currentColor">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Back to Dashboard
            </Link>

            <h1 className="page-title">
              <svg width="32" height="32" strokeWidth="2" fill="none" stroke="currentColor">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Manage Stores
            </h1>

            <p className="page-subtitle">
              View, search, and manage all registered stores in the platform
            </p>
          </div>

          <Link to="/admin/add-store" className="btn btn-primary">
            <svg width="18" height="18" strokeWidth="2" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add New Store
          </Link>
        </div>

        {/* FILTERS */}
        <div className="filters-card">
          <div className="filters-header">
            <h2 className="filters-title">
              <svg width="20" height="20" strokeWidth="2" fill="none" stroke="currentColor">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              Search & Filter
            </h2>

            <button className="btn ghost btn-small" onClick={handleReset}>
              <svg width="16" height="16" strokeWidth="2" fill="none" stroke="currentColor">
                <polyline points="1 4 1 10 7 10"/>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
              </svg>
              Reset Filters
            </button>
          </div>

          <form onSubmit={handleSearch}>
            <div className="filters-grid">
              <div className="form-group">
                <label className="form-label">Store Name</label>
                <input
                  className="form-input"
                  placeholder="Search by store name"
                  value={filters.name}
                  onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  placeholder="Search by email"
                  value={filters.email}
                  onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  className="form-input"
                  placeholder="Search by address"
                  value={filters.address}
                  onChange={(e) => setFilters({ ...filters, address: e.target.value })}
                />
              </div>

              {/* SORTING */}
              <div className="form-group">
                <label className="form-label">Sort By</label>
                <div className="sort-controls">
                  <select
                    className="form-input"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="address">Address</option>
                    <option value="avg_rating">Rating</option>
                  </select>

                  <button
                    type="button"
                    className="sort-order-btn"
                    onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  >
                    {order === "asc" ? "ASC ↑" : "DESC ↓"}
                  </button>
                </div>
              </div>
            </div>

            <div className="filters-actions">
              <button className="btn btn-primary" type="submit">
                Search Stores
              </button>
            </div>
          </form>
        </div>

        {/* RESULT COUNT */}
        <div className="results-header">
          <h2 className="section-title">
            {isLoading ? "Loading..." : `${stores.length} Stores Found`}
          </h2>
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading stores...</p>
          </div>
        )}

        {/* STORE LIST */}
        {!isLoading && (
          <>
            {stores.length === 0 ? (
              <div className="empty-state">
                <h3>No stores found</h3>
                <p>Try adjusting filters or add a new store</p>
              </div>
            ) : (
              <div className="data-grid">
                {stores.map((store) => {
                  const rating = Number(store.avg_rating || 0);

                  return (
                    <div key={store.id} className="data-card store-card-admin">
                      <div className="data-card-header">
                        <h3 className="data-card-title">{store.name}</h3>
                      </div>

                      <div className="data-card-content">
                        <p>Email: {store.email}</p>
                        <p>Address: {store.address}</p>

                        {/* ⭐ Fixed Rating Display */}
                        <div className="rating-display-card">
                          <div className="rating-stars-display">
                            {getStarRating(rating)}
                          </div>

                          <div
                            className="rating-value-large"
                            style={{ color: getRatingColor(rating) }}
                          >
                            {rating.toFixed(1)}
                          </div>

                          <div className="rating-label-card">Average Rating</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
