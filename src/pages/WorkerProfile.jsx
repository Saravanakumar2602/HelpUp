// src/pages/WorkerProfile.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { ALL_SERVICES } from "../data/servicesData";
import { updateBookingStatus, deleteJobById, getAllReviews } from "../services/storageService";
import {
  ShieldCheckIcon,
  StarIcon,
  ZapIcon,
  LocationIcon,
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  ClockIcon,
  CheckIcon,
  AwardIcon,
  SparklesIcon
} from "../components/Icons";
import "../styles/workerprofile.css";

function WorkerProfile({ jobs = [], bookings = [], onRefreshData }) {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState("bookings");
  const [bookingFilter, setBookingFilter] = useState("all");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    title: user?.title || "",
    service: user?.service || "Electrical",
    rate: user?.rate || 350,
    experience: user?.experience || "3+ years",
    location: user?.location || "Chennai",
    phone: user?.phone || "",
    about: user?.about || "",
    img: user?.img || ""
  });

  const [saving, setSaving] = useState(false);

  const myJobs = jobs.filter(j => String(j.workerId) === String(user?.id));
  const myBookings = bookings.filter(b => String(b.workerId) === String(user?.id));
  const myReviews = getAllReviews().filter(r => String(r.workerId) === String(user?.id));

  const pendingBookings = myBookings.filter(b => b.status === "Pending");
  const confirmedBookings = myBookings.filter(b => b.status === "Confirmed");
  const completedBookings = myBookings.filter(b => b.status === "Completed");

  // Calculate estimated total earnings from completed jobs
  const totalEarnings = completedBookings.reduce((sum, b) => {
    return sum + (Number(b.totalCost) || (Number(b.rate || user?.rate || 350) * (Number(b.hours) || 2)));
  }, 0);

  const filteredBookings = myBookings.filter(b => {
    if (bookingFilter === "all") return true;
    return (b.status || "").toLowerCase() === bookingFilter.toLowerCase();
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData(prev => ({ ...prev, img: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      updateProfile({
        ...formData,
        rate: Number(formData.rate) || 300
      });
      showToast("Profile details updated successfully!", "success");
      if (onRefreshData) onRefreshData();
    } catch {
      showToast("Failed to update profile.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = (bookingId, newStatus) => {
    updateBookingStatus(bookingId, newStatus);
    showToast(`Appointment status updated to "${newStatus}"`, "success");
    if (onRefreshData) onRefreshData();
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm("Are you sure you want to remove this service package?")) {
      deleteJobById(jobId);
      showToast("Service package removed.", "info");
      if (onRefreshData) onRefreshData();
    }
  };

  const initials = user?.name ? user.name.slice(0, 2).toUpperCase() : "WP";
  const defaultAvatar = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="%23e11d48" rx="60"/><text x="50%" y="54%" font-family="Arial,sans-serif" font-size="44" font-weight="bold" fill="%23ffffff" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;

  return (
    <div className="page worker-dashboard-page">
      {/* --- Executive Pro Header Banner --- */}
      <div className="worker-banner-card">
        <div className="banner-left">
          <div className="banner-avatar-wrap">
            <img
              src={formData.img || user?.img || defaultAvatar}
              alt={user?.name || "Professional"}
              className="banner-avatar-img"
            />
            <div className="banner-verified-badge" title="ID & Trade Verified">
              <ShieldCheckIcon size={16} color="#ffffff" />
            </div>
          </div>

          <div className="banner-details">
            <div className="banner-title-row">
              <h1 className="banner-worker-name">{user?.name}</h1>
              <span className="badge-pill">{user?.service || "Specialist"}</span>
              <span className="live-status-pill">
                <span className="beacon-dot" />
                Live in Directory
              </span>
            </div>

            <div className="banner-subtitle">
              {user?.title || `${user?.service || "Trade"} Professional`}
            </div>

            <div className="banner-meta-strip">
              <div className="banner-meta-item">
                <LocationIcon size={14} color="#e11d48" />
                <span>{user?.location || "Location not set"}</span>
              </div>
              <div className="banner-meta-item">
                <ZapIcon size={14} color="#f59e0b" />
                <span>{user?.experience || "Experienced"}</span>
              </div>
              {user?.phone && (
                <div className="banner-meta-item">
                  <PhoneIcon size={14} color="#e11d48" />
                  <span>{user.phone}</span>
                </div>
              )}
              <div className="banner-meta-item">
                <MailIcon size={14} color="#64748b" />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Header Controls */}
        <div className="banner-right">
          <div className="banner-rate-box">
            <div className="rate-caption">Hourly Rate</div>
            <div className="rate-number">
              ₹{user?.rate || 350} <small>/ hr</small>
            </div>
            <div className="rate-rating">
              {user?.rating && user.rating > 0 ? (
                <>
                  <StarIcon size={14} color="#f59e0b" />
                  <strong>{Number(user.rating).toFixed(1)}</strong>
                  <span>({user.reviewCount} {user.reviewCount === 1 ? "review" : "reviews"})</span>
                </>
              ) : (
                <span className="new-badge">✓ Verified Account</span>
              )}
            </div>
          </div>

          <div className="banner-actions">
            <Link to="/add-job" className="btn btn-primary btn-sm">
              + Post Package
            </Link>
            <Link to={`/book/${user?.id}`} className="btn btn-outline btn-sm">
              View Public Card
            </Link>
          </div>
        </div>
      </div>

      {/* --- Executive Metric Cards Strip --- */}
      <div className="pro-metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Total Bookings</span>
            <div className="metric-icon-wrap" style={{ background: "rgba(15, 23, 42, 0.05)" }}>
              <CalendarIcon size={18} color="#0f172a" />
            </div>
          </div>
          <div className="metric-value">{myBookings.length}</div>
          <div className="metric-footer">Lifetime client requests</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Pending Inquiries</span>
            <div className="metric-icon-wrap" style={{ background: "rgba(245, 158, 11, 0.12)" }}>
              <ClockIcon size={18} color="#d97706" />
            </div>
          </div>
          <div className="metric-value" style={{ color: "#d97706" }}>
            {pendingBookings.length}
          </div>
          <div className="metric-footer">Needs your confirmation</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Active / Scheduled</span>
            <div className="metric-icon-wrap" style={{ background: "rgba(255, 56, 92, 0.1)" }}>
              <ZapIcon size={18} color="#e11d48" />
            </div>
          </div>
          <div className="metric-value" style={{ color: "#e11d48" }}>
            {confirmedBookings.length}
          </div>
          <div className="metric-footer">Ready for service dispatch</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Estimated Earnings</span>
            <div className="metric-icon-wrap" style={{ background: "rgba(16, 185, 129, 0.12)" }}>
              <AwardIcon size={18} color="#059669" />
            </div>
          </div>
          <div className="metric-value" style={{ color: "#059669" }}>
            ₹{totalEarnings}
          </div>
          <div className="metric-footer">From {completedBookings.length} completed jobs</div>
        </div>
      </div>

      {/* --- Segmented Dashboard Navigation Tabs --- */}
      <div className="pro-tabs-row">
        <button
          className={`pro-tab-btn ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          <span>Appointments</span>
          <span className="tab-counter">{myBookings.length}</span>
        </button>

        <button
          className={`pro-tab-btn ${activeTab === "services" ? "active" : ""}`}
          onClick={() => setActiveTab("services")}
        >
          <span>My Packages</span>
          <span className="tab-counter">{myJobs.length}</span>
        </button>

        <button
          className={`pro-tab-btn ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          <span>Profile Settings</span>
        </button>

        <button
          className={`pro-tab-btn ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          <span>Client Reviews</span>
          <span className="tab-counter">{myReviews.length}</span>
        </button>
      </div>

      {/* --- TAB 1: Appointments & Booking Management --- */}
      {activeTab === "bookings" && (
        <div className="dashboard-content-section">
          {/* Booking sub-filter pills */}
          <div className="booking-subfilters">
            <button
              className={`subfilter-pill ${bookingFilter === "all" ? "active" : ""}`}
              onClick={() => setBookingFilter("all")}
            >
              All ({myBookings.length})
            </button>
            <button
              className={`subfilter-pill ${bookingFilter === "pending" ? "active" : ""}`}
              onClick={() => setBookingFilter("pending")}
            >
              Pending ({pendingBookings.length})
            </button>
            <button
              className={`subfilter-pill ${bookingFilter === "confirmed" ? "active" : ""}`}
              onClick={() => setBookingFilter("confirmed")}
            >
              Confirmed ({confirmedBookings.length})
            </button>
            <button
              className={`subfilter-pill ${bookingFilter === "completed" ? "active" : ""}`}
              onClick={() => setBookingFilter("completed")}
            >
              Completed ({completedBookings.length})
            </button>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="empty-tab-card">
              <div className="empty-tab-icon">
                <CalendarIcon size={44} color="#e11d48" />
              </div>
              <h3>No Appointments in this View</h3>
              <p>
                {myBookings.length === 0
                  ? "When homeowners in your area book your services through the Browse Directory, their appointment requests will appear here in real-time."
                  : "No appointments match your current status filter."}
              </p>
              <Link to="/browse" className="btn btn-secondary btn-sm" style={{ marginTop: 12 }}>
                Check Your Directory Listing
              </Link>
            </div>
          ) : (
            <div className="appointments-list">
              {filteredBookings.map((b) => {
                const totalFee = b.totalCost || (Number(b.rate || user?.rate || 350) * (Number(b.hours) || 2));
                return (
                  <div key={b.id} className="appointment-card">
                    <div className="appointment-top">
                      <div className="client-info">
                        <div className="client-name-row">
                          <h4>{b.customerName || "Customer"}</h4>
                          <span className={`status-badge status-${(b.status || "pending").toLowerCase()}`}>
                            {b.status}
                          </span>
                        </div>
                        <div className="client-contacts">
                          {b.customerPhone && (
                            <a href={`tel:${b.customerPhone}`} className="contact-link">
                              <PhoneIcon size={13} color="#e11d48" />
                              <span>{b.customerPhone}</span>
                            </a>
                          )}
                          {b.customerEmail && (
                            <a href={`mailto:${b.customerEmail}`} className="contact-link">
                              <MailIcon size={13} color="#64748b" />
                              <span>{b.customerEmail}</span>
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="appointment-cost-tag">
                        <span className="cost-caption">Estimated Fee</span>
                        <span className="cost-val">₹{totalFee}</span>
                      </div>
                    </div>

                    <div className="appointment-details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Service Discipline</span>
                        <span className="detail-val">{b.service}</span>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">Scheduled Slot</span>
                        <span className="detail-val">
                          🗓️ {b.date} at {b.time} {b.hours && `(${b.hours} hrs)`}
                        </span>
                      </div>

                      <div className="detail-item full-width">
                        <span className="detail-label">Service Address</span>
                        <span className="detail-val">📍 {b.address}</span>
                      </div>

                      {b.notes && (
                        <div className="detail-item full-width client-note-box">
                          <span className="detail-label">Client Instructions:</span>
                          <p>"{b.notes}"</p>
                        </div>
                      )}
                    </div>

                    {/* Action controls */}
                    <div className="appointment-actions-bar">
                      {b.status === "Pending" && (
                        <>
                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={() => handleStatusChange(b.id, "Confirmed")}
                          >
                            <CheckIcon size={14} color="#ffffff" />
                            Accept & Confirm Slot
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleStatusChange(b.id, "Cancelled")}
                          >
                            Decline Request
                          </button>
                        </>
                      )}

                      {b.status === "Confirmed" && (
                        <>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => handleStatusChange(b.id, "Completed")}
                          >
                            <CheckIcon size={14} color="#ffffff" />
                            Mark as Completed
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleStatusChange(b.id, "Cancelled")}
                          >
                            Cancel Appointment
                          </button>
                        </>
                      )}

                      {b.status === "Completed" && (
                        <div className="completed-state-badge">
                          <CheckIcon size={14} color="#059669" />
                          <span>Task Completed & Payment Directly Settled</span>
                        </div>
                      )}

                      {b.status === "Cancelled" && (
                        <span className="cancelled-text">Appointment Cancelled</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* --- TAB 2: Published Service Packages --- */}
      {activeTab === "services" && (
        <div className="dashboard-content-section">
          <div className="section-title-action-row">
            <div>
              <h3>Custom Service Packages</h3>
              <p>Offer pre-priced packages (e.g. "Full Switchboard Rewiring", "Deep Bathroom Descaling") to attract direct bookings.</p>
            </div>
            <Link to="/add-job" className="btn btn-primary btn-sm">
              + Post New Package
            </Link>
          </div>

          {myJobs.length === 0 ? (
            <div className="empty-tab-card">
              <div className="empty-tab-icon">
                <SparklesIcon size={44} color="#e11d48" />
              </div>
              <h3>No Specialized Packages Listed Yet</h3>
              <p>
                In addition to your general hourly rate, you can publish specific service packages so clients can easily book standard household repairs with upfront pricing.
              </p>
              <Link to="/add-job" className="btn btn-primary" style={{ marginTop: 12 }}>
                Post Your First Package
              </Link>
            </div>
          ) : (
            <div className="packages-grid">
              {myJobs.map((j) => (
                <div key={j.id} className="package-card">
                  <div className="package-top">
                    <span className="badge-pill">{j.service}</span>
                    <button
                      className="delete-pkg-btn"
                      onClick={() => handleDeleteJob(j.id)}
                      title="Remove this package"
                    >
                      ✕
                    </button>
                  </div>
                  <h4>{j.title}</h4>
                  <p>{j.description}</p>
                  <div className="package-meta">
                    <span className="pkg-rate">₹{j.rate} / hr</span>
                    <span className="pkg-loc">📍 {j.location}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- TAB 3: Profile Settings & Credentials --- */}
      {activeTab === "profile" && (
        <div className="dashboard-content-section">
          <div className="settings-card">
            <div className="settings-header">
              <h3>Professional Profile & Account Settings</h3>
              <p>Keep your trade skills, hourly rates, contact number, and service areas up-to-date.</p>
            </div>

            <form onSubmit={handleSave} className="settings-form">
              <div className="settings-avatar-section">
                <img
                  src={formData.img || user?.img || defaultAvatar}
                  alt={formData.name}
                  className="settings-avatar-preview"
                />
                <div>
                  <label className="upload-btn-label">
                    Upload New Photo
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                  </label>
                  <p className="upload-hint">Square format, PNG or JPG (max 2MB).</p>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Full Legal / Business Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Professional Trade Title *</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. Licensed Wireman & Panel Expert"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label>Service Specialization *</label>
                  <select name="service" value={formData.service} onChange={handleChange}>
                    {ALL_SERVICES.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Hourly Rate (₹) *</label>
                  <input
                    type="number"
                    name="rate"
                    min="50"
                    value={formData.rate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Years of Experience *</label>
                  <input
                    type="text"
                    name="experience"
                    placeholder="e.g. 5+ years"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Service City / Primary Area *</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Chennai, Bangalore, Salem"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Direct Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98400 12345"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>About Your Trade Craft & Experience *</label>
                <textarea
                  name="about"
                  rows={4}
                  placeholder="Detail your trade background, licenses held, types of repairs handled, and standard turnaround..."
                  value={formData.about}
                  onChange={handleChange}
                />
              </div>

              <div className="settings-submit-row">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? "Saving Changes..." : "Save Profile Details"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- TAB 4: Verified Client Reviews --- */}
      {activeTab === "reviews" && (
        <div className="dashboard-content-section">
          <div className="section-title-action-row">
            <div>
              <h3>Verified Client Reviews ({myReviews.length})</h3>
              <p>Ratings and written feedback submitted by customers after completed appointments.</p>
            </div>
          </div>

          {myReviews.length === 0 ? (
            <div className="empty-tab-card">
              <div className="empty-tab-icon">
                <StarIcon size={44} color="#f59e0b" />
              </div>
              <h3>No Client Reviews Yet</h3>
              <p>
                Reviews are posted by verified customers after an appointment is marked as completed. Deliver punctual, high-quality service to build a top reputation!
              </p>
            </div>
          ) : (
            <div className="reviews-list">
              {myReviews.map((r) => (
                <div key={r.id} className="pro-review-card">
                  <div className="review-top-row">
                    <div className="reviewer-name">{r.customerName}</div>
                    <div className="review-stars">
                      <StarIcon size={15} color="#f59e0b" />
                      <span>{r.rating} / 5</span>
                    </div>
                  </div>
                  {r.comment && <p className="review-comment">"{r.comment}"</p>}
                  <div className="review-date">Verified Customer Review</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WorkerProfile;
