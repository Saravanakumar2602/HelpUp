// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllWorkers } from "../services/storageService";
import { ALL_SERVICES } from "../data/servicesData";
import WorkerCard from "../components/WorkerCard";
import {
  ShieldCheckIcon,
  SparklesIcon,
  SearchIcon,
  CheckIcon,
  ArrowRightIcon,
  BoltIcon,
  WrenchIcon,
  BroomIcon,
  HammerIcon,
  BookOpenIcon,
  PaintBrushIcon,
  TreeIcon
} from "../components/Icons";
import "../styles/home.css";

const renderServiceIcon = (name) => {
  switch (name.toLowerCase()) {
    case "electrical": return <BoltIcon size={26} color="#e11d48" />;
    case "plumbing": return <WrenchIcon size={26} color="#e11d48" />;
    case "home cleaning": return <BroomIcon size={26} color="#e11d48" />;
    case "carpentry": return <HammerIcon size={26} color="#e11d48" />;
    case "private tutoring":
    case "tutoring": return <BookOpenIcon size={26} color="#e11d48" />;
    case "painting": return <PaintBrushIcon size={26} color="#e11d48" />;
    case "gardening": return <TreeIcon size={26} color="#e11d48" />;
    default: return <SparklesIcon size={26} color="#e11d48" />;
  }
};

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();
  const [featuredWorkers, setFeaturedWorkers] = useState([]);

  // Search Capsule State
  const [serviceQuery, setServiceQuery] = useState("All");
  const [cityQuery, setCityQuery] = useState("");

  useEffect(() => {
    const workers = getAllWorkers();
    const top = [...workers]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);
    setFeaturedWorkers(top);
  }, []);

  const handleCapsuleSearch = (e) => {
    e.preventDefault();
    navigate("/browse", {
      state: {
        filterService: serviceQuery === "All" ? "" : serviceQuery,
        filterCity: cityQuery
      }
    });
  };

  const handleServiceClick = (serviceName) => {
    navigate("/browse", { state: { filterService: serviceName } });
  };

  return (
    <div className="page home-page">
      {/* --- Asymmetric Split Hero Section --- */}
      <section className="home-hero-split">
        <div className="home-hero-left">
          <span className="home-pill-tag">
            <SparklesIcon size={14} color="#ff385c" />
            Direct Trade Marketplace
          </span>

          <h1>
            Verified Local Tradespeople with <span className="coral-accent">Transparent Rates</span>
          </h1>

          <p>
            Directly book background-verified plumbers, electricians, cleaners, and tutors. Zero middleman fees, upfront hourly pricing, and direct phone contact.
          </p>

          {/* Functional Search Capsule */}
          <form className="hero-search-box" onSubmit={handleCapsuleSearch}>
            <select
              className="hero-search-select"
              value={serviceQuery}
              onChange={e => setServiceQuery(e.target.value)}
            >
              <option value="All">All Services</option>
              {ALL_SERVICES.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>

            <div className="hero-search-divider" />

            <input
              type="text"
              className="hero-search-input"
              placeholder="City or Area (e.g. Chennai, Bangalore, Salem)"
              value={cityQuery}
              onChange={e => setCityQuery(e.target.value)}
            />

            <button type="submit" className="hero-search-submit">
              <SearchIcon size={16} color="#ffffff" />
              <span>Find Pros</span>
            </button>
          </form>

          {/* Trust Value Checks */}
          <div className="hero-trust-row">
            <div className="hero-trust-item">
              <CheckIcon size={14} color="#10b981" />
              <span>Government ID Vetted</span>
            </div>
            <div className="hero-trust-item">
              <CheckIcon size={14} color="#10b981" />
              <span>0% Platform Commission</span>
            </div>
            <div className="hero-trust-item">
              <CheckIcon size={14} color="#10b981" />
              <span>Pay After Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Live Showcase Card */}
        <div className="home-hero-right">
          <div className="hero-visual-card">
            <img
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
              alt="Certified trade professional working"
              className="hero-visual-img"
            />
            <div className="hero-floating-pill">
              <ShieldCheckIcon size={16} color="#10b981" />
              <span>Verified Trade Community</span>
            </div>
            <div className="hero-floating-bottom-card">
              <div className="bottom-card-stat">
                <strong>100% Direct Rates</strong>
                <span>Zero Agency Markup</span>
              </div>
              <div className="bottom-card-stat" style={{ textAlign: "right" }}>
                <strong>Direct Contact</strong>
                <span>Phone & WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Live Registered Specialists Spotlight (Only if real users exist) --- */}
      {featuredWorkers.length > 0 && (
        <section style={{ marginBottom: 64 }}>
          <div className="section-header-row">
            <div>
              <h2>Top Rated Local Specialists</h2>
              <p className="section-subtext">Verified service professionals available for booking today.</p>
            </div>
            <Link to="/browse" className="link-see-all">
              <span>View All Specialists</span>
              <ArrowRightIcon size={15} color="#e11d48" />
            </Link>
          </div>

          <div className="services-list" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
            {featuredWorkers.map(w => (
              <WorkerCard key={w.id} worker={w} />
            ))}
          </div>
        </section>
      )}

      {/* --- Trade Categories Grid (SVG Vector Icons, NO clip-art) --- */}
      <section className="trade-categories-section">
        <div className="section-header-row">
          <div>
            <h2>Popular Trade Categories</h2>
            <p className="section-subtext">Click any service to browse specialists available in your area.</p>
          </div>
          <Link to="/services" className="link-see-all">
            <span>Explore All Categories</span>
            <ArrowRightIcon size={15} color="#e11d48" />
          </Link>
        </div>

        <div className="categories-grid">
          {ALL_SERVICES.map((s) => (
            <div
              className="category-card"
              key={s.id}
              onClick={() => handleServiceClick(s.name)}
            >
              <div className="category-icon-box">
                {renderServiceIcon(s.name)}
              </div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <div className="category-card-footer">
                <span className="rate-badge">Direct Hourly Pricing</span>
                <span className="explore-text">
                  <span>Browse Pros</span>
                  <ArrowRightIcon size={13} color="#475569" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3-Step Simple Process --- */}
      <section className="process-section">
        <div className="process-header">
          <h2>How HelpUp Works</h2>
          <p>Transparent, fast, and dignified household services in three steps.</p>
        </div>

        <div className="process-grid">
          <div className="process-step-card">
            <div className="process-number">1</div>
            <h3>Select Your Specialist</h3>
            <p>Browse verified technician profiles, review transparent hourly rates, and check authentic ratings.</p>
          </div>

          <div className="process-step-card">
            <div className="process-number">2</div>
            <h3>Book Your Slot</h3>
            <p>Pick a date and convenient time slot with zero upfront fees or hidden platform surcharges.</p>
          </div>

          <div className="process-step-card">
            <div className="process-number">3</div>
            <h3>Inspect & Pay Directly</h3>
            <p>Your pro arrives on schedule. Inspect the completed work and pay the pro directly upon satisfaction.</p>
          </div>
        </div>
      </section>

      {/* --- Dual Audience Callout Section --- */}
      <section className="dual-callout-grid">
        <div className="audience-card for-customers">
          <div>
            <span style={{ color: "#e11d48", fontWeight: 800, textTransform: "uppercase", fontSize: "0.82rem", letterSpacing: "1px" }}>
              For Households & Homeowners
            </span>
            <h3>Need a Certified Specialist?</h3>
            <p>
              Connect with vetted plumbers, electricians, cleaners, and tutors ready to assist with household tasks today.
            </p>
          </div>
          <Link to="/browse" className="btn btn-primary" style={{ alignSelf: "flex-start", padding: "12px 28px" }}>
            Browse Available Specialists
          </Link>
        </div>

        <div className="audience-card for-workers">
          <div>
            <span style={{ color: "#fb7185", fontWeight: 800, textTransform: "uppercase", fontSize: "0.82rem", letterSpacing: "1px" }}>
              For Independent Trade Professionals
            </span>
            <h3>Grow Your Trade Practice</h3>
            <p>
              Set your own hourly rates, receive direct client bookings without commission deductions, and build your verified reputation.
            </p>
          </div>
          <Link to="/signup" className="btn btn-primary" style={{ alignSelf: "flex-start", padding: "12px 28px" }}>
            Register as a Pro Partner
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
