import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  // Redirect if wrong role
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/login");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStats(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load dashboard statistics");
        setIsLoading(false);
      });
  }, [API]);

  return (
    <div className="dashboard-page">
      <div className="app-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-header-content">
            <div className="dashboard-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Admin Panel</span>
            </div>
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <p className="dashboard-subtitle">
              Monitor and manage your platform's performance and data
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-error">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading dashboard...</p>
          </div>
        )}

        {/* Stats Cards */}
        {!isLoading && !error && (
          <>
            <div className="stats-grid">
              {/* Total Users Card */}
              <div className="stat-card stat-card-users">
                <div className="stat-icon-wrapper">
                  <div className="stat-icon icon-users-bg">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                </div>
                <div className="stat-content">
                  <div className="stat-label">Total Users</div>
                  <div className="stat-value">{stats.users}</div>
                  <div className="stat-change positive">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="18 15 12 9 6 15"/>
                    </svg>
                    <span>Active accounts</span>
                  </div>
                </div>
              </div>

              {/* Total Stores Card */}
              <div className="stat-card stat-card-stores">
                <div className="stat-icon-wrapper">
                  <div className="stat-icon icon-stores-bg">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                  </div>
                </div>
                <div className="stat-content">
                  <div className="stat-label">Total Stores</div>
                  <div className="stat-value">{stats.stores}</div>
                  <div className="stat-change positive">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="18 15 12 9 6 15"/>
                    </svg>
                    <span>Registered stores</span>
                  </div>
                </div>
              </div>

              {/* Total Ratings Card */}
              <div className="stat-card stat-card-ratings">
                <div className="stat-icon-wrapper">
                  <div className="stat-icon icon-ratings-bg">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </div>
                </div>
                <div className="stat-content">
                  <div className="stat-label">Total Ratings</div>
                  <div className="stat-value">{stats.ratings}</div>
                  <div className="stat-change positive">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="18 15 12 9 6 15"/>
                    </svg>
                    <span>Submitted reviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-section">
              <h2 className="section-title">Quick Actions</h2>
              <div className="quick-actions-grid">
                <Link to="/admin/users" className="action-card">
                  <div className="action-icon icon-users-bg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <div className="action-content">
                    <h3 className="action-title">Manage Users</h3>
                    <p className="action-description">View and manage all users</p>
                  </div>
                  <div className="action-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </Link>

                <Link to="/admin/stores" className="action-card">
                  <div className="action-icon icon-stores-bg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                  </div>
                  <div className="action-content">
                    <h3 className="action-title">Manage Stores</h3>
                    <p className="action-description">View and manage all stores</p>
                  </div>
                  <div className="action-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </Link>

                <Link to="/admin/add-user" className="action-card">
                  <div className="action-icon icon-add-bg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="8.5" cy="7" r="4"/>
                      <line x1="20" y1="8" x2="20" y2="14"/>
                      <line x1="23" y1="11" x2="17" y2="11"/>
                    </svg>
                  </div>
                  <div className="action-content">
                    <h3 className="action-title">Add New User</h3>
                    <p className="action-description">Create a new user account</p>
                  </div>
                  <div className="action-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </Link>

                <Link to="/admin/add-store" className="action-card">
                  <div className="action-icon icon-add-bg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <line x1="12" y1="12" x2="12" y2="18"/>
                      <line x1="9" y1="15" x2="15" y2="15"/>
                    </svg>
                  </div>
                  <div className="action-content">
                    <h3 className="action-title">Add New Store</h3>
                    <p className="action-description">Register a new store</p>
                  </div>
                  <div className="action-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>

            {/* Platform Overview */}
            <div className="overview-section">
              <div className="overview-card">
                <div className="overview-header">
                  <h2 className="section-title">Platform Overview</h2>
                  <div className="overview-badge badge-success">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    All Systems Operational
                  </div>
                </div>
                <div className="overview-content">
                  <div className="overview-item">
                    <div className="overview-item-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </div>
                    <div className="overview-item-content">
                      <div className="overview-item-label">Last Updated</div>
                      <div className="overview-item-value">{new Date().toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="overview-item">
                    <div className="overview-item-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                      </svg>
                    </div>
                    <div className="overview-item-content">
                      <div className="overview-item-label">Platform Status</div>
                      <div className="overview-item-value">Active & Healthy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}