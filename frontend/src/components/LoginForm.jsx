import { useState, useEffect } from "react";
import { loginUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // 'success', 'error', 'loading'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "store_owner") navigate("/owner/dashboard");
    else if (role === "normal") navigate("/user/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Processing...");
    setMsgType("loading");
    setIsLoading(true);

    try {
      const res = await loginUser(form);
      const { token, user } = res.data;

      const role = user.role;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setMsg("Login successful! Redirecting...");
      setMsgType("success");

      // Delay navigation for better UX
      setTimeout(() => {
        if (role === "admin") navigate("/admin/dashboard");
        else if (role === "store_owner") navigate("/owner/dashboard");
        else navigate("/user/dashboard");
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      setMsg(
        err.response?.data?.message || "Login failed. Please try again."
      );
      setMsgType("error");
    }
  };

  const handleReset = () => {
    setForm({ email: "", password: "" });
    setMsg("");
    setMsgType("");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
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
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
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
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
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
      </div>

      {/* Forgot Password Link */}
      <div className="form-extra">
        <button type="button" className="forgot-password-link">
          Forgot password?
        </button>
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
              Signing In...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Sign In
            </>
          )}
        </button>
        
        <button
          type="button"
          className="btn ghost btn-block"
          onClick={handleReset}
          disabled={isLoading}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          Clear Form
        </button>
      </div>

      {/* Demo Credentials (Remove in production) */}
      <div className="demo-credentials">
        <div className="demo-header">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <span>Demo Credentials</span>
        </div>
        <div className="demo-list">
          <div className="demo-item">
            <strong>Admin:</strong> admin@example.com
          </div>
          <div className="demo-item">
            <strong>Owner:</strong> owner@example.com
          </div>
          <div className="demo-item">
            <strong>User:</strong> user@example.com
          </div>
        </div>
      </div>
    </form>
  );
}