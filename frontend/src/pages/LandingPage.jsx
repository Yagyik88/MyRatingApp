import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="landing-page">
      {/* HERO SECTION */}
      <div className={`hero-section ${isVisible ? 'visible' : ''}`}>
        <div className="app-container">
          <div className="hero-content">
            {/* Hero Badge */}
            <div className="hero-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
              <span>Trusted by 1000+ stores</span>
            </div>

            {/* Hero Title */}
            <h1 className="hero-title">
              Discover & Rate Your
              <span className="gradient-text"> Favorite Stores</span>
            </h1>
            
            {/* Hero Subtitle */}
            <p className="hero-subtitle">
              Connect with local businesses through authentic reviews. 
              Admins manage the platform, store owners track performance, 
              and users share their experiences with simple 1-5 star ratings.
            </p>

            {/* Hero CTA Buttons */}
            <div className="hero-cta">
              <Link to="/signup" className="btn btn-primary btn-large">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <line x1="20" y1="8" x2="20" y2="14"/>
                  <line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
                Get Started Free
              </Link>
              <Link to="/login" className="btn ghost btn-large">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <path d="M10 17l5-5-5-5"/>
                  <line x1="13.8" y1="12" x2="3" y2="12"/>
                </svg>
                Sign In
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="trust-indicators">
              <div className="trust-item">
                <div className="trust-icon">⭐</div>
                <div className="trust-text">
                  <strong>4.9/5</strong>
                  <span>Average Rating</span>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon">🏪</div>
                <div className="trust-text">
                  <strong>1000+</strong>
                  <span>Active Stores</span>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon">👥</div>
                <div className="trust-text">
                  <strong>5000+</strong>
                  <span>Happy Users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="features-section">
        <div className="app-container">
          <div className="section-header">
            <div className="section-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              <span>Features</span>
            </div>
            <h2 className="section-title">Why Choose RateHub?</h2>
            <p className="section-subtitle">
              Everything you need to discover, manage, and review local stores in one platform
            </p>
          </div>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon icon-star">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <h3 className="feature-title">Trusted Reviews</h3>
              <p className="feature-description">
                Users submit authentic ratings between 1 and 5 stars. 
                View average ratings and detailed feedback to make informed decisions.
              </p>
              <div className="feature-benefits">
                <div className="benefit-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Simple 5-star system</span>
                </div>
                <div className="benefit-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Real-time rating updates</span>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon icon-lock">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h3 className="feature-title">Role-Based Access</h3>
              <p className="feature-description">
                Tailored experiences for admins, store owners, and customers. 
                Each role has specific features and permissions designed for their needs.
              </p>
              <div className="feature-benefits">
                <div className="benefit-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Admin dashboard control</span>
                </div>
                <div className="benefit-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Owner analytics tracking</span>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon icon-zap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3 className="feature-title">Fast & Secure</h3>
              <p className="feature-description">
                Built on Express and PostgreSQL with JWT authentication. 
                Lightning-fast performance with enterprise-grade security.
              </p>
              <div className="feature-benefits">
                <div className="benefit-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>JWT-based authentication</span>
                </div>
                <div className="benefit-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Encrypted data storage</span>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="feature-card">
              <div className="feature-icon icon-chart">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10"/>
                  <line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              </div>
              <h3 className="feature-title">Analytics & Insights</h3>
              <p className="feature-description">
                Track store performance with detailed analytics. 
                Monitor ratings trends and customer feedback over time.
              </p>
              <div className="feature-benefits">
                <div className="benefit-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Rating trend analysis</span>
                </div>
                <div className="benefit-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Performance metrics</span>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="feature-card">
              <div className="feature-icon icon-users">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="feature-title">User Management</h3>
              <p className="feature-description">
                Comprehensive user and store management system. 
                Admins can add, edit, and monitor all platform activity.
              </p>
              <div className="feature-benefits">
                <div className="benefit-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Easy user onboarding</span>
                </div>
                <div className="benefit-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Store profile management</span>
                </div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="feature-card">
              <div className="feature-icon icon-globe">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3 className="feature-title">Local Discovery</h3>
              <p className="feature-description">
                Find and explore stores in your area. 
                Discover hidden gems based on community ratings and reviews.
              </p>
              <div className="feature-benefits">
                <div className="benefit-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Location-based search</span>
                </div>
                <div className="benefit-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Category filtering</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="cta-section">
        <div className="app-container">
          <div className="cta-card">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Get Started?</h2>
              <p className="cta-subtitle">
                Join thousands of users discovering and rating local stores. 
                Sign up now and start your journey!
              </p>
              <div className="cta-buttons">
                <Link to="/signup" className="btn btn-primary btn-large">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="8.5" cy="7" r="4"/>
                    <line x1="20" y1="8" x2="20" y2="14"/>
                    <line x1="23" y1="11" x2="17" y2="11"/>
                  </svg>
                  Create Free Account
                </Link>
                <Link to="/login" className="btn ghost btn-large btn-white">
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="cta-decoration">
              <div className="decoration-circle circle-1"></div>
              <div className="decoration-circle circle-2"></div>
              <div className="decoration-circle circle-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}