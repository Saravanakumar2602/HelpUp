// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { ALL_SERVICES } from "../data/servicesData";
import {
  SparklesIcon,
  ShieldCheckIcon,
  ZapIcon,
  StarIcon,
  CheckIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon
} from "../components/Icons";
import "../styles/forms.css";

function Signup() {
  const [role, setRole] = useState("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  // Worker specific fields
  const [service, setService] = useState("Electrical");
  const [title, setTitle] = useState("");
  const [rate, setRate] = useState(350);
  const [experience, setExperience] = useState("3+ years");

  const [submitting, setSubmitting] = useState(false);

  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      showToast("Please fill in all required fields.", "warning");
      return;
    }

    if (password.length < 6) {
      showToast("Password must be at least 6 characters long.", "warning");
      return;
    }

    setSubmitting(true);

    const formData = {
      role,
      name,
      email,
      password,
      phone,
      location: location || "Chennai",
      ...(role === "worker" && {
        service,
        title: title || `${service} Specialist`,
        rate: Number(rate) || 300,
        experience
      })
    };

    const result = signup(formData);
    setSubmitting(false);

    if (!result.success) {
      showToast(result.message || "Signup failed.", "error");
      return;
    }

    showToast(result.message, "success");

    if (role === "worker") {
      navigate("/worker-profile");
    } else {
      navigate("/browse");
    }
  };

  return (
    <div className="page auth-page">
      <div className="signup-split-layout">
        {/* Left Column: Brand & Trust Showcase */}
        <div className="signup-brand-column">
          <span className="signup-pill-tag">
            <SparklesIcon size={14} color="#ff385c" />
            Verified Household Community
          </span>

          <h1>
            Join the Local Marketplace for <span className="coral-accent">Verified Skilled Trades</span>
          </h1>

          <p className="signup-brand-sub">
            Whether you want to hire a punctual electrician or grow your independent trade practice, HelpUp gives you direct connection, transparent hourly rates, and zero hidden platform cuts.
          </p>

          <div className="signup-value-props">
            <div className="signup-prop-item">
              <div className="signup-prop-icon">
                <ShieldCheckIcon size={22} color="#e11d48" />
              </div>
              <div className="signup-prop-text">
                <strong>Government ID Vetted Community</strong>
                <p>Every service partner undergoes identity check and real client review auditing.</p>
              </div>
            </div>

            <div className="signup-prop-item">
              <div className="signup-prop-icon">
                <ZapIcon size={22} color="#e11d48" />
              </div>
              <div className="signup-prop-text">
                <strong>Transparent Direct Rates</strong>
                <p>Know exact hourly pricing upfront with zero advance deposits or mystery markups.</p>
              </div>
            </div>

            <div className="signup-prop-item">
              <div className="signup-prop-icon">
                <SparklesIcon size={22} color="#e11d48" />
              </div>
              <div className="signup-prop-text">
                <strong>Instant Slot Confirmation</strong>
                <p>Direct phone & WhatsApp contact with prompt arrival coordination.</p>
              </div>
            </div>
          </div>

          {/* Community Trust Guarantees */}
          <div className="signup-guarantee-card" style={{ background: "#f8fafc", borderRadius: 20, padding: 22, border: "1.5px solid #e2e8f0" }}>
            <h4 style={{ margin: "0 0 10px 0", fontSize: "1rem", color: "#0f172a", fontWeight: 800 }}>
              Platform Guarantees for All Users
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.92rem", color: "#475569" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CheckIcon size={14} color="#10b981" />
                <span>Zero advance booking fees or hidden charges</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CheckIcon size={14} color="#10b981" />
                <span>Direct phone & WhatsApp coordination with your specialist</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CheckIcon size={14} color="#10b981" />
                <span>Pay only after work is inspected and satisfactorily completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Registration Card */}
        <div className="signup-card">
          <div className="signup-card-header">
            <h2>Create Your Account</h2>
            <p>Select your account type below to get started in less than a minute.</p>
          </div>

          {/* Visual Role Selection Cards */}
          <div className="visual-role-selector">
            <div
              className={`visual-role-card ${role === "customer" ? "active" : ""}`}
              onClick={() => setRole("customer")}
              role="button"
              tabIndex={0}
            >
              <div className="role-card-badge">
                <span className="role-card-icon">🏡</span>
                <div className="role-card-check">
                  {role === "customer" && <CheckIcon size={12} color="#ffffff" />}
                </div>
              </div>
              <div className="role-card-title">Hire Services</div>
              <div className="role-card-desc">For households looking to book plumbers, cleaners, and tutors.</div>
            </div>

            <div
              className={`visual-role-card ${role === "worker" ? "active" : ""}`}
              onClick={() => setRole("worker")}
              role="button"
              tabIndex={0}
            >
              <div className="role-card-badge">
                <span className="role-card-icon">🛠️</span>
                <div className="role-card-check">
                  {role === "worker" && <CheckIcon size={12} color="#ffffff" />}
                </div>
              </div>
              <div className="role-card-title">Offer Services</div>
              <div className="role-card-desc">For trade specialists wanting direct client bookings & fair rates.</div>
            </div>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Anand Sharma"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label>
                  <LocationIcon size={14} color="#e11d48" />
                  City / Location *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chennai, Bangalore, Salem"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
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
                />
              </div>

              <div className="form-field">
                <label>
                  <PhoneIcon size={14} color="#e11d48" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Password * (min. 6 characters)</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Worker-Specific Onboarding Container */}
            {role === "worker" && (
              <div className="worker-additional-box">
                <div className="worker-box-header">
                  <span>🛠️ Trade Partner Professional Details</span>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Primary Trade Category *</label>
                    <select value={service} onChange={e => setService(e.target.value)}>
                      {ALL_SERVICES.map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Hourly Rate (₹) *</label>
                    <input
                      type="number"
                      min="50"
                      placeholder="350"
                      value={rate}
                      onChange={e => setRate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Professional Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Licensed Wireman & Panel Expert"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-field">
                    <label>Years of Experience</label>
                    <input
                      type="text"
                      placeholder="e.g. 5+ years"
                      value={experience}
                      onChange={e => setExperience(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: "14px", fontSize: "1.05rem", marginTop: 6 }}
              disabled={submitting}
            >
              {submitting
                ? "Creating Your Account..."
                : role === "worker"
                ? "Register as a Pro Partner"
                : "Create Customer Account"}
            </button>

            <div className="auth-bottom-links">
              <span>Already registered on HelpUp? </span>
              <Link to="/login">Sign In to Your Account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
