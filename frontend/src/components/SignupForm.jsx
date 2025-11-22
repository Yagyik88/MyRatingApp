import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "", 
    email: "", 
    address: "", 
    password: ""
  });
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // 'success', 'error', 'loading'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
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
    setMsg("Creating your account...");
    setMsgType("loading");
    setIsLoading(true);

    try {
      await axios.post(`${API}/users/signup`, formData);
      setMsg("Account created successfully! Redirecting to login...");
      setMsgType("success");
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setIsLoading(false);
      setMsg(
        err.response?.data?.message || "Signup failed. Please try again."
      );
      setMsgType("error");
    }
  };

  const handleClear = () => {
    setFormData({ name: "", email: "", address: "", password: "" });
    setMsg("");
    setMsgType("");
    setPasswordStrength(0);
  };

  const strengthInfo = getPasswordStrengthLabel();

  return (
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
        <div className="input-wrapper">
          <input
            className="form-input"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            disabled={isLoading}
          />
        </div>
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
        <div className="input-wrapper">
          <input
            className="form-input"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            disabled={isLoading}
          />
        </div>
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
        <div className="input-wrapper">
          <textarea
            className="form-input form-textarea"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main Street, City, Country"
            rows="3"
            disabled={isLoading}
          />
        </div>
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
            className="form-input"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            required
            disabled={isLoading}
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
        {formData.password && (
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
          Use 8+ characters with a mix of letters, numbers & symbols
        </p>
      </div>

      {/* Message Display */}
      {msg && (
        <div className={`form-message message-${msgType}`}>
          <div className="message-icon">
            {msgType === "loading" && (
              <div className="spinner-small"></div>
            )}
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
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="spinner-small"></div>
              Creating Account...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
              </svg>
              Create Account
            </>
          )}
        </button>
        
        <button
          type="button"
          className="btn ghost btn-block"
          onClick={handleClear}
          disabled={isLoading}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          Clear Form
        </button>
      </div>

      {/* Terms Notice */}
      <div className="terms-notice">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <p>
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </form>
  );
}