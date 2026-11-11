// src/components/WorkerCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { createBooking } from "../services/storageService";
import { LocationIcon, StarIcon, ShieldCheckIcon, CalendarIcon, ClockIcon, ZapIcon, PhoneIcon } from "./Icons";
import "../styles/cards.css";

function WorkerCard({ worker, onBookingSuccess }) {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, role } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [durationHours, setDurationHours] = useState(2);
  const [address, setAddress] = useState(user?.location || "");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];

  const initials = worker.name
    ? worker.name.split(" ").map(p => p[0]).join("").toUpperCase().slice(0, 2)
    : "SP";
  const defaultAvatar = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="%23e11d48" rx="60"/><text x="50%" y="54%" font-family="Arial,sans-serif" font-size="44" font-weight="bold" fill="%23ffffff" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;

  const workerPhoto = worker.img || defaultAvatar;
  const rateNum = Number(worker.rate) || 350;
  const estimatedTotal = rateNum * durationHours;

  const handleOpenBooking = () => {
    if (!isAuthenticated) {
      showToast("Please log in as a customer to book an appointment.", "info");
      navigate("/login", { state: { returnTo: "/browse" } });
      return;
    }

    if (role === "worker") {
      showToast("You are logged in with a Worker account. Only customer accounts can book services.", "warning");
      return;
    }

    if (user?.location && !address) {
      setAddress(user.location);
    }

    setOpen(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!date || !time) {
      showToast("Please select a date and time for your appointment.", "warning");
      return;
    }

    setSubmitting(true);

    try {
      const newBooking = createBooking({
        worker,
        customer: user,
        service: worker.service,
        date,
        time,
        hours: durationHours,
        totalCost: estimatedTotal,
        address: address || "Client Residential Address",
        notes,
        rate: rateNum
      });

      if (onBookingSuccess) {
        onBookingSuccess(newBooking);
      }

      setOpen(false);
      showToast(`Appointment confirmed with ${worker.name}!`, "success");

      setTimeout(() => {
        navigate("/my-bookings");
      }, 700);
    } catch {
      showToast("Failed to create booking. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="worker-card-ui">
      {/* Top Header Row with Category and Live Status */}
      <div className="card-top-row">
        <span className="worker-card-badge">{worker.service}</span>
        {worker.availableToday !== false ? (
          <span className="live-status-pill" title="Specialist is on-duty and accepting instant bookings today">
            <span className="beacon-dot" />
            Available Today
          </span>
        ) : (
          <span className="schedule-status-pill">Next Slot Tomorrow</span>
        )}
      </div>

      {/* Specialist Avatar with Verified Seal */}
      <div className="worker-avatar-wrapper">
        <img
          src={workerPhoto}
          alt={worker.name}
          className="worker-img"
          loading="lazy"
        />
        <div className="verified-seal" title="Government ID & Background Verified">
          <ShieldCheckIcon size={14} color="#ffffff" />
        </div>
      </div>

      {/* Specialist Identity */}
      <h3 className="worker-name">{worker.name}</h3>
      <div className="worker-title">{worker.title || `${worker.service} Professional`}</div>

      {/* Rating & Review Count (Only real ratings) */}
      <div className="worker-rating">
        {worker.rating && worker.rating > 0 ? (
          <>
            <StarIcon size={16} color="#f59e0b" />
            <span className="rating-value">{Number(worker.rating).toFixed(1)}</span>
            <span className="worker-reviews">
              ({worker.reviewCount || 1} verified {worker.reviewCount === 1 ? "review" : "reviews"})
            </span>
          </>
        ) : (
          <span className="badge-verified">
            <ShieldCheckIcon size={14} color="#059669" />
            Newly Registered Specialist
          </span>
        )}
      </div>

      {/* Bio */}
      {worker.about && (
        <p className="worker-desc">{worker.about}</p>
      )}

      {/* Key Specialist Metadata */}
      <div className="worker-meta-grid">
        <div className="meta-item">
          <LocationIcon size={14} color="#e11d48" />
          <span>{worker.location || "Direct Service"}</span>
        </div>
        <div className="meta-item">
          <ZapIcon size={14} color="#f59e0b" />
          <span>{worker.experience || "Independent Pro"}</span>
        </div>
      </div>

      {/* Hourly Rate Row */}
      <div className="worker-pricing-strip">
        <div className="pricing-label">Direct Hourly Rate</div>
        <div className="pricing-val">
          ₹{rateNum} <small>/ hour</small>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="worker-card-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleOpenBooking}
          title={`Book an appointment with ${worker.name}`}
        >
          Book Pro
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => navigate(`/book/${worker.id}`)}
          title="View detailed credentials and verified customer reviews"
        >
          View Profile
        </button>
      </div>

      {/* Interactive Booking Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="booking-modal-header">
          <img
            src={workerPhoto}
            alt={worker.name}
            className="booking-modal-avatar"
          />
          <div>
            <h2>Book {worker.name}</h2>
            <p className="booking-modal-sub">
              {worker.title} • <span style={{ color: "#e11d48", fontWeight: 800 }}>₹{rateNum}/hr</span>
            </p>
          </div>
        </div>

        <form className="booking-modal-form" onSubmit={handleBookingSubmit}>
          <div className="form-group-row">
            <div className="form-group">
              <label>Service Specialization</label>
              <input type="text" value={worker.service} disabled className="input-disabled" />
            </div>
            <div className="form-group">
              <label>Hourly Rate</label>
              <input type="text" value={`₹${rateNum} / hour`} disabled className="input-disabled" />
            </div>
          </div>

          {/* Interactive Duration Selector */}
          <div className="form-group">
            <label>Estimated Service Duration</label>
            <div className="duration-selector">
              {[1, 2, 3, 4, 8].map((h) => (
                <button
                  key={h}
                  type="button"
                  className={`duration-chip ${durationHours === h ? "active" : ""}`}
                  onClick={() => setDurationHours(h)}
                >
                  {h === 8 ? "Full Day (8h)" : `${h} ${h === 1 ? "Hour" : "Hours"}`}
                </button>
              ))}
            </div>
          </div>

          {/* Live Total Calculation */}
          <div className="booking-cost-calc">
            <div className="calc-label">
              Estimated Total ({durationHours} hrs × ₹{rateNum}/hr)
            </div>
            <div className="calc-total">₹{estimatedTotal}</div>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>
                <CalendarIcon size={15} color="#e11d48" />
                Select Date *
              </label>
              <input
                type="date"
                min={todayStr}
                value={date}
                onChange={e => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <ClockIcon size={15} color="#e11d48" />
                Select Time *
              </label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              <LocationIcon size={15} color="#e11d48" />
              Service Address / Location *
            </label>
            <input
              type="text"
              placeholder="e.g. 14A Green Park Ave, Chennai"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Task Description / Work Details for {worker.name.split(" ")[0]}</label>
            <textarea
              placeholder="Describe what needs repair, servicing, or attention..."
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <div className="booking-modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Confirming..." : `Confirm Booking • ₹${estimatedTotal}`}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default WorkerCard;
