// src/pages/MyBookings.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import BookingCard from "../components/BookingCard";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { updateBookingStatus, addReview } from "../services/storageService";
import "../styles/mybookings.css";

function MyBookings({ bookings = [], onRefreshData }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("all");

  const customerBookings = bookings.filter(
    b => String(b.customerId) === String(user?.id) || b.customerEmail === user?.email
  );

  const filtered = customerBookings.filter(b => {
    if (activeTab === "all") return true;
    return (b.status || "").toLowerCase() === activeTab.toLowerCase();
  });

  const handleCancel = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking appointment?")) {
      updateBookingStatus(bookingId, "Cancelled");
      showToast("Booking has been cancelled.", "info");
      if (onRefreshData) onRefreshData();
    }
  };

  const handleRate = (workerId, stars, comment) => {
    try {
      addReview({
        workerId,
        customerId: user.id,
        customerName: user.name,
        rating: stars,
        comment
      });
      showToast(`Thank you! Your ${stars}★ review has been recorded.`, "success");
      if (onRefreshData) onRefreshData();
    } catch {
      showToast("Could not submit review. Please try again.", "error");
    }
  };

  return (
    <div className="page mybookings-page">
      <div className="mybookings-header-row">
        <div>
          <h1>My Service Bookings</h1>
          <p className="mybookings-subtitle">
            Manage your service reservations, check scheduled times, and communicate with workers.
          </p>
        </div>
        <Link to="/browse" className="btn btn-primary">
          + Book New Service
        </Link>
      </div>

      <div className="bookings-tabs">
        <button
          className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All ({customerBookings.length})
        </button>
        <button
          className={`tab-btn ${activeTab === "pending" ? "active" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending ({customerBookings.filter(b => b.status === "Pending").length})
        </button>
        <button
          className={`tab-btn ${activeTab === "confirmed" ? "active" : ""}`}
          onClick={() => setActiveTab("confirmed")}
        >
          Confirmed ({customerBookings.filter(b => b.status === "Confirmed").length})
        </button>
        <button
          className={`tab-btn ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed ({customerBookings.filter(b => b.status === "Completed").length})
        </button>
        <button
          className={`tab-btn ${activeTab === "cancelled" ? "active" : ""}`}
          onClick={() => setActiveTab("cancelled")}
        >
          Cancelled ({customerBookings.filter(b => b.status === "Cancelled").length})
        </button>
      </div>

      <div className="mybookings-list">
        {filtered.length > 0 ? (
          filtered.map(b => (
            <BookingCard
              key={b.id}
              booking={b}
              onCancel={handleCancel}
              onRate={handleRate}
            />
          ))
        ) : (
          <div className="empty-bookings-card">
            <h3>No {activeTab !== "all" ? activeTab : ""} appointments found</h3>
            <p>Ready to get household repairs, cleaning, or tutoring done?</p>
            <Link to="/browse" className="btn btn-primary" style={{ marginTop: 16 }}>
              Browse Skilled Workers Near You
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
