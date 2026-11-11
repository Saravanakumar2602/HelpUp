// src/components/BookingCard.jsx
import React, { useState } from "react";
import { StarIcon } from "./Icons";
import "../styles/cards.css";

function BookingCard({ booking, onCancel, onRate }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rated, setRated] = useState(false);

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (onRate) {
      onRate(booking.workerId, rating, comment);
    }
    setRated(true);
    setShowRatingModal(false);
  };

  const initials = booking.workerName
    ? booking.workerName.slice(0, 2).toUpperCase()
    : "WO";
  const defaultAvatar = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="%23e11d48" rx="60"/><text x="50%" y="54%" font-family="Arial,sans-serif" font-size="44" font-weight="bold" fill="%23ffffff" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;

  return (
    <div className="customer-booking-card">
      <div className="booking-card-top">
        <div className="booking-worker-info">
          <img
            src={booking.workerAvatar || defaultAvatar}
            alt={booking.workerName}
            className="booking-worker-avatar"
          />
          <div>
            <h3 className="booking-worker-name">{booking.workerName}</h3>
            <span className="badge-pill">{booking.service}</span>
            <div className="booking-worker-contact">
              📞 {booking.workerPhone || "Contact provided upon request"}
            </div>
          </div>
        </div>

        <div className="booking-status-box">
          <span className={`status-badge status-${(booking.status || "pending").toLowerCase()}`}>
            {booking.status || "Pending"}
          </span>
          <div className="booking-rate-tag">
            {booking.totalCost ? `₹${booking.totalCost} total` : `₹${booking.rate}/hr`}
          </div>
        </div>
      </div>

      <div className="booking-card-details">
        <div className="booking-detail-row">
          <span>🗓️ Date & Time:</span>
          <span>{booking.date} at {booking.time} {booking.hours && `(${booking.hours} hrs)`}</span>
        </div>
        <div className="booking-detail-row">
          <span>📍 Location:</span>
          <span>{booking.address}</span>
        </div>
        {booking.notes && (
          <div className="booking-detail-row">
            <span>📝 Instructions:</span>
            <span>"{booking.notes}"</span>
          </div>
        )}
      </div>

      <div className="booking-card-footer">
        {(booking.status === "Pending" || booking.status === "Confirmed") && onCancel && (
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onCancel(booking.id)}
          >
            Cancel Appointment
          </button>
        )}

        {booking.status === "Completed" && (
          <div>
            {!rated ? (
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setShowRatingModal(!showRatingModal)}
              >
                ★ Leave a Review
              </button>
            ) : (
              <span className="rating-submitted-text">✓ Review Submitted!</span>
            )}

            {showRatingModal && (
              <form onSubmit={handleRatingSubmit} className="inline-rating-form" style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                <select value={rating} onChange={e => setRating(Number(e.target.value))}>
                  <option value={5}>5 ★ - Excellent Work</option>
                  <option value={4}>4 ★ - Good Service</option>
                  <option value={3}>3 ★ - Average</option>
                  <option value={2}>2 ★ - Disappointing</option>
                  <option value={1}>1 ★ - Poor</option>
                </select>
                <input
                  type="text"
                  placeholder="Share a short feedback comment..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  style={{ minWidth: 220 }}
                />
                <button type="submit" className="btn btn-sm btn-primary">
                  Submit Review
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingCard;
