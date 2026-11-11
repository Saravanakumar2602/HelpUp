// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { SparklesIcon, MailIcon, ArrowRightIcon } from "../components/Icons";
import "../styles/forms.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || location.state?.returnTo;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const result = login(email, password);
    setSubmitting(false);

    if (!result.success) {
      showToast(result.message || "Invalid credentials. Please verify your email and password.", "error");
      return;
    }

    showToast(result.message, "success");

    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    } else if (result.user.role === "worker") {
      navigate("/worker-profile", { replace: true });
    } else {
      navigate("/browse", { replace: true });
    }
  };

  return (
    <div className="page auth-page">
      <div className="form-card-container">
        <span className="signup-pill-tag">
          <SparklesIcon size={14} color="#ff385c" />
          Welcome Back to HelpUp
        </span>

        <h1>
          Sign In to Your <span className="coral-accent">Account</span>
        </h1>
        <p className="form-subtitle">
          Manage your service appointments, communicate with specialists, and access your verified profile.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>
              <MailIcon size={14} color="#e11d48" />
              Email Address *
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-field">
            <label>Password *</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: "14px", fontSize: "1.05rem", marginTop: 6 }}
            disabled={submitting}
          >
            {submitting ? "Signing in..." : "Sign In to HelpUp"}
          </button>

          <div className="auth-bottom-links">
            <span>New to HelpUp? </span>
            <Link to="/signup">Create a Free Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
