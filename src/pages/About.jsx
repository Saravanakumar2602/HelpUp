// src/pages/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  SparklesIcon,
  ShieldCheckIcon,
  ZapIcon,
  AwardIcon,
  UsersIcon,
  ArrowRightIcon
} from "../components/Icons";
import "../styles/about.css";

function About() {
  return (
    <div className="page about-page">
      {/* --- Editorial Hero --- */}
      <section className="about-hero">
        <span className="about-pill-tag">
          <SparklesIcon size={14} color="#ff385c" />
          Our Mission & Philosophy
        </span>

        <h1>
          Building Dignity & Transparency in <span className="coral-accent">Local Household Trades</span>
        </h1>

        <p className="about-hero-sub">
          HelpUp is transforming informal trade labor into a respected, transparent, and verified digital marketplace. We connect conscious households directly with certified trade specialists—cutting out exploitative agency middlemen.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/browse" className="btn btn-primary" style={{ padding: "14px 32px" }}>
            Explore Verified Specialists
            <ArrowRightIcon size={16} color="#ffffff" />
          </Link>
          <Link to="/signup" className="btn btn-outline" style={{ padding: "14px 28px" }}>
            Join as a Pro Partner
          </Link>
        </div>
      </section>

      {/* --- Value Proposition Highlights --- */}
      <section className="about-stats-grid">
        <div className="about-stat-card">
          <div className="about-stat-number">100%</div>
          <div className="about-stat-label">Direct Hourly Rates</div>
          <div className="about-stat-desc">Zero platform commissions deducted from worker earnings.</div>
        </div>

        <div className="about-stat-card">
          <div className="about-stat-number">₹0</div>
          <div className="about-stat-label">Zero Upfront Fee</div>
          <div className="about-stat-desc">Pay directly only after task is inspected and satisfactorily done.</div>
        </div>

        <div className="about-stat-card">
          <div className="about-stat-number">1:1</div>
          <div className="about-stat-label">Direct Contact</div>
          <div className="about-stat-desc">Connect directly via phone & WhatsApp with zero agency masking.</div>
        </div>

        <div className="about-stat-card">
          <div className="about-stat-number">100%</div>
          <div className="about-stat-label">Verified Accounts</div>
          <div className="about-stat-desc">Every trade specialist is required to provide authentic identification.</div>
        </div>
      </section>

      {/* --- Visual Narrative: The Broken Way vs The HelpUp Standard --- */}
      <section className="about-story-section">
        <div className="story-content">
          <span style={{ color: "#e11d48", fontWeight: 800, textTransform: "uppercase", fontSize: "0.84rem", letterSpacing: "1px" }}>
            Why We Built HelpUp
          </span>
          <h2>The Traditional Service Market Was Broken</h2>
          <p>
            For decades, finding reliable household help meant gambling on unvetted contacts, arbitrary overpricing, and unpredictable delays. Worse, existing aggregators charge technicians up to 30% commission, leaving skilled trade workers underpaid and unappreciated.
          </p>
          <p>
            We created <strong>HelpUp</strong> with a clear standard: complete hourly rate transparency, rigorous ID vetting, and zero platform cuts from tradespeople.
          </p>

          <div className="comparison-matrix">
            <div className="comparison-row old-way">
              <span>✕ Traditional Opaque Model</span>
              <span>Arbitrary pricing, 25-30% agency cuts, unvetted strangers</span>
            </div>
            <div className="comparison-row helpup-way">
              <span>✓ The HelpUp Standard</span>
              <span>100% direct hourly rate, verified government ID, instant slots</span>
            </div>
          </div>
        </div>

        <div className="story-visual-card">
          <img
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
            alt="Skilled electrician working"
            className="story-img"
          />
          <div className="story-floating-badge">
            <div>
              <div className="badge-text-title">Authentic Local Trade Marketplace</div>
              <div className="badge-text-sub">Plumbing, Electrical, Cleaning, Tutoring, Carpentry & Painting</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Four Foundational Pillars --- */}
      <section className="pillars-section">
        <div className="pillars-header">
          <h2>Our Core Principles</h2>
          <p>The four commitments that guide every feature we build.</p>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon-box">
              <AwardIcon size={26} color="#e11d48" />
            </div>
            <h3>Economic Dignity</h3>
            <p>
              Trade workers are skilled professionals. On HelpUp, specialists define their own hourly rates and keep 100% of their earnings directly from the customer.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <ZapIcon size={26} color="#e11d48" />
            </div>
            <h3>Radical Transparency</h3>
            <p>
              No hidden surge pricing or surprise inspection charges. Hourly rates are shown openly on every pro's card before you book an appointment.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <ShieldCheckIcon size={26} color="#e11d48" />
            </div>
            <h3>Safety & Background Vetting</h3>
            <p>
              Every trade partner undergoes identity authentication, phone verification, and continuous client review monitoring before accepting bookings.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <UsersIcon size={26} color="#e11d48" />
            </div>
            <h3>Hyper-Local Community</h3>
            <p>
              Keep your home improvement spending within your local neighborhood. Support local family-owned trades and independent technicians.
            </p>
          </div>
        </div>
      </section>

      {/* --- Safety & Verification Pledge Banner --- */}
      <div className="about-pledge-card">
        <div className="pledge-icon-wrap">
          <ShieldCheckIcon size={38} color="#10b981" />
        </div>
        <div className="pledge-content">
          <h3>The HelpUp Craftsmanship Guarantee</h3>
          <p>
            If any service professional does not arrive on time or fails to complete the agreed work according to safety standards, our support team steps in immediately with free rescheduling or a direct resolution.
          </p>
        </div>
      </div>

      {/* --- Final Community CTA --- */}
      <section className="about-community-banner">
        <h2>Join the HelpUp Movement</h2>
        <p>
          Whether you need a master plumber today or want to grow your local trade business with direct client bookings, we're building the future of local services together.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 2 }}>
          <Link to="/browse" className="btn btn-primary" style={{ padding: "14px 32px" }}>
            Book a Verified Specialist
          </Link>
          <Link to="/signup" className="btn btn-secondary" style={{ padding: "14px 28px" }}>
            Register as a Pro Partner
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
