import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OwnerDashboard() {
  const [info, setInfo] = useState({ ratings: [], average: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  // Check if user is store owner
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "store_owner") {
      navigate("/login");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API}/ratings/owner`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setInfo(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [API]);

  const getStarRating = (rating) => {
    return "⭐".repeat(Math.round(rating));
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "var(--success)";
    if (rating >= 3) return "var(--warning)";
    return "var(--danger)";
  };

  return (
    <div className="dashboard-page">
      <div className="app-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-header-content">
            <div className="dashboard-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <span>Store Owner</span>
            </div>
            <h1 className="dashboard-title">My Store Dashboard</h1>
            <p className="dashboard-subtitle">
              Monitor your store's performance and customer feedback
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading your store data...</p>
          </div>
        )}

        {/* Content */}
        {!isLoading && (
          <>
            {/* Average Rating Card */}
            <div className="rating-summary-card">
              <div className="rating-summary-content">
                <div className="rating-main">
                  <div className="rating-stars-large">{getStarRating(info.average)}</div>
                  <div className="rating-number" style={{ color: getRatingColor(info.average) }}>
                    {info.average ? info.average.toFixed(1) : "0.0"}
                  </div>
                  <div className="rating-label">Average Rating</div>
                </div>
                <div className="rating-stats">
                  <div className="rating-stat-item">
                    <div className="rating-stat-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    </div>
                    <div className="rating-stat-content">
                      <div className="rating-stat-value">{info.ratings.length}</div>
                      <div className="rating-stat-label">Total Reviews</div>
                    </div>
                  </div>
                  <div className="rating-stat-divider"></div>
                  <div className="rating-stat-item">
                    <div className="rating-stat-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <div className="rating-stat-content">
                      <div className="rating-stat-value">{info.ratings.length}</div>
                      <div className="rating-stat-label">Customers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ratings List */}
            <div className="ratings-section">
              <div className="section-header-inline">
                <h2 className="section-title">Customer Reviews</h2>
                <div className="badge">
                  {info.ratings.length} {info.ratings.length === 1 ? "Review" : "Reviews"}
                </div>
              </div>

              {info.ratings.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </div>
                  <h3 className="empty-state-title">No reviews yet</h3>
                  <p className="empty-state-text">
                    Your store hasn't received any customer reviews yet. 
                    Keep providing great service and the ratings will come!
                  </p>
                </div>
              ) : (
                <div className="ratings-list">
                  {info.ratings.map((r) => (
                    <div key={r.id} className="rating-card">
                      <div className="rating-card-header">
                        <div className="rating-card-user">
                          <div className="user-avatar">
                            {r.user_name.charAt(0).toUpperCase()}
                          </div>
                          <div className="user-info">
                            <div className="user-name">{r.user_name}</div>
                            <div className="rating-date">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                              </svg>
                              {new Date(r.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="rating-badge" style={{ 
                          background: `${getRatingColor(r.rating)}15`,
                          color: getRatingColor(r.rating)
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                          </svg>
                          {r.rating}/5
                        </div>
                      </div>
                      <div className="rating-card-stars">
                        {getStarRating(r.rating)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}