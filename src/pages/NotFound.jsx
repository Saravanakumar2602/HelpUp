// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page" style={{ textAlign: "center", padding: "80px 20px" }}>
      <div style={{ fontSize: "5.5rem", fontWeight: 900, color: "#e11d48", marginBottom: 12, letterSpacing: "-0.04em" }}>
        404
      </div>
      <h1 style={{ fontSize: "2.2rem", fontWeight: 900, marginBottom: 12, color: "#0f172a" }}>
        Page Not Found
      </h1>
      <p style={{ color: "#666", maxWidth: 460, margin: "0 auto 28px auto", fontSize: "1.1rem" }}>
        The page you are looking for might have been moved, renamed, or is temporarily unavailable.
      </p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
        <Link to="/" className="btn btn-primary">
          Back to Homepage
        </Link>
        <Link to="/browse" className="btn btn-outline">
          Browse Workers
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
