import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function AdminUserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  // ADMIN ONLY CHECK
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") navigate("/login");
  }, [navigate]);

  // LOAD USER DETAILS
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    axios
      .get(`${API}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load user details");
        setIsLoading(false);
      });
  }, [id, API]);

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "#ec4899";
      case "store_owner":
        return "#10b981";
      case "normal":
        return "#3b82f6";
      default:
        return "var(--muted)";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        );
      case "store_owner":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
        );
      case "normal":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getStarRating = (rating) => {
    return "⭐".repeat(Math.round(rating || 0));
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "var(--success)";
    if (rating >= 3) return "var(--warning)";
    return "var(--danger)";
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="dashboard-page">
        <div className="app-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading user details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !user) {
    return (
      <div className="dashboard-page">
        <div className="app-container">
          <div className="alert alert-error">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            <span>{error || "User not found"}</span>
          </div>
          <Link to="/admin/users" className="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="app-container">
        {/* Header */}
        <div className="page-header">
          <div className="page-header-content">
            <Link to="/admin/users" className="breadcrumb-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Back to Users
            </Link>
            <h1 className="page-title">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              User Profile
            </h1>
            <p className="page-subtitle">
              Complete information and activity for {user.name}
            </p>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="profile-layout">
          <div className="profile-main">
            {/* User Info Card */}
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar-large">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="profile-header-info">
                  <h2 className="profile-name">{user.name}</h2>
                  <div 
                    className="profile-role-badge"
                    style={{ 
                      background: `${getRoleColor(user.role)}15`,
                      color: getRoleColor(user.role)
                    }}
                  >
                    {getRoleIcon(user.role)}
                    {user.role === "store_owner" ? "Store Owner" : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </div>
                </div>
              </div>

              <div className="profile-details">
                <div className="profile-detail-item">
                  <div className="profile-detail-label">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Email Address
                  </div>
                  <div className="profile-detail-value">{user.email}</div>
                </div>

                <div className="profile-detail-item">
                  <div className="profile-detail-label">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Address
                  </div>
                  <div className="profile-detail-value">
                    {user.address || <span className="text-muted">No address provided</span>}
                  </div>
                </div>

                <div className="profile-detail-item">
                  <div className="profile-detail-label">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    Account Type
                  </div>
                  <div className="profile-detail-value">
                    {user.role === "store_owner" && "Store Owner Account"}
                    {user.role === "admin" && "Administrator Account"}
                    {user.role === "normal" && "Regular User Account"}
                  </div>
                </div>
              </div>
            </div>

            {/* Store Owner Specific Information */}
            {user.role === "store_owner" && (
              <>
                {/* Rating Summary */}
                <div className="rating-summary-card-alt">
                  <div className="rating-summary-header">
                    <h3 className="rating-summary-title">Store Performance</h3>
                    <div className="rating-summary-badge">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      Average Rating
                    </div>
                  </div>
                  <div className="rating-summary-body">
                    <div className="rating-display-large">
                      <div className="rating-stars-extra-large">
                        {getStarRating(user.average_rating)}
                      </div>
                      <div 
                        className="rating-number-extra-large"
                        style={{ color: getRatingColor(user.average_rating) }}
                      >
                        {user.average_rating ? user.average_rating.toFixed(1) : "0.0"}
                      </div>
                      <div className="rating-label-large">Overall Store Rating</div>
                    </div>
                  </div>
                </div>

                {/* Owned Stores */}
                <div className="stores-section">
                  <div className="section-header-with-count">
                    <h3 className="section-title">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                      Owned Stores
                    </h3>
                    <div className="count-badge">
                      {user.stores?.length || 0}
                    </div>
                  </div>

                  {user.stores && user.stores.length > 0 ? (
                    <div className="stores-grid-small">
                      {user.stores.map((store) => (
                        <div key={store.id} className="store-card-compact">
                          <div className="store-card-compact-header">
                            <div className="store-icon-compact">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                <polyline points="9 22 9 12 15 12 15 22"/>
                              </svg>
                            </div>
                            <h4 className="store-name-compact">{store.name}</h4>
                          </div>
                          <div className="store-card-compact-body">
                            <div className="store-info-item">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                              </svg>
                              <span>{store.email}</span>
                            </div>
                            <div className="store-info-item">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                              </svg>
                              <span>{store.address}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state-small">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                      <p>No stores registered for this owner</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="profile-sidebar">
            {/* Quick Actions */}
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">Quick Actions</h3>
              <div className="sidebar-actions">
                <button className="sidebar-action-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit User
                </button>
                <button className="sidebar-action-btn danger">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                  Delete User
                </button>
              </div>
            </div>

            {/* Account Info */}
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">Account Information</h3>
              <div className="sidebar-info-list">
                <div className="sidebar-info-item">
                  <span className="sidebar-info-label">User ID</span>
                  <span className="sidebar-info-value">#{user.id}</span>
                </div>
                <div className="sidebar-info-item">
                  <span className="sidebar-info-label">Account Status</span>
                  <span className="status-badge active">
                    <span className="status-dot"></span>
                    Active
                  </span>
                </div>
                <div className="sidebar-info-item">
                  <span className="sidebar-info-label">Member Since</span>
                  <span className="sidebar-info-value">
                    {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}