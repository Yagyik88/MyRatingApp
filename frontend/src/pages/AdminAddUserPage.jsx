import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function AdminAddUserPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "normal",
  });
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Check password strength
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return { label: "", color: "" };
    if (passwordStrength === 1) return { label: "Weak", color: "#ef4444" };
    if (passwordStrength === 2) return { label: "Fair", color: "#f59e0b" };
    if (passwordStrength === 3) return { label: "Good", color: "#10b981" };
    return { label: "Strong", color: "#10b981" };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Creating user account...");
    setMsgType("loading");
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(`${API}/admin/add-user`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMsg("User added successfully!");
      setMsgType("success");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/admin/users");
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to add user";
      setMsg(errorMsg);
      setMsgType("error");
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      address: "",
      password: "",
      role: "normal",
    });
    setMsg("");
    setMsgType("");
    setPasswordStrength(0);
  };

  const strengthInfo = getPasswordStrengthLabel();

  const getRoleInfo = (role) => {
    switch (role) {
      case "admin":
        return {
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          ),
          description: "Full platform access and management capabilities"
        };
      case "store_owner":
        return {
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
          ),
          description: "Can view and manage their store's ratings"
        };
      case "normal":
        return {
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          ),
          description: "Can browse and rate stores"
        };
      default:
        return { icon: null, description: "" };
    }
  };

  const roleInfo = getRoleInfo(form.role);

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
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
              </svg>
              Add New User
            </h1>
            <p className="page-subtitle">
              Create a new user account with specified role and permissions
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="form-card-container">
          <div className="form-card">
            <form className="auth-form" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="form-group">
                <label className="form-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  minLength="20"
                  maxLength="60"
                />
                <p className="form-hint">Name must be between 20-60 characters</p>
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label className="form-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="user@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Address Field */}
              <div className="form-group">
                <label className="form-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Address
                  <span className="optional-badge">Optional</span>
                </label>
                <textarea
                  name="address"
                  className="form-input form-textarea"
                  placeholder="123 Main Street, City, Country"
                  value={form.address}
                  onChange={handleChange}
                  rows="3"
                  disabled={isSubmitting}
                />
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label className="form-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Password
                </label>
                <div className="input-wrapper input-with-action">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-input"
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    minLength="8"
                    maxLength="16"
                  />
                  <button
                    type="button"
                    className="input-action-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {form.password && (
                  <div className="password-strength">
                    <div className="strength-bars">
                      <div className={`strength-bar ${passwordStrength >= 1 ? 'active' : ''}`} style={{ background: strengthInfo.color }}></div>
                      <div className={`strength-bar ${passwordStrength >= 2 ? 'active' : ''}`} style={{ background: strengthInfo.color }}></div>
                      <div className={`strength-bar ${passwordStrength >= 3 ? 'active' : ''}`} style={{ background: strengthInfo.color }}></div>
                      <div className={`strength-bar ${passwordStrength >= 4 ? 'active' : ''}`} style={{ background: strengthInfo.color }}></div>
                    </div>
                    {strengthInfo.label && (
                      <span className="strength-label" style={{ color: strengthInfo.color }}>
                        {strengthInfo.label}
                      </span>
                    )}
                  </div>
                )}

                <p className="form-hint">
                  8-16 characters with uppercase letters and special characters
                </p>
              </div>

              {/* Role Field */}
              <div className="form-group">
                <label className="form-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  User Role
                </label>
                <select
                  name="role"
                  className="form-input"
                  value={form.role}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="normal">Normal User</option>
                  <option value="store_owner">Store Owner</option>
                  <option value="admin">Admin</option>
                </select>

                <div className="role-info-card">
                  <div className="role-info-icon">{roleInfo.icon}</div>
                  <p className="role-info-text">{roleInfo.description}</p>
                </div>
              </div>

              {/* Message Display */}
              {msg && (
                <div className={`form-message message-${msgType}`}>
                  <div className="message-icon">
                    {msgType === "loading" && <div className="spinner-small"></div>}
                    {msgType === "success" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                    {msgType === "error" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                    )}
                  </div>
                  <span>{msg}</span>
                </div>
              )}

              {/* Form Actions */}
              <div className="form-actions">
                <button 
                  className="btn btn-primary btn-block" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner-small"></div>
                      Creating User...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="8.5" cy="7" r="4"/>
                        <line x1="20" y1="8" x2="20" y2="14"/>
                        <line x1="23" y1="11" x2="17" y2="11"/>
                      </svg>
                      Add User
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="btn ghost btn-block"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="1 4 1 10 7 10"/>
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                  </svg>
                  Reset Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}