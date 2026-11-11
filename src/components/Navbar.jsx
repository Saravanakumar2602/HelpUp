// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "../styles/navbar.css";

function Navbar() {
  const { user, role, logout, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    showToast("You have been successfully logged out.", "info");
    navigate("/");
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo-link" onClick={closeMobile}>
          <h2 className="logo">
            HelpUp<span className="logo-dot">.</span>
          </h2>
          <span className="logo-tagline">Verified Local Services</span>
        </Link>
      </div>

      {/* Mobile Hamburger Toggle */}
      <button
        className={`mobile-toggle-btn ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Nav Links */}
      <ul className={`nav-links ${mobileMenuOpen ? "nav-links-mobile-open" : ""}`}>
        <li>
          <NavLink to="/" end onClick={closeMobile} className={({ isActive }) => (isActive ? "active" : undefined)}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/services" onClick={closeMobile} className={({ isActive }) => (isActive ? "active" : undefined)}>
            Services
          </NavLink>
        </li>

        <li>
          <NavLink to="/browse" onClick={closeMobile} className={({ isActive }) => (isActive ? "active" : undefined)}>
            Browse Workers
          </NavLink>
        </li>

        {/* Customer Specific Links */}
        {role === "customer" && (
          <li>
            <NavLink to="/my-bookings" onClick={closeMobile} className={({ isActive }) => (isActive ? "active" : undefined)}>
              My Bookings
            </NavLink>
          </li>
        )}

        {/* Worker Specific Links */}
        {role === "worker" && (
          <li>
            <NavLink to="/add-job" onClick={closeMobile} className={({ isActive }) => (isActive ? "active" : undefined)}>
              + Add Job
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to="/about" onClick={closeMobile} className={({ isActive }) => (isActive ? "active" : undefined)}>
            About
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact" onClick={closeMobile} className={({ isActive }) => (isActive ? "active" : undefined)}>
            Contact
          </NavLink>
        </li>

        {/* Auth / Profile Area */}
        {!isAuthenticated ? (
          <li className="auth-nav-item">
            <NavLink to="/login" onClick={closeMobile} className="nav-login-btn">
              Login
            </NavLink>
            <NavLink to="/signup" onClick={closeMobile} className="nav-signup-btn">
              Sign Up
            </NavLink>
          </li>
        ) : (
          <li className="user-profile-nav-item">
            <Link
              to={role === "worker" ? "/worker-profile" : "/customer-profile"}
              onClick={closeMobile}
              className="navbar-user-chip"
              title={role === "worker" ? "Worker Dashboard" : "Customer Profile"}
            >
              <img
                src={
                  user?.img ||
                  (role === "worker"
                    ? "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80"
                    : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80")
                }
                alt={user?.name || "Profile"}
                className="navbar-avatar"
              />
              <div className="navbar-user-text">
                <span className="navbar-user-name">{user?.name ? user.name.split(" ")[0] : "Profile"}</span>
                <span className="navbar-user-role">{role === "worker" ? "Worker" : "Customer"}</span>
              </div>
            </Link>

            <button onClick={handleLogout} className="navbar-logout-btn" title="Sign out">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
