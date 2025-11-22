import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="auth-page">
      {/* Decorative Background */}
      <div className="auth-background">
        <div className="auth-shape shape-1"></div>
        <div className="auth-shape shape-2"></div>
        <div className="auth-shape shape-3"></div>
      </div>

      <div className={`auth-container ${isVisible ? 'visible' : ''}`}>
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <Link to="/" className="auth-logo-link">
            <div className="auth-logo">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                      fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="auth-logo-text">RateHub</span>
          </Link>

          <div className="auth-branding-content">
            <h1 className="auth-branding-title">
              Welcome Back to RateHub
            </h1>
            <p className="auth-branding-subtitle">
              Sign in to discover and rate local stores, track your reviews, 
              and connect with the community.
            </p>

            {/* Features List */}
            <div className="auth-features">
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span>Access your personalized dashboard</span>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span>Rate and review stores instantly</span>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span>Track your review history</span>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="auth-testimonial">
            <div className="testimonial-quote">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>
            </div>
            <p className="testimonial-text">
              "RateHub has transformed how I discover and choose local businesses. 
              The ratings are trustworthy and the interface is incredibly intuitive."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">JD</div>
              <div className="author-info">
                <div className="author-name">John Doe</div>
                <div className="author-role">Active User</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="auth-form-container">
          <div className="auth-card">
            {/* Header */}
            <div className="auth-header">
              <h2 className="auth-title">Sign In</h2>
              <p className="auth-subtitle">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Login Form */}
            <LoginForm />

            {/* Footer */}
            <div className="auth-footer">
              <div className="auth-divider">
                <span>or</span>
              </div>

              <p className="auth-footer-text">
                Don't have an account?{" "}
                <Link to="/signup" className="auth-link">
                  Create one now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </p>

              <Link to="/" className="auth-back-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12"/>
                  <polyline points="12 19 5 12 12 5"/>
                </svg>
                Back to Home
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="auth-trust-badges">
            <div className="trust-badge-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Secure Login</span>
            </div>
            <div className="trust-badge-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Data Protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}