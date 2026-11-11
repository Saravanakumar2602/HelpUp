// src/pages/Services.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ALL_SERVICES } from "../data/servicesData";
import { useAuth } from "../context/AuthContext";
import {
  SearchIcon,
  ArrowRightIcon,
  SparklesIcon,
  BoltIcon,
  WrenchIcon,
  BroomIcon,
  HammerIcon,
  BookOpenIcon,
  PaintBrushIcon,
  TreeIcon
} from "../components/Icons";

const renderServiceIcon = (name) => {
  switch (name.toLowerCase()) {
    case "electrical": return <BoltIcon size={28} color="#e11d48" />;
    case "plumbing": return <WrenchIcon size={28} color="#e11d48" />;
    case "home cleaning": return <BroomIcon size={28} color="#e11d48" />;
    case "carpentry": return <HammerIcon size={28} color="#e11d48" />;
    case "private tutoring":
    case "tutoring": return <BookOpenIcon size={28} color="#e11d48" />;
    case "painting": return <PaintBrushIcon size={28} color="#e11d48" />;
    case "gardening": return <TreeIcon size={28} color="#e11d48" />;
    default: return <SparklesIcon size={28} color="#e11d48" />;
  }
};

function Services() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { role } = useAuth();

  const filtered = ALL_SERVICES.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.desc.toLowerCase().includes(search.toLowerCase())
  );

  const handleServiceClick = (serviceName) => {
    navigate("/browse", { state: { filterService: serviceName } });
  };

  return (
    <div className="page services-page">
      <div className="services-hero-header" style={{ textAlign: "center", marginBottom: 44 }}>
        <span className="hero-pill-tag">
          <SparklesIcon size={14} color="#ff385c" />
          Verified Local Trade Specializations
        </span>
        <h1 style={{ fontSize: "2.8rem", margin: "10px 0 12px 0", color: "#0f172a", fontWeight: 900, letterSpacing: "-0.04em" }}>
          Everyday Household Services
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.15rem", maxWidth: 660, margin: "0 auto 32px auto", lineHeight: 1.6 }}>
          From urgent plumbing and electrical rewiring to deep home sanitization and private tutoring, hire certified professionals in your neighborhood.
        </p>

        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div className="browse-search-wrapper" style={{ background: "#ffffff", border: "1.5px solid #e2e8f0" }}>
            <span className="search-icon">
              <SearchIcon size={18} color="#ff385c" />
            </span>
            <input
              className="browse-search"
              type="text"
              placeholder="Search services (e.g. Carpentry, Tutoring)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="clear-search-btn" onClick={() => setSearch("")}>×</button>
            )}
          </div>
        </div>
      </div>

      <div className="services-list" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
        {filtered.map((s) => (
          <div
            className="service-card"
            key={s.id}
            style={{ cursor: "pointer" }}
            onClick={() => handleServiceClick(s.name)}
            title={`Browse certified workers for ${s.name}`}
          >
            <div style={{
              width: 62,
              height: 62,
              borderRadius: 18,
              background: "rgba(255, 56, 92, 0.08)",
              border: "1.5px solid rgba(225, 29, 72, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16
            }}>
              {renderServiceIcon(s.name)}
            </div>
            <h3>{s.name}</h3>
            <p>{s.desc}</p>
            {s.popular && <span className="featured-badge">Top Service</span>}
            <div className="service-card-action">
              <span>View Available Workers</span>
              <ArrowRightIcon size={14} color="#e11d48" />
            </div>
          </div>
        ))}
      </div>

      <div className="quick-signup" style={{ marginTop: 64 }}>
        <h2>Are You a Certified Professional?</h2>
        <p style={{ maxWidth: 540, marginBottom: 24, color: "#cbd5e1" }}>
          Expand your client bookings, set your own transparent hourly rates, and connect directly with local households.
        </p>
        <Link to={role === "worker" ? "/add-job" : "/signup"} className="btn btn-primary" style={{ padding: "14px 32px" }}>
          {role === "worker" ? "+ Post a Service Offering" : "Register as a Pro Partner"}
        </Link>
      </div>
    </div>
  );
}

export default Services;
