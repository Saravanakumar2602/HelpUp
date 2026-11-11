// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-modern">
      <div className="footer-content">
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <h2 className="logo">
              HelpUp<span className="logo-dot">.</span>
            </h2>
            <span className="footer-tagline">Verified Local Services Marketplace</span>
          </div>
          <p className="footer-desc">
            Empowering communities across South India by effortlessly connecting skilled local workers with households in need of everyday, reliable home services.
          </p>
          <div className="footer-trust-pills">
            <span>🛡️ Verified Workers</span>
            <span>⚡ Same-Day Service</span>
            <span>💳 Direct Hourly Pay</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">All Services</Link></li>
            <li><Link to="/browse">Browse Workers</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Help & Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Top Services</h4>
          <ul>
            <li><Link to="/browse" state={{ filterService: "Plumbing" }}>Plumbing Services</Link></li>
            <li><Link to="/browse" state={{ filterService: "Electrical" }}>Certified Electricians</Link></li>
            <li><Link to="/browse" state={{ filterService: "Home Cleaning" }}>Deep Home Cleaning</Link></li>
            <li><Link to="/browse" state={{ filterService: "Carpentry" }}>Carpentry & Woodwork</Link></li>
            <li><Link to="/browse" state={{ filterService: "Tutoring" }}>Home & Online Tutors</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Join HelpUp</h4>
          <p style={{ fontSize: "0.95rem", color: "#666", marginBottom: 12 }}>
            Are you an experienced electrician, plumber, cleaner, or technician?
          </p>
          <Link to="/signup" className="btn btn-sm btn-primary" style={{ display: "inline-block" }}>
            Register as a Worker
          </Link>
          <div className="footer-contact-brief" style={{ marginTop: 16 }}>
            <p>📞 Helpline: +91 98765 43210</p>
            <p>📧 Email: support@helpup.com</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} HelpUp Technologies Pvt. Ltd. All rights reserved.</p>
        <div className="footer-bottom-links">
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Terms of Service</span>
          <span>•</span>
          <span>Trust & Safety</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
