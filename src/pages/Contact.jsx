// src/pages/Contact.jsx
import React, { useState } from "react";
import { useToast } from "../context/ToastContext";
import {
  LocationIcon,
  MailIcon,
  PhoneIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  ZapIcon
} from "../components/Icons";
import "../styles/contact.css";

const FAQS = [
  {
    q: "How quickly does a skilled specialist arrive after booking?",
    a: "Most local trade specialists confirm their appointment within 15 minutes of receiving your request. For same-day urgent repairs, technicians typically arrive within 1 to 2 hours of confirmation."
  },
  {
    q: "Do I need to pay any upfront fee when scheduling an appointment?",
    a: "Zero! HelpUp requires no advance booking charges or hidden inspection deposit. You inspect the completed trade work in person, verify satisfaction, and pay your professional directly."
  },
  {
    q: "How does HelpUp verify technicians and tutors?",
    a: "Every service professional undergoes government identity verification (Aadhaar / Voter ID), physical address validation, and proof of trade experience or certifications. Their standing is continuously monitored via authentic client reviews."
  },
  {
    q: "What if I need to cancel or change my appointment time?",
    a: "You can easily reschedule or cancel an appointment for free through your 'My Bookings' tab anytime up to 1 hour before the scheduled service slot."
  },
  {
    q: "I am a skilled technician. How can I offer my services on HelpUp?",
    a: "Click 'Register as a Pro Partner' in the navigation bar. Choose your service category (Plumber, Electrician, Cleaner, etc.), set your transparent hourly rate, and begin receiving direct client appointments in your city."
  }
];

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "Booking Assistance",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0); // first item open by default
  const { showToast } = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast("Please fill in all required fields.", "warning");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      showToast(`Thank you, ${form.name}! Your inquiry has been submitted. Our response desk will contact you within 2 hours.`, "success");
      setForm({ name: "", email: "", phone: "", inquiryType: "Booking Assistance", message: "" });
      setSubmitting(false);
    }, 600);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <div className="page contact-page">
      {/* --- Contact Hero --- */}
      <section className="contact-hero">
        <span className="contact-pill-tag">
          <SparklesIcon size={14} color="#ff385c" />
          Dedicated Support Desk
        </span>
        <h1>
          We're Here to Help Your <span className="coral-accent">Home & Trade</span>
        </h1>
        <p className="contact-hero-sub">
          Have questions about booking an expert, need urgent dispatch assistance, or want to partner with HelpUp? Reach our support desk 7 days a week.
        </p>
      </section>

      {/* --- Direct Contact Channels Strip --- */}
      <section className="contact-channels-grid">
        <a href="tel:+919876543210" className="channel-card">
          <div className="channel-icon-box">
            <PhoneIcon size={24} color="#e11d48" />
          </div>
          <h3>Customer Helpline</h3>
          <p>Speak directly with our local support agents for quick booking assistance.</p>
          <div className="channel-action">
            <span>+91 98765 43210</span>
            <ArrowRightIcon size={14} color="#e11d48" />
          </div>
        </a>

        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="channel-card">
          <div className="channel-icon-box">
            <ZapIcon size={24} color="#e11d48" />
          </div>
          <h3>WhatsApp Fast Desk</h3>
          <p>Instant chat messaging with live support for real-time slot confirmations.</p>
          <div className="channel-action">
            <span>Chat on WhatsApp</span>
            <ArrowRightIcon size={14} color="#e11d48" />
          </div>
        </a>

        <a href="mailto:support@helpup.com" className="channel-card">
          <div className="channel-icon-box">
            <MailIcon size={24} color="#e11d48" />
          </div>
          <h3>Priority Email Desk</h3>
          <p>Send detailed inquiries, dispute reviews, or corporate partnership requests.</p>
          <div className="channel-action">
            <span>support@helpup.com</span>
            <ArrowRightIcon size={14} color="#e11d48" />
          </div>
        </a>

        <div className="channel-card" style={{ background: "linear-gradient(135deg, #fef2f2 0%, #fff1f2 100%)", borderColor: "#fecaca" }}>
          <div className="channel-icon-box" style={{ background: "#ffffff", borderColor: "#fca5a5" }}>
            <ShieldCheckIcon size={24} color="#e11d48" />
          </div>
          <h3>24/7 Urgent Dispatch</h3>
          <p>Burst water pipes, power short-circuits, or hazardous household issues.</p>
          <div className="channel-action">
            <span>24/7 Priority Helpline</span>
            <ArrowRightIcon size={14} color="#e11d48" />
          </div>
        </div>
      </section>

      {/* --- Two-Column Core Layout (Form + Hub Details) --- */}
      <section className="contact-layout">
        {/* Contact Form */}
        <div className="contact-card">
          <div className="contact-card-header">
            <h2>Send a Direct Message</h2>
            <p>Our response team reviews all incoming inquiries promptly.</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label>Your Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Ramesh Kumar"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Phone Number (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 XXXXX"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>Inquiry Topic</label>
                <select name="inquiryType" value={form.inquiryType} onChange={handleChange}>
                  <option value="Booking Assistance">🛠️ Booking & Appointment Assistance</option>
                  <option value="Worker Registration">👨‍🔧 Trade Worker Registration & Verification</option>
                  <option value="Billing & Pricing">💳 Transparent Pricing & Payment</option>
                  <option value="Commercial Inquiry">🏢 Commercial & Enterprise Partnership</option>
                  <option value="General Feedback">💡 Community Feedback & Suggestions</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label>Your Message / Issue Details *</label>
              <textarea
                name="message"
                placeholder="Explain your question or how our team can help you..."
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: "14px", fontSize: "1.05rem" }} disabled={submitting}>
              {submitting ? "Sending Your Inquiry..." : "Submit Inquiry"}
            </button>
          </form>
        </div>

        {/* Hub & Operating Info Card */}
        <div className="contact-info-card">
          <div>
            <h3>HelpUp Regional Hubs</h3>
            <p style={{ color: "#64748b", margin: "0 0 20px 0", fontSize: "0.95rem" }}>
              Serving households and trade communities across major southern hubs.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div className="hub-location-item">
                <div className="hub-icon-wrap">
                  <LocationIcon size={18} color="#e11d48" />
                </div>
                <div className="hub-details">
                  <strong>Chennai Headquarters</strong>
                  <p>Anna Salai Tech Corridor, Chennai, Tamil Nadu - 600002</p>
                </div>
              </div>

              <div className="hub-location-item">
                <div className="hub-icon-wrap">
                  <LocationIcon size={18} color="#e11d48" />
                </div>
                <div className="hub-details">
                  <strong>Bangalore Operations Center</strong>
                  <p>Indiranagar 100ft Road, Bangalore, Karnataka - 560038</p>
                </div>
              </div>

              <div className="hub-location-item">
                <div className="hub-icon-wrap">
                  <LocationIcon size={18} color="#e11d48" />
                </div>
                <div className="hub-details">
                  <strong>Salem Trade Partner Desk</strong>
                  <p>Saradha College Road, Fairlands, Salem - 636016</p>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours Box */}
          <div className="operating-hours-box">
            <h4>Support Operating Hours</h4>
            <div className="hours-row">
              <span>Monday – Saturday:</span>
              <strong>8:00 AM – 9:00 PM</strong>
            </div>
            <div className="hours-row">
              <span>Sunday & Holidays:</span>
              <strong>9:00 AM – 6:00 PM</strong>
            </div>
            <div className="hours-row" style={{ color: "#e11d48", fontWeight: 700, marginTop: 4 }}>
              <span>Emergency Dispatch:</span>
              <strong>24 Hours / 7 Days</strong>
            </div>
          </div>

          {/* Socials Connection */}
          <div>
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", display: "block", marginBottom: 8 }}>
              Connect with HelpUp:
            </span>
            <div className="socials-wrapper">
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="social-pill">
                💬 WhatsApp
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-pill">
                Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-pill">
                Instagram
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-pill">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- Frequently Asked Questions Accordion --- */}
      <section className="faq-section">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>Quick answers to common questions about booking, payments, and trade safety.</p>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openFaq === index ? "open" : ""}`}
            >
              <button
                type="button"
                className="faq-question"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.q}</span>
                <span className="faq-toggle-icon">+</span>
              </button>
              {openFaq === index && (
                <div className="faq-answer">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Contact;
