import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Update whenever location changes (user logs in, logs out, navigates)
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    setMobileMenuOpen(false); // Close menu on navigation
  }, [location]);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand */}
        <Link to="/" className="brand">
          <div className="brand-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                    fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="brand-text">
            <div className="brand-title">RateHub</div>
            <div className="brand-sub">Trusted Store Reviews</div>
          </div>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Navigation Items */}
        <div className={`nav-items ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {/* USER NOT LOGGED IN */}
          {!role && (
            <>
              <Link 
                className={`nav-link secondary ${isActive('/login') ? 'active' : ''}`} 
                to="/login"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/>
                </svg>
                Login
              </Link>
              <Link 
                className={`nav-link ${isActive('/signup') ? 'active' : ''}`} 
                to="/signup"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <line x1="20" y1="8" x2="20" y2="14"/>
                  <line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
                Sign Up
              </Link>
            </>
          )}

          {/* ADMIN MENU */}
          {role === "admin" && (
            <>
              <Link 
                className={`nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`} 
                to="/admin/dashboard"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
                Dashboard
              </Link>
              <Link 
                className={`nav-link secondary ${isActive('/admin/users') ? 'active' : ''}`} 
                to="/admin/users"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Users
              </Link>
              <Link 
                className={`nav-link secondary ${isActive('/admin/stores') ? 'active' : ''}`} 
                to="/admin/stores"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Stores
              </Link>
              <Link 
                className={`nav-link secondary ${isActive('/admin/add-user') ? 'active' : ''}`} 
                to="/admin/add-user"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <line x1="20" y1="8" x2="20" y2="14"/>
                  <line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
                Add User
              </Link>
              <Link 
                className={`nav-link secondary ${isActive('/admin/add-store') ? 'active' : ''}`} 
                to="/admin/add-store"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <line x1="12" y1="12" x2="12" y2="18"/>
                  <line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
                Add Store
              </Link>
              <div className="nav-divider"></div>
              <button className="btn btn-logout" onClick={logout}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </>
          )}

          {/* STORE OWNER MENU */}
          {role === "store_owner" && (
            <>
              <Link 
                className={`nav-link ${isActive('/owner/dashboard') ? 'active' : ''}`} 
                to="/owner/dashboard"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
                Dashboard
              </Link>
              <div className="nav-divider"></div>
              <button className="btn btn-logout" onClick={logout}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </>
          )}

          {/* NORMAL USER MENU */}
          {role === "normal" && (
            <>
              <Link 
                className={`nav-link ${isActive('/user/dashboard') ? 'active' : ''}`} 
                to="/user/dashboard"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
                Dashboard
              </Link>
              <div className="nav-divider"></div>
              <button className="btn btn-logout" onClick={logout}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}